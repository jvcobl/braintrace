# BrainTrace — Pre-application audit

*Audited:* `origin/main` @ ef9b3dd · *Date:* 2026-10-11 · *Scope:* every route at 375 / 768 / 1440 px, all 12 lessons played to the end.

## Summary
BrainTrace is already in better shape than most portfolio projects:
- Across 207 crawled page states and full playthroughs of all 12 lessons there were **zero console errors**.
- Lighthouse scores **97–100 for performance** and **100 for best practices and SEO**.
- The Intro → Experience → Trace → Explain structure is consistent and calmly written.

The problems are concentrated rather than systemic. There are nine visible bugs, all small and low-risk to fix:
- a search overlay that doesn't block the page;
- two pages that scroll sideways on phones;
- trace-diagram labels hidden behind nodes;
- five lesson-logic slips, such as Memory Under Load marking correct answers wrong when they are typed without spaces.

Accessibility is mostly sound apart from one systemic issue. The muted-gray text token and several lighter grays fail WCAG AA contrast on every page, which is Lighthouse's only failing audit.

Some polish gaps would show to a recruiter:
- every browser tab is titled "BrainTrace";
- link previews use an old Lovable screenshot;
- the intended DM Serif Display / DM Sans fonts never actually load.

**The single biggest weakness:** the homepage never says what the site is built from or how substantial it is. A recruiter sees a generic "learn neuroscience" page, with no sign that it is a 12-lesson project built from Emory NBB302 course notes. The first interactive moment is also four clicks away.

## How this audit was done
- **Build health:**
  - `npm ci` **fails**: package-lock.json is out of sync with package.json.
  - `bun install` fails outside Lovable: bun.lock points at Lovable's private registry.
  - After `npm install`: `tsc` is clean and `vite build` succeeds with 3 warnings: the `@import must precede all other statements` warning (this is why the fonts never load), a single 700 KB JS chunk (201 KB gzip), and stale browserslist data.
  - ESLint: 4 errors, 11 warnings. The one test is a placeholder and passes.
- **Crawl:** Playwright covered 21 routes plus 12 lessons × 4 tabs × 3 widths (207 states). It captured full-page screenshots, console and network logs, overflow, tap targets, text under 12px, the heading outline and axe-core at 375 and 1440.
- **Lighthouse** (production build, local):

  | Page | Perf | A11y | BP | SEO |
  |---|---|---|---|---|
  | `/` mobile / desktop | 97 / 100 | 96 / 96 | 100 / 100 | 100 / 100 |
  | `/module/face-or-not` mobile / desktop | 97 / 100 | 96 / 96 | 100 / 100 | 100 / 100 |

  CLS is 0 everywhere. The only failing audit is color contrast.
- **Lesson playthroughs:** every lesson was played to the end with all-correct and wrong or alternate runs (every feedback branch and summary tier). Each one was also completed keyboard-only, with reduced motion emulated, with sound off (Sudden Noise), and via sibling-lesson navigation.
- **Code and content review:** visual consistency (file:line), proofreading of all user-visible strings, accessibility, performance, SEO and Lovable leftovers.
- **Verification:** each finding was independently re-checked by a second reviewer who tried to refute it (387 confirmed, 5 refuted). I then deduplicated the results into the items below and personally reproduced every P0 on screen (`docs/audit/before/`).
- **Caveat:** screenshots come from a Linux container without Georgia or San Francisco, so type looks slightly different from a Mac. Judge layout from them, not typeface.

---

## P0 — visible bugs (fix before applying)

**P0-1 · Search overlay doesn't block the page; outside taps go through to the links underneath** · All pages · `Header.tsx:36`, `SearchBar.tsx:112` · Effort S · Risk low
- **Problem:**
  - The header's `backdrop-blur-md` makes it the containing block for the search modal's `fixed inset-0` overlay, so the overlay is only 64 px tall.
  - Only the header gets dimmed.
  - On a phone, tapping outside the panel follows the link underneath, and search stays open on the new page. Reproduced: `/topics` → tap → `/topics/stress`, panel still open.
- **Why it matters:** search is in the header of every page. This looks broken on the first tap.
- **Fix:** delete `backdrop-blur-md`. The header is opaque white, so the blur does nothing visible. Add `mx-4 sm:mx-auto` to the panel so it isn't edge-to-edge on phones.
- **Evidence:** `before/search-after-outside-tap@375.png`

**P0-2 · "More in this unit" opens the next lesson on the current tab (often Explain), skipping Intro and Experience** · All 12 lessons · `ModulePage.tsx:35`, `App.tsx:34` · S · low
- **Problem:**
  - The section state is set once, and `/module/:id` doesn't remount when the id changes.
  - Reading to the end and then clicking a sibling lands on that lesson's Explain tab, whose first line is "The pathway above shows…".
  - Back returns with the wrong tab too.
  - The same bug breaks search deep links when you search from inside a lesson.
- **Why it matters:** this is the most natural click path on the site.
- **Fix:** add a three-line wrapper that renders `<ModulePage key={id} />` on the route. Do not use a `useEffect` reset, which would break the existing `#trace` / `#explain` deep links.
- **Evidence:** `before/sibling-link-opens-on-explain@1440.png`

