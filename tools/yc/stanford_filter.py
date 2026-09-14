"""Find every YC company with a Stanford-affiliated founder, and say which kind.

Input:  founders.json  (written by founders.py)
Output: stanford_yc.json  + a summary to stdout

WHY THIS IS NOT A GREP. A first version simply matched /stanford/i over the whole
bio and it produced two classes of error that a sanity pass caught:

  1. Wrong tie kind. "Deep RL at Stanford and PhD at Technical University Munich"
     was labelled phd — the PhD belongs to TUM. Degree tokens have to be read
     NEAR the word Stanford, not anywhere in the bio. 21% of matched bios name
     Stanford and at least one other university, so this is not a rare case.
  2. Wrong company entirely. "working with top scientists from Stanford, Adobe
     and Brown University ... during his time at IIT Kharagpur" is a
     collaboration, not an affiliation. That founder was never at Stanford.

So: classification happens inside a +/-150 character window around each mention,
and every window is typed as a personal affiliation, a collaboration, or
ambiguous. Collaborations and ambiguous cases are reported separately rather
than folded into the headline number.

Signals, kept apart because they are not equally strong:
  bio   — a founder's own bio names Stanford as a personal affiliation.
  blurb — no founder bio does, but the company's YC description does. Weaker:
          the tie may be a lab, an advisor or a licence rather than a founder.

Run order:  scrape.py  ->  founders.py  ->  stanford_filter.py
"""
import json, os, re, sys, io
from collections import Counter

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
HERE = os.path.dirname(os.path.abspath(__file__))

STANFORD = re.compile(r"\bstanford\b", re.I)
WINDOW = 150

# Tie kinds, read only inside a window around "Stanford". A window may match
# several (BS+MS is common). Order is presentation order, not precedence.
TIES = [
    ("faculty",    r"\b(professor|prof\.|faculty|lecturer|adjunct)\b"),
    ("dropout",    r"\b(drop(ped|ping)?[ -]?out|dropout|left stanford|on leave|deferred|withdrew)\b"),
    ("phd",        r"\b(ph\.?\s?d|doctoral|doctorate)\b"),
    ("postdoc",    r"\b(post[ -]?doc\w*)\b"),
    ("mba",        r"\b(mba|graduate school of business|\bgsb\b)\b"),
    ("masters",    r"\b(m\.?s\.?(?:\b|&)|msc|m\.?eng\b|master'?s?\b|ms&e|coterm|co-term)\b"),
    ("undergrad",  r"\b(b\.?s\.?(?:\b|c)|b\.?a\.?\b|bachelor|undergrad\w*|freshman|sophomore|junior|senior year)\b"),
    ("md",         r"\b(m\.?d\.?\b|medical school|med school|residency)\b"),
    ("researcher", r"\b(research(er|ing|ed)?|\bra\b|lab\b|scholar)\b"),
    ("studied",    r"\b(stud(y|ied|ying)|degree|alum\w*|grad(uate|uated)?\b|attended)\b"),
]

# A window that reads as someone else's Stanford, not the founder's.
COLLAB = re.compile(
    r"(with|alongside|from|by)\s+(top\s+)?(scientists|researchers|professors|faculty|"
    r"advisors?|engineers|experts|teams?|folks|people|phds?)\s+(from|at|of)\s+stanford"
    r"|stanford\s+(professors?|scientists?|researchers?|faculty|advisors?)\s+(advise|joined|back|as)"
    r"|(advis\w+|backed|mentored)\s+by\s+stanford", re.I)

# Anchors that read as the founder's own time at Stanford. A first pass used
# only "at/from/@ Stanford" plus "Stanford <degree>" and missed roughly 25 people
# whose bios use a bare construction — "Stanford Design", "Prev Stanford
# Computer Science", "Stanford '21", "@ Tesla, Stanford". Those are the normal
# way people write a CV line, so the anchor list has to cover them.
PERSONAL = re.compile(
    r"stanford\s+(bs|ba|ms|m\.s|mba|phd|ms&e|gsb|university)"
    # Stanford followed by a department, programme or field
    r"|stanford\s+(cs|ee|me|design|philosophy|business|engineer\w*|econom\w*|"
    r"symbolic|computer|bio\w*|math\w*|physics|chem\w*|psych\w*|law|medic\w*|"
    r"nlp|ai\b|hci|robotics|statistics|management)"
    r"|(at|from|@|in)\s+stanford"
    r"|stanford\s+(grad|alum|dropout|undergrad|student|researcher|research\b|"
    r"postdoc|professor|lecturer|trained|fellow)"
    r"|stanford\s+'?\d\d"                              # "Stanford '21"
    r"|(prev\w*|formerly|ex|then|later)\b[^.]{0,24}\bstanford"
    r"|,\s*stanford\b|\bstanford\s*,"                  # CV list: "Tesla, Stanford"
    r"|(bs|ba|ms|mba|phd|degree|studied|graduated|dropped out|research)\b[^.]{0,40}\bstanford", re.I)

