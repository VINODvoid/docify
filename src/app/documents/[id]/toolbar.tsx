'use client';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/store/use-editor-store';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  HighlighterIcon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  SpellCheck2Icon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";
import { type Level } from '@tiptap/extension-heading';
import { type ColorResult, SketchPicker } from 'react-color';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';

const ListButton = () => {
  const { editorInstance } = useEditorStore();

  const lists = [
    {
      label: 'Bullet List',
      icon : ListIcon,
      isActive : () => editorInstance?.isActive('bulletList') || false,
      onClick: () => editorInstance?.chain().focus().toggleBulletList().run(),
    },
    {
      label: 'Ordered List',
      icon : ListOrderedIcon,
      isActive : () => editorInstance?.isActive('orderedList') || false,
      onClick: () => editorInstance?.chain().focus().toggleOrderedList().run(),
    }

  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted/80 px-1.5 overflow-hidden text-sm ">
          <ListIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" p-1 flex flex-col gap-y-1 ">
        {lists.map(({ label,  icon: Icon,isActive,onClick }) => (

          <button
            key={label}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-muted/80',
              isActive() && 'bg-muted/80'
            )}
            onClick={onClick}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AlignButton = () => {
  const { editorInstance } = useEditorStore();

  const alignments = [
    {
      label: 'Left',
      value: 'left',
      icon : AlignLeftIcon,
    },
    {
      label: 'Center',
      value: 'center',
      icon : AlignCenterIcon,
    },
    {
      label: 'Right',
      value: 'right',
      icon : AlignRightIcon,
    },
    {
      label: 'Justify',
      value: 'justify',
      icon : AlignJustifyIcon,
    }
  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted/80 px-1.5 overflow-hidden text-sm ">
          <AlignLeftIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" p-1 flex flex-col gap-y-1 ">
        {alignments.map(({label, value, icon : Icon}) => (
          <button
            key={value}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-muted/80',
              editorInstance?.isActive({ textAlign: value }) &&
                'bg-muted/80'
            )}
            onClick={() =>
              editorInstance?.chain().focus().setTextAlign(value).run()
            }
          >
            <Icon className="size-4"/>
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editorInstance } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageurl, setImageUrl] = useState('');
  const onChange = (href: string) => {
    editorInstance?.chain().focus().setImage({ src: href }).run();
    setImageUrl('');
  };

  const onUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageurl) {
      onChange(imageurl);
      setImageUrl('');
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* trigger should NOT be flex-col */}
          <button
            className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted/90 px-2 text-sm"
            aria-label="Insert image"
          >
            {/* use explicit w/h for predictable sizing */}
            <ImageIcon className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>

        {/* give the menu content some padding and min width */}
        <DropdownMenuContent className="p-1 min-w-[160px]">
          {/* horizontal layout, gap, padding for breathing room */}
          <DropdownMenuItem
            onClick={onUpload}
            className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-muted/80"
          >
            <UploadIcon className="w-4 h-4" />
            <span className="text-sm">Upload Image</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-muted/80"
          >
            <SearchIcon className="w-4 h-4" />
            <span className="text-sm">Image URL</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Insert Image Url"
            value={imageurl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleImageUrlSubmit();
            }}
          />

          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkButton = () => {
  const { editorInstance } = useEditorStore();
  const [url, setUrl] = useState(
    editorInstance?.getAttributes('link').href || ''
  );
  const onChange = (href: string) => {
    editorInstance
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href })
      .run();
    setUrl('');
  };
  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setUrl(editorInstance?.getAttributes('link').href || '');
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted/80 px-1.5 overflow-hidden text-sm ">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" p-2.5 flex items-center gap-x-2 ">
        <Input
          value={url}
          placeholder="https://example.com"
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={() => onChange(url)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const HighlightColorButton = () => {
  const { editorInstance } = useEditorStore();

  const value = editorInstance?.getAttributes('highlight').color || '#FFFFFF';
  const onChange = (color: ColorResult) => {
    editorInstance?.chain().focus().setHighlight({ color: color.hex }).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted/80 px-1.5 overflow-hidden text-sm ">
          <HighlighterIcon className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" p-0 ">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editorInstance } = useEditorStore();

  const value = editorInstance?.getAttributes('color').color || '#000000';
  const onChange = (color: ColorResult) => {
    editorInstance?.chain().focus().setColor(color.hex).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-h-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-muted/80 px-1.5 overflow-hidden text-sm ">
          <span className="text-xs">A-</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" p-0 ">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const HeadingButton = () => {
  const { editorInstance } = useEditorStore();
  const heading = [
    { label: 'Noraml Text', value: 0, fontSize: '16px' },
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
    { label: 'Heading 5', value: 5, fontSize: '16x' },
    { label: 'Heading 6', value: 6, fontSize: '12px' },
  ];
  const getCurrentHeading = () => {
    for (let level = 1; level <= 6; level++) {
      if (editorInstance?.isActive('heading', { level })) {
        return heading[level].label;
      }
    }
    return 'Normal Text';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            ' h-7 min-h-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-muted/80 px-1.5 overflow-hidden text-sm '
          )}
        >
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {heading.map(({ label, value, fontSize }) => (
          <button
            key={value}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-muted/80',
              (value === 0 && !editorInstance?.isActive('heading')) ||
                (editorInstance?.isActive('heading', { level: value }) &&
                  'bg-muted/80')
            )}
            style={{ fontSize }}
            onClick={() => {
              if (value === 0) {
                editorInstance?.chain().focus().setParagraph().run();
              } else {
                editorInstance
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editorInstance } = useEditorStore();
  const fonts = [
    {
      label: 'Default',
      value: '',
    },
    {
      label: 'Arial',
      value: 'Arial, sans-serif',
    },
    {
      label: 'Helvetica',
      value: 'Helvetica, Arial, sans-serif',
    },
    {
      label: 'Times New Roman',
      value: 'Times New Roman, Times, serif',
    },
    {
      label: 'Georgia',
      value: 'Georgia, serif',
    },
    {
      label: 'Verdana',
      value: 'Verdana, Geneva, sans-serif',
    },
    {
      label: 'Courier New',
      value: 'Courier New, Courier, monospace',
    },
    {
      label: 'Trebuchet MS',
      value: 'Trebuchet MS, Helvetica, sans-serif',
    },
    {
      label: 'Comic Sans MS',
      value: 'Comic Sans MS, cursive',
    },
    {
      label: 'Impact',
      value: 'Impact, Charcoal, sans-serif',
    },
    {
      label: 'Lucida Console',
      value: 'Lucida Console, Monaco, monospace',
    },
    {
      label: 'Tahoma',
      value: 'Tahoma, Geneva, sans-serif',
    },
    {
      label: 'Palatino',
      value: 'Palatino Linotype, Book Antiqua, Palatino, serif',
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            ' h-7 w-[120px] flex items-center justify-between rounded-sm hover:bg-muted/80 px-1.5 overflow-hidden text-sm '
          )}
        >
          <span className="truncate">
            {editorInstance?.getAttributes('textStyle').fontFamily || 'Arial'}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            key={value}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-muted/80',
              editorInstance?.getAttributes('textStyle').fontFamily === value &&
                'bg-muted/80'
            )}
            style={{ fontFamily: value }}
            onClick={() =>
              editorInstance?.chain().focus().setFontFamily(value).run()
            }
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


interface ToolbarButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
}
const ToolbarButton = ({
  icon: Icon,
  onClick,
  isActive,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-muted/80 ',
        isActive && 'bg-muted/80'
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export const Toolbar = () => {
  const { editorInstance } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => editorInstance?.chain().focus().undo().run(),
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        onClick: () => editorInstance?.chain().focus().redo().run(),
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        // TODO: Spell Check Functionality
        label: 'Spell Check',
        icon: SpellCheck2Icon,
        onClick: () => {
          const current = editorInstance?.view.dom.getAttribute('spellcheck');
          editorInstance?.view.dom.setAttribute(
            'spellcheck',
            current === 'false' ? 'true' : 'false'
          );
        },
      },
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        onClick: () => editorInstance?.chain().focus().toggleBold().run(),
        isActive: editorInstance?.isActive('bold') || false,
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        onClick: () => editorInstance?.chain().focus().toggleItalic().run(),
        isActive: editorInstance?.isActive('italic') || false,
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        onClick: () => editorInstance?.chain().focus().toggleUnderline().run(),
        isActive: editorInstance?.isActive('underline') || false,
      },
    ],
    [
      {
        label: 'Comment',
        icon: MessageSquarePlusIcon,
        onClick: () => {
          /* TODO: Add Comment Functionality */
        },
        isActive: false, //TODO: Add Active State for Comment
      },
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        onClick: () => editorInstance?.chain().focus().toggleTaskList().run(),
        isActive: editorInstance?.isActive('taskList') || false,
      },
      {
        label: 'Remove Formatting',
        icon: RemoveFormattingIcon,
        onClick: () => editorInstance?.chain().focus().unsetAllMarks().run(),
        isActive: false,
      },
    ],
  ];
  return (
    <div className="bg-secondary px-2.5 py-0.5 rounded-3xl min-h-10 flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className='h-8 w-2'/>
      <FontFamilyButton />
      <Separator orientation="vertical" />
      <HeadingButton />
      <Separator orientation="vertical" />
      {/* TODO: Font Size */}
      <Separator orientation="vertical" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <ListButton />
      {/* TODO: LIst */}
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
