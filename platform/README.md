# Mehnati — AI Career & Skills Platform

Mehnati ("مهنتي") is a bilingual (Arabic/English) AI-powered platform for building
the professional and personal skills the job market actually pays for —
from learning to landing the job.

No login, no signup. Personalization (skills, goals, certificates, progress)
is stored entirely client-side via `localStorage`.

## Sections

1. **Dashboard** — goal, skill tracking, roadmap progress, recommended jobs and recent quiz results.
2. **Courses** — browse and filter thousands of mock courses by price, language, duration, level, provider and certificate.
3. **Video Library** — curated videos per skill and level.
4. **Market-Demand Skills** — what employers need per field, with average salary, top skills, software/certifications and related jobs.
5. **Tools & Resources** — software, books, websites, channels and templates per skill.
6. **Roadmaps** — step-by-step learning paths from beginner to expert with module completion tracking.
7. **Projects** — realistic briefs at every level with AI feedback on submissions.
8. **Quizzes** — knowledge checks per skill/level; passing (≥70%) issues a certificate to your profile.
9. **Jobs** — job listings matched against your tracked skills with a computed match score.
10. **Community** — per-field discussion threads plus weekly/monthly challenges.
11. **Profile** — shareable summary of skills, certificates, quiz history, project submissions and saved courses.
12. **AI Assistant** — chat with an AI mentor and get instant CV/resume analysis.

## Tech stack

- Next.js (App Router, Turbopack) + React + TypeScript
- Tailwind CSS v4 (`@theme inline` design tokens)
- Custom i18n (English/Arabic) with RTL support and dark/light theme
- `recharts` for dashboard and skills charts
- OpenAI (`gpt-4o-mini`) for the AI Assistant chat and CV analysis, with graceful heuristic fallbacks when no API key is configured

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in your key:

```bash
cp .env.example .env.local
```

| Variable         | Required | Description                                                                                                                  |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `OPENAI_API_KEY` | No       | Enables real AI responses for the chat assistant and CV analysis. Without it, both features fall back to bilingual heuristic responses — the app remains fully functional. |

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — start the production server
- `npm run lint` — run ESLint
