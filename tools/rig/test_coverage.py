"""Rung 0 of the test ladder: validate the statistics with no hardware at all.

The rig's entire claim is "this number is defensible". That claim is testable
tonight, on a laptop, by simulating trials from a KNOWN success rate and
asking whether the instrument reads it back with the coverage it advertises.

If this file fails, nothing downstream is worth building.

Run:  python tools/rig/test_coverage.py
"""

from __future__ import annotations

import numpy as np

from stats import (
    HedgedCS,
    hedged_confidence_sequence,
    eb_confidence_sequence,
    wilson,
    clopper_pearson,
    rogan_gladen,
    judge_agreement,
    n_needed_unpaired,
    n_needed_paired,
    discordance,
    empirical_power_paired,
    empirical_power_unpaired,
    paired_mcnemar,
)

RNG = np.random.default_rng(20261024)
ALPHA = 0.05
REPS = 2000
SEQ_REPS = 1000   # sequential tests re-look after every trial; cheaper budget


def hdr(title: str) -> None:
    print("\n" + "=" * 72)
    print(title)
    print("=" * 72)


# ---------------------------------------------------------------------------
# Test 1 - fixed n, chosen in advance. Everything should behave.
# ---------------------------------------------------------------------------

def test_fixed_n_coverage(p_true: float = 0.70, n: int = 40) -> None:
    hdr(f"TEST 1  fixed n = {n}, true p = {p_true}, {REPS} replications")
    hits = {"hedged-cs": 0, "eb-cs": 0, "wilson": 0, "clopper-pearson": 0}
    widths = {k: [] for k in hits}
    for _ in range(REPS):
        x = RNG.random(n) < p_true
        for ci in (hedged_confidence_sequence(x, ALPHA),
                   eb_confidence_sequence(x, ALPHA), wilson(x, ALPHA),
                   clopper_pearson(x, ALPHA)):
            if ci.lo <= p_true <= ci.hi:
                hits[ci.method] += 1
            widths[ci.method].append(ci.width)

    print(f"  {'method':<18}{'coverage':>10}{'target':>9}{'mean width':>13}")
    for m in hits:
        cov = hits[m] / REPS
        flag = "ok" if cov >= 1 - ALPHA - 0.01 else "UNDER"
        print(f"  {m:<18}{cov:>9.1%}{1-ALPHA:>9.0%}{np.mean(widths[m]):>13.3f}  {flag}")
    print("\n  Read: at a pre-committed n all four are honest. The anytime-valid")
    print("  intervals are wider - that width is the price of being allowed to")
    print("  peek. Hedged betting recovers most of what plain empirical Bernstein")
    print("  gives away, which is why it is the one the rig deploys.")


# ---------------------------------------------------------------------------
# Test 2 - the one that matters. Peek after every trial and stop when the
# claim looks decided. This is what an operator on a hackathon floor will
# actually do, whether or not the statistics permit it.
# ---------------------------------------------------------------------------

def test_optional_stopping(p_true: float = 0.60, claim: float = 0.60,
                           n_max: int = 200, n_min: int = 10) -> None:
    hdr(f"TEST 2  optional stopping. true p = {p_true}, operator watches the "
        f"interval\n        after every trial and stops as soon as it excludes "
        f"{claim} (cap n={n_max})")

    results = {}
    for method in ("hedged-cs", "wilson"):
        covered = stopped_early = 0
        stop_ns = []
        for _ in range(SEQ_REPS):
            x = RNG.random(n_max) < p_true
            cs = HedgedCS(alpha=ALPHA) if method == "hedged-cs" else None
            final = None
            for t in range(1, n_max + 1):
                if cs is not None:
                    cs.update(float(x[t - 1]))
                    if t < n_min:
                        continue
                    ci = cs.interval
                else:
                    if t < n_min:
                        continue
                    ci = wilson(x[:t], ALPHA)
                if ci.excludes(claim):
                    final, stopped_early = ci, stopped_early + 1
                    break
            if final is None:
                final = cs.interval if cs is not None else wilson(x, ALPHA)
            stop_ns.append(final.n)
            if final.lo <= p_true <= final.hi:
                covered += 1
        results[method] = (covered / SEQ_REPS, stopped_early / SEQ_REPS,
                           np.mean(stop_ns))

    print(f"  {'method':<18}{'coverage':>10}{'target':>9}"
          f"{'false stops':>14}{'mean n':>9}")
    for m, (cov, early, mn) in results.items():
        flag = "ok" if cov >= 1 - ALPHA - 0.01 else "BROKEN"
        print(f"  {m:<18}{cov:>9.1%}{1-ALPHA:>9.0%}{early:>14.1%}{mn:>9.0f}  {flag}")

    print("\n  Read: the true rate IS the claim, so every stop here is a false")
    print("  positive. Wilson was never wrong about anything except how many")
    print("  times you were allowed to look at it. This is the single slide that")
    print("  justifies the rig existing.")


