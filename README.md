# Harshvardhan Singh — Portfolio

A cinematic, scroll-driven portfolio for a video editor, cinematographer and visual storyteller.

**Stack:** Next.js 16 (Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · GSAP (ScrollTrigger) · Motion

## Run locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/data/projects.ts` | Every project, role, link and timeline entry. Content changes start here. |
| `src/components/sections/` | One component per chapter (Brand, Instagram, Motion Graphics, Freelance, Corporate, Events, Travel, Photography). |
| `src/components/MediaFrame.tsx` | Shared video/image player: lazy-loads, unloads off-screen videos, click to play with sound. |
| `public/media/` | Videos and images. |

## About the media

The videos in `public/media/` are web-optimised copies (1080p, H.264, `faststart`) so the repo stays within GitHub's
file-size limits. Full-quality masters are kept outside the repo.
