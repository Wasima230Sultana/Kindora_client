<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Kindora client

Single Next.js 16.4.3 app (App Router, React 19, TypeScript, Tailwind v4, shadcn/ui). Not a monorepo. `CLAUDE.md` is just `@AGENTS.md` — keep all guidance in this file.

## Commands (npm, Node 24)

- `npm run dev` — dev server. It also (re)writes the managed block above; content outside the `<!-- BEGIN/END:nextjs-agent-rules -->` markers is preserved, so add your own sections around it, not inside it.
- `npm run lint` — bare `eslint` over the repo (flat config `eslint.config.mjs`, `eslint-config-next`). Exits 0 but currently reports 6 unused-variable warnings; don't treat pre-existing warnings as your regression.
- `npm run typecheck` — `tsc --noEmit`. Currently **fails**: `app/upcoming-events/[id]/page.tsx` has an implicit-`any` `params` (untracked WIP). If you're not touching that file, ignore that one error; otherwise type it properly (`await params` is async in Next 16).
- `npm run format` — Prettier write over `**/*.{ts,tsx}`. Config is `.prettierrc`: no semicolons, double quotes, `endOfLine: lf`, Tailwind class sorting via `prettier-plugin-tailwindcss`.
- No test runner and no CI workflow — don't invent `npm test`.

## Architecture / conventions

- Entry: `app/layout.tsx` → `app/page.tsx`. Layout wraps children in `components/theme-provider.tsx` (next-themes, `suppressHydrationWarning` on `<html>` is required for theme hydration; a `d`-key hotkey toggles theme). `hooks/` is an empty placeholder (only `.gitkeep`).
- Auth is wired up: better-auth + MongoDB Atlas (`lib/auth.ts` server, `lib/auth-client.ts` browser, handler at `app/api/auth/[...all]/route.ts`; email/password + Google). `.env` (gitignored) must define `MONGODB_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` — it currently does. Database name is hardcoded: `kindora_resources`.
- Root `proxy.ts` (Next 16's replacement for `middleware.ts`) guards `/create-event`, `/profile`, `/upcoming-events/:path*`, redirecting signed-out users to `/`. Note `/profile` has no page yet.
- Data layer is half-built: home-page content is still mock data in `lib/data.ts`, but pages/components fetch a separate backend with **hardcoded** `http://localhost:8000/...` URLs (`app/upcoming-events/page.tsx`, `app/create-event/page.tsx`, `components/home/recent-upcoming-events.tsx`). `NEXT_PUBLIC_API_URL` in `.env` is not read by any code yet — use it (or leave the hardcodes alone consistently) rather than inventing a third pattern. Backend must be running for those fetches to succeed.
- `next.config.ts` allows **all** https image hosts (`remotePatterns: hostname "**"` — changed from an `images.unsplash.com` allowlist); no config edit needed for new hosts.
- Path alias `@/*` → repo root (tsconfig), e.g. `@/components/ui/button`.
- shadcn style is `base-nova` (`components.json`): UI primitives are Base UI (`@base-ui/react`), **not Radix** — don't paste Radix-based shadcn snippets. Add components with `npx shadcn@latest add <name>` (lands in `components/ui/`).
- `cn` is the `cn` npm package, re-exported from `lib/utils.ts` — do not add a clsx/tailwind-merge helper.
- Tailwind v4 is CSS-first: there is no `tailwind.config.*`; theme tokens and `@theme inline` live in `app/globals.css`, wired through `postcss.config.mjs` (`@tailwindcss/postcss`). Prettier reads that same file (`tailwindStylesheet`) for class ordering.
