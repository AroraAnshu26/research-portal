# The certificate desk at the Astra hackathon

**Event:** GPT-6 Astra Robotics Hardware Hackathon — Saturday Robotics × Robotics
Center of Silicon Valley. Saturday 24 October 2026, 09:00–21:00, 90 Welsh St, SF.
Approval-based registration. Hosts: Junfan Zhu, Aurora Feng, Jerry Huang.
Hardware on the floor: M1 mobile manipulator, Unitree G1, Unitree Go2, OpenArm,
Wuji Hand 2, Wuji Glove, ALOHA leader arms, tactile kits, cameras, spares.

**Written:** 2026-09-18. Status: plan, not yet submitted.

---

## 1. The one-sentence version

Every other team on that floor will spend twelve hours producing a demo that runs
once in front of judges; this project is the instrument that says whether any of
them worked, and it hands each team a signed number at 20:00.

## 2. Why this event, specifically

Two things are true about this hackathon that are not true about most of them.

**It is a one-room, one-day, many-policies, same-hardware natural experiment.**
Fifteen-odd teams, a shared pool of arms and hands, and a hard demo deadline. That
configuration is expensive to buy and it is being given away. The corpus that falls
out of it — paired rollouts across many policies on identical embodiments, measured
by one independent instrument — is the asset the metrology thesis needs and cannot
otherwise obtain without a year of site visits.

**It runs the six-week kill test in twelve hours.** `reports/four-theses-analysis-2026-09-16.md`
§ Experiment A asks for 100–200 real recorded failures, attributed to perception /
policy / embodiment / latency / capability-ceiling, in order to answer the only
question that matters: *for what fraction does the attribution change what the
operator would do next?* A floor of frontier models grasping real objects for ten
hours will generate that many failures before dinner, and unlike public datasets the
operators are standing right there and can be asked directly what they would do next.
The kill test's budget was ~$1k of annotation and 3–6 weeks. This is one Saturday and
a registration form.

Be genuinely willing to lose it. The prior being tested is the Gemini Robotics
lightbulb asymmetry (92% out, 36% in): if the modal attribution is "capability
ceiling, collect more data," thesis 2 dies cheaply and in public.

## 3. What gets built

Design rule, and it is the whole project: **nothing in the scoring path reads the
robot's own logs.** Software-only evaluation infers performance from the system under
test — the fox counting the hens. Independence is what separates a dashboard from a
certificate.

**(a) The fixture.** AprilTag board defining the task frame, external camera on a
tripod looking at the cell, tactile kit or wrist F/T for contact-event ground truth.
Off-the-shelf, no hardware R&D, assembled the week before.

**(b) The trial runner.** A task definition carries a seeded list of 40 randomised
object placements. The runner issues each placement to a human resetter on a screen,
auto-segments trials from the external camera, and labels success with a VLM judge
over the external clip. The judge is itself measured: 20 trials are hand-labelled and
the judge's agreement rate is printed on every receipt it produces. An evaluator that
will not state its own error rate is not an evaluator.

**(c) The statistics — the actual product.** The operator declares a claim ("this
beats 60%"). A Wald sequential probability ratio test stops as soon as the evidence
decides, rather than burning a fixed n. The receipt reports the point estimate, the
interval, the n that was actually needed, and — the part nobody else will print — the
claims the data did *not* support. Across teams, the leaderboard is bootstrapped and
the report states how often the ranking flips under resampling.

**(d) The deliverable.** A one-page receipt per team, generated at their bay. Floor
leaderboard with error bars at 20:00.

**(e) Stretch, and the reason to come.** Every failed trial gets attributed across
the five categories from the external camera plus the tactile trace, and the team is
asked on the spot what they will change next. That pairing — attribution against
stated next action — is the kill test.

## 4. Scope discipline

The floor-wide version depends on other teams opting in, which depends on the hosts
and on goodwill at lunch. So it is not on the critical path.

- **Critical path:** one arm, one task family, one policy, 40 trials, one receipt.
  Depends on nobody. Demoable alone at 20:00.
- **Upside:** every additional team that opts in. Each is a strictly additive row.
- **Pre-work:** the harness is built and validated before 24 October against an
  SO-101 or in sim. On the day the work is calibration and data, not authoring code.
  This is the single most credible claim available to an applicant and it should be
  true before it is written down.

## 5. The 13:00 unlock

Lunch carries lightning talks. A five-minute talk — *"Your demo is n=1"* — is the
mechanism that converts the floor from spectators into opt-ins by 14:00, which is
what makes the corpus happen. Content already in hand:

- TRI: 1,800 real and 47,000 simulated rollouts across 29 tasks, intervals still
  20–30 points wide at n=50.
- Physical Intelligence RECAP: the claimed 5pp effect needs ~1,570 trials per arm to
  resolve.
- The ISO 9283 precedent: a mature metrology-services sector measures whether the arm
  returns to the same point in space to ±0.05 mm, and none of it measures whether the
  learned policy accomplishes the task. Instrument, service model, certificate and
  standard all exist one layer below the one that now matters.

## 6. Hardware ask — deliberately small

Capacity is gated by the number of robots in the room, and the approval queue will be
full of teams asking for the humanoid. Asking for less is a positioning decision.

- **OpenArm**, full day — the arm under test.
- **Wuji Hand 2 + Wuji Glove**, ~2 hours in the afternoon — a human teleoperator
  baseline. "What fraction of the teleop gap did the policy close" is a more honest
  number than raw success rate, and it needs the glove for an hour.
- Tactile kit, two cameras, a tripod, and a corner of a table.
- **Not** requesting the G1 or the M1.

## 7. Positioning with the hosts

Judges at 20:00 rank fifteen demos each seen exactly once. Offering them the
instrument for the decision they are already making is a judge-adjacent seat that
costs nothing, where the Prize Track tier costs $5,000. The hosts are also raising
sponsorship and promising technical write-ups in the recap; a measured leaderboard
with intervals is the most citable artefact the event could ship, and it makes their
recap the one that gets linked.

Offer it as event infrastructure, not as a favour asked.

## 8. What can go wrong

- **Nobody opts in.** Mitigated by § 4: the solo version is a complete project.
- **The VLM judge is unreliable on contact-rich tasks.** This is why its agreement
  rate is measured and printed rather than assumed. A judge with a stated 80%
  agreement is usable; one with an unstated rate is not.
- **Reset labour dominates.** 40 trials at ~45 s of reset each is half an hour of
  somebody's day per policy. Keep the task family small and the fixture rigid.
- **It reads as criticism of other teams' work.** Tone is the entire mitigation:
  arrive with receipts, not verdicts, and measure your own system first and worst.

## 9. What it is worth even if it goes badly

A floor of failures attributed and paired with operators' stated next actions, from a
room of frontier-model teams, in one day. That either kills thesis 2 or gives it its
first proof point, and it does so in October rather than in December.
