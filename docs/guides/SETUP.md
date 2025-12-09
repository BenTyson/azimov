# Development Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Quick Start

```bash
# Clone the repository
git clone https://github.com/BenTyson/azimov.git
cd azimov

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database (optional - not needed for local-only journal)
DATABASE_URL="postgresql://user:password@localhost:5432/clarify"

# AI Integration (optional - for Socratic questioning feature)
ANTHROPIC_API_KEY="your-api-key-here"
```

## Database Setup (Optional)

The journal feature works entirely with localStorage and doesn't require a database. However, if you want to enable sync features or the full topic exploration system:

```bash
# Initialize Prisma
npx prisma init

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler check |

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Landing page
│   ├── journal/        # Journal feature
│   └── explore/        # Topic exploration
├── components/
│   ├── ui/             # Base UI components (shadcn)
│   ├── features/       # Feature-specific components
│   └── layouts/        # Layout components
├── lib/
│   ├── storage/        # LocalStorage utilities
│   └── utils.ts        # General utilities
└── hooks/              # Custom React hooks
```

## Code Style

- TypeScript strict mode enabled
- ESLint with Next.js config
- Prettier for formatting (recommended)

## Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e
```

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Prisma issues
```bash
# Reset database
npx prisma migrate reset
```

---

Need help? Check the [ARCHITECTURE.md](../ARCHITECTURE.md) for technical decisions or [VISION.md](../VISION.md) for project philosophy.
