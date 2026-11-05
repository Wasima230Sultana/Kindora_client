<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Kindora client

Single Next.js 16.4.3 app (App Router, React 19, TypeScript, Tailwind v4, shadcn/ui). Not a monorepo. `CLAUDE.md` is just `@AGENTS.md` — keep all guidance in this file.

## Commands (npm, Node 24)

- `npm run dev` — dev server. It also (re)writes the managed block above; content outside the `<!-- BEGIN/END:nextjs-agent-rules -->` markers is preserved, so add your own sections around it, not inside it.
- `npm run lint` — bare `eslint` over the repo (flat config `eslint.config.mjs`, `eslint-config-next`). Currently **exits 1** with pre-existing problems: 3 errors — `react/no-unescaped-entities` in `app/manage-event/page.tsx`, `react-hooks/set-state-in-effect` in `app/profile/page.tsx` and `components/theme/ThemeToggle.tsx` — plus ~17 unused-variable warnings. Don't fix them unprompted; just don't add new ones.
- `npm run typecheck` — `tsc --noEmit`; currently passes clean.
- `npm run format` — Prettier write over `**/*.{ts,tsx}`. Config is `.prettierrc`: no semicolons, double quotes, `endOfLine: lf`, Tailwind class sorting via `prettier-plugin-tailwindcss`.
- No test runner and no CI workflow — don't invent `npm test`.

## Architecture / conventions

- Entry: `app/layout.tsx` → `app/page.tsx`. Layout wraps children in `components/theme-provider.tsx` (next-themes; `suppressHydrationWarning` on `<html>` is required for theme hydration). `hooks/` is an empty placeholder (only `.gitkeep`).
- **The auth guard does not actually run.** `app/proxy.ts` (Next 16's replacement for `middleware.ts`) exports `proxy()` + a `config.matcher` for `/create-event`, `/profile`, `/manage-event`, redirecting signed-out users to `/login` — but Next only loads `proxy.ts` from the **repo root** (same level as `app/`), so this file is ignored. Verified: unauthenticated `GET /profile` returns 200. Don't assume those routes are protected server-side; moving the file to the root activates the guard.
- Auth is wired up: better-auth + MongoDB Atlas (`lib/auth.ts` server — email/password + Google + `jwt()` plugin; `lib/auth-client.ts` browser; handler `app/api/auth/[...all]/route.ts`). `.env` (gitignored) must define `MONGODB_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_API_URL` — it currently does. Database name is hardcoded: `kindora_resources`.
- Data layer has two halves: home-page sections (banner, gallery, footer, …) render mock data from `lib/data.ts`, while everything else fetches a separate backend through `process.env.NEXT_PUBLIC_API_URL` (set to `http://localhost:8000` in `.env`; no hardcoded URLs remain — see `app/upcoming-events/`, `app/joined-event/`, `app/manage-event/`, `components/events/*`, `components/home/recent-upcoming-events.tsx`). The backend must be running for those fetches to succeed. Mutations attach a Bearer token obtained from `lib/getTokenFromClient.ts` (`authClient.token()`, which depends on the `jwt()` plugin in `lib/auth.ts`).
- `next.config.ts` allows **all** https image hosts (`remotePatterns: hostname "**"` — changed from an `images.unsplash.com` allowlist); no config edit needed for new hosts.
- Path alias `@/*` → repo root (tsconfig), e.g. `@/components/ui/button`.
- shadcn style is `base-nova` (`components.json`): UI primitives are Base UI (`@base-ui/react`), **not Radix** — don't paste Radix-based shadcn snippets. Add components with `npx shadcn@latest add <name>` (lands in `components/ui/`).
- `cn` is the `cn` npm package, re-exported from `lib/utils.ts` — do not add a clsx/tailwind-merge helper.
- Tailwind v4 is CSS-first: there is no `tailwind.config.*`; theme tokens and `@theme inline` live in `app/globals.css`, wired through `postcss.config.mjs` (`@tailwindcss/postcss`). Prettier reads that same file (`tailwindStylesheet`) for class ordering.
