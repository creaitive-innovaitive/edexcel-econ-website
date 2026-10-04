"""Writes assessments/<slug>.json from a compact list. Question tuples:
("mcq", q, [opts], correct_index, topic, explanation)  and  ("num", q, answer, tolerance, topic, explanation)."""
import json, pathlib
def write(slug, title, qs, pass_pct=70):
    out = []
    for i, t in enumerate(qs, 1):
        if t[0] == "mcq":
            _, q, opts, a, topic, why = t
            out.append({"id": f"q{i}", "type": "mcq", "q": q, "opts": opts, "ans": str(a), "marks": 1, "topic": topic,
                        "ok": "Correct: " + why, "fb": why + " Review the Learn tab.", "model": opts[a]})
        else:
            _, q, a, tol, topic, why = t
            out.append({"id": f"q{i}", "type": "num", "q": q, "ans": a, "tol": tol, "marks": 1, "topic": topic, "hint": "Enter a number.",
                        "ok": "Correct: " + why, "fb": why + " Check the worked examples.", "model": str(a)})
    p = pathlib.Path(__file__).parent.parent / "assessments" / f"{slug}.json"
    p.write_text(json.dumps({"slug": slug, "title": title, "pass_pct": pass_pct, "questions": out}, indent=1, ensure_ascii=False))
