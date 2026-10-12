# BrainTrace

BrainTrace is a free, interactive neuroscience site built from Emory University NBB302 (Behavioral Neuroscience) course notes. It covers five areas (perception, attention, emotion, learning, and stress) through lessons built around real phenomena you can experience in your browser.

Every lesson follows the same three-step structure: **Experience** a phenomenon, **Trace** the neural pathway, and **Explain** what your brain was doing.

Fully client-side. No accounts, no backend, no tracking.

Live site: [learnbraintrace.com](https://learnbraintrace.com)

## What's inside

| Topic                                  | Lessons |
| -------------------------------------- | ------- |
| Perception and Object Recognition      | 3       |
| Attention, Cognitive Load, and the PFC | 2       |
| Emotion, Limbic System, and Amygdala   | 3       |
| Learning and Fear Conditioning         | 2       |
| Stress and Homeostasis                 | 2       |

**12 interactive lessons** across 5 topics. Each topic also has a study guide with 211 reference items in total (concept cards, pathway walkthroughs, distinctions, case notes, and review questions), and three concept pages explain the shared prediction-loop framework.

## Lesson structure

- **Intro**: hook, context, and learning objective
- **Experience**: an interactive demo (predicting, sorting, building, observing, or recalling), ending with a summary and a **Prediction & Outcome** recap that bridges the demo to the neuroscience
- **Trace**: the neural pathway, as an interactive diagram or a step-by-step walkthrough
- **Explain**: What Happened, What Your Brain Did, Key Pathway, Why It Matters, plus a Prediction Lens and deeper notes for the flagship lessons

## Routes

| Path                                   | Page                                                         |
| -------------------------------------- | ------------------------------------------------------------ |
| `/`                                    | Homepage                                                     |
| `/topics`, `/topics/:slug`             | Topic index and topic pages (lessons + study guide link)     |
| `/module/:slug`                        | Lesson: Intro → Experience → Trace → Explain (`#trace` etc.) |
| `/unit/:unitId`                        | Study guide for a topic                                      |
| `/how-your-brain-predicts` (+ 3 pages) | Concept pages: The Loop, Precision & Attention, Failures     |
| `/course-map`                          | How lessons connect to NBB302 course topics                  |
| `/about`                               | About the project                                            |
| `*`                                    | Not found                                                    |

## Quality

- Every lesson can be completed with a keyboard alone; text meets WCAG AA contrast; animations respect `prefers-reduced-motion`.
- Layouts are checked at 320–1440px with no horizontal scrolling.
- Fonts (DM Serif Display, DM Sans) are self-hosted, so the site makes no third-party requests.

## Project structure

```
src/
├── pages/            Route pages (home, topics, lessons, study guides, concept pages, about)
├── components/
│   ├── layout/       Header, footer, breadcrumb, search
│   ├── module/       Lesson UI: section tabs, intro, trace diagram/panel, explain, Prediction & Outcome
│   │   ├── demos/        One self-contained demo per lesson
│   │   └── experience/   Shared demo pieces (ExperienceShell, FeedbackCard, AnswerLine)
│   ├── study/        Study guide components (concept cards, pathways, distinctions, case notes, review)
│   └── ui/           shadcn/ui primitives
├── data/
│   ├── modules.ts            Lesson definitions (titles, intros, trace steps, explain content)
│   ├── moduleDefinitions.ts  Trace diagrams, Prediction Lens and deeper notes for flagship lessons
│   └── content/              Study guide content per unit, plus per-lesson copy
├── hooks/            Page titles/meta, misc hooks
└── index.css         Design tokens and fonts
```

## Development

```bash
npm install
npm run dev                          # dev server on localhost:8080
npx tsc --noEmit -p tsconfig.app.json   # type-check
npm run build                        # production build → dist/
npm run preview                      # serve the production build
```

## Tech stack

React 18 · TypeScript 5 · Vite 5 · Tailwind CSS 3 · shadcn/ui · React Router 6

## How it was built

The lesson content comes from the author's NBB302 course notes, and the author designed the lesson structure and interactions. The code was written with AI-assisted tools (an initial scaffold in Lovable, later development with Claude Code) under the author's direction and review, which is why most commits are authored by those tools.

## Credits

- Fonts: DM Serif Display and DM Sans, SIL Open Font License (licenses in `public/fonts`).
- "The Dress" photograph (2015) by Cecilia Bleasdale, shown for educational illustration.
- BrainTrace is an independent study project. It is not affiliated with or endorsed by Emory University, and it is not medical advice.
