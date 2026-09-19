"""Statistical core of the measurement rig.

Everything here operates on a list of 0/1 trial outcomes. No hardware, no
cameras, no robot. This module is the part of the rig that makes a claim
defensible, so it is the part that gets tested first and hardest.

Four things live here:

  1. An ANYTIME-VALID confidence sequence (predictable-plug-in empirical
     Bernstein, Waudby-Smith & Ramdas 2023). You may look at it after every
     trial and stop whenever you like; the coverage guarantee survives.
  2. The Wilson interval, for comparison only. It is correct at a FIXED n
     chosen in advance and it silently breaks under optional stopping.
     test_coverage.py measures exactly how badly.
  3. Rogan-Gladen correction, for when the success labeller is imperfect
     (a VLM judge). An evaluator that will not state its own error rate is
     not an evaluator; this is where the stated rate enters the arithmetic.
  4. A power calculator: how many trials to resolve an effect of a given
     size, paired and unpaired.

Reference for (1): Waudby-Smith & Ramdas, "Estimating means of bounded
random variables by betting", JRSS-B 2023, the PrPl-EB construction.
"""

from __future__ import annotations

import math
from dataclasses import dataclass

import numpy as np
from scipy import stats as sps

__all__ = [
    "Interval",
    "hedged_confidence_sequence",
    "eb_confidence_sequence",
    "cs_track",
    "wilson",
    "clopper_pearson",
    "rogan_gladen",
    "judge_agreement",
    "n_needed_unpaired",
    "n_needed_paired",
    "paired_mcnemar",
]


@dataclass(frozen=True)
class Interval:
    lo: float
    hi: float
    point: float
    n: int
    method: str

    @property
    def width(self) -> float:
        return self.hi - self.lo

    def excludes(self, value: float) -> bool:
        """True if `value` is outside the interval - i.e. the claim is decided."""
        return value < self.lo or value > self.hi

    def __str__(self) -> str:
        return (
            f"{self.point:.3f} [{self.lo:.3f}, {self.hi:.3f}] "
            f"(n={self.n}, {self.method})"
        )


# --------------------------------------------------------------------------
# 1. Anytime-valid confidence sequence
# --------------------------------------------------------------------------

def _psi_e(lam: np.ndarray) -> np.ndarray:
    """psi_E(lambda) = (-log(1 - lambda) - lambda) / 4, for lambda in [0, 1)."""
    return (-np.log1p(-lam) - lam) / 4.0


def eb_confidence_sequence(
    outcomes, alpha: float = 0.05, c: float = 0.5
) -> Interval:
    """Empirical-Bernstein confidence sequence over Bernoulli outcomes.

    Valid UNIFORMLY over time: P(exists t such that mu is outside CI_t) <= alpha.
    That is the property that lets an operator watch the interval shrink and
    stop the moment their claim is decided, without inflating error.

    Args:
        outcomes: iterable of 0/1 (or any values in [0, 1]).
        alpha: two-sided error budget for the whole sequence, not per-look.
        c: cap on the betting fraction; 0.5 is the paper's default.
    """
    x = np.asarray(list(outcomes), dtype=float)
    n = x.size
    if n == 0:
        return Interval(0.0, 1.0, float("nan"), 0, "eb-cs")

    idx = np.arange(1, n + 1)

    # Predictable (uses only data strictly before i) running mean and variance,
    # with a 1/2 and 1/4 prior so the first steps are defined.
    cum = np.concatenate(([0.0], np.cumsum(x)))[:-1]          # sum of x_1..x_{i-1}
    mu_hat = (0.5 + cum) / (1.0 + (idx - 1))                  # mu_hat_{i-1}

    sq = (x - mu_hat) ** 2
    cum_sq = np.concatenate(([0.0], np.cumsum(sq)))[:-1]
    sigma2 = (0.25 + cum_sq) / (1.0 + (idx - 1))              # sigma2_{i-1}

    log_term = math.log(2.0 / alpha)
    with np.errstate(divide="ignore", invalid="ignore"):
        lam = np.sqrt(2.0 * log_term / (sigma2 * idx * np.log1p(idx)))
    lam = np.minimum(np.nan_to_num(lam, nan=c, posinf=c), c)

    v = 4.0 * (x - mu_hat) ** 2
    margin = log_term + float(np.sum(v * _psi_e(lam)))
    denom = float(np.sum(lam))

    center = float(np.sum(lam * x) / denom)
    half = margin / denom

    lo = max(0.0, center - half)
    hi = min(1.0, center + half)
    # Report the plain sample mean as the headline number; the weighted centre
    # is an artefact of the betting construction and confuses readers.
    return Interval(lo, hi, float(x.mean()), n, "eb-cs")


