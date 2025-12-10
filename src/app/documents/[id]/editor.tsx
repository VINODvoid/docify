'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from '@tiptap/extension-table';
import { FontFamily, TextStyle } from '@tiptap/extension-text-style';
import { TaskItem, TaskList } from '@tiptap/extension-list';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import Underline from '@tiptap/extension-underline';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { useEditorStore } from '@/store/use-editor-store';
import { FontSizeExtension } from '@/extensions/font-size';
import { LineHeightExtension } from '@/extensions/line-height';
import { Ruler } from './ruler';
import { useLiveblocksExtension } from '@liveblocks/react-tiptap';
import { Threads } from './ threads';
import { useStorage } from '@liveblocks/react';
import {  useRef } from 'react';
import { LEFT_MARGIN,RIGHT_MARGIN } from '@/constants/margins';

interface EditorProps {
  initialContent?: string;
}

export const Editor = ({ initialContent }: EditorProps) => {
  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);
  const hasInitialized = useRef(false);

  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  });

  const { setEditorInstance } = useEditorStore();

  const editor = useEditor({
    onCreate({ editor }) {
      setEditorInstance(editor);

      // Set initial content if editor is empty and we have template content
      if (!hasInitialized.current && initialContent && editor.isEmpty) {
        editor.commands.setContent(initialContent);
        hasInitialized.current = true;
      }
    },
    onDestroy() {
      setEditorInstance(null);
    },
    onUpdate({ editor }) {
      setEditorInstance(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditorInstance(editor);
    },
    onTransaction({ editor }) {
      setEditorInstance(editor);
    },
    onFocus({ editor }) {
      setEditorInstance(editor);
    },
    onBlur({ editor }) {
      setEditorInstance(editor);
    },
    onContentError({ editor }) {
      setEditorInstance(editor);
    },
    editorProps: {
      attributes: {
        class:
          'focus:outline-none print:border-0 bg-background border border-border flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
        style: `padding-left: ${leftMargin ?? LEFT_MARGIN}px; padding-right: ${rightMargin ?? RIGHT_MARGIN}px;`,
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        undoRedo: false,
      }),
      FontSizeExtension,
      LineHeightExtension,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      ImageResize,
      Underline,
      FontFamily,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
        autolink: true,
        defaultProtocol: 'https://',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    immediatelyRender: false,
  });

  return (
    <div className="size-full overflow-x-auto bg-muted px-4 print:p-0 print:bg-background print:overflow-visible">
      <Ruler />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};
