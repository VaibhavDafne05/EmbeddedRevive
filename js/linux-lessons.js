const LINUX_LESSONS = [
  {
    id: "why-linux",
    module: "The board",
    title: "A board that runs many programs",
    word: { term: "Operating system", means: "the program that stays in charge so other programs can share the board." },
    steps: [
      { label: "One loop", text: "The chip course was one program. It owned the CPU, the pins, and the memory. When it returned from main, there was nothing else to run." },
      { label: "Many jobs", text: "A Linux board runs a shell, a logger, your application, and a network task at the same time. Something has to decide who runs, and stop one program from smashing another's memory." },
      { label: "The kernel", text: "That something is the kernel. It owns the hardware. Your programs ask it for time, memory, and devices. They do not poke UART registers themselves." },
      { label: "Already installed", text: "This tab is a board that already boots Linux. The pictures follow power-on through the first shell, then the commands you type there. The board manual still names the exact pins and partitions." }
    ],
    takeaway: "Linux is the program in charge. Your programs ask it for the hardware instead of owning the chip alone.",
    quiz: {
      q: "What is the kernel's job on this board?",
      choices: [
        "It owns the hardware and shares the board among programs",
        "It is the text file you edit in the shell",
        "It replaces the need for a bootloader"
      ],
      a: 0,
      because: "Programs ask the kernel. The kernel decides who runs and who may touch a device."
    }
  },
  {
    id: "boot-chain",
    module: "The board",
    title: "Five programs, in order",
    word: { term: "Boot", means: "the path from reset to a running system. Each program loads the next one." },
    steps: [
      { label: "Boot ROM", text: "Reset enters a tiny program stored inside the chip. You do not flash it. It only knows how to load the next, small image from a card, a chip, or a cable." },
      { label: "Small loader", text: "That small loader runs before the big memory is ready. Its job is to turn the DRAM on, then load a full bootloader into it." },
      { label: "Bootloader", text: "The bootloader is large enough to speak on the serial port. It loads the kernel, a description of this board, and sometimes a tiny filesystem, then jumps." },
      { label: "Kernel", text: "The kernel starts the drivers this board needs and mounts the root disk. The root disk is the tree of files the system will live in." },
      { label: "First process", text: "The kernel starts one userspace program, init. Init starts a login on the serial port, or it starts your application. Only then do you have a shell." }
    ],
    takeaway: "Reset, boot ROM, small loader, bootloader, kernel, then init. Each one exists because the previous one was too small for the next job.",
    quiz: {
      q: "Which program runs first after reset?",
      choices: [
        "The boot ROM stored inside the chip",
        "The kernel",
        "The shell"
      ],
      a: 0,
      because: "The kernel is loaded much later. Reset starts in the on-chip boot ROM."
    }
  },
  {
    id: "boot-rom",
    module: "The board",
    title: "The program inside the chip",
    word: { term: "Boot ROM", means: "fixed code in the chip. It runs at reset and loads the first image from outside." },
    steps: [
      { label: "Not on the card", text: "The boot ROM is manufactured into the SoC. Replacing the SD card does not replace it. If this code is wrong for your board, that is a chip choice, not a file you edit." },
      { label: "Boot pins", text: "Straps or fuses tell the ROM where to look: an SD card, eMMC, a SPI flash, USB, or a UART. The same chip can boot from different media. The board wires the choice." },
      { label: "Into SRAM", text: "The ROM copies a small image into on-chip SRAM. SRAM is already alive at reset. DRAM is not. The image has to fit, so it is not the kernel." },
      { label: "Next device", text: "The ROM checks a header. If the header is nonsense, it tries the next boot device on its list. A blank card often falls through to USB or UART, which looks like a silent board until you notice which device it picked." }
    ],
    takeaway: "The boot ROM is inside the chip. It reads the boot pins, copies a small image into SRAM, and gives up on a bad header.",
    quiz: {
      q: "Why can't the boot ROM load the kernel straight away?",
      choices: [
        "The kernel is too big for on-chip SRAM, and DRAM is not ready yet",
        "The kernel refuses to run from flash",
        "The shell has to log in first"
      ],
      a: 0,
      because: "At reset only a little SRAM is usable. DRAM comes later, started by the small loader."
    }
  },
  {
    id: "spl-dram",
    module: "The board",
    title: "Turn on the big memory",
    word: { term: "SPL", means: "the secondary program loader. The small program that starts DRAM, then loads the bootloader." },
    steps: [
      { label: "Still small", text: "The file the ROM loaded is often called the SPL. It is the front of a bootloader such as U-Boot, built small on purpose. It runs from SRAM." },
      { label: "DRAM timing", text: "DRAM needs clocks and timing that match the chips on this board. The SPL programs that and waits until the memory can be trusted. Get the timing wrong and later code crashes in a way that looks random." },
      { label: "Load the rest", text: "With DRAM alive, the SPL reads the full bootloader from the same media and copies it into DRAM. That second program is allowed to be large." },
      { label: "A fixed offset", text: "The ROM finds the SPL at an offset the chip manual names, not always at the start of a filesystem. Partition one can hold Linux while the SPL still sits in a raw area in front of it." }
    ],
    takeaway: "The SPL runs from SRAM, turns DRAM on, and only then loads the full bootloader. It is not the boot ROM, and it is not Linux.",
    quiz: {
      q: "What is the SPL's main job?",
      choices: [
        "Start DRAM, then load the full bootloader into it",
        "Mount the root disk and start the shell",
        "Compile your application"
      ],
      a: 0,
      because: "Until DRAM works, nothing large can run. The kernel comes after the bootloader."
    }
  },
  {
    id: "bootloader-jump",
    module: "The board",
    title: "Hand the kernel a map of the board",
    word: { term: "Device tree", means: "a data blob that tells one kernel binary which hardware this board actually has." },
    steps: [
      { label: "A real console", text: "The full bootloader runs from DRAM, so it can talk on the serial port. Many boards count down a second or two. Stop that countdown and you get the bootloader's own prompt. That prompt is not Linux." },
      { label: "Three loads", text: "It loads a kernel image, a device tree blob, and sometimes an initramfs. The tree names the CPU, the memory, the serial port, and the storage. Change the board, change the tree, keep the same kernel." },
      { label: "The command line", text: "It also passes a short text line. That line names the console and the root disk. rootwait tells the kernel to pause until the card has shown up, instead of giving up on the first try." },
      { label: "Jump", text: "The bootloader puts the device tree address where the kernel expects it and branches to the kernel entry. It does not return. From here the kernel is in charge of the CPU." }
    ],
    code: `# Teaching sketch of the handoff. Names differ by board.
# The bootloader loads these, then jumps.
kernel  = Image
tree    = board.dtb
initrd  = optional
cmdline = "console=ttyS0,115200 root=/dev/mmcblk0p2 rootwait"`,
    takeaway: "The bootloader loads the kernel, the device tree, and a command line, then jumps. Its prompt is not a Linux shell.",
    quiz: {
      q: "Why does the kernel receive a device tree?",
      choices: [
        "So one kernel image can learn what this board has",
        "So the boot ROM can be updated from Linux",
        "So DRAM timing can be skipped"
      ],
      a: 0,
      because: "The tree describes the board. The kernel binary does not have to be rebuilt for every wiring change."
    }
  },
  {
    id: "kernel-mount",
    module: "The board",
    title: "Drivers, then the root disk",
    word: { term: "Root filesystem", means: "the disk the kernel mounts at /. Everything else hangs under it." },
    steps: [
      { label: "Unpack", text: "Many kernel images are compressed. The kernel unpacks itself into RAM, reads the device tree the bootloader left, and starts the drivers that tree asked for. The serial port comes up early, which is why the console keeps printing." },
      { label: "Storage", text: "A storage driver has to exist before the root disk can be mounted. The command line names that disk, often a partition such as the second slice of an SD card. The real name is in the board manual." },
      { label: "Wait for it", text: "Cards and USB disks show up a moment after the driver starts. rootwait means: keep trying. Without it, the kernel can panic because the disk was simply late, not missing." },
      { label: "A packed spare", text: "An initramfs is a small filesystem packed beside the kernel. Use it when the real root needs a driver or a setup step that is not built in. It runs first, then switches to the real disk. If you have a plain card with a ready partition, you often do not need one." }
    ],
    takeaway: "The kernel starts the drivers the device tree named, waits for the root disk, and mounts it. An initramfs is only the spare path.",
    quiz: {
      q: "What does rootwait ask the kernel to do?",
      choices: [
        "Wait until the storage device is ready before mounting root",
        "Skip the device tree",
        "Start the shell before any driver"
      ],
      a: 0,
      because: "The disk can appear after its driver. Giving up on the first look is a false failure."
    }
  },
  {
    id: "first-process",
    module: "The board",
    title: "The first process, then a shell",
    word: { term: "init", means: "the first userspace process. The kernel starts it, and it starts everything else." },
    steps: [
      { label: "PID 1", text: "After the root disk is mounted, the kernel starts one program, usually /sbin/init. That process is number 1. Every later process is started by it or by one of its children." },
      { label: "A console", text: "init starts a getty on the serial port. Getty prints the login prompt and, after a login, starts a shell. The shell is just another process. It is not part of the kernel." },
      { label: "Or your app", text: "A product board can skip the login and start your application as the main job. The steps are the same: the kernel starts init, and init starts the program you chose." },
      { label: "Do not lose it", text: "If PID 1 exits, userspace has no one left to start programs, and the kernel treats that as fatal. Stopping a normal application is fine. Stopping init is not." }
    ],
    takeaway: "The kernel starts init. Init starts the serial login or your application. The shell arrives only after that chain.",
    quiz: {
      q: "Why is PID 1 special?",
      choices: [
        "It is the first userspace process, and the others are started from it",
        "It is the boot ROM",
        "It is the device tree"
      ],
      a: 0,
      because: "Init is the parent of userspace. The boot ROM and the device tree are long finished by then."
    }
  },
  {
    id: "kernel-user",
    module: "The board",
    title: "Ask, do not touch the hardware",
    word: { term: "System call", means: "the controlled door from a program into the kernel." },
    steps: [
      { label: "Two worlds", text: "Your program runs in user mode. The kernel runs with the right to touch devices and other programs' pages. A normal store instruction cannot reach a UART register from user mode." },
      { label: "The door", text: "open, read, write, and fork are requests. The CPU traps into the kernel, the kernel checks the request, does the work, and returns a result. That trap is a system call." },
      { label: "Why the door", text: "The check is the point. One program cannot read another's memory or reprogram a pin unless the kernel allows that exact action. The chip course had no such door, because one program was the whole machine." },
      { label: "Cost", text: "A system call is heavier than a function call. A tight loop that reads one byte at a time pays that cost every byte. Batch the work when you can." }
    ],
    takeaway: "Programs ask through system calls. The kernel checks the ask, then touches the hardware.",
    quiz: {
      q: "What is a system call?",
      choices: [
        "A trap into the kernel so it can do privileged work for you",
        "A jump back to the boot ROM",
        "A comment in the device tree"
      ],
      a: 0,
      because: "open and read are requests. The kernel performs them and returns."
    }
  },
  {
    id: "device-files",
    module: "The board",
    title: "Devices that look like files",
    word: { term: "Device file", means: "a name under /dev that a driver published. Reading it talks to hardware." },
    steps: [
      { label: "A name", text: "The serial port shows up as a file, often /dev/ttyS0 or /dev/ttyAMA0. The name is the driver's choice for this board. The manual, not a guess, tells you which one is the port you wired." },
      { label: "Same calls", text: "open, read, and write are the same calls you use on a text file. The driver turns those bytes into register operations. Your program never sees the registers." },
      { label: "Not a document", text: "A device file has no length you can trust, and reading it can block until a byte arrives. Treat it as a conversation, not as a document you load into RAM." },
      { label: "Other files", text: "Disks, GPIO chips, and some sensors appear the same way. A path under /sys can also expose a knob the driver allows. Write only the knob the driver documented." }
    ],
    code: `/* Teaching sketch. The path belongs to the board. */
int fd = open("/dev/ttyS0", O_RDWR);
char b;
read(fd, &b, 1);          /* may wait for a byte */
write(fd, "ok\n", 3);
close(fd);`,
    takeaway: "A device is a file name the driver published. open, read, and write are the conversation. The path comes from the board.",
    quiz: {
      q: "What does reading /dev/ttyS0 actually do?",
      choices: [
        "It asks the serial driver for the next byte",
        "It loads the kernel into SRAM",
        "It prints the device tree"
      ],
      a: 0,
      because: "The file name is the door. The driver turns the read into a receive from the port."
    }
  },
  {
    id: "processes",
    module: "The board",
    title: "A program that is running",
    word: { term: "Process", means: "a running program, with its own number, memory, and open files." },
    steps: [
      { label: "Not the file", text: "The file /bin/sh is a program on disk. When init starts it, the running copy is a process. You can start two copies. They are two processes from one file." },
      { label: "A number", text: "Each process has a pid. PID 1 is init. Your shell has its own pid. A child gets a new pid, and it remembers its parent." },
      { label: "What it holds", text: "A process has a current directory, open files, and a user. Closing the terminal does not always stop a process you sent to the background. The pid is how you find it later." },
      { label: "The shell too", text: "The shell is a process that reads lines and starts other processes. When you type a command, the shell usually waits until that child exits, then prints the prompt again." }
    ],
    takeaway: "A process is a running program with a pid. The file on disk is only the recipe. The shell is a process that starts others.",
    quiz: {
      q: "What is the difference between a program file and a process?",
      choices: [
        "The file is on disk. A process is one running copy of it",
        "They are two names for the boot ROM",
        "A process is stored in the device tree"
      ],
      a: 0,
      because: "Two copies of the same file are two processes, with two pids."
    }
  },
  {
    id: "own-memory",
    module: "The board",
    title: "The same address, different bytes",
    word: { term: "Virtual memory", means: "each process gets its own addresses. The kernel maps them onto real RAM." },
    steps: [
      { label: "A private map", text: "Process A and process B can both use address 0x1000. Those are not the same RAM cell. Each process has a map, and the kernel fills in the real page behind it." },
      { label: "A crash stays put", text: "If one process follows a bad pointer, it faults. The kernel stops that process. The other process keeps running. On the bare-metal chip, a bad pointer could smear anyone's variables." },
      { label: "Sharing is explicit", text: "When two programs must share bytes, they ask: a pipe, a file, or a region the kernel sets up. They do not quietly agree on a physical address." },
      { label: "It is not free", text: "The map costs memory and makes a trap on the first touch of a new page. A tiny board can run out of RAM because of maps and caches, not because your array was large." }
    ],
    takeaway: "Each process has its own addresses. A fault stops that process. Sharing happens only through something the kernel provides.",
    quiz: {
      q: "Can two processes use the same address and still have different data?",
      choices: [
        "Yes. Each has its own map onto RAM",
        "No. An address always means one cell",
        "Only while the boot ROM is running"
      ],
      a: 0,
      because: "The address is virtual. The kernel decides which real page it names for that process."
    }
  },
  {
    id: "driver-picture",
    module: "The board",
    title: "The translator for one device",
    word: { term: "Driver", means: "kernel code that knows one device's registers and offers a file or a call to everyone else." },
    steps: [
      { label: "Who has the registers", text: "The UART's registers sit in the device's address window, the same idea as on the microcontroller. In Linux, only the driver is supposed to touch them." },
      { label: "The tree picks it", text: "The device tree says this board has this UART at this address. The kernel starts the matching driver. No matching driver means no /dev file, even if the pins are wired." },
      { label: "Your side", text: "Your program opens the name the driver published. The driver queues bytes, handles the interrupt, and returns from read when data arrives. That interrupt is the kernel's, not a function in your code." },
      { label: "A loadable piece", text: "Some drivers are built into the kernel image. Some are modules loaded later. Either way they run in the kernel. This lesson does not build a module. It shows the door you are meant to use." }
    ],
    code: `/* The driver already lives in the kernel.
   Your program only opens the name it published. */
int fd = open("/dev/ttyS0", O_RDWR);
if (fd < 0) {
  /* wrong path, or the driver never started */
}`,
    takeaway: "The driver owns the registers. The device tree starts the right driver. Your program opens the file the driver publishes.",
    quiz: {
      q: "Who is supposed to program the UART registers on a Linux board?",
      choices: [
        "The driver inside the kernel",
        "Each application, whenever it wants",
        "The boot ROM, on every byte"
      ],
      a: 0,
      because: "Applications use the device file. The driver is the only code that should touch those registers."
    }
  },
  {
    id: "root-disk",
    module: "The board",
    title: "The tree the board boots from",
    word: { term: "Root", means: "the top of the filesystem, written /. The kernel mounted this disk there." },
    steps: [
      { label: "One tree", text: "After mount, paths start at /. /bin holds programs, /etc holds settings, /home or /root holds people, /dev appears as devices, and /tmp is scratch space that may vanish on reboot." },
      { label: "Your program", text: "Put a product program somewhere stable, often /usr/bin or a directory you create. The SD card's Linux partition is this tree. The raw area in front of it was for the SPL and the bootloader." },
      { label: "Libraries", text: "A C program often needs shared libraries beside it. Copying only the executable to a fresh board fails if those libraries are missing. The loader says which file it could not find." },
      { label: "Power loss", text: "This disk is the one that must survive power loss. A write that is still in a cache can vanish if you pull the card. For a setting that must stick, write it, then ask the kernel to flush." }
    ],
    takeaway: "The root disk is the file tree at /. Programs, settings, and device names live there. The boot files in front of that partition are a different area.",
    quiz: {
      q: "What is / after Linux has booted?",
      choices: [
        "The top of the root filesystem the kernel mounted",
        "The boot ROM",
        "The SPL in SRAM"
      ],
      a: 0,
      because: "The kernel mounted the root disk at /. Paths grow down from there."
    }
  },
  {
    id: "serial-shell",
    module: "On the board",
    title: "A prompt on the serial port",
    word: { term: "Shell", means: "a process that reads a command line, runs it, and prints the result." },
    steps: [
      { label: "The cable", text: "The serial console is the same UART idea as the chip course: a baud rate, a ground, and crossed TX and RX. The bootloader and the kernel already used this wire. The shell inherits it." },
      { label: "The prompt", text: "A prompt such as # or $ means the shell is waiting. Nothing runs until you finish the line. Enter is the signal, not a pause in your typing." },
      { label: "One command", text: "The first word is the program. The shell looks it up and starts a process. uname -s asks that program to print the kernel's name. You should see Linux." },
      { label: "Not the bootloader", text: "If the prompt looks like a countdown or a bootloader name, Linux has not started. Let it continue, or the commands below have no filesystem to work on." }
    ],
    code: `uname -s`,
    takeaway: "The shell waits for Enter, then runs the program you named. uname -s should print Linux once the board has finished booting.",
    quiz: {
      q: "When does the shell run the line you typed?",
      choices: [
        "After you press Enter",
        "As soon as the first letter arrives",
        "When the boot ROM sees a header"
      ],
      a: 0,
      because: "The line is one command. Enter marks the end of it."
    }
  },
  {
    id: "paths",
    module: "On the board",
    title: "Where you are, and where you go",
    word: { term: "Working directory", means: "the folder a process treats as the starting point for a relative path." },
    steps: [
      { label: "pwd", text: "pwd prints the working directory. A path that does not start with / is relative to here. A path that starts with / starts at the root, no matter where you are." },
      { label: "ls", text: "ls lists the names in a directory. ls alone lists the working directory. ls /etc lists that directory even if you are somewhere else." },
      { label: "cd", text: "cd changes the working directory of this shell only. It does not move a file. Another process keeps the directory it already had." },
      { label: "Two dots", text: ".. means the parent directory. cd .. climbs one level. . means the directory you are already in. Those two names are real entries in every directory." }
    ],
    code: `pwd
ls
cd /etc
pwd`,
    takeaway: "pwd shows where this shell is. ls lists names. cd changes only this shell's working directory. A leading / starts at the root.",
    quiz: {
      q: "What does a path that starts with / mean?",
      choices: [
        "Start at the root, not at the working directory",
        "Start in SRAM",
        "Start the bootloader countdown"
      ],
      a: 0,
      because: "A leading slash is absolute. Without it, the path hangs off wherever pwd says you are."
    }
  },
  {
    id: "read-write",
    module: "On the board",
    title: "Show a file, and make a small one",
    word: { term: "Redirect", means: "send a command's output to a file instead of the screen." },
    steps: [
      { label: "cat", text: "cat prints a file to the screen. cat /etc/hostname shows the name the board was given. If the file is huge, cat will flood the serial port. Prefer a short file while you are learning." },
      { label: "echo", text: "echo repeats the words you give it. On its own, those words appear on the screen. That screen is the command's standard output." },
      { label: "Into a file", text: "A greater-than sign sends that output into a file. echo hello > /tmp/note creates /tmp/note or replaces what was there. It does not append. Two greater-than signs append." },
      { label: "Read it back", text: "cat /tmp/note prints hello. /tmp is scratch space. Do not keep the only copy of a setting there if the board clears /tmp on boot." }
    ],
    code: `echo hello > /tmp/note
cat /tmp/note`,
    takeaway: "cat shows a file. echo writes words. One greater-than sign sends those words into a file, replacing it.",
    quiz: {
      q: "What does one greater-than sign do when echo hello is sent into /tmp/note?",
      choices: [
        "It stores the output in that file, replacing the old contents",
        "It appends hello forever",
        "It loads the file into the boot ROM"
      ],
      a: 0,
      because: "One greater-than sign redirects standard output and truncates the file. Two of them append."
    }
  },
  {
    id: "who-may",
    module: "On the board",
    title: "Who may read, change, or run",
    word: { term: "Permission", means: "the bits that say whether the owner, the group, or everyone else may read, write, or execute a file." },
    steps: [
      { label: "ls -l", text: "ls -l adds a column of letters. You will see something like rw-r--r--. The first dash would be d for a directory. Then three groups: owner, group, everyone else." },
      { label: "Three letters", text: "r means read, w means write, x means execute. A dash means that right is absent. On a program, x is what lets the kernel start it. On a directory, x is what lets you enter it." },
      { label: "The owner", text: "The next columns name the owner and the group. Root may ignore these bits. A normal login cannot, which is why a product app should not run as root unless it must." },
      { label: "A small change", text: "chmod changes the bits. chmod a+x ./app lets everyone run app. Change the smallest set that gets the job done, and do not open a secret file to everyone because the program failed once." }
    ],
    code: `ls -l /tmp/note`,
    takeaway: "ls -l shows owner, group, and everyone else. r, w, and x are read, write, and execute. A program needs x before the kernel will start it.",
    quiz: {
      q: "What does the x bit mean on a program file?",
      choices: [
        "The kernel may start that file as a process",
        "The file is the device tree",
        "The file is stored in SRAM"
      ],
      a: 0,
      because: "Execute permission is the mark that says this file is allowed to be run."
    }
  },
  {
    id: "pipes",
    module: "On the board",
    title: "One command feeds the next",
    word: { term: "Pipe", means: "a connection from one process's output to the next process's input." },
    steps: [
      { label: "Two processes", text: "A vertical bar starts both programs at once. The first writes to the pipe instead of the screen. The second reads from the pipe instead of the keyboard." },
      { label: "An example", text: "ls /etc | head runs ls and head together. head keeps the first lines and stops. ls is told to stop when the pipe closes. You never make a temporary file." },
      { label: "Bytes, not files", text: "The pipe is a small queue in the kernel. It does not appear in ls. If the reader is slow, the writer pauses when the queue is full. That pause is the two processes keeping pace." },
      { label: "Errors stay", text: "The pipe carries standard output. Error messages still go to the screen unless you redirect those too. A failure can look mixed in with the data if you forget that." }
    ],
    code: `ls /etc | head`,
    takeaway: "A pipe joins two processes. The first writes bytes, the second reads them, and no file is left behind.",
    quiz: {
      q: "What does the vertical bar between two commands do?",
      choices: [
        "It feeds the first command's output into the second command",
        "It runs the boot ROM again",
        "It copies the kernel into SRAM"
      ],
      a: 0,
      because: "Both programs run, joined by a kernel queue. The screen sees what the second program prints."
    }
  },
  {
    id: "see-processes",
    module: "On the board",
    title: "Find the running copies",
    word: { term: "ps", means: "a command that lists processes: pid, and the command that started each one." },
    steps: [
      { label: "The list", text: "ps prints processes this login can see. The pid is the number in the left column. The last column is the command. init, or a program with pid 1, should be there for the life of the boot." },
      { label: "Yours", text: "Start a long command and you will see it as a child of the shell. When it exits, the line disappears. The shell's own line stays, because the shell is still waiting for you." },
      { label: "Stopping one", text: "kill and a pid ask that process to exit. Use the pid from ps, not a guess. Killing the wrong pid can stop the console. Leave pid 1 alone." },
      { label: "Busy", text: "top shows who is using the CPU right now. A board that feels stuck is often one process at the top of that list, not a dead kernel. Note the pid, then decide." }
    ],
    code: `ps`,
    takeaway: "ps lists pids and commands. kill needs a pid you just read. Leave pid 1 running.",
    quiz: {
      q: "What should you look up before stopping a process?",
      choices: [
        "Its pid, from ps",
        "The boot ROM header",
        "The SPL offset"
      ],
      a: 0,
      because: "kill takes a pid. The list from ps is how you know which number is the program you mean."
    }
  },
  {
    id: "kernel-log",
    module: "On the board",
    title: "What the kernel just said",
    word: { term: "dmesg", means: "the command that prints the kernel's recent messages." },
    steps: [
      { label: "A ring of lines", text: "Drivers print into a kernel log, not onto a file you created. dmesg shows that log. It is a ring: new lines push old ones out, so it is the recent story, not a diary of every boot forever." },
      { label: "The tail", text: "dmesg | tail shows the last lines. That is the pipe from the last lesson. Use it after you plug in a device or load a driver, when you want the newest news only." },
      { label: "What you hope to see", text: "A UART, an SD card, or a USB device usually announces itself. If the device tree asked for a driver and the driver failed, the reason is often in these lines: a missing clock, a bad address, or a probe that gave up." },
      { label: "Not the app", text: "printf in your program does not go to dmesg. It goes to the terminal or to a file you chose. Mix those up and you will look for an application bug in the kernel log, or the reverse." }
    ],
    code: `dmesg | tail`,
    takeaway: "dmesg is the kernel's recent lines. Pipe it to tail after a device appears. Your program's printf is a different stream.",
    quiz: {
      q: "Where do driver probe messages show up?",
      choices: [
        "In the kernel log, which dmesg prints",
        "In the boot ROM",
        "Only inside /dev/ttyS0 as a file you cat once"
      ],
      a: 0,
      because: "Drivers print to the kernel log. dmesg reads that log back."
    }
  },
  {
    id: "start-your-app",
    module: "On the board",
    title: "Run the program you brought",
    word: { term: "Background", means: "the shell starts your process and prints the next prompt without waiting for it to exit." },
    steps: [
      { label: "This directory", text: "./readport runs the file readport in the working directory. The dot-slash is required when the directory is not on the search path. The file also needs the execute bit." },
      { label: "What it does", text: "The sample opens the serial device, reads one byte, and prints it. That is the device-file lesson, started from the shell. A failure to open usually means the path is wrong or the driver never published it." },
      { label: "Stay or return", text: "Without an ampersand, the shell waits. With an ampersand, the shell prints a pid and returns to the prompt while the program keeps running. ps can still see it." },
      { label: "After reboot", text: "A program you start by hand dies when you stop it, and it does not come back at the next boot. Coming back is init's job: the same first process that started the shell can start your program instead." }
    ],
    code: `/* Build on the board, chmod a+x, then: ./readport */
#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>

int main(void) {
  int fd = open("/dev/ttyS0", O_RDONLY);
  unsigned char b;
  if (fd >= 0 && read(fd, &b, 1) == 1)
    printf("%02x\\n", b);
  return 0;
}`,
    takeaway: "./name runs a program in this directory. An ampersand leaves it running. Surviving the next boot is init's job, not the shell's.",
    quiz: {
      q: "What does an ampersand after the command ask the shell to do?",
      choices: [
        "Start the program and return to the prompt without waiting",
        "Reload the boot ROM",
        "Write the program into the device tree"
      ],
      a: 0,
      because: "The process keeps running. The shell does not block on it. ps shows the pid."
    }
  }
];