def _predictable_lambda(x: np.ndarray, alpha: float) -> np.ndarray:
    """Shared predictable betting schedule: uses only data strictly before i."""
    n = x.size
    idx = np.arange(1, n + 1)
    cum = np.concatenate(([0.0], np.cumsum(x)))[:-1]
    mu_hat = (0.5 + cum) / (1.0 + (idx - 1))
    sq = (x - mu_hat) ** 2
    cum_sq = np.concatenate(([0.0], np.cumsum(sq)))[:-1]
    sigma2 = (0.25 + cum_sq) / (1.0 + (idx - 1))
    with np.errstate(divide="ignore", invalid="ignore"):
        lam = np.sqrt(2.0 * math.log(2.0 / alpha) / (sigma2 * idx * np.log1p(idx)))
    return np.nan_to_num(lam, nan=0.0, posinf=0.0)


class HedgedCS:
    """Incremental hedged-capital confidence sequence.

    The rig needs the interval after EVERY trial, so recomputing from scratch
    each time is the wrong shape: it turns an O(n) job into O(n^2). This keeps
    the log-capital of both betting games as running vectors over the candidate
    grid and folds in one trial per update. That is also what makes the live
    shrinking-interval display cheap enough to redraw between trials.
    """

    def __init__(self, alpha: float = 0.05, grid: int = 500,
                 c: float = 0.75, theta: float = 0.5):
        self.alpha = alpha
        self.c = c
        self.theta = theta
        self.m = np.linspace(0.5 / grid, 1.0 - 0.5 / grid, grid)
        self.log_kp = np.zeros(grid)
        self.log_km = np.zeros(grid)
        self._n = 0
        self._sum = 0.0
        self._sumsq = 0.0
        self._threshold = math.log(1.0 / alpha)
        self._log_theta = math.log(theta)
        self._log_1mtheta = math.log(1.0 - theta)
        self._lam_log = math.log(2.0 / alpha)

    def update(self, x: float) -> "HedgedCS":
        i = self._n + 1
        mu_hat = (0.5 + self._sum) / float(i)          # uses trials before i
        sigma2 = (0.25 + self._sumsq) / float(i)
        lam = math.sqrt(2.0 * self._lam_log / (sigma2 * i * math.log1p(i)))

        d = x - self.m
        self.log_kp += np.log1p(np.minimum(lam, self.c / self.m) * d)
        self.log_km += np.log1p(-np.minimum(lam, self.c / (1.0 - self.m)) * d)

        self._sum += x
        self._sumsq += (x - mu_hat) ** 2
        self._n = i
        return self

    def extend(self, outcomes) -> "HedgedCS":
        for x in outcomes:
            self.update(float(x))
        return self

    @property
    def interval(self) -> Interval:
        if self._n == 0:
            return Interval(0.0, 1.0, float("nan"), 0, "hedged-cs")
        log_k = np.maximum(self._log_theta + self.log_kp,
                           self._log_1mtheta + self.log_km)
        keep = log_k < self._threshold
        point = self._sum / self._n
        if not keep.any():
            return Interval(point, point, point, self._n, "hedged-cs")
        mg = self.m[keep]
        return Interval(float(mg.min()), float(mg.max()), point, self._n,
                        "hedged-cs")


def hedged_confidence_sequence(
    outcomes, alpha: float = 0.05, grid: int = 500, c: float = 0.75,
    theta: float = 0.5,
) -> Interval:
    """Hedged capital confidence sequence (WSR 2023, section 4).

    Same anytime-valid guarantee as the empirical-Bernstein version but
    materially tighter, because it bets directly against each candidate mean
    instead of bounding the log-capital analytically. This is the one the rig
    actually deploys; eb_confidence_sequence is kept for comparison.

    The interval is the set of candidate means m that a two-sided betting
    game has not yet made 1/alpha times its money against.
    """
    return HedgedCS(alpha=alpha, grid=grid, c=c, theta=theta).extend(
        outcomes).interval


