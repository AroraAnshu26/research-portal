# The measurement rig — build spec

Companion to `reports/astra-hackathon-plan-2026-09-18.md`. That document argues
the rig should exist. This one says what it is, what it costs, and how you find
out it is broken before 24 October rather than during it.

**Written:** 2026-09-19. Rung 0 is built and passing; everything above it is
specified, not built.

---

## 1. What the rig is, precisely

An instrument that takes a robot doing a task and returns a defensible estimate
of its success rate, with an interval, **without being connected to the robot.**

That last clause is the whole design. The rig has no ROS node, no driver, no API
client, no shared clock with the robot. It observes from outside, like a laser
tracker observes an arm. Three consequences follow, and they are the reasons to
build it this way:

1. **Independence.** A number derived from the system under test is the fox
   counting the hens. The rig's estimate depends on no artefact the policy
   produced.
2. **Zero integration cost per team.** Nothing to install, no repo access, no
   version negotiation. A team opts in by letting you point a camera at their
   bay and by pressing one key. On a twelve-hour floor, this is the difference
   between measuring one policy and measuring ten.
3. **It works on hardware you have never seen.** M1, G1, OpenArm, somebody's
   hand-built SO-101 — the rig cannot tell and does not care.

The cost of that choice is real and should be stated: the rig cannot see
internal state, so it cannot attribute a failure to a specific subsystem on its
own. Attribution comes from the operator, prompted, in the three seconds after
the trial. That is a feature of the protocol, not a gap in the sensing.

## 2. Architecture

Five components. Only the fifth is novel; the first four are plumbing done
carefully.

```
  [ fixture ]      AprilTag board defining the task frame + a static
                   reference tag that never moves
       |
  [ capture ]      2 global-shutter USB cameras, per-frame timestamps
       |           written to a sidecar; H.264 clips per trial
       |
  [ protocol ]     seeded placement list -> reset verification -> GO ->
       |           timeout -> outcome -> attribution. The rig owns the clock.
       |
  [ labelling ]    tier 0 human key / tier 1 geometric predicate /
       |           tier 2 VLM judge, whose OWN error rate is measured
       |
  [ inference ]    anytime-valid confidence sequence, imperfect-labeller
                   correction, paired non-regression test  <-- BUILT
```

### 2.1 Fixture and task frame

A printed AprilTag board (36h11 family, tags at a measured pitch) bonded to a
rigid flat plate — foam-core or 3 mm aluminium, not paper taped to a table.
Print scale must be verified with calipers; a 2% scale error in the printed tag
size becomes a 2% range error in every pose the rig reports, silently.

One tag is designated the **static reference** and is fixed to something that
does not move. Every frame, the rig re-solves the reference tag's pose. If it
shifts beyond tolerance, the rig raises a drift alarm and marks every trial
since the last good check as suspect. That single feature converts "somebody
bumped the tripod at 14:30" from a silent corruption into a logged event.

### 2.2 Capture

Two cameras: one overhead-ish on the workspace, one oblique for occlusion
recovery. **Global shutter is not optional** — rolling shutter smears a moving
arm and skews tag pose during exactly the moments that matter.

The recorder runs in its own thread and writes H.264 through PyAV/ffmpeg with a
per-frame timestamp sidecar in JSONL. The timestamps are the data; the video is
the evidence. Design rule: append-only, fsync at trial close, so a crash at
19:40 costs one trial and not the day.

### 2.3 Protocol — the reset is part of the measurement

This is the part most evaluations get wrong, and it is free to get right.

If a human resets the object by eye, the initial-state distribution is unmeasured
and it *drifts over the day* — tired operators place objects in easier spots,
and the policy appears to improve after dinner. So:

1. The rig draws placement `i` from a **seeded** list, fixed before the session.
2. It displays the target pose as an overlay on a tablet at the bay.
3. It measures the achieved pose from the tags and **refuses to arm the trial**
   until the achieved pose is within tolerance (say 5 mm, 3°).
4. It says GO, flashes an LED in camera view (a clapperboard mark: frame-accurate
   t0 that needs no network sync), starts the clip, and runs a timeout.
5. Outcome is recorded. If failure, a 5-key palette captures the attribution
   **and a second required field: what the operator would change next.**

Step 5's two fields, paired, are the kill test from the four-theses analysis.
Everything else on this page is infrastructure for collecting them honestly.

Step 1's seeded list is what makes § 2.5's paired test possible: policy B gets
the *identical* placements policy A got.

### 2.4 Labelling, in three tiers

- **Tier 0 — operator key.** Fast, and it is the team grading its own homework.
  Acceptable only as a cross-check.
- **Tier 1 — geometric predicate.** Object's final pose inside the goal region
  for ≥ 1 s, measured from tags. Objective and nearly free. Covers pick-and-place
  and tagged-fixture insertion. Prefer this whenever the task admits it.
