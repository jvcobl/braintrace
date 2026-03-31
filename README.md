# NeuroRoute

Interactive neuroscience learning app for NBB302. Each module lets you experience a perceptual or cognitive phenomenon, trace the neural pathway, and read a concise explanation.

Fully client-side — no backend, no API keys, no environment variables.

## Routes

| Path | Page |
|------|------|
| `/` | Home — module grid and entry point |
| `/module/:id` | Module page with four tabs: Intro, Experience, Trace, Explain |
| `/course-map` | NBB302 units with key topics and linked modules |
| `/about` | Product description and three-step format overview |
| `*` | 404 — not found |

## Modules

| ID | Module | Unit | Topic |
|----|--------|------|-------|
| `mod-1` | Blurry Object Guess | Visual Perception | Top-down processing, OFC predictions |
| `mod-2` | Face or Not? | Visual Perception | Fusiform face area, pareidolia |
| `mod-3` | Sudden Noise Reaction | Sensory Reflexes | Startle reflex, brainstem circuits |
| `mod-4` | Fear Cue and Extinction | Emotion and Learning | Amygdala, vmPFC, extinction as new learning |
| `mod-5` | Memory Under Load | Memory Systems | Working memory, dlPFC, cognitive overload |

## Architecture

```
src/
  pages/                 Route pages: Index, ModulePage, CourseMap, About, NotFound
  components/
    layout/              Header, Footer, Layout (shared shell via React Router Outlet)
    module/              SectionNav, IntroSection, ExperienceSection, TracePanel, ExplainSection
      demos/             One self-contained demo component per module
    ui/                  shadcn/ui primitives (not project-specific)
  data/
    modules.ts           All module content — intro copy, trace nodes, explain sections
    courseMap.ts          NBB302 unit definitions and module-to-unit mappings
```

Each module follows the same four-tab flow: **Intro → Experience → Trace → Explain**.

Module content lives in `src/data/modules.ts`. Each demo is a standalone component in `src/components/module/demos/` mapped by module ID in `ExperienceSection.tsx`.

## Development

```bash
npm install
npm run dev          # Vite dev server on localhost:8080
```

## Build

```bash
npm run build        # Output: dist/
npm run preview      # Preview production build locally
```

## Tech

React 18 · TypeScript 5 · Vite 5 · Tailwind CSS 3 · shadcn/ui · React Router 6
