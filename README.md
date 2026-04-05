# Zakariya Raddaoui — Portfolio v2

Modern portfolio built with **Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion**.

## Tech Stack
- Vite + React 19 + TypeScript
- Tailwind CSS v4 (via @tailwindcss/vite)
- Framer Motion
- Fonts: Syne (display) + DM Sans (body)

## Getting Started

```bash
npm install       # install deps
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview build locally
```

## Structure

```
src/
  components/   Navbar, Footer, CursorGlow
  sections/     Hero, About, Skills, Projects, Contact
  hooks/        useScrollReveal, variants
  data/         index.ts  ← all your content lives here
```

## Customization
Edit `src/data/index.ts` to update projects, skills, experience, and stats.

## Deploy to Vercel
1. Push to a new GitHub repo
2. Import on vercel.com — auto-detects Vite
3. Deploy. Done.

## Add your CV
Drop `CV_Zakariya_Raddaoui.pdf` into `/public/` — the Hero download button already points to it.