**P0-3 · Precision & Attention concept page scrolls sideways on phones (418 px wide at 375; also 390 and 414)** · `/how-your-brain-predicts/precision-attention` · `ConceptPrecision.tsx:129` · S · low
- **Fix:** `<div>` → `<div className="min-w-0 flex-1">`. Tested in the browser: the page width goes from 418 to 375.
- **Evidence:** `before/precision-scrolled-sideways@375.png`

**P0-4 · Stress Response Builder "Feedback Override" step scrolls sideways at 320–375 px** · `/module/stress-response-builder` Experience · `StressResponseDemo.tsx:354` · S · low
- **Problem:** the row "Hypothalamus → Pituitary → Adrenal Cortex → Cortisol" can't wrap, so the whole page scrolls sideways. At 390 px "Cortisol" spills past the card.
- **Fix:** add `flex-wrap gap-x-2 gap-y-1` to the row.

**P0-5 · Trace diagram labels are hidden behind nodes or overprint each other** · Trace tab of Sudden Noise, Face or Not, Memory Under Load, Fear Cue (extinction state), Stress (chronic state) · `TracePathwaySVG.tsx:317-365`, `moduleDefinitions.ts:359` · M · med (shared by 6 lessons)
- **Problem:**
  - Edge labels are painted before the nodes, so the nodes cover them: "Top-down face bias" reads "down face bias", and "…weakens under load" reads "eakens under load".
  - On Sudden Noise, "Fast subcortical route" and "Slower cortical route" overprint each other, and "Conscious evaluation" sits under the Amygdala node.
  - In Stress's chronic state, two "Override signal" labels overlap.
- **Why it matters:** the Trace diagram is the site's signature visual, and these defects are visible on desktop.
- **Fix:**
  - Draw edge labels in a second pass after the nodes, keeping the same opacity rule.
  - Add an optional `labelDx`/`labelDy` to the two colliding Sudden Noise edges. This is layout data only, not wording.
  - Drop the duplicate label on the PFC→Hypothalamus edge.
  - Re-check all 6 diagrams × 2 states × 3 widths.
- **Evidence:** `before/trace-sudden-noise-reaction@1440.png`, `before/trace-face-or-not@1440.png`

**P0-6 · Memory Under Load marks correct answers wrong when typed without spaces** · Experience, round 1 onward · `MemoryUnderLoadDemo.tsx:185, 382` · S · low
- **Problem:** typing "WNQ" for W N Q scores 0 of 3. Every tile turns red, and the feedback reads "Even at low load, the task was challenging."
- **Fix:** normalise the input with `.toUpperCase().replace(/[^A-Z]/g, "").split("")`, which accepts "W N Q", "w,n,q" and "WNQ".
- **Evidence:** `before/memory-typed-without-spaces@1440.png`

**P0-7 · Sudden Noise: clicking too early skips the trial with no retry** · Experience · `SuddenNoiseDemo.tsx:153-158, 309-338` · S · low
- **Problem:**
  - "Too early — wait for the circle." offers only "Next Trial", and the trial is never recorded.
  - On the interrupted trial, the flash comes 500 ms before the target, so reacting to the startle cue itself counts as too early.
  - When that happens, the RT comparison disappears, and the reflection still asks "were you startled by the flash?"
- **Fix:** when `reactionMs === -1`, show a "Try again" button that reruns the same trial.
- **Evidence:** `before/sudden-noise-too-early@375.png`

**P0-8 · Fear Cue trial 2 says the cue "has no association yet" right after the user saw it paired** · Experience trial 2 · `FearCueDemo.tsx:19-20, 64-75` · S · low
- **Problem:** trials 1 and 2 are both tagged `acquisition-early`, so trial 2 repeats the "before pairing" feedback ("Correct — the cue has no association yet").
- **Fix (code-only, needs your OK, see Q-7):** re-tag trial 2 as `acquisition-late`. Acquisition then becomes 1 early + 3 late trials, and no copy changes.
- **Evidence:** `before/fear-cue-trial2-feedback@375.png`

**P0-9 · Fear Cue shows an empty 160 px grey box during every feedback step** · Experience, all 8 trials · `FearCueDemo.tsx:295, 320` · S · low
- **Problem:** the cue panel only has content in the predict and outcome steps. During feedback it sits empty above the feedback card.
- **Fix:** keep the outcome visible during feedback (`step === "outcome" || step === "feedback"`), show Continue only on outcome, and scroll the feedback into view.
- **Evidence:** same screenshot as P0-8

---

## P1 — first impression and credibility (high impact, low risk)

**P1-1 · Homepage: say what it is built from and how big it is, and add a one-click way into a lesson** · `/` hero · `Index.tsx:46-59` · S · low
- Under the CTAs, add one muted line: "12 interactive lessons · 5 topics · Built from Emory NBB302 (Behavioral Neuroscience) course notes". Per your preference, your name does not go here.
- Add a secondary CTA "Try a lesson →" that opens one flagship lesson. I suggest Fear Cue and Extinction (it has the strongest narrative arc); your pick.
- Why: today a recruiter needs four clicks to reach anything interactive.