def cs_track(outcomes, alpha: float = 0.05, grid: int = 500):
    """The confidence sequence after each trial - what the live plot draws."""
    cs = HedgedCS(alpha=alpha, grid=grid)
    return [cs.update(float(x)).interval for x in outcomes]


# --------------------------------------------------------------------------
# 2. Fixed-n intervals, for comparison
# --------------------------------------------------------------------------

def wilson(outcomes, alpha: float = 0.05) -> Interval:
    """Wilson score interval. Correct ONLY at an n fixed before data collection."""
    x = np.asarray(list(outcomes), dtype=float)
    n = x.size
    if n == 0:
        return Interval(0.0, 1.0, float("nan"), 0, "wilson")
    p = float(x.mean())
    z = float(sps.norm.ppf(1.0 - alpha / 2.0))
    denom = 1.0 + z * z / n
    centre = (p + z * z / (2 * n)) / denom
    half = z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / denom
    return Interval(max(0.0, centre - half), min(1.0, centre + half), p, n, "wilson")


def clopper_pearson(outcomes, alpha: float = 0.05) -> Interval:
    """Exact binomial interval. Conservative, fixed-n only."""
    x = np.asarray(list(outcomes), dtype=float)
    n = x.size
    k = int(x.sum())
    if n == 0:
        return Interval(0.0, 1.0, float("nan"), 0, "clopper-pearson")
    lo = 0.0 if k == 0 else float(sps.beta.ppf(alpha / 2, k, n - k + 1))
    hi = 1.0 if k == n else float(sps.beta.ppf(1 - alpha / 2, k + 1, n - k))
    return Interval(lo, hi, k / n, n, "clopper-pearson")


# --------------------------------------------------------------------------
# 3. Imperfect labeller
# --------------------------------------------------------------------------

def rogan_gladen(p_obs: float, se: float, sp: float) -> float:
    """Correct an observed success rate for a labeller of known se/sp.

    A judge with sensitivity se and specificity sp reports
        p_obs = p * se + (1 - p) * (1 - sp)
    so the corrected estimate is (p_obs + sp - 1) / (se + sp - 1).
    Undefined when se + sp == 1 (a judge with no information).
    """
    denom = se + sp - 1.0
    if abs(denom) < 1e-9:
        raise ValueError("judge carries no information (se + sp = 1)")
    return float(np.clip((p_obs + sp - 1.0) / denom, 0.0, 1.0))


def judge_agreement(human, judge) -> dict:
    """Score the judge against a blind hand-labelled subset.

    Returns sensitivity, specificity, raw agreement and Cohen's kappa. These
    four numbers get printed on every receipt the judge touches.
    """
    h = np.asarray(list(human), dtype=int)
    j = np.asarray(list(judge), dtype=int)
    if h.shape != j.shape or h.size == 0:
        raise ValueError("need equal, non-empty label vectors")
    tp = int(np.sum((h == 1) & (j == 1)))
    tn = int(np.sum((h == 0) & (j == 0)))
    fp = int(np.sum((h == 0) & (j == 1)))
    fn = int(np.sum((h == 1) & (j == 0)))
    n = h.size
    po = (tp + tn) / n
    pe = ((tp + fn) * (tp + fp) + (tn + fp) * (tn + fn)) / (n * n)
    kappa = (po - pe) / (1 - pe) if abs(1 - pe) > 1e-9 else float("nan")
    return {
        "n": n,
        "sensitivity": tp / (tp + fn) if (tp + fn) else float("nan"),
        "specificity": tn / (tn + fp) if (tn + fp) else float("nan"),
        "agreement": po,
        "kappa": kappa,
        "confusion": {"tp": tp, "fp": fp, "tn": tn, "fn": fn},
    }


# --------------------------------------------------------------------------
# 4. How many trials
# --------------------------------------------------------------------------

