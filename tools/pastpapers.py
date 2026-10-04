"""Builds the Theme 3 past-paper finder artifacts from pastpapers_data.py: python3 tools/pastpapers.py"""
import json, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from pastpapers_data import R

ROOT = pathlib.Path(__file__).parent.parent
CSS = (ROOT / "tools/artifact-kit/lib.css").read_text()
CH = {"3-1": ("3.1", "Business growth"), "3-2": ("3.2", "Business objectives"), "3-3": ("3.3", "Revenue, costs and profits"),
      "3-4": ("3.4", "Market structures"), "3-5": ("3.5", "Labour market"), "3-6": ("3.6", "Government intervention")}
SESS_ORDER = {"June 2017": 2017, "June 2018": 2018, "June 2019": 2019, "Oct 2020": 2020, "Nov 2021": 2021, "June 2022": 2022, "June 2023": 2023, "June 2024": 2024, "June 2025": 2025}

EXTRA = """
.q{display:grid;gap:6px}
.q .head{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.q .ref{font:700 1rem var(--mono)}
.q .sp{color:var(--muted);font:600 .8rem var(--mono)}
.q label.done{margin-left:auto;font:600 .85rem var(--sans);display:inline-flex;gap:6px;align-items:center;cursor:pointer}
.q.isdone{opacity:.55}
.filters{display:flex;flex-wrap:wrap;gap:10px;margin:12px 0 4px}
.filters select{font:600 .9rem var(--sans);padding:7px 10px;border-radius:9px;border:1px solid var(--line);background:var(--surface);color:var(--ink)}
.q details{font-size:.92rem}.q summary{cursor:pointer;color:var(--accent);font-weight:600}
.chtag{font:700 .7rem var(--sans);color:var(--muted)}
"""

def page(title, lead, rows, show_chapter):
    data = [dict(s=a[0], p=a[1], ref=a[2], m=a[3], c=a[4], spec=a[5], ch=CH[a[6]][0], t=a[7], n=a[8], y=SESS_ORDER[a[0]]) for a in rows]
    cmds = sorted({d["c"] for d in data})
    n_by = {}
    for d in data: n_by[d["m"]] = n_by.get(d["m"], 0) + 1
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<style>{CSS}{EXTRA}</style></head>
<body><div class="wrap">
<header class="top">
  <div class="eyebrow">Edexcel A-Level Economics A · 9EC0 · Papers 1 and 3 · 2017 to 2025</div>
  <h1>{title}</h1>
  <p class="lead">{lead}</p>
</header>

<div class="card big">
  <h3>How to use this list</h3>
  <p>Each row points to a real question: session, paper and question number. Descriptions are in plain words, not the exam wording, so find the paper and mark scheme in your own copy. Tick <b>Done</b> as you go (saved in this browser only). Short questions train the method; the 12, 15 and 25 markers are where levels are won, so write a few of each under timed conditions.</p>
  <p class="note">Paper 1 is Themes 1 and 3; Paper 3 mixes all four themes, so the Theme 3 parts of Paper 3 are the 5 to 12 mark data-response questions and some of the 25-mark essays. One-mark multiple-choice questions are left out. The 2020 Paper 3 sits in both the June and October folders.</p>
</div>

<div class="tw"><table class="t">
  <tr><th>Marks</th><th>Typical command</th><th>Mark split</th></tr>
  <tr><td>2 to 4</td><td>Calculate, explain, draw</td><td>Knowledge and application; accuracy and labels</td></tr>
  <tr><td>5</td><td>Explain, calculate (Section B part a)</td><td>Knowledge, application, analysis in context</td></tr>
  <tr><td>8</td><td>Examine</td><td>2 knowledge, 2 application, 2 analysis, 2 evaluation</td></tr>
  <tr><td>10</td><td>Assess</td><td>6 knowledge/application/analysis, 4 evaluation</td></tr>
  <tr><td>12</td><td>Discuss</td><td>8 knowledge/application/analysis, 4 evaluation</td></tr>
  <tr><td>15</td><td>Discuss</td><td>9 knowledge/application/analysis, 6 evaluation</td></tr>
  <tr><td>25</td><td>Evaluate</td><td>16 knowledge/application/analysis, 9 evaluation</td></tr>
</table></div>