**P1-2 · About page: credit and context** · `/about` · `About.tsx` · S · low
- Add a short "Who built this" paragraph: built by **Jacob Hyun Lee** from Emory University NBB302 (Behavioral Neuroscience) course notes.
- Explain what NBB302 is, so the "NBB302 connection" boxes in each lesson make sense.
- Fix the triple "About": the breadcrumb, the eyebrow and an H1 that says just "BrainTrace". Make the H1 "About BrainTrace" and drop the eyebrow.
- I'll show you the exact wording in the commit.

**P1-3 · Link previews (resume / email / LinkedIn)** · `index.html:6-19` · S · low
- **Problem:** `og:image` is a Lovable preview screenshot on Lovable's R2 bucket, dated 2026-04-01. There is no `og:url`, `og:site_name` or canonical, and the twitter card type is `summary`.
- **Fix:**
  - Self-host a 1200×630 `public/og-image.png` (a homepage hero screenshot with no name).
  - Use absolute URLs on `https://learnbraintrace.com`.
  - Switch the twitter card to `summary_large_image`.
  - Add `og:url`, `og:site_name`, `theme-color` and tidy the head.

**P1-4 · Every page is titled "BrainTrace"** · All routes · new `src/hooks/use-page-meta.ts` · M · low
- **Problem:** browser tabs, history and bookmarks can't tell pages apart.
- **Fix:**
  - Add a small `useEffect` hook that sets `"<Page> | BrainTrace"` and a canonical link, and call it in each page. No react-helmet.
  - The canonical link also collapses the `/module/mod-1` and `/module/blurry-object-guess` duplicates.

**P1-5 · The intended fonts never load ⚠ visible change — approve or skip (Q-1)** · All pages · `index.css:9`, `index.html` · M · low-med
- **Problem:**
  - The Google Fonts `@import` sits after the `@tailwind` directives, so it is dropped in both dev and production.
  - Headings render in Georgia and body text in the system font.
- **Fix:**
  - Self-host the latin woff2 files for DM Serif Display and DM Sans (about 61 KB total, SIL OFL) with `<link rel=preload>`, so CLS stays 0 and there is no third-party request.
  - Remove the dead `@import`.
  - Add `text-balance` to the hero H1, which would otherwise break 2 → 3 lines at 375–390 px.
  - Unify the two serif fallback stacks.
- **Compare:** `before/home-fonts-off@1440.png` vs `before/home-fonts-on@1440.png` (also the `@375` pair and `fear-cue-fonts-*`).

**P1-6 · Heading weight inconsistency** · 4 concept pages and Course Map (H1), lessons 7–12 (Experience H2) · `ConceptHub.tsx:14`, `ConceptLoop.tsx:24`, `ConceptPrecision.tsx:56`, `ConceptFailure.tsx:40`, `CourseMap.tsx:88`, six demo H2s · S · low
- **Problem:** these headings are bold, while every other page uses regular weight. Once the fonts load (P1-5), they would get a synthetic faux-bold.
- **Fix:** class-only. Use `font-display text-3xl` for the H1s, and copy the ExperienceShell classes for the six H2s.

**P1-7 · Color contrast (the only failing Lighthouse a11y audit; fails on all 33 page types)** · Site-wide · `index.css:29`, Header, Breadcrumb, Footer, SectionNav, Index, TopicsIndex, PredictionOutcome, FeedbackCard, SensitivityBadge, demos · S-M · low
- **Root causes and fixes:**
  - The `--muted-foreground` token is 3.94:1. Change it to `220 8% 43%` (5.06:1).
  - `text-gray-400` (2.39:1) is used on nav, breadcrumbs, the footer link, SectionNav and topic hooks. Change it to `gray-500` or `muted-foreground`.
  - The "3 modules" counts are 1.62:1.
  - Faded eyebrows (`text-primary/60`) are 2.6:1.
  - The Prediction & Outcome and FeedbackCard labels are 1.7–2.7:1.
  - `text-amber-500` phase labels are 2.1:1. Change them to `amber-700`.
  - The 988 crisis-line note is 11 px at 3.9:1.
- **Visible effect:** secondary text gets slightly darker; layout is unchanged.

**P1-8 · `prefers-reduced-motion` is ignored everywhere** · Global · `index.css`, `ModulePage.tsx:51,60`, `SearchBar.tsx:27` · S · low
- **Fix:** one global `@media (prefers-reduced-motion: reduce)` rule (zero-length animations and transitions, auto scroll), plus a guard on the smooth `scrollTo`. The cortisol graph's JS animation is unaffected.

**P1-9 · Keyboard and mobile navigation bugs in the header** · Every page · `Header.tsx:56, 23, 87` · S · low
- **Problem:**
  - Tab moves into 5 invisible Topics dropdown links.
  - The mobile menu stays open after navigating by anything other than its own links, ignores Escape, and has no `aria-expanded`.