def n_needed_unpaired(p1: float, p2: float, alpha: float = 0.05,
                      power: float = 0.8) -> int:
    """Trials PER ARM to resolve p1 vs p2 with two independent groups."""
    z_a = float(sps.norm.ppf(1 - alpha / 2))
    z_b = float(sps.norm.ppf(power))
    pbar = (p1 + p2) / 2
    num = (z_a * math.sqrt(2 * pbar * (1 - pbar))
           + z_b * math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2
    return int(math.ceil(num / (p1 - p2) ** 2))


def discordance(p_a: float, p_b: float, rho: float) -> tuple[float, float]:
    """Discordant-pair probabilities under the rig's replay model.

    The rig sends the SAME seeded placement to both policies. Model that as a
    mixture: with probability rho the trial's difficulty is shared (one latent
    draw decides both), otherwise the two are independent. rho = 0 is two
    unrelated runs; rho = 1 is a perfectly nested pair where the only
    disagreements are the genuine p_a - p_b gap.

    Returns (p10, p01): A-wins-B-loses, and the reverse.
    """
    if not 0.0 <= rho <= 1.0:
        raise ValueError("rho must be in [0, 1]")
    lo, hi = min(p_a, p_b), max(p_a, p_b)
    shared_hi = hi - lo
    p10_shared, p01_shared = (shared_hi, 0.0) if p_a >= p_b else (0.0, shared_hi)
    p10 = rho * p10_shared + (1 - rho) * p_a * (1 - p_b)
    p01 = rho * p01_shared + (1 - rho) * (1 - p_a) * p_b
    return p10, p01


def n_needed_paired(p_a: float, p_b: float, rho: float = 0.6,
                    alpha: float = 0.05, power: float = 0.8) -> int:
    """PAIRS needed for McNemar under the replay model (Connor 1987).

    The paired design is the whole reason the rig replays a seeded placement
    list: the same initial conditions go to both policies, most trials agree,
    and only the disagreements carry information. That is what makes
    non-regression testing affordable at the moment of a model update.
    """
    p10, p01 = discordance(p_a, p_b, rho)
    p_disc = p10 + p01
    if p_disc <= 0:
        raise ValueError("no discordant pairs possible; effect is unmeasurable")
    odds = p10 / max(p01, 1e-12)
    if abs(odds - 1.0) < 1e-9:
        raise ValueError("odds ratio of 1 - no effect to detect")
    z_a = float(sps.norm.ppf(1 - alpha / 2))
    z_b = float(sps.norm.ppf(power))
    num = (z_a * (odds + 1)
           + z_b * math.sqrt((odds + 1) ** 2 - (odds - 1) ** 2 * p_disc)) ** 2
    return int(math.ceil(num / (p_disc * (odds - 1) ** 2)))


def empirical_power_paired(p_a: float, p_b: float, n_pairs: int,
                           rho: float = 0.6, alpha: float = 0.05,
                           reps: int = 2000, rng=None) -> float:
    """Measure paired power by simulation, so the formula above is checked
    against the model rather than trusted."""
    rng = rng or np.random.default_rng(0)
    hits = 0
    for _ in range(reps):
        shared_mask = rng.random(n_pairs) < rho
        u = rng.random(n_pairs)
        a = np.where(shared_mask, u < p_a, rng.random(n_pairs) < p_a)
        b = np.where(shared_mask, u < p_b, rng.random(n_pairs) < p_b)
        if paired_mcnemar(a.astype(int), b.astype(int))["p_value"] < alpha:
            hits += 1
    return hits / reps


def empirical_power_unpaired(p_a: float, p_b: float, n_per_arm: int,
                             alpha: float = 0.05, reps: int = 2000,
                             rng=None) -> float:
    """Same, for two independent groups (Fisher exact)."""
    rng = rng or np.random.default_rng(0)
    hits = 0
    for _ in range(reps):
        ka = int((rng.random(n_per_arm) < p_a).sum())
        kb = int((rng.random(n_per_arm) < p_b).sum())
        table = [[ka, n_per_arm - ka], [kb, n_per_arm - kb]]
        if sps.fisher_exact(table)[1] < alpha:
            hits += 1
    return hits / reps


def paired_mcnemar(a_outcomes, b_outcomes) -> dict:
    """Exact McNemar on paired trials run from the SAME placement list."""
    a = np.asarray(list(a_outcomes), dtype=int)
    b = np.asarray(list(b_outcomes), dtype=int)
    if a.shape != b.shape:
        raise ValueError("paired test needs equal-length outcome vectors")
    b01 = int(np.sum((a == 0) & (b == 1)))
    b10 = int(np.sum((a == 1) & (b == 0)))
    n_disc = b01 + b10
    p = 1.0 if n_disc == 0 else float(
        sps.binomtest(b10, n_disc, 0.5).pvalue
    )
    return {
        "n_pairs": int(a.size),
        "a_only": b10,
        "b_only": b01,
        "n_discordant": n_disc,
        "delta": float(a.mean() - b.mean()),
        "p_value": p,
    }
