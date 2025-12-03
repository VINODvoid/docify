import {create} from 'zustand';
import { type Editor } from '@tiptap/react';


interface EditorStore {
  editorInstance: Editor | null;
  setEditorInstance: (editor: Editor|null) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
  editorInstance: null,
  setEditorInstance: (editor) => set({ editorInstance: editor }),
}));
