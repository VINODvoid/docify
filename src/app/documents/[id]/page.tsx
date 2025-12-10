import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { Document } from './document';
import { auth } from '@clerk/nextjs/server';
interface DocumentIdPageProps {
  params: Promise<{id:Id<"documents">}>;
}
import {preloadQuery} from "convex/nextjs";
export default async function DocumentIdPage({ params }: DocumentIdPageProps) {
  const { id } = await params;
  const {getToken} = await auth();
  const token = await getToken({template:"convex"}) ?? undefined;
  if(!token){
    throw new Error("User not authenticated");
  }
  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    {id:id},
    {token}
  );

  if(!preloadedDocument){
    throw new Error("Document not found");
  }
  return <Document preloadedDocument={preloadedDocument}/>;
}