# Named labs and schools worth surfacing on their own.
LABS = [
    ("IRIS (Chelsea Finn)",     r"\biris\b"),
    ("SAIL / Stanford AI Lab",  r"stanford ai lab|\bsail\b|artificial intelligence lab"),
    ("REALab (Shuran Song)",    r"\brealab\b|robotics and embodied"),
    ("SVL (vision & learning)", r"\bsvl\b|vision and learning"),
    ("HAI",                     r"\bhai\b|human-centered ai"),
    ("Stanford HCI",            r"stanford hci|human.computer interaction"),
    ("Bio-X / ChEM-H",          r"bio-?x|chem-?h"),
    ("Stanford Medicine",       r"stanford medic\w*|school of medicine"),
    ("GSB",                     r"\bgsb\b|graduate school of business"),
    ("Robotics (unspecified)",  r"\brobotics?\b"),
]

STUDENT_TIES = {"phd", "masters", "undergrad", "dropout", "researcher", "postdoc", "mba", "md", "studied"}

# Other universities, so a degree can be attributed to the school it belongs to.
# "BA from Amherst College, M.Ed. from BU, MBA from Stanford GSB" must yield mba
# only — a plain window scan also returns undergrad, which is Amherst's.
OTHER_SCHOOL = re.compile(
    r"\b(MIT|Harvard|Berkeley|UC\s?Berkeley|CMU|Carnegie\s?Mellon|Caltech|Princeton|Yale|"
    r"Columbia|Cornell|Oxford|Cambridge|Imperial|ETH|EPFL|Polytechnique|IIT\b|IIIT|NIT\b|"
    r"Waterloo|Toronto|McGill|UCLA|USC|UCSD|Michigan|Illinois|Georgia\s?Tech|Purdue|"
    r"Tsinghua|Peking|NUS|NTU|Nanyang|Bilkent|TUM|Technical University|Amherst|"
    r"Naval Academy|West Point|Duke|Brown|Dartmouth|Northwestern|NYU|BU\b|Penn\b|UPenn)\b",
    re.I)


def windows(bio):
    return [bio[max(0, m.start() - WINDOW): m.end() + WINDOW] for m in STANFORD.finditer(bio)]


def _nearest_is_stanford(window, tok_start, tok_end):
    """True when the closest university mention to this token is Stanford."""
    best_d, best_is_stanford = 10 ** 9, False
    for m in STANFORD.finditer(window):
        d = 0 if m.start() <= tok_end and m.end() >= tok_start else \
            min(abs(m.start() - tok_end), abs(tok_start - m.end()))
        if d < best_d:
            best_d, best_is_stanford = d, True
    for m in OTHER_SCHOOL.finditer(window):
        d = 0 if m.start() <= tok_end and m.end() >= tok_start else \
            min(abs(m.start() - tok_end), abs(tok_start - m.end()))
        if d < best_d:
            best_d, best_is_stanford = d, False
    return best_is_stanford


def kinds_in(window):
    """Tie kinds whose nearest university mention is Stanford."""
    out = []
    for k, pat in TIES:
        for m in re.finditer(pat, window, re.I):
            if _nearest_is_stanford(window, m.start(), m.end()):
                out.append(k)
                break
    return out


def classify(bio):
    """Return (affiliation, tie_kinds, labs, evidence_window)."""
    best = ("none", [], [], "")
    for w in windows(bio):
        is_collab = bool(COLLAB.search(w))
        # "scientists from Stanford" also satisfies the bare "from stanford"
        # personal anchor, so remove the collaboration phrase before asking
        # whether anything personal is left in the window.
        residue = COLLAB.sub(" ", w) if is_collab else w
        is_personal = bool(PERSONAL.search(residue))
        kinds = kinds_in(w)
        labs = [n for n, pat in LABS if re.search(pat, w, re.I)]
        if is_personal and not is_collab:
            aff = "personal"
        elif is_collab and not is_personal:
            aff = "collaboration"
        elif is_collab and is_personal:
            aff = "ambiguous"
        else:
            aff = "ambiguous"
        rank = {"personal": 3, "ambiguous": 2, "collaboration": 1, "none": 0}
        if rank[aff] > rank[best[0]]:
            best = (aff, kinds, labs, w.strip())
    return best


