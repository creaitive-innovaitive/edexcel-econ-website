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
A = "a-econ"
ARTIFACTS = [
    {"src": "revenue-costs-profits", "role": "review", "at": "3.3", "title": "Business Objectives, Revenues, Costs and Profits", "kind": "Interactive",
     "desc": "Spec 3.2 and 3.3: TR, AR and MR, cost curves, economies of scale, profit and shut-down points, objectives, with diagram walkthroughs, flashcards, a quiz and printable class notes.",
     "places": [(A, "3-3"), (A, "3-2")]},

    {"src": "technique-command-words", "title": "Command Words and Mark Allocation", "kind": "Exam technique",
     "desc": "What each Edexcel command word asks for and how marks are split across knowledge, application, analysis and evaluation.",
     "places": [(A, "exam-technique")]},
    {"src": "technique-chain-of-reasoning", "title": "Chain of Reasoning", "kind": "Exam technique",
     "desc": "Build analysis one linked step at a time, spot the errors that lose marks, and practise ordering chains.",
     "places": [(A, "exam-technique")]},
    {"src": "technique-evaluation", "title": "Evaluation and Judgement", "kind": "Exam technique",
     "desc": "How to weigh arguments, use evaluation criteria and reach a justified judgement.",
     "places": [(A, "exam-technique"), (A, "paper-3")]},
    {"src": "technique-diagrams", "title": "Diagrams", "kind": "Exam technique",
     "desc": "Drawing and annotating the required diagrams so they earn application and analysis marks.",
     "places": [(A, "exam-technique")]},
    {"src": "technique-data-response", "title": "Data Response", "kind": "Exam technique",
     "desc": "Using extracts and figures: quoting, calculating and applying data in every answer.",
     "places": [(A, "exam-technique")]},
    {"src": "technique-25-mark-essays", "title": "25-Mark Essay Structure", "kind": "Exam technique",
     "desc": "Planning, paragraph structure and timing for the 25-mark extended response.",
     "places": [(A, "exam-technique"), (A, "paper-3")]},
]
