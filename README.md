# Purecreate – Next.js

Modern Next.js 15 (App Router) port of the original Vite + Express monorepo. The frontend (3D customizer) and the OpenAI image generation API now live in a single deployable app.

## Stack

- **Next.js 15** (App Router, React Server Components)
- **React 18.3**
- **Tailwind CSS 3.4**
- **react-three-fiber + drei + three** for the 3D canvas
- **Valtio** for reactive state
- **OpenAI SDK** (DALL·E 3) inside Route Handlers — no separate Express server

## Getting Started

```bash
cp .env.example .env.local        # add your OPENAI_API_KEY
npm install
npm run dev                       # http://localhost:3000
```

### Environment Variables

| Var | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | yes | DALL·E 3 image generation key. Server-side only — never exposed to the browser. |

## API Routes

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/image` | Generate a base64 image from a prompt (DALL·E 3). |
| `GET`  | `/api/health` | Health check. |
| `GET`  | `/api/misc` | Service metadata. |

## Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── api/                # Route handlers (image, health, misc)
│   │   ├── layout.jsx          # Root layout, fonts, metadata, Vercel Analytics
│   │   ├── page.jsx            # Renders <App />
│   │   └── globals.css         # Tailwind + theme entry
│   ├── components/             # UI components (CustomButton, AI/, Modals/, …)
│   ├── canvas/                 # react-three-fiber scene (dynamic-imported, ssr: false)
│   ├── pages-legacy/           # Home / Customizer / TabContent / FilterTabsContainer
│   ├── store/                  # Valtio global state
│   ├── utils/                  # ai-util.js, helpers.js
│   ├── config/                 # framer-motion variants
│   ├── constants/              # editor tabs, fonts, decal types, etc.
│   └── theme/                  # Tailwind layers + custom CSS
├── public/                     # shirt.glb, shirt_baked.glb, textures
├── next.config.mjs
├── tailwind.config.js
└── postcss.config.js
```

## Local Build Note (Windows exFAT)

`next build` may fail with `EISDIR: ... readlink ...styled-jsx/...` if the project lives on an **exFAT** drive (common for external/secondary disks on Windows). This is a Node.js `fs.readlink` quirk — exFAT doesn't support symlinks, so readlink returns `EISDIR` instead of `ENOENT` for regular files, which trips Next.js's prerender step.

Workarounds:
- `next dev` works fine on exFAT — use it for local development.
- For a local production build, move the project to an NTFS drive (e.g. `C:\`).
- Vercel and other Linux hosts are unaffected — the code builds and deploys normally there.

## Deployment (Vercel)

This app is Vercel-ready out of the box.

1. Push the repo to GitHub.
2. In Vercel: **New Project** → import the repo. Framework auto-detects as Next.js, Root Directory `.`.
3. Add `OPENAI_API_KEY` as an environment variable (Production + Preview).
4. Deploy. The `/api/image` route runs as a Node.js serverless function (`maxDuration = 60` for DALL·E latency).

### Notes

- The `/api/image` route is `runtime = 'nodejs'` (the OpenAI SDK is not edge-compatible).
- Static assets (`shirt.glb`, textures) are served from `/public`.
- The 3D canvas is loaded with `next/dynamic({ ssr: false })` because three.js touches `window` at import time.
- CORS is no longer needed — frontend and API share an origin.

## Migration Notes (from the old `ui/` + `server/`)

| Old | New |
|---|---|
| `ui/` Vite + React 18 | `src/` Next 15 App Router |
| `server/` Express + dotenv | `src/app/api/*/route.js` |
| `VITE_BACKEND_URL` env var | (removed — same-origin fetch to `/api/image`) |
| `import.meta.env` | `process.env` (server) — frontend never reads env directly |
| `cors` middleware | not needed |
| `nodemon` | `next dev` HMR |
