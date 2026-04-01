# BrainTrace

BrainTrace is a free, interactive neuroscience site. It covers five areas — perception, attention, emotion, learning, and stress — through lessons built around real phenomena you can experience in your browser.

Every lesson follows the same three-step structure: **Experience** a phenomenon, **Trace** the neural pathway, and **Explain** what your brain was doing.

Fully client-side. No accounts, no backend, no tracking.

## Routes

| Path              | Page                                                                 |
| ----------------- | -------------------------------------------------------------------- |
| `/`               | Homepage — unit overview, featured lessons, and site introduction    |
| `/unit/:unitId`   | Unit hub — overview, lesson cards, concept cards, pathways, review   |
| `/module/:id`     | Lesson page — Intro → Experience → Trace → Explain                  |
| `/course-map`     | Topic mapping — connects lessons to classroom topics                 |
| `/about`          | About page — what NeuroRoute is and how lessons work                 |
| `*`               | 404                                                                  |

## Units

| Unit   | Title                                  | Lessons |
| ------ | -------------------------------------- | ------- |
| Unit 1 | Perception and Object Recognition      | 3       |
| Unit 2 | Attention, Cognitive Load, and the PFC | 2       |
| Unit 3 | Emotion, Limbic System, and Amygdala   | 3       |
| Unit 4 | Learning and Fear Conditioning         | 2       |
| Unit 5 | Stress and Homeostasis                 | 2       |

**12 interactive lessons** across 5 units, with 211 reference items (concept cards, pathway traces, distinction blocks, case notes, and review questions).

## Lesson Structure

Each lesson contains:

- **Intro** — hook, context, and learning objective
- **Experience** — an interactive demo (sorting, building, observing, or recalling)
- **Prediction & Outcome** — bridges the demo to the neuroscience (appears after first interaction)
- **Trace** — step-by-step neural pathway walkthrough
- **Explain** — four-part write-up: What Happened, What Your Brain Did, Key Pathway, Why It Matters

## Project Structure

```
src/
├── pages/                   Route pages (Index, UnitHub, ModulePage, CourseMap, About, NotFound)
├── components/
│   ├── layout/              Header, Footer, Layout (shared shell via Outlet)
│   ├── module/              Lesson UI: SectionNav, IntroSection, ExperienceSection,
│   │   │                    TracePanel, ExplainSection, PredictionOutcome
│   │   ├── demos/           One self-contained demo component per lesson (12 total)
│   │   └── experience/      Shared demo primitives (ExperienceShell, FeedbackCard)
│   ├── study/               Unit hub components (LessonCard, ConceptCardGrid,
│   │                        PathwaySection, DistinctionSection, CaseNoteSection, ReviewSection)
│   └── ui/                  shadcn/ui primitives
├── data/
│   ├── modules.ts           Lesson definitions (titles, hooks, trace nodes, explain content)
│   ├── courseMap.ts          Unit-to-lesson mapping for the Course Map page
│   └── content/
│       ├── types.ts          Shared content type definitions
│       ├── registry.ts       Central registry mapping units ↔ lessons
│       ├── index.ts          Master export for all unit content
│       ├── unit1-perception.ts        Unit 1 content (30 concepts, 4 pathways, 6 distinctions)
│       ├── unit2-attention-pfc.ts     Unit 2 content (17 concepts, 3 pathways, 5 distinctions)
│       ├── unit3-emotion-amygdala.ts  Unit 3 content (30 concepts, 5 pathways, 5 distinctions)
│       ├── unit4-fear-conditioning.ts Unit 4 content (17 concepts, 3 pathways, 4 distinctions)
│       └── unit5-stress-homeostasis.ts Unit 5 content (23 concepts, 3 pathways, 5 distinctions)
│       └── predictionOutcomeContent.ts Prediction & Outcome bridge text per lesson
├── hooks/                   Custom hooks (use-mobile, use-toast)
├── lib/                     Utilities (cn helper)
└── index.css                Design tokens and Tailwind config
```

## Development

```bash
npm install
npm run dev          # Vite dev server on localhost:8080
```

## Build

```bash
npm run build        # TypeScript check + Vite build → dist/
npm run preview      # Preview production build locally
```

## Tech Stack

React 18 · TypeScript 5 · Vite 5 · Tailwind CSS 3 · shadcn/ui · React Router 6

## License

All content is original. Originally developed alongside Emory University's NBB302 course.
