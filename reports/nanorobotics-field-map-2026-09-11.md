# Nanobots: field map, bottleneck analysis and capital layer

**Compiled 11 September 2026.** Four parallel research tracks (medical/clinical, molecular machines and DNA nanotech, the enabling technology stack, capital and institutions) plus a lead track on progression and taxonomy. ~130 web searches and ~80 direct source fetches before the session search budget was exhausted. Every number below carries a source or is marked UNVERIFIED. Facts and observations only; no recommendations.

---

## 1. The category error, and why it has to be cleared first

Almost nothing called a "nanobot" in public discourse is one. The standard convention in the robotics literature:

| Class | Characteristic dimension |
|---|---|
| **Nanorobot** | ≤ 1 µm, or manipulates 1–1000 nm components |
| **Microrobot** | < 1 mm |
| **Millirobot** | < 1 cm |
| **Minirobot** | < 10 cm |

Measured against that scale, the commercially funded "nanorobot" companies are building **millirobots**:

| Device | Actual size | Class |
|---|---|---|
| Bionaut Labs corkscrew | 3.1 mm OD × 1.6 cm long | millirobot |
| Stanford M3bot (milli-spinner) | ~2.5 mm | millirobot |
| Robeauté neurosurgical robot | 1.8 mm | millirobot |
| ETH Zurich *Science* 2025 capsule | "sand-grain" (exact dia. UNVERIFIED) | millirobot |
| Endiatx PillBot | 13 × 30 mm | minirobot |
| Penn/Michigan autonomous robot | 200 × 300 × 50 µm | **microrobot** |
| DNA origami device | 50–100 nm | **nanorobot** |

The two ends of that table are not the same field, do not share a bottleneck, do not share a funder and are not on the same timeline. Section 7 explains why the middle of the table is the only inhabitable band, and it is a physics result, not an engineering preference.

A second, load-bearing distinction: **externally steered vs. autonomous.** Every medical device above is a passive object dragged around by a room-sized magnet. Exactly one class of device carries its own decision-making (§5.6). Conflating the two overstates the field by a decade.

---

## 2. Progression, 1959 → 2026

### Era I — the promise without the instruments (1959–1980)

- **29 Dec 1959** — Richard Feynman, *There's Plenty of Room at the Bottom*, APS annual meeting at Caltech. Proposes direct manipulation of individual atoms. **Largely ignored until the 1980s.**
- **Nov 1960** — William McLellan claims Feynman's first $1,000 prize with a tiny motor built using conventional tools. The prize was designed to be won by nanotechnology and was won by watchmaking — the first instance of a pattern that recurs throughout this history.
- **1974** — Norio Taniguchi coins "nanotechnology."
- **1977** — Purcell publishes *Life at Low Reynolds Number*, establishing the scallop theorem (§4.2). The constraint that governs every swimming microrobot built since was stated before anyone tried to build one.

### Era II — the instruments arrive, and so does the ideology (1981–1999)

- **1981** — Scanning tunnelling microscope (Binnig & Rohrer, IBM Zurich; Nobel 1986). For the first time atoms are visible and, shortly, movable.
- **Nov 1979** — Drexler reads a Physics Today article citing Feynman and begins *Molecular Engineering*.
- **1986** — Drexler, *Engines of Creation*. Foresight Institute founded the same year. The term "gray goo" is coined here — Drexler repudiated it in 2004 ("I wish I had never used the term") and published that self-replication is not required for molecular manufacturing.
- **1989–90** — Eigler & Schweizer (IBM Almaden) spell "IBM" in 35 xenon atoms on nickel. The founding demonstration of atom manipulation, and also the founding demonstration of its throughput problem.
- **1983 / 1991 / 1999** — Sauvage's catenane, Stoddart's rotaxane, Feringa's light-driven rotary motor. The three results that become the 2016 Nobel.
- **1982** — Ned Seeman, *Nucleic acid junctions and lattices*. DNA nanotechnology begins. (Seeman's account: the idea came from Escher's woodcut *Depth*, seen in a campus pub in autumn 1980.)
- **1997** — Jim Von Ehr founds Zyvex, the world's first company explicitly dedicated to building molecular assemblers, largely on his own capital.

### Era III — the bubble, the argument, and the correction (2000–2008)

- **2000–01** — US National Nanotechnology Initiative launches at ~$464M/yr. Cumulative through the FY2026 request: **~$47B**.
- **Sept 2001 – Dec 2003** — the **Drexler–Smalley debate**. Smalley's *Of Chemistry, Love, and Nanobots* raises "fat fingers" (manipulator arms are themselves made of atoms and won't fit in the reaction zone) and "sticky fingers" (you can place an atom but cannot let go of it). Drexler, Freitas, Merkle and Hall rebut via open letters; the exchange culminates in the *C&EN* cover story of 1 Dec 2003. Smalley dies in 2005.
- **2004** — Lux Research forecasts **$2.6 trillion** of global manufactured goods incorporating nanotech **by 2014** — ~15% of world output, including 23% of drugs and 21% of automobiles. The National Academies' *A Matter of Size* review states it "could not verify the basis for these estimates." The methodological defect: counting the **full product value** (an entire car) rather than the nanotech value (the anti-scratch coating). The PowerShares Lux Nanotech ETF was liquidated in 2014 — the year the $2.6T was due.
- **29 Jul 2004** — Royal Society / Royal Academy of Engineering report: self-replication too distant to regulate; focus on nanoparticle toxicology. The FDA still has **no regulatory definition** of "nanotechnology," "nanomaterial" or "nanoscale," and regulates product by product under existing frameworks.
- **2006** — Rothemund, *Folding DNA to create nanoscale shapes and patterns*, **Nature**. A 7,249-nt M13 scaffold plus >200 staples, one-pot self-assembly, ~100 nm structures at 6 nm resolution. The most-copied protocol in the field.
- **2007** — Zyvex reorganises into three entities. Over the following decade the Instruments arm passes to DCG Systems → FEI → **Thermo Fisher**; the Materials arm to **OCSiAl**. Zyvex Labs survives on DARPA and Texas state money, still pre-revenue.

### Era IV — the microrobot becomes an engineering discipline (2009–2020)