- **Fix:**
  - Add `group-focus-within:` to the dropdown.
  - Close the menu on route change and on Escape.
  - Add `aria-expanded` and `aria-controls` to the menu button.

**P1-10 · Search results for "Structure" and "Go deeper" open the lesson's Intro instead of the target section** · Header search · `SearchBar.tsx:93` · S · low
- **Fix:** keep the hash when navigating. P0-2's keyed remount makes lesson-to-lesson searches work too.

**P1-11 · Trace diagrams are hard to read on phones** · Trace tab, 6 lessons · `TracePathwaySVG.tsx:288, 295` · S · low
- **Problem:**
  - The diagram's `p-8` padding makes its box scroll 23 px sideways at 375, and labels shrink to 6.9–9 px.
  - The chronic-stress state renders at 0.49 scale, with 6 px labels.
- **Fix:**
  - Use `p-3 sm:p-8` on the container.
  - For wide graphs only (viewBox over 400), set a larger `minWidth` so the box scrolls instead of shrinking the text. Desktop is unchanged.
- **Evidence:** `before/trace-stress-chronic@375.png`

**P1-12 · Six lessons' Trace tab has no "Read the explanation →" step** · Multistable, PFC Matcher and the 4 sorters (TracePanel) · `TracePanel.tsx`, `ModulePage.tsx:121` · S · low
- **Fix:** add an optional prop that renders the same button TracePathwaySVG already uses.

**P1-13 · The "Prediction & Outcome" block appears too early, then vanishes at the end** · 6 lessons (Blurry, Face, Memory, Fear Cue, Sudden Noise, Stress) · each demo's `visible={hasInteracted}`, `ExperienceShell.tsx:39` · M · low
- **Problem:**
  - The block appears on the first click and gives away results. Sudden Noise shows the outcome before any trial; Fear Cue reveals "fear can return later" under the very question that asks you to predict it.
  - It disappears on the summary screen, so the Face or Not ideal run ends with no way forward.
  - Try Again doesn't reset it.
- **Fix:** show the block once the Experience ends, render it below the summary (outside ExperienceShell), and reset it on Try Again.

**P1-14 · Feedback links in the middle of a run silently erase progress** · 6 lessons with per-trial FeedbackCards · e.g. `FearCueDemo.tsx:344`, `FaceOrNotDemo.tsx:275` · S · low
- **Problem:** the "Trace shows…" bridge and the Pathway card on trial 3 of 8 jump to Trace, and coming back restarts the demo at trial 1.
- **Fix:** pass `onNavigate` only on the final trial. FeedbackCard already renders the bridge as plain text without it.

**P1-15 · End-of-experience next steps** · Multistable gallery · `MultistablePerceptionDemo.tsx:286-298` · S · low
- **Problem:** after the last figure only "Try Again" is visible. The "Gallery complete" box with the Trace link is off-screen above.
- **Fix:** add a "Continue to Trace →" button in the actions row.

**P1-16 · Sorter results show right vs wrong only by a 5% tint** · Fear vs Anxiety, Emotion vs Arousal, Classical vs Operant, Homeostasis vs Allostasis; PFC Matcher · each demo's result `<li>` · S · low
- **Problem:** there is no ✓/✗, and you never see your answer or the right one. Four of the six Fear vs Anxiety explanations don't name the category.
- **Fix:** add "✓/✗ You chose X · Answer: Y" from the existing state, reusing the PFC and Stress pattern. UI text only, with no score.

**P1-17 · Blurry Object Guess flow** · Experience · `BlurryObjectDemo.tsx:110, 127, 183` · S · low
- **Problems and fixes:**
  - After "Next Object", the new image sits off-screen or under the sticky header. Fix: scroll it into view with `scroll-mt-20`.
  - The image never sharpens after a guess, although the lesson text says it did. Fix: `blurPx = hasGuessed ? 0 : …`.
  - The emoji's text gives screen-reader users the answer. Fix: add `role="img"`.

**P1-18 · Fear Cue shows the answer before you predict** · Trials 3 and 5 · `FearCueDemo.tsx:269` · S · low
- **Problem:** the phase description (e.g. "no aversive outcome follows") renders above the prediction buttons.
- **Fix:** show it after the prediction.

**P1-19 · Sudden Noise contradicts itself for "I'll flinch" predictions** · `SuddenNoiseDemo.tsx:326-328` · S · low
- **Problem:** "Your prediction lost to a subcortical reflex" is shown to users who predicted they would flinch.
- **Fix:** render it only for the "calm" prediction. No new copy.

**P1-20 · Memory Under Load layout and labelling** · `MemoryUnderLoadDemo.tsx:301, 380, 330, 354` · S · low
- **Problems and fixes:**
  - The 7-letter row wraps 6 + 1 at 375. Fix: `gap-1 sm:gap-1.5`.
  - The math input has no label (axe critical). Fix: add aria-labels.

