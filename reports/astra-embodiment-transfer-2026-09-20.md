# What does a new body cost, in demonstrations?

**Event:** GPT-6 Astra Robotics Hardware Hackathon — Saturday Robotics × Robotics
Center of Silicon Valley. Saturday 24 October 2026, 09:00–21:00, 90 Welsh St, SF.
Approval-based registration. The form asks: *tell us what you'd build and which
hardware you want.*

**Written:** 2026-09-20. Status: plan for submission. Supersedes
`reports/astra-hackathon-plan-2026-09-18.md` as the thing to submit; that plan's
measurement rig survives as this project's evaluation layer, not as its pitch.

---

## 1. The one-sentence version

The embodiment gap is stated everywhere and priced nowhere; this project puts a
number on it by training policies from scratch on one robot body, running them on
a different body in the same room on the same task, and reporting how many
demonstrations on the new body it takes to recover the loss.

## 2. Why the pivot off the certificate desk

The 18 September plan was an instrument that measured other teams. Three things
were wrong with it as a submission. It depended on other teams opting in, so its
best version was outside its own control. It reads as criticism of the floor no
matter how carefully the tone is managed. And it involved training nothing, which
is the wrong shape for a day whose entire scarce resource is robots and whose
stated tracks are dexterous manipulation, teleoperation and whole-body control.

The rig was not wasted. `tools/rig/stats.py` — the SPRT, the bootstrap, the
coverage tests, committed 4e17a4f — is exactly what this project needs to get
twenty-six policies through one arm before 20:00. It stops being the product and
becomes the reason the schedule closes.

## 3. The actual question

"Policies don't transfer across robots" is a qualitative claim that nobody has to
pay for. Make it a currency instead:

> Hold the task fixed. Train a policy on source body A. For a given transfer
> strategy, how many demonstrations on target body B are needed before the policy
> clears a fixed success threshold on B?

Call that number **demos-to-threshold**. It is the quantity a deployment engineer
actually budgets against — the question in the field is never "does it transfer",
it is "what will this next arm cost me". Reporting it as a number with an interval
is a different artefact from reporting that transfer is hard.

The three strategies being priced are the three things people actually do:

| Treatment | Action space | The belief it encodes |
|---|---|---|
| **JOINT** | raw joint position commands | none — the null, embodiment-specific by construction |
| **EEF** | end-effector delta pose + scalar gripper aperture, retargeted by IK | the cheap abstraction: bodies differ in kinematics, not in task |
| **SHARED** | one trunk, per-embodiment action head, learned embodiment token | the CrossFormer/Octo recipe: transfer is representational |

Every model is trained **from scratch**. No pretrained VLA. This is not asceticism —
it is the only way the measurement means anything, because any open pretraining
corpus already contains both body classes, and fine-tuning from it confounds
"transfers" with "was memorised".

## 4. Why this event and not a lab

This experiment needs two robot morphologies with matched teleoperation, on one
table, with the same objects, on the same day, under the same lighting. A
university lab has one arm. Simulation cannot answer it, because the embodiment gap
*is* the part that lives in real contact dynamics, cable slop and gripper
compliance. A room with an OpenArm, a Wuji Hand 2, ALOHA leader arms and an M1 is a
cross-embodiment natural experiment that is expensive to assemble and is being
given away for a Saturday.

## 5. The build

**Task family.** One contact-rich task, resettable in under ten seconds: grasp an
object from a randomised placement and seat it on a target marker. Forty seeded
placements, identical list issued to every embodiment, so the difficulty
distribution is held fixed across bodies by construction rather than by hope.

**Data, 09:30–12:00.** Roughly 120 teleoperated demonstrations per embodiment.
ALOHA leader arm drives the OpenArm; the Wuji Glove drives the Wuji Hand 2. At
~25 s per demonstration including reset that is under an hour per body with two
people on the bay.

**Training, 11:00–17:00, overlapping collection.** Small ACT-class policies,
5–20 M parameters, on a rented GPU box. The grid:

