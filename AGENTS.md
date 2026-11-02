<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Kindora client

Single Next.js 16.4.3 app (App Router, React 19, TypeScript, Tailwind v4, shadcn/ui). Not a monorepo. `CLAUDE.md` is just `@AGENTS.md` — keep all guidance in this file.

## Commands (npm, Node 24)

- `npm run dev` — dev server. It also (re)writes the managed block above; content outside the `<!-- BEGIN/END:nextjs-agent-rules -->` markers is preserved, so add your own sections around it, not inside it.
- `npm run lint` and `npm run typecheck` — both exit clean on a fresh tree; run them to verify a change. There is **no test runner and no CI workflow** in this repo — don't invent `npm test`.
- `npm run format` — Prettier write over `**/*.{ts,tsx}`. Config is `.prettierrc`: no semicolons, double quotes, `endOfLine: lf`, Tailwind class sorting via `prettier-plugin-tailwindcss`. Lint is flat config `eslint.config.mjs` (`eslint-config-next`); `npm run lint` runs bare `eslint` over the repo.

## Architecture / conventions

- Entry: `app/layout.tsx` → `app/page.tsx`. Layout wraps children in `components/theme-provider.tsx` (next-themes, `suppressHydrationWarning` on `<html>` is required for theme hydration; a `d`-key hotkey toggles theme). `hooks/` is an empty placeholder (only `.gitkeep`).
- No data layer yet: all page content is mock data in `lib/data.ts` (Unsplash URLs). Remote image hosts are allowlisted in `next.config.ts` (`images.unsplash.com` only) — a new host must be added there or `next/image` will fail.
- Path alias `@/*` → repo root (tsconfig), e.g. `@/components/ui/button`.
- shadcn style is `base-nova` (`components.json`): UI primitives are Base UI (`@base-ui/react`), **not Radix** — don't paste Radix-based shadcn snippets. Add components with `npx shadcn@latest add <name>` (lands in `components/ui/`).
- `cn` is the `cn` npm package, re-exported from `lib/utils.ts` — do not add a clsx/tailwind-merge helper.
- Tailwind v4 is CSS-first: there is no `tailwind.config.*`; theme tokens and `@theme inline` live in `app/globals.css`, wired through `postcss.config.mjs` (`@tailwindcss/postcss`). Prettier reads that same file (`tailwindStylesheet`) for class ordering.
- `.env` (gitignored, not committed) defines `NEXT_PUBLIC_API_URL=http://localhost:8000` for a separate backend; no code reads `process.env` yet.