**P1-21 · Copy that contradicts what the page or demo actually shows (wording only; no science changes)** · Several lessons · `moduleDefinitions.ts:60,114,187,258,307,388`, `modules.ts:140,86,92`, `multistableExamples.ts:22,48`, `FearCueDemo.tsx:79,91,103,142`, `SuddenNoiseDemo.tsx:29,44,50,64`, `MemoryUnderLoadDemo.tsx:61`, `FaceOrNotDemo.tsx:124,131` · S · low
- **Corrections:**
  - "The pathway above…" on Explain (×6 lessons) → "The pathway in Trace…".
  - Memory says "two conditions"; the demo has three load levels.
  - Sudden Noise says "some trials"; there is one.
  - "Look at the figure below"; the figure is above.
  - "Review covers…" → "Explain covers…".
  - Bridges promise Trace nodes that aren't drawn (IL→BLA→CeA, MGN→BLA→CeA, the "3-synapse loop", the "PFC role map") → "See the circuit in Trace."
  - A Face or Not bridge says "compare… in States that Prime Behavior" but opens its own Explain tab.
- Each string goes in the commit as a before/after list for you to check.

**P1-22 · Prediction Lens "Pathway" pills garble 4 lessons** · Fear Cue, Memory, Sudden Noise, Stress Explain · `PredictionLens.tsx:21` · S · low
- **Problem:** the text is split on "→", including arrows inside parentheses and across sentences. Fear Cue's pills read "Amygdala (BLA" | "CeA) for initial fear learning. vmPFC".
- **Fix:** fall back to the existing paragraph style when the text contains more than one sentence or an arrow inside parentheses. Blurry and Face keep their pills; no data changes.

**P1-23 · Descriptions cut to about 30 characters on phones** · `/topics`, topic pages, concept pages, lesson "Related concepts" · `TopicsIndex.tsx:32`, `ModuleLink.tsx:30`, `ConceptLink.tsx:21`, `ConceptHub.tsx:33` · S · low
- **Problem:** text is cut off, e.g. "How the visual system recognize…".
- **Fix:** replace `truncate` with `line-clamp-2`.

**P1-24 · Unit hub fixes (needed whether or not you link the hubs, Q-2)** · `/unit/unit-1..3` · `ConceptCardGrid.tsx:28,33`, `unit3-emotion-amygdala.ts:481,490`, `UnitHub.tsx:49` · S · low
- **Problems and fixes:**
  - Concept-card chips push unit-1 to 384 px and unit-2 to 440 px wide at 375. Fix: stack the chips under the term on mobile.
  - The Klüver-Bucy and Patient SM "Content note" boxes show authoring instructions to readers ("should be presented as an informational case card, not simulated"). Fix: reword them in reader voice. These notes are not science.
  - "← All Topics" links to the homepage. Fix: link it to `/topics`.
- **Evidence:** `before/unit2-concept-cards@375.png`

