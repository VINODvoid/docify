"use client"
import { api } from '../../../../convex/_generated/api';
import { Editor } from './editor';
import { Navbar } from './navbar';
import { Room } from './room';
import { Toolbar } from './toolbar';
import { Preloaded, usePreloadedQuery } from 'convex/react';


interface DocumentProps {
  preloadedDocument:Preloaded<typeof api.documents.getById>;
};

export   function Document({ preloadedDocument }: DocumentProps) {
  const document = usePreloadedQuery(preloadedDocument);

  if (!document || document instanceof Error) {
    return <div>Document not found</div>;
  }

  return (
    <Room>
      <div className="min-h-screen bg-background">
        <div className="flex flex-col px-4 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-background print:hidden">
          <Navbar data={document}/>
          <Toolbar />
        </div>
        <div className="pt-28 print:pt-0">
          <Editor initialContent={document.initialContent}/>
        </div>
      </div>
    </Room>
  );
}
