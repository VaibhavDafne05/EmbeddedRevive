# EmbeddedRevive

A picture-first refresher for embedded systems. Plain language, one idea per step, a short sample where the code is the point, and one check at the end of each lesson.

Open `index.html` in a browser. There is no build step and no server required. The page is static: HTML, CSS, and classic scripts, so it also works from a `file://` address.

The teaching model is a common Cortex-M class microcontroller, and a board that already runs Linux. Exact registers, voltages, pin names, and partition layouts stay in the datasheet and the board manual. Sample code is a teaching sketch, not a vendor HAL and not a driver you should paste into a product.

## How to use it

Three courses share one player. Progress for each course is stored separately in the browser under the key `embedded-refresher-v1`.

| Tab | Lessons | What it is |
| --- | --- | --- |
| Chip | 93 | The microcontroller, ARM, algorithms, scheduling, boot, buses, AUTOSAR, safety, and the build |
| C | 30 | The C language, then the habits that matter on a small chip |
| Linux | 37 | Boot, then the commands you actually type on the board |

Controls:

- The pictures play on their own. **Space** pauses. **Left** and **right** arrows step.
- The dots under the picture jump to a step. The left rail jumps to a lesson.
- **Pace** switches between steady and brisk.
- The last picture shows a takeaway and one question. The check mark is stored for that lesson.
- **Clear check marks** clears the course you are looking at.

Addresses, with lesson and picture numbers starting at 1:

- Chip: `#62.4`
- C: `#c/13.4`
- Linux: `#linux/5.2`

To open a picture already paused, add a query before the hash is replaced, for example `index.html?still=1&course=c&lesson=13&frame=4`.

## What a lesson contains

Each lesson has an id, a module, a title, a one-line definition, several steps, an optional sample, a takeaway, and a three-choice question. The picture for a step is drawn as SVG in the matching scene file. The sample is shown as text, so C can contain characters that HTML would otherwise treat specially.

## Chip

Ninety-three lessons. The datasheet still wins for the part you are holding.

### The big idea

1. A computer with one job
2. Not the same as a laptop
3. Sense, think, act

### The chip

4. One chip, many rooms
5. The heartbeat
6. Where things live
7. One step at a time

### Bits and registers

8. Bits, bytes, and hex
9. Switches inside the chip

### Pins and signals

10. Pins that are on or off
11. Reading a noisy button
12. Smooth signals become numbers
13. Brightness and speed from on and off
14. Time without guessing

### Time and events

15. Asking versus being tapped
16. On time beats as fast as possible

### Moving bytes

17. UART, one bit at a time
18. SPI, a clocked team
19. I2C, two wires, many chips
20. Other wires you will meet

### Building systems

21. From the keyboard to the chip
22. One loop, or many tasks
23. Awake, asleep, and brownouts
24. Bugs that show up in hardware
25. The whole machine

### RISC, CISC, and ARM

26. Two styles of instruction
27. Only load and store touch memory
28. The Cortex-M ladder
29. The slots inside the core
30. Thumb, and the odd address
31. Overlapped steps
32. How a C call is seated
33. The hardware stack frame
34. The address map and priority

Cortex-M is not Cortex-A. M0 and M0+ are mostly 16-bit Thumb, with no hardware divide and no CLZ. M0+ is a shorter pipeline than M0. M3 adds Thumb-2, hardware divide, and a fuller NVIC. M4 adds DSP instructions. M4F means a single-precision floating-point unit is fitted. M7 is a longer pipeline with caches and tightly coupled memory, and it has no bit-band. M23 and M33 can include TrustZone-M. That is the whole mention of TrustZone.

Registers run R0 through R12. R13 is the stack pointer, with MSP and PSP. The stack grows down. R14 is the link register. R15 is the program counter. xPSR holds N, Z, C, V and the exception number. Under the AAPCS, the first four arguments use R0–R3, a fifth argument goes on the stack, the return value is in R0, and R4–R11 are callee-saved. Thumb targets an odd address. An even address faults. On exception entry the hardware stacks eight words: R0, R1, R2, R3, R12, LR, PC, xPSR. LR becomes EXC_RETURN. The vector table starts with the initial MSP, then the reset handler.

A smaller NVIC priority number is more urgent. Code sits near `0x00000000`, SRAM at `0x20000000`, peripherals at `0x40000000`, and the private peripheral bus at `0xE0000000`.

### Structures and algorithms

