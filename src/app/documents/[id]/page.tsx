import { Editor } from './editor';

interface DocumentIdPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function DocumentIdPage({ params }: DocumentIdPageProps) {
  const {id} = await params;


  return (
    <div className='min-h-screen bg-[#FAFBFD]'>

      <Editor />
    </div>
  );
}