- **Feb 2009** — Zhang & Nelson, *Artificial bacterial flagella*, **Appl. Phys. Lett.** 94:064107. Self-scrolled helical nanobelts with a Cr/Ni/Au soft-magnetic head, driven by three orthogonal coil pairs. **The first microscopic artificial swimmer using helical propulsion** — the design that every subsequent magnetic microswimmer descends from.
- **2012** — Douglas, Bachelet & Church, **Science** 335:831. DNA origami barrel held shut by aptamer-encoded AND gates, opening on cell-surface protein recognition. In tissue culture.
- **2012** — Parker lab (Harvard), the "Medusoid" — a tissue-engineered jellyfish of silicone and rat cardiomyocytes, **Nature Biotechnology**.
- **Oct 2014** — Ido Bachelet announces an imminent human trial: a terminal leukaemia patient to receive DNA nanobots. **No published outcome, no registry entry, no follow-up has ever appeared.** This remains the main credibility scar on the DNA-nanorobot field.
- **2015–16** — Joseph Wang (UCSD) publishes the first in vivo micromotors (mouse stomach) and the first therapeutic ones. Martel's *Magnetococcus marinus* MC-1 bacteria deliver drug nanoliposomes into tumour hypoxic zones (**Nat. Nanotech.** 2016).
- **2016** — Nobel Prize in Chemistry to Sauvage, Stoddart and Feringa for molecular machines.
- **2016** — Wilhelm, Chan et al., **Nat. Rev. Mater.** 1:16014: across 117 studies over ten years, the **median share of an injected nanoparticle dose reaching a solid tumour is 0.7%**, and it has not moved in a decade. Still the reference figure today (§8.3).
- **2017** — Peng Yin (Wyss) reaches 10,000 unique DNA bricks and 30,000-brick, 536 MDa structures — a ~100× leap into the gigadalton regime. Lulu Qian's cargo-sorting DNA robot sorts six molecules in 24 hours.
- **Feb 2018** — Hao Yan (ASU), **Nat. Biotech.** DNA origami tube carrying thrombin, triggered by a nucleolin aptamer, occludes tumour vasculature. **3 of 8 melanoma mice show complete regression; median survival 20.5 → 45 days.** Safety shown in mice and Bama miniature pigs. **Never independently replicated; never entered a clinic in the eight years since.**
- **Jan 2020** — Xenobots: computer-designed organisms of frog skin and cardiac cells (Blackiston, Bongard, Kriegman, Levin).
- **Apr 2020** — OWICs (Cortese, Miskin, McEuen), **PNAS**: ~100 ng, 100 µm optical wireless integrated circuits, ~1 million per 4-inch wafer.

### Era V — the two forks separate (2021–2026)

**Fork A — the medical millirobot goes into large animals and then into a government program.**

| Date | Event |
|---|---|
| 13 Jan 2025 | Robeauté raises $28M Series A (Plural, Cherry, Kindred co-lead) |
| 2 May 2025 | Bionaut publishes ovine brain-navigation safety: sheep, n=3/group, 4–5 cm traverse from occipital burr hole, 6-month histology, **no difference vs. catheter control**, no deficits |
| 4 Jun 2025 | Stanford milli-spinner thrombectomy, **Nature** — mechanically compacts clots, **>95% volume reduction** |
| 27 Jun 2025 | **Technology Roadmap of Micro/Nanorobots**, ACS Nano 19(27):24174–24334 — 103 authors, 161 pages, two years of coordination. The field's consensus document |
| Aug 2025 | Nanoflex performs the first transatlantic remote animal thrombectomy, >9,000 km, Arizona → porcine model in Bern |
| 8 Sep 2025 | Microbot Medical LIBERTY 510(k) clearance |
| **Nov 2025** | **Landers et al., "Clinically ready magnetic microrobots for targeted therapies," Science 390:710–715** — 28 authors, ETH Zurich. Gelatin capsule + iron oxide + tantalum, three navigation modes, **pigs and sheep**, >95% delivery success |
| Jan 2026 | Stereotaxis MAGiC catheter FDA approval |
| Mar 2026 | MSU "TriMag" — biodegradable microrobots trackable by magnetic particle imaging |
| Aug 2026 | ETH "NPCbots," **Nature Materials** — iPSC neural progenitors + magnetoelectric nanoparticles; mouse spinal-cord motor recovery at 4 weeks |
| **6 Aug 2026** | **ARPA-H AIR program awards up to $175.3M over 5 years**, of which Stanford $27.2M and Berkeley $19.3M for microbots |
| 11 Sep 2026 | **Still zero registered human trials of an untethered microrobot** |

**Fork B — the nanoscale end converges on biology, not on machinery.**

| Date | Event |
|---|---|
| Jul 2022 | Dietz/Simmel DNA origami rotary ratchet motor, AC-field driven, **Nature** |
| Dec 2022 | Shih lab crisscross polymerisation: **1,022 unique origami slats, >5 GDa, ~2 µm** |
| 2022 | Cornell microrobots with **~1,000 transistors** of onboard CMOS, 100–250 µm, >300,000 per 200 mm wafer |
| Oct 2024 | **2024 Nobel in Chemistry** — Baker (computational protein design), Hassabis & Jumper (structure prediction) |
| Dec 2024 | Fraser Stoddart dies, aged 82 |
| **Jan 2025** | **Leigh, Nature 637:594–600** — catalysis-driven rotary motors embedded in a polymer gel contract it to **~70% of its volume** and re-expand it. First conversion of chemical energy to macroscopic mechanical work by artificial molecular motors |
| Sep 2025 | Cherry & Qian, **Nature** 645:639 — supervised learning in a one-tube DNA neural network, 100-bit patterns |
| **10–15 Dec 2025** | **Miskin (Penn) + Blaauw/Sylvester (Michigan), Science Robotics + PNAS** — 200 × 300 × 50 µm robots that sense, think, act and compute. 55 nm CMOS, **75 nW**, months of operation, ~1¢ each |
| 3 Dec 2025 | RFdiffusion3 released — 10× faster than RFdiffusion2, scaffolds the catalytic motif in **90%** of a 41-active-site benchmark |
| **Dec 2025 – Jun 2026** | **CBN Nano Technologies publishes three mechanosynthesis papers** — positionally controlled carbon donation and silicon abstraction on Si(100), **93–97% per-operation yields** |
| Feb 2026 | Generate:Biomedicines IPOs at $2.04B (NASDAQ: GENB), $400M raised |
| Apr 2026 | Levin lab "neurobots" — frog-cell assemblages with self-wiring neurons, **Advanced Science** |
| May 2026 | Isomorphic Labs raises $2.1B Series B led by Thrive |

**The shape of the progression:** 67 years from Feynman to a magnetically steered capsule in a sheep's brain. The discipline advanced by *giving up* on the original object. Feynman and Drexler described an autonomous machine that builds matter atom by atom. What exists in 2026 is (a) a passive pill steered by an external magnet, and (b) a designed protein made by a bacterium. Neither is what was proposed, and both work.

---

## 3. What must be assembled: the seven subsystems

A functional in-body nanobot requires all seven simultaneously. The field has partial answers to six and no answer to one.

| # | Subsystem | Best demonstrated | Status |
|---|---|---|---|
| 1 | **Power** | 75 nW onboard photovoltaic (Penn/Michigan); 7.7 µJ in a 2 pL Zn-air microbattery (MIT) | Solved at 200 µm **with external light**. Unsolved on stored power |
| 2 | **Actuation / locomotion** | Rotating-field helical swimming, 7.5–600 µm/s; ETH rolling 4 mm/s, gradient pull >20 cm/s | Solved above ~1 µm. Physically impossible below (§7.1) |
| 3 | **Localisation / imaging** | Fluoroscopy with tantalum loading (ETH, pig/sheep); MPI 2.8 mm accuracy | **The binding clinical constraint.** No modality is simultaneously deep, fast, micron-resolved and dose-free |
| 4 | **Control / autonomy** | 2–3 robots independently controlled; swarms as single entities; RL at 80–90% success | Underactuation is a *theorem*, not a gap (§6.2) |
| 5 | **Fabrication at dose scale** | 300k–1M units/wafer (lithography); 10⁹–10¹² units/membrane (template); 10¹⁴/mg (DNA origami) | Cheap routes make dumb objects; smart routes don't scale |
| 6 | **Onboard sensing & compute** | 55 nm CMOS, processor + memory + sensor + comms at 200 × 300 × 50 µm | **Solved in December 2025**, at 200 µm, in air/water, under 3–7 suns of red light |
| 7 | **Materials / biocompatibility** | Gelatin + Fe₃O₄ + Ta, all FDA-approved constituents; biodegradation 15 min – 7 days | Clearance, protein corona and long-term nanoparticle accumulation unresolved |

