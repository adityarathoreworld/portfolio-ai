# Aditya Rathore — Portfolio (static)

Live-style hiring portfolio: **HTML + CSS + vanilla JS** only (no build step). Deploy from the repo root on GitHub Pages or any static host.

**Site content:** [adityarathoreworld.in](https://adityarathoreworld.in/) (same story, this repo is the redesigned UI).

---

## Run locally

```powershell
cd resume-website
npx --yes serve -l 4322
```

Open `http://localhost:4322`.

---

## How this UI was built: cheap model + skills + rules

This project is a deliberate workflow experiment: **use Cursor Composer 2.5** (lower cost) for UI and layout, and **avoid burning frontier models** on work that skills and rules already constrain well.

Expensive models are still useful for ambiguous architecture, security reviews, and hard debugging. For **portfolio and product UI**, a cheaper model plus good instructions often matches the output quality at a fraction of the price—*if* you give it structure.

### The idea

| Without skills/rules | With skills + rules |
| ------------------ | ------------------- |
| Model improvises “AI slop” (purple gradients, card soup, sidebar templates) | Model follows a **design system checklist** and component contracts |
| You rewrite the same feedback every chat | **Always-on rules** set repo boundaries; **skills** load UI standards when relevant |
| Frontier model needed to “make it look pro” | **Composer 2.5** iterates on HTML/CSS/JS inside those guardrails |

**Time saved:** fewer full redesign loops. **Cost saved:** Composer 2.5 sessions instead of defaulting to top-tier models for every pixel tweak.

### Composer 2.5 pricing (Cursor)

Rates used when estimating this workflow (check [Cursor pricing](https://cursor.com/pricing) for current numbers):

| Meter | Price |
| ----- | ----- |
| Input tokens | **$0.50** / million |
| Cache-read tokens | **$0.20** / million |
| Output tokens | **$2.50** / million |

Output is priced higher than input, so **skills and rules pay off twice**: they cut bad iterations (less output) and improve cache hits on repeated skill/rule context (cheaper cache-read vs fresh input). A tight brief + UI Design Brain → fewer megabytes of “try again” CSS from the model.

### What I use in Cursor

#### 1. **UI Design Brain** (Agent Skill)

Path (user skill): `ui-design-brain` — read when building or changing web UI.

It encodes what a senior designer/engineer would enforce anyway:

- Product archetype (editorial vs dashboard density)
- **Anti-AI aesthetics** (no neon gradients, no KPI bubbles, no rainbow badges)
- Typography pairings, tabular numerals, spacing on an 8px grid
- Real interaction states (hover, focus-visible, reduced motion)
- Semantic HTML and accessible patterns (tabs, tables, dialogs)

For this portfolio, the agent applied that skill to produce:

- Tokenized CSS (`--background`, `--primary`, `--ring`, etc.)
- Sticky app bar, profile rail, data tables, capability tabs
- Mobile dock, scroll hints, copy-email, project search/sort

You do not paste the whole skill each time—**@ mention the skill** or let the agent pick it up from the task (“build portfolio UI”).

#### 2. **Project rules** (`.cursor/rules/`)

Rules are **always-on constraints** for a repo. Example from my MYJSAI monorepo (`project-progress.mdc`):

- Document real modules in `myRuleBook.txt`
- **Exclude** personal folders like `resume-website/` from that ledger so test/portfolio work does not pollute product docs

That separation matters: portfolio iterations stay fast; the main app keeps a single progress source of truth.

Other rules (e.g. NestJS standards on backend work) keep non-UI tasks consistent so I do not re-explain stack choices every session.

#### 3. **Composer 2.5 as the default UI worker**

Typical prompt pattern:

1. **Goal** — “Portfolio for hiring managers; static site; mobile-friendly.”
2. **Constraint** — “Follow UI Design Brain; no template portfolio look.”
3. **Scope** — “Only `resume-website/`; do not log in myRuleBook.”
4. **Iterate** — “More interactive, subtle motion, do not overdo animations.”

Composer 2.5 is strong enough for:

- Multi-file HTML/CSS/JS refactors
- Responsive layout and component-level CSS
- Wiring tabs, search, sort, `dialog`, IntersectionObserver reveals

Save frontier models for when the skill **does not** cover the problem (novel auth flows, complex state machines, perf profiling).

### Workflow (copy this)

```text
1. Add or update a Cursor rule for repo boundaries (what to touch, what to document).
2. Invoke UI Design Brain for any visual work.
3. Run Composer 2.5 in Agent mode on the static folder only.
4. Preview locally (serve), fix in one more pass.
5. Push to GitHub; enable Pages on main / root.
```

### What this repo contains

| Path | Purpose |
| ---- | ------- |
| `index.html` | Structure, sections, a11y landmarks |
| `css/styles.css` | Design tokens, layout, motion (with `prefers-reduced-motion`) |
| `js/main.js` | Tabs, nav spy, project filter/sort, mobile sheet, copy email |
| `assets/graphics/` | Lightweight SVG accents |

No React, no Tailwind build—on purpose. Cheaper to host, faster to iterate with a small model context.

### Cost mindset (practical)

- **Composer 2.5** at the rates above is a good default for multi-file UI work; frontier models are reserved for high-uncertainty tasks.
- **One long frontier session** on a portfolio can cost more than **several Composer 2.5 passes** with a skill-loaded brief.
- Skills amortize: you write the standard once; every UI task reuses it.
- Rules prevent expensive mistakes (wrong repo docs, wrong stack, scope creep).

This README is part of the portfolio story: the site and the **process** both demonstrate how I work with AI tooling efficiently.

---

## Deploy (GitHub Pages)

1. Repo: [github.com/adityarathoreworld/portfolio-ai](https://github.com/adityarathoreworld/portfolio-ai)
2. **Settings → Pages → Build and deployment**
3. Source: **Deploy from a branch** → **main** → **/ (root)**
4. Site URL: `https://adityarathoreworld.github.io/portfolio-ai/` (unless you use a custom domain)

---

## Contact

**Aditya Rathore** — [aditya@adityarathoreworld.in](mailto:aditya@adityarathoreworld.in)