# ---------------------------------------------------------------------------
# Test 3 - stopping early when the claim is genuinely true, which is the
# operational benefit: fewer robot hours per decided claim.
# ---------------------------------------------------------------------------

def test_early_stopping_benefit(p_true: float = 0.85, claim: float = 0.60,
                                n_max: int = 200) -> None:
    hdr(f"TEST 3  a REAL effect. true p = {p_true}, claim under test is "
        f"'beats {claim}'")
    stops, decided = [], 0
    for _ in range(SEQ_REPS):
        x = RNG.random(n_max) < p_true
        cs = HedgedCS(alpha=ALPHA)
        for t in range(1, n_max + 1):
            cs.update(float(x[t - 1]))
            if t >= 5 and cs.interval.lo > claim:
                stops.append(t)
                decided += 1
                break
        else:
            stops.append(n_max)
    fixed = n_needed_unpaired(p_true, claim, ALPHA, 0.8)
    print(f"  claim resolved in           {decided/SEQ_REPS:>6.1%} of runs")
    print(f"  median trials to decide     {int(np.median(stops)):>6d}")
    print(f"  90th percentile             {int(np.percentile(stops, 90)):>6d}")
    print(f"  fixed-n design would need   {fixed:>6d}  (per arm, 80% power)")
    print("\n  Read: sequential stopping buys robot hours back when the policy is")
    print("  genuinely good. On a floor with one arm and twelve hours, that is")
    print("  the difference between measuring three policies and measuring ten.")


# ---------------------------------------------------------------------------
# Test 4 - the judge is a measuring instrument and has its own error.
# ---------------------------------------------------------------------------

def test_imperfect_judge(p_true: float = 0.70, se: float = 0.92,
                         sp: float = 0.88, n: int = 400) -> None:
    hdr(f"TEST 4  imperfect success labeller. true p = {p_true}, "
        f"judge se = {se}, sp = {sp}")
    naive, corrected = [], []
    for _ in range(500):
        truth = RNG.random(n) < p_true
        obs = np.where(truth, RNG.random(n) < se, RNG.random(n) < (1 - sp))
        naive.append(obs.mean())
        corrected.append(rogan_gladen(obs.mean(), se, sp))
    print(f"  naive (judge taken at face value)   {np.mean(naive):.3f}"
          f"   bias {np.mean(naive)-p_true:+.3f}")
    print(f"  Rogan-Gladen corrected              {np.mean(corrected):.3f}"
          f"   bias {np.mean(corrected)-p_true:+.3f}")

    truth = RNG.random(60) < p_true
    jlab = np.where(truth, RNG.random(60) < se, RNG.random(60) < (1 - sp))
    a = judge_agreement(truth.astype(int), jlab.astype(int))
    print(f"\n  what a 60-trial blind validation subset would report:")
    print(f"    sensitivity {a['sensitivity']:.2f}   specificity "
          f"{a['specificity']:.2f}   agreement {a['agreement']:.2f}   "
          f"kappa {a['kappa']:.2f}")
    print("\n  Read: a judge at se=.92/sp=.88 looks excellent and still biases the")
    print("  headline number by several points. The correction needs the judge's")
    print("  own error rate, which is why validating the judge is a build step")
    print("  and not an afterthought.")


