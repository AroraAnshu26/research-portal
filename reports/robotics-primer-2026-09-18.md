# A Working Primer on Modern Robotics

*Written 2026-09-18 for Anshu. Read time roughly 35 minutes at a normal pace, longer if you stop to look things up, which you should.*

This document exists to make you fluent. Not fluent in the sense of being able to repeat that "VLAs are vision-language-action models," which anyone can recite after ten seconds on a company blog, but fluent in the sense that when a PhD student in IRIS says "we chunk at fifty and run the action expert asynchronously off a frozen SigLIP trunk," you know exactly which four design decisions were just named, which of them are contested, and what the honest question back is. The field has an unusually large gap between its vocabulary and its substance, partly because it borrows terms from three separate traditions: classical control engineering, computer vision, and large-model machine learning. Most confusion in robotics conversations is not conceptual difficulty, it is three communities using the same word for different things.

The structure below follows the loop a robot actually runs: it senses, it decides, it acts, and somebody had to give it data to learn from and a simulator to practise in. Read it in order the first time. Afterwards it works as a reference, and the glossary at the end is deliberately dense so you can scan it before a meeting.

## Contents

- [1. The mental model everything hangs off](#1-the-mental-model-everything-hangs-off)
- [2. Perception: how a robot knows what is in front of it](#2-perception-how-a-robot-knows-what-is-in-front-of-it)
  - [2.1 The classical stack: state estimation and geometry](#21-the-classical-stack-state-estimation-and-geometry)
  - [2.2 The learned stack: representations instead of geometry](#22-the-learned-stack-representations-instead-of-geometry)
  - [2.3 Senses other than vision: touch, force, and proprioception](#23-senses-other-than-vision-touch-force-and-proprioception)
- [3. Action: what a policy actually outputs, and what happens to it](#3-action-what-a-policy-actually-outputs-and-what-happens-to-it)
  - [3.1 The control hierarchy and its clock rates](#31-the-control-hierarchy-and-its-clock-rates)
  - [3.2 Action spaces, and why the choice is load-bearing](#32-action-spaces-and-why-the-choice-is-load-bearing)
  - [3.3 Action chunking and asynchronous execution](#33-action-chunking-and-asynchronous-execution)
- [4. The policy: from behaviour cloning to VLAs](#4-the-policy-from-behaviour-cloning-to-vlas)
  - [4.1 Behaviour cloning and its one fatal flaw](#41-behaviour-cloning-and-its-one-fatal-flaw)
  - [4.2 The multimodality problem, and why diffusion won](#42-the-multimodality-problem-and-why-diffusion-won)
  - [4.3 VLM, then VLA: what is actually bolted onto what](#43-vlm-then-vla-what-is-actually-bolted-onto-what)
  - [4.4 System 1 and System 2, hierarchy, and the current frontier](#44-system-1-and-system-2-hierarchy-and-the-current-frontier)
  - [4.5 Where reinforcement learning still lives](#45-where-reinforcement-learning-still-lives)
- [5. World models: the most abused term in the field](#5-world-models-the-most-abused-term-in-the-field)
- [6. Data: the actual bottleneck](#6-data-the-actual-bottleneck)
  - [6.1 The seven ways to collect a robot trajectory](#61-the-seven-ways-to-collect-a-robot-trajectory)
  - [6.2 The datasets you should be able to name](#62-the-datasets-you-should-be-able-to-name)
  - [6.3 Why the field turned to egocentric human video](#63-why-the-field-turned-to-egocentric-human-video)
  - [6.4 How egocentric data is actually annotated](#64-how-egocentric-data-is-actually-annotated)
  - [6.5 Annotation of robot data proper](#65-annotation-of-robot-data-proper)
- [7. Simulation and the infrastructure layer](#7-simulation-and-the-infrastructure-layer)
  - [7.1 Physics engines, and what they disagree about](#71-physics-engines-and-what-they-disagree-about)
  - [7.2 The NVIDIA naming maze, untangled](#72-the-nvidia-naming-maze-untangled)
  - [7.3 Sim-to-real: randomisation, system identification, real-to-sim](#73-sim-to-real-randomisation-system-identification-real-to-sim)
  - [7.4 The software and hardware plumbing: ROS 2, LeRobot, Jetson](#74-the-software-and-hardware-plumbing-ros-2-lerobot-jetson)
- [8. Evaluation, which is where your own thesis lives](#8-evaluation-which-is-where-your-own-thesis-lives)
- [9. Glossary, dense and scannable](#9-glossary-dense-and-scannable)
- [10. How to sound like you belong in the room](#10-how-to-sound-like-you-belong-in-the-room)
- [Closing: what you now know, what to study next, what I recommend](#closing-what-you-now-know-what-to-study-next-what-i-recommend)

---

## 1. The mental model everything hangs off

**What is a robot, reduced to its smallest honest description?**

A robot is a loop that runs forever: read sensors, compute an action, send the action to motors, repeat. Everything in this document is an elaboration of one of those four steps. The loop runs at multiple speeds simultaneously, which is the single structural fact newcomers miss most often. A motor current controller updates at one to ten kilohertz. A joint controller updates at perhaps one kilohertz. A learned policy producing end-effector motions updates somewhere between five and fifty hertz. A language-level planner deciding "now pick up the mug" updates maybe once a second or once a minute. These are not competing designs, they are layers stacked inside the same machine, and a claim like "our model runs at 200 Hz" means nothing until you know which layer it is talking about.

```text
     +-------------------------------------------------------+
     |  Task / language layer      ~0.2-2 Hz                  |
     |  "put the dishes away"  ->  "pick up the blue mug"     |
     +----------------------------+--------------------------+
                                  |  subtask, or latent goal
                                  v
     +-------------------------------------------------------+
     |  Policy layer               ~5-50 Hz                   |
     |  images + language + robot state -> chunk of actions   |
     +----------------------------+--------------------------+
                                  |  desired pose / joint targets
                                  v
     +-------------------------------------------------------+
     |  Controller layer           ~200-1000 Hz               |
     |  inverse kinematics, impedance, gravity compensation   |
     +----------------------------+--------------------------+
                                  |  joint torques / currents
                                  v
     +-------------------------------------------------------+
     |  Motor drive layer          ~1-20 kHz                  |
     +-------------------------------------------------------+
```

**Why does the field say "policy" instead of "program"?**

Because the mapping from observation to action is learned from data rather than written by hand, and the word carries over from reinforcement learning, where a policy is formally a function from state to action, written pi(a | s). When a robotics person says "the policy," they mean the learned neural network that decides what to do, as distinct from the controller that executes it and the planner that instructs it. When a company says it sells "the robot brain," it means the policy plus the perception feeding it, and usually not the low-level controller, which stays with the arm manufacturer. That split is exactly the unbundling you already identified as creating a referee market: the policy vendor, the arm OEM, and the integrator are three parties, and the policy is the part that changes over the air.

**What changed between old robotics and new robotics?**

Old robotics solved manipulation by making the world predictable: fixture the part, calibrate the cell, teach the waypoints, and the robot repeats a trajectory to a tenth of a millimetre forever. This works superbly and still runs most of manufacturing. It fails the moment the object's position, shape, or deformability varies, because there is no perception in the loop, only a script. New robotics accepts variation and learns a mapping from raw pixels to motion, which means it can pick up a mug it has never seen at an angle nobody scripted, and also means nobody can tell you in advance which mug it will drop. The entire commercial and regulatory difficulty of the field is contained in that trade: you bought generality and you paid in predictability.

---

## 2. Perception: how a robot knows what is in front of it

**Why is perception a separate problem at all, if policies take pixels directly?**

Because "end to end from pixels" is a research framing, not an industrial reality, and even in research the pixels are almost always passed through a pretrained vision encoder rather than learned from scratch. A modern manipulation system in production usually still has explicit geometric perception somewhere: a calibration routine relating the camera frame to the robot base frame, a pose estimator for the workpiece, a collision model of the scene. The learned policy sits on top of that scaffolding, or replaces part of it while the rest quietly remains. Knowing both stacks is what lets you tell whether a demo is doing something new or is a learned wrapper around a classical solution.

### 2.1 The classical stack: state estimation and geometry

**What does classical perception compute, precisely?**

It computes state: numbers describing where things are. Specifically the robot's own configuration, called proprioception and read from joint encoders, and the pose of relevant objects and of the robot in the world, where a pose is a position and an orientation together, six numbers, formally an element of the group SE(3). Orientation gets represented as a rotation matrix, a quaternion, or Euler angles, and the choice matters because Euler angles have singularities, quaternions have a sign ambiguity, and rotation matrices carry nine numbers constrained to six degrees of freedom. When a paper says it "predicts 6-DoF pose," it is predicting three translations and three rotations.

**What are the standard tools, and when is each used?**

SLAM, simultaneous localisation and mapping, builds a map of an unknown environment while tracking the sensor's own pose inside it, and is the backbone of every mobile robot and every AMR in a warehouse. Visual odometry is the lighter cousin that tracks motion without maintaining a global map. ICP, iterative closest point, aligns two point clouds and is the workhorse for fitting a CAD model to a depth scan. Kalman filtering and its nonlinear variants, the extended and unscented Kalman filters, and particle filters, fuse noisy measurements from multiple sensors over time into one estimate with an uncertainty attached; this is where the phrase "the covariance blew up" comes from. Factor graphs, and libraries such as GTSAM and Ceres, have largely replaced hand-rolled filters for SLAM-scale estimation because they optimise over a whole trajectory rather than one step at a time.

**Which sensors produce what?**

An RGB camera gives colour and no depth. A stereo pair gives depth by triangulation and fails on textureless surfaces. Structured light and time-of-flight depth cameras, of which the Intel RealSense and Microsoft Azure Kinect families are the ones you will hear named, project or time light to get depth directly, and both struggle with shiny and transparent objects, which is why bin-picking demos are full of matte cardboard. LiDAR gives long-range accurate depth as a sparse point cloud and dominates mobile robotics and autonomous vehicles. An IMU, inertial measurement unit, gives acceleration and angular velocity at high rate with drift, which is why it is always fused with something else. Wrist-mounted cameras, meaning a camera bolted next to the gripper, matter enormously for manipulation because they make the observation nearly invariant to where the arm is in the room, and nearly every strong manipulation result of the last three years uses at least one.

**What is the calibration vocabulary?**

Intrinsics are the camera's internal parameters: focal length, principal point, lens distortion. Extrinsics are the rigid transform between two frames, for instance camera to robot base. Hand-eye calibration is the specific procedure that finds the transform between a camera and the robot that either holds it or watches it, and it is the most common source of silent failure in a real cell, because a two-degree hand-eye error produces a grasp that misses by centimetres at the far end of the workspace. A tf tree, in ROS vocabulary, is the running graph of all these transforms.

### 2.2 The learned stack: representations instead of geometry

**What does a learned perception module give you that geometry does not?**

Semantics and generality. Geometry tells you there is a surface at 42 centimetres. It does not tell you the surface is a sponge, that the sponge is wet, or that "the blue one" refers to it. Learned vision gives features that already encode object identity, material, affordance, and relation to language, without anyone hand-modelling the object. The price is that you get no guarantee, no calibrated uncertainty by default, and no clean failure mode.

**Which specific models get named in conversation?**

CLIP ([Radford et al., 2021](https://arxiv.org/abs/2103.00020)) trained image and text encoders into one shared embedding space, which is why you can ask a system for "the striped mug" without ever having trained a striped-mug detector. DINOv2 ([Oquab et al., 2023](https://arxiv.org/abs/2304.07193)) is a self-supervised vision backbone whose features are unusually good at dense correspondence, meaning finding the same physical point across two images, which matters for manipulation. SAM, Segment Anything ([Kirillov et al., 2023](https://arxiv.org/abs/2304.02643)), segments any object given a point or box prompt and has become the default way to get object masks without task-specific training. SigLIP is a CLIP variant with a sigmoid loss that appears as the vision trunk inside several VLAs, notably the PaliGemma lineage that Physical Intelligence's pi0 builds on. R3M ([Nair et al., 2022](https://arxiv.org/abs/2203.12601)) and VC-1 ([Majumdar et al., 2023](https://arxiv.org/abs/2303.18240)) are visual representations pretrained on human video specifically so robot policies can freeze and reuse them, and they are the concrete ancestors of the egocentric-data argument in section 6.

**What are the 3D representations, and why did they suddenly matter?**

A voxel grid discretises space into cubes and is simple but memory-hungry. A point cloud is an unordered set of 3D points and is what depth sensors natively produce. A signed distance field stores, at every point, the distance to the nearest surface, which makes collision checking and gradient-based planning easy. NeRF, neural radiance fields ([Mildenhall et al., 2020](https://arxiv.org/abs/2003.08934)), represents a scene as a neural network mapping position and viewing direction to colour and density, so you can render the scene from new viewpoints; it was a research explosion and it is slow. 3D Gaussian splatting ([Kerbl et al., 2023](https://arxiv.org/abs/2308.04079)) represents a scene as millions of little anisotropic blobs and renders in real time, which is why it displaced NeRF for practical reconstruction and why it now underpins much real-to-sim work: you scan a real cell, splat it, and you have a photorealistic simulator background in an afternoon. FoundationPose ([Wen et al., 2023](https://arxiv.org/abs/2312.08344)) is the current default for estimating the 6-DoF pose of a novel object given a model or a few reference views, and it is the kind of component that sits under a "learned" system without being learned end to end.

**What is the actual open question in robot perception?**

Not accuracy. The open question is what representation of the world is the right input to an action. Pixels are too raw and throw away 3D structure; object poses are too processed and throw away everything the model did not decide to name; and the honest current answer is that the field mostly feeds a pretrained 2D encoder's features into a transformer and lets the policy sort it out, while a minority argues that explicit 3D structure or explicit object-centric representations will prove necessary for contact-rich work. That disagreement is live, it is the subject of a large fraction of CoRL papers, and you should treat anyone who states it as settled with suspicion.

### 2.3 Senses other than vision: touch, force, and proprioception

**Why does touch keep coming up if vision is so good?**

Because at the moment of contact, vision is occluded by the robot's own hand, and because the quantities that determine success in insertion, sliding, and deformable manipulation, namely normal force, friction, slip, and compliance, are not visible at all. A connector insertion with fifty-micrometre clearance cannot be solved by looking at it; it is solved by feeling a force spike and correcting. This is precisely the sub-millimetre insertion problem you researched on 2026-09-12, and it is the clearest case where the visual scaling story does not carry.

**What tactile hardware exists?**

Vision-based tactile sensors dominate research: GelSight and its descendants press a soft gel against the object and photograph the gel's deformation with an internal camera, turning touch into an image problem, which is convenient because the whole vision toolchain then applies. DIGIT is Meta's small cheap version of that idea. Capacitive and resistive skin arrays give coarse contact maps over large areas. A six-axis force-torque sensor at the wrist gives three forces and three torques at high rate, is standard industrial hardware, and is what most impedance control actually uses. Joint torque sensing, as on the Franka Emika and Kuka iiwa arms, gives a coarse sense of contact over the whole arm and is why those arms are the research default for contact work.

**What is proprioception in a learned policy?**

The robot's own joint angles, velocities, and gripper state, fed to the policy alongside images. It sounds trivial and it introduces one of the classic bugs in behaviour cloning: if the policy can see its own current state and the demonstrations were smooth, the easiest way to predict the next action is to copy the last one, producing a policy that continues whatever it was doing and ignores the task. This is called causal confusion, or the copycat problem, and it is one reason some systems deliberately withhold proprioception or add noise to it.

---

## 3. Action: what a policy actually outputs, and what happens to it

### 3.1 The control hierarchy and its clock rates

**What does a controller do that a policy does not?**

A controller closes a fast loop around a physical error signal with provable properties. Give a joint controller a target angle and it will drive the motor current so the actual angle converges to the target, compensating gravity, friction, and inertia, a thousand times a second, with stability you can analyse mathematically. A learned policy cannot do this and should not try: it runs too slowly, it has no stability guarantee, and the behaviour is not needed at that timescale. The division of labour is that the policy decides where to go and the controller decides how to get there without oscillating or tearing the gearbox apart.

**What are the named controller types?**

PID, proportional-integral-derivative, is the foundational feedback controller and still runs most joints in the world. Inverse kinematics converts a desired end-effector pose into joint angles, and is ambiguous for a seven-joint arm because there are infinitely many solutions, which is what "null space" refers to. Impedance control makes the arm behave like a programmable spring and damper, so pushing on it produces proportional yielding rather than a rigid fight, and it is the standard answer for contact tasks; admittance control is its dual, sensing force and commanding motion, used when the arm itself is stiff. Operational space control formulates the whole problem in end-effector coordinates and is Khatib's contribution at Stanford, worth knowing because you will meet his students. MPC, model predictive control, optimises a short trajectory into the future at every timestep using a model of the dynamics, executes only the first step, and repeats; it is the bridge between control and planning and it is everywhere in legged locomotion and autonomous driving. Whole-body control coordinates all joints of a humanoid subject to balance constraints, and the constraint vocabulary there is the zero moment point and the centre of pressure, which describe when a legged robot is about to fall over.

**Where do motion planners fit?**

A motion planner finds a collision-free path from A to B, using sampling-based algorithms, of which RRT and PRM and their asymptotically optimal versions RRT* and BIT* are the names to know, or using trajectory optimisation, where CHOMP, TrajOpt, and the direct-collocation family are the names. Planners are still standard for free-space motion in industrial systems, and learned policies are mostly competing for the contact-rich end phase, not the reach. A system that "learns manipulation" but calls MoveIt for the approach is not cheating, it is normal engineering, but you should know which part was learned.

### 3.2 Action spaces, and why the choice is load-bearing

**What are the options, concretely?**

A policy can output joint positions, the target angle of each joint; joint velocities; joint torques; an end-effector pose, either absolute in the base frame or relative to the current pose, called a delta; or a higher-level parameterised primitive such as "grasp at this pose." The gripper is usually a separate scalar, either continuous width or a binary open-close.

**Why does the choice matter so much?**

Because it determines what the policy has to learn and what transfers between robots. Absolute joint positions are precise and utterly robot-specific: a policy trained on a Franka's joint angles is meaningless on a UR5. End-effector deltas are more transferable, since a five-centimetre move forward means the same thing on both arms, which is why cross-embodiment datasets such as Open X-Embodiment normalise towards that representation. Torque control is the most physically expressive, the hardest to learn, and the least safe to get wrong. There is also a subtle statistical point: absolute actions and delta actions create completely different learning problems from the same demonstrations, because delta actions are nearly zero-mean and heavily autocorrelated, which is exactly the setting where the copycat problem bites.

**What is the relative-versus-absolute debate in one line?**

Relative actions generalise across positions in the workspace but accumulate drift and make long-horizon precision hard; absolute actions are precise and brittle to any shift in camera or base placement. Most current systems use relative end-effector deltas with periodic absolute grounding, and if someone tells you the question is settled they have only worked on one robot.

### 3.3 Action chunking and asynchronous execution

**What is action chunking, and why was it invented?**

Instead of predicting one action for the next timestep, the policy predicts a sequence of the next k actions, typically between eight and a hundred, and executes them open loop before predicting again. This was introduced with ACT in the ALOHA paper ([Zhao et al., 2023](https://arxiv.org/abs/2304.13705)) and adopted almost universally within a year. It solves three problems at once. It reduces compounding error, because the policy commits to a coherent multi-step plan instead of drifting one noisy step at a time. It hides inference latency, because a large model taking 200 milliseconds to run can still drive a 50 Hz arm if each inference produces a second's worth of motion. And it captures the temporal structure of a demonstration, where a human's motion is a smooth stroke rather than a series of independent decisions.

**What is the cost of chunking, and why should you care specifically?**

During the chunk the robot is open loop: it is not reacting to anything. If the object moves at millisecond 50 of a 1000-millisecond chunk, the robot will finish the wrong motion. Systems mitigate this with temporal ensembling, where overlapping chunks are averaged so the executed action is a weighted blend of several predictions, and with early replanning triggered by some surprise signal. Chunking is also why evaluation is statistically awkward: the unit of decision is not the timestep, so the effective number of independent decisions in a rollout is far smaller than the number of control cycles, which bears directly on how many trials you need to certify a policy.

**What does asynchronous inference mean?**

Running the slow policy network on one thread while a fast loop consumes the previously produced chunk, so the arm never stalls waiting for the model. Real-time chunking, the refinement Physical Intelligence published, blends the newly arrived chunk into the currently executing one so there is no discontinuity at the seam. When someone says "we run the VLM at 7 Hz and the action expert at 50 Hz," this is the architecture being described.

---

## 4. The policy: from behaviour cloning to VLAs

### 4.1 Behaviour cloning and its one fatal flaw

**What is behaviour cloning?**

Supervised learning on demonstrations. Collect pairs of observation and the action a human took in that observation, then train a network to predict the action from the observation. It is the simplest possible approach, it is what almost every modern robot policy actually is under the branding, and it works far better than theory said it would.

**What is the flaw?**

Compounding distribution shift, the problem DAgger was written to address ([Ross et al., 2011](https://arxiv.org/abs/1011.0686)). The policy is trained only on states a competent human visited. The moment it makes a small error it is in a state slightly off the demonstration manifold, where it has no training signal, so it makes a larger error, and the error grows superlinearly with horizon. Every fix in the field is, at bottom, a way of getting coverage of off-distribution states: adding noise to demonstrations so the human's corrections become training data, asking the human to intervene during rollouts, adding reinforcement learning on top, or simply collecting so much data that the off-distribution states are in it somewhere.

### 4.2 The multimodality problem, and why diffusion won

**What is the multimodality problem?**

Given the same observation, a human might reasonably go left around the obstacle or right around it. A network trained with mean squared error to predict the action will learn the average of left and right, which is straight into the obstacle. This is not a subtle failure, it is the dominant failure of naive behaviour cloning, and the history of policy architectures from 2021 to 2024 is a history of ways to represent a multimodal action distribution rather than its mean.

**What were the approaches, in order?**

Discretising the action space into bins and doing classification, which is what RT-1 ([Brohan et al., 2022](https://arxiv.org/abs/2212.06817)) did with 256 bins per dimension. Mixture density networks, predicting a mixture of Gaussians. Energy-based models, which score actions rather than emitting them. Variational autoencoders with a latent style variable, which is the CVAE inside ACT. And diffusion, which won.

**Why did diffusion policy become the default?**

Diffusion Policy ([Chi et al., 2023](https://arxiv.org/abs/2303.04137)) applies the denoising diffusion machinery from image generation to action sequences: start from noise, iteratively refine into a trajectory conditioned on the observation. It naturally represents multimodal distributions, it handles high-dimensional action chunks gracefully, and it trains stably, which the energy-based approaches did not. Its cost is inference time, since denoising takes multiple network passes, which is why flow matching, a closely related method that learns a straighter path from noise to data and needs fewer steps, is now preferred in latency-sensitive systems and is what pi0 uses. If you remember one architecture fact from this section: modern policies generate action chunks the way image models generate images, by iterative denoising, and the reason is multimodality, not capacity.

### 4.3 VLM, then VLA: what is actually bolted onto what

**What is a VLM?**

A vision-language model: a large language model with a vision encoder attached, trained so images can be placed into the token stream alongside text. Architecturally it is a vision transformer producing patch embeddings, a projection layer mapping those embeddings into the language model's token space, and the language model itself. GPT-4o, Gemini, Qwen-VL, PaliGemma, and LLaVA are all examples. The important property for robotics is not that it can describe pictures; it is that it has absorbed an enormous amount of world knowledge from internet text and images, including that mugs have handles, that knives are dangerous, and that "tidy up" implies putting things in containers. No robot dataset can teach that, because no robot dataset is large enough.

**What is a VLA, precisely?**

A vision-language-action model: a VLM adapted to emit robot actions, then fine-tuned on robot demonstration data. That is the whole idea. The two things worth knowing are how actions are represented and what is kept frozen.

There are two main ways to emit actions. The first is action tokenisation: discretise each action dimension and reuse some of the language model's vocabulary tokens to mean action bins, so producing an action is literally producing text tokens. RT-2 ([Brohan et al., 2023](https://arxiv.org/abs/2307.15818)) did this, OpenVLA ([Kim et al., 2024](https://arxiv.org/abs/2406.09246)) did this and open-sourced it, and the approach is elegant because nothing about the architecture changes. Its weakness is that naive per-dimension binning is a poor code for smooth high-frequency trajectories, which is why Physical Intelligence published FAST, a tokenizer that applies a discrete cosine transform to the action chunk before quantising, compressing smooth motion into far fewer tokens. The second way is an action expert: attach a separate smaller head, typically a flow-matching or diffusion decoder, which reads the VLM's internal features and outputs continuous action chunks. pi0 ([Black et al., 2024](https://arxiv.org/abs/2410.24164)) is the canonical example, built on PaliGemma with a roughly 300-million-parameter action expert. Continuous experts give smoother, faster, higher-frequency control; token approaches keep the language interface intact and are easier to train.

```text
        image(s)            language instruction        robot state
           |                        |                        |
           v                        v                        |
   +---------------+        +---------------+                |
   | vision encoder|        |  tokenizer    |                |
   | (SigLIP/ViT)  |        +-------+-------+                |
   +-------+-------+                |                        |
           |  patch tokens          | text tokens            |
           +-----------+------------+                        |
                       v                                     |
            +------------------------+                       |
            |  transformer backbone  | <---------------------+
            |  (the pretrained LLM)  |    state tokens
            +-----------+------------+
                        |  hidden features
            +-----------+-----------+
            |                       |
            v                       v
   discrete action tokens     action expert (flow / diffusion)
   "bin 42, bin 17, ..."      continuous chunk of k x d actions
            |                       |
            +-----------+-----------+
                        v
              controller, at 200-1000 Hz
```

**What does "cross-embodiment" mean, and why is it in every abstract?**

Training one model on data from many different robots, with different arms, grippers, camera placements, and control rates, in the hope that the shared structure of manipulation transfers. Open X-Embodiment ([Collaboration et al., 2023](https://arxiv.org/abs/2310.08864)) pooled data from 22 robot types across 34 labs into one dataset precisely to test this, and the RT-X models trained on it did show positive transfer, meaning a model trained on many robots outperformed the same model trained on one robot's data alone. This is the empirical result the whole foundation-policy industry rests on, and it is worth being precise about its size: it is a real effect demonstrated at modest scale, not the settled scaling law that marketing implies.

### 4.4 System 1 and System 2, hierarchy, and the current frontier

**What is the System 1 / System 2 framing?**

Borrowed from Kahneman, and used to describe a two-speed architecture: a slow deliberative model, typically a VLM, that reasons about the task in language and emits a subgoal, and a fast reactive model that turns that subgoal into motion at control rate. Figure's Helix describes itself this way explicitly, NVIDIA's GR00T N1 ([NVIDIA, 2025](https://arxiv.org/abs/2503.14734)) uses the same two-system framing with a vision-language module and a diffusion transformer action module, and Physical Intelligence's pi0.5 predicts a language subtask before predicting actions, which is the same idea expressed inside one model. Everyone converged here for a reason that is pure arithmetic: a seven-billion-parameter model cannot run at 50 Hz on an onboard GPU, and a small model cannot hold world knowledge, so you run the big one slowly and the small one quickly.

**What is "chain of thought" in a robotics context?**

Emitting intermediate reasoning before emitting actions: a subtask name, a predicted object bounding box, a waypoint, or a described plan. Empirically it improves long-horizon performance, and it also makes a policy's behaviour partially auditable, since you can read what it thought it was doing. Embodied chain of thought is the specific term.

**What should you be sceptical about here?**

Whether the language layer is doing work or is decoration. A system that emits "pick up the red block" and then executes a policy that would have picked up the red block anyway, because it was the only block, has demonstrated nothing. The test is whether the language layer changes behaviour under instruction variation and under novel compositions, and a surprising number of demos do not report that.

### 4.5 Where reinforcement learning still lives

**If everything is behaviour cloning now, is RL dead in robotics?**

No, but it has been pushed to niches where it clearly dominates. Legged locomotion is trained almost entirely with RL in simulation, because the reward is easy to specify, the dynamics simulate well, and you can run hundreds of thousands of parallel environments on a GPU; every quadruped and humanoid walking video you have seen in the last four years is a sim-trained RL policy. In-hand dexterous manipulation with high-DoF hands is similar, following the lineage of OpenAI's Dactyl ([OpenAI, 2018](https://arxiv.org/abs/1808.00177)). And RL is returning at the top of the stack as the way to improve a pretrained policy from its own deployment experience, which is what Physical Intelligence's RECAP and similar programmes are about: collect autonomous rollouts, label outcomes, train a value function or critic, and use it to filter or improve the policy without a human demonstrating every correction.

**What are the terms you need for RL conversations?**

On-policy versus off-policy, meaning whether learning uses data from the current policy or from stored past data; PPO, the on-policy workhorse used for sim locomotion; SAC, the off-policy workhorse used for real-robot RL because it is sample-efficient; offline RL, learning purely from a fixed dataset with no interaction, where the central difficulty is that the model overestimates the value of actions it has never seen, addressed by conservative methods such as CQL and IQL; reward shaping, and its failure mode reward hacking; and sample efficiency, which for real robots is the only currency that matters, since a real arm produces perhaps a thousand trials a day and a simulator produces a billion.

---

## 5. World models: the most abused term in the field

**What does the term actually mean?**

A world model is any learned model that predicts what happens next. Formally, a function from the current state and an action to the next state, possibly in a compressed latent space rather than in pixels. That is all the term commits to. Everything else, including whether it is generative, whether it is visual, and whether it is used for planning, varies by speaker, and this is why the term produces more confusion than any other in the field.

**What are the genuinely distinct things people mean?**

There are four, and keeping them separate is most of the value of this section.

The first is a latent dynamics model used for planning or for training a policy inside imagination. The Dreamer line ([Hafner et al., 2023](https://arxiv.org/abs/2301.04104)) is canonical: encode observations into a compact latent state, learn how that latent evolves under actions, then train the policy entirely on imagined rollouts in latent space. The point is sample efficiency; the model is not meant to be looked at.

The second is a generative video model conditioned on actions, which does produce pixels, and which people describe as a "neural simulator." Genie ([Bruce et al., 2024](https://arxiv.org/abs/2402.15391)) learned controllable video environments from unlabelled internet video, and NVIDIA's Cosmos is the commercial offering positioned as a world foundation model for generating synthetic robot experience. The point here is data: if you can generate plausible futures, you can generate training data or evaluate a policy without hardware.

The third is a JEPA, a joint embedding predictive architecture, which is LeCun's specific proposal and a training philosophy as much as an architecture. The claim is that predicting raw pixels wastes capacity on irrelevant detail, since predicting the exact texture of every leaf is both impossible and useless, so you should instead predict the embedding of the future observation produced by a target encoder, and prevent representational collapse through architectural asymmetry rather than through reconstruction. I-JEPA ([Assran et al., 2023](https://arxiv.org/abs/2301.08243)) did this for images and the V-JEPA line extended it to video and then to action-conditioned prediction for robot planning. The distinction to hold onto, and the one your own prior session already recorded: a JEPA can serve as the predictive core of a world model, but JEPA names an architecture and training objective, while "world model" names a role in a system. They are not alternatives to each other.

The fourth is the loosest usage, where "world model" means nothing more than "the model has some internal understanding of physics," which is a claim about interpretation rather than about architecture, and which should be met with a request for the prediction task and the held-out error.

```text
  WORLD MODEL, four things people mean by the same phrase

  (a) latent dynamics       z_t, a_t -> z_t+1        Dreamer
      purpose: plan or train in imagination; never rendered

  (b) generative video      frames, a_t -> frames    Genie, Cosmos
      purpose: synthesise experience; looks real, physics unverified

  (c) JEPA                  predict the EMBEDDING of the future, not pixels
      purpose: a representation that ignores unpredictable detail

  (d) rhetorical            "it understands the world"
      purpose: fundraising
```

**What are world models good for right now, and where do they break?**

They are demonstrably useful for sample efficiency in closed domains, for generating visually varied training data, and increasingly for policy evaluation, which is the use that touches your thesis directly. They break on exactly the things that matter for manipulation: contact and long-horizon consistency. A video model has no notion of conserved momentum, no persistent object identity when something leaves the frame, and no correct response to a collision it has not seen; error compounds over a rollout, and the failure is not noisy but confidently wrong, producing a smooth plausible video of a physically impossible event. For a policy trained inside that model, the consequence is a policy optimised against a fiction. This is why the sim-to-real correlation question, specifically whether performance measured in a learned or reconstructed simulator predicts performance on hardware, is load-bearing rather than a detail. SIMPLER ([Li et al., 2024](https://arxiv.org/abs/2405.05941)) is the paper that made this measurable for real-to-sim evaluation, reporting a Pearson correlation of 0.924 on visual-matching evaluation of Google Robot policies against 0.308 for the validation-loss proxy most teams actually use, which is the cleanest single number in the field for saying "your current proxy is nearly worthless, and a good twin is not."

---

## 6. Data: the actual bottleneck

**Why is data the bottleneck rather than model architecture?**

Because the architecture question is roughly solved and borrowed from language modelling, while the data question has no internet to scrape. Language models were trained on trillions of tokens that already existed. There is no equivalent corpus of robot actions; every trajectory has to be manufactured, at a cost measured in human minutes, on hardware that costs tens of thousands of dollars and breaks. Open X-Embodiment, the largest pooled academic effort, contains roughly a million trajectories, which is a rounding error next to any language corpus and was assembled from 34 institutions. Everything strange about robotics research economics follows from this single fact, including the turn to human video described below.

### 6.1 The seven ways to collect a robot trajectory

**Kinesthetic teaching.** A human physically grabs the arm and moves it through the task while the robot records joint angles. Cheap, requires a gravity-compensated arm, produces unnatural trajectories because the human's hand is in the scene and the motion is slow, and it captures gripper timing poorly. Still common for single-task industrial teaching.

**Direct teleoperation.** A human drives the robot remotely and the robot's own sensor stream plus the commanded actions are recorded. This is the gold standard because the data is exactly on-embodiment: the observations are what the robot will see at test time and the actions are in the robot's own action space, so there is no transfer gap at all. It is also the most expensive. The interface varies: a VR controller, a 3D mouse, a game controller, a haptic device such as a Force Dimension or Phantom Omni, or a leader-follower rig.

**Leader-follower puppeteering.** The most important collection innovation of the last three years. Build a cheap, low-torque kinematic replica of the robot arm, let the human move the replica, and have the real arm mirror it joint for joint. Because leader and follower have identical kinematics, the mapping is trivial and the human gets intuitive control with some force feedback. ALOHA ([Zhao et al., 2023](https://arxiv.org/abs/2304.13705)) is the canonical bimanual version, and its cost, roughly twenty thousand dollars for the original and far less for later clones, is why it spread through every academic lab. GELLO is the same concept as a low-cost 3D-printed leader arm for standard industrial robots. Mobile ALOHA ([Fu et al., 2024](https://arxiv.org/abs/2401.02117)) put it on a wheeled base to reach whole-house tasks.

**Handheld grippers, meaning data collected with no robot at all.** UMI, the Universal Manipulation Interface ([Chi et al., 2024](https://arxiv.org/abs/2402.10329)), is a handheld gripper with a fisheye camera and mirrors, which a human carries around a kitchen doing tasks. Camera pose comes from visual SLAM, gripper width is read mechanically, and the result is a trajectory in end-effector space with wrist-camera observations that closely match what the robot will see, because it is literally the same camera on the same gripper. This is the bridge between human data and robot data, and the design insight is that matching the observation and action interface matters more than matching the body.

**Exoskeletons and glove capture.** A wearable frame records human arm or hand joint angles directly at high fidelity, which is the main route for dexterous multi-finger hands, where retargeting from video is hopeless. Several humanoid companies use full-body motion capture suits with hand gloves for the same reason.

**Simulation.** Generate trajectories with a planner, a scripted expert, or RL inside a physics engine. Effectively free per trajectory and limited entirely by whether the physics and appearance match reality. MimicGen ([Mandlekar et al., 2023](https://arxiv.org/abs/2310.17596)) is the important technique here: take a handful of human demonstrations, decompose each into object-centric segments, and replay those segments onto thousands of new object poses to synthesise a large dataset from a small one. This is the "multiply" value proposition in your own synthetic-data landscape.

**Autonomous and play data.** Let the robot act, either under a partially trained policy or under scripted exploration, and record everything including the failures. This is the only source that scales without human time, it is what "RL from deployment" consumes, and it requires an outcome labelling mechanism, which is the hard part.

### 6.2 The datasets you should be able to name

Open X-Embodiment, roughly a million trajectories across 22 embodiments, the pooled standard and the basis of RT-X, Octo, and OpenVLA. DROID ([Khazatsky et al., 2024](https://arxiv.org/abs/2403.12945)), 76,000 teleoperated Franka trajectories collected across 13 institutions in 564 scenes, notable because it was deliberately designed for scene diversity rather than task count. BridgeData V2, around 60,000 trajectories on a cheap WidowX arm in kitchens, the scrappy predecessor that proved diversity beats fidelity. RoboMimic ([Mandlekar et al., 2021](https://arxiv.org/abs/2108.03298)), the careful study of what makes demonstration data good, still the best single paper on data quality. RH20T, a large Chinese academic multi-task set with force data. AgiBot World, a large industrial humanoid dataset. And on the human-video side, Ego4D ([Grauman et al., 2021](https://arxiv.org/abs/2110.07058)), 3,670 hours of egocentric video from 931 people in 74 locations, and Ego-Exo4D ([Grauman et al., 2023](https://arxiv.org/abs/2311.18259)), which added time-synchronised third-person views of the same activity, which is precisely what you need to learn a mapping between how a task looks from the head and how it looks from a fixed camera.

**What format is this data in?**

RLDS, the Reinforcement Learning Datasets format built on TensorFlow Datasets, is what Open X-Embodiment ships in, episode-structured with per-step dictionaries. HDF5 is the academic default for single-lab datasets, including RoboMimic and ALOHA. The LeRobot dataset format, from Hugging Face, is the current rising standard, with data stored as parquet plus encoded video, versioned on the Hub, which matters because video encoding rather than raw frames is the difference between a 2 TB dataset and a 60 GB one. Whichever format, the per-step record is roughly the same: timestamped observations from each camera, joint state, the action that was commanded, and episode-level metadata including the language instruction and the success flag.

### 6.3 Why the field turned to egocentric human video

**What is the argument, stated properly?**

The argument has four steps, each contested to a different degree, so it is worth separating them.

Step one, the supply argument. Teleoperated robot data costs roughly a human minute per trajectory plus hardware, so a well-funded lab collects perhaps tens of thousands of trajectories a year. Humans wearing cameras generate thousands of hours of manipulation footage per week at near-zero marginal cost, and consumer smart glasses, Meta's Aria research glasses in particular, made the capture hardware ordinary. The ratio between these two supplies is three to four orders of magnitude, and no amount of teleoperation cleverness closes a gap that size.

Step two, the viewpoint argument, which is the specific reason it is *egocentric* rather than merely video. A head-mounted camera sees the scene from approximately where a humanoid's head camera sees it, with the hands entering from below in the same way, at the same scale, with the same occlusion pattern, and with the same natural gaze behaviour of looking at the thing you are about to manipulate. Third-person internet video has none of these properties: the viewpoint is arbitrary, the camera moves for cinematic reasons, and the actor is a whole body seen from outside. The visual domain gap between an egocentric human recording and a humanoid's own camera stream is small enough that a shared encoder is plausible; between YouTube and a robot it is not.

Step three, the content argument. Egocentric human video contains what robot data conspicuously lacks: enormous object diversity, natural clutter, real homes and workshops rather than lab tabletops, recovery from mistakes, and the long tail of everyday tasks nobody would pay a teleoperator to perform. It is also the only large-scale record of how humans sequence a long task, which is what the high-level layer of a hierarchical policy needs.

Step four, the evidence argument, and this is the weakest step, which is where you should apply pressure. What has been demonstrated is that pretraining a visual encoder on egocentric human video improves downstream policy learning, which R3M and VC-1 showed, and that co-training a policy on paired human and robot data collected in the same environment improves performance, which EgoMimic and similar work showed. What has not been demonstrated is a policy learning a genuinely new manipulation skill from human video alone, at deployment quality, on hardware. The field is betting that step four arrives, and the bet is reasonable, but the published evidence supports "human video is a good prior" rather than "human video is a substitute for robot data."

**What is the embodiment gap, precisely?**

Three separate mismatches, usually conflated. The kinematic gap: a human hand has around 27 degrees of freedom, a parallel-jaw gripper has one, and there is no faithful mapping between them, so any human grasp involving finger individuation is simply not executable. The dynamic gap: human arms are compliant and fast and use strategies such as bracing and momentum that a stiff position-controlled arm cannot reproduce. The visual gap: the robot sees its own metal gripper where the human video shows a hand, so a policy trained on hand imagery is out of distribution the moment the robot looks at its own end effector. Each gap has its own mitigation, respectively retargeting, filtering to gripper-compatible motions, and either masking out the hand, inpainting a gripper over it, or training with an embodiment-agnostic representation.

### 6.4 How egocentric data is actually annotated

**What has to be extracted from raw video to make it trainable?**

Raw egocentric footage is just pixels. To be usable as an action-labelled trajectory it needs, at minimum, the camera's pose over time, the hand's pose over time, a task description, and a segmentation into meaningful units. Each is produced by a separate pipeline, and understanding this pipeline is what separates people who talk about egocentric data from people who have processed it.

**Camera pose.** Run visual SLAM or structure from motion over the footage to recover the six-DoF trajectory of the head. Aria glasses ship this as a service, providing closed-loop trajectories, calibration, and a semi-dense point cloud, which is a large part of why that hardware dominates research. Without the camera trajectory you cannot convert anything into a world-frame action, because every apparent motion in the image is a mixture of head motion and hand motion.

**Hand pose and shape.** Detect hands, then fit a parametric hand model, MANO being the standard, giving wrist pose plus finger joint angles per frame. HaMeR is the current strong monocular hand reconstructor. The wrist pose over time, expressed in the world frame using the camera trajectory, is the raw signal that becomes an action sequence. Contact and grasp state are inferred either from fingertip proximity to the object surface or from a learned contact classifier, and this is the noisiest part of the pipeline; open-versus-closed gripper timing derived from video is routinely wrong by a few frames, which matters a great deal for a task that depends on releasing at the right instant.

**Retargeting.** Convert human wrist trajectory plus grasp state into robot end-effector trajectory plus gripper command. For a parallel-jaw gripper this is mostly a rigid transform from the MANO wrist frame to the gripper frame, plus a thresholded grasp signal, plus a feasibility filter that drops any segment violating the robot's joint limits, reach, or collision constraints. For a dexterous hand it is a per-finger optimisation matching fingertip positions or contact points, which is why glove or exoskeleton capture is preferred when the target has fingers.

**Object and scene annotation.** Object masks and tracks from SAM plus a video tracker, 3D object pose where a model exists, and increasingly a reconstructed scene via Gaussian splatting so the interaction can be replayed in simulation.

**Language annotation, which is now mostly automated.** A VLM watches a clip and writes the instruction: "pick up the sponge from the sink." This is how large datasets get instructions at all, since human narration is far too slow, and Ego4D's human-narrated timestamps were expensive enough to be a headline contribution of that paper. The known failure mode is that VLM-generated labels are fluent and frequently wrong about fine detail, particularly about which object was touched and in what order, so serious pipelines validate on a hand-labelled subset and report the agreement rate. If someone shows you an auto-labelled dataset with no measured label accuracy, that is the question to ask.

**Temporal segmentation.** Cutting a continuous stream into task-length clips with clear starts and ends, either by detecting contact events, by change in the narration, or by a learned boundary model. Long unlabelled streams are also used directly through hindsight relabelling, the trick from hindsight experience replay: whatever state the agent actually reached is treated as if it had been the goal, so every segment of aimless video becomes a successful demonstration of reaching its own endpoint. This is how play data becomes supervised data with no annotation at all.

**Quality filtering.** Discarding clips with motion blur, with hands out of frame, with failed SLAM, with implausible retargeted trajectories, or with low VLM-label confidence. A recurring and slightly uncomfortable empirical finding, going back to RoboMimic, is that a smaller high-quality dataset frequently beats a larger noisy one, and that mixing in demonstrations from a poor operator can reduce performance below training on the good operator alone. Scale is not free.

```text
  EGOCENTRIC ANNOTATION PIPELINE

  raw egocentric video + IMU
        |
        +-> visual SLAM / provided trajectory ---> camera pose per frame
        |
        +-> hand detection -> MANO fit (HaMeR) --> wrist pose + finger angles
        |                                   |
        |                                   +----> contact / grasp state
        |
        +-> SAM + video tracker ------------------> object masks and tracks
        |
        +-> VLM captioner ------------------------> language instruction
        |
        v
  retargeting: wrist pose (world frame) -> robot EE pose
               grasp state              -> gripper command
               feasibility filter       -> drop unreachable segments
        |
        v
  episode record: {obs frames, EE action chunk, gripper, instruction, quality}
        |
        v
  co-training with real robot teleop data, mixed at some ratio,
  usually with an embodiment or domain token
```

### 6.5 Annotation of robot data proper

**What needs labelling when the robot collected the data itself?**

Less than you would think, and the part that remains is the hard part. Actions are free, since the commanded action was logged. Observations are free. What is not free is, first, the language instruction, which for teleoperated data is usually typed once per episode by the operator or generated afterwards by a VLM; second, the success label, which is the crucial one; and third, any subtask decomposition or reward signal.

**Why is the success label the hard part?**

Because a scaled autonomous collection loop produces millions of rollouts nobody watched, and improvement requires knowing which ones worked. The options are a human watching video, which does not scale; a scripted detector using instrumentation, which works only for fixed tasks in fixed cells; a learned success classifier, typically a fine-tuned VLM asked "did the robot put the cup on the shelf," which scales and is wrong in correlated ways that quietly bias training; or a learned reward or value model trained from preferences. Every serious deployment-learning programme, including RECAP as Physical Intelligence describes it, is at bottom a bet on labelling outcomes automatically at scale. Note the direct line from here to your own thesis: an automatic success classifier is an internal evaluator, and an internal evaluator with unmeasured error is exactly the thing a third party is needed to audit.

---

## 7. Simulation and the infrastructure layer

### 7.1 Physics engines, and what they disagree about

**Why are there so many, and what actually distinguishes them?**

They disagree about contact. Rigid-body dynamics away from contact is textbook and every engine agrees. Contact is where an engine must handle a discontinuous, non-smooth, over-constrained problem, and the choices there, whether contact is modelled as a soft spring or a hard constraint, how friction cones are approximated, what integrator and timestep are used, produce visibly different behaviour for exactly the tasks robotics cares about, namely grasping, sliding, and insertion.

MuJoCo, now maintained by Google DeepMind and fully open source, uses a soft convex contact formulation, is fast and extremely stable, and is the research default for locomotion and for anything needing analytic gradients; MJX runs it on accelerators for massive parallelism. PhysX is NVIDIA's engine underneath Isaac Sim, GPU-accelerated and designed to run thousands of environments in parallel on one card. Bullet and PyBullet are the older open-source default, easy and slow. Drake, from Toyota Research Institute and MIT, prioritises physical correctness and analysis over speed, and is what you use when you care whether the contact forces are right rather than whether they look right. SAPIEN is the academic engine behind the ManiSkill benchmarks. Genesis is the recent entrant claiming very high throughput with differentiable and multi-material support. Newton is the NVIDIA, DeepMind, and Disney Research joint physics engine built on Warp and aimed at differentiable GPU-native robot simulation, and it is the one Lightwheel was co-calibrating for Samsung cable handling in the work you already recorded.

**What does "differentiable simulation" mean, and why does it appear in pitches?**

An engine is differentiable if you can compute the gradient of the outcome with respect to the inputs, including the physical parameters. That gives two capabilities: you can optimise a trajectory by gradient descent instead of by sampling, and, more commercially interesting, you can fit the simulator's parameters to real measurements by backpropagating the discrepancy, which is system identification done directly. The catch is that contact makes the true gradient discontinuous, and the smoothed gradients engines provide can be misleading through a collision, so differentiable contact is a genuine research problem rather than a solved feature.

### 7.2 The NVIDIA naming maze, untangled

**What are all these Isaac things, and which one do I actually mean?**

Worth getting right, because the names are used interchangeably by people who have not used them and precisely by people who have.

**Omniverse** is the underlying platform: a scene composition and rendering system built on OpenUSD, Pixar's Universal Scene Description, which is the interchange format for 3D scenes and the reason robot assets can move between tools at all. It is the substrate, not a robotics product.

**Isaac Sim** is the robotics simulator application built on Omniverse: photorealistic rendering via RTX, PhysX for dynamics, sensor models for cameras and LiDAR, URDF and MJCF and OpenUSD import, and a ROS 2 bridge. This is what you use to build a scene and look at a robot in it.

**Isaac Lab** is the lightweight open-source framework sitting on top of Isaac Sim for training robot learning policies, and it is what people mean when they say "we train in Isaac." It replaced the earlier Isaac Gym and Orbit projects, and its value is the parallel environment abstraction: define an environment once and run thousands of clones on a single GPU, with observation and action tensors staying on the device so there is no CPU bottleneck. That GPU-parallel design is the concrete reason sim-trained locomotion took over, since a policy can experience years of walking in hours. It ships task suites, standard robot assets, wrappers for the common RL libraries, and domain randomisation utilities. Isaac Lab Arena is the newer evaluation-oriented layer for benchmarking generalist policies, integrated with LeRobot, and it is directly adjacent to your own territory.

**Isaac ROS** is an unrelated thing wearing the same brand: GPU-accelerated perception packages for ROS 2 that run on real hardware, on a Jetson, not in simulation. If someone says "we use Isaac ROS," they are talking about deployment, not training.

**GR00T** is the humanoid foundation policy line, N1 and its successors, with GR00T-Mimic and GR00T-Dreams as the synthetic-trajectory generation pieces. **Cosmos** is the world foundation model family for generating synthetic video and physics-aware futures. **Warp** is the Python framework for writing GPU kernels that Newton is built on. **Jetson**, specifically Orin and the newer Thor, is the onboard compute module the policy runs on inside the robot.

In one sentence you can reuse: Omniverse is the substrate, Isaac Sim is the simulator, Isaac Lab is the training framework, Isaac ROS is the deployment perception stack, GR00T is the policy, Cosmos is the generative world model, Newton is the physics engine, and Jetson is the computer in the robot.

### 7.3 Sim-to-real: randomisation, system identification, real-to-sim

**What is the reality gap, and what are the two opposing strategies for it?**

The reality gap is the difference between simulated and real dynamics and appearance that makes a policy trained in one fail in the other. There are two philosophies, pulling in opposite directions.

Domain randomisation ([Tobin et al., 2017](https://arxiv.org/abs/1703.06907)) says: do not try to make the simulator accurate, make it varied. Randomise masses, friction coefficients, motor gains, latencies, lighting, textures, and camera poses over wide ranges during training, so the real world looks like just another sample from the training distribution and the policy is forced to be robust. This works remarkably well for locomotion and is how most quadruped policies transfer. Its cost is conservatism: a policy robust to every friction coefficient between 0.2 and 1.5 will not exploit the actual friction and will be visibly clumsy on precise tasks.

System identification says the opposite: measure the real system carefully and fit the simulator's parameters to it, so the simulator is accurate rather than broad. This is what Lightwheel's "physical measurement factory" is in engineering terms, and it is the right answer for contact-rich tasks where the policy must exploit specific physics rather than survive any physics. The two are combined in practice, identifying what can be measured and randomising the residual, and the phrase for that is narrowed or adaptive randomisation.

**What is real-to-sim, and why is it suddenly fashionable?**

Building the simulation from reality instead of authoring it: scan the real cell with a camera, reconstruct geometry and appearance with Gaussian splatting or photogrammetry, recover object poses, and measure the dynamics on the real hardware, producing a digital twin that matches a specific deployment rather than a generic scene. The reason it is fashionable is evaluation. If the twin is faithful, you can test a policy update a thousand times before it touches a real robot, which is the only affordable way to answer whether a new model is a regression. The reason to be careful is that fidelity is asserted far more often than it is measured, and the honest metric is a sim-to-real correlation coefficient with a confidence interval, not a screenshot. A simulator can have high average agreement and still rank policies wrongly, which is the failure that makes simulated improvement meaningless, and SIMPLER's MMRV, the mean maximum rank violation, was proposed precisely to measure ranking fidelity rather than average agreement.

### 7.4 The software and hardware plumbing: ROS 2, LeRobot, Jetson

**What is ROS, and what is it not?**

ROS, the Robot Operating System, is not an operating system; it is a middleware and a package ecosystem. Its core idea is a graph of processes, called nodes, exchanging typed messages over named topics with a publish-subscribe pattern, plus services for request-response and actions for long-running goals. ROS 2 rebuilt this on DDS, an industrial pub-sub standard, adding quality-of-service settings, security, and real-time friendliness, and it is what anything shipping today uses. The value is not the message passing itself, it is the ecosystem: drivers for most sensors and arms, tf2 for coordinate-frame bookkeeping, MoveIt for motion planning, Nav2 for mobile navigation, rviz for visualisation, and rosbag for recording everything for replay, which is the closest thing robotics has to a universal debugging tool. The friction you will hear complained about is that learned-policy people work in Python and PyTorch and find ROS's build system and message plumbing heavy, so a common architecture is a learned policy running in its own process and speaking to a thin ROS node over a socket.

**What is real-time, in the strict sense?**

A system is hard real-time if missing a deadline is a failure, not a slowdown. Motor control loops are hard real-time and run on a microcontroller or a PREEMPT_RT Linux kernel, often over EtherCAT or CAN for deterministic bus timing. A learned policy is soft real-time at best, running on a GPU with an unpredictable garbage collector somewhere in the stack. Keeping these two worlds separated by a well-defined interface is basic safety architecture, and it is why "the model crashed" should never be able to mean "the arm went limp at speed."

**What is LeRobot, and why does it keep coming up?**

Hugging Face's open robotics library, which has become the de facto community standard for learned manipulation in the way transformers became standard for NLP. It provides the dataset format and hosting, implementations of the standard policies including ACT, Diffusion Policy, and several VLAs, training scripts, and support for a family of cheap open hardware arms, the SO-100 and SO-101 in particular, that put a working teleoperation and imitation setup within a few hundred dollars. For someone entering the field this is the single highest-leverage repository to have run end to end, because it collapses the distance between reading about action chunking and watching your own arm do it.

**What runs on the robot?**

A Jetson Orin or Thor module for onboard inference, or an industrial PC with a discrete GPU where power and space allow. The practical constraints shaping architecture are memory, roughly 32 to 64 GB shared between the model and everything else, and power, tens of watts, which is why quantisation, distillation, and the two-speed System 1 / System 2 split exist. When a company says its model "runs onboard," the questions are which precision, at what frequency, and whether the language layer is onboard too or is quietly in the cloud.

---

## 8. Evaluation, which is where your own thesis lives

**Why is evaluation a first-class topic here rather than a footnote?**

Because it is the part of the stack where the vocabulary is thinnest and the incentives are worst, and because it is where your own work sits. A policy's headline number is a success rate on some number of trials, and the number of trials is almost always small: twenty or fifty rollouts per task is normal in published work. A 90 percent success rate measured on 20 trials has a 95 percent confidence interval running roughly from 68 to 99 percent, so two policies reported as 90 and 75 percent on 20 trials each are statistically indistinguishable. The field knows this and mostly proceeds anyway, because real rollouts are expensive and reviewers do not demand power analyses.

**What are the terms you need?**

Success rate, the fraction of trials achieving the task goal, which requires a stated success criterion that frequently is not stated. Trials or rollouts, the unit of evidence. In-distribution versus out-of-distribution evaluation, where OOD decomposes further into novel objects, novel positions, novel scenes, novel instructions, and novel embodiments, and a paper claiming generalisation should say which axis it varied. Zero-shot versus few-shot versus fine-tuned, describing how much task-specific data the policy saw. Regression, meaning a new model is worse than the old one at something the old one could do, which is the failure mode that matters commercially because it is what breaks a deployed fleet. Benchmark suites you will hear named: LIBERO for lifelong manipulation, CALVIN for long-horizon language-conditioned tasks, Meta-World for multi-task RL, RoboCasa for simulated kitchens, ManiSkill, and SIMPLER for real-to-sim policy evaluation. And the two correlation metrics from the twin literature, Pearson correlation between simulated and real success, and MMRV for whether the ranking is preserved.

**What is the honest state of it?**

There is no public leaderboard that fairly compares policies across embodiments, because every lab evaluates on its own hardware in its own kitchen with its own success criterion, and none of it is reproducible by a third party. Buyers consequently say they have to benchmark local deployments themselves. That is a measurement vacuum of exactly the kind that in every other unbundled industry got filled by an accredited third party, and it is the seam you have already identified. Nothing in this primer is more load-bearing for your own work than the observation that the entire technical stack above rests on success-rate numbers that would not survive a statistician reading them.

---

## 9. Glossary, dense and scannable

**Models and policies**

- **Policy** — the learned function from observation to action. The "brain."
- **Behaviour cloning (BC)** — supervised learning of a policy from demonstrations.
- **Imitation learning** — the umbrella containing BC, inverse RL, and DAgger-style interactive methods.
- **DAgger** — iteratively collect data from the learner's own state distribution with expert corrections; the classical fix for compounding error.
- **Diffusion policy** — generates an action chunk by iterative denoising; handles multimodal action distributions.
- **Flow matching** — a faster relative of diffusion learning a straight-line transport from noise to data; used in pi0 and successors for low-latency chunk generation.
- **VLM** — vision-language model; an LLM with a vision encoder, and the source of world knowledge.
- **VLA** — vision-language-action model; a VLM fine-tuned to emit robot actions, either as discretised tokens or through a continuous action expert.
- **Action expert** — a small continuous-output head, typically flow- or diffusion-based, attached to a VLM backbone.
- **Action tokenisation** — encoding actions as discrete tokens in the language model's vocabulary; FAST is the compressed DCT-based version.
- **Action chunk** — a sequence of future actions predicted together and executed open loop.
- **Temporal ensembling** — averaging overlapping chunks to smooth the seams.
- **Cross-embodiment** — training one policy across multiple robot types.
- **Foundation policy / generalist policy** — a large pretrained policy intended to be fine-tuned per task; the robotics analogue of a foundation model.
- **System 1 / System 2** — the two-speed architecture pairing a slow reasoning VLM with a fast reactive controller.
- **Embodied chain of thought** — emitting intermediate reasoning, subgoals, or waypoints before actions.
- **Hierarchical policy** — high-level subgoal selection plus low-level execution.
- **Residual policy** — a learned correction added on top of a classical controller; a common practical deployment pattern.
- **Affordance** — what an object permits doing; a predicted grasp point or contact location.

**Learning and RL**

- **On-policy / off-policy** — whether learning uses fresh data from the current policy or stored data.
- **PPO / SAC** — the standard on-policy and off-policy algorithms; PPO for sim locomotion, SAC for real-robot RL.
- **Offline RL** — learning from a fixed dataset without interaction; CQL and IQL are the conservative methods that make it work.
- **Value function / critic** — the learned estimate of future return, used to rank or filter actions.
- **Reward shaping / reward hacking** — engineering the reward, and the policy exploiting your engineering.
- **Hindsight relabelling** — treating whatever was reached as if it were the intended goal, turning aimless data into supervised data.
- **Sample efficiency** — performance per unit of interaction; the binding constraint on real hardware.
- **Distribution shift / covariate shift** — test-time states differ from training states; the core failure of BC.
- **Causal confusion / copycat problem** — the policy repeats its own last action from proprioception instead of solving the task.
- **Co-training** — training on mixed data sources, for instance human video plus robot teleop, usually with a source or embodiment token.

**Perception**

- **Proprioception** — the robot's knowledge of its own joint state.
- **Pose / SE(3) / 6-DoF** — position plus orientation, six numbers.
- **SLAM / visual odometry** — build a map while localising in it, or track motion without a map.
- **ICP** — align two point clouds.
- **Kalman / particle filter** — recursive state estimation under noise.
- **Intrinsics / extrinsics / hand-eye calibration** — camera internals, frame-to-frame transforms, and the camera-to-robot transform that silently ruins cells when wrong.
- **Point cloud / voxel / SDF** — the three classical 3D representations.
- **NeRF / 3D Gaussian splatting** — learned scene representations for novel-view rendering; splatting is the fast one and underpins real-to-sim.
- **SAM / DINOv2 / CLIP / SigLIP** — segmentation, dense self-supervised features, and image-text embedding models used as frozen perception.
- **R3M / VC-1** — visual representations pretrained on human video specifically for robot policies.
- **Tactile sensing / GelSight / DIGIT** — vision-based touch sensors turning contact into images.
- **Force-torque sensor** — six-axis wrist sensor giving measured contact forces.

**Control**

- **PID / impedance / admittance control** — feedback control, programmable compliance, and its force-sensing dual.
- **Inverse kinematics / null space** — pose to joint angles, and the redundancy of a 7-DoF arm.
- **MPC** — optimise a short horizon, execute one step, repeat.
- **Whole-body control / ZMP / centre of pressure** — coordinating a legged robot subject to balance.
- **Motion planning / RRT / PRM / trajectory optimisation** — collision-free path generation.
- **Teleoperation / leader-follower / kinesthetic teaching** — the three ways a human drives a robot for data.
- **Compliance / backdrivability** — whether the arm yields when pushed; a precondition for safe contact work.

**Data**

- **Trajectory / episode / rollout** — one recorded or executed attempt at a task.
- **Demonstration** — a trajectory produced by a human, successful by assumption.
- **Play data** — unstructured purposeless interaction, made useful by hindsight relabelling.
- **Open X-Embodiment / DROID / BridgeData / RoboMimic / AgiBot World** — the robot datasets to be able to name.
- **Ego4D / Ego-Exo4D / Aria** — the egocentric human video datasets and the glasses that record them.
- **RLDS / HDF5 / LeRobot dataset** — the storage formats.
- **UMI / ALOHA / GELLO / exoskeleton capture** — the collection rigs.
- **MimicGen** — synthesising many demonstrations from few by object-centric replay.
- **Retargeting** — mapping human hand and arm motion onto robot joints or gripper commands.
- **MANO / HaMeR** — the parametric hand model and the monocular hand reconstructor used to extract hand pose from video.
- **Embodiment gap** — the kinematic, dynamic, and visual mismatch between human and robot.

**Simulation and infrastructure**

- **MuJoCo / PhysX / Bullet / Drake / SAPIEN / Genesis / Newton** — the physics engines, differing mainly in how they model contact.
- **Isaac Sim / Isaac Lab / Isaac ROS / Omniverse / OpenUSD** — simulator, training framework, deployment perception stack, platform, and scene format.
- **GR00T / Cosmos / Warp / Jetson Orin / Thor** — humanoid foundation policy, generative world model, GPU kernel framework, and onboard compute.
- **Domain randomisation / system identification / real-to-sim / digital twin** — the four moves for crossing the reality gap.
- **Differentiable simulation** — gradients through physics; useful for parameter fitting, unreliable through contact.
- **ROS 2 / DDS / tf2 / MoveIt / Nav2 / rosbag** — middleware, transport, transform bookkeeping, planning, navigation, and recording.
- **PREEMPT_RT / EtherCAT / CAN** — hard real-time kernel and deterministic buses.
- **LeRobot / SO-100 / SO-101** — the open training stack and the cheap arms it drives.
- **Sim-to-real correlation / SRCC / MMRV** — whether simulated performance predicts and ranks real performance.
- **LIBERO / CALVIN / Meta-World / RoboCasa / ManiSkill / SIMPLER** — the benchmark suites.

---

## 10. How to sound like you belong in the room

**What questions separate someone who has read about this from someone who has done it?**

Ask what the action space is and whether it is absolute or relative, because the answer tells you how much of the result survives a change of robot. Ask the chunk size and the control frequency, because those two numbers determine how reactive the system actually is regardless of what the demo looks like. Ask how many rollouts the success rate is over, and watch what happens; if the answer is twenty, the number is decoration. Ask what fraction of the training data is teleoperated on the exact target embodiment, because that fraction, not the total dataset size, predicts performance. Ask how success was labelled during autonomous collection, since an automatic classifier with unmeasured error silently sets the ceiling on everything downstream. Ask whether the language layer changes behaviour under instruction variation, which separates a real multi-task policy from a single-task policy with a caption. And for anything involving simulation, ask what the measured correlation to hardware is, not whether the simulator is photorealistic.

**What are the three claims to be reflexively sceptical of?**

That scaling data alone will solve manipulation, which is an extrapolation from a dataset three to four orders of magnitude smaller than the language corpora the analogy is borrowed from. That a video generation model constitutes a world model in the sense needed for control, which conflates plausible pixels with conserved physics. And that a demo video generalises, which no video can show, since the informative quantity is the failure distribution over many trials and a video is a sample of size one selected by the party with the strongest incentive.

---

## Closing: what you now know, what to study next, what I recommend

**What you now know.** A robot is a multi-rate loop, and every technical term in the field attaches to one of its layers, which is the single frame that makes the vocabulary navigable. Perception splits into a classical geometric stack that computes poses and transforms, where hand-eye calibration is the standard silent failure, and a learned stack of frozen pretrained encoders, where the live disagreement is whether explicit 3D and object-centric structure is necessary for contact work. Action output is not one thing: the choice of joint versus end-effector and absolute versus relative determines transferability, and action chunking, the prediction of a whole sequence executed open loop, is now near-universal because it simultaneously suppresses compounding error and hides inference latency, at the cost of making the robot blind for the duration of the chunk and making the statistics of evaluation worse than the control rate suggests. Policies are almost all behaviour cloning wearing different architectures; the architectures exist to represent multimodal action distributions, which is why diffusion and then flow matching displaced regression, and a VLA is exactly a VLM with either discretised action tokens or a continuous action expert bolted on and fine-tuned on demonstrations, with cross-embodiment transfer demonstrated at modest scale rather than proven as a law. World models mean four distinguishable things, and the useful discipline is to ask which: latent dynamics for imagination, generative video for synthetic experience, JEPA as an architecture that predicts embeddings rather than pixels, and the rhetorical usage; all of them break on contact and long-horizon consistency, which is why measured sim-to-real correlation matters more than rendering quality. Data is the true bottleneck because there is no internet of actions, teleoperation costs human minutes per trajectory, and the turn to egocentric human video is a four-step argument whose first three steps are strong, namely supply, viewpoint alignment with a humanoid's own camera, and content diversity, and whose fourth step, that skills transfer from human video alone, is still unproven; annotating that video means recovering camera pose by SLAM, hand pose by MANO fitting, contact state by inference, instructions by VLM captioning with an unmeasured error rate, and then retargeting and feasibility-filtering into robot action space. Infrastructure is mostly NVIDIA's stack with distinct pieces sharing a brand, Omniverse as substrate, Isaac Sim as simulator, Isaac Lab as the GPU-parallel training framework whose thousands of concurrent environments are the concrete reason sim-trained locomotion works, Isaac ROS as the unrelated deployment perception stack, plus ROS 2 as middleware, LeRobot as the community training and dataset standard, and Jetson as the computer inside the robot. And underneath all of it sits an evaluation practice of twenty to fifty rollouts per task with unstated success criteria and no cross-lab comparability, which is both the field's weakest joint and the precise location of your own thesis.

**Checklist, what is worth studying next.**

- [ ] Run the LeRobot quickstart end to end against a simulated environment, then read its ACT and Diffusion Policy implementations side by side to see what the architectures share.
- [ ] Read ACT ([2304.13705](https://arxiv.org/abs/2304.13705)) and Diffusion Policy ([2303.04137](https://arxiv.org/abs/2303.04137)) in one sitting; they are the two papers everything after them assumes.
- [ ] Read pi0 ([2410.24164](https://arxiv.org/abs/2410.24164)) against OpenVLA ([2406.09246](https://arxiv.org/abs/2406.09246)) specifically to contrast the continuous action expert with action tokenisation.
- [ ] Read RoboMimic ([2108.03298](https://arxiv.org/abs/2108.03298)) for the data-quality findings, which are the least fashionable and most useful results in the field.
- [ ] Read SIMPLER ([2405.05941](https://arxiv.org/abs/2405.05941)) closely, including the MMRV definition, since it is the methodological ancestor of any certification product.
- [ ] Work through one Isaac Lab tutorial to the point of seeing thousands of parallel environments step, because the parallelism has to be felt rather than read.
- [ ] Process one hour of egocentric video through a hand-pose and SLAM pipeline yourself; the annotation error rates stop being abstract about ten minutes in.
- [ ] Compute the binomial confidence interval for every success rate in the next three robotics papers you read, and keep the tally.

**My recommendations.** First, pick one narrow technical competence and make it real rather than read, and make it the annotation and evaluation pipeline rather than the policy architecture, because that is where your thesis needs credibility and because it is the part of the stack nobody enjoys and therefore nobody has made rigorous. Being the person who can say "your success classifier has a measured 8 percent false-positive rate and here is the effect on your reported number" is worth more in an IRIS conversation than being another person who has fine-tuned a VLA. Second, treat the egocentric turn as the field's largest open empirical bet rather than as settled progress, and note that resolving it requires exactly the measurement apparatus you are proposing to build, since nobody can currently say how much human video is worth in units of robot demonstrations. Third, when you go into the Astra hackathon in October, use this vocabulary to ask the narrow questions in section 10 rather than to demonstrate breadth; the differentiating move in a room of builders is not knowing more terms, it is asking the one question about trial counts the demo cannot answer. Fourth, do not try to hold this document in memory. Reread section 9 before a technical meeting and section 5 before any conversation where someone says world model, and let the rest come back through use.

*Provenance note: this primer is agent-written teaching material, not new research. Technical content is standard published field knowledge with arXiv identifiers given inline for the primary sources; the connective claims about market structure, the unbundling-to-referee argument, the Lightwheel measurement factory, the SIMPLER figures, and the evaluation gap are carried from your own prior work recorded in gbrain on 2026-09-03, 2026-09-07 and 2026-09-14 and in `reports/synthetic-robot-data-landscape-2026-09-14.md`, and were not re-verified here. Model and product details for pi0.5, pi-star-0.6, GR00T N1.7, Helix and Cosmos come from that same record rather than from primary sources read today, so treat version numbers as point-in-time.*
