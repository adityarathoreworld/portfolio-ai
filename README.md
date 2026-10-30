# Aditya Rathore — Developer Portfolio

**[Live Portfolio](https://adityarathoreworld.github.io/portfolio-ai/)** · **[Personal Website](https://adityarathoreworld.in/)**

A responsive, static developer portfolio built with **HTML, CSS and vanilla JavaScript**. No frameworks, build tools or backend dependencies.

## Run Locally

```bash
cd resume-website
npx --yes serve -l 4322
```

Open [http://localhost:4322](http://localhost:4322).

## AI-Assisted Development: Optimizing Cost Without Compromising Quality

This project explores a practical approach to reducing AI development costs by combining a cost-efficient model with structured instructions, reusable skills and project-level rules.

**Primary UI model:** Cursor Composer 2.5

Rather than defaulting to expensive frontier models for every task, the workflow uses specialized instructions and guardrails to make smaller, cost-efficient models more effective.

### Model Pricing

| Token type | Price per million |
|---|---:|
| Input | $0.50 |
| Cached input | $0.20 |
| Output | $2.50 |

*Rates used for this experiment. See [Cursor Pricing](https://cursor.com/pricing) for current rates.*

### The Workflow

| Component | Purpose |
|---|---|
| **UI Design Brain** | Reusable design standards, accessibility and component guidelines |
| **Cursor Rules** | Persistent project constraints, coding conventions and scope boundaries |
| **Composer 2.5** | Cost-efficient model for UI implementation and iteration |

### What This Achieves

- Fewer repetitive instructions and redesign iterations.
- Consistent UI decisions through reusable design standards.
- Better control over generated code and project scope.
- More efficient context usage and potential caching benefits.
- Frontier models reserved for complex architecture, security and difficult debugging.

The principle is simple: **optimize the workflow before increasing model expenditure.**

Skills and rules don't eliminate model limitations, but they help reduce avoidable work and make AI-assisted development more predictable.

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Design:** CSS variables, responsive layouts, accessible interactions
- **Hosting:** GitHub Pages
- **Development:** Cursor Composer 2.5, Agent Skills and Project Rules

No React, Tailwind build pipeline or unnecessary dependencies.

## Project Structure

```text
resume-website/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    └── graphics/
```

## Deployment

Hosted through GitHub Pages.

1. Open repository **Settings → Pages**.
2. Select **Deploy from a branch**.
3. Choose `main` and `/ (root)`.
4. Save and access the published site.

**Repository:** [portfolio-ai](https://github.com/adityarathoreworld/portfolio-ai)

---

**Aditya Rathore**  
[aditya@adityarathoreworld.in](mailto:aditya@adityarathoreworld.in)