# ---------------------------------------------------------------------------
# Test 5 - the non-regression case. Same seeded placements to both policies.
# ---------------------------------------------------------------------------

def test_paired_vs_unpaired(p_a: float = 0.75, p_b: float = 0.65,
                            rho: float = 0.6) -> None:
    hdr(f"TEST 5  detecting a {100*(p_a-p_b):.0f}pp regression: "
        f"paired replay vs independent runs")
    unpaired = n_needed_unpaired(p_a, p_b, ALPHA, 0.8)
    paired = n_needed_paired(p_a, p_b, rho, ALPHA, 0.8)
    p10, p01 = discordance(p_a, p_b, rho)

    print(f"  replay model: rho = {rho}, so P(A wins, B loses) = {p10:.3f} and "
          f"P(B wins, A loses) = {p01:.3f}")
    print(f"  independent groups   {unpaired:>5d} per arm   "
          f"= {2*unpaired:>4d} robot runs")
    print(f"  paired replay        {paired:>5d} pairs     "
          f"= {2*paired:>4d} robot runs")
    print(f"  saving               {1 - (2*paired)/(2*unpaired):>5.0%} "
          f"of the robot time")

    # Check the formula against simulation rather than trusting it.
    ep = empirical_power_paired(p_a, p_b, paired, rho, ALPHA, 600, RNG)
    eu = empirical_power_unpaired(p_a, p_b, unpaired, ALPHA, 600, RNG)
    print(f"\n  simulated power at those n (target 80%):")
    print(f"    paired    {ep:>6.1%}")
    print(f"    unpaired  {eu:>6.1%}")

    print("\n  Read: replaying the identical placement list is not tidiness, it is")
    print("  the variance reduction that makes 'did this OTA update regress?'")
    print("  answerable inside one afternoon instead of one week. Note how hard")
    print("  a 10pp regression is either way - this is why the field's published")
    print("  comparisons mostly cannot support their own headlines.")
    print("\n  Sensitivity of the saving to how well the replay actually pairs:")
    for r in (0.0, 0.3, 0.6, 0.9):
        try:
            np_ = n_needed_paired(p_a, p_b, r, ALPHA, 0.8)
            print(f"    rho={r:.1f}  {np_:>5d} pairs  "
                  f"({1 - (2*np_)/(2*unpaired):>+5.0%} vs independent)")
        except ValueError as exc:
            print(f"    rho={r:.1f}  n/a ({exc})")


# ---------------------------------------------------------------------------
# Test 6 - the honest headline: what n=1 and n=10 actually entitle you to.
# ---------------------------------------------------------------------------

def test_what_a_demo_entitles_you_to() -> None:
    hdr("TEST 6  what a hackathon demo actually supports")
    print(f"  {'trials':>7}{'observed':>11}{'95% interval':>22}{'width':>9}")
    for n, k in ((1, 1), (3, 3), (5, 4), (10, 8), (20, 16), (40, 32), (100, 80)):
        x = np.array([1] * k + [0] * (n - k))
        ci = clopper_pearson(x, ALPHA)
        obs = f"{k}/{n}"
        rng_s = f"[{ci.lo:.2f}, {ci.hi:.2f}]"
        print(f"  {n:>7}{obs:>11}{rng_s:>22}{ci.width:>9.2f}")
    print("\n  Read: the demo that works once supports the claim 'somewhere between")
    print("  2.5% and 100%'. Eight out of ten - a triumphant demo - still spans")
    print("  44 to 97. This table is the lightning talk.")


if __name__ == "__main__":
    print("MEASUREMENT RIG - Rung 0 validation (no hardware)")
    print(f"alpha = {ALPHA}, replications = {REPS}, seed = 20261024")
    test_fixed_n_coverage()
    test_optional_stopping()
    test_early_stopping_benefit()
    test_imperfect_judge()
    test_paired_vs_unpaired()
    test_what_a_demo_entitles_you_to()
    print("\n" + "=" * 72)
    print("Rung 0 complete. If TEST 2 shows hedged-cs holding coverage and")
    print("wilson breaking, the statistical core is sound and Rung 1 starts.")
    print("=" * 72)
