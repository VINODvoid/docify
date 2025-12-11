<div align="center">
  <img src="public/logo.svg" alt="Docify Logo" width="120" height="120">

  # Docify

  ### Beautiful Document Editor with Real-Time Collaboration

  Create, edit, and collaborate on documents in real-time with a modern, elegant interface.

  [Demo](https://docify.vercel.app) · [Report Bug](https://github.com/yourusername/docify/issues) · [Request Feature](https://github.com/yourusername/docify/issues)

</div>

---

## ✨ Features

### 🎨 Modern Dark Theme UI
- **Sage Green Color Palette** - Elegant sage green (#9DD1B3) with warm peach accents (#FFE6BA)
- **Glassmorphism Effects** - Backdrop blur, gradient borders, and floating panels
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### ✍️ Rich Text Editor
- **Tiptap-Powered** - Built on ProseMirror for robust editing
- **Comprehensive Formatting** - Bold, italic, underline, strikethrough, headings
- **Advanced Features**:
  - Tables with resizing capabilities
  - Image upload and resizing
  - Task lists with checkboxes
  - Font family and size customization
  - Text alignment and line height
  - Text color and highlighting
  - Hyperlinks with auto-detection
  - Print-ready output (PDF export)

### 🤝 Real-Time Collaboration
- **Live Cursors** - See collaborators' cursors in real-time
- **Simultaneous Editing** - Multiple users can edit at once
- **Comments & Threads** - Discuss changes with inline comments
- **Presence Awareness** - Know who's viewing the document
- **Organization Support** - Share docs across teams

### 📄 Document Management
- **Template Gallery** - Quick-start with pre-built templates
- **Smart Search** - Find documents instantly
- **Auto-Save** - Never lose your work
- **Document History** - Track creation and modification dates
- **Personal & Team Docs** - Organize by user or organization

### 🔐 Authentication & Security
- **Clerk Integration** - Secure authentication with social logins
- **User Management** - Profile management and settings
- **Organization Switcher** - Seamlessly switch between personal and team workspaces
- **Protected Routes** - Role-based access control

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library (50+ components)
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animations

### Editor
- **[Tiptap](https://tiptap.dev/)** - Headless rich-text editor
- **[ProseMirror](https://prosemirror.net/)** - Toolkit for rich-text editing
- **Custom Extensions**:
  - Font size control
  - Line height adjustment
  - Table resizing
  - Image handling

### Real-Time Collaboration
- **[Liveblocks](https://liveblocks.io/)** - Real-time collaboration infrastructure
  - Live cursors and presence
  - Collaborative editing
  - Comments and threads
  - Offline support (experimental)

### Backend & Database
- **[Convex](https://www.convex.dev/)** - Backend-as-a-service
  - Real-time database sync
  - Server functions
  - Pagination support
  - Type-safe queries

### Authentication
- **[Clerk](https://clerk.com/)** - Complete user management
  - Social logins (Google, GitHub, etc.)
  - Organization management
  - Custom theming
  - Session handling

### State Management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Minimal state management
- **[Nuqs](https://nuqs.47ng.com/)** - Type-safe URL search params

### UI & UX
- **[Lucide Icons](https://lucide.dev/)** - Beautiful icon library (500+ icons)
- **[React Color](https://casesandberg.github.io/react-color/)** - Color pickers
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Date-fns](https://date-fns.org/)** - Date formatting

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** or **pnpm**
- **Clerk Account** - [Sign up](https://clerk.com/)
- **Convex Account** - [Sign up](https://www.convex.dev/)
- **Liveblocks Account** - [Sign up](https://liveblocks.io/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/docify.git
cd docify
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Convex Backend
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
CONVEX_DEPLOYMENT=your_convex_deployment_name

# Liveblocks
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=your_liveblocks_public_key
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
```

4. **Run the Convex development server**

```bash
npx convex dev
```

5. **Run the Next.js development server**

In a new terminal:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
docify/
├── convex/                      # Convex backend functions
│   ├── documents.ts            # Document CRUD operations
│   └── liveblocks.ts           # Liveblocks auth endpoint
├── public/                      # Static assets
│   └── logo.svg                # App logo
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── (root)/             # Root auth layout
│   │   │   ├── layout.tsx      # Clerk provider with dark theme
│   │   │   └── page.tsx        # Smart redirect (auth state)
│   │   ├── api/                # API routes
│   │   │   └── liveblocks-auth/# Liveblocks authentication
│   │   ├── documents/[id]/     # Document editor
│   │   │   ├── document.tsx    # Main wrapper
│   │   │   ├── editor.tsx      # Tiptap editor
│   │   │   ├── toolbar.tsx     # Formatting toolbar
│   │   │   ├── navbar.tsx      # Document navbar
│   │   │   └── ...             # Other components
│   │   ├── home/               # Dashboard
│   │   │   ├── page.tsx        # Documents list
│   │   │   ├── navbar.tsx      # Dashboard navbar
│   │   │   ├── search-input.tsx# Search functionality
│   │   │   ├── templates-gallery.tsx # Template carousel
│   │   │   └── documents-table.tsx   # Documents grid
│   │   ├── landing/            # Landing page
│   │   │   ├── page.tsx        # Landing composition
│   │   │   └── layout.tsx      # Clerk provider
│   │   ├── globals.css         # Design system & Tailwind
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── landing/            # Landing page sections
│   │   │   ├── hero-section.tsx
│   │   │   ├── feature-grid.tsx
│   │   │   ├── pricing-section.tsx
│   │   │   ├── stats-section.tsx
│   │   │   ├── editor-preview.tsx
│   │   │   └── footer.tsx
│   │   └── ui/                 # shadcn/ui components (50+)
│   ├── constants/              # App constants
│   │   ├── templates.ts        # Document templates
│   │   └── margins.ts          # Editor margins
│   ├── extensions/             # Custom Tiptap extensions
│   │   ├── font-size.ts
│   │   └── line-height.ts
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-mobile.ts
│   │   ├── use-debounce.ts
│   │   └── use-search-params.ts
│   ├── lib/                    # Utility functions
│   │   └── utils.ts            # cn() helper
│   └── store/                  # State management
│       └── use-editor-store.tsx # Zustand editor store
├── .env.local                  # Environment variables (gitignored)
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── CLAUDE.md                   # Claude Code instructions
└── README.md                   # This file
```

---

## 🎨 Design System

### Color Palette

**Sage Green Theme** - Soft minimalism with rounded corners

| Color | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| **Primary** | `#88C0A0` | `#9DD1B3` | Buttons, links, accents |
| **Accent** | `#FFD6A5` | `#FFE6BA` | Highlights, secondary actions |
| **Background** | `#FCFCFC` | `#171C1A` | Page background |
| **Foreground** | `#1A1F1E` | `#F0F4F3` | Text |
| **Card** | `#FFFFFF` | `#222A29` | Elevated surfaces |
| **Muted** | `#6B7D78` | `#8A9C96` | Secondary text |
| **Border** | `#E5E7E6` | `#2A3331` | Dividers, outlines |

### Typography

- **Headings**: `DM Serif Display` (serif, elegant)
- **Body**: `Plus Jakarta Sans` / `Inter` (sans-serif)
- **Code**: `IBM Plex Mono`

### Border Radius

- Cards & Panels: `1.2rem` (rounded-xl)
- Buttons: `0.5rem` to `1rem`
- Inputs: `9999px` (full rounded)

---

## 🧩 Key Features Breakdown

### Document Templates

Pre-built templates for common use cases:
- 📄 Blank Document
- ✉️ Business Letter
- 📝 Resume
- 📊 Project Proposal
- 📋 Meeting Notes
- 📧 Cover Letter

### Toolbar Features

**Text Formatting**:
- Font family selector (13 fonts)
- Heading levels (H1-H6)
- Font size with +/- controls
- Bold, Italic, Underline, Strikethrough
- Text color picker
- Highlight color picker

**Paragraph Formatting**:
- Text alignment (left, center, right, justify)
- Line height (single, 1.15, 1.5, double)
- Bullet & numbered lists
- Task lists (checkboxes)

**Insert**:
- Tables (with resize)
- Images (upload or URL)
- Hyperlinks

**Document Actions**:
- Undo/Redo
- Print
- Spell check
- Remove formatting
- Comments (via Liveblocks)

### Export Options

- **PDF** - Print to PDF
- **HTML** - Export as HTML
- **JSON** - Tiptap JSON format
- **Plain Text** - Strip formatting

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Next.js](https://nextjs.org/)** - React framework
- **[Tiptap](https://tiptap.dev/)** - Rich-text editor
- **[Liveblocks](https://liveblocks.io/)** - Real-time collaboration
- **[Convex](https://www.convex.dev/)** - Backend infrastructure
- **[Clerk](https://clerk.com/)** - Authentication
- **[shadcn/ui](https://ui.shadcn.com/)** - UI components
- **[Tailwind CSS](https://tailwindcss.com/)** - CSS framework

---

## 📧 Contact

**Your Name** - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

**Project Link**: [https://github.com/yourusername/docify](https://github.com/yourusername/docify)

---

<div align="center">
  Made with ❤️ using Next.js, Tiptap, and Liveblocks
</div>