- **Tier 2 — VLM judge** over 8–16 sampled frames of the clip, temperature 0,
  strict structured output, a rubric written per task. For folding, pouring,
  wiping — tasks with no pose predicate.

**The judge is an instrument and carries its own error.** Hand-label 40–60 trials
blind, compute sensitivity/specificity/κ, and both (a) print them on every
receipt the judge touches and (b) feed them into the Rogan–Gladen correction in
`stats.rogan_gladen`. Test 4 below shows why: a judge at se = .92 / sp = .88 —
which reads as excellent — biases the headline rate by about two points, and the
correction removes it.

### 2.5 Inference — this is the product, and it is built

`tools/rig/stats.py`, 300 lines, numpy + scipy only. Four capabilities:

**Anytime-valid confidence sequence** (`HedgedCS`, hedged capital process,
Waudby-Smith & Ramdas 2023). The operator may look at the interval after every
single trial and stop the instant their claim is decided, and coverage still
holds. Implemented incrementally — running log-capital vectors over a candidate
grid, one update per trial — because recomputing from scratch at every look is
O(n²) and the live display needs it between trials.

**Fixed-n intervals** (Wilson, Clopper–Pearson) kept for comparison, and to
demonstrate their failure under peeking.

**Rogan–Gladen correction** for an imperfect labeller, plus `judge_agreement`
to produce the se/sp the correction needs.

**Paired non-regression** — `discordance`, `n_needed_paired` (Connor 1987),
`paired_mcnemar`, and simulation-based power functions that check the formulas
rather than trusting them. This is the thesis wedge in code: replay the seeded
list against the new policy, and only discordant pairs carry information.

## 3. Hardware, with prices

Buy the cheap half; borrow the expensive half from the event.

| Item | Why | Cost |
|---|---|---|
| 2× global-shutter USB3 cameras, 1280×800 @ 60 fps | rolling shutter smears the arm | $90–130 ea |
| 2× magic-arm clamps + a small tripod | rigidity is a measurement requirement | ~$70 |
| AprilTag board on 3 mm rigid plate, printed + calipered | the task frame | ~$25 |
| ChArUco calibration target, rigid | intrinsics + extrinsics | ~$25 |
| Small LED panel | lab lighting changes at dinner; exposure shifts kill tag detection | ~$40 |
| USB numpad or foot pedal | one-handed labelling; genuinely raises throughput | ~$20 |
| Powered USB3 hub **on separate host controllers** | two cameras on one controller will drop frames | ~$35 |
| Laptop | tag detection is CPU-cheap; no GPU needed | have it |
| **Total to buy** | | **≈ $400–480** |

Borrow from the floor, do not buy: tactile kits (event provides), any force/torque
sensor, and the robots. A GelSight Mini is ~$500/fingertip and is a tier-2 nicety,
not a dependency.

**Do not buy a depth camera.** For tag-based pose, a good global-shutter mono at
60 fps beats a RealSense, and depth adds a calibration surface you do not need.

## 4. Software requirements

```
python 3.11+
numpy, scipy              # built and passing today
opencv-contrib-python     # ChArUco calibration, AprilTag detection
pupil-apriltags           # faster/steadier detector than cv2's for 36h11
av (PyAV)                 # H.264 recording without dropping frames
flask or fastapi          # local operator UI, one page
an API key for a frontier VLM   # tier-2 judging only
```

Nothing exotic, nothing GPU, nothing that needs the network except the judge —
and the judge can run after the session, from saved clips, if the lab wifi is
bad. Assume the lab wifi is bad.

**Operator UI.** One local page, huge fonts, readable from 2 m in a loud room:
target-placement overlay, ARM/GO state, trial counter, the live shrinking
interval, and the 5-key attribution palette. This is where most of the polish
budget goes, because at 18:00 the operator will be someone you met that morning.

**Data layout.** One directory per session; `trials.jsonl` append-only, one
record per trial; `clips/`; `receipt.pdf`. Reuse the gstack `make-pdf` path for
the receipt.

## 5. The test ladder — how you find out it is broken

Five rungs. Each fails cheaply and independently, and **none of them requires
the event.** Rung 0 is done.

### Rung 0 — statistics, no hardware. DONE, passing.

`python tools/rig/test_coverage.py`. Simulate trials from a known success rate
and ask whether the instrument reads it back with the coverage it advertises.
Measured on 2026-09-19, seed 20261024:

| Test | Result |
|---|---|
| 1. Fixed n=40, p=0.70 | hedged-cs 99.7% coverage (width 0.435), eb-cs 100% (0.533), Wilson 95.0% (0.270), Clopper–Pearson 97.0% (0.296) |
| **2. Optional stopping, p = claim = 0.60** | **hedged-cs 96.8% coverage / 3.2% false stops. Wilson 68.5% / 31.5% false stops** |
| 3. Real effect, p=0.85 vs claim 0.60 | resolved in 100% of runs, median 23 trials, p90 63; fixed-n design needs 49 |
| 4. Judge at se=.92/sp=.88 | naive estimate biased −0.018; Rogan–Gladen corrected +0.002 |
| 5. 10pp regression | paired replay 179 pairs vs 329/arm independent — **46% less robot time**; simulated power 77.5% vs 76.8% against a nominal 80%, so the formula checks out |
| 6. What a demo supports | 1/1 → [0.03, 1.00]. 8/10 → [0.44, 0.97]. 32/40 → [0.64, 0.91] |

Test 2 is the one that justifies the project. A method that is perfectly correct
at a pre-committed n loses a third of its coverage the moment a human is allowed
to watch it and stop when it looks good — which is what every operator does.
Test 6 is the lightning talk.

### Rung 1 — judge validation on video, no robot. ~1 day.

Pull existing manipulation clips (DROID, Open X-Embodiment, or YouTube).
Hand-label 50 blind. Run the tier-2 judge. Compute se/sp/κ with
`judge_agreement`. **If the judge is near chance on your task family you learn
it now, not at 19:00 on the 24th.** Gate to pass: κ ≥ 0.7 on the task family you
intend to measure.

### Rung 2 — camera and tag metrology, no robot. ~half a day.

Mount everything. Place a tagged object at 20 positions measured against a
printed grid or calipers. Report RMS pose error in mm and degrees. Then two
tests that matter more than the first:

- **Drift.** Leave it running two hours on a static object and re-measure. If
  the rig cannot hold ~2 mm over two hours it cannot certify anything.
- **Tamper.** Deliberately bump the tripod. Confirm the static-reference alarm
  fires and flags the affected trials.

### Rung 3 — full loop on a cheap arm, known ground truth. ~2–3 evenings.

An SO-101 (~$100–130) or any hobby arm. Run a *scripted* pick with **deliberately
injected failure** — perturb the grasp pose with calibrated noise so the true
success rate is, by construction, ≈0.70.

Then ask the rig what it thinks. **You know the answer; the instrument does not.**
This is the end-to-end correctness test, and it is the one that makes the whole
thing trustworthy.

Then the thesis demo in miniature: script policy A at ≈0.75 and policy B at
≈0.65, interleave them over the identical seeded placement list, and check the
paired test detects the 10pp regression near the n that `n_needed_paired`
predicted (179 pairs at ρ=0.6). If the observed ρ on real replays is much lower
than 0.6, the saving shrinks — Test 5's sensitivity table shows ρ=0.3 gives only
22% and ρ=0 gives nothing. **Measuring the real ρ is a Rung 3 deliverable**, and
it is a genuinely unknown number worth publishing on its own.

### Rung 4 — dress rehearsal on a real arm, with a stranger. ~1 day, before 24 Oct.

Borrow time on a Franka/UR/ALOHA (IRIS and REALab both have arms; contacts are
in `reports/stanford-labs-map-2026-09-14.md`). Run the whole protocol with
someone who has never seen it, and time everything.

Throughput is the gate. Budget 40 trials × (15 s reset + 20 s run + 5 s label)
≈ **27 minutes per policy**. If a dress rehearsal comes in materially over that,
the floor-wide version is arithmetic-impossible and the plan reverts to the solo
version. Better to learn that in early October.

Also measured here: reset-rejection rate, judge disagreements, and crashes.

## 6. Known failure modes

- **USB bandwidth.** Two cameras on one host controller drop frames. Separate
  controllers, verify with a frame-timestamp histogram, not by eye.
- **Lighting changes at dinner.** Fixed exposure, own LED panel, and re-verify
  tag detection rate after any lighting change.
- **Scale error in the printed board.** Silent, systematic, and invisible unless
  you measure the printed tag with calipers. Do it once, write the number down.
- **ρ is lower than hoped.** The paired saving is real but entirely contingent on
  replays actually pairing. Unknown until Rung 3.
- **Nobody opts in.** The solo version is a complete project; opt-ins are upside.
- **It reads as criticism of other teams.** Measure your own system first and
  worst, arrive with receipts rather than verdicts.

## 7. What to do next, in order

1. **Rung 1 this week** — it needs no purchase and it is the likeliest thing to
   kill the tier-2 judge plan. Bad κ now is worth more than a good demo later.
2. Order the cameras and clamps (~$450, one order).
3. Rung 2 when they arrive.
4. Buy or borrow an SO-101 for Rung 3 and measure the real ρ.
5. Book a lab hour for Rung 4 in the first half of October.
6. Submit the Luma application now regardless — approval is gated on capacity,
   not on readiness, and the plan does not depend on approval to be worth
   building.