35. How the work grows
36. The row you should reach for
37. A queue in a circle
38. Lists, and a pool instead of malloc
39. Linear search and binary search
40. Tables and a moving average
41. Fractions without a float unit
42. A remainder that catches flipped bits
43. Bit tricks and a state table

### Schedule, faults, and control

44. Two modes, two stacks
45. Switch later, not inside the tick
46. The registers the hardware did not save
47. The lock that blocks the urgent task
48. Paint the stack, then see how deep it went
49. The porter that moves bytes alone
50. Bytes in the order the wire expects
51. Read the fault from the stacked PC
52. Regions that allow or deny
53. Sample faster than the wiggle
54. A weighted walk along the ring
55. One multiply, one memory
56. P, I, and D into a duty cycle

PendSV is requested by setting `PENDSVSET` in `ICSR` at `0xE000ED04`, bit 28. The switcher must save R4–R11 and LR, because a branch-and-link would otherwise replace EXC_RETURN. Handler mode always uses MSP. CONTROL bit 1 selects PSP when set. CONTROL bit 0 is nPRIV. A useful stack paint is `0xA5A5A5A5`. On HardFault, EXC_RETURN bit 2 chooses MSP or PSP, and the stacked PC is the seventh stacked word. CFSR is at `0xE000ED28` on M3 and newer. M0 has no CFSR. MPU regions are power-of-two, not a page table. Flash may execute. RAM and peripherals should not.

The PID sketch clamps the integrator and takes the derivative from the measurement. Priority examples use an urgency field where a bigger number is more urgent. That is not a raw NVIC priority number.

### Boot and update

57. From the vector table to main
58. Where each section sits
59. A small program that jumps to the real one
60. A new image that can fail safely

Startup copies `.data` and zeroes `.bss`, then calls `main`. Initialized data can have a load address in flash and a run address in RAM. A jump to another image disables interrupts, sets `VTOR` at `0xE000ED08`, issues the barriers, loads MSP, and branches to the odd reset address. A two-slot update may try the new image once. The trial flag must survive reset. Confirm only after the application is up. Then fall back.

### CAN and Modbus

61. A frame with an identifier, not an address
62. CAN Arbitration
63. Judge the bit once, in the middle of it
64. Address, function, data, CRC
65. One legal read, and the refusal

Classical CAN uses an 11-bit identifier, a length from 0 to 8, and up to 8 data bytes. A 0 is dominant and a 1 is recessive. Identifiers go out most significant bit first, so the lower identifier wins. `0x120` is `00100100000` and `0x250` is `01001010000`. Both start with 0. The next bit is 0 for `0x120` and 1 for `0x250`, so `0x120` keeps the bus and `0x250` stops. The winning frame in that lesson is identifier `0x120`, DLC 8, and data `10 27 00 00 00 00 00 00`. CAN FD, in one clause, allows a longer payload and a faster bit rate after the identifier. Judge each bit at a sample point inside the bit, not on the edge. A broken rule becomes an error frame and the message is sent again.

Modbus RTU is one master request and one slave response: address, function, data, then CRC-16/MODBUS. The CRC starts at `0xFFFF`, uses the reflected polynomial `0xA001`, and is sent low byte first. Function `0x03` reads holding registers. Body fields are big-endian. A request `01 03 00 00 00 01` carries CRC bytes `84 0A` on the wire. An exception is the function with the high bit set, plus a code. A silent gap of about 3.5 character times ends the frame.

### C++ for embedded

66. RAII without a desktop-sized runtime

A scope guard can acquire and release without exceptions and without a heap. The destructor stays short.

### RTOS design

67. A task is a planned execution context
68. Queues move data between contexts
69. Priority inversion and inheritance

There is no full RTOS source here. A task has its own stack and blocks instead of spinning. A queue has a depth and a full-queue policy. Priority inheritance raises the owner of a lock so a medium-priority task cannot stretch the wait. A short lock is still the better design.

### Debugging

70. Debug from evidence, not guesses
71. Turn a HardFault into a location

Stop, read PC, SP, and memory, then the backtrace. The stacked PC and the fault status point at the instruction. M0 has no CFSR.

### Automotive CAN

72. From CAN signal to ECU software
73. A signal is more than start bit and length

The path is transceiver, controller, CAN driver, CanIf and PduR, COM, then the application. A teaching signal uses raw 148, factor 0.5, and offset −40, which is 34. An invalid raw value is not scaled into a reading.

### AUTOSAR Classic

74. The Classic stack as a vertical path
75. A runnable is the unit the RTE schedules