The integration problem is that subsystems 1, 2 and 5 are coupled through a single length scale, and they pull in opposite directions.

---

## 4. Bottleneck 1 — Brownian motion. The one that does not yield.

This is the most important result in the report and it is rarely stated plainly in press coverage.

At 310 K, for a sphere of radius *r* in water (η = 10⁻³ Pa·s), rotational diffusion D_r = kT/8πηr³ and orientation decorrelation time τ = 1/2D_r. Directional persistence length L_p = v·τ.

| Diameter | τ (heading memory) | "Thermal velocity" | Péclet number at 10 µm/s | Persistence length |
|---|---|---|---|---|
| **100 nm** | **0.37 ms** | **272 µm/s** | **0.22** | **3.7 nm (4% of its body)** |
| 500 nm | 46 ms | 11 µm/s | 5.5 | 459 nm |
| **1 µm** | 0.37 s | 2.7 µm/s | 44 (at 20 µm/s) | 7.3 µm |
| 10 µm | 367 s | 0.027 µm/s | 2.2 × 10⁴ | 37 mm |

**Read the 100 nm row.** A true nanobot is randomly relocated by a full body length every 0.37 ms — an effective thermal speed of 272 µm/s, which is 30–300× faster than any propulsion ever demonstrated at that scale (typically 1–10 µm/s). Its Péclet number is 0.22, meaning transport is diffusive, not directed. It travels 3.7 nanometres before forgetting which way it is pointing.

**A true nanobot is not a vehicle. It is a particle with a slightly biased random walk. Steering it is meaningless.**

The crossover is at **0.5–1 µm** — which is exactly where evolution put motile bacteria. This is not an engineering gap. Nothing changes kT.

It has been confirmed empirically: a reinforcement-learning study of capillary navigation maps an explicit "forbidden regime" below r = 0.9 µm where "Brownian motion and the opposing capillary flow overwhelm the robots' limited propulsive force." Best performance in that study: r = 1.4 µm at 2.5 body lengths/s → 80% success.

**Who is working around it:** nobody, because it cannot be worked around. What people do instead is stay above 1 µm (every credible medical program) or abandon directed motion and use the nanoscale object as a *chemically* targeted particle (DNA origami, nanomedicine, protein design).

---

## 5. Bottleneck 2 — Power, and the correction to the standard story

The usual claim is that batteries don't scale down because there isn't enough energy to swim. **That is wrong, and the error matters.**