- 3 treatments × 4 target-data budgets (k = 0, 5, 15, 40) × 2 directions
  (OpenArm → Hand, Hand → OpenArm) = **24 runs**
- plus 2 within-embodiment oracles trained on the full 120 = **26 total**

Each run is 10–25 minutes on one accelerator; four in parallel closes the grid in
about three hours. The oracles train first, because they are the sanity gate in §7.

**Evaluation, 15:00–19:30 — the real bottleneck.** Twenty-six policies at twenty
trials each is four hours of arm time, which does not exist. Two mechanisms make it
fit. The SPRT stops each policy as soon as the evidence decides its declared
threshold, which is typically eight to fourteen trials rather than twenty. And the
grid is allocated adaptively: run the k=0 and k=40 corners for all three treatments
first (twelve cells), then spend the remaining arm time only on the interiors whose
corners came out separated. Scoring is off an external camera in an AprilTag task
frame with a VLM judge whose agreement rate against twenty hand-labelled trials is
printed alongside every number it produces.

**Deliverable, 20:00.** One plot. Demos-to-threshold on the y-axis, one bar per
transfer strategy, bootstrap intervals, one panel per direction. Plus the list of
claims the data did not support.

## 6. What the answers would mean

The result is interesting in all three directions, which is the test of whether the
experiment was worth running.

- **EEF ≈ JOINT.** The cheap abstraction buys nothing, and a large amount of
  current practice is retargeting into a shared action space and calling the
  embodiment problem addressed.
- **SHARED flat to k=0.** The gap is representational and small models close it,
  which is an argument that the world-model route is buying something real rather
  than buying scale — and that is the position already on record in the brain
  (`inbox/2026-09-19-c9b062a2`).
- **Nothing clears the threshold below k=40.** A new body costs roughly a fresh
  dataset, transfer strategy be damned, and the honest downstream conclusion is
  that data collection infrastructure beats representation research.

## 7. What can go wrong, in order of how much it would hurt

1. **Floor effects.** If the within-embodiment oracle does not clear the threshold
   at 120 demonstrations, the entire matrix is noise around zero and there is no
   result. This is the dominant risk and it is retired in pre-work: the task is
   chosen because an oracle clears it at 120 demos on an SO-101 before 24 October.
   If it does not, the task changes, not the threshold.
2. **Code written on the day.** There is no version of this that survives authoring
   the training grid, the IK retargeting, the trial runner and the stats during the
   twelve hours. All of it is built and validated in the five weeks before, against
   an SO-101 and in sim. The day is calibration, data and GPU time.
3. **Glove teleop quality.** Demonstration quality through the Wuji Glove is
   unknown and multi-finger teleop is harder to do well than a leader arm. Fallback
   second embodiment, in preference order: the M1's arm, a second OpenArm with a
   different end-effector, the ALOHA arms themselves.
4. **Compute.** The grid needs a GPU for six hours. Ask the organisers for in-kind
   credits — they named compute as the in-kind tier that moves the needle — and
   carry a rented fallback so the answer to "did you get credits" never gates the
   project.

## 8. Hardware ask

Larger than the September plan's, and deliberately so: the comparison *is* the
project, so a single arm cannot produce it.

- **OpenArm** — full day. Source and target body, depending on direction.
- **Wuji Hand 2 + Wuji Glove** — full day. The second morphology and its
  teleoperation path. Not a two-hour baseline this time.
- **ALOHA leader arms** — full day, to teleoperate the OpenArm.
- Two cameras, a tripod, an AprilTag board, a corner of a table. Tactile kit if
  spare.
- **Not** the G1 and **not** the Go2. If an M1 bay frees up in the evening it
  becomes a third row, opportunistically, and nothing depends on it.

## 9. What it is worth even if it goes badly

A priced embodiment gap for one task family across two real morphologies, measured
by an instrument that states its own error rate, in one day. Even the null result —
every strategy costs the same fresh dataset — is a sharper statement than the
literature's, because the literature reports transfer success rates and not
transfer prices.