def main():
    path = os.path.join(HERE, "founders.json")
    if not os.path.exists(path):
        print("founders.json missing — run founders.py first"); sys.exit(1)
    data = json.load(io.open(path, encoding="utf-8"))

    total_f = sum(len(c["founders"]) for c in data)
    with_bio = sum(1 for c in data for f in c["founders"] if f["bio"])
    no_founder_data = sum(1 for c in data if not c["founders"])

    companies, collabs, ambiguous = [], [], []
    for c in data:
        personal, amb, col = [], [], []
        for f in c["founders"]:
            if not f["bio"] or not STANFORD.search(f["bio"]):
                continue
            aff, kinds, labs, ev = classify(f["bio"])
            rec = {
                "name": f["name"], "title": f["title"], "bio": f["bio"],
                "linkedin": f.get("linkedin", ""), "twitter": f.get("twitter", ""),
                "affiliation": aff, "tie_kinds": kinds or ["unspecified"], "labs": labs,
                "evidence": ev,
                "is_student_tie": bool(STUDENT_TIES & set(kinds)),
            }
            (personal if aff == "personal" else col if aff == "collaboration" else amb).append(rec)

        base = {
            "slug": c["slug"], "name": c["name"], "batch": c["batch"],
            "status": c["status"], "one_liner": c["one_liner"],
            "industry": c["industry"], "team_size": c["team_size"],
            "website": c["website"], "n_founders_total": len(c["founders"]),
        }
        if personal:
            companies.append(dict(base, signal="founder-bio", stanford_founders=personal,
                                  also_ambiguous=amb, also_collaboration=col))
        elif amb:
            ambiguous.append(dict(base, stanford_founders=amb))
        elif col:
            collabs.append(dict(base, stanford_founders=col))
        elif c.get("long_description") and STANFORD.search(c["long_description"]):
            m = STANFORD.search(c["long_description"])
            companies.append(dict(base, signal="company-blurb-only", stanford_founders=[],
                                  blurb_context=c["long_description"][max(0, m.start() - 110):m.start() + 140],
                                  also_ambiguous=[], also_collaboration=[]))

    out = {
        "method": __doc__,
        "scope_limit": ("The YC directory snapshot this reads (yc_raw.json) covers Winter 2022 "
                        "onward. Stanford-founded YC companies from earlier batches — Vori (a "
                        "confirmed case) among them — are outside it by construction."),
        "coverage": {
            "companies_in_directory": len(data),
            "companies_without_founder_records": no_founder_data,
            "founder_records": total_f,
            "founder_records_with_a_bio": with_bio,
            "bio_coverage_pct": round(100.0 * with_bio / max(1, total_f), 1),
        },
        "companies": companies,
        "collaboration_only": collabs,
        "ambiguous": ambiguous,
    }
    op = os.path.join(HERE, "stanford_yc.json")
    json.dump(out, io.open(op, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    bio_hits = [h for h in companies if h["signal"] == "founder-bio"]
    blurb = [h for h in companies if h["signal"] == "company-blurb-only"]
    student = [h for h in bio_hits if any(f["is_student_tie"] for f in h["stanford_founders"])]

    print("YC directory (W22 onward):  %d companies" % len(data))
    print("  founder records:          %d  (%d with a bio, %.1f%%)"
          % (total_f, with_bio, 100.0 * with_bio / max(1, total_f)))
    print("  companies w/o founder data: %d" % no_founder_data)
    print()
    print("STANFORD-FOUNDED:           %d companies" % len(companies))
    print("  personal tie in a bio:    %d" % len(bio_hits))
    print("  company blurb only:       %d  (weaker)" % len(blurb))
    print("  with a student-type tie:  %d" % len(student))
    print()
    print("HELD BACK, not counted above:")
    print("  collaboration-only:       %d companies  (bio names Stanford people, not the founder's own time there)" % len(collabs))
    print("  ambiguous:                %d companies  (needs a human read)" % len(ambiguous))
    print()
    print("BY TIE KIND (founder records with a personal tie):")
    for k, v in Counter(k for h in bio_hits for f in h["stanford_founders"] for k in f["tie_kinds"]).most_common():
        print("   %-12s %d" % (k, v))
    print()
    print("BY NAMED LAB / SCHOOL:")
    for k, v in Counter(l for h in bio_hits for f in h["stanford_founders"] for l in f["labs"]).most_common():
        print("   %-28s %d" % (k, v))
    print()
    print("BY BATCH:")
    for k, v in sorted(Counter(h["batch"] for h in companies).items(), key=lambda x: -x[1]):
        print("   %-14s %d" % (k, v))
    print()
    print("BY STATUS:", dict(Counter(h["status"] for h in companies)))
    print("BY INDUSTRY:")
    for k, v in Counter(h["industry"] for h in companies).most_common(10):
        print("   %-26s %d" % (k, v))
    print("\nwrote %s" % op)


if __name__ == "__main__":
    main()
