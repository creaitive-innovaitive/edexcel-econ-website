"""One-off: turn the old eunice-economics pages into standalone artifacts under artifacts_src/."""
import re, shutil, sys
from pathlib import Path
OLD = Path(sys.argv[1]); ROOT = Path(__file__).parent.parent
css = (OLD / "style.css").read_text()
comp = (OLD / "components.js").read_text()
site = (OLD / "site.js").read_text()
# keep only the expand/collapse/print handlers from site.js
site = site.split("// Cover:")[0]

PAGES = {  # old path -> (slug, pdf group)
    "techniques/command-words": "technique-command-words",
    "techniques/chain-of-reasoning": "technique-chain-of-reasoning",
    "techniques/evaluation": "technique-evaluation",
    "techniques/25-mark-essays": "technique-25-mark-essays",
    "techniques/diagrams": "technique-diagrams",
    "techniques/data-response": "technique-data-response",
    "theme-3/3-2-3-3-revenue-costs-profits": "revenue-costs-profits",
}
PDFS = {
    "technique-command-words": "Exam Technique/pdfs/Command Words - Class Notes.pdf",
    "technique-chain-of-reasoning": "Exam Technique/pdfs/Chain of Reasoning - Class Notes.pdf",
    "technique-evaluation": "Exam Technique/pdfs/Evaluation and Judgement - Class Notes.pdf",
    "technique-25-mark-essays": "Exam Technique/pdfs/25-Mark Essay Structure - Class Notes.pdf",
    "technique-diagrams": "Exam Technique/pdfs/Diagrams - Class Notes.pdf",
    "technique-data-response": "Exam Technique/pdfs/Data Response - Class Notes.pdf",
}
RCP_PDFS = ["Class Notes", "Keywords Worksheet", "Calculations Worksheet", "Exam Questions and Mark Scheme"]

for old, slug in PAGES.items():
    s = (OLD / f"{old}.html").read_text()
    s = re.sub(r"<script>try\{if\(location.hash.*?</script>", "", s, count=1, flags=re.S)
    s = re.sub(r'<header class="nav">.*?</header>\s*', "", s, flags=re.S)
    s = re.sub(r'<a class="back"[^>]*>.*?</a>\s*', "", s)
    s = re.sub(r'<p class="dl-link">.*?</p>', "", s)
    s = re.sub(r'<details><summary>Downloads \(PDF\)</summary>.*?</details>', "@@DL@@", s, flags=re.S)
    s = s.replace('<link rel="stylesheet" href="../style.css">', f"<style>{css}</style>")
    m = re.search(r'<script src="(?!\.\./)([^"]+\.js)"></script>', s)
    if m:
        s = s.replace(m.group(0), f"<script>{(OLD / Path(old).parent / m.group(1)).read_text()}</script>")
    s = s.replace('<script src="../components.js"></script>', f"<script>{comp}</script>")
    s = s.replace('<script src="../site.js"></script>', f"<script>{site}</script>")
    # cross links between pages
    for o2, s2 in PAGES.items():
        s = s.replace(f'href="../{o2}.html"', f'href="../{s2}/"').replace(f'href="{Path(o2).name}.html"', f'href="../{s2}/"')
    # downloads
    out = ROOT / "artifacts_src" / slug
    out.mkdir(parents=True, exist_ok=True)
    links = []
    if slug in PDFS:
        p = Path(OLD) / PDFS[slug]
        shutil.copy2(p, out / p.name); links.append(p.name)
    if slug == "revenue-costs-profits":
        for n in RCP_PDFS:
            p = OLD / "Theme 3/pdfs" / f"3.2-3.3 - {n}.pdf"
            shutil.copy2(p, out / p.name); links.append(p.name)
    dl = ('<details><summary>Downloads (PDF)</summary><div class="content"><ul class="dl-list">'
          + "".join(f'<li><a href="{l}" download>{Path(l).stem} (PDF)</a></li>' for l in links) + "</ul></div></details>") if links else ""
    s = s.replace("@@DL@@", dl)
    (out / "index.html").write_text(s)
    print(slug, len(s) // 1024, "KB", links)