Application software components sit on the RTE, then services, ECU abstraction, and MCAL. A runnable runs because of a configured RTE event, in the OS task it was mapped to. It reads and writes through RTE ports.

### AUTOSAR Diagnostics

76. A UDS request has a long journey
77. DEM turns failures into diagnostic events

A tester request crosses transport into DCM, then an application callback, then a response. DCM is the Diagnostic Communication Manager. DEM takes a reported event, can debounce it, keeps status, and can store a DTC.

### AUTOSAR Services

78. Persistent data needs a strategy

NvM exposes logical blocks. The running copy is in RAM. Flash writes cost time and endurance. A CRC decides whether startup restores the block or uses the configured default.

### Functional Safety

79. From hazard to safety requirement
80. ASIL is a development constraint, not a sticker
81. FMEA and FTA ask different questions
82. A safety mechanism must detect something useful

HARA starts from the item and a hazardous malfunction, then severity, exposure, and controllability, then a safety goal and requirements. An ASIL comes from that assessment. Decomposition, when used, keeps the original ASIL in parentheses and requires independence. FMEA starts at a failure mode and looks outward. FTA starts at an unwanted top event and looks down. A mechanism is a fault, a detection, a reaction, and a stated coverage. A watchdog covers only some failures.

### Automotive Cybersecurity

83. TARA starts with the asset
84. Secure boot establishes a trust chain
85. Integrity on a vehicle message

TARA names an asset, the unwanted action, the impact, and a security goal. It does not give an attack procedure. Secure boot is a chain: a root in the chip, each stage checks the next, and a failed check does not jump. SecOC adds an authenticator and a freshness value so an old valid message can be rejected. Key lifecycle is its own design. There is no crypto implementation in this course.

### Build and integration

86. Compiler, linker, image: three different jobs
87. The linker script is the memory contract

A `.c` file becomes an object file, the linker places sections, the ELF keeps symbols, and a hex or binary image is what you program. FLASH and RAM are regions. `.text` and `.rodata` stay in flash. `.data` has a load address and a run address. `.bss` is RAM that startup zeroes. A region overflow should fail the link.

### Boot and startup

88. Reset to main is a real sequence

Word 0 of the vector table is the initial stack pointer. Word 1 is the reset handler, at an odd address. Clocks, the `.data` copy, the `.bss` clear, and any C runtime work happen before `main`.

### Reliability

89. A watchdog needs a proof of health
90. Power faults are software events too

Kick the watchdog only after the tasks that matter have reported. A kick from a timer that still runs while the application is dead hides the fault. Record the reset cause. A brownout holds the core when the rail drops. A half-written flash block should fail its CRC.

### Verification

91. Test logic without the hardware first

Pure functions, such as a scale from raw counts to a temperature, run on the PC. Boundaries, invalid values, and timeouts belong in those tests. Timing, pins, and electrical behavior still need the board.

### Engineering process

92. Requirement to evidence is a chain
93. Git history should explain engineering intent

A requirement links to a design, to the code, and to a test. A focused commit is easier to review, bisect, and revert. A tag plus the same build script should reproduce an image.

## C

Thirty lessons. Widths in the pictures match a common Cortex-M compiler, where `int` is 32 bits. The language only promises that `int` is at least 16 bits. Use `stdint.h` when the width is part of the meaning. The compiler manual still wins if you change tools.

### The program

1. A program is functions and data
2. Three passes before the chip
3. main is called, it is not the reset
4. A statement does work. An expression has a value

The preprocessor pastes headers and macros. The compiler writes an object file. The linker resolves names. `main` runs after the reset handler has set the stack and prepared `.data` and `.bss`. A comparison expression is 1 or 0.

### Types

5. Ask for a width, do not guess it
6. Signed and unsigned are different numbers
7. A character is a small integer. A string ends at zero
8. Name the numbers you would otherwise memorize

`uint8_t` at 255 plus 1 becomes 0. That wrap is defined. Signed overflow is not. The same eight bits, all ones, are 255 unsigned and −1 as `int8_t`. `'A'` is the integer 65. `"Hi"` is three bytes, including the terminating 0. Do not write into a string literal. `enum` and `const` name integers. They do not create a new machine type.

### Operators

9. Integer division drops the fraction
10. One equals sign stores. Two ask a question
11. And and or can skip the rest
12. Bits are a different set of operators
13. Small integers grow before the operator

`7 / 2` is 3. `7 % 2` is 1. C99 division truncates toward zero, so `(-7) / 2` is −3. One `=` stores. Two `=` signs compare. `if (count = 3)` stores 3 and takes the branch. Logical and stops when the left side is false, so a null check belongs on the left of a load. Bitwise operators mix patterns. A shift of a 32-bit value by 32 or more is not defined. Shift unsigned values and stay inside the width.

