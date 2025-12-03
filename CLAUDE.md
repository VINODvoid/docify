# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Docify is a Next.js 16 document editor application built with React 19, TypeScript, and Tiptap editor. It provides a Google Docs-like editing experience with rich text formatting, tables, images, and task lists.

## Development Commands

```bash
# Start development server (localhost:3000)
npm run dev

# Build for production
npm build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Editor**: Tiptap (ProseMirror-based) with extensions for tables, images, tasks
- **State Management**: Zustand for global editor state
- **Icons**: Lucide React

### Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── documents/[id]/          # Document editor route
│   │   ├── page.tsx             # Page wrapper
│   │   ├── editor.tsx           # Tiptap editor component
│   │   └── toolbar.tsx          # Editor toolbar with formatting controls
│   ├── documents/               # Documents list page
│   ├── layout.tsx               # Root layout (Geist fonts)
│   └── page.tsx                 # Home page
├── components/ui/               # shadcn/ui components (50+ components)
├── store/                       # Zustand stores
│   └── use-editor-store.tsx    # Global editor instance state
├── lib/
│   └── utils.ts                # cn() utility for class merging
└── hooks/
    └── use-mobile.ts           # Mobile detection hook
```

### Key Architectural Patterns

**Tiptap Editor Integration**
- Editor instance is created in `src/app/documents/[id]/editor.tsx` using `useEditor` hook
- Editor state is globally accessible via Zustand store (`useEditorStore`)
- All editor lifecycle events (onCreate, onUpdate, onSelectionUpdate, etc.) sync the editor instance to the store
- Toolbar components in `toolbar.tsx` consume the editor instance from the store to check active states and execute commands
- Editor extensions: StarterKit, TaskList, TaskItem, Table (with resize), Image, ImageResize, Underline

**State Management Pattern**
- Zustand store (`src/store/use-editor-store.tsx`) holds the single source of truth for editor instance
- Components like Toolbar read `editorInstance` to determine button states (bold, italic, etc.)
- Commands are executed via Tiptap's chain API: `editor.chain().focus().toggleBold().run()`

**Styling Architecture**
- Editor has fixed document dimensions (816px width, 1054px min-height) mimicking paper
- Print styles are implemented via Tailwind's `print:` variants
- Path alias: `@/*` maps to `./src/*`

### Known TODOs & Limitations
From the codebase comments:
- Image resize not working as expected (editor.tsx:68)
- Spell check functionality needs implementation (toolbar.tsx:69)
- Comment functionality not implemented (toolbar.tsx:104)
- Missing toolbar features: font family, headings, font size, text color, highlight color, link, image, list (toolbar.tsx:127-141)

## TypeScript Configuration
- Target: ES2017
- Strict mode enabled
- Module resolution: bundler
- Path alias: `@/*` → `./src/*`
