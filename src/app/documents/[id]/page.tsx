import { Editor } from './editor';
import { Toolbar } from './toolbar';

interface DocumentIdPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function DocumentIdPage({ params }: DocumentIdPageProps) {
  const {id} = await params;


  return (
    <div className='min-h-screen bg-background'>
      <Toolbar/>
      <Editor />
    </div>
  );
}