A `uint8_t` promotes to `int` before most operators. `~` of a `uint8_t` holding 1 is a wide int, so comparing it with `0xFE` is false. Cast back to `uint8_t` when you wanted the low 8 bits, which are `0xFE`.

### Control

14. if chooses one path
15. switch matches a value, and it falls through
16. A loop repeats until the test fails
17. break, continue, and return leave early

Brace every branch. A `case` without `break` runs the next case. `while` tests first. `do` runs once, then tests. In `for`, the update runs after the body. `for (;;)` does not end. `break` leaves the innermost loop or switch. `continue` skips to the next pass. `return` leaves the function.

### Functions

18. A call copies the arguments and may return one value
19. A header is a promise. A guard keeps it once
20. Braces decide who can see a name

A parameter is a copy. To write the caller's object, pass a pointer. A header declares the function. Include it from the caller and from the file that defines it. A guard macro stops the header from being pasted twice. `static` at file scope hides the name from other files. A `static` local is hidden too, but it lives for the whole program.

### Data

21. An array is a row. Its name becomes a pointer
22. A struct groups fields, and it may pad them
23. A union is one object with several readings
24. A macro is text, not a typed value

`uint8_t buf[4]` has indexes 0 through 3. C does not check the index. In a call, the array name becomes a pointer and the length must be passed separately. `sizeof` on the array is the whole row. `sizeof` on the pointer parameter is the pointer. A struct of `uint8_t` then `uint32_t` is often 8 bytes on Cortex-M because of padding, not 5. Do not send that struct onto a wire and expect the other end to share the gaps. Union members share one address. On Cortex-M the low byte of a `uint16_t` is at the lower address. `typedef` only adds a name. A macro pastes text before types exist. Prefer `const` or a small function for a value.

### Pointers

25. A pointer stores an address

`&` takes an address. `*` uses it. Adding 1 to a `uint32_t` pointer moves four bytes. `const uint16_t *` can change the pointer and not the object. `uint16_t *const` can change the object and not the pointer.

### C for embedded

26. Where a C variable really lives
27. volatile is not a thread lock
28. Pointers are addresses with a type
29. Bit masks beat mystery numbers
30. Why embedded drivers use callbacks

An automatic local lives on the stack and can have a new address on every call. A `static` or global with an initializer lands in `.data`. A zeroed one lands in `.bss`. A `const` table can stay in flash. The map file is the evidence. `volatile` forces a real memory access. It does not make `x++` atomic and it is not a lock. A pointer to a peripheral is a `volatile` pointer at a fixed address such as `0x40000000`. Bit 3 is selected by shifting 1 three places. AND tests it, OR sets it, AND with the inverted mask clears it. Some status bits clear by writing 1, so a plain read-modify-write can be wrong. A callback is a function address. If an interrupt calls it, the function must stay short.

## Linux

Thirty-seven lessons for a board that already boots Linux. The board manual still names the boot pins, the UART, and the real device paths. Names such as `ttyS0` and `mmcblk0p2` are the teaching sketch.

### The board

1. A board that runs many programs
2. Five programs, in order
3. The program inside the chip
4. Turn on the big memory
5. Hand the kernel a map of the board
6. Drivers, then the root disk
7. The first process, then a shell
8. Ask, do not touch the hardware
9. Devices that look like files
10. A program that is running
11. The same address, different bytes
12. The translator for one device
13. The tree the board boots from

The boot chain is boot ROM inside the chip, then a small loader that starts DRAM, then a bootloader, then the kernel, then init as PID 1. The boot ROM tries the next device when a header is bad. The small loader loads the bootloader from a fixed offset, not from the Linux partition. The bootloader loads the kernel, a device tree, and an optional initramfs, then jumps and does not return. Its prompt is not a shell. A teaching command line is `console=ttyS0,115200 root=/dev/mmcblk0p2 rootwait`. The kernel unpacks, starts drivers from the device tree, and mounts the root. `rootwait` waits for the disk. An initramfs is only a spare root. Do not kill PID 1. Programs ask the kernel. They do not own peripheral registers. Device files such as `/dev/ttyS0` are opened, read, and written. Each process has its own virtual memory. The raw front of the disk can hold the loader. The Linux filesystem starts at the root partition.

### On the board

