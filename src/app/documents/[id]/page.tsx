import { Editor } from './editor';
import { Navbar } from './navbar';
import { Toolbar } from './toolbar';

interface DocumentIdPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function DocumentIdPage({ params }: DocumentIdPageProps) {
  const {id} = await params;


  return (
    <div className='min-h-screen bg-background'>
      <div className='flex flex-col px-4 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-background print:hidden'>
      <Navbar/>
      <Toolbar/>
      </div>
      <div className='pt-28 print:pt-0'>
      <Editor />
      </div>
    </div>
  );
}
