import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { api } from '../../../../convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  const { sessionClaims, userId } = await auth();
  if (!sessionClaims || !userId) {
    return new Response('Unauthorized - No session', { status: 401 });
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  if (!user) {
    return new Response('Unauthorized - No user', { status: 401 });
  }

  const { room } = await req.json();
  const document = await convex.query(api.documents.getById, { id: room });

  if (!document || document instanceof Error) {
    return new Response('Unauthorized - Document not found', { status: 401 });
  }

  const isOwner = document.ownerId === user.id;

  // Get user's organization memberships
  const { data: orgMemberships } =
    await client.users.getOrganizationMembershipList({
      userId,
    });

  // Check organization membership
  const isOrganizationMember = !!(
    document.organizationId &&
    (document.organizationId === sessionClaims.org_id ||
      orgMemberships.some(
        (membership) => membership.organization.id === document.organizationId
      ))
  );

  if (!isOwner && !isOrganizationMember) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Get display name with proper fallback
  const name =
    user.fullName ??
    user.firstName ??
    user.emailAddresses[0]?.emailAddress?.split('@')[0] ??
    'Anonymous';

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name,
      avatar: user.imageUrl,
    },
  });

  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
