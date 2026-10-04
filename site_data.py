"""Course structure and artifact placement. Edit this file, run build.py, push."""

SITE_TITLE = "Edexcel A-Level Economics"
SITE_TAGLINE = "Interactive lessons, walkthroughs and revision activities for Pearson Edexcel A-Level Economics A (9EC0)."


def _ch(theme, n, title):
    return {"id": f"{theme}-{n}", "n": theme, "label": f"{theme}.{n}", "title": title, "group": None}


# Spec sub-units (Pearson Edexcel Economics A, 9EC0), one chapter per numbered topic area.
THEMES = [
    {
        "id": "theme-1", "n": 1, "title": "Introduction to markets and market failure",
        "chapters": [
            _ch(1, 1, "Nature of economics"),
            _ch(1, 2, "How markets work"),
            _ch(1, 3, "Market failure"),
            _ch(1, 4, "Government intervention"),
        ],
    },
    {
        "id": "theme-2", "n": 2, "title": "The UK economy: performance and policies",
        "chapters": [
            _ch(2, 1, "Measures of economic performance"),
            _ch(2, 2, "Aggregate demand (AD)"),
            _ch(2, 3, "Aggregate supply (AS)"),
            _ch(2, 4, "National income"),
            _ch(2, 5, "Economic growth"),
            _ch(2, 6, "Macroeconomic objectives and policy"),
        ],
    },
    {
        "id": "theme-3", "n": 3, "title": "Business behaviour and the labour market",
        "chapters": [
            _ch(3, 1, "Business growth"),
            _ch(3, 2, "Business objectives"),
            _ch(3, 3, "Revenue, costs and profits"),
            _ch(3, 4, "Market structures"),
            _ch(3, 5, "Labour market"),
            _ch(3, 6, "Government intervention"),
        ],
    },
    {
        "id": "theme-4", "n": 4, "title": "A global perspective",
        "chapters": [
            _ch(4, 1, "International economics"),
            _ch(4, 2, "Poverty and inequality"),
            _ch(4, 3, "Emerging and developing economies"),
            _ch(4, 4, "The financial sector"),
            _ch(4, 5, "The role of the state in the macroeconomy"),
        ],
    },
    {
        "id": "exam-prep", "n": 5, "title": "Exam preparation",
        "chapters": [
            {"id": "exam-technique", "n": None, "label": "★", "title": "Exam technique", "group": None},
            {"id": "paper-3", "n": None, "label": "★", "title": "Paper 3: synoptic investigation", "group": None},
        ],
    },
]

# The course key stays "a-econ" so the shared Supabase roster (subjects, approvals, classes) works unchanged.
COURSES = {
    "a-econ": {
        "nav": "Economics", "title": "A-Level Economics", "kind": "sections", "accent": "plum",
        "blurb": "Pearson Edexcel Economics A (9EC0): four themes, a page for every topic area.",
        "sections": THEMES,
    },
}

# Retained so build.py keeps working; no public topic page on this site.
INVESTING = {"nav": "Investing", "title": "Investing", "accent": "green", "blurb": ""}

# Artifacts. 'src' is the folder under artifacts_src/. 'places' is a list of (course, chapter id) pairs;
# the first is the primary home (back link). 'role': "review" is the main chapter review (tracked on the
# Profile page); anything else is a supplementary resource. 'at': spec reference, e.g. "1.2.3".
ARTIFACTS = []
