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
        {/* Gradient background effects */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="flex flex-col px-4 gap-y-3 fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-md print:hidden py-2">
          <Navbar data={document}/>
          <Toolbar />
        </div>
        <div className="pt-32 print:pt-0">
          <Editor initialContent={document.initialContent}/>
        </div>
      </div>
    </Room>
  );
}
