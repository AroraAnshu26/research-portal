# tools/rig — the measurement rig

Statistical core of the independent measurement rig described in
`reports/measurement-rig-spec-2026-09-19.md`.

Run the validation (no hardware needed, ~4 minutes):

```
cd tools/rig
python test_coverage.py
```

## What is here

| File | State |
|---|---|
| `stats.py` | Built and validated. Anytime-valid confidence sequences, imperfect-labeller correction, paired non-regression tests, power calculators. numpy + scipy only. |
| `test_coverage.py` | Rung 0 of the test ladder. Simulates trials from a known success rate and checks the instrument reads it back at the advertised coverage. |

Not yet built: fixture calibration, capture, protocol runner, operator UI,
VLM judge. Those are Rungs 1–4 in the spec.

## The one result that matters

Test 2 lets a simulated operator watch the interval after every trial and stop
as soon as it excludes the claim — which is what every real operator does. The
true rate *is* the claim, so every stop is a false positive:

```
method              coverage   target   false stops   mean n
hedged-cs             96.8%      95%          3.2%      195  ok
wilson                68.5%      95%         31.5%      153  BROKEN
```

A method that is perfectly correct at a pre-committed n loses a third of its
coverage the moment a human is allowed to look at it. That is the gap the rig
exists to close.

## API sketch

```python
from stats import HedgedCS, rogan_gladen, judge_agreement, n_needed_paired

cs = HedgedCS(alpha=0.05)
for outcome in trials:              # 1 = success, 0 = failure
    ci = cs.update(outcome).interval
    print(ci)                       # 0.750 [0.512, 0.897] (n=40, hedged-cs)
    if ci.excludes(0.60):
        break                       # claim decided; stopping here is legitimate

# correct for a judge whose error rate you measured
a = judge_agreement(human_labels, judge_labels)
p_hat = rogan_gladen(ci.point, a["sensitivity"], a["specificity"])

# how many replay pairs to detect a 10pp regression
n_needed_paired(0.75, 0.65, rho=0.6)     # -> 179
```

## References

- Waudby-Smith & Ramdas, *Estimating means of bounded random variables by
  betting*, JRSS-B 2023 — the hedged capital construction.
- Connor, *Sample size for testing differences in proportions for the paired-
  sample design*, Biometrics 1987 — the McNemar sample size.
- Rogan & Gladen, *Estimating prevalence from the results of a screening test*,
  Am J Epidemiol 1978 — correcting for an imperfect labeller.