14. A prompt on the serial port
15. Where you are, and where you go
16. Show a file, and make a small one
17. Who may read, change, or run
18. One command feeds the next
19. Find the running copies
20. What the kernel just said
21. Run the program you brought

`uname -s` names the kernel. `pwd`, `ls`, and `cd` move around. `echo hello > /tmp/note` writes a file. `ls -l` shows permissions. `ls /etc | head` feeds one command into the next. `ps` lists processes. `dmesg | tail` shows recent kernel lines. A program you brought is started as `./readport`. A trailing `&` lets the shell continue.

### Looking around

22. Where the shell looks for a command
23. Output, errors, and input
24. Keep the lines that mention a word
25. A file of commands
26. Root, and a quieter login
27. Ask a process to stop, then insist
28. A process, seen as files
29. Disks attached to folders
30. A driver loaded after boot
31. How much RAM is really free

`echo $PATH` shows where the shell searches. A program in the current directory still needs `./` when `.` is not on that path. A pipe carries standard output only. `ls /no/such/path 2> /tmp/err` sends the error to a file. `dmesg | grep tty` keeps matching lines. A script starts with `#!/bin/sh`. User id 0 is root. `kill -TERM` asks a process to stop. `kill -KILL` insists. `/proc` is generated by the kernel. It is not a folder of files on the SD card. `mount` and `df -h` show disks attached to folders. `/sys` exposes kernel objects. `lsmod` and `modprobe` load a module that already exists. This course does not teach you to write a kernel module. `free` separates used memory, cache, and what is available. Running out of memory is not the same thing as cache holding file data.

### Reach the board

32. The board's own address
33. A shell over the network
34. Start it again at the next boot
35. Lines that are still there later
36. A root disk you do not write
37. Build on the PC, run on the board

`ip addr` shows the board's addresses. `127.0.0.1` is the board talking to itself. `ping` checks a path, then `ssh` opens a shell. Keep the serial console as the way back. A command typed at the prompt is forgotten at reboot. Init can run a hook such as `/usr/bin/readport` on the next boot. The real path depends on the board. `/var/log` may be a RAM disk, so check `df`. A read-only root keeps the system image fixed. Scratch files belong in `/tmp`. Settings that must survive belong on a data partition such as `/data`. Build with a cross compiler on the PC, copy with `scp`, mark the file executable, and check `file` against the CPU the board reports.

Out of scope unless you add it later: Yocto and Buildroot recipes, kernel-module source, a systemd cookbook, packet-filter rules, and choosing a distribution.

## Files

| Path | Role |
| --- | --- |
| `index.html` | The page. Script order matters. |
| `css/app.css` | Layout, the stage, and the SVG picture styles |
| `js/app.js` | Player, course tabs, progress, and addresses |
| `js/lessons.js` | Chip lessons 1–25 |
| `js/advanced-lessons.js` | Chip lessons 26–43 |
| `js/further-lessons.js` | Chip lessons 44–65 |
| `js/expansion-lessons.js` | Chip lessons 66–93 |
| `js/scenes.js` | Pictures for lessons 1–25, plus the drawing helpers |
| `js/advanced-scenes.js` | Pictures for lessons 26–43 |
| `js/further-scenes.js` | Pictures for lessons 44–65 |
| `js/expansion-scenes.js` | Pictures for lessons 66–93 |
| `js/c-lessons.js` | C lessons 1–25 |
| `js/c-embedded-lessons.js` | C lessons 26–30 |
| `js/c-scenes.js` | Pictures for the C language lessons |
| `js/linux-lessons.js` | Linux lessons 1–21 |
| `js/linux-more-lessons.js` | Linux lessons 22–37 |
| `js/linux-scenes.js` | Pictures for Linux lessons 1–21 |
| `js/linux-more-scenes.js` | Pictures for Linux lessons 22–37 |

Lesson text is appended with `LESSONS.push` or `LINUX_LESSONS.push` or `C_LESSONS.push`, so a later file must load after the array exists. Scene files must load after `scenes.js`, because they share `SCENES` and the drawing helpers. `app.js` loads last.

Pictures use an SVG view box of 800 by 450. A step is shown by marking the group with the frames it belongs to. The player toggles a class. It does not move those groups with a CSS transform, because that would cancel motion drawn inside the picture.

## What this course leaves out

No vendor register programming sequence. No CMSIS header map. No Ethernet or USB stack. No secure-boot crypto and no message-authentication implementation. No full RTOS source. No kernel module. Classical CAN is the CAN that is taught, apart from one clause on CAN FD. Modbus is one request and one response, not a stack.
