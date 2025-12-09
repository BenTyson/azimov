# Clarify - Technical Architecture

## Overview

Clarify is built with a modern, maintainable stack optimized for developer experience and user privacy.

## Technology Stack

### Frontend
- **Next.js 14** (App Router) - Server components, streaming, optimal performance
- **TypeScript** - Type safety throughout
- **TailwindCSS** - Utility-first styling
- **shadcn/ui** - Accessible, customizable components

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Robust relational database (production)
- **SQLite** - Local development option

### AI Integration (Optional)
- **Anthropic Claude API** - Socratic questioning feature
- Designed to work fully offline without AI features

## Architecture Decisions

### 1. Local-First Storage

**Decision:** Journal entries are stored in browser localStorage by default.

**Rationale:**
- Privacy-first: thoughts never leave the device unless user opts in
- Works offline
- No account required to start using
- Future: optional sync with end-to-end encryption

**Implementation:**
```typescript
// src/lib/storage/journal.ts
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  assumptions: string[];
  uncertainties: string[];
  createdAt: string;
  updatedAt: string;
  version: number;
}
```

### 2. Server Components by Default

**Decision:** Use React Server Components for all pages that don't require interactivity.

**Rationale:**
- Smaller JavaScript bundles
- Better SEO
- Faster initial page loads
- Progressive enhancement

### 3. Route Groups for Organization

**Decision:** Use Next.js route groups to separate concerns.

```
src/app/
├── (marketing)/     # Public pages (landing, about)
├── (app)/           # Application pages (journal, explore)
└── api/             # API endpoints
```

### 4. Component Architecture

**Layers:**
1. **UI Components** (`/components/ui/`) - Base shadcn components
2. **Feature Components** (`/components/features/`) - Domain-specific components
3. **Layout Components** (`/components/layouts/`) - Page layouts and shells

**Naming Conventions:**
- PascalCase for components
- kebab-case for files
- Colocate tests with components

## Database Schema

See `prisma/schema.prisma` for the complete schema.

**Core Models:**
- `User` - Optional, for sync features
- `Topic` - Complex topics for exploration
- `Perspective` - Different viewpoints on topics
- `Journal` - User's thinking entries

## Security Considerations

1. **Data Privacy**
   - Local storage for sensitive thoughts
   - No analytics that track thinking content
   - Optional sync uses E2E encryption

2. **API Security**
   - Rate limiting on all endpoints
   - Input validation with Zod
   - CSRF protection

3. **Content Security**
   - Strict CSP headers
   - XSS prevention through React's default escaping
   - No user-generated HTML

## Performance Targets

- **LCP** < 1.5s
- **FID** < 100ms
- **CLS** < 0.1
- **TTI** < 3s on 3G

## Testing Strategy

1. **Unit Tests** - Vitest for utilities and hooks
2. **Component Tests** - Testing Library for components
3. **E2E Tests** - Playwright for critical user flows

## Deployment

- **Platform:** Vercel (recommended) or any Node.js host
- **Database:** Vercel Postgres, Supabase, or self-hosted
- **CDN:** Automatic via Vercel, or Cloudflare

## Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Auth (optional)
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# AI (optional)
ANTHROPIC_API_KEY="..."
```

---

*Last updated: December 2024*