A 10 µm cube is 1 picolitre. At the best measured density for a device at that scale (MIT's 2 pL Zn-air microbattery, 760 Wh/L, 7.7 µJ, 2.7 nW output), you have roughly **2.7 µJ**.

Stokes drag on a 10 µm sphere at 100 µm/s = 9.4 pN. Power = 0.94 femtowatts. Energy to swim one centimetre = **94 femtojoules.**

94 fJ against 2.7 µJ is a margin of **29 million**. Propulsion through water is essentially free.

What consumes the budget is (a) digital logic and (b) actuator inefficiency. Cornell measured their surface electrochemical actuators at **efficiency ≈ 10⁻⁴**, with photovoltaic-to-actuator power transmission at ~1%. At 75 nW draw, 2.7 µJ lasts **36 seconds.**

Hence the field's actual answer: **don't carry power, harvest it from an external field.** Which creates bottleneck 3.

---

## 6. Bottleneck 3 — Steering from outside the body

### 6.1 The magnetic scaling law

Magnetic moment m = M_s·V ∝ L³.

- **Gradient pulling:** F = (m·∇)B ∝ L³; drag ∝ L; so **v ∝ L²**. Shrink 10×, lose 100× speed.
- **Rotating field (torque):** T ∝ L³; rotational drag ∝ L³ω; so **ω is size-independent** and v ∝ L. Shrink 10×, lose only 10×.

This is why every serious group abandoned gradient pulling for rotating-field helical or rolling propulsion. It is Zhang & Nelson's 2009 design, still winning.

### 6.2 The depth problem, stated as a number

A dipole source gives B ∝ 1/d³ and ∇B ∝ 1/d⁴. Relative to 5 cm depth, you retain **6.3% of the gradient at 10 cm, 0.39% at 20 cm, 0.077% at 30 cm.**

And the hardware gap is stark:

| System | Gradient |
|---|---|
| Research electromagnetic setups | 0.83 T/m typical |
| Best reported enhanced EM system | up to 9.5 T/m peak |
| Composite electro-permanent magnet | 1.9 T/m |
| **Clinical MRI** | **0.04 T/m** |

**The only magnetic hardware that exists at human scale is ~250× weaker in gradient than the benchtop rigs every paper uses.** Force to hold a 10 µm sphere against capillary flow (0.6 mm/s) is 57 pN; a clinical MRI gradient delivers 10 pN. It loses by 6×. Against arterial flow at 20 cm/s you would need 19 nN — three orders of magnitude beyond anything at this scale.

You cannot brute-force this: rapidly switched strong gradients hit peripheral nerve stimulation (dB/dt) and tissue heating (SAR) limits.

**Who is solving it:** ETH's answer is to stop fighting. Their *Science* system uses rolling along the vessel wall at 4 mm/s, gradient pulling only in the largest vessels (>20 cm/s), and in-flow steering at bifurcations, with a 35 cm coil-spacing "Navion" system. A separate 2025 result shows Fe-Ni microparticle **collectives** generating ~1.5 N — a **700× force enhancement** over individuals — but only with surface support, not in 3D suspension.

### 6.3 The underactuation theorem

From the field's own review: with N robots and one global field, "the system is defined as underactuated." Sitti's group states it harder: **"a homogeneous microrobot team is uncontrollable for any approach using a global magnetic field."** N identical robots in a uniform field all feel identical torque; the reachable configuration space collapses to rigid-body motion of the whole ensemble.

Five documented escapes: heterogeneous geometry/moment, spatial gradient fields, addressable local coil arrays, movable permanent magnets, and frequency-resonance selection. Plus Sitti's 2024 route — heterogeneous robot–lumen interaction.

**How many have actually been controlled independently? Two or three** in most demonstrations; up to 8 degrees of freedom in one system. Against a therapeutic dose requirement of 10⁹–10¹².

**Who is solving it, and how:** Li Zhang (CUHK) by giving up on individuals — swarm-as-single-entity, tracked by ultrasound Doppler (*Sci. Adv.*) and laser speckle contrast (*Sci. Robotics*), with a deep-learning controller making "millions of microrobots behave like a bee swarm" (*Nature Machine Intelligence*). He has also proposed an L0–L4 autonomy framework for microrobot swarms. Swarms conveniently fix imaging too: a bigger spot relaxes the resolution requirement.

---

## 7. Bottleneck 4 — You cannot see it

The mismatch, numerically: a clinically deployable whole-body modality has a voxel of **0.5–5 mm**. A microrobot is **10–300 µm**. The robot occupies **10⁻⁴ to 10⁻⁸ of one voxel.** You are not imaging the robot; you are imaging a perturbation.

| Modality | Resolution | Depth | Temporal |
|---|---|---|---|
| MRI | 10–200 µm (research) | >10 cm | >1 min |
| **MPI** | **1–10 mm** | hundreds of mm | ms |
| Ultrasound | 100–1000 µm | cm to 20 cm | ms |
| X-ray / fluoroscopy | 10–500 µm | unlimited | 7.5–30 fps |
| Photoacoustic | ~100 µm | **~1 cm** | real-time |
| Fluorescence | 100–1000 µm | **a few mm** | >1 min |
| OCT | 5–20 µm | **1–2 mm** | ms |

**The one physical loophole:** an iron-oxide particle distorts the MRI field over a region ~**50× the particle size**. A 3T voxel is ~500 µm; 50 × 10 µm = 500 µm. **This is why 10 µm is the practical floor for single-agent in-body localisation.** Below it, only swarms are visible. Best fast-MRI tracking to date is 300 µm particles.

**Fluoroscopy is the only modality doing real closed-loop clinical microrobot navigation** — and the dose cost is that an interventional fluoroscopic procedure can expose a patient to the equivalent of **75–3,000 chest X-rays**. Continuous real-time tracking for a full therapeutic procedure is not dose-compatible.

**Who is solving it:**
- **Magnetic particle imaging** is the most credible radiation-free answer — it images only the tracer, at >40 3D acquisitions/second, with no depth attenuation. **First in-vivo human MPI was achieved in 2025** (two subjects, subcutaneous tracer), after two decades of preclinical work. A human-head-sized system reaches 5–7 mm resolution, 150 ng Fe detection limit. First superconducting selection coils give 2.5 T/m in a 200 mm bore. The MAGiC biogenic superferromagnetic tracer reaches **80 µm resolution at 4 T/m** — 25× better than VivoTrax. Commercial systems (Magnetic Insight's Momentum, Bruker) remain **preclinical, 5–6 cm field of view**. Building clinical scale: Bruker, the Lübeck/Philips lineage (Gleich, Buzug), Würzburg (iMPI), UC Berkeley (Conolly). **The structural catch: in MPI, workspace and resolution trade directly against each other**, because scaling the bore drops the selection-field gradient.
- **Photoacoustic** (Lihong Wang, Caltech) — detects 50 µm objects at 25 mm through tissue-mimicking media, and guided micromotors in live mouse intestine. Hard wall at ~1 cm.
- **Tantalum loading** (ETH) — the pragmatic answer, and it costs payload volume.

---

## 8. Bottleneck 5 — Dose, manufacturing and the body

### 8.1 The dose-mass contradiction

At 2 g/cm³:

| Unit size | 10⁹ units | 10¹² units |
|---|---|---|
| 10 µm cube | 1 mL solid, **2 g** | 1 L solid, **2 kg** |
| 1 µm cube | 1 µL, 2 mg | 1 mL, **2 g** |
| 100 nm cube | 1 nL, 2 µg | 1 µL, 2 mg |

**10¹² ten-micron robots is one litre of injected solid.** Not a manufacturing problem — an anatomy problem. At 10 µm the dose ceiling is ~10⁸–10⁹ units on mass grounds alone. Only sub-micron units reach 10¹²–10¹⁴ — and those are the ones §4 says cannot swim.

Separately: a rigid 10 µm sphere is larger than a capillary lumen (5–10 µm). Red cells pass because they deform; rigid microrobots embolise.

### 8.2 Fabrication throughput, computed

Model helix (4 turns, R = 2.5 µm, pitch 5 µm, filament r = 0.5 µm) ≈ 51.8 µm³ ≈ 4,120 two-photon voxels.

| Method | Rate | Time for 10⁹ | Time for 10¹² |
|---|---|---|---|
| Single-beam 2PP (Nanoscribe class) | 5 × 10⁵ voxel/s | **95 days** | **261 years** |
| 2GL / resonant scanner (~20×) | 1 × 10⁷ /s | 4.8 days | 13 years |
| Metalens 120k-spot record | 1 × 10⁸ /s | 11.5 hours | 1.3 years |

At 100% duty cycle with zero yield loss. **Two-photon polymerisation is a prototyping technology.** The field's own verdict: it "remains a laboratory tool due to its high operation cost and limited fabrication rate."

The routes that *do* scale produce objects with nothing on board:

| Route | Throughput | What you get |
|---|---|---|
| Wafer lithography (Cornell/Penn) | 300k–1M/wafer, ~$0.01 each | Full CMOS robot. 10⁹ needs 1,000–3,300 wafers of a 13–15 layer post-CMOS process |
| Template electrodeposition | **10⁸–10¹¹ pores/cm²** → 10⁹–10¹² per membrane | A plain nanowire |
| GLAD (Ghosh & Fischer) | 10¹⁰–10¹¹ per 4-inch wafer | A chiral propeller, no payload logic |
| Spirulina biotemplating (Zhang) | Set by algae culture — effectively free | Whatever shape the alga is |
| **DNA origami by fermentation** | 410 mg/L ssDNA; **1 mg = 1.2 × 10¹⁴ objects**; $0.2/mg | **10¹⁶ objects for $17 of material** — and it's 50 nm, i.e. Brownian-forbidden |

Published batch sizes in papers: "roughly 100 microrobots per chip," "hundreds at once." **Five to ten orders of magnitude short of dose scale**, and the gap is structural for every technique that produces a *smart* object.

Note the one economically significant DNA result: modular origami (moDON, MPI Biochemistry, Feb 2025) gets **59,049 unique monomer configurations from one modular design at only ~2.1× the staple overhead** of a single structure — because staple cost, not scaffold cost, is what scales badly. Scaffold is $200/g and fermentable; staples are <$300/g and are explicitly "far from those required for economical commercial manufacturing" (*JACS Au*, Jun 2026).

### 8.3 The body fights back

- **The 0.7% figure stands.** Wilhelm/Chan's 2016 median (0.7% of injected nanoparticle dose reaching a solid tumour, unchanged over a decade) has been contextualised but not superseded. The mechanistic reinterpretation is worse news: Sindhwani et al. (*Nature Materials*, 2020) showed with a fixed-tissue "zombie mouse" model that **endothelial gaps are too infrequent to explain nanoparticle accumulation** — entry is mostly **active transendothelial transport**, a cellular process a robot cannot navigate by steering. Across 32 mouse tumour models, 70% were low-accumulation/active-transport-dominated.
- **Clearance:** liver is the primary sink at 1 hour. Coating shifts hepatocyte uptake from 41.1% to 50.6–57.7%. Macrophages degrade engulfed microrobots over **4–8 hours**.
- **Protein corona:** plasma proteins adsorb on injection, masking targeting ligands and triggering mononuclear-phagocyte clearance — and corona composition is macrophage-phenotype-dependent, hence patient- and disease-state-dependent.
- **Motility genuinely helps, for about 12 hours.** Active motion facilitates macrophage escape; algae-NP robots showed minimal alveolar macrophage uptake for 12 h, then a sharp rise by 48 h. This is the strongest mechanistic case for a *robot* over a passive nanoparticle, and its window is half a day.
- **Biodegradation** timescales demonstrated: Ga/Zn 15 min in gastric acid; spirulina composites 192 h; hydrogel swimmers 118 h; magnetoelectric 7 days. Unsolved: unpredictable degradation time, ion toxicity above threshold concentrations, and **long-term accumulation of magnetic nanoparticles after the robot degrades**.

**The field's structural response to all of §8 is to bypass it.** Bionaut, Robeauté, ETH and Stanford all deliver a *single* millimetre-scale device by catheter or burr hole, directly to the target. They trade away the "get anywhere in the body" premise for a tractable dose, a tractable imaging problem, and a device-not-drug regulatory story.

---

## 9. Bottleneck 6 — Onboard intelligence. Solved in December 2025, with caveats.

This is the subsystem that changed most recently, and it changed decisively.

**Cornell, *Science Robotics* 2022** — 100–250 µm robots, **~1,000 transistors** on a 15 µm ASIC layer from commercial X-FAB CMOS; surface electrochemical actuators (7 nm Pt + 2 nm Ti) at ±0.6 V; >10 µm/s; >300,000 per 200 mm wafer; ~10,000× smaller by volume than any previous robot with onboard CMOS. Limitation stated: "fixed gaits in well-controlled environments."

**Penn + Michigan, *Science Robotics* + *PNAS*, 10–15 Dec 2025** — Miskin (Penn, senior author) with Blaauw and Sylvester (Michigan):

| Spec | Value |
|---|---|
| Size | 200 × 300 × 50 µm |
| Process | **55 nm CMOS**, commercial foundry, subthreshold logic |
| Power | **<100 nW draw; 75 nW from onboard solar** (>100,000× less than a smartwatch) |
| Onboard | Processor, memory, temperature sensor (±0.3 °C), optical receiver for comms and reprogramming, electrokinetic actuator drivers |
| Locomotion | Electrokinetic, no moving parts, up to **1 body length/s** |
| Autonomy | **Closed-loop demonstrated** — robots reported temperature by modulating motion; gradient climbing; individually addressable |
| Lifetime | **Months** under LED illumination |
| Cost | **~$0.01 each** |
| Funding | NSF 2221576, Penn, **AFOSR, ARO**, Packard Foundation, Sloan Foundation, NSF NNCI, Fujitsu Semiconductors — **no venture capital** |

**Why this cannot yet go into a body.** Three independent walls:

1. **Area.** The device is ~6 × 10⁴ µm² in plan; a 10 µm robot offers 100 µm². A **600× deficit** before adding solar cells, which already occupy most of the surface.
2. **Power vs. collector area.** 75 nW from 6 × 10⁴ µm² ≈ 1.2 pW/µm². A 10 µm robot collects ~0.12 nW against a ~100 nW requirement — **1000× short**.
3. **Illumination.** The Cornell lineage needs **≥3 kW/m² of 660 nm light**, operating best at 2.5–7 kW/m². Full noon sunlight is ~1 kW/m². **These devices require three to seven suns of red light delivered to their bodies.** Tissue attenuates 660 nm by roughly an order of magnitude per 5 mm. Penn's own stated next goal is locomotion that does not depend on an external light source.

**The molecular alternative is 10¹² times slower.** DNA strand-displacement logic takes **seconds to hours per operation** (~1 hour to 50% signal unoptimised; ~2 minutes with copolymer accelerants; ~10 minutes for a NAND gate) against ~10⁹ Hz for CMOS. Gates are consumed on use, diffusion-limited, and require co-localisation in a defined volume.

---

## 10. Bottleneck 7 — Atomically precise manufacturing, and the Drexler–Smalley verdict

### What changed, Dec 2025 – Jun 2026

**CBN Nano Technologies** (Ottawa, a Canadian Bank Note subsidiary; Freitas and Merkle co-author all three papers) published:

- **arXiv:2512.24431** (30 Dec 2025, 60 authors) — inverted-mode STM. Alkynyl-terminated molecules on Si(100) act simultaneously as imaging probes revealing the tip apex structure *and* as chemical reagents, solving the field's oldest practical problem (you never know what your tip looks like). **Single hydrogen abstraction: 27/28 trials = 96.4% at zero bias. Second-hydrogen patterning: 24/24 = 100%.** Conditions: **4.4 K**, zero applied bias, sub-ångström positioning.
- **arXiv:2605.27250** (26 May 2026) — positionally controlled C₂ donation from surface-deposited molecules to pre-patterned reactive sites; single-site, multi-site patterned, and stepwise polyyne assembly. **93% success rate** for C₂ transfer; "hundreds of carbon dimers" placed.
- **arXiv:2606.13876** (11 Jun 2026) — carbon addition *and* silicon abstraction; first atom-level manipulation using radical chemistry with three-dimensional positional control.

### The verdict on the 2003 debate

**Drexler won the chemistry. Smalley won the manufacturing. Neither got what he wanted.**

- *Fat fingers* — Drexler right; Smalley effectively conceded in the 2003 *C&EN* exchange, acknowledging that enzymes and ribosomes perform exactly the precise molecular assembly he had called impossible. CBN's 2026 results close it empirically.
- *Sticky fingers* — Drexler right in principle; tool design (a tool whose bond to the transferred moiety is weaker than the bond formed at the destination) makes release a design variable. CBN's June 2026 paper is titled "Mechanosynthetic donation and abstraction."
- **Smalley's deeper objection survives and is the one that matters.** From the primary literature on hydrogen depassivation lithography: HDL is a serial write tool subject to Tennant's law, and **"even with over 7 × 10⁶ tips operating in parallel on a 300 mm wafer, HDL is many orders of magnitude too slow for consumer electronics."** A useful product needs ≥10⁸ atoms. At an optimistic 1 operation/second/tip, a 10⁸-atom object takes 3.2 years on one tip; seven million tips brings the *write time* to ~14 seconds but requires building, aligning, calibrating and independently drift-correcting seven million cryogenic STM tips. CBN's own stated limitation list includes automated drift and hysteresis correction as a prerequisite they have not met.
- **And the winning path was Smalley's own rebuttal argument.** He said "enzymes and ribosomes already do this." The technology actually building atomically precise nanomachines in 2026 is **de novo protein design** — Baker's lab, RFdiffusion3, manufactured by fermentation. Neither man predicted that.

### Where protein design actually is

RFdiffusion3 (3 Dec 2025, open source): atom-level diffusion, 10× faster than RFdiffusion2, **scaffolds the catalytic motif in 90% of a 41-active-site benchmark**. Wet-lab honesty: 190 cysteine-hydrolase designs tested → **35 multi-turnover catalysts** (~18% hit rate), best k_cat/K_M = 3,557 M⁻¹s⁻¹; 5 DNA-binder designs tested → 1 hit at EC₅₀ = 5.89 µM.

Designed protein *machines* specifically: Baker lab's 2022 axle-rotor assemblies (*Science* 376:383) are **rotary devices, not motors** — no directional bias, no energy input, no net work. The lab's own framing is that designing the rotational energy landscape is the prerequisite to designing motors, with sophisticated nanomachines anticipated "over the next five to ten years."

The five-part case for proteins as the practical substrate: sequence space is astronomically under-explored (~1.6 × 10²⁶⁰ possible 200-mers vs ~10¹² natural proteins); designed proteins are *more* stable than natural ones, which are only marginally stable by evolutionary design; nature already proved the substrate at 1–100 nm (ATP synthase, ribosome, kinesin, flagellar motor); **manufacturing is solved — you put a gene in a cell**; and the design tooling compounds. The honest counter: proteins work only in a narrow aqueous, pH-7, 20–40 °C window, are proteolytically and immunologically vulnerable, and cannot deliver the stiffness or vacuum/high-temperature operation diamondoid was meant to provide.

### What molecular machines can actually do, as of 2026

Reproducible at scale: Feringa-type light-driven rotation (gram-scale synthesis; 3 MHz rotation demonstrated 2008); Leigh's rotaxane peptide synthesizer (**10¹⁸ machines in parallel, milligram product, MS-verified, 2013**), including β-peptides with non-proteinogenic residues the ribosome refuses.

Demonstrated once: **Leigh, *Nature* 637:594–600 (Jan 2025)** — catalysis-driven rotary motors in a cross-linked gel twist polymer chains and **contract the gel to ~70% of its volume**, reversibly, with the opposite-enantiomer fuel. First conversion of chemical energy to macroscopic mechanical work by artificial molecular motors, and the most direct answer yet to the field's standing internal critique that most "molecular machines" are switches that do no net work per cycle.

Also 2024–26: endergonic Diels–Alder driven uphill by a ratchet (Mar 2024); dual contra-rotating motors (Mar 2025); chiral catalysis-driven motors (*Nature Chemistry*, Jan 2026); NIR-driven motors via upconversion nanoparticles (2025 — matters because UV is not biocompatible); and autonomous robotic synthesis of rotaxanes via the "Chemputer" (2025) — machines making machines at the level of the synthesis.

**There is no molecular-machine company of consequence.**

---

## 11. Who is building it now

### Academic groups, ranked by what they have actually demonstrated in vivo

| Group | Lead | Largest animal model | Signature result |
|---|---|---|---|
| **ETH Zurich MSRL** | Bradley Nelson | **Pig, sheep** | *Science* 390:710 (2025); NPCbots *Nature Materials* (Aug 2026) |
| **Stanford** | Renee Zhao | (thrombectomy in vitro/animal) | Milli-spinner, *Nature* (Jun 2025); ARPA-H $27.2M |
| **CUHK** | Li Zhang | UNVERIFIED | Swarm imaging + control; aneurysm embolisation platform, >95% filling at 20 cm/s flow |
| **UCSD** | Joseph Wang | **Rabbit** | First in vivo micromotors (2015); sublingual microrobotic pills (2025) |
| **Caltech** | Wei Gao / Lihong Wang | Mouse | PACT-guided micromotors in live intestine (*Sci. Robotics* 2019) |
| **Penn + Michigan** | Miskin / Blaauw / Sylvester | — (bench) | The only autonomous microrobots that exist |
| **Koç University** | Metin Sitti | Rodent | **Left MPI-IS in 2023; now President of Koç** — a material change in the field's leadership map |
| **DGIST** | Hongsoo Choi | Rodent | Stem-cell scaffold microrobots; **>100 units/min fabrication, ~10,000× faster than 2PP** |
| **Toronto** | Eric Diller | Ex vivo / rodent | Tumbling microrobots; acoustic retroreflector capsule tracking |
| **SIAT / CAS Shenzhen** | Tiantian Xu | — | Flexible intermediary patch for in vivo magnetic localisation (*Nature Sensors* 2026) |
| **Michigan State** | Jinxing Li | Rodent | TriMag — steering + MPI tracking + hyperthermia in one biodegradable device (Mar 2026) |
| **Tufts** | Michael Levin | — | Xenobots (2020), self-replication (2021), anthrobots from adult human cells (2023), neurobots (2026) |
| **Manchester** | David Leigh | — | The molecular-machine programme (§10) |
| **UW IPD** | David Baker | — | Protein design; 2024 Nobel |
| **CBN Nano (industry)** | Freitas / Merkle | — | Mechanosynthesis, 93–97% yields at 4.4 K |

### Companies

| Company | Founded | Founders | Raised | Latest round | Stage, Sep 2026 |
|---|---|---|---|---|---|
| **Bionaut Labs** (LA) | 2016 | Shpigelmacher, Maizels | $63.2M confirmed; ">$70M" claimed | Series B-II ext., **Feb 2024** (Mayo Clinic, Gates Ventures, Khosla, Upfront, OurCrowd) | Preclinical. HUD (Dandy-Walker) + Orphan Drug (glioma). **No trial started.** Publicly silent since Nov 2022 |
| **Robeauté** (Paris) | 2017 | Bertrand Duplat, Joana Cartocci | ~$31M | **$28M Series A, 13 Jan 2025** (Plural, Cherry, Kindred; Brainlab strategic) | Preclinical, sheep. 40+ staff. No clearance. **Not fully untethered** — instruments are cable-actuated |
| **Nanoflex Robotics** (Zurich) | Nov 2021 | **Bradley Nelson**, Chautems, Curran | ~$30M+ | **€12.5M EIC Accelerator, 24 Jun 2026** | Preclinical. ISO 13485. **A remotely steered catheter, not an untethered robot.** FIH slipped from Q3 2023 |
| **Theranautilus** (Bengaluru, IISc) | 2020 | Peddi, Dasgupta, Ambarish Ghosh | **$1.2M** | Seed, Nov 2024 (pi Ventures) | Preclinical. Dental nanorobots. Human trial promised 2025 — **no evidence it started** |
| **Endiatx** (Hayward) | 2019 | Torrey Smith, Alex Luebke | ~$21M | **$12M Series A, Jan 2026** | Investigational. NZ trials. **No FDA clearance.** CEO change Feb 2026 |
| **Stereotaxis** (NYSE-A: STXS) | 1990 | — | Public | Acquired **Robocath, Jul 2026** | **Commercial.** FY2025 rev $32.4M (+20%). Mkt cap $134M, −48.8% y/y |
| **Microbot Medical** (MBOT) | — | Harel Gadot | Public | up to $92.2M via option exercises | **Commercial.** LIBERTY 510(k) Sep 2025. TTM revenue **$346K**. **A catheter robot, not a microrobot** |
| **Rani Therapeutics** (RANI) | 2012 | Mir Imran | Public | ~$60.3M (2025) | **Phase 1, Dec 2025** (RT-114, obesity). Chugai deal up to $1.085B. The most clinically advanced "robotic pill" |
| **MagnebotiX** (Zurich) | 2014 | ETH MSRL spinout | Undisclosed | — | Research tools only. **6 employees** |
| **Nanobots Therapeutics** (Barcelona) | Jan 2023 | Samuel Sánchez / IBEC | UNVERIFIED | — | Urease nanomotors. Mouse bladder tumour **−90% volume after one ¹³¹I dose** (*Nat. Nanotech.* 2024) |
| **Fauna Systems** (NY) | — | Levin, Bongard, Durenard, Castleman | **$8.3M US federal** | — | "Xenobots-as-a-service." PFAS and environmental sensing first |

**Name collisions to exclude:** Xenter (sensored guidewires, $58.25M Series B Jun 2026), Nanovery (DNA in-vitro diagnostics), Ancora Heart (ventricular restoration), Bionano Genomics (optical genome mapping), **Atomic Machines** ($144M raised, $375M post-money Feb 2025 — a MEMS direct-write fabrication company, *not* atomically precise manufacturing despite the name).

### Regulatory reality

**Zero human trials of an untethered microrobot exist.** Direct ClinicalTrials.gov API queries for `microrobot`, `nanorobot`, `microrobotic`, `Bionaut`, `Robeaute`, `Nanoflex`, `Theranautilus` return no relevant studies. Confirmed by the November 2025 translational-readiness review: *"So far, no human data was shown with milli/microrobots."*

The pathway is unresolved. Consensus in the literature is Class III device via first-in-human at mTRL6, but the FDA has **no guidance document, workshop or CDRH programme specific to micro/nanorobots**. Everything falls back to 21 CFR Part 3 primary-mode-of-action assignment. **The clearest single artefact of that ambiguity: Bionaut holds a Humanitarian Use *Device* designation for BNL-201 and an Orphan *Drug* designation for BNL-101 — same platform, two regulatory identities.** ETH's mitigation is to build only from already-approved materials.

What *has* cleared in adjacent territory: AnX Robotica NaviCam (De Novo 2020, expanded 2024) with a new AMA CPT code for magnetically controlled capsule endoscopy; Vibrant Gastro's vibrating capsule (De Novo 2022, prescribable Sept 2025); Microbot LIBERTY (Sep 2025); Stereotaxis GenesisX (Nov 2025) and MAGiC (Jan 2026).

**The nearest deployed relative, and the cautionary tale it carries:** Stereotaxis, founded 1990, >140,000 patients treated lifetime with robotic magnetic navigation, did **$32.4M of revenue in FY2025 and is still loss-making** — on the easy version of the problem, a tethered catheter with a magnet on the tip. Thirty-six years.

---

## 12. Who is paying

### Venture capital: the category barely exists

**All-time disclosed private capital into companies whose core product is an untethered micro- or nanoscale robot: ≈ $175M.**

Bionaut ~$70M + Robeauté $28M + Nanoflex ~$45M + Endiatx $21M + Theranautilus $1.2M + DNA Nanobots $3.5M (Dec 2025) + Amplifold €5M (Dec 2025).

**Annual run-rate: $30–40M globally.** (2025 ≈ $37M; 2026 YTD ≈ $26M.)

| Comparison pool | Amount |
|---|---|
| Explicit micro/nanorobotics, **all time** | **$175M** |
| AI protein design, **2024 → Sep 2026 only** | **≈ $5.8B** |
| Robotics venture funding, **2026 YTD alone** | **$18.8B** (vs $15B FY2025, $14.1B at the 2021 peak) |
| Apptronik Series A extension, **Feb 2026, one round** | **$520M** |

**Ratios:** micro/nanorobotics annual VC is **0.2–0.3% of robotics VC**. Its entire historical capitalisation is **~3%** of what protein design absorbed in 30 months. **One Apptronik extension is three times the all-time capitalisation of the field.**

And the "$9.10B nanorobots market" in every market report is **not robots** — it is atomic-force microscope and nanomanipulator revenue for JEOL, Thermo Fisher, Bruker, Hitachi High-Tech, ZEISS, Oxford Instruments, EV Group and Park Systems. Nanomanipulators alone are 31.12% of it. Vendor forecasts for the same nominal category span **$4.52B (2032) to $31.4B (2034)** — a >6× spread, on the same accounting method the National Academies could not verify in 2006.

### Government: the composition just shifted hard toward defence

**US National Nanotechnology Initiative, $M** (NNI Supplement to the President's 2026 Budget, April 2026, Table 1):

| Agency | FY2024 actual | FY2025 enacted | FY2026 proposed | Δ |
|---|---|---|---|---|
| NIH | 764.9 | 761.7 | 459.0 | **−39.7%** |
| **DOW** (Dept of War) | 374.2 | 360.7 | **394.2** | **+9.3%** |
| DOE | 469.9 | 448.2 | 368.0 | −17.9% |
| **NSF** | 453.0 | 403.9 | **131.1** | **−67.5%** |
| NIST | 52.8 | 44.6 | 38.3 | −14.1% |
| NASA | 80.1 | 57.0 | 27.1 | −52.5% |
| NIOSH | 10.5 | 8.0 | **0.0** | **−100%** |
| **TOTAL** | **2,248.3** | **2,122.4** | **1,449.1** | **−31.7%** |

Cumulative NNI since FY2001: **~$47B**. Foundational research 1,059.6 → 716.5; education 26.6 → 9.1; responsible development 53.9 → 15.5. **The Department of War is the only agency growing, and its nanotech line has more than doubled in ten years — under $150M in 2016 to $394M in the FY2026 request.**

**ARPA-H is now the largest dedicated microrobot funder in the United States**, and it got there in a single month. The **Autonomous Interventions and Robotics (AIR)** program, awards announced 6 Aug 2026, **up to $175.3M over 5 years**, milestone-contingent, PM Dr Ileana Hancu. Rationale stated: only **12% of 335,000 eligible US stroke patients** receive thrombectomy annually. Milestones: autonomy demo at 24 months, fully autonomous intervention at 60 months.

- **TA1 (endovascular robotics):** Siemens Healthineers, Philips North America, Magnendo, UC San Diego, Kitware
- **TA2 (microbots):** **Stanford, up to $27.2M** (Renee Zhao; Kennedy, Khatib, Heit, Karniadakis; partners Philips, Medtronic, Terumo Neuro) and **UC Berkeley, up to $19.3M**

**That one program out-funds two full years of global venture activity in the sector.**

DARPA's **SHRIMP** ($32M, 2018, sub-1g/sub-1cm³ robots) has no identified successor; DARPA's nanotech money now flows inside the DOW line rather than as a named microrobotics program.

**Europe has no nanorobotics flagship.** The €1B FET Flagships were Graphene, Human Brain Project and Quantum. The channel that actually delivers is the **EIC Accelerator** (€634M budget in 2025; grant ≤€2.5M plus EIC Fund equity capped at €10M from 2025). Nanoflex's €12.5M in June 2026 — one of 38 awardees from ~1,000 applicants — is the flagship deal.

**China's position is now formally asserted by the state.** From the *White Paper on China Nanotechnology Industry* (CAS NCNST, ChinaNANO, Aug 2025): **464,000 of 1.078M granted nanotech patents worldwide 2000–2025 = 43%**, exceeding the US, Japan and South Korea combined. **CAS alone holds 23,400 patents — the top assignee globally.** 34,500+ nanotech enterprises, 739 listed companies. On publications: China was **46% of >256,000 nanotech articles in 2024**; in micro/nanomotors for cancer treatment 2006–2025, China published **380 of 609 papers = 62.4%**, with CAS the leading institution. **India is #2 by nanotech publication count, having passed the US in 2022; the US is #3 and declining.** The white paper's own $1.5T-by-2025 market projection uses the same full-product-value method as Lux 2004 and should be read as promotional.

### Corporates entered in 2026 — through a government program, not M&A

Siemens Healthineers and Philips North America are **ARPA-H AIR TA1 awardees**; Philips, Medtronic and Terumo Neuro are industrial partners on Stanford's M3bot. That is the first time major imaging OEMs have been funded performers in an autonomous endovascular robotics program.

**No big-pharma licence of a microrobot delivery platform exists as of September 2026** — against $250.2B across 516 pharma licensing deals in 2025, the most active year on record.

Meanwhile, **atomic-precision manufacturing at industrial scale already exists and is not called nanorobotics**: IBM's sub-1nm 3D-sequential nanostack transistors (three 5 nm sheets ≈15 atoms thick), nanosheet/GAA architecture in production at TSMC, Samsung and Intel, Samsung targeting 1.4 nm mass production in 2027. None of that capex appears in any nanorobotics figure.

### The exit record

| Outcome | Detail |
|---|---|
| **Nanoscribe** | BICO bought it Jun 2021 for **€50M**; sold it to LAB14 for **€26M**, closing Q4 2024. A ~48% nominal haircut on the market-leading two-photon polymerisation business |
| **Zyvex** | 1997–2014 dismembered. Instruments → DCG → FEI → **Thermo Fisher**; Materials → **OCSiAl**; Labs survives, DARPA-funded, pre-revenue. **29 years, a founder's personal fortune, and the only commercial output was a materials business selling hockey sticks and aerospace coatings** |
| **Molecular Assemblies** | Shut down 2024, IP to Maravai |
| **Catalog Technologies** | $54.3M raised, no round since 2021, CEO out Oct 2025, assets to Biomemory Mar 2026 |
| **Nanosys** | → Shoei Chemical, Sep 2023. >70M devices shipped on its QD tech — a technical success that did not clear an independent-company bar |
| **Nanophase (NANX, IPO 1997)** | Survived by **abandoning nanomaterials**. Rebranded Solésence, cosmetics. FY2024 revenue a record $52.3M |
| **EvolutionaryScale** | $142M seed 2024 → acquired by Chan Zuckerberg Biohub, 2025 |
| **Generate:Biomedicines** | 2023 Series C was a down round; recovered to a **$2.04B IPO** (GENB, Feb 2026) — stock fell on debut |

---

## 13. The three numbers that bound the field

1. **Rotational Brownian diffusion sets a floor at ~1 µm.** A 100 nm object has a directional persistence length of 3.7 nm — 4% of its own body. Pe = 0.22.
2. **Imaging sets a floor at ~10 µm** for single-agent in-body localisation, via the 50× magnetic blooming rule against a 500 µm MRI voxel. Below that, only swarms are locatable.
3. **Dose mass sets a ceiling at ~10⁸–10⁹ units** for 10 µm robots. 10¹² units = one litre of solid.

Floors 1 and 2 push up; ceiling 3 pushes down. **The viable window is roughly 1–100 µm at 10⁶–10⁹ units, and it excludes both literal nanobots and dose-scale systemic therapy.** Every funded clinical program has independently converged into that window, and onto locally delivered or lumen-confined rather than systemic administration.

---

## 14. Open questions, stated as things that would resolve them

- **Does any untethered microrobot enter a registered human trial before end-2027?** Three companies promised 2026 (Robeauté, Nanoflex, Theranautilus); none has been reported dosed. Nelson's own estimate for the ETH platform is "something in humans in three to five years," i.e. 2028–2030. Nanoflex's first-in-human has already slipped from Q3 2023.
- **Does a clinically sized MPI scanner reach sub-millimetre resolution at a useful bore?** First in-vivo human MPI landed in 2025 at 5–7 mm. Resolution and workspace trade against each other by construction. This is the gate on everything in §7.
- **Does CBN publish a throughput figure?** Operations per hour is the number that would settle whether the mechanosynthesis roadmap is credible. It has never appeared in any accessible source.
- **Does Bionaut re-emerge?** Last formal company communication is the November 2022 Series B. A February 2024 report that trials would start at Mayo "later this year" has never been updated or retracted. An alleged $42.1M Series C dated 10 Oct 2025 appears in one aggregator and is contradicted by Tracxn and CB Insights.
- **Does the Hao Yan thrombin nanorobot ever get replicated?** Eight years, *Nature Biotechnology*, complete regression in 3 of 8 melanoma mice, and no independent replication and no clinic.
- **Does a designed protein motor do net work?** Baker's 2022 rotors are devices, not motors. The lab's own horizon is five to ten years.
- **Does venture capital enter, or does this stay a government-funded field?** As of September 2026, the two most important results in the field — Penn/Michigan's autonomous microrobots and Stanford's M3bot — were funded by NSF, AFOSR, ARO, Packard, Sloan and ARPA-H. Neither has venture backing.

---

## 15. Unverified register

Carried forward explicitly so nothing here is mistaken for confirmed.

1. Bionaut Labs total raised: $63.2M / $63.63M / ">$70M" / $83M all appear in sources. An alleged **$42.1M Series C (10 Oct 2025)** is single-sourced and contradicted.
2. Exact diameter of the ETH *Science* microrobot; animal *n* for the pig and sheep cohorts; field/gradient values used; drug-release temperature. (Paywall.)
3. Medtronic PillCam standalone revenue (~$160–190M/yr is derived from market size × share, not disclosed).
4. Stereotaxis installed-system count worldwide.
5. Nanoflex cumulative funding (~$30M+ is a cross-currency sum of separately reported rounds).
6. CUHK aneurysm-embolisation animal species and *n*.
7. A claimed "2023 six-patient glioma rice-grain device first-in-human" — almost certainly a non-motile intratumoural drug-screening implant, not a navigating microrobot. Out of category.
8. Units-per-dose for swarm microrobots — no published quantification found anywhere.
9. Theranautilus CDSCO regulatory status and whether any 2025 human trial occurred.
10. Nanobots Therapeutics (Barcelona) funding and whether a trial opened in 2026.
11. CBN Nano Technologies' operations-per-hour throughput.
12. ACS Nano roadmap per-year bibliometric series (publisher 403).
13. Nanoscribe cost per part — not published by the vendor, and no peer-reviewed figure found.
14. Aggregate Chinese state funding for micro/nanorobotics specifically (institution and grant numbers found; no RMB total).
15. Korea KIMIRo and DGIST-ETH centre budgets; India DST Nano Mission current budget.

---

*Method: four parallel research agents plus a lead track, 11 September 2026. Primary sources preferred throughout; arXiv and PMC mirrors used where publisher sites returned 403. The session's 200-call web-search budget was exhausted; remaining gaps were closed by direct fetch where possible and are listed in §15 where not.*