<div class="filters">
  <select id="fCmd" aria-label="Command word"><option value="">All command words</option>{"".join(f'<option>{c}</option>' for c in cmds)}</select>
  <select id="fMarks" aria-label="Marks"><option value="">All marks</option><option value="s">2 to 5 marks</option><option value="8">8 to 10 marks</option><option value="12">12 to 15 marks</option><option value="25">25 marks</option></select>
  <select id="fPaper" aria-label="Paper"><option value="">Papers 1 and 3</option><option value="1">Paper 1</option><option value="3">Paper 3</option></select>
  <select id="fSort" aria-label="Sort"><option value="new">Newest first</option><option value="old">Oldest first</option><option value="marks">Most marks first</option></select>
  <label class="note" style="display:inline-flex;gap:6px;align-items:center"><input type="checkbox" id="fHide"> Hide done</label>
</div>
<p class="note" id="count"></p>
<div id="list"></div>
</div>
<script>
const DATA = {json.dumps(data, ensure_ascii=False)};
const SHOW_CH = {str(show_chapter).lower()};
const KEY = "pp.done." + location.pathname;
let done = {{}}; try {{ done = JSON.parse(localStorage.getItem(KEY) || "{{}}"); }} catch (e) {{}}
const save = () => {{ try {{ localStorage.setItem(KEY, JSON.stringify(done)); }} catch (e) {{}} }};
const id = (d) => d.y + "-" + d.p + "-" + d.ref;
const band = (m) => (m <= 5 ? "s" : m <= 10 ? "8" : m <= 15 ? "12" : "25");
function render() {{
  const c = document.getElementById("fCmd").value, mk = document.getElementById("fMarks").value, pp = document.getElementById("fPaper").value, so = document.getElementById("fSort").value, hide = document.getElementById("fHide").checked;
  let rows = DATA.filter((d) => (!c || d.c === c) && (!mk || band(d.m) === mk) && (!pp || String(d.p) === pp) && !(hide && done[id(d)]));
  rows.sort((a, b) => (so === "marks" ? b.m - a.m || b.y - a.y : so === "old" ? a.y - b.y || a.p - b.p : b.y - a.y || a.p - b.p));
  document.getElementById("count").textContent = rows.length + " of " + DATA.length + " questions shown. " + Object.keys(done).filter((k) => done[k]).length + " ticked.";
  document.getElementById("list").innerHTML = rows.map((d) => `<div class="card q ${{done[id(d)] ? "isdone" : ""}}"><div class="head"><span class="pill">${{d.s}}</span><span class="pill">Paper ${{d.p}}</span><span class="ref">Q${{d.ref}}</span><span class="mark">${{d.m}} marks</span><span class="cmd">${{d.c}}</span><span class="sp">spec ${{d.spec}}</span>${{SHOW_CH ? `<span class="chtag">Chapter ${{d.ch}}</span>` : ""}}<label class="done"><input type="checkbox" data-id="${{id(d)}}" ${{done[id(d)] ? "checked" : ""}}> Done</label></div><div>${{d.t}}</div>${{d.n ? `<details><summary>Examiner feedback</summary><p>${{d.n}}</p></details>` : ""}}</div>`).join("") || "<p>No questions match.</p>";
  document.querySelectorAll("#list input[data-id]").forEach((i) => (i.onchange = () => {{ done[i.dataset.id] = i.checked; save(); render(); }}));
}}
["fCmd", "fMarks", "fPaper", "fSort", "fHide"].forEach((x) => (document.getElementById(x).onchange = render));
render();
</script></body></html>
"""

out = []
for ch, (num, name) in CH.items():
    rows = [a for a in R if a[6] == ch]
    slug = f"past-papers-{ch}"
    d = ROOT / "artifacts_src" / slug; d.mkdir(parents=True, exist_ok=True)
    (d / "index.html").write_text(page(f"Past Paper Questions: {num} {name}", f"{len(rows)} Paper 1 and Paper 3 questions on spec {num}, 2017 to 2025, with command words, marks and where to find them.", rows, False))
    out.append((slug, ch, len(rows), num, name))
d = ROOT / "artifacts_src" / "past-papers-theme-3"; d.mkdir(parents=True, exist_ok=True)
(d / "index.html").write_text(page("Theme 3 Past Paper Questions: Full Index", f"All {len(R)} Theme 3 questions from Papers 1 and 3, 2017 to 2025, across spec 3.1 to 3.6. Filter by command word, marks and paper.", R, True))
print(json.dumps(out))
