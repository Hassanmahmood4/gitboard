# GitBoard

**GitBoard** is a modern, AI-flavored GitHub dashboard: explore repositories, run a guest-style VS Code workspace preview, and sign in with Clerk to load real repo data. Built as a small monorepo with a premium dark UI (violet accent, timeline loading experience on the dashboard) and a lightweight Hono API.

## Description

- **Marketing site** — Hero, product showcase, interactive feature previews, pricing, and CTAs.
- **Dashboard** (authenticated) — Repository grid with search, refresh, and Supabase-ready wiring.
- **Guest workspace** — Try the UI without signing in (`/workspace`).
- **Backend** — `GET /api/github` and `POST /api/ai` (stub) proxied from Next.js.

Stack: **Next.js 16** (App Router), **React 19**, **Tailwind CSS**, **Framer Motion**, **Clerk**, **Hono**, **TypeScript**.

## Monorepo layout

| Path        | Role |
|------------|------|
| `frontend/` | Next.js app: pages, components, hooks, `styles/globals.css`, middleware. |
| `backend/`  | Hono server: GitHub fetch helpers and JSON API. |
| Root        | npm workspaces, shared `package-lock.json`. |

The dev server proxies `/api/*` to the backend (`BACKEND_URL`, default `http://127.0.0.1:3001`).

## Quick start

```bash
cp .env.example .env.local
# Add Clerk (and optional Supabase) keys in .env.local. Set BACKEND_URL if needed.

npm install
npm run dev
```

- App: **http://localhost:3000**  
- API: **http://localhost:3001**

Workspace-only:

```bash
npm run dev -w backend
npm run dev -w frontend
```

## Build

```bash
npm run build
npm run start
```

Point `BACKEND_URL` at your deployed API when running the frontend in production.

## License

Private / all rights reserved unless you add an explicit license file.

Unlocking achievements 🚀
