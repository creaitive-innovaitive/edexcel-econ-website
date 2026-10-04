# Edexcel A-Level Economics site

Static GitHub Pages site for Pearson Edexcel Economics A (9EC0) tutoring artifacts, with Supabase logins, progress and assessments. Fork of the Cambridge site (creaitive-innovaitive/edexcel-econ-website), A-Level Econ only. Live: https://creaitive-innovaitive.github.io/edexcel-econ-website/

Own Supabase project (edexcel-econ, separate from the Cambridge site) with the same schema, subjects trimmed to `a-econ`. Same admin emails. Structure in `site_data.py` follows the 9EC0 spec: Themes 1 to 4 as sections, one chapter per x.y topic area. `Resources/` (spec, past papers, knowledge organisers, Hewison and Joad textbooks) is local only and gitignored: copyrighted.

- Build: `python3 build.py` (reads `site_data.py`, `artifacts_src/`, `assessments/`; writes `docs/`). Commit and push after every change.
- Push as creaitive-innovaitive without switching the global gh account:
  `git push -q "https://x-access-token:$(gh auth token --user creaitive-innovaitive)@github.com/creaitive-innovaitive/edexcel-econ-website.git" main`
- New artifact: put it in `artifacts_src/<slug>/`, register in `site_data.py` ARTIFACTS, build. `tools/artifact-kit` keeps only the shared lib and assemble script; its Cambridge page bodies were removed.
- Assessments: `assessments/<slug>.json` (MCQ, number, single key-term only; no written answers). Build writes `supabase/assessments_seed.sql`. Marking is server-side in `supabase/schema.sql`.
- Supabase SQL: Gary pastes `supabase/schema.sql` / `assessments_seed.sql` into the SQL Editor himself. Copy with `LC_ALL=en_US.UTF-8 pbcopy < file` (plain pbcopy garbles non-ASCII). Both files are safe to rerun.
- Model answers use hedged wording (could, may, likely to), not will/always/must, unless the question demands it.
- Admin emails: gary.byatt@danang.sis.edu.vn, gbyatt@gmail.com. Never commit passwords.
