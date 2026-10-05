# Writing ROS 2 Nodes, From the Ground Up

A teaching companion to CS237A / AA274A Section 2, written on 2026-10-05 against the lab document "Section 2" (CS237A Fall 2026, last updated Oct 1, 2026). Section 2 is the first lab where you stop running other people's software and start writing your own: by the end you will have authored a ROS node that commands a robot, registered it with a build system, and killed it remotely over the network. This document explains every concept and every command that lab touches, at the level of what the machine is actually doing, not just which keys to press. It assumes you have read the two earlier primers, [ROS 2 From the Ground Up](ros2-primer-2026-09-27.md) for the middleware concepts and [Linux, Git and GitHub, From the Ground Up](linux-git-github-primer-2026-09-30.md) for the shell and version control concepts, and it deliberately does not repeat what those already cover; where a topic belongs to one of them, it is referenced rather than restated.

## Contents

- [1. What Section 2 actually asks you to build](#1-what-section-2-actually-asks-you-to-build)
- [2. The three nested layers: workspace, repository, package](#2-the-three-nested-layers-workspace-repository-package)
- [3. Build types: ament_cmake, ament_python, and why your lab picks CMake for Python code](#3-build-types-ament_cmake-ament_python-and-why-your-lab-picks-cmake-for-python-code)
- [4. package.xml: declaring what you depend on, and when you need it](#4-packagexml-declaring-what-you-depend-on-and-when-you-need-it)
- [5. CMakeLists.txt and the install step, where most students lose an hour](#5-cmakeliststxt-and-the-install-step-where-most-students-lose-an-hour)
- [6. How a text file becomes a program: the shebang, the execute bit, and exec](#6-how-a-text-file-becomes-a-program-the-shebang-the-execute-bit-and-exec)
- [7. rclpy: the context, the node, and the object graph you are building](#7-rclpy-the-context-the-node-and-the-object-graph-you-are-building)
- [8. The publisher, and what "publish" actually does](#8-the-publisher-and-what-publish-actually-does)
- [9. Timers, callbacks, and the executor: what spin() is really doing](#9-timers-callbacks-and-the-executor-what-spin-is-really-doing)
- [10. Messages as contracts: Twist, differential drive, and why only two fields matter](#10-messages-as-contracts-twist-differential-drive-and-why-only-two-fields-matter)
- [11. The subscription, and building an emergency stop that actually stops](#11-the-subscription-and-building-an-emergency-stop-that-actually-stops)
- [12. colcon, symlink-install, and the edit-build-run loop](#12-colcon-symlink-install-and-the-edit-build-run-loop)
- [13. Running and inspecting: run, launch, topic list, echo, pub](#13-running-and-inspecting-run-launch-topic-list-echo-pub)
- [14. The git and GitHub workflow this lab wraps up with](#14-the-git-and-github-workflow-this-lab-wraps-up-with)
- [15. Every command in the lab, and what it fundamentally does](#15-every-command-in-the-lab-and-what-it-fundamentally-does)
- [16. Glossary](#16-glossary)
- [Closing](#closing)

---

## 1. What Section 2 actually asks you to build

**What is the end state, stated as a system rather than as a task list?**

By the final checkpoint you will have one Python process running on your machine that participates in a distributed system. It wakes up five times per second, constructs a velocity command, and broadcasts it onto a named channel called `/cmd_vel`. A completely separate process, the Gazebo simulator launched from `asl_tb3_sim`, is listening on that channel; it receives each command, feeds it into a physics model of a TurtleBot 3, and the robot moves. Meanwhile your process is also listening on a second channel called `/kill`, and when anything anywhere on the network publishes `true` there, your process stops commanding motion and issues a zero velocity.

That is the whole lab, and it is worth seeing it as one picture before breaking it into eighteen tasks, because the tasks are almost all plumbing in service of that picture.

```
   YOUR PROCESS                              SOMEONE ELSE'S PROCESS
   (constant_control.py)                     (gz sim, from asl_tb3_sim)

   +---------------------------+             +--------------------------+
   |  timer fires every 0.2s   |             |                          |
   |            |              |             |   physics engine         |
   |            v              |             |   + 3D window            |
   |  control_callback()       |             |                          |
   |            |              |             |                          |
   |            v              |             |                          |
   |  cmd_vel_pub.publish(msg) |--- /cmd_vel ----->  subscribes,        |
   |                           | geometry_msgs|      integrates motion  |
   |                           |    /Twist    |                          |
   |                           |             |                          |
   |  kill_callback(msg)   <------ /kill -----------  you, by hand,      |
   |     cancel timer          |  std_msgs    |      via ros2 topic pub  |
   |     publish zero Twist    |    /Bool     |                          |
   +---------------------------+             +--------------------------+
```

**Why does the lab spend so much effort on build files for a 30-line Python script?**

Because the thing that makes your script a *ROS node* is not the Python. Python with `rclpy` imported is just a program. What makes it a node that `ros2 run` can find, that other packages can depend on, and that a launch file can start, is being installed into a package in a place the ROS tooling knows to look. Tasks 2.3 and 2.4, the CMake and `package.xml` edits, are the entire difference between a script you run with `./constant_control.py` and a node that is part of a robot software stack. Understanding that distinction is most of what Section 2 is actually teaching, even though the lab document presents it as two copy-paste snippets.

---

## 2. The three nested layers: workspace, repository, package

**What are the three layers, and why does the lab insist on this exact nesting?**

Section 2 has you build a directory structure with three conceptually different things stacked inside one another, and conflating them is the root of several lab failures.

The outermost layer is the **workspace**, `~/autonomy_ws`. A workspace is a build unit. It is the thing `colcon build` operates on, and it is defined by having a `src/` subdirectory containing source code. The workspace is not version controlled and is not shared; it is scratch space on your machine where a build happens. This is why Task 0.1 can tell you to delete `~/autonomy_ws` without ceremony: nothing durable lives there, provided your code has been pushed.

The middle layer is the **git repository**, your group's private repo, cloned by Task 1.2 into `~/autonomy_ws/src/`. A repository is a unit of collaboration and history. It is what GitHub hosts, what your group shares, and what your pull request is opened against. Crucially, ROS has no concept of a repository at all; `colcon` neither knows nor cares that this directory is under version control.

The innermost layer is the **package**, `s2_basic`, created by Task 1.3 inside the repository. A package is ROS's unit of software: the smallest thing that can declare dependencies, be built, be installed, and be referred to by name in `ros2 run` or a launch file. A package is defined by exactly one thing, the presence of a `package.xml` file.

```
~/autonomy_ws/                      <-- WORKSPACE (build unit, local, disposable)
   src/                             <-- the only directory colcon scans
      <group_repo>/                 <-- REPOSITORY (collaboration unit, on GitHub)
         README.md
         s2_basic/                  <-- PACKAGE (ROS unit, has package.xml)
            package.xml             <-- this file is what makes it a package
            CMakeLists.txt
            scripts/
               constant_control.py  <-- your actual code
   build/                           <-- created by colcon, intermediate, disposable
   install/                         <-- created by colcon, the usable output
   log/                             <-- created by colcon, build logs
```

**How does colcon find a package buried two levels deep inside a repository?**

It walks the entire tree under `src/` recursively looking for `package.xml` files, and every directory containing one is a package to build. This recursive scan is why the nesting works at all, and it is also why Task 2.5 carries a warning in bold about your working directory. If you run `colcon build` from inside the repository rather than from `~/autonomy_ws`, colcon treats *that* directory as the workspace root, creates `build/`, `install/` and `log/` directories right there inside your git repository, and now those thousands of generated files are sitting in a place where `git add` will try to commit them. The command succeeds, which is what makes it dangerous; you discover the problem later when your pull request contains forty megabytes of build artifacts.

The underlying principle generalizes well beyond this lab. Build tools that discover their inputs by scanning a directory tree are always sensitive to where you invoke them, because the invocation directory *is* a parameter even when it does not look like one.

**Why does the lab have you create the package inside the repository rather than beside it?**

Because the package is the thing being graded and shared. If you ran `ros2 pkg create` from `~/autonomy_ws/src/` instead of from inside the cloned repository, `s2_basic` would be a sibling of the repository rather than a child of it. ROS would be perfectly happy, `colcon build` would work, your node would run, and all three CA checkpoints would pass. Then at the Wrap Up step `git add s2_basic/` would fail with a path error, because from git's point of view that directory does not exist inside the repository, and your pull request would be empty. This is a failure mode worth internalizing: ROS correctness and git correctness are independent, and a setup can satisfy one completely while failing the other.

---

## 3. Build types: ament_cmake, ament_python, and why your lab picks CMake for Python code

**What does the `--build-type` flag in `ros2 pkg create --build-type ament_cmake s2_basic` actually select?**

It selects which build system will be invoked for this package, and therefore which metadata files get generated and what conventions you must follow. ROS 2 supports two primary choices for a normal package. `ament_cmake` means the package is built by CMake, and `ros2 pkg create` will generate a `CMakeLists.txt`. `ament_python` means the package is built by Python's setuptools, and `ros2 pkg create` would instead generate `setup.py`, `setup.cfg`, and a directory named after the package to hold your modules.

The flag writes its choice into `package.xml` as a build tool dependency, and `colcon` reads that at build time to decide how to treat the package. Running `ros2 pkg create --build-type ament_cmake s2_basic` produces roughly this:

```
s2_basic/
   CMakeLists.txt          # build instructions, read by CMake
   package.xml             # package identity and dependencies, read by ROS tooling
   include/s2_basic/       # where C++ headers would go (empty, unused by you)
   src/                    # where C++ sources would go (empty, unused by you)
```

Note what is missing: there is no `scripts/` directory. Task 2.1 says "create a file (and directory if necessary)", and the directory is necessary, precisely because `ament_cmake` scaffolds for C++ and you are writing Python.

**Why would a course choose the CMake build type for a package whose only code is a Python script?**

This looks backwards on first encounter, and the honest answer has two parts. The first is uniformity: over the quarter your group's repository will hold packages containing C++ nodes, Python nodes, custom message definitions, and launch files. `ament_cmake` handles all four. `ament_python` handles only Python, so a workspace built on it eventually needs a second build type anyway, and mixed-build-type workspaces are harder to reason about than uniform ones. The second part is that message generation, which you will need later in the quarter if you define custom types, is a CMake-driven process; `rosidl_generate_interfaces` is a CMake macro with no setuptools equivalent. Choosing `ament_cmake` now means you never have to migrate.

The cost of that choice is the thing Task 2.3 exists to pay. With `ament_python`, you would declare an executable by adding an entry to `console_scripts` in `setup.py`, and setuptools would generate a launcher for you. With `ament_cmake`, nothing knows your Python file exists unless you tell CMake to install it, which is exactly what the `install(PROGRAMS ...)` block does. The folder structure diagram in the lab's cheat sheet hints at this convention without explaining it: `src/` for C++ code, `scripts/` for ROS Python executables, and a separately named directory for importable Python library modules.

---

## 4. package.xml: declaring what you depend on, and when you need it

**What is package.xml for, given that CMakeLists.txt already describes the build?**

`package.xml` is the package *manifest*, and it answers a different question from `CMakeLists.txt`. CMake describes how to build. The manifest describes identity and dependency: what this package is called, who maintains it, what licence it carries, and what other packages it needs in order to build and in order to run. It is read by tools that must reason about packages without building them, which is a larger set of tools than you might expect. `colcon` reads every manifest in the workspace before building anything, in order to construct a dependency graph and compute a topological build order. `rosdep` reads manifests to map ROS dependency names onto operating system packages it can install with apt. `ros2 pkg list` and the package index read manifests to know what exists.

**What is the difference between the three dependency tags, and why does the lab specify `exec_depend`?**

This is a genuinely important distinction and the lab does not explain it. There are three tags you will meet.

`<build_depend>` means "I need this package present in order to compile." For a C++ node that includes a header from another package, that header must exist at compile time, so it is a build dependency.

`<exec_depend>` means "I need this package present in order to run." It is not needed during compilation at all.

`<depend>` is shorthand for both at once, and it is the right choice for the common C++ case where you compile against a package and also need it at runtime.

Task 2.4 has you add exactly this:

```xml
<exec_depend>rclpy</exec_depend>
<exec_depend>std_msgs</exec_depend>
```

`exec_depend` is correct here, and the reason is specific to Python. Nothing about your `constant_control.py` is compiled. CMake does not parse your `import` statements; it copies the file and sets its execute bit. The dependency on `rclpy` materializes only at the moment the Python interpreter executes `import rclpy`, which happens at runtime. Declaring it as a build dependency would be a false statement about when it is needed, and on a system where build and run environments differ, false statements in a manifest become real failures.

**Is the lab's dependency list complete?**

No, and noticing this is a good test of whether you have understood the section. Task 2.4 has you declare `rclpy` and `std_msgs`, which covers the Task 2.2 and Task 4.1 imports. But Task 3.1 has you import `Twist` from `geometry_msgs.msg`, and `geometry_msgs` is never added to the manifest. Your node will work anyway, because `geometry_msgs` is part of the standard ROS 2 Humble installation in the underlay at `/opt/ros/humble` and is therefore importable whether you declare it or not.

That it works is exactly why the omission is worth understanding rather than ignoring. A manifest is a promise about what your package needs. When the promise is incomplete and the missing piece happens to be installed for unrelated reasons, the package is silently fragile: it will break for whoever first tries to install it onto a minimal system, and the error they see will be an `ImportError` deep inside your code rather than a clean dependency resolution failure at install time. Adding `<exec_depend>geometry_msgs</exec_depend>` alongside the two the lab asks for costs one line and makes the manifest true. I would add it.

**What does the rest of the generated manifest contain?**

The scaffold `ros2 pkg create` writes includes `<name>`, `<version>`, `<description>`, `<maintainer>` and `<license>` with placeholder values, plus a `<buildtool_depend>ament_cmake</buildtool_depend>` line, which is how `colcon` learns this package needs CMake rather than setuptools. The placeholders for description and licence are worth filling in as a habit; they are the kind of metadata that is trivially easy to supply on day one and surprisingly annoying to backfill across twenty packages later.

---

## 5. CMakeLists.txt and the install step, where most students lose an hour

**What is CMake, in one paragraph, for someone who has never used it?**

CMake is a build system generator. You write a declarative description of your project in `CMakeLists.txt`, and CMake reads it and generates the actual low-level build files, normally Makefiles or Ninja files, which then do the compiling. The language is a sequence of command calls of the form `command(ARGUMENTS)`, it is case-insensitive for command names, and it has variables referenced with `${NAME}`. It was designed for C and C++, which is why using it to place a Python file feels slightly like using a forklift to move a envelope; that is nonetheless what Task 2.3 asks.

**What does the block in Task 2.3 mean, argument by argument?**

```cmake
install(PROGRAMS
    scripts/constant_control.py
    DESTINATION lib/${PROJECT_NAME}
)
```

`install` is a built-in CMake command that registers something to be copied out of the source tree into the install prefix when the install step runs. Nothing is copied when CMake parses this line; the line records an intention, and the copy happens during `colcon build`'s install phase.

`PROGRAMS` is the mode, and the choice of mode is load-bearing. CMake offers `install(FILES ...)` and `install(PROGRAMS ...)` which differ in exactly one respect: the permissions applied to the installed copy. `FILES` installs with default read permissions, roughly `644`. `PROGRAMS` installs with the execute bit set, roughly `755`. Since `ros2 run` works by executing the installed file, installing with `FILES` would produce a file that exists in the right place, is found correctly, and then fails with a permission error. This is the mode you want, and knowing *why* means you will diagnose that failure in seconds rather than minutes.

`scripts/constant_control.py` is the path to install, interpreted relative to the directory containing `CMakeLists.txt`, which is the package root. This is why your file must be at `s2_basic/scripts/constant_control.py` and not somewhere else: the path in the CMake file and the path on disk must agree.

`DESTINATION lib/${PROJECT_NAME}` is where the copy lands, interpreted relative to the install prefix. `${PROJECT_NAME}` is a variable CMake sets from the `project()` call near the top of the generated `CMakeLists.txt`, which `ros2 pkg create` wrote as `project(s2_basic)`. So this expands to `lib/s2_basic`, and the full path of the installed file ends up being `~/autonomy_ws/install/s2_basic/lib/s2_basic/constant_control.py`.

**Why does the destination have to be `lib/<package_name>` specifically?**

Because that is the exact directory `ros2 run` searches, and it is not configurable. When you type `ros2 run s2_basic constant_control.py`, the tool resolves the package name `s2_basic` to its install prefix by looking it up in the `AMENT_PREFIX_PATH` environment variable, then looks for an executable file named `constant_control.py` inside `<prefix>/lib/s2_basic/`. If it is not there, you get `No executable found`.

This convention is inherited from the Unix idea of *libexec*, a directory for programs that are meant to be invoked by other programs rather than typed by a user. Your node is exactly that: a program launched by `ros2 run` or by a launch file, never something a user would put on their `PATH`. Writing `DESTINATION bin` or `DESTINATION lib` or `DESTINATION share/${PROJECT_NAME}` will all build successfully and all fail to run, which is why this single line is the most common wall in Section 2.

```
   SOURCE TREE                                  INSTALL TREE
                                                (what ros2 run reads)

   s2_basic/                        install(PROGRAMS)
      CMakeLists.txt     ---------->  install/s2_basic/
      package.xml                        lib/s2_basic/
      scripts/                              constant_control.py   <-- 0755
         constant_control.py  ------>       ^
                                            |
                              ros2 run s2_basic constant_control.py
                              looks up s2_basic in AMENT_PREFIX_PATH,
                              then execs <prefix>/lib/s2_basic/<name>
```

**Where in the file should the block go, and why does that matter?**

Above the `ament_package()` call, which is the last line of the generated `CMakeLists.txt`. `ament_package()` is a macro that finalizes the package: it writes out the environment hooks, the package index entry, and the CMake config files that let other packages find this one. It is documented as needing to be the final call, and commands placed after it are not processed in the way you intend.

The failure this produces is nastier than a normal error because it is silent. Put the `install(PROGRAMS ...)` block after `ament_package()` and `colcon build` prints `Finished <<< s2_basic` with no warning at all, while the file is never installed. You then get `No executable found` from `ros2 run` and nothing anywhere tells you the build file is at fault. Build systems that fail silently on ordering mistakes are a recurring hazard, and the general defence is to verify the artifact rather than trusting the exit code. In this case, that means one command:

```bash
ls ~/autonomy_ws/install/s2_basic/lib/s2_basic/
```

If `constant_control.py` is listed there with an `x` in its permissions, the build half of the lab is correct and any remaining problem is in your Python or your environment. If it is absent, the problem is in `CMakeLists.txt` and no amount of staring at Python will help. Learning to split a problem in half with one cheap observation is a more valuable skill than any individual fact in this document.

---

## 6. How a text file becomes a program: the shebang, the execute bit, and exec

**What actually happens when something tries to execute your Python file?**

This is worth knowing precisely, because two of the lab's instructions, the `chmod +x` hint in Task 2.1 and the `#!/usr/bin/env python3` first line in the cheat sheet, are both about this mechanism, and students routinely treat them as magic incantations.

When `ros2 run` has located `constant_control.py`, it asks the operating system to execute it, which on Linux means the `execve` system call. The kernel does two checks and then one piece of inspection.

The first check is the permission bit. Every file carries nine permission bits, three each for owner, group and others, covering read, write and execute. `execve` on a file without the execute bit set for you returns the error `EACCES`, which surfaces as `Permission denied`. The execute bit does not make a file executable in any meaningful sense; it is purely a flag that says "the kernel is permitted to try." `chmod +x constant_control.py` sets that flag. This is why the lab bothers to hint at it: a freshly created file from `touch` or from an editor has mode `644`, with no execute bit anywhere.

The second step is that the kernel reads the first bytes of the file to work out what kind of executable it is. A compiled binary begins with the four bytes `0x7F E L F`, the ELF magic number, and the kernel loads it directly. Your file is text, so it does not match. But the kernel has a second case: if the first two bytes are `#!`, the file is a *script*, and the rest of that first line names an interpreter.

This two-byte marker is the **shebang**, and the mechanism is genuinely elegant. The kernel reads `#!/usr/bin/env python3`, and instead of executing your file, it executes `/usr/bin/env` and passes it the arguments `python3` and the path to your file. `env` then looks up `python3` on the `PATH` and execs that, handing it your filename, so Python ends up running your script. From the caller's point of view it simply ran your file; three `exec` calls happened underneath.

```
  ros2 run s2_basic constant_control.py
            |
            v
  execve("/.../lib/s2_basic/constant_control.py")
            |
            +--> kernel: is the execute bit set?   no  -> EACCES, "Permission denied"
            |                                      yes -> continue
            +--> kernel: read first bytes
                     0x7F ELF  -> load as a binary
                     "#!"      -> read interpreter line
                                    |
                                    v
                          execve("/usr/bin/env", ["python3", "/.../constant_control.py"])
                                    |
                                    v
                          env resolves python3 on PATH, execs it
                                    |
                                    v
                          Python interpreter runs your source
```

**Why `#!/usr/bin/env python3` rather than `#!/usr/bin/python3`?**

Because the shebang requires an absolute path to the interpreter, and the absolute path of `python3` is not the same on every system, nor inside every virtual environment. Hardcoding `/usr/bin/python3` names one specific interpreter and will quietly use the system Python even when a different one is active. Using `/usr/bin/env` as the interpreter, and `python3` as its argument, defers the decision to `PATH` lookup at execution time, which picks up whichever Python the environment has selected. The cost is one extra process; the benefit is that the same file works across machines and environments. This idiom is near universal in ROS code for exactly that reason.

**What is the significance of the `if __name__ == "__main__":` block at the bottom?**

Python sets the module-level variable `__name__` to the string `"__main__"` when a file is run as the top-level program, and to the module's own name when the file is imported by something else. Guarding your startup code with that condition means the file behaves as a program when executed and as an importable module when imported, with no side effects on import. For a ROS node this matters more than it might seem: a test suite, or another node, may well want to `import` your module to construct your node class directly without spinning it, and an unguarded `rclpy.init()` at module scope would make that impossible.

---

## 7. rclpy: the context, the node, and the object graph you are building

**What is rclpy, and where does it sit in the stack?**

`rclpy` is the Python client library for ROS 2. It is a thin layer over `rcl`, a C library that holds the actual implementation of nodes, publishers, subscriptions, timers and the rest. Below `rcl` sits `rmw`, the ROS middleware abstraction, and below that a concrete DDS implementation, by default `rmw_fastrtps_cpp` on Humble, which is what finally puts bytes on the wire. The practical consequence of this layering is that `rclpy` is a set of Python bindings to C objects rather than a pure Python framework, which explains some of its sharper edges, including the strict type checking on message fields that section 10 covers.

```
   your constant_control.py
            |
         rclpy            Python client library
            |
          rcl             C client library: nodes, pubs, subs, timers, executors
            |
          rmw             middleware abstraction layer
            |
      rmw_fastrtps_cpp    the default DDS implementation on Humble
            |
        DDS / RTPS        discovery, shared memory, UDP multicast
```

**What does `rclpy.init()` do, and why must it come first?**

`rclpy.init()` creates and initializes the global **context**. A context is the container for everything ROS does in this process: it holds the middleware state, the parsed command line arguments relevant to ROS, and the set of nodes created against it. Until a context exists there is nothing for a node to be created *in*, which is why every `rclpy` call after this one depends on it and why calling `Node(...)` before `rclpy.init()` raises an error immediately.

It also performs discovery setup. Part of what makes ROS 2 feel like magic is that two processes started independently find each other with no broker and no configuration, and the mechanism is DDS discovery: on initialization, the middleware begins announcing itself and listening for announcements over UDP multicast on the local network, scoped by the `ROS_DOMAIN_ID` environment variable. The primer's section on discovery covers the two environment variables involved; what matters here is that `rclpy.init()` is the moment your process joins that conversation.

**What does `super().__init__("constant_control")` do, and why must it be the first line of your `__init__`?**

Your class inherits from `rclpy.node.Node`, and this call runs the parent class's constructor, which is where the real node gets created: it registers the name `constant_control` with the ROS graph, sets up the node's clock, creates its default callback group, and allocates the underlying `rcl` node handle.

It must come before anything else in your `__init__` because every other method you call on `self`, including `create_publisher`, `create_timer` and `create_subscription`, operates on state that this constructor establishes. Call `self.create_publisher(...)` before `super().__init__(...)` and you get an `AttributeError` or worse, because the attributes those methods reach for do not exist yet. The lab's cheat sheet flags this with the comment "must happen before everything else", and the reason is simply ordinary Python object initialization rather than anything ROS-specific.

The string you pass is the **node name**, and it is a real identifier in the distributed system, not a label. It is what `ros2 node list` prints, what `ros2 node info` takes as an argument, and what namespaces apply to. Two nodes with the same name running simultaneously is legal but produces confusing behaviour in introspection tools, so names should be unique in practice.

**What is the object graph you have built by the end of `__init__`?**

Three objects, all owned by the node, all created by factory methods on it rather than by direct construction:

```
   ConstantControl (a Node, named "constant_control")
      |
      +-- self.cmd_vel_pub      Publisher(Twist, "/cmd_vel", qos=10)
      |                          outbound: you call .publish() on it
      |
      +-- self.control_timer    Timer(period=0.2s, callback=self.control_callback)
      |                          internal: the executor calls your callback
      |
      +-- self.kill_sub         Subscription(Bool, "/kill", self.kill_callback, qos=10)
                                 inbound: the executor calls your callback
```

Notice the asymmetry in who calls whom, because it is the key to understanding the next section. The publisher is something *you* call. The timer and the subscription are things that call *you*. Your `__init__` does not start anything running; it registers three objects with the node and returns. Nothing happens until something drives them, and that something is the executor.

The reason these are created through `self.create_publisher(...)` rather than `Publisher(...)` is lifetime management. The node must keep a reference to every entity it owns so it can tear them down cleanly on destruction, and so the executor can find them when building its wait set. Constructing one directly would leave it unregistered and inert.

---

## 8. The publisher, and what "publish" actually does

**What do the three arguments to `create_publisher` mean?**

```python
self.cmd_vel_pub = self.create_publisher(Twist, "/cmd_vel", 10)
```

The first argument is the **message type**, passed as the Python class itself rather than a string. This is how the middleware learns the shape of the data: from the class it can obtain the generated type support structure that tells DDS how to serialize and deserialize instances. Type is part of a topic's identity, which means a publisher of `Twist` on `/cmd_vel` and a subscriber of `String` on `/cmd_vel` will not connect at all. They are two unrelated endpoints that happen to share a name string, and no error is reported, you simply see no data.

The second argument is the **topic name**. The leading slash makes it absolute, meaning it is not affected by any namespace the node is launched into. Without the slash, `cmd_vel` is relative and would become `/<namespace>/cmd_vel` if the node were pushed into a namespace. For this lab either works, since you launch with no namespace, but absolute is the safer habit when you are targeting a topic another process already owns.

The third argument is the **quality of service**, and `10` is shorthand. ROS 2 lets you pass either a full `QoSProfile` object or a bare integer, and an integer is interpreted as the history depth of an otherwise default profile: keep the last 10 messages, reliable delivery, volatile durability. "Keep last 10" means the outbound queue holds at most ten messages, and an eleventh pushes out the oldest.

**Why does QoS exist at all, and when will it bite you?**

QoS exists because the right delivery guarantee genuinely differs by data type. A command sent to a robot's motors should arrive, so reliable delivery with retransmission is appropriate. A stream of lidar scans at 10 Hz should not block the publisher waiting on acknowledgements, and a dropped frame is cheaper than a stalled pipeline, so best-effort is appropriate there.

The part that bites is that QoS is *negotiated*, and incompatible profiles silently fail to connect. A reliable subscriber cannot match a best-effort publisher, because the publisher cannot promise what the subscriber demands. When that happens you get a topic that lists correctly in `ros2 topic list`, shows a publisher and a subscriber in `ros2 topic info`, and delivers nothing. For `/cmd_vel` the default profile is conventional and correct on both sides, so this lab will not expose you to it, but the earlier primer covers it because sensor topics will.

**What physically happens inside `publish()`?**

```python
self.cmd_vel_pub.publish(msg)
```

The call descends through `rclpy` into `rcl` and then `rmw`, which serializes your message object into the CDR wire format, the binary representation DDS uses, and hands the buffer to the DDS implementation. DDS has by this point already discovered every matched subscription, so it knows where the data goes. For subscribers in other processes on the same machine, delivery is typically via shared memory or loopback UDP; across machines it is UDP over the network. Within the same process, modern ROS 2 can sometimes pass the message by pointer and skip serialization entirely.

Three properties of this call matter for how you write code around it. It is **asynchronous**: `publish` hands off the buffer and returns, it does not wait for anyone to receive anything, so a return from `publish` is not evidence of delivery. It is **fire and forget with no addressing**: you never name a recipient, you name a topic, and zero or many subscribers may be attached. And publishing to a topic with no subscribers at all is completely legal and completely silent, which is a frequent source of confusion during this lab; if you run your node without the simulator running, everything appears to work and nothing moves.

This anonymity is the central design decision of publish-subscribe middleware, and it is what lets you write and test your control node without the simulator, swap the simulator for a real TurtleBot with no code change, and attach `ros2 topic echo` as an extra observer without telling your node.

---

## 9. Timers, callbacks, and the executor: what spin() is really doing

**What does `create_timer` register?**

```python
self.control_timer = self.create_timer(0.2, self.control_callback)
```

The first argument is the period in seconds, as a float. The second is the callback, passed as a bound method object rather than called: note carefully that there are no parentheses after `self.control_callback`. Writing `self.control_callback()` would call the function immediately and register its return value, `None`, as the callback, producing a confusing failure. Passing functions as values rather than calling them is the single most common Python error in this lab.

A timer is not a thread and does not sleep. It is an entry in a table of timers the node owns, each holding a period and a next-fire time computed against the node's clock. Nothing about it runs on its own. It becomes "ready" when its next-fire time passes, and something else has to notice that and call your callback.

A note on which clock: by default a node uses system time, but if the `use_sim_time` parameter is set true the node uses `/clock` published by the simulator instead, so timers follow simulated time and slow down or speed up with it. You will not set this in Section 2, but it is the reason a node can behave differently in simulation than on hardware, and it is worth knowing the parameter exists.

**What does `rclpy.spin(node)` actually do?**

This one line is where your program spends essentially all of its life, and treating it as an opaque "run the node" call leaves you unable to reason about most concurrency bugs you will meet this quarter.

`rclpy.spin(node)` constructs a `SingleThreadedExecutor`, adds your node to it, and then loops forever doing the following. It collects every entity on the node that can become ready, meaning all timers, subscriptions, service servers and clients, and assembles them into a **wait set**. It then blocks in a single system call, waiting until at least one of those entities is ready: a timer's deadline has passed, or a message has arrived for a subscription. When the wait returns, the executor takes the ready entities and executes their callbacks, one at a time, in the current thread. Then it loops and waits again.

```
   rclpy.spin(node)
      |
      v
   +-------------------------------------------------+
   |  build wait set: [control_timer, kill_sub]      |
   |            |                                    |
   |            v                                    |
   |  BLOCK until something is ready                 |
   |            |                                    |
   |     +------+-------------------+                |
   |     |                          |                |
   |  timer deadline passed     message on /kill     |
   |     |                          |                |
   |     v                          v                |
   |  control_callback()        kill_callback(msg)   |
   |     (runs to completion)      (runs to          |
   |     |                          completion)      |
   |     +------+-------------------+                |
   |            |                                    |
   |            v                                    |
   |        loop back and wait again  ---------------+
   +-------------------------------------------------+

   ONE thread. Callbacks never overlap. A slow callback delays all others.
```

**What follows from "one thread, callbacks never overlap"?**

Three things, and they are the practical payload of this section.

First, you do not need locks. Your `kill_callback` writes to the same node state that `control_callback` reads, and in a multithreaded program that would demand synchronization. Under a single-threaded executor the two callbacks are strictly serialized, so there is no race to protect against. This is a real simplification and it is why the default executor is single-threaded.

Second, a callback that blocks blocks everything. If `control_callback` took a full second to run, the executor could not service `/kill` during that second, and your emergency stop would respond up to a second late. This is why the standing rule in ROS is that callbacks must return quickly: no `time.sleep`, no synchronous network requests, no long computations. Work that takes time belongs in an action server or a separate thread, not in a callback. For a safety-critical path like a kill switch, this stops being a style preference and becomes a correctness requirement.

Third, timer periods are a floor, not a guarantee. The timer becomes ready at 0.2 second intervals, but the callback runs when the executor gets to it, so if another callback is mid-execution the timer waits. Over time this means your 5 Hz publication rate is approximately 5 Hz, and `ros2 topic hz /cmd_vel` will show you the real number, which is a useful habit when debugging a control loop that feels sluggish.

**What does `rclpy.shutdown()` do, and why is it after `spin`?**

`rclpy.spin` only returns when the context is shut down, which in practice means you pressed Ctrl-C and the default signal handler shut it down. `rclpy.shutdown()` then finalizes the context: it destroys the node, tears down the publishers and subscriptions, and tells DDS to announce its departure so other nodes stop considering it a match. Skipping it mostly works, since process exit reclaims everything, but it can leave stale discovery state briefly and makes a clean shutdown non-deterministic. Including it is correct and costs one line.

---

## 10. Messages as contracts: Twist, differential drive, and why only two fields matter

**What is a ROS message, fundamentally?**

A message type is a language-independent data structure definition, written in an interface definition language in a `.msg` file, and compiled at build time into concrete classes for every supported language. `geometry_msgs/msg/Twist` is defined as:

```
Vector3  linear
Vector3  angular
```

and `Vector3` is in turn three `float64` fields named `x`, `y` and `z`. So a `Twist` is six double-precision numbers in a fixed order with fixed names, and that layout is the contract.

The significance of compiling from a neutral definition is interoperability. Your Python node publishes a `Twist`; the Gazebo bridge consuming it is C++. Both sides were generated from the same `.msg` file, so both agree exactly on the wire layout, and neither had to know the other's language. This is also why `asl_tb3_msgs` exists as its own package in your `tb_ws`, as the primer notes: message definitions must be compiled, and both publisher and subscriber need the generated code, so shared types live in a package others depend on.

**What does `Twist` mean physically, and why does the lab say to set only two fields?**

A `Twist` is the standard representation of a rigid body's instantaneous velocity in three dimensions: `linear` is translational velocity in metres per second along the body's x, y and z axes, and `angular` is rotational velocity in radians per second about those same axes. A free-flying body genuinely needs all six numbers.

A TurtleBot 3 is a **differential drive** robot: two independently driven wheels on a common axle, plus a passive caster. Its two motor speeds give it exactly two degrees of freedom in its velocity: it can drive forward and backward, and it can rotate about its own vertical axis. It physically cannot translate sideways without first rotating, a property called **nonholonomic**, which is why parallel parking is hard and why a shopping trolley cannot slide left.

The mapping from the two wheel speeds to the two controllable velocity components, with wheel radius `r`, wheel separation `L`, and left and right angular wheel speeds, is:

```
   v     = r * (w_right + w_left) / 2        forward speed   -> Twist.linear.x
   omega = r * (w_right - w_left) / L        yaw rate        -> Twist.angular.z
```

Everything else in the `Twist` has no realizable value on this robot. `linear.y` would be sideways motion, `linear.z` would be flight, `angular.x` and `angular.y` would be roll and pitch. The driver simply ignores those fields, so setting them is harmless but meaningless. Hence the lab's instruction:

```python
msg = Twist()        # all six fields zero-initialized
msg.linear.x = ...   # the linear velocity, metres per second
msg.angular.z = ...  # the angular velocity, radians per second
```

The zero-initialization is itself useful and is what makes the emergency stop in section 11 a one-liner: a freshly constructed `Twist()` is already the full-stop command, so you never have to set six fields to zero by hand.

**What is `/cmd_vel`, and who decided on that name?**

Nobody decided formally; it is a convention that became near universal across ROS, and its weight comes from that ubiquity rather than from a specification. A huge amount of ROS software, including teleoperation tools, navigation stacks and nearly every mobile base driver, publishes or subscribes velocity commands as `geometry_msgs/msg/Twist` on a topic called `/cmd_vel`. Because `asl_tb3_sim` follows it, your node drives the simulated robot without either side having been written with the other in mind, and the same node would drive a real TurtleBot with no change. Conventions like this are the actual mechanism by which a software ecosystem becomes composable, which is worth appreciating as a design lesson separate from the robotics.

**What is the type error that will catch you, and why does it happen?**

This one is almost guaranteed to cost you a few minutes, so it is worth knowing in advance. Writing

```python
msg.linear.x = 1
```

raises an `AssertionError` complaining that the field must be of type `float`. The reason traces back to the layering in section 7: these message classes are typed views over a C structure, and `linear.x` is a C `double`. The generated Python setter validates the type strictly rather than coercing, because a silent coercion would hide genuine mistakes in code that is about to drive a physical robot. Python's own willingness to treat `1` and `1.0` as interchangeable does not extend here.

The fix is to always write velocities as float literals, `1.0` rather than `1`, and if a value arrives from a computation that might yield an integer, wrap it in `float(...)`. Defining your constants at module scope as floats, as `V_CONST = 0.2`, sidesteps the problem entirely and also makes the node easier to tune.

---

## 11. The subscription, and building an emergency stop that actually stops

**What do the four arguments to `create_subscription` mean?**

```python
self.kill_sub = self.create_subscription(Bool, "/kill", self.kill_callback, 10)
```

The message type, the topic name and the QoS depth carry exactly the same meanings as in `create_publisher`, and the same matching rules apply: type and topic must agree with the publisher's, and QoS must be compatible, or the endpoints never connect.

The new argument is the third, the callback. This is the function the executor will invoke, with the received message as its single argument, each time one arrives. As with the timer, pass the method without parentheses.

The callback signature therefore must accept exactly one parameter besides `self`:

```python
def kill_callback(self, msg: Bool) -> None:
```

The type annotation is documentation for you and is not enforced; the parameter will receive a `Bool` message object regardless. Note that this is a *message* of type `std_msgs/msg/Bool`, not a Python `bool`, which is why you have to reach inside it for `msg.data`. A `std_msgs/msg/Bool` is a message with a single field named `data` of type `bool`, and writing `if msg:` instead of `if msg.data:` would test whether the message object exists, which it always does, producing a kill switch that fires on every message including `false`. That is a genuinely dangerous bug and an easy one to write.

**What should the callback do, and why does the order of the two actions matter?**

Task 4.1 specifies two actions, stop the timer and publish a zero control, and lists them in that order.

```python
def kill_callback(self, msg: Bool) -> None:
    if msg.data:
        self.control_timer.cancel()
        self.cmd_vel_pub.publish(Twist())
        self.get_logger().warn("kill received, control stopped")
```

`self.control_timer.cancel()` marks the timer inactive. It stays in the node's timer table and can be revived later with `self.control_timer.reset()`, but while cancelled it never becomes ready, so the executor never calls `control_callback` again, and the stream of nonzero commands stops at the source. This is why cancelling the timer is the real stop and publishing zero is the follow-up: if you only published a zero `Twist` without cancelling, the next timer tick 0.2 seconds later would publish a nonzero command again and the robot would carry on after a brief stutter.

`self.cmd_vel_pub.publish(Twist())` sends the all-zero velocity. This is necessary because the simulator, like a real robot driver, holds the last commanded velocity until told otherwise. Silence is not a stop command; a differential drive base that stops receiving messages keeps doing whatever it was last told to do, at least until a watchdog timeout if one exists. The explicit zero is what actually brings the robot to rest.

Cancelling before publishing is the correct order, and the reasoning is worth following even though the single-threaded executor makes it moot in this specific program. Under the single-threaded executor your `kill_callback` runs to completion without interruption, so no timer callback can interleave between the two statements. But if you later move to a multithreaded executor with these callbacks in different callback groups, publishing zero first and cancelling second opens a window in which a timer tick fires between the two statements and the last message on the wire is a nonzero command. The robot then drives away after a successful kill. Writing the ordering correctly now costs nothing and means the code remains correct when the concurrency model changes underneath it. Safety logic should be ordered so that it is correct under the weakest assumptions you can manage, not merely under the ones currently in force.

**Why use `self.get_logger()` rather than `print()`?**

`get_logger()` returns the node's logger, and logging through it attaches the node name, a severity level and a timestamp, routes the output through the ROS logging system so it can be captured by launch files and written to log files under `~/.ros/log`, and lets severity be filtered at runtime. The available levels are `debug`, `info`, `warn`, `error` and `fatal`. A bare `print` writes to standard output with none of that structure, and in a system running fifteen nodes, unlabelled output is nearly useless.

For Task 2.2, where the lab asks you to print "sending constant control...", either satisfies the literal wording, and `self.get_logger().info(...)` is the better habit. For the kill message, `warn` is the appropriate level: it is not an error, since the system did exactly what it was told, but it is an abnormal condition the operator should see.

---

## 12. colcon, symlink-install, and the edit-build-run loop

**What does `colcon build` do, in order?**

The primer covers colcon's role and the underlay and overlay model, so this section covers only what Section 2 adds, which is the install step and the symlink flag.

Run from `~/autonomy_ws`, `colcon build` scans `src/` recursively for `package.xml` files, reads each manifest to build a dependency graph, computes a topological order, and then for each package in that order runs the build type's workflow. For `ament_cmake` that means configuring with CMake, building with the generated Makefiles, and then running the install step, which is where your `install(PROGRAMS ...)` directive is finally acted on. It writes three directories at the workspace root: `build/` for intermediate state, `install/` for the finished product, and `log/` for build logs.

For `s2_basic` there is nothing to compile, so the entire build is metadata plus one file copy, which is why the expected output in Task 1.4 shows it finishing in under a second.

**What does `--symlink-install` change, and what is the trap in it?**

```bash
colcon build --symlink-install
```

Without the flag, the install step *copies* files from the source tree into `install/`. With it, colcon creates **symbolic links** pointing back at your source files instead. The installed path `install/s2_basic/lib/s2_basic/constant_control.py` becomes a link to `src/<repo>/s2_basic/scripts/constant_control.py`.

The payoff is a much tighter development loop. Because `ros2 run` executes the installed path, and the installed path *is* your source file, editing the source changes what runs immediately. You edit, you re-run, with no rebuild in between. For an interpreted language this is a large saving repeated hundreds of times over a quarter.

The trap is assuming it means you never rebuild again. The symlink makes the *contents* of an already-installed file live; it does nothing about the set of installed files or the build configuration. You must rebuild when you add a new file, when you edit `CMakeLists.txt`, when you edit `package.xml`, and when you create a new package. All of those change what should be installed rather than what is inside something already installed. The rule that covers every case: if you changed Python inside an installed file, just re-run; if you changed anything about the structure, rebuild.

```
   EDIT a line inside constant_control.py        -> just re-run, no build
   ADD a second script, new_node.py              -> rebuild (new install target)
   EDIT CMakeLists.txt or package.xml            -> rebuild
   CREATE a new package                          -> rebuild, then re-source
```

**Why does the lab tell you to source after building, and when is sourcing genuinely required?**

```bash
source ~/autonomy_ws/install/setup.bash
```

`source` is a shell builtin that reads a file and executes its lines in the *current* shell rather than in a child process, which is the whole point: the script's job is to set environment variables, and a child process could not affect its parent. The variables it sets include `AMENT_PREFIX_PATH`, which is the list of install prefixes that `ros2 run` and `ros2 launch` search to resolve a package name, and `PYTHONPATH`, so Python can import modules from workspace packages.

Sourcing is required in two situations and the distinction is worth holding. Every new terminal needs it, because environment variables are per-process and a fresh shell starts without them; this is what the lab means by "required whenever you open a new terminal", and you will have three terminals open during Task 3.2. Separately, an existing terminal needs a re-source after the first build of a *new* package, because `AMENT_PREFIX_PATH` was computed before that package existed. The failure in that case is `Package 's2_basic' not found` in a shell where everything else works, and the fix is one `source` rather than any debugging.

The flip side of the same mechanism produces the opposite confusion: after a rebuild, terminals you already had open still hold the environment from before, so if you changed something structural and re-ran in an old terminal you may see stale behaviour. The primer states the rule plainly, and it is worth repeating because it reliably costs people twenty minutes at least once: after a build, open a new terminal or re-source.

One practical note specific to your setup. Your container's `.bashrc` already sources `/opt/ros/humble/setup.bash` and your `tb_ws`, which is why `ros2` and `asl_tb3_sim` work in any fresh terminal without thinking. It does **not** source `autonomy_ws`, because that workspace did not exist when the Dockerfile was written. Adding that one line to `.bashrc` would remove a whole class of error from the rest of your quarter, at the cost of needing the workspace to exist for every shell. I think the trade is clearly worth it once you have finished Section 2, though during the lab itself typing it by hand is better teaching.

---

## 13. Running and inspecting: run, launch, topic list, echo, pub

**How does `ros2 run` differ from `ros2 launch`?**

```bash
ros2 run s2_basic constant_control.py
ros2 launch asl_tb3_sim signs.launch.py
```

`ros2 run` starts exactly one executable from one package. It takes a package name and an executable name, resolves the package to its install prefix via `AMENT_PREFIX_PATH`, looks in `<prefix>/lib/<package>/` for a file with that name, and executes it. Note that for a Python script installed this way the executable name includes the `.py` extension, because the installed filename is what you are naming and the installed filename retains it.

`ros2 launch` runs a launch file, which is a Python program describing a set of processes to start together with their parameters, remappings and namespaces. `signs.launch.py` brings up the Gazebo server, spawns the TurtleBot model into the world, starts the bridge between Gazebo's transport and ROS topics, and starts the supporting nodes, all in one command and in the right order. The primer's section on launch files details what the ASL launch files start.

The practical division: `ros2 run` is what you use while developing a single node, `ros2 launch` is what you use to bring up a system. Once your node is finished it would normally be added to a launch file rather than started by hand.

**What is `ros2 topic list` doing, and what does it prove?**

```bash
ros2 topic list
```

It queries the ROS graph, which the middleware maintains through discovery, and prints every topic that currently has at least one publisher or subscriber. It is a view of a live distributed system rather than a static configuration, which is why it only shows `/cmd_vel` once something is actually connected to it.

Its value in this lab is as a cheap confirmation that two independent processes have found each other. If you launch the simulator and `/cmd_vel` appears, the simulator is subscribing. If you then start your node and nothing moves, you have narrowed the problem considerably: discovery worked and the topic exists, so the fault is in what you are publishing, not in whether you are connected. Add `ros2 topic info /cmd_vel --verbose` and you see the publisher and subscriber counts and their QoS profiles, which distinguishes a type or QoS mismatch from a logic error.

The lab document has a typo here, printing `ros2 topic lis`, which will give you an unknown command error. The command is `ros2 topic list`.

**What does `ros2 topic echo` do, and why is it the right debugging tool?**

```bash
ros2 topic echo /cmd_vel
```

It creates a subscription to the named topic and prints every message it receives as YAML. It works because of the anonymity described in section 8: your node has no idea it has gained a second subscriber, and nothing about its behaviour changes. You can attach and detach observers to a running system freely.

This makes it the first thing to reach for when something is not working, because it separates "am I sending the right thing" from "is the receiver doing the right thing with it". If `echo` shows `linear.x: 0.2` five times a second and the robot is still stationary, your node is correct and the problem is on the simulator side. Adding `--once` prints a single message and exits, which is convenient when you want one sample rather than a scrolling wall, and `ros2 topic hz /cmd_vel` prints the measured publication rate, which is how you verify your 0.2 second timer is really giving you 5 Hz.

**What does the kill command's strange syntax mean, character by character?**

```bash
ros2 topic pub /kill std_msgs/msg/Bool data:\ true -1
```

`ros2 topic pub` creates a temporary publisher from the command line, which is how you inject a message into a running system without writing a program. It takes the topic name, then the message type as a fully qualified string, then the message content.

The content is given as **YAML**, because that is the serialization ROS 2 command line tools use for message literals, and `data: true` is a YAML mapping with one key. The field name `data` is not arbitrary: it is the single field of `std_msgs/msg/Bool`, the same field you read as `msg.data` in your callback.

The backslash in `data:\ true` is pure shell mechanics and has nothing to do with ROS. YAML requires a space after the colon, but the shell splits arguments on spaces, so an unescaped `data: true` would arrive as two separate arguments and the command would fail to parse. The backslash escapes the space so the shell passes `data: true` as one argument. Quoting achieves the same thing and is easier to read, so `ros2 topic pub /kill std_msgs/msg/Bool "{data: true}"` is equivalent and is what I would type.

The trailing `-1` is the short form of `--once`: publish one message, then exit. Without it, `ros2 topic pub` publishes repeatedly at 1 Hz until interrupted, which for a kill switch would work but would leave a publisher running and hold the topic open. Note also that because publishing is anonymous, this command demonstrates something real about your design: the kill signal can come from a shell, from another node, or from a hardware button, and your node neither knows nor cares which.

---

## 14. The git and GitHub workflow this lab wraps up with

**What is different about git in this lab compared to Section 1?**

The mechanics are covered in the [Linux, Git and GitHub primer](linux-git-github-primer-2026-09-30.md), so this section covers only what Section 2 changes, which is that the work is now collaborative and therefore branch discipline starts to matter for real reasons rather than as an exercise.

In Section 1 you worked alone in your own repository, and a branch was a formality. In Section 2 the repository is shared by your group, several people are committing, and the branch `section2` exists so that your work is reviewable as a unit before it joins `main`. Task 1.2 has you clone and immediately branch:

```bash
git clone <url>
git checkout -b section2
```

`git checkout -b section2` creates a new branch pointing at your current commit and switches to it in one step, equivalent to `git branch section2` followed by `git checkout section2`. From that moment your commits accumulate on `section2` and `main` is untouched.

**What does the `-u` in `git push -u origin section2` do?**

```bash
git push -u origin section2   # first push of a new branch
git push                      # every push after that
```

A local branch you just created exists only on your machine; `origin` has never heard of it. The first push must therefore name both the remote and the branch. The `-u` flag, long form `--set-upstream`, additionally records in your local git configuration that `section2` tracks `origin/section2`. Once that association exists, git can infer the destination, so subsequent pushes need no arguments, and `git status` gains the ability to tell you how many commits you are ahead or behind.

This is exactly the configuration you can see in your own Section 1 repository, where `git status -sb` reports `## section1...origin/section1`; the part after the dots is the recorded upstream.

**What is a pull request, and why does the lab require one?**

A pull request is a GitHub concept, not a git one, which is worth being precise about because the distinction clarifies a lot of confusion. In git, merging a branch is a local operation you could do yourself in a second. A pull request is a *request for review*: a durable page that shows the diff between your branch and the target, collects comments, runs checks, and records who approved before the merge happened.

For your group, that is the mechanism by which three people's work gets looked at before it lands. For your CAs, it is the artifact they sign off on, which is why the final checkpoint asks you to show the PR rather than the code. You can create it two ways:

```bash
gh pr create
```

`gh` is GitHub's official command line client, and `gh pr create` talks to the GitHub REST API to open the pull request, prompting for a title and body and inferring the base and head branches from your local state. The alternative is to open the repository in a browser, where GitHub will offer a banner to open a PR from a recently pushed branch. Both produce the identical object; the CLI version is faster and keeps you in the terminal.

**What is the device flow that `gh auth login` walks you through, and why does the lab pick HTTPS?**

`gh auth login` performs an OAuth 2.0 **device authorization grant**, which is the flow designed for clients that cannot host a browser redirect. `gh` asks GitHub for a short user code, displays it, and opens the browser to a verification page. You enter the code and approve the scopes there, authenticated as yourself on GitHub. Meanwhile `gh` polls GitHub asking whether that code has been approved yet, and once it has, GitHub returns an access token, which `gh` stores. The token, not your password, is what every subsequent operation uses. This is why the lab's step 4 has you note a code and press enter to open a browser, and step 5 has you return to the terminal.

The lab's step 2 has you select HTTPS as the git protocol, and this choice matters more for you specifically than for a student on a lab machine. Selecting HTTPS configures git to authenticate pushes using the token `gh` just obtained, via a credential helper. Selecting SSH would configure git to authenticate using an SSH key pair, which must exist and be registered with GitHub. On your setup, your ed25519 key lives in WSL at `~/.ssh` and is not forwarded into the dev container, so an SSH choice inside the container produces a permissions failure that reads like an account problem and sends people hunting in the wrong place. Choose HTTPS.

One further detail worth knowing, because it is non-obvious and it affects what `gh auth logout` does to you. The container has its own `gh` configuration at `~/.config/gh/hosts.yml`, entirely separate from the `gh` installed on your Windows host. Logging out inside the container therefore has no effect on your Windows login, and vice versa. The two are independent credential stores that happen to share a command name.

---

## 15. Every command in the lab, and what it fundamentally does

**The shell and filesystem commands**

`mkdir -p ~/autonomy_ws/src` creates a directory. The `-p` flag means "create parent directories as needed and do not error if it already exists", which is what makes it safe to re-run and lets it create both levels of the path in one call.

`cd <directory>` changes the shell's working directory, which is the implicit first argument to nearly every other command and the reason Task 2.5 cares so much about where you are.

`ls` lists directory contents. `ls -l` adds the long form with permissions, which is how you confirm the execute bit is set, and `ls -la` includes hidden dotfiles.

`touch <file>` creates an empty file if it does not exist, or updates its modification timestamp if it does. Its original purpose was the timestamp; creating empty files is a side effect that became its common use.

`chmod +x <file>` sets the execute permission bit, as section 6 describes. The mnemonic is "change mode".

`source <file>` reads a file of shell commands and executes them in the current shell, used for setup scripts that must modify your environment rather than a child's.

`code <file>` and `vim <file>` open an editor. `code` is the VS Code CLI, and in your dev container it opens the file in the VS Code window already attached to the container.

**The ROS commands**

`ros2 pkg create --build-type ament_cmake <name>` scaffolds a new package: a directory containing `package.xml`, `CMakeLists.txt`, and empty `src/` and `include/` directories, with the build type recorded in the manifest.

`colcon build --symlink-install` builds every package under `src/`, run from the workspace root, linking rather than copying installed files.

`ros2 run <package> <executable>` resolves a package to its install prefix and executes a named program from `<prefix>/lib/<package>/`.

`ros2 launch <package> <launch_file>` executes a launch file from a package's share directory, starting a set of processes together.

`ros2 topic list` prints every topic in the live graph with at least one endpoint.

`ros2 topic info <topic> --verbose` prints a topic's type, its publisher and subscriber counts, and each endpoint's QoS profile, which is how you diagnose a connection that should exist and does not.

`ros2 topic echo <topic>` subscribes and prints received messages as YAML; `--once` prints one and exits.

`ros2 topic hz <topic>` measures and prints the actual publication rate.

`ros2 topic pub <topic> <type> <yaml> -1` publishes one message from the command line, where `-1` is the short form of `--once`.

`ros2 node list` prints the node names currently in the graph, which confirms your node started and registered under the name you expected.

**The git and GitHub commands**

`git clone <url>` copies a remote repository, including its full history, into a new local directory and records the source as the remote named `origin`.

`git checkout -b <name>` creates a branch at the current commit and switches to it.

`git checkout <name>` switches to an existing branch.

`git add <path>` stages changes, meaning it copies the current state of those paths into the index, the staging area that will form the next commit.

`git commit -m "<message>"` records the staged contents as a new commit on the current branch, with your configured name and email as author.

`git push -u origin <branch>` uploads the branch to `origin` and records the tracking relationship so later pushes need no arguments.

`git status -sb` shows the working tree state in short form with the branch and its tracking information, which is the single most useful orientation command in git.

`gh auth login` authenticates the GitHub CLI via the device flow and configures git's credential helper.

`gh auth logout` removes the stored token for a host, affecting only the `gh` installation you run it from.

`gh pr create` opens a pull request from the current branch via the GitHub API.

---

## 16. Glossary

**ament** The ROS 2 build system conventions layer, wrapping CMake and setuptools. `ament_cmake` and `ament_python` are its two package build types.

**AMENT_PREFIX_PATH** The environment variable listing install prefixes that ROS tooling searches to resolve package names. Set by sourcing a setup script.

**Callback** A function you supply and something else calls. Timers and subscriptions both work by callback, invoked by the executor.

**Callback group** A node's mechanism for controlling which callbacks may run concurrently. Section 2 uses only the default group, where nothing runs concurrently.

**CDR** Common Data Representation, the binary wire format DDS uses to serialize messages.

**colcon** The build tool that builds every package under a workspace's `src/`.

**Context** The per-process container for ROS state, created by `rclpy.init()`.

**DDS** Data Distribution Service, the publish-subscribe middleware standard underneath ROS 2, responsible for discovery and transport.

**Differential drive** A two-wheel drive configuration with two controllable velocity components, forward speed and yaw rate, and no sideways motion.

**Executor** The object that waits for entities to become ready and invokes their callbacks. `rclpy.spin` uses a single-threaded one.

**Manifest** `package.xml`, the file declaring a package's identity and dependencies.

**Nonholonomic** A system whose reachable velocities are fewer than its degrees of freedom in position. A differential drive robot can reach any pose but cannot translate sideways directly.

**Overlay and underlay** Layered ROS environments, where a later-sourced workspace shadows packages of the same name in earlier ones. Covered in the earlier primer.

**Package** The ROS unit of software, defined by containing a `package.xml`.

**QoS** Quality of Service, the per-endpoint delivery policy, negotiated between publisher and subscriber. Incompatible profiles silently fail to connect.

**rclpy** The Python client library for ROS 2, bound to the C library `rcl`.

**Shebang** The `#!` at the start of a script, naming the interpreter the kernel should run it with.

**Twist** `geometry_msgs/msg/Twist`, six doubles representing linear and angular velocity. The conventional message type for `/cmd_vel`.

**Wait set** The collection of timers, subscriptions and other entities an executor blocks on, waiting for any one to become ready.

**Workspace** A directory with a `src/` subdirectory, the unit `colcon build` operates on.

---

## Closing

### What you now know

Section 2 builds one Python process that publishes `geometry_msgs/msg/Twist` velocity commands onto `/cmd_vel` five times a second and listens on `/kill` for an emergency stop, while an entirely separate Gazebo process launched from `asl_tb3_sim` subscribes to those commands and simulates a TurtleBot responding to them. The two processes find each other through DDS discovery with no configuration and no broker, which is the property that makes the architecture composable: the same node drives a real robot unchanged, and `ros2 topic echo` can attach as an extra observer without your node knowing.

The lab's directory structure is three distinct concepts nested inside one another, and keeping them separate prevents most of the available failures. `~/autonomy_ws` is a workspace, a disposable local build unit defined by having a `src/`. Inside `src/` sits your group's git repository, a unit of collaboration that ROS knows nothing about. Inside that sits `s2_basic`, a ROS package, defined by containing a `package.xml`. `colcon` finds the package by scanning `src/` recursively, which is why it must be invoked from the workspace root and why invoking it elsewhere silently writes build artifacts into your git repository.

Two metadata files turn a Python script into a node. `package.xml` declares dependencies, using `exec_depend` rather than `build_depend` because nothing in a Python node is compiled and the dependency only materializes at `import` time; the lab's list is incomplete, since Task 3.1 imports `geometry_msgs` and never declares it, which works only because that package happens to be present in the underlay. `CMakeLists.txt` needs an `install(PROGRAMS ... DESTINATION lib/${PROJECT_NAME})` block, where `PROGRAMS` rather than `FILES` is what sets the execute bit, `lib/<package>` is the one directory `ros2 run` searches and is not configurable, and placement above `ament_package()` is mandatory because code after that macro is silently ignored. Verifying with `ls ~/autonomy_ws/install/s2_basic/lib/s2_basic/` splits any failure cleanly into a build problem or a code problem.

Execution rests on mechanisms worth knowing precisely. The kernel will only `execve` a file with the execute bit set, which is what `chmod +x` provides, and on seeing the two bytes `#!` it runs the named interpreter instead, which is why `#!/usr/bin/env python3` works and why routing through `env` rather than hardcoding a path is the portable idiom. `rclpy.init()` creates the process context and joins DDS discovery. `super().__init__("constant_control")` must be your first line because every other node method depends on the state it establishes. Your `__init__` creates three objects and starts nothing: the publisher is something you call, while the timer and subscription are things that call you.

`rclpy.spin(node)` is where the program lives, and it is a single-threaded executor looping over build-wait-set, block, run ready callbacks. One thread means callbacks never overlap, which removes the need for locks, makes a slow callback delay everything including your kill switch, and makes timer periods a floor rather than a guarantee. A `Twist` carries six doubles but a differential drive robot can only realize two of them, `linear.x` as forward speed and `angular.z` as yaw rate, because it is nonholonomic; `Twist()` zero-initializes, which is what makes the stop command a one-liner. Message fields are typed views over C structures, so `msg.linear.x = 1` raises an `AssertionError` where `1.0` succeeds. In the kill callback, read `msg.data` rather than testing the message object, and cancel the timer before publishing zero, because the opposite order is correct only under the single-threaded executor you happen to be using today.

Finally, `--symlink-install` makes installed files links to your sources, so editing Python inside an already-installed file needs no rebuild, while adding a file or touching either metadata file does. Sourcing is needed once per new terminal because environment variables are per-process, and again in existing terminals after a new package's first build because `AMENT_PREFIX_PATH` predates it.

### Checklist, what is worth studying next

- [ ] Read the generated `CMakeLists.txt` in `s2_basic` top to bottom and identify `project()`, `find_package(ament_cmake REQUIRED)` and `ament_package()`, then confirm for yourself that your `install()` block sits above the last of those.
- [ ] Run `ros2 interface show geometry_msgs/msg/Twist` and `ros2 interface show std_msgs/msg/Bool` to see the definitions rather than taking section 10's word for their shape.
- [ ] Run `ros2 topic info /cmd_vel --verbose` with the simulator and your node both running, and read the QoS block on both endpoints so the profile is concrete rather than abstract next time a topic silently fails to connect.
- [ ] Deliberately break the install destination: change `lib/${PROJECT_NAME}` to `bin`, rebuild, and observe that `colcon build` succeeds while `ros2 run` reports `No executable found`. Then move the block below `ament_package()` and observe that it fails the same way with no warning at all.
- [ ] Add `time.sleep(1.0)` inside `control_callback`, publish a kill, and measure how late the stop arrives. This is the fastest way to make the single-threaded executor's consequences real.
- [ ] Read the `rclpy` documentation page on executors and callback groups, specifically `MultiThreadedExecutor` and `MutuallyExclusiveCallbackGroup`, which is the machinery the ordering argument in section 11 anticipates.
- [ ] Read `asl_tb3_sim`'s `signs.launch.py` in `~/anshuarora/tb_ws/src/asl-tb3-utils/asl_tb3_sim/` and list which processes it starts and which topics each contributes, since you will be writing against those for the rest of the quarter.

### My recommendations

Type the node three times rather than once. The lab builds it in three passes, Task 2.2 printing, Task 3.1 publishing, Task 4.1 subscribing, and each pass ends at a CA checkpoint. Resist the efficiency of writing the final version immediately, because the three passes correspond exactly to the three things a ROS node can do, and typing them separately is what turns "I read about publishers" into "I know what a publisher is." Keep the reference file I wrote at [section2_constant_control_reference.py](../../Stanford_acads/Quarter_1/PORA1-AA274A/section2_constant_control_reference.py) as something to compare against after each pass, not as something to paste.

Verify the install tree before you debug any Python. The single most valuable habit in this lab is running `ls -l ~/autonomy_ws/install/s2_basic/lib/s2_basic/` the moment `ros2 run` complains. It costs two seconds and it partitions the entire space of failures into two halves, which is worth more than knowing any individual error message. The general form of this habit, checking the artifact rather than trusting the exit code, applies to every build system you will ever use.

Add `geometry_msgs` to your `package.xml` even though the lab does not ask for it, and add `source ~/autonomy_ws/install/setup.bash` to your container's `.bashrc` once Section 2 is signed off. The first makes your manifest honest for one line of effort. The second removes a recurring class of error for the rest of the quarter, and the only reason to delay it is that typing the source command by hand during this lab is better teaching than having it happen invisibly.

On the group logistics, settle who owns the GitHub account before anyone runs `gh auth logout`, because the device flow needs that person present at a browser, and a half-finished logout in a shared container is an annoying place to be. Your container's `gh` credentials are independent of your Windows ones, so there is no risk to your personal setup either way, but there is real risk of three people waiting on one absent teammate.

Finally, treat the `/kill` pattern as the actual lesson of Section 4 rather than as a toy. An external topic that cancels the control loop and commands zero is the skeleton of every safety system you will build on this robot, and two details in it are load-bearing well beyond this lab: silence is not a stop command, because a base holds its last velocity, and safety ordering should be correct under the weakest concurrency assumptions you can manage rather than under the ones currently in force. Both of those will matter again when the robot is physical and a mistake costs more than a reset.

---

*Sources: the CS237A Fall 2026 "Section 2" lab document (last updated Oct 1, 2026), read in full; the ROS 2 Humble `rclpy`, `ament_cmake` and `geometry_msgs` documentation; and the verified state of this machine's dev container, including `~/anshuarora/tb_ws/src/asl-tb3-utils/asl_tb3_sim`, the container `gh` configuration at `~/anshuarora/.config/gh/hosts.yml`, and the Section 1 repository at `~/anshuarora/autonomy_ws/src/pora_anshu`. Builds on two earlier internal primers, [ROS 2 From the Ground Up](ros2-primer-2026-09-27.md) and [Linux, Git and GitHub, From the Ground Up](linux-git-github-primer-2026-09-30.md).*
