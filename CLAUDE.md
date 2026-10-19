# CLAUDE.md

> Claude Code reads this file automatically at the start of every session.
> Keep it short (< 150 lines), concrete, and true.

## Project
Team Project Starter – Modern fullstack web application for Course 4 (The Modern AI Software Developer).
Full specification: `docs/PRD.md`.

## Tech Stack
- **Frontend**: React 18 + Vite + TypeScript (`/client`)
- **Backend**: Node.js + Express + TypeScript (`/server`)
- **Database / Storage**: SQLite via Prisma ORM (`server/prisma/schema.prisma`)
- **Validation**: Zod schema validation on route boundaries
- **Testing**: Vitest + Supertest (unit & API tests in `/server/tests`), Playwright (E2E in `/e2e`)

## Key Commands
```bash
npm install            # Install dependencies for both client and server
npm run dev            # Start both client (http://localhost:5173) and server (http://localhost:3000)
npm test               # Run all backend unit & API tests
npm run lint           # Run linting across client and server
npm run build          # Production build for client and server
```

## Project Structure
```
├── client/
│   ├── src/
│   │   ├── components/  # Reusable UI components (PascalCase)
│   │   ├── pages/       # Route page views (BoardPage.tsx)
│   │   ├── App.tsx      # Main application component
│   │   └── main.tsx     # Client entry point
├── server/
│   ├── prisma/          # Database schema (schema.prisma)
│   ├── src/
│   │   ├── routes/      # Express route handlers (kebab-case)
│   │   ├── app.ts       # Express app configuration & middleware
│   │   ├── db.ts        # Data layer / store
│   │   └── index.ts     # Server entry point (starts listener)
│   └── tests/           # Vitest + Supertest specs
├── e2e/                 # Playwright E2E tests (tasks.spec.ts)
├── .claude/             # Custom Claude commands and subagents
└── docs/                # PRD.md, architectural decisions, reports
```

## Coding Conventions
- **TypeScript strict mode**: Never use `any` without an explicit explanatory comment.
- **RESTful Endpoints**: Validate all request parameters and bodies using Zod schemas. Return errors as `{ "error": "<message>" }` with appropriate HTTP status codes (400, 404, 500).
- **Component naming**: React components in `PascalCase.tsx`, CSS in `PascalCase.css`.
- **Route naming**: API routes in `server/src/routes/*.ts` using `kebab-case.ts`.
- **Healthcheck route**: Always preserve `/health` returning `{ "status": "ok", "uptime": number }`.

## Workflow Rules for Claude Code Agent
1. **Plan first**: For any change modifying more than 1 file, propose a clear step-by-step plan before making edits.
2. **Never guess**: If a requirement in `docs/PRD.md` is ambiguous, ask the developer rather than assuming.
3. **Test-driven**: Always run `npm test` after implementing a backend route or business logic change.
4. **Never commit secrets**: Never output, read, or commit `.env` or API keys.
5. **Keep PRs small**: Prefer small, focused commits under 300 lines.

## Security Rules (To be audited in Session 7)
- Validate and sanitize all external user input before processing.
- Do not log sensitive credentials, authorization tokens, or personal data.
- Ensure proper resource ownership checks before mutation or deletion.
