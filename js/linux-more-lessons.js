LINUX_LESSONS.push(
  {
    id: "path-search",
    module: "Looking around",
    title: "Where the shell looks for a command",
    word: { term: "PATH", means: "the list of directories the shell searches when you type a command name." },
    steps: [
      { label: "A search", text: "When you type ls, the shell does not guess. It walks a list of directories and runs the first file named ls that it is allowed to execute." },
      { label: "The usual places", text: "Those directories are things like /bin and /usr/bin. echo $PATH prints the list. Colons separate the names. Your working directory is usually not on the list." },
      { label: "Why the dot", text: "That is why ./readport was required. readport sits in this directory, and this directory is not searched. The dot-slash says: this file, here, not a search." },
      { label: "A wrong one", text: "If two directories both contain a program of the same name, the earlier directory wins. A surprise command is often an older copy earlier on the PATH, not the file you just copied." }
    ],
    code: `echo $PATH`,
    takeaway: "The shell searches PATH. The directory you are in is usually not on it, so a program here needs ./ in front of the name.",
    quiz: {
      q: "Why does ./readport work when readport alone does not?",
      choices: [
        "The current directory is not on PATH, and ./ names the file here",
        "The boot ROM only runs names that start with a dot",
        "readport is a device tree"
      ],
      a: 0,
      because: "PATH is a list of directories. Dot-slash skips the search and points at this directory."
    }
  },
  {
    id: "three-streams",
    module: "Looking around",
    title: "Output, errors, and input",
    word: { term: "Standard error", means: "the stream where a program reports failure. A pipe does not carry it." },
    steps: [
      { label: "Three doors", text: "Every process starts with three streams. Standard input is what it reads. Standard output is the normal result. Standard error is the failure text. On a terminal, output and errors both look like the screen." },
      { label: "The pipe again", text: "A pipe moves standard output only. If ls fails, the error still appears on the screen, and the next command sees no bytes. That is why a failing pipeline can look mixed." },
      { label: "Catch the error", text: "You can send standard error to a file of its own. Then the screen stays clean and the reason is saved. The sample asks ls for a path that is not there, and keeps the complaint in /tmp/err." },
      { label: "Input too", text: "A less-than sign feeds a file into standard input. Many commands also accept the file name as an argument. Use whichever the command's help describes. Do not assume every program reads a pipe." }
    ],
    code: `ls /no/such/path 2>/tmp/err
cat /tmp/err`,
    takeaway: "A pipe carries normal output. Errors are a second stream. Send that stream to a file when you need to keep the reason.",
    quiz: {
      q: "What does a pipe fail to carry?",
      choices: [
        "Standard error, the failure text",
        "The program's normal output",
        "The pid of init"
      ],
      a: 0,
      because: "The pipe joins standard output to the next program's input. Errors still go to the terminal unless you redirect them."
    }
  },
  {
    id: "grep-line",
    module: "Looking around",
    title: "Keep the lines that mention a word",
    word: { term: "grep", means: "a program that prints only the lines containing the text you name." },
    steps: [
      { label: "A filter", text: "dmesg can be long. grep reads those lines and prints the ones that contain the word you gave. The rest is dropped." },
      { label: "With a pipe", text: "dmesg | grep tty is the pipe you already know. dmesg writes the log. grep reads it and keeps the serial-port lines. No temporary file is left behind." },
      { label: "A file too", text: "grep tty /etc/inittab searches that file directly, if it exists. The pattern is plain text here. A dot or a star can mean more in a pattern, so search for a plain word until you mean a pattern." },
      { label: "Nothing found", text: "No output and a quiet return means no line matched. That is an answer, not a hung command. If you expected a driver line and got silence, the driver did not say that word." }
    ],
    code: `dmesg | grep tty`,
    takeaway: "grep prints the lines that contain a word. Pipe dmesg into it when the kernel log is longer than the question you are asking.",
    quiz: {
      q: "What does grep print?",
      choices: [
        "Only the lines that contain the text you named",
        "Every file in PATH",
        "The boot ROM header"
      ],
      a: 0,
      because: "It is a filter. Lines that do not match are not printed."
    }
  },
  {
    id: "shell-script",
    module: "Looking around",
    title: "A file of commands",
    word: { term: "Script", means: "a text file of shell commands. The kernel runs the shell, and the shell runs the lines." },
    steps: [
      { label: "The first line", text: "A script starts with #! and the program that should read the rest. #!/bin/sh means the small shell. The kernel sees that line and starts /bin/sh with your file." },
      { label: "A name", text: "NAME=board with no spaces stores a value. $NAME pastes it back later. A space around the equals sign breaks the assignment. Quotes keep a value that contains spaces as one value." },
      { label: "Run it", text: "The file needs the execute bit, same as any program. ./status runs it from this directory. The shell reads each line in order and stops at the first command that the script chose not to ignore." },
      { label: "Keep it small", text: "A script is the right tool for a few commands you repeat: show the address, show the free RAM, start your program. When the logic grows branches and timeouts, a real program is easier to test." }
    ],
    code: `#!/bin/sh
NAME=board
echo "$NAME is up"
free`,
    takeaway: "A script is commands in a file. The first line names the shell. Give the file the execute bit, then run it with ./.",
    quiz: {
      q: "What is the first line of a shell script for?",
      choices: [
        "It names the program that should read the rest of the file",
        "It is the device tree",
        "It sets the boot pins"
      ],
      a: 0,
      because: "The kernel uses that line to start /bin/sh, and the shell then runs your commands."
    }
  },
  {
    id: "users-root",
    module: "Looking around",
    title: "Root, and a quieter login",
    word: { term: "Root", means: "the user with id 0. Permission bits do not stop root." },
    steps: [
      { label: "id", text: "id prints who you are. uid=0 is root. Any other number is a normal user. The name root is a convention for that number. The number is what the kernel checks." },
      { label: "Why it is wide open", text: "Root can read files, kill processes, and load drivers. A bug in a program running as root can do all of that too. A normal user can only touch what the permission bits allow." },
      { label: "One command", text: "sudo runs a single command as root, if this board is set up to allow it. You return to your own user when that command finishes. Living in a root shell means every later command is unlimited." },
      { label: "The product app", text: "Run the product program as a normal user if it only needs its device file and its own folder. Give that user the device, instead of giving the program the whole board." }
    ],
    code: `id`,
    takeaway: "uid 0 is root, and permission bits do not apply. Use a normal user for the application, and root only for the command that needs it.",
    quiz: {
      q: "What is special about user id 0?",
      choices: [
        "The kernel treats it as root, so file permissions do not stop it",
        "It is the boot ROM",
        "It is the only process allowed to use a pipe"
      ],
      a: 0,
      because: "Root is a user id, not a program. The kernel skips the usual permission checks for uid 0."
    }
  },
  {
    id: "signals",
    module: "Looking around",
    title: "Ask a process to stop, then insist",
    word: { term: "Signal", means: "a small message to a process. The default one asks it to exit. One of them cannot be ignored." },
    steps: [
      { label: "Not a knife", text: "kill does not remove a process by force at first. It sends a signal. The usual signal is TERM. A careful program catches TERM, closes its files, and exits." },
      { label: "The pid", text: "The number still comes from ps. kill 42 means signal 42, the process. A wrong number signals some other program. Read the line, then send." },
      { label: "When it will not", text: "KILL cannot be caught or ignored. The kernel removes the process. Files it was writing can be left half done. Send TERM, give it a moment, and use KILL only if it is still there." },
      { label: "Still not pid 1", text: "init is the process that keeps userspace alive. Signaling it to die is how you stop the board, not how you restart your app. Restart the app by its own pid." }
    ],
    code: `# 42 must be the pid you just read from ps.
kill -TERM 42`,
    takeaway: "TERM asks a process to finish its work and exit. KILL cannot be caught, so it is the second try. The pid comes from ps.",
    quiz: {
      q: "Why send TERM before KILL?",
      choices: [
        "TERM lets the program close files. KILL does not",
        "TERM reboots the boot ROM",
        "KILL is ignored by every program"
      ],
      a: 0,
      because: "A program can handle TERM and exit cleanly. KILL stops it immediately, even mid-write."
    }
  },
  {
    id: "proc-window",
    module: "Looking around",
    title: "A process, seen as files",
    word: { term: "/proc", means: "a kernel view that looks like files. It is not stored on the SD card." },
    steps: [
      { label: "Not a disk", text: "ls /proc shows numbers and names. The numbers are pids. Nothing here was copied from the root filesystem. The kernel invents the contents when you read them." },
      { label: "One process", text: "The shell's own pid is $$. ls /proc/$$ shows that process. cmdline is the command that started it. status shows its state and its user." },
      { label: "The whole board", text: "meminfo is RAM. cpuinfo is the CPU the kernel sees. These are the same facts free and uname print, read as files so a script can use them." },
      { label: "Do not hoard them", text: "The numbers change. A pid directory vanishes when the process exits. Do not save settings under /proc. Write settings on a real disk." }
    ],
    code: `ls /proc/$$
cat /proc/meminfo`,
    takeaway: "/proc is the kernel pretending to be files. A pid directory describes one process. meminfo describes RAM. None of it is the SD card.",
    quiz: {
      q: "Where do the files under /proc live?",
      choices: [
        "They are generated by the kernel when you read them",
        "They are the bootloader's raw area",
        "They are copied into SRAM at reset"
      ],
      a: 0,
      because: "There is no /proc on the card. The kernel fills in the bytes for each read."
    }
  },
  {
    id: "mounts",
    module: "Looking around",
    title: "Disks attached to folders",
    word: { term: "Mount", means: "attach a filesystem so its tree appears at a directory." },
    steps: [
      { label: "A place", text: "The root disk is mounted at /. Another partition can be mounted at /data. After that, paths under /data are the other disk. The folder is the doorway, not a copy of the files." },
      { label: "df", text: "df -h shows each mount and how full it is, in human sizes. A full root disk makes ordinary writes fail. The column that is at 100 percent is the one that is out of room." },
      { label: "Kernel trees", text: "/proc and /sys are mounts too, with no disk behind them. /sys is how the kernel publishes devices and a few knobs. Reading is safe. Writing a knob is a command to a driver, so write only what that driver documents." },
      { label: "Before you pull it", text: "A mounted card is in use. Copy your files, then unmount, then pull it. Pulling a mounted card can leave a half-written file, the same hazard as power loss mid-write." }
    ],
    code: `df -h`,
    takeaway: "Mounting attaches a filesystem at a directory. df -h shows which one is full. /proc and /sys are kernel views, not extra cards.",
    quiz: {
      q: "What does df tell you?",
      choices: [
        "How full each mounted filesystem is",
        "Which boot pin was selected",
        "The pid of every driver"
      ],
      a: 0,
      because: "Each mount is listed with its size and the space still free."
    }
  },
  {
    id: "modules",
    module: "Looking around",
    title: "A driver loaded after boot",
    word: { term: "Module", means: "a piece of kernel code that can be loaded and removed without replacing the whole kernel." },
    steps: [
      { label: "lsmod", text: "lsmod lists the modules in memory. The used-by count means something still needs that module. A count of zero means it is loaded and idle." },
      { label: "Load", text: "modprobe and a name loads that module and anything it depends on, if the board has the file. After it loads, dmesg often prints the probe line, and a new name may appear under /dev." },
      { label: "Remove", text: "rmmod unloads a module that nothing is using. If a program still has the device open, the remove fails. Close the program first. Do not remove a module you did not load just to see what happens." },
      { label: "Still not a lesson in writing one", text: "Writing a module means kernel code, a build against this kernel, and a crash that takes the whole board down. Use the modules the board already ships. Open the device they publish." }
    ],
    code: `lsmod`,
    takeaway: "lsmod shows kernel code loaded after boot. modprobe loads one. If something still uses it, it will not unload.",
    quiz: {
      q: "What is a kernel module?",
      choices: [
        "Kernel code that can be loaded without replacing the whole image",
        "A shell script in /tmp",
        "The boot ROM"
      ],
      a: 0,
      because: "It runs in the kernel, like a built-in driver, but it can arrive later."
    }
  },
  {
    id: "ram-left",
    module: "Looking around",
    title: "How much RAM is really free",
    word: { term: "Available memory", means: "the RAM a new program can still have. Cache that the kernel can drop counts as available." },
    steps: [
      { label: "free", text: "free prints total RAM, what is in use, and what is left. The useful column on a modern free is available. That is the estimate of what you can still allocate." },
      { label: "Cache", text: "The kernel keeps copies of files in RAM so the next read is fast. That cache is given back when a program needs the pages. A large cache is not a leak." },
      { label: "A real shortage", text: "When available falls near nothing, allocations fail or the kernel picks a process and kills it. That kill is sudden. The log often says the system is out of memory." },
      { label: "Find the hog", text: "ps can be asked to sort by memory. One runaway process is a different problem from a board that never had enough RAM for the maps, the kernel, and your app together." }
    ],
    code: `free`,
    takeaway: "available is the RAM you can still use. File cache is borrowed, not lost. When nothing is available, the kernel may kill a process.",
    quiz: {
      q: "Why is a large file cache not automatically a leak?",
      choices: [
        "The kernel can give those pages back when a program needs them",
        "Cache lives in the boot ROM",
        "Cache is the device tree"
      ],
      a: 0,
      because: "Cache is a copy of file data kept for speed. It is reclaimable. available already counts it."
    }
  },
  {
    id: "ip-addr",
    module: "Reach the board",
    title: "The board's own address",
    word: { term: "Interface", means: "a network port the kernel named, such as an Ethernet jack or a USB network gadget." },
    steps: [
      { label: "A name", text: "The kernel names each port. Older boards often use eth0. Newer ones may use a longer name. ip addr prints every name, and the address if it has one. The board manual is wrong less often than a guess." },
      { label: "Up or down", text: "DOWN means the port is not in service. NO-CARRIER means the cable or the peer is missing. An address on a down port will not answer." },
      { label: "Itself", text: "127.0.0.1 is the board talking to itself. Ping that and you have tested the kernel's loop, not the cable. The address you give to another computer is the one on the real port." },
      { label: "Who chose it", text: "A router may hand the address out, or the board may be configured with a fixed one. ip addr shows the result either way. It does not show which of those two methods was used." }
    ],
    code: `ip addr`,
    takeaway: "ip addr lists each network port and its address. 127.0.0.1 is the board itself. A port with no carrier will not answer on the cable.",
    quiz: {
      q: "What does 127.0.0.1 mean?",
      choices: [
        "The board talking to itself, not a machine at the other end of the cable",
        "The boot ROM",
        "The serial console"
      ],
      a: 0,
      because: "That address never leaves the board. The cable uses the address on the real port."
    }
  },
  {
    id: "ping-ssh",
    module: "Reach the board",
    title: "A shell over the network",
    word: { term: "ssh", means: "a login and a shell across the network. The serial cable is no longer the only door." },
    steps: [
      { label: "Ping first", text: "ping sends a few echoes and waits. Replies mean the address is reachable. Silence means a wrong address, a down port, or a cable. Fix that before you blame the shell." },
      { label: "Then ssh", text: "ssh and the user and the address open a login. After the password, you have a shell on the board. The commands are the same ones you typed on the serial port." },
      { label: "The first time", text: "The first connection asks you to accept a host key, a fingerprint of that board. Read it once. A sudden change later means you might not be talking to the same board." },
      { label: "Keep the cable", text: "If the address is wrong, ssh cannot fix it. The serial console still can. Bring the network up from the serial shell, then use ssh the next time." }
    ],
    code: `# The address is an example. Use the one from ip addr.
ping -c 3 192.168.1.10
ssh root@192.168.1.10`,
    takeaway: "ping checks that the address answers. ssh then gives you a shell. Keep the serial cable for the day the address is wrong.",
    quiz: {
      q: "What does ssh give you that ping does not?",
      choices: [
        "A login and a shell on the board",
        "A new boot ROM",
        "A mount of the SD card on the PC"
      ],
      a: 0,
      because: "Ping only checks the path. ssh runs a shell once the path and the login work."
    }
  },
  {
    id: "boot-again",
    module: "Reach the board",
    title: "Start it again at the next boot",
    word: { term: "Startup script", means: "a command init runs for you. It comes back after power returns. A command you typed does not." },
    steps: [
      { label: "The shell forgets", text: "./readport lives only as long as that process. Reboot, and init starts the serial login again. It does not remember what you typed." },
      { label: "A hook", text: "Boards differ. One common hook is a script init runs near the end of boot. Put the program's full path there, the one under /usr/bin, not a copy in /tmp." },
      { label: "Stay running", text: "If the program should keep running, it should loop until it is stopped, and init can restart it if it exits. Backgrounding it and hoping is how a product comes up once and then stays silent." },
      { label: "Test the reboot", text: "Reboot and watch the serial console. The program should appear without you typing it. If it does not, the hook did not run, or the program exited at once. dmesg and the program's own first print will say which." }
    ],
    code: `# Teaching sketch. The file name depends on the board.
# init runs this. The shell you typed in does not.
/usr/bin/readport`,
    takeaway: "A command you type dies at reboot. Init can start the full path of your program every boot. Watch one reboot to prove the hook ran.",
    quiz: {
      q: "Why does a program you started by hand not return after reboot?",
      choices: [
        "Init starts the configured programs, not the history of your shell",
        "The boot ROM erases /usr/bin",
        "PATH is stored in SRAM"
      ],
      a: 0,
      because: "The shell session is gone. Only what init is told to start comes back."
    }
  },
  {
    id: "log-file",
    module: "Reach the board",
    title: "Lines that are still there later",
    word: { term: "Log file", means: "messages written to disk. Unlike dmesg, they can still be there after the ring has moved on." },
    steps: [
      { label: "The ring again", text: "dmesg is a ring in RAM. New lines push old ones out, and a reboot starts it fresh. It is the right tool for what the kernel just did. It is the wrong tool for last Tuesday." },
      { label: "A directory", text: "Many boards keep text logs under /var/log. ls shows the names. A file there survives as long as that disk survives. Your program can append its own line to a file it owns." },
      { label: "RAM on purpose", text: "A read-only or flash-sparing board often keeps /var/log in RAM. Then the files look real and still vanish at reboot. df tells you. If the mount is a RAM disk, the log is not a record." },
      { label: "Do not fill it", text: "A log that never rotates will fill the disk, and then ordinary writes fail. Keep the lines short, and keep a bound. A full root disk is a worse bug than a missing debug line." }
    ],
    code: `ls /var/log
df -h /var/log`,
    takeaway: "dmesg is a short ring in RAM. A file under /var/log lasts only if that directory is a real disk. Check with df before you trust it.",
    quiz: {
      q: "When does a file under /var/log vanish at reboot even though you wrote it?",
      choices: [
        "When that directory is a RAM disk, not the SD card",
        "When grep cannot see it",
        "When the file lacks the execute bit"
      ],
      a: 0,
      because: "RAM is cleared at power loss. df shows whether /var/log is backed by a disk."
    }
  },
  {
    id: "readonly-root",
    module: "Reach the board",
    title: "A root disk you do not write",
    word: { term: "Read-only root", means: "the system tree is mounted so programs cannot change it. Power loss cannot tear those files." },
    steps: [
      { label: "Why", text: "A write that dies halfway can leave a program or a library unreadable. If / is read-only, those files stay as they were flashed. The board still boots." },
      { label: "Where writes go", text: "Scratch goes to a RAM disk, often /tmp. Settings that must stick go to a separate partition mounted read-write, often something like /data. Your program needs to know which is which." },
      { label: "How you can tell", text: "mount prints the options. An ro on / means read-only. An rw means writes are allowed. df still shows the space. The two facts answer different questions." },
      { label: "Updating", text: "To replace a program on a read-only root you remount it writable, copy the file, and mount it read-only again. Or you update a whole image, the way the chip course updated a slot. Do not leave it writable because one copy was convenient." }
    ],
    code: `mount`,
    takeaway: "A read-only root survives a bad power cut. Put scratch in RAM and settings on a disk that is meant to be written. mount shows which is which.",
    quiz: {
      q: "What does a read-only root protect you from?",
      choices: [
        "A power cut tearing the system files",
        "A full PATH",
        "Ping failing"
      ],
      a: 0,
      because: "The system files are not being written, so a half-written file cannot appear there."
    }
  },
  {
    id: "copy-binary",
    module: "Reach the board",
    title: "Build on the PC, run on the board",
    word: { term: "Cross compiler", means: "a compiler that runs on your PC and writes a binary for the board's CPU." },
    steps: [
      { label: "The CPU", text: "A binary is built for one kind of CPU. A PC is often x86-64. A board in this course's family is often ARM. The PC's own compiler writes a file the board will refuse to run." },
      { label: "The right compiler", text: "A cross compiler runs on the PC and targets the board. Its name usually mentions the CPU and linux. The board's own compiler, if it even has one, is the other choice, and small boards often do not." },
      { label: "Copy", text: "scp copies the file to a directory on the board, such as /usr/bin. Then chmod a+x, the same execute bit as before. A copy does not set that bit for you on every system." },
      { label: "Check the file", text: "On the board, file and the program's name prints the CPU it was built for. If it does not match cpuinfo, you copied the PC's binary. Fix the compiler, then copy again." }
    ],
    code: `# On the PC: a compiler that targets the board, then:
scp readport root@192.168.1.10:/usr/bin/
# On the board:
chmod a+x /usr/bin/readport
file /usr/bin/readport`,
    takeaway: "Compile for the board's CPU, copy the file with scp, and set the execute bit. file tells you if the binary matches the board.",
    quiz: {
      q: "Why might a binary built on the PC fail on the board?",
      choices: [
        "It was built for the PC's CPU, not the board's",
        "scp always strips the device tree",
        "The shell cannot run files under /usr/bin"
      ],
      a: 0,
      because: "The CPU family is part of the binary. An ARM board does not run an x86-64 program."
    }
  }
);
