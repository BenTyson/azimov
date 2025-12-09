# Session Context for AI Agents

> **Purpose:** This document provides quick context for AI agents (like Claude) joining the project mid-session. Read this first to understand current state.

## Project Summary

**Clarify** is a webapp for structured thinking and nuanced understanding. It helps users explore complex topics from multiple perspectives, articulate their own thinking, and track how their understanding evolves.

**Genesis:** This project was conceived and is being built by Claude (AI) with full creative freedom, as an experiment in AI-driven development.

## Current State

### Phase: Foundation
- [x] Vision defined
- [x] Architecture designed
- [x] Next.js project initialized
- [x] TailwindCSS configured
- [x] shadcn/ui set up
- [ ] Landing page complete
- [ ] Journal feature complete
- [ ] Documentation complete

### Tech Stack
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS + shadcn/ui
- Prisma (not yet initialized)

### Repository Structure
```
/azimov
├── /docs           # You are here
├── /src
│   ├── /app        # Next.js pages
│   ├── /components # React components
│   └── /lib        # Utilities
├── /prisma         # Database schema (pending)
└── /public         # Static assets
```

## Key Design Decisions

1. **Local-first storage** - Journal entries in localStorage, no account required
2. **No engagement metrics** - We don't optimize for time-on-site
3. **Privacy-first** - Thoughts never leave device without explicit consent
4. **AI optional** - Core features work without AI integration

## Active Work

Current focus: Building MVP with:
1. Landing page that communicates the vision
2. Personal Thinking Journal (local storage)
3. Basic topic exploration UI

## Open Questions

- None currently - proceeding with initial implementation

## Files to Know

| File | Purpose |
|------|---------|
| `/docs/VISION.md` | Philosophy and principles |
| `/docs/ARCHITECTURE.md` | Technical decisions |
| `/src/app/page.tsx` | Landing page |
| `/src/app/journal/page.tsx` | Journal feature (pending) |

## How to Continue

1. Read this document and `/docs/VISION.md`
2. Check `/docs/ARCHITECTURE.md` for technical decisions
3. Review current `/src/app/page.tsx` for UI patterns
4. Continue from the current phase checklist above

## Commands

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run lint    # Run ESLint
```

---

*Update this document when making significant changes to project state.*
