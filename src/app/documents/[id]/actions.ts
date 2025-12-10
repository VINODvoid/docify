'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getUsers() {
  const { sessionClaims } = await auth();
  const client = await clerkClient();

  // Get users from the same organization
  const response = await client.users.getUserList({
    organizationId: sessionClaims?.org_id ? [sessionClaims.org_id] : undefined,
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ??
      user.firstName ??
      user.emailAddresses[0]?.emailAddress?.split('@')[0] ??
      'Anonymous',
    avatar: user.imageUrl,
    color: getRandomColor(),
  }));

  return users;
}

export async function getDocuments(ids: Id<'documents'>[]) {
  const documents = await Promise.all(
    ids.map((id) => convex.query(api.documents.getById, { id }))
  );

  return documents
    .filter((doc) => doc !== null && typeof doc === 'object' && '_id' in doc)
    .map((doc) => ({
      id: doc._id,
      name: doc.title,
    }));
}

function getRandomColor(): string {
  const colors = [
    '#E57373',
    '#F06292',
    '#BA68C8',
    '#9575CD',
    '#7986CB',
    '#64B5F6',
    '#4FC3F7',
    '#4DD0E1',
    '#4DB6AC',
    '#81C784',
    '#AED581',
    '#DCE775',
    '#FFD54F',
    '#FFB74D',
    '#FF8A65',
    '#A1887F',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}




export async function getDocumentIds (ids: Id<'documents'>[]) {
  return await convex.query(api.documents.getByIds, { ids });
}
