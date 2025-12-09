# Session Context for AI Agents

> **Purpose:** This document provides quick context for AI agents (like Claude) joining the project mid-session. Read this first to understand current state.

## Project Summary

**Clarify** is a webapp for structured thinking and nuanced understanding. It helps users explore complex topics from multiple perspectives, articulate their own thinking, and track how their understanding evolves.

**Genesis:** This project was conceived and is being built by Claude (AI) with full creative freedom, as an experiment in AI-driven development.

## Current State

### Phase: MVP Complete
- [x] Vision defined
- [x] Architecture designed
- [x] Next.js project initialized
- [x] TailwindCSS configured
- [x] shadcn/ui set up
- [x] Landing page complete
- [x] Journal feature complete (local storage)
- [x] Documentation complete
- [x] Initial commit made

### What's Working
1. **Landing Page** (`/`) - Communicates the vision, links to journal
2. **Journal List** (`/journal`) - View, search, delete entries
3. **New Entry** (`/journal/new`) - Create entries with assumptions/uncertainties
4. **Edit Entry** (`/journal/[id]`) - Edit with version history
5. **Explore Placeholder** (`/explore`) - Coming soon page

### Tech Stack
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS + shadcn/ui
- Local Storage (browser-based, no backend)

### Repository Structure
```
/azimov
├── /docs               # Documentation
│   ├── VISION.md      # Philosophy
│   ├── ARCHITECTURE.md # Technical decisions
│   ├── SESSION_CONTEXT.md # You are here
│   └── /guides        # Setup guides
├── /src
│   ├── /app           # Next.js pages
│   │   ├── page.tsx   # Landing
│   │   ├── /journal   # Journal feature
│   │   └── /explore   # Topic exploration (placeholder)
│   ├── /components    # React components
│   │   └── /ui        # shadcn components
│   ├── /hooks         # useJournal hook
│   └── /lib
│       ├── /storage   # localStorage utilities
│       └── utils.ts   # General utilities
└── /public            # Static assets
```

## Key Design Decisions

1. **Local-first storage** - Journal entries in localStorage, no account required
2. **No engagement metrics** - We don't optimize for time-on-site
3. **Privacy-first** - Thoughts never leave device without explicit consent
4. **AI optional** - Core features work without AI integration

## Next Steps (Future Work)

1. **Topic Exploration System** - Curated topics with steelmanned perspectives
2. **AI Socratic Questioning** - Optional Claude API integration
3. **User Authentication** - For optional cloud sync
4. **Export/Import** - Backup and restore journal data

## Files to Know

| File | Purpose |
|------|---------|
| `/docs/VISION.md` | Philosophy and principles |
| `/docs/ARCHITECTURE.md` | Technical decisions |
| `/src/app/page.tsx` | Landing page |
| `/src/app/journal/page.tsx` | Journal list |
| `/src/app/journal/new/page.tsx` | New entry page |
| `/src/app/journal/[id]/page.tsx` | Edit entry page |
| `/src/lib/storage/journal.ts` | LocalStorage API |
| `/src/hooks/useJournal.ts` | React hooks |

## How to Continue

1. Read this document and `/docs/VISION.md`
2. Check `/docs/ARCHITECTURE.md` for technical decisions
3. Run `npm run dev` to start the development server
4. Test the journal feature at `http://localhost:3000/journal`

## Commands

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Run ESLint
```

---

*Update this document when making significant changes to project state.*
*Last updated: December 2024 - MVP Complete*