**P1-25 · GitHub repo first impression (recruiters may open it from your resume)** · Repo · `package.json:2`, `README.md:9-20, 86, 94` · S · low
- **Problem:**
  - The repo's About panel has no description, website or topics.
  - package.json is still named `vite_react_shadcn_ts`.
  - The README links over http, lists only some routes, claims the build runs a TypeScript check (it doesn't), and has a "License" heading with no license.
- **Fix:** I edit the files; you fill the About panel in GitHub Settings. The lockfiles are left alone until Q-4 is confirmed.

---

## P2 — optional polish (after applications)

| ID | Where | Issue → fix | Effort / Risk |
|---|---|---|---|
| P2-1 | All pages (`Layout.tsx:8`, `ScrollToTop.tsx`) | **Issue:** there is no skip link, and route changes leave focus on `<body>`. **Fix:** add an sr-only "Skip to content" link, `main#main`, and focus main after navigation. | S / low |
| P2-2 | Lesson demos | **Issue:** feedback is never announced (no `aria-live`), and focus drops to `<body>` after each step (about 24 Tabs to the next control). **Fix:** add `role="status"` wrappers and focus the next primary control. | M / low |
| P2-3 | GoDeeperCard, Review hints, "Show all", Course Map, Precision "Go deeper", Trace toggle, consequence checkboxes, Sound toggle | **Issue:** no `aria-expanded` / `aria-pressed`, the glyphs "+/−" are read aloud, and SectionNav announces "1Intro". **Fix:** attribute-only changes. | S / low |
| P2-4 | `SearchBar.tsx` | **Issue:** no dialog role or label, no focus trap or focus return, Enter does nothing, and the group label reads "GO DEEPERS". **Fix:** add these. | M / low |
| P2-5 | Phones | **Issue:** standalone controls under 44 px: SectionNav tabs 33 px, breadcrumbs about 20 px, footer link 39×20, sibling links 21 px, bridge buttons 16–20 px, "Show hint" 18 px, header icons 38–40 px. 9–10 px labels. **Fix:** add padding (no visual change) and use an 11 px label minimum. | M / low |
| P2-6 | Header | **Issue:** the header gutter (32 px) doesn't match page content (16 px); nav collides with the logo at 640–650 px; no active item on lesson or unit pages. **Fix:** `px-4 sm:px-6`, an `md:` breakpoint and an `isActive` tweak. | S / low |
| P2-7 | Home "how it works", Loop diagram | **Issue:** step cards have unequal heights. **Fix:** `items-stretch`. | S / low |
| P2-8 | Typography details | **Issue:** uppercase eyebrows on h2/h3 render in serif; 5 eyebrow style variants; link-card variants (ModuleLink / ConceptLink / topic rows); primary CTA heights 44 vs 48 px; about 33 clickables with the browser's default focus ring; double divider at the end of Explain; loop-role colors in two palettes. **Fix:** normalize to the dominant existing pattern. | M / low |
| P2-9 | Concept pages | **Issue:** no next/previous between the 3 essays; Precision lists the same 3 lesson cards twice; Loop copy mentions "badges" that aren't there; "every module" claims cover 6 of 12 lessons; H1 case doesn't match breadcrumb and card ("When prediction fails" vs "When Prediction Fails"); white-on-accent step badges 3.4–3.9:1. **Fix:** small edits. | S / low |
| P2-10 | 404 variants | **Issue:** three different styles, and "Browse Lessons" goes to the homepage. **Fix:** one pattern plus a "Browse topics" link. | S / low |
| P2-11 | Breadcrumb at 375 | **Issue:** crumbs wrap inside themselves. **Fix:** `flex-wrap`. | S / low |
| P2-12 | Trace | **Issue:** the legend lists route types a diagram doesn't use, and TracePanel's subtitle "Follow the signal through the circuit" doesn't fit the definition lists. **Fix:** compute the legend from the edges and add an optional subtitle prop. | S / low |
| P2-13 | Sorters and PFC | **Issue:** "held for most" at exactly 3/6 (`>=`); Try Again replays the same order; "vs" vs "vs."; tapped answers stay tinted on touch; 3 sorters bridge to Explain and skip Trace. **Fix:** one-line fixes. | S / low |
| P2-14 | Multistable, Fear Cue, Stress, Memory demo nits | **Issues:** grammar in the Necker assist labels ("Show upper-right face is in front"); hint timer race; "I can see both" is the only way forward; Fear Cue double-click race and dead code; Stress override badge contradicts a wrong answer; cortisol graph labels #bbb at 9 px; the graph replays; Memory header wraps on medium rounds; Begin Experience lands below the fold on phones. | S / low |
| P2-15 | Terminology / copy | **Issues:** "PNC" vs "PnC"; "inferotemporal" vs "inferior temporal"; CS–US hyphen vs en dash; noradrenaline vs norepinephrine; garbled "identity abstract" ×2; "Comprised of"; "hyper-active". | S / low |
| P2-16 | Copy voice | **Issue:** em dashes remain in lessons 7–12, Prediction & Outcome, unit hubs, Course Map and topic pages (the voice-guide pass covered only lessons 1–6 and the main pages). **Fix:** the same pass, punctuation only. | M / low |
| P2-17 | Terminology | **Issue:** "module" vs "lesson" across the UI (see Q-10). **Fix:** display strings only. | S / low |
| P2-18 | `ModulePage.tsx:58` | **Issue:** the active tab isn't in the URL, so refresh resets to Intro. **Fix:** `history.replaceState` with the hash. | S / low |
| P2-19 | `App.tsx` | **Issue:** unused `<Toaster/>`, `<Sonner/>`, TooltipProvider and QueryClientProvider are about 23% of gzip JS and add two empty "Notifications" landmarks. **Fix:** remove them. | S / low |
| P2-20 | Code health | **Issues:** 4 lint errors; dead code (`ComponentTest.tsx`, `HPAAxisBuilderDemo.tsx`, unused vars in ModulePage); React Router v7 warnings in dev; `playwright.config.ts` imports a package that isn't installed; `lovable-tagger`; template comment in `index.css`; placeholder test; `brainStructures.nbb302Unit` uses old unit numbers (latent). | S / low |
| P2-21 | SEO extras | **Issue:** no `sitemap.xml` or Sitemap line, no apple-touch-icon, and The Dress JPEG is quality 100. **Fix:** add the sitemap and icon; re-export the JPEG only if a better source exists. | S / low |
| P2-22 | Unit hubs | **Issues:** hub concepts aren't in search (McGurk, Phineas Gage → 0 results); "Show fewer" strands the reader; no in-page section nav on 8–10k px pages; heading outline nests sections under "Interactive Lessons"; lesson order differs between the Emotion hub and topic page; the implicit-bias concept card lacks the content note its case note has; make 988 tappable (`tel:` / `sms:`). | M / low |

## Won't do (now)
| Idea | Why not |
|---|---|
| Route-level code splitting (React.lazy) | Performance is already 97–100. It would add a loading state and a second round trip on lesson deep links. |
| Replace all 239 arbitrary `text-[Npx]` sizes | Broad churn for no visible gain. |
| Remove 36 unused dependencies and 44 unused shadcn files | It touches the lockfile and the deploy. Do it after applications, with hosting confirmed (Q-4). |
| Regenerate or replace lockfiles | It could break the current deploy (the host's install method is unknown). |
| Keep all lesson tabs mounted to preserve demo progress | Hidden demos would keep their timers running, so all 12 would need regression tests. P1-14 covers the common case. |
| Full ARIA tabs pattern for SectionNav | `aria-current="step"` is acceptable. The rewrite carries more risk than value. |
| Scores, streaks or instant right/wrong in sorters or review questions | This is gamification and contradicts the calm study tone. |
| New Trace diagrams, Prediction Lens or Go Deeper for lessons 7–12 | It needs new science content from your notes (see Q-12). |
| Pause or extend control on the memory letters | It changes the task being demonstrated. |
| Footer profile links | Per your instruction, later. The footer stays name-free. |

## Questions for you
| ID | Question | My recommendation |
|---|---|---|
| Q-1 | Approve the font fix (P1-5)? Every heading changes from Georgia to DM Serif Display. See the `home-fonts-on` / `fonts-off` screenshots. | Yes. It's the design the code intends and looks more finished. |
| Q-2 | Link the 5 unit hubs (117 concept cards, 18 pathways, 25 distinctions, 17 case notes, 34 review questions)? Today nothing links to them. | Yes, after P1-24, with one "Study guide →" link per topic page, but only once you've cleared the science flags on those pages (S-1, S-3, S-4, S-10). Otherwise leave them unlinked for now. |
| Q-3 | The Course Map is unlinked and stale: 6 of 12 lessons, and Memory Under Load is filed under perception. | Leave it unlinked this week. Update it later. |
| Q-4 | Hosting: the repo has no `vercel.json`. Please check on your phone: open `learnbraintrace.com/module/face-or-not` directly, then hard-refresh `/unit/unit-3`. Are both fine? Where is the site actually hosted (Lovable or Vercel)? | If refresh 404s on Vercel, I'll add a two-line `vercel.json` rewrite. |
| Q-5 | The GitHub history shows 454 commits by Lovable's bot, 49 by Claude, and none under your name. A recruiter opening the repo will see this. | Add a short, honest "How this was built" README section (content from your NBB302 notes; design and lesson structure by you; implementation AI-assisted). Set git author to your handle for future commits. Don't rewrite history. Your call on wording and privacy. |
| Q-6 | The Dress photograph has no credit line. | Add a small muted caption with the source. |
| Q-7 | Fear Cue trial 2 (P0-8): use the code-only re-tag (1 early + 3 late acquisition trials), or will you supply copy for a distinct trial-2 message? | Re-tag. |
| Q-8 | The Blurry Object summary ignores timing, so it can contradict the per-trial feedback (all correct after full sharpening gets "cues were distinctive enough… each time"). | You map which existing tier text fits. I won't write science copy. |
| Q-9 | Face or Not / Memory summaries ignore misses and perfect runs (100% gets "even strong performance degrades"), and Memory never checks the math answer. | Leave for now, or supply copy. |
| Q-10 | "Module" or "lesson"? Home, Topics and search say module; About, unit hubs and the README say lesson. | "Lesson" (your own word). Display strings only (P2-17). |
| Q-11 | Topic accents: Perception and Attention share purple; Learning and Stress share green. | Keep. It's an intentional 3-group scheme. |
| Q-12 | Lessons 7–12 lack the Prediction Lens, Go Deeper and SVG trace that lessons 1–6 have. | After applications, from your notes. |
| Q-13 | You mentioned a "Field Notes" essay section, but none exists in the code. Do you mean `/how-your-brain-predicts`, or is it on another branch? | — |
| Q-14 | Sudden Noise's Prediction Lens and Loop page describe "a sudden noise… actual loud input". The demo is a silent flash by default, with an optional soft tone (gain 0.05). Should the experiential sentences match the demo? | Yes, but you pick the wording, since it sits next to the science. |
| Q-15 | Commit before/after screenshots to `docs/audit/` (1.8 MB before plus a similar after set, about 3.5 MB in total)? | Yes, so the CHANGES.md paths stay valid. |

## Science flags (not changed; please check against your NBB302 notes)
Quoted exactly. A flag means "worth a second look", not "wrong".

| ID | Where | Text / concern |
|---|---|---|
| S-1 | Fear Cue demo (`FearCueDemo.tsx:78,90,102`), unit 4 (`unit4-fear-conditioning.ts:92,99,141,180,204-212,293-297,310,355`), unit 3 (`:350`) | IL is "critical for initial fear conditioning" and PL is "the key structure enabling extinction". The common textbook mapping is the reverse (PL drives fear expression; IL drives extinction via ITCs). **Highest priority:** it appears in a flagship lesson. |
| S-2 | `stressResponseContent.ts:5` vs the Homeostasis sorter and `unit5:42,319` | "This is allostasis… actively returning to baseline". Elsewhere the site calls negative-feedback return to baseline homeostasis. Internal contradiction. |
| S-3 | `unit4-fear-conditioning.ts:244` vs `:113, :282` | "Cued extinction only requires the amygdala" vs "requires the amygdala and vmPFC". |
| S-4 | `unit4-fear-conditioning.ts:134, 310` | The spontaneous recovery definition includes "after a change in context", which is usually called renewal (named separately at :317). |
| S-5 | `suddenNoiseContent.ts:7, 11`; `moduleDefinitions.ts:144, 187` | A voluntary click is called "faster than conscious thought" and said to have "lost to a subcortical reflex"; "reaction time measured the gap between these two routes"; the diagram arrow runs brainstem→amygdala while the text has CeA→PnC. |
| S-6 | `multistableExamples.ts:54`; `MultistablePerceptionDemo.tsx:118`, `modules.ts:191` | "warm shadow… shift white toward blue-grey"; The Dress / color constancy is called a type of "multistable perception". |
| S-7 | `moduleDefinitions.ts:71,80` vs `modules.ts:71`, `FaceOrNotDemo.tsx:137`; `FaceOrNotDemo.tsx:130`; `ConceptLoop.tsx:14` | The face-detection bias is attributed to PFC/OFC in one place and the FFA in another; correct-reject feedback mentions a "face-like pattern" on non-face controls. |
| S-8 | `MemoryUnderLoadDemo.tsx:90, 127` | "judges make worse parole decisions before lunch… it is all the same resource pool" (a contested finding stated as settled). |
| S-9 | `modules.ts:275, 282, 283` | Classical conditioning in general is "mediated by amygdala (BLA → CeA)"; spontaneous return happens because the association "was never a voluntary choice". |
| S-10 | Unit hubs | MAOIs "can cause suicidal behavior" in adolescents (`unit3:233`, no content note); Patient SM "cannot feel fear in her body" (`unit3:487`); Gage's iron "destroying a hemisphere" (`unit3:471`); ventral-stream damage "impairs the ability to grasp" (`unit1:148`); IT cells "spiked exactly one second before… proving" (`unit1:155,162`); the Correll shooter task omits "armed" (`unit1:218,476`); grandmasters "6,000 to 7,000 calories a day" (`unit2:55`); "parasympathetic and sympathetic peripheral nervous systems" (`unit5:35`). |
| S-11 | `EmotionArousalSorterDemo.tsx:31`; `StressResponseDemo.tsx:21,33,55,460` | A sudden noise causes a "cortisol spike"; slot "Step 1: Detection" expects the hypothalamus while the distractor is "Amygdala detects threat"; "Immune suppression" is listed as an effect "to the brain". |
| S-12 | `unit3:44,51`; `unit3:496` | "The Four F's: Feeding, Fleeing, Fighting, and Reproduction" (reads as an error without a note); "disrupted 'work sleep'" (possibly a mis-transcription). |

## Already strong — do not touch
- **Lesson architecture.** All 12 lessons share Intro → Experience → Trace → Explain, and Explain uses the same four parts (What Happened / What Your Brain Did / Key Pathway / Why It Matters).
- **Runtime health.** There are 0 console errors and 0 failed requests across 207 page states and every playthrough. Lighthouse scores 97–100 / 96 / 100 / 100 with CLS 0, and there are no third-party requests, which matches "no tracking".
- **Flagship teaching arcs.**
  - Fear Cue: acquisition, then extinction, then a committed prediction, a time-skip and spontaneous recovery.
  - Stress Response Builder: build the cascade, watch it run away, add feedback, then the override and its consequences.
  - Face or Not: signal-detection framing.
  - Multistable gallery: the real Rubin vase, Dress and Necker stimuli.
- **Tone and sensitive topics.** The tone is calm and non-gamified: no scores, streaks or confetti. Sensitive topics appear only as static study cards with content notes, and the 988 Lifeline text is correct.
- **Accessibility basics.** Every Experience can be completed by keyboard alone; most controls have a visible teal focus ring. There is one H1 per page, and all images have meaningful alt text.
- **Navigation details.** Deep links (`#trace`, `#deeper-*`) open the right tab and expand the card. Not-found states are graceful, and scroll position is restored on Back.
- **Design system.** HSL tokens live in one file (`index.css`), so most fixes are one-line token or class edits.
- **Small things already right.** The BrainTrace-specific favicon (a Rubin vase, not Lovable's) and lesson counts that agree everywhere (3/2/3/2/2 = 12).

## Evidence (before)
`docs/audit/before/`:
- `search-overlay-open@375.png`, `search-after-outside-tap@375.png`
- `sibling-link-opens-on-explain@1440.png`
- `precision-scrolled-sideways@375.png`, `unit2-concept-cards@375.png`
- `trace-sudden-noise-reaction@1440.png`, `trace-face-or-not@1440.png`, `trace-memory-under-load@1440.png`, `trace-fear-cue-and-extinction@1440.png`, `trace-stress-chronic@375.png`
- `memory-typed-without-spaces@1440.png`
- `sudden-noise-too-early@375.png`
- `fear-cue-trial1-feedback@375.png`, `fear-cue-trial2-feedback@375.png`
- `home-fonts-{off,on}@{1440,375}.png`, `fear-cue-fonts-{off,on}@{1440,375}.png`

The full baseline (207 screenshots plus `crawl-results.json`) stays in the session scratchpad for the Phase 2 comparisons.
