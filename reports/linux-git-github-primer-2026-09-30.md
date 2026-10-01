# Linux, Git and GitHub, From the Ground Up

*Written 2026-09-30 for Anshu, immediately after CS237A Section 1. Read time roughly 45 minutes. It assumes no prior knowledge of Unix, git or GitHub, and it is built around the six specific errors you hit during the section, because a command you have personally watched fail is worth more than a command you have only read about.*

This document exists because you said the words "I get confused by what each of git add pull push etc mean, and what a home directory is". That confusion is not a gap in your intelligence, it is a gap in the explanations you were given. Section 1 hands you a cheat sheet of commands and a list of tasks, and a cheat sheet can tell you what a command does without ever telling you what model of the world the command assumes. Git in particular is almost impossible to use confidently until someone draws you the three places your code can live, at which point `add`, `commit` and `push` stop being three arbitrary incantations and become three obvious moves between those places. The same is true of a home directory, which only becomes confusing when, as on your machine, there are three of them stacked on top of each other.

## Contents

- [1. What you actually did in CS237A Section 1](#1-what-you-actually-did-in-cs237a-section-1)
- [2. Linux, and how it differs from Windows and macOS](#2-linux-and-how-it-differs-from-windows-and-macos)
- [3. Where am I? Home directories, working directories and paths](#3-where-am-i-home-directories-working-directories-and-paths)
- [4. The Unix commands worth knowing, grouped by purpose](#4-the-unix-commands-worth-knowing-grouped-by-purpose)
- [5. Git: the mental model that makes add, commit and push obvious](#5-git-the-mental-model-that-makes-add-commit-and-push-obvious)
- [6. GitHub is not git](#6-github-is-not-git)
- [7. The loop you will repeat all quarter](#7-the-loop-you-will-repeat-all-quarter)
- [8. Every error you hit, diagnosed](#8-every-error-you-hit-diagnosed)
- [9. Glossary](#9-glossary)
- [Closing](#closing)

---

## 1. What you actually did in CS237A Section 1

**What was the section really teaching, underneath the task list?**

Three skills, stated explicitly in the section's own overview ([CS237A, "Section 1"](https://docs.google.com/document/d/1fJljTg_zURKck5PMwDujnHYz_s6Ymt9_5E24cE8ZccY/edit)): navigating a Unix system from the terminal, using git to track software development, and writing executable Python and shell scripts. Those three are not arbitrary. Every robotics codebase you will touch this quarter lives on a Unix filesystem, is versioned in git, and is launched by executables whose permission bits have to be right. The section is front-loading the infrastructure so that later sections can be about robots.

What the task list conceals is that the three skills share one underlying idea, which is that **the terminal is a conversation with a system that has no idea what you intended.** It will do precisely what you typed, in precisely the directory you are standing in, and it will usually succeed silently when you are wrong. Six of your errors during the section were instances of that single fact.

**Which of your commands failed, and what did each failure actually reveal?**

Every one of them taught something more general than itself, which is why they are worth tabulating rather than forgetting:

| What you ran | What happened | The general lesson |
|---|---|---|
| `rm ~ kkkk` | Wrong target entirely | `~` is your home directory, and `rm` needs `-r` for directories and `-f` to tolerate a missing one |
| `touch ReadME.md` | Created a file the course would not recognise | Linux filenames are case-sensitive, unlike Windows and unlike default macOS |
| `git init` in `~` | Turned a 24 GB home directory into a repository | `git init` acts on your working directory, and that is the one git command with no safety net |
| `git add -u` with a new file | Did nothing at all, silently | `-u` means "update already-tracked files", so it ignores files git has never seen |
| `git add /scripts` | `outside repository` | A leading `/` makes a path absolute, starting from the root of the entire filesystem |
| `section1.py` | `command not found` | The shell searches `$PATH`, which deliberately excludes your current directory |

The pattern across all six is that the command was syntactically valid and the shell did exactly as instructed. None of these were bugs in your tools. They were mismatches between where you thought you were, or what you thought a flag meant, and what was actually true.

---

## 2. Linux, and how it differs from Windows and macOS

**What is an operating system actually doing in this picture?**

An operating system has two separable halves, and keeping them separate dissolves most of the confusion about what "Linux" even refers to. The **kernel** is the part that talks to hardware: it schedules which program gets the processor, allocates memory, and mediates access to disks and network cards. The **userland** is everything else, meaning the shell you type into, the commands you run, the libraries programs link against.

Strictly, Linux is only the kernel. The userland on your machine comes mostly from the GNU project and from Debian and Ubuntu packaging, which is why some people insist on the name GNU/Linux. This distinction is not pedantry for its own sake, because it explains something you will meet: macOS also has a Unix userland, so many commands behave similarly there, but it has a completely different kernel, so anything touching hardware or kernel interfaces behaves differently.

**Why does CS237A require Linux specifically, rather than merely preferring it?**

Because ROS 2 Humble is distributed as compiled Debian packages built against Ubuntu 22.04's system libraries ([ROS 2, "Ubuntu (Debian packages)"](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)). A compiled binary is tied to the libraries it was built against and to the kernel interfaces it calls. There is no way to run those packages on Windows or macOS directly, which is why your Section 0 setup went to the trouble of building a real Ubuntu 22.04 environment rather than installing something Windows-native. The requirement comes from the shape of the software distribution, not from preference.

**How is the Linux filesystem different from the Windows one?**

Windows gives each storage device its own namespace with a letter: `C:\`, `D:\`, and so on. There is no single top; there are several trees standing side by side.

Unix has exactly one tree. Its root is `/`, and every device, partition and network share appears somewhere *inside* that one tree at a location called a mount point. Your USB stick does not become `E:`, it becomes something like `/media/anshuarora/usb`. The layout of that tree is standardised ([Linux Foundation, "Filesystem Hierarchy Standard 3.0"](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html)), which is why `/usr/bin`, `/etc` and `/home` mean the same thing on essentially every Linux system you will ever log into.

The practical consequences are immediate. Paths use forward slashes rather than backslashes, so `/home/anshuarora/tb_ws` rather than `C:\Users\anshu\tb_ws`. There is no concept of "which drive am I on". And because everything hangs off one root, an absolute path is globally unambiguous, which matters for the error in section 3.

This is also exactly how your container works. Its `/home` is not a folder that happens to share a name with WSL's; it is WSL's `/home/anshuarora` **mounted** at the path `/home` inside the container. Mount points are the mechanism, and understanding them is what makes your directory layout stop looking like a bug.

**Why did `ReadME.md` versus `README.md` actually matter?**

Because the filesystem your container runs on is `ext4`, and ext4 is case-sensitive. `README.md`, `ReadME.md` and `readme.md` are three different filenames that can coexist in one directory.

This is one of the sharpest practical differences between the three systems. NTFS on Windows is case-insensitive while preserving the case you typed, so `ReadME.md` and `README.md` refer to the same file. macOS is the interesting middle case: its default APFS volumes are case-insensitive, though Apple supports case-sensitive volumes as an option, so a Mac user can go years without discovering the distinction and then hit it the first time they deploy to a Linux server. If you develop on Windows or a default Mac and deploy to Linux, filename case is a reliable source of bugs that reproduce only in production.

**What makes a file executable on Linux, given there is no `.exe`?**

Two things, and your `section1.py` needed both.

The first is a **permission bit**. Every file carries nine permission bits, arranged as three groups of three, controlling read, write and execute for the file's owner, for its group, and for everyone else. `ls -l` renders them as a string, and reading that string is a skill worth five minutes:

```
-rwxr-xr-x  1 anshuarora anshuarora  0 Sep 30 21:32 section1.py
^^^^^^^^^^
|└┬┘└┬┘└┬┘
| |  |  └── others:  r-x  read, no write, execute
| |  └───── group:   r-x  read, no write, execute
| └──────── owner:   rwx  read, write, execute
└────────── type:    -    regular file (d would be a directory, l a symlink)
```

`chmod +x` is what turns those `x` positions on. Windows takes a different approach entirely, deciding executability by file extension through `PATHEXT` and layering a separate access-control-list system on top for permissions. On Linux the extension is decoration; `.py` tells the operating system nothing.

The second is the **shebang**, the `#!/usr/bin/env python3` on your first line. When you execute a file directly, the kernel reads its first two bytes, and if they are `#!` it treats the rest of that line as the interpreter to run the file with. This is why a Python file and a shell script can both be "executable" with no compilation step: the shebang names who should interpret the text. It is also why `/usr/bin/env python3` is preferred over a hardcoded `/usr/bin/python3`, because `env` looks the interpreter up on `$PATH` and therefore works across machines where Python lives somewhere else.

Your `cleanup.sh` demonstrates that this is a real choice rather than a formality, since its shebang is `#!/usr/bin/sh`, and on Ubuntu `/usr/bin/sh` is a symlink to **dash**, not bash. Dash implements only POSIX shell features, so bash conveniences such as `[[ ... ]]`, arrays and `source` are syntax errors there. A script that works when you run `bash script.sh` can fail when run as `./script.sh`, purely because the shebang selected a stricter shell.

**Where does macOS actually sit relative to these two?**

macOS is a genuine Unix, descended from BSD, running Apple's XNU kernel, with zsh as the default shell on recent versions. The consequence for you is that the concepts in this document transfer to a Mac almost entirely: `pwd`, `cd`, `ls`, `chmod`, pipes, permissions and the single filesystem tree all work the same way.

What differs is the userland implementation. Linux ships GNU versions of the core tools; macOS ships BSD versions. They accept different flags for the same jobs, so `sed -i` requires an argument on macOS and not on Linux, and `ls --color` is GNU-only. When a tutorial command fails on a Mac with a flag error, this is usually why. It is also why CS237A cannot simply tell Mac users to open Terminal: being Unix is not sufficient when the requirement is Ubuntu binaries, which is why the Mac path in Section 0 runs a full Ubuntu virtual machine under UTM.

**How many operating systems are running on your laptop right now?**

Three, nested, which is the single biggest source of the confusion you have been experiencing:

```
+---------------------------------------------------------------+
| Windows 11            NT kernel, C:\ drives, .exe, ACLs       |
|   your Brave browser, VS Code's UI, gh.exe                    |
|                                                               |
|  +---------------------------------------------------------+  |
|  | WSL 2: Ubuntu 22.04     real Linux kernel in a tiny VM   |  |
|  |   /home/anshuarora      your SSH key, ml-gpu venv        |  |
|  |                                                          |  |
|  |  +---------------------------------------------------+   |  |
|  |  | Docker container: Ubuntu 22.04 + ROS 2 Humble      |   |  |
|  |  |   /home  <- this IS WSL's /home/anshuarora         |   |  |
|  |  |   /home/anshuarora  <- your home in here           |   |  |
|  |  |   gh (Linux), git, python3, ros2, gazebo           |   |  |
|  |  +---------------------------------------------------+   |  |
|  +---------------------------------------------------------+  |
+---------------------------------------------------------------+
```

Each layer has its own filesystem root, its own installed programs, and its own idea of who you are. This is why you have two GitHub CLIs, one Windows and one Linux, without either being a duplicate: a Windows executable cannot run inside a Linux container, and installing a package in WSL does not install it in the container. Only one thing is shared, your home directory, bind-mounted from WSL into the container, which is why files you create in one are instantly visible in the other.

---

## 3. Where am I? Home directories, working directories and paths

**What is a home directory, precisely?**

It is a fixed property of your **user account**, not of your session. When the system creates a user it records a home directory in its account database, visible through `getent passwd`, and on your container that record says `/home/anshuarora`. The shell exposes the same value as the environment variable `$HOME`, and expands the shorthand `~` to it.

The important word is *fixed*. Your home directory does not change when you `cd` somewhere else. It is where you are given space to keep your files, where your configuration dotfiles live, and where a fresh login normally starts you. It is an attribute of who you are.

**What is a working directory, and why is it a different kind of thing?**

The working directory is where your shell is **right now**. It is a property of the running process, it changes every time you `cd`, and `pwd` prints it. Crucially, it is the point from which every relative path is resolved, and it is what a bare filename means.

The two concepts get conflated because on a normal Unix login they start out equal: you log in and your working directory is your home directory. That coincidence is the whole trap. They are unrelated ideas that happen to agree at the start of a session, and your container does not even give you that, because VS Code opens terminals at the configured workspace folder `/home`, which is one level *above* your home directory. Your very first terminal in the container showed `:/home$` for exactly this reason.

**Why is your home directory confusing specifically?**

Because three of them are in play, two of which have the identical path string while being different directories:

| System | Home directory | Physically, on WSL's disk |
|---|---|---|
| Windows | `C:\Users\anshu` | not on WSL's disk at all |
| WSL | `/home/anshuarora` | `/home/anshuarora` |
| Container | `/home/anshuarora` | `/home/anshuarora/anshuarora` |

The container's home and WSL's home are both spelled `/home/anshuarora` and are not the same place. The reason is the mount: the container's `/home` *is* WSL's `/home/anshuarora`, so the container's `/home/anshuarora` sits one level deeper than WSL's.

```
On WSL's disk:                      Seen from inside the container:

/home/anshuarora/            <--->  /home/
    anshuarora/              <--->      anshuarora/        (this is ~)
        autonomy_ws/                        autonomy_ws/
        tb_ws/                              tb_ws/
    ml-gpu/                             ml-gpu/
    .bashrc        (WSL's)              .bashrc   (WSL's, NOT the container's)
```

That nested `anshuarora` folder you noticed in the VS Code Explorer is therefore not a duplicate or a mistake. It **is** your container home. One useful corollary is that the same `README.md` has three equally valid names, all of which I have verified resolve to the identical file: `/home/anshuarora/autonomy_ws/src/pora_anshu/README.md` from the container, `/home/anshuarora/anshuarora/autonomy_ws/src/pora_anshu/README.md` from WSL, and `\\wsl$\Ubuntu\home\anshuarora\anshuarora\autonomy_ws\src\pora_anshu\README.md` from Windows.

A second corollary, worth internalising because it will waste an afternoon otherwise: the `.bashrc` you see at the top of that Explorer listing is WSL's, while the one the container reads is inside `anshuarora/`. Two files, same name, one level apart, and editing the wrong one produces changes that appear to have no effect.

**What is the difference between an absolute and a relative path?**

An **absolute** path starts at the root of the filesystem and therefore means the same thing from anywhere. It begins with `/`, as in `/home/anshuarora/autonomy_ws`. A path beginning with `~` is also effectively absolute, since the shell expands the `~` to your home directory before the command ever sees it.

A **relative** path starts from your working directory. It has no leading slash, so `scripts/section1.py` means "`scripts/section1.py` beneath wherever I am standing".

This is precisely what broke `git add /scripts`. That leading slash asked for a directory named `scripts` at the very root of the filesystem, next to `/usr` and `/etc`, which does not exist and is certainly not inside your repository. Hence `'/scripts' is outside repository`. The fix from inside `scripts/` was `git add .`, because `.` names the working directory itself.

Four shorthands carry most of the weight in daily use, and they are worth committing to memory: `~` is your home directory, `.` is the current directory, `..` is the parent directory, and `/` is the filesystem root. They compose, so `../scripts` means a sibling directory and `cd ~/autonomy_ws/src/pora_anshu` works from anywhere at all.

**How do you know where you are without having to think about it?**

Your prompt is already telling you, and reading it is the cheapest habit in this document. Bash displays `~` when your working directory is your home directory, and the actual path otherwise:

```
anshuarora@anshuasus:~$                                    you are in /home/anshuarora
anshuarora@anshuasus:/home$                                you are in /home, one level up
anshuarora@anshuasus:~/autonomy_ws/src/pora_anshu$         you are in your repository
```

One glance at that single character before you ran `git init` would have prevented a 24 GB repository. When the prompt is ambiguous, or before anything destructive, there is always `pwd`.

---

## 4. The Unix commands worth knowing, grouped by purpose

The cheat sheet in your section document lists commands alphabetically by shape. Grouping them by what you are trying to accomplish makes them considerably easier to retain, because you reach for them by intent rather than by name.

### 4.1 Navigation and orientation

**Which commands answer "where am I and what is here?"**

`pwd` prints the working directory, `cd` changes it, and `ls` lists contents. The flags on `ls` are where the value is: `ls -l` gives the long form with permissions, owner, size and modification time, `ls -a` includes hidden files whose names begin with a dot, `ls -h` makes sizes human-readable, and `ls -R` recurses into subdirectories. They combine, so `ls -lah` is the form most people type by reflex.

Two `cd` behaviours are worth knowing because they save keystrokes every day. Bare `cd` with no argument returns you to your home directory, and `cd -` returns you to the directory you were in previously, which is ideal for bouncing between a repository and a log directory.

The hidden-file convention explains something you have already seen. Your `.git`, `.bashrc`, `.devcontainer` and `.ssh` are all hidden by default, not out of secrecy, but because configuration would otherwise drown the listing of files you care about. This is also why `ls` in your home directory looked almost empty while `ls -a` revealed dozens of entries.

### 4.2 Reading files without opening an editor

**How do you look at a file's contents from the terminal?**

`cat <file>` dumps the whole thing to the screen, which is ideal for short files and miserable for long ones. `less <file>` pages through it interactively, with `q` to quit, `/` to search and arrow keys to scroll, and it is the right default for anything you cannot see at a glance. `head -n 20 <file>` shows the first twenty lines and `tail -n 20 <file>` the last twenty, while `tail -f <file>` follows a file as it grows, which is how you watch a log in real time.

`wc <file>` counts lines, words and bytes, and `wc -l` alone is the standard way to count lines. For sizes rather than contents, `du -sh <dir>` reports the total size of a directory tree and `df -h` reports free space per filesystem. These two are how I established that your home directory is 24 GB, with the `ml-gpu` virtual environment accounting for 11 GB of it and the pip cache a further 6.1 GB.

### 4.3 Creating, copying and destroying

**Which commands change the filesystem, and where are the sharp edges?**

`mkdir <dir>` creates one directory and fails if its parent does not exist. `mkdir -p <dir>` creates every missing parent along the way, which is why Task 1.2 needed `mkdir -p ~/autonomy_ws/src/pora_anshu`, since neither `autonomy_ws` nor `src` existed yet. A useful second property of `-p` is that it does not complain if the directory already exists, which makes it safe inside scripts.

`touch <file>` creates an empty file, or updates the modification time of one that already exists. `cp <A> <B>` copies and needs `-r` for directories, while `mv <A> <B>` both moves and renames, since on a single filesystem renaming is just moving within the same tree.

`rm` is the command that deserves genuine caution, because Unix has no recycle bin and `rm` does not ask. `rm <file>` removes a single file, `rm -r <dir>` recurses into a directory, and `rm -f` forces, suppressing prompts and, importantly, not treating a missing target as an error. That last property is exactly why Task 1.1 wanted `rm -rf ~/autonomy_ws`: the task says "remove it if it exists", and `-f` is what makes the non-existent case succeed quietly rather than fail.

The discipline worth building around `rm` is spatial rather than conceptual. `rm -rf ~/autonomy_ws` deletes one directory, while `rm -rf ~ /autonomy_ws`, which differs by a single space, deletes your entire home directory. There is no confirmation and no recovery. Read the path back before pressing return, every single time.

### 4.4 Permissions

**How do you read and change what a file allows?**

`chmod +x <file>` adds the execute bit, `chmod -w <file>` removes write permission, and `ls -l <file>` shows the result in the nine-character form diagrammed in section 2. Permissions can also be set numerically, where each of read, write and execute has a value of 4, 2 and 1, so `chmod 755` means owner `rwx` (7) and group and others `r-x` (5). You will see `755` and `644` constantly in documentation; they are the ordinary settings for an executable and for a plain data file respectively.

The reason this matters at all in Section 1 is that executability is a *property of the file*, not of its name. Your `section1.py` and `cleanup.sh` are executable because you set a bit on them, and if you copy them to a system that loses permission bits, which is exactly what happens when you move files through a Windows filesystem or some archive formats, they stop being runnable and you have to `chmod +x` them again.

### 4.5 Finding things

**How do you locate a file or a string when you do not know where it is?**

`find <dir> -name "<pattern>"` walks a directory tree looking for filenames, so `find ~ -name "section1.py"` is how I established that you had exactly one copy of that file and that it was zero bytes. `grep "<pattern>" <file>` searches *inside* files for text, and `grep -r "<pattern>" <dir>` searches recursively through a whole tree, which is the fastest way to answer "where is this function defined" in an unfamiliar codebase.

`which <command>` tells you which executable the shell would actually run for a given name, which is the first thing to check whenever a command behaves unexpectedly or appears to be the wrong version. It is how the Linux `gh` versus Windows `gh.exe` question got settled.

### 4.6 Processes, and why your typing disappeared

**Why did `ros2 node list` do nothing when you typed it?**

Because `ros2 launch` was still running in that terminal. A foreground process owns the terminal's input, so your keystrokes became **standard input to the launch process**, which was not reading them. The shell never saw the line and therefore never ran it. The same thing happened earlier with the `source /home/ml-gpu/bin/activate` line, with a revealing twist: that one eventually *did* execute, after you pressed Ctrl+C, because the text sat in the terminal's input buffer until bash regained control and read it.

The tools for managing this are few and worth knowing. `Ctrl+C` sends the interrupt signal `SIGINT`, politely asking the foreground process to stop, which is what the ASL README means by ending the simulator with Ctrl+C. `Ctrl+Z` suspends the process instead, handing you back the prompt, after which `jobs` lists suspended work, `fg` resumes it in the foreground and `bg` resumes it in the background. Appending `&` to a command starts it in the background immediately, though its output then interleaves with your prompt, which is usually more annoying than opening a second terminal. `ps aux` lists running processes and `kill <pid>` signals one by number.

For your purposes the practical conclusion is simple: when something long-running occupies a terminal, open another one rather than fighting it. In VS Code that is `Ctrl+Shift+` with a backtick.

**Why does exit code -2 mean your Ctrl+C rather than a crash?**

Because when a process is terminated by a signal rather than exiting normally, the convention used by launch tooling is to report the negative of the signal number. Signal 2 is `SIGINT`. So the `[ERROR] [gz sim-2]: process has died ... exit code -2` line in your simulator log is Gazebo reporting that you stopped it, and the ERROR label is an artefact of the launcher treating every non-zero exit as noteworthy. The tell that nothing actually broke is that every other process in that log reported `finished cleanly`.

### 4.7 Composition, which is the actual Unix idea

**What is the design philosophy that makes these small commands powerful?**

Unix tools are deliberately small and single-purpose, and they are made powerful by connecting them. Each process gets three default streams: standard input, standard output and standard error. Redirection and pipes rewire those streams, and that is the entire mechanism.

`>` redirects standard output into a file, replacing its contents, while `>>` appends instead. The GitHub instruction you followed, `echo "# pora_anshu" >> README.md`, is precisely this: `echo` writes a line to standard output, and `>>` appends that line to the file rather than overwriting it. `2>` redirects standard error specifically, and `2>&1` merges error into output so that both can be captured together. `<` feeds a file into standard input.

The pipe `|` connects one command's output directly to the next command's input, with no temporary file, which is where the composition becomes genuinely expressive:

```
ros2 topic list | grep scan            only the topics whose names contain "scan"
ls -l | wc -l                          count the entries in this directory
du -sh ~/.cache/* | sort -h | tail -5  the five largest things in the cache
cat section1.py | grep -c import       how many import lines the file has
```

None of those combinations were designed in advance by anyone. They work because every tool reads text from standard input and writes text to standard output, so any tool can feed any other. This is the deepest difference in philosophy from the Windows tradition, where programs typically present a graphical interface and exchange structured objects rather than text streams, and it is why so much robotics tooling assumes a Unix environment.

### 4.8 Getting help without a browser

**How do you find out what a command does from inside the terminal?**

`man <command>` opens the manual page, which is the authoritative and usually dense reference, navigated like `less`, with `q` to quit and `/` to search. Most modern commands also accept `--help` for a short summary, which is often what you actually want, and `man` is better when you need the full flag list and the edge cases.

`type <command>` or `which <command>` tells you what will run, distinguishing a real executable from a shell builtin or an alias. This is how you would discover that `update_tb_ws` on your machine is an alias pointing at a script in the ASL workspace rather than a program in its own right.

---

## 5. Git: the mental model that makes add, commit and push obvious

**Why does git have a staging area at all, when nothing else you use does?**

This is the question to answer first, because the staging area is the single thing that makes git feel arbitrary to newcomers. Dropbox and Google Docs save continuously. Git deliberately does not, and it inserts an extra holding area between your files and your saved history.

The reason is that **a commit should be a coherent unit of work, and the files you have edited are usually not one.** Suppose you fix a bug in `section1.py` and, while you are in there, also rewrite a paragraph of `README.md`. Those are two unrelated changes. A reviewer wants to see them separately, and if the bug fix later needs reverting you want to revert only it. The staging area is where you assemble one coherent commit out of a messy working directory, choosing what belongs together before recording it.

Once you see it that way, `git add` stops being "the thing you have to do before committing" and becomes "declaring what this commit is about".

**What exactly do add, commit, push, fetch and pull move, and between what?**

Git has **three local places** your code can be, plus a fourth that lives on a server. Every command you have used is a move between two adjacent places, and this diagram is the single most useful thing in this document:

```
   WORKING              STAGING               LOCAL                 REMOTE
  DIRECTORY              AREA              REPOSITORY            (GitHub)
                        (index)              (.git)

 the actual          what will go        your committed         the shared
 files you can       into the next        history, all          copy everyone
 edit and see        commit              branches              can reach

      |                   |                    |                     |
      |---- git add ----->|                    |                     |
      |                   |--- git commit ---->|                     |
      |                   |                    |---- git push ------>|
      |                   |                    |<--- git fetch ------|
      |<------------ git pull (fetch + merge) -----------------------|
      |                   |                    |                     |
      |<-- git checkout --|--------------------|                     |
```

Reading each move in plain language:

`git add` copies the current state of a file from your working directory into the staging area. Note the word *state*. It takes a snapshot at the moment you run it, which is why editing a file after staging it means you must `git add` it again, and why that catches everyone once.

`git commit` takes everything in the staging area and writes it into the local repository as a permanent snapshot, with a message, an author and a timestamp. **This is entirely local.** Nothing has touched GitHub yet, which is the single most common misunderstanding about git, and it is a direct consequence of git being designed as a distributed system where you can work with full history on an aeroplane.

`git push` uploads commits from your local repository to the remote. This is the first command in the sequence that requires a network and authentication.

`git fetch` downloads commits and branch information from the remote into your local repository, but **does not touch your working directory**. It updates your local knowledge of what the server has, and nothing else.

`git pull` is `git fetch` followed by a merge into your current branch, so it both learns what the server has and updates your files to match.

`git checkout <branch>` rewrites your working directory to match a different branch.

**What is a commit, really?**

A commit is a **complete snapshot** of your tracked files, plus metadata, plus a pointer to its parent commit. It is not a diff, although git displays it as one and stores it compactly. It is identified by a hash of its own contents, which is where `e6d770c` and `75b282c` come from.

Because each commit points to its parent, the commits form a chain, and because a merge commit has two parents, the general shape is a directed graph. Your own repository history is a clean illustration, with the merge commit joining two lines of development:

```
*   5f346f3  Merge pull request #1 from AroraAnshu26/lab1
|\
| * 26db5ca  my first try at this          <- the lab1 line
|/
* e6d770c  first commit
```

The fact that the hash is computed from the content has a consequence worth knowing: you cannot alter a commit without changing its hash, and therefore the hash of every commit that descends from it. This is what makes git history tamper-evident, and it is why rewriting published history is considered rude rather than merely inconvenient.

**What is a branch, really?**

A branch is a **movable pointer to one commit**. That is the entire implementation; it is a small file under `.git/refs/heads/` containing a hash. This is why creating a branch is instantaneous regardless of repository size, and why branches in git are cheap enough to make casually, which is a deliberate contrast with older version-control systems where branching meant copying.

`HEAD` is a pointer to the branch you are currently on, which is how git knows what `git commit` should advance. When you ran `git checkout -b section1`, git created a new pointer at your current commit and moved `HEAD` to it. Nothing was copied, and your working directory did not change, because both branches pointed at the same commit at that instant.

This also explains something you observed and found surprising: your untracked `scripts/` folder survived branch switches untouched. Untracked files are not part of any commit, so they are not part of any branch, so switching branches cannot affect them. Git simply does not know they exist.

**Why did your local `main` lie to you about the merge?**

Because `origin/main` is not GitHub. It is a **remote-tracking branch**, which is a local cache of where `main` was on the server the last time you asked. It updates only on `fetch` or `pull`.

You had merged your pull request on GitHub, so the server's `main` was at `5f346f3`. Your repository still believed `origin/main` was at `e6d770c`, because nothing had asked the server since. When I ran `git branch --merged main`, it answered using that stale cache and reported, wrongly, that `lab1` was not merged. One `git fetch` later the truth appeared:

```
From https://github.com/AroraAnshu26/pora_anshu
   e6d770c..5f346f3  main -> origin/main
```

The general rule that follows is worth holding onto: **any question about what the server has requires a `fetch` first.** This is not a quirk, it is the price of a distributed design in which your repository is a full peer rather than a thin client, and it can answer questions about history with no network at all.

**Why did `git add -u` do nothing?**

Because `-u` means update, and update applies only to files git already **tracks**, meaning files that have appeared in a previous commit ([Git, "git-add Documentation"](https://git-scm.com/docs/git-add)). Your `team.txt` had never been committed, so git did not track it, so `-u` skipped it. At that moment git tracked exactly one file, `README.md`.

The three forms are worth separating clearly, because choosing wrongly produces silence rather than an error:

`git add -u` stages modifications and deletions of tracked files, and never stages anything new. `git add <path>` stages that specific file or directory whether or not it is tracked. `git add .` stages everything beneath your working directory, including new files, which makes it convenient and also makes it the easiest way to commit something you did not intend.

The `??` marker in `git status` is the signal to watch for, since it means untracked. Once a file is tracked, its changes appear as `M` instead, and only then does `-u` apply to it.

**Why can git commands be run from any directory inside the repository?**

Because git searches **upward** from your working directory for a `.git` folder, and operates on the repository it finds. That is also precisely what the error message means when you are outside one, since `not a git repository (or any of the parent directories)` is describing a failed upward walk.

This puts git commands into three groups, and knowing which group you are in prevents most directory-related confusion. For the first group, which includes `status`, `commit`, `push`, `pull`, `fetch`, `log`, `branch`, `checkout` and `merge`, your working directory is irrelevant as long as you are somewhere inside the repository, because they act on the whole thing. For the second group, which includes `add`, `rm`, and `diff` or `checkout` with a path, your working directory determines what the paths mean, which is why `git add .` from `scripts/` stages only `scripts/`. For the third group, `init` and `clone`, your working directory determines where the repository is created, and there is no upward search to rescue you because there is no repository yet.

That third group is why `git init` in your home directory was able to do what it did, and it is the only git command where standing in the wrong place is genuinely destructive rather than merely confusing. When in doubt, `cd "$(git rev-parse --show-toplevel)"` takes you to the repository root from anywhere inside it.

---

## 6. GitHub is not git

**What is the actual division of labour between them?**

Git is a program that runs on your machine and manages history. It was written in 2005 for Linux kernel development, it has no concept of a central server, and it would work perfectly if GitHub vanished tomorrow.

GitHub is a commercial hosting service that stores git repositories and adds collaboration features on top. Those features, and this is the part worth being precise about, **are not part of git**: pull requests, issues, code review, protected branches, Actions and the web interface are all GitHub inventions. GitLab offers equivalents under different names, calling the same idea a merge request, which is itself evidence that these are product decisions rather than properties of git.

The practical reason to keep the distinction sharp is that it tells you where to look when something goes wrong. If `git commit` fails, it is a git problem and local. If a pull request is not appearing, it is a GitHub problem, and git on your machine is probably fine.

**What is a pull request, and why is it not a git concept?**

A pull request is a GitHub object that says "here are the commits on branch X that are not on branch Y, please review them and merge" ([GitHub Docs, "About pull requests"](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)).

Two consequences follow directly, and both of them you ran into. First, a pull request needs **two different branches**, because it is fundamentally a comparison. This is why Task 4.1 requires a new branch: commit your work directly to `main` and there is nothing to compare, so GitHub has no pull request to offer you. Second, a pull request **tracks a branch rather than a snapshot**. Once it exists, any further commits you push to that branch appear in it automatically, which is why you never need to close and reopen one after making a requested change.

It is also why pushing a branch and opening a pull request are two separate steps. Your `section1` branch was on GitHub, complete with your commit, and no pull request existed, because nothing had asked for one. GitHub will never create one for you.

**How does authentication work, and why do you have two GitHub CLIs?**

Git itself does not authenticate; the transport does. There are two transports and they behave differently enough to matter.

Over **HTTPS**, you push to a `https://github.com/...` URL and supply a username and a token. Plain passwords have not been accepted for git operations for years, so the token is a personal access token or one minted by the `gh` CLI, and a credential helper normally stores it so you are not asked every time. Over **SSH**, you push to a `git@github.com:...` URL and authenticate with a key pair, where the private key stays on your machine and the public key is registered with GitHub.

Your machine has an instructive configuration. Windows has `gh` 2.97.0 authenticated as `AroraAnshu26` with its git protocol set to SSH, and your WSL home holds an `id_ed25519` key pair. Inside the container, `gh` 2.102.0 is separately authenticated over **HTTPS**, which is the right choice there for a concrete reason: your SSH key is not forwarded into the container, where only `known_hosts` is present, so an SSH transport would fail with a permissions error that reads like an account problem and is not one.

The container also carries a credential helper that VS Code installed, visible in its `.gitconfig`, which forwards git credentials from the Windows `gh` into the container. That is why `git push` could work there before the Linux `gh` existed. Two CLIs are not redundant, because a Windows `.exe` cannot execute inside a Linux container, and credentials are stored per machine rather than per account.

**What does the full collaboration loop look like?**

```
  YOUR MACHINE                                      GITHUB
                                                       |
  main    ----o------------------------o--->     main  ----o-----------o--->
               \                      /                     \         /
  section1      o---o---o                                     o---o---o
                        |                                             ^
                        |  git push -u origin section1                |
                        +--------------------------------------------->
                                                                      |
                            open PR  ---->  review  ---->  merge -----+
                                                                      |
  git checkout main                                                   |
  git pull       <-------------------------------------------------------
```

The loop closes at the bottom, and that last step is the one people skip. Merging happens on GitHub's servers, so your local `main` knows nothing about it until you `pull`. Skipping that is how you end up with a local `main` that has diverged from the shared one, and with conflicts that seem to come from nowhere.

---

## 7. The loop you will repeat all quarter

**What is the minimal sequence, with no thinking required?**

Start from a current `main`, which costs nothing and prevents the most common class of conflict:

```
git checkout main
git pull
```

Create a branch named for the work you are about to do, because a branch is a named line of work and the name is the only documentation it carries:

```
git checkout -b section2
```

Then do the work, and commit in coherent units rather than one giant commit at the end:

```
git status                      see what changed
git add <the files for one idea>
git status                      confirm what is staged
git commit -m "a real message"
```

Publish the branch, with `-u` on the first push only, which sets the upstream so that later pushes need no arguments:

```
git push -u origin section2
```

Open the pull request, have it reviewed, merge it, and then close the loop:

```
git checkout main
git pull
```

**Which habits are worth building deliberately?**

Three, and all three come directly from errors you made rather than from general advice. Run `pwd` before `git init`, `git clone` or any `rm`, because those are the commands where standing in the wrong place is destructive rather than merely wrong. Run `git status` both before and after staging, because it is the only thing that will tell you that `-u` silently did nothing. And check `ls -l` when a script behaves as though your edits are missing, because a zero-byte file means the editor never saved, which is exactly why your `section1.py` printed nothing.

---

## 8. Every error you hit, diagnosed

**What was the one-line cause of each failure?**

| Error message | Real cause | Fix |
|---|---|---|
| `bash: section1.py: command not found` | The shell searches `$PATH`, which excludes the current directory by design, so that dropping a file named `ls` into a directory cannot hijack the next person who runs `ls` there | `./section1.py` |
| `./section1.py` printed nothing | The file was zero bytes; the editor never saved | Write content, save, confirm with `ls -l` |
| `fatal: /scripts: outside repository` | A leading `/` makes the path absolute from the filesystem root | `git add .` from inside, or `git add scripts/` from the root |
| `nothing added to commit but untracked files present` | `git add -u` only stages already-tracked files | `git add team.txt` or `git add .` |
| `*** Please tell me who you are` | `user.name` and `user.email` were unset, so no commit could be created, so no branch existed, so the push had nothing to send | `git config --global user.name` and `user.email` |
| `error: src refspec main does not match any` | Consequence of the above; you cannot push a branch with no commits | Fix the identity, then commit |
| `Initialized empty Git repository in /home/anshuarora/.git/` | `git init` acts on the working directory, and yours was your home directory | `rm -rf ~/.git`, then `cd` into the repository first |
| `bash: gh: command not found` | `gh` existed on Windows but not in the Linux container, which has its own filesystem | Install the Linux `gh` in the image |
| `ros2 node list` produced nothing | A foreground process owned the terminal, so the keystrokes went to its standard input | Use a second terminal |

The instructive thing about this table is that **not one of these was a broken tool.** Every message was accurate, and in most cases the command did exactly what it was asked. The gap was always between intent and instruction, which is the fundamental skill the terminal demands and the reason Section 1 exists at all.

---

## 9. Glossary

**Absolute path** A path beginning with `/`, meaningful from anywhere. `~/x` counts, since the shell expands `~` first.

**Branch** A movable pointer to one commit, stored as a file containing a hash.

**Commit** A complete snapshot of tracked files, with metadata and a pointer to its parent, identified by a hash of its own content.

**Dash** The minimal POSIX shell that `/bin/sh` points to on Ubuntu. Not bash, and it rejects bash-only syntax.

**Home directory** A fixed property of your user account, recorded in the system's account database, exposed as `$HOME` and as `~`. Does not change as you move around.

**HEAD** A pointer to the branch you are currently on.

**Kernel versus userland** The kernel talks to hardware; the userland is the shell, commands and libraries. Linux is strictly only the kernel.

**Mount point** A location in the single filesystem tree where another device or directory is attached. The mechanism behind your container's `/home`.

**Origin** The conventional name for the remote your repository was cloned from or configured against.

**Permission bits** Nine bits controlling read, write and execute for owner, group and others, displayed by `ls -l` and changed with `chmod`.

**Pipe** The `|` operator, connecting one command's standard output to the next command's standard input.

**Pull request** A GitHub object proposing that the commits on one branch be merged into another. Not a git feature.

**Relative path** A path with no leading slash, resolved from your working directory.

**Remote** A named reference to a repository elsewhere, usually `origin`.

**Remote-tracking branch** A local cache of where a branch was on the remote when you last fetched, such as `origin/main`. Not a live view.

**Shebang** The `#!interpreter` on a script's first line, read by the kernel to decide what should run the file.

**Staging area, or index** The holding area between your working directory and your repository, where you assemble one coherent commit.

**Tracked versus untracked** A tracked file has appeared in a commit and git watches it. An untracked file is invisible to git, shown as `??` by `git status`, and ignored by `git add -u`.

**Working directory** Where your shell is right now, printed by `pwd`, changed by `cd`, and the origin of every relative path.

---

## Closing

### What you now know

An operating system splits into a kernel that drives hardware and a userland of shells, commands and libraries, and Linux is strictly only the kernel, which is why macOS can feel similar while behaving differently in detail. Unix arranges all storage into a single tree under `/` with devices attached at mount points, rather than Windows' separate lettered trees, and that one design choice is what makes your container's `/home` able to *be* WSL's `/home/anshuarora` rather than merely resemble it. Linux filesystems are case-sensitive, so `ReadME.md` and `README.md` are genuinely different files, a distinction Windows and default macOS volumes hide from you. Executability is a permission bit plus a shebang rather than a file extension, so a Python script and a shell script become runnable the same way, and the shebang matters enough that `#!/usr/bin/sh` selects dash on Ubuntu and will reject bash-only syntax.

Your home directory is a fixed property of your account, recorded in the system's account database and exposed as `$HOME` and `~`, while your working directory is a property of the current shell that changes with every `cd`. They coincide at login, which is the entire reason they get confused, and on your machine they do not even coincide there, because VS Code opens container terminals at `/home` rather than at your home directory one level below. Paths beginning with `/` are absolute and mean the same thing everywhere, while paths without it are relative to wherever you are standing, which is the whole content of the `git add /scripts` failure. Your prompt displays `~` when those two happen to agree, which makes it a free indicator of where you are.

Git keeps your code in three local places plus one remote, and every command is a move between two adjacent ones: `add` copies working directory into staging, `commit` writes staging into your local repository, `push` sends local commits to the remote, `fetch` downloads remote information without touching your files, and `pull` is `fetch` plus a merge. The staging area exists so that a commit can be one coherent idea rather than whatever happened to be on disk. A commit is a full snapshot plus a parent pointer, identified by a hash of its own content, so history is a graph and is tamper-evident. A branch is just a movable pointer to a commit, which is why creating one is instant and why untracked files are unaffected by switching. `origin/main` is a local cache updated only by fetching, which is why your repository told me your merged pull request was unmerged until I fetched. GitHub is a hosting product rather than part of git, pull requests are its invention and need two different branches to exist at all, and because a pull request tracks a branch rather than a snapshot, pushing again updates it automatically.

### Checklist, what is worth studying next

- [ ] Read chapters 2 and 3 of [Pro Git](https://git-scm.com/book/en/v2), covering basics and branching. It is free, it is the canonical reference, and chapter 3 is the best existing explanation of branches as pointers.
- [ ] Run `git log --oneline --graph --all --decorate` on your own `pora_anshu` repository and identify the merge commit, its two parents, and which commit each branch pointer sits on.
- [ ] Deliberately break and fix one thing in a scratch directory: `git init` somewhere harmless, commit a file, edit it, then run `git diff` and `git diff --staged` to see the difference between unstaged and staged changes. That one pair of commands makes the staging area concrete.
- [ ] Practise `git status` reading until `??`, ` M`, `A ` and `M ` are instantly legible. These four markers carry most of git's day-to-day feedback.
- [ ] Work through the pipe examples in section 4.7 against your actual ROS topics, for instance `ros2 topic list | grep scan | wc -l`. Composition is the Unix idea and it only sticks through use.
- [ ] Read `man chmod` and `man rm` end to end. They are short, and `rm` is the command most worth fully understanding before you need it.
- [ ] Fix `team.txt`, which still contains `17524378` and `12345678` rather than SUNetIDs, since it is already merged into `main` and is therefore what a CA sees.

### My recommendations

Learn `git status` before you learn any more git commands. Nearly every confusion in this session, including the silent `git add -u` and the uncommitted `scripts/` folder, would have been visible immediately in its output, and it is the only git command that is never destructive and always informative. Run it before and after everything until it becomes reflex; it is worth more than memorising twenty commands.

Adopt the two-terminal pattern permanently for robotics work, with the simulator running in one and your inspection commands in another. You hit the single-terminal problem twice, and it will recur in every session that involves a long-running process, which from here on is all of them. This is a workflow fix rather than a knowledge fix, so no amount of understanding will prevent it; only the habit will.

Do not use `git add .` as your default. It is how unintended files enter history, and once something is committed, removing it properly is genuinely awkward. Name the files you mean, or stage a directory you have just inspected with `git status`. The extra three seconds buy you commits that are actually reviewable, which is the entire point of the workflow this section is teaching.

Finally, resist the temptation to treat the git commands as incantations to be memorised, which is the trap the cheat-sheet format pushes you toward. The three-trees diagram in section 5 is the whole model, and every command you will meet later, including `reset`, `stash`, `rebase` and `cherry-pick`, is a different move between those same four places. If you hold the diagram, you can reason about commands you have never seen. If you hold only a list, every new command is a new thing to memorise.

*Sources: the CS237A Section 1 document, [Pro Git](https://git-scm.com/book/en/v2), [git-add documentation](https://git-scm.com/docs/git-add), [GitHub Docs on pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests), the [Filesystem Hierarchy Standard 3.0](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html), [ROS 2 Humble installation docs](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html), [Microsoft's WSL documentation](https://learn.microsoft.com/en-us/windows/wsl/about) and the [GitHub CLI manual](https://cli.github.com/manual/). Every machine-specific fact, including the three home directories, the 24 GB home total, the zero-byte `section1.py`, the stale `origin/main`, the dash symlink at `/usr/bin/sh`, the two authenticated `gh` installations and all nine error diagnoses, was measured directly on this laptop during the 2026-09-30 session rather than inferred.*
