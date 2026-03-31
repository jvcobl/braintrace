# NeuroRoute

Interactive neuroscience learning app for NBB302. Each module lets you experience a perceptual or cognitive phenomenon, trace the neural pathway, and read a concise explanation.

## Routes

| Path | Page |
|------|------|
| `/` | Home — module list and entry point |
| `/module/:id` | Module page (Intro → Experience → Trace → Explain) |
| `/course-map` | NBB302 units mapped to NeuroRoute modules |
| `/about` | Product description and format overview |

## Modules

| # | Module | Topic |
|---|--------|-------|
| 1 | Blurry Object Guess | Top-down processing, OFC predictions |
| 2 | Face or Not | Fusiform face area, pareidolia |
| 3 | Sudden Noise | Startle reflex, brainstem circuits |
| 4 | Fear Cue and Extinction | Amygdala, vmPFC, extinction as new learning |
| 5 | Memory Under Load | Working memory, dlPFC, cognitive overload |

## Architecture

```
src/
  pages/              Route-level pages (Index, ModulePage, CourseMap, About, NotFound)
  components/
    layout/           Header, Footer, Layout (shared shell with Outlet)
    module/           SectionNav, IntroSection, ExperienceSection, TracePanel, ExplainSection
      demos/          One interactive demo component per module
    ui/               shadcn/ui primitives
  data/
    modules.ts        All module content: intro copy, trace nodes, explain sections
    courseMap.ts       NBB302 unit definitions and module-to-unit mappings
```

Each module follows the same four-tab flow: **Intro → Experience → Trace → Explain**. Module content is defined in `src/data/modules.ts`; demos are self-contained components in `src/components/module/demos/`.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Output goes to `dist/`. The app is fully client-side — no backend, no API keys, no environment variables required.

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · React Router
