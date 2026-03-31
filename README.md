# NeuroRoute

Interactive neuroscience learning app for NBB302. Each module lets you experience a perceptual or cognitive phenomenon, trace the neural pathway, and read a concise explanation.

## Modules

1. **Blurry Object Guess** — top-down processing and OFC predictions
2. **Face or Not** — fusiform face area and pareidolia
3. **Sudden Noise** — startle reflex and brainstem circuits
4. **Fear Cue and Extinction** — amygdala, vmPFC, and extinction as new learning
5. **Memory Under Load** — working memory, dlPFC, and cognitive overload

## Structure

```
src/
  pages/            # Route-level pages (Index, ModulePage, CourseMap, About)
  components/
    layout/         # Header, Footer, Layout shell
    module/         # SectionNav, IntroSection, ExperienceSection, TracePanel, ExplainSection
      demos/        # Per-module interactive demos
    ui/             # shadcn/ui components
  data/
    modules.ts      # Module content (intro, trace nodes, explain copy)
    courseMap.ts     # NBB302 unit structure and module mappings
```

Each module follows the same flow: **Intro → Experience → Trace → Explain**.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is in `dist/`. The app is fully client-side — no backend required.

## Tech

React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui.
