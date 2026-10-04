# Artifact kit

Shared components for the Theme 3 chapter reviews (stepper animations, sliders, drag-and-drop classify and match, ordering, calculations, quizzes, flashcards, tabs, colour-coded model answers, light/dark theme).

- `lib.css`, `lib.js`: the components. `econ.js`: `Plot()` helper for axes-and-curves diagrams; `assemble.py` appends it to `lib.js`.
- `<name>.body.html` and `<name>.js`: the content of each review. Current ones: `t31` business growth, `t34a` perfect and monopolistic competition, `t34b` oligopoly, `t34c` monopoly and price discrimination, `t34d` monopsony and contestability, `t35` labour market, `t36` government intervention.
- `assemble.py <name> "<title>" <slug>` writes `artifacts_src/<slug>/index.html`. Then run `python3 build.py` from the repo root.
- `../mkassess.py` writes `assessments/<slug>.json` from a compact list of MCQ and numeric questions. `build.py` turns them into `supabase/assessments_seed.sql`.
- `../port_old.py` was a one-off that ported pages from the old eunice-economics site (exam technique pages, 3.2 and 3.3 notes) into standalone artifacts.
