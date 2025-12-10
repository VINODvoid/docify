'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DocumentInput } from './document-input';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarTrigger,
  MenubarSubTrigger,
  MenubarSeparator,
  MenubarShortcut,
} from '@/components/ui/menubar';

import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  Menu,
  MenuIcon,
  PrinterIcon,
  RedoIcon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TableIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  UndoIcon,
} from 'lucide-react';
import { BsFilePdf } from 'react-icons/bs';
import { useEditorStore } from '@/store/use-editor-store';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { Avatars } from './avatars';
import { Inbox } from './inbox';
import { Doc } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { RenameDialog } from '@/components/rename-dialog';
import { RemoveDialog } from '@/components/remove-dialog';

interface NavbarProps {
  data:Doc<"documents">;
}

export const Navbar = ({data}:NavbarProps) => {
  const router = useRouter();
  const { editorInstance } = useEditorStore();
  const mutation = useMutation(api.documents.create);
  const onNewDocument = ()=> {
    mutation({ title: "Untitled Document", initialContent: "" })
    .then((id)=> {
      router.push(`/documents/${id}`);
      toast.success("New document created");
    })
    .catch(()=> toast.error("Failed to create document"));
  }
  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editorInstance
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };
  const onDownload = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  };
  const onSaveJSON = () => {
    if (!editorInstance) return;
    const content = editorInstance.getJSON();
    const blobData = new Blob([JSON.stringify(content, null, 2)], {
      type: 'application/json',
    });
    onDownload(blobData, `${data.title}.json`); //TODO: set filename to document title
  };

  const onSaveHTML = () => {
    if (!editorInstance) return;
    const content = editorInstance.getHTML();
    const blobData = new Blob([content], {
      type: 'text/html',
    });
    onDownload(blobData, `${data.title}.html`); //TODO: set filename to document title
  };
  const onSaveText = () => {
    if (!editorInstance) return;
    const content = editorInstance.getText();
    const blobData = new Blob([content], {
      type: 'text/plain',
    });
    onDownload(blobData, `${data.title}.txt`); //TODO: set filename to document title
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center ">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput title={data.title} id={data._id} />
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-2 rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJSON}>
                        <FileJsonIcon className="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHTML}>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className="size-4 mr-2" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={onNewDocument}>
                    <FilePlusIcon className="size-4 " />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <RenameDialog documentId={data._id} initialTitle={data.title}>
                  <MenubarItem
                  onClick={(e)=>e.stopPropagation()}
                  onSelect={(e)=>e.preventDefault()}
                  >
                    <FilePenIcon className="size-4" />
                    Rename
                  </MenubarItem>
                  </RenameDialog>
                  <RemoveDialog documentId={data._id}>
                  <MenubarItem
                    onClick={(e)=>e.stopPropagation()}
                    onSelect={(e)=>e.preventDefault()}
                  >
                    <TrashIcon className="size-4" />
                    Trash
                  </MenubarItem>
                  </RemoveDialog>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4" />
                    Print <MenubarShortcut>&#8984;P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-2 rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarItem
                    onClick={() => editorInstance?.chain().focus().undo().run()}
                  >
                    <UndoIcon className="size-4" />
                    Undo <MenubarShortcut>&#8984;Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editorInstance?.chain().focus().redo().run()}
                  >
                    <RedoIcon className="size-4" />
                    Redo <MenubarShortcut>&#8984;Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-2 rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TableIcon className="size-4 mr-2" />
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 1, cols: 1 })}
                      >
                        1 x 1
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 2, cols: 2 })}
                      >
                        2 x 2
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 3, cols: 3 })}
                      >
                        3 x 3
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 4, cols: 4 })}
                      >
                        4 x 4
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 5, cols: 5 })}
                      >
                        5 x 5
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-2 rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="size-4 mr-2 " />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editorInstance?.chain().focus().toggleBold().run()
                        }
                      >
                        <BoldIcon className="size-4 mr-2 " />
                        Bold <MenubarShortcut>&#8984;+B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editorInstance?.chain().focus().toggleItalic().run()
                        }
                      >
                        <ItalicIcon className="size-4 mr-2 " />
                        Italic <MenubarShortcut>&#8984;+I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editorInstance
                            ?.chain()
                            .focus()
                            .toggleUnderline()
                            .run()
                        }
                      >
                        <UnderlineIcon className="size-4 mr-2 " />
                        Underline <MenubarShortcut>&#8984;+U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editorInstance?.chain().toggleStrike().run()
                        }
                      >
                        <StrikethroughIcon className="size-4 mr-2 " />
                        Strikethrough
                        <MenubarShortcut>&#8984;+S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editorInstance?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormattingIcon className="size-4" />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <Avatars/>
        <Inbox/>
        <OrganizationSwitcher
          afterCreateOrganizationUrl={'/'}
          afterLeaveOrganizationUrl={'/'}
          afterSelectOrganizationUrl={'/'}
          afterSelectPersonalUrl={'/'}
        />
        <UserButton />
      </div>
    </nav>
  );
};
