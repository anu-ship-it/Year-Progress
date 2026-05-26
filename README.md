# Year Progress

A live, second-by-second breakdown of how much of the year, month, week, and day has elapsed.

## Features

- **Live clock** — ticking every second, timezone-aware
- **Four progress bars** — Year / Month / Week / Day, each with animated fills
- **Stats row** — Day of year, ISO week number, quarter, days remaining
- **Dot grid** — visual calendar of every day in the year, hover for date
- **Milestone tracker** — shows when the next 25/50/75/90% checkpoint hits
- **No hydration mismatch** — SSR-safe client clock with skeleton fallback
- **Zero dependencies beyond Next.js** — no third-party libs, nothing to break

## Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "init"
gh repo create year-progress --public --push

# 2. Import in Vercel dashboard → vercel.com/new
# Auto-detected as Next.js. One click deploy.
```

Or with CLI:
```bash
npm i -g vercel
vercel --prod
```

## Local dev

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **CSS Modules** (no Tailwind, no styled-components — pure CSS)
- **DM Serif Display + DM Mono** (Google Fonts)
