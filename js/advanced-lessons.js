LESSONS.push(
  {
    id: "risc-cisc",
    module: "RISC, CISC, and ARM",
    title: "Two styles of instruction",
    word: { term: "RISC and CISC", means: "RISC keeps each instruction small and regular. CISC lets one instruction do more, including memory work." },
    steps: [
      { label: "CISC", text: "CISC means a complex instruction set. One instruction can be long and can do several jobs, such as add a value in memory to another value in memory. x86, the laptop processor family, is the famous CISC." },
      { label: "RISC", text: "RISC means a reduced instruction set. Each instruction is short and regular. The compiler uses more of them to finish the same job. ARM, RISC-V, and many small microcontrollers are RISC." },
      { label: "Why micros chose it", text: "RISC hardware is easier to pipeline and usually spends less silicon and less power. That is why microcontrollers leaned this way. The work did not disappear. It moved into more instructions and a smarter compiler." },
      { label: "The border is soft", text: "A modern CISC chip often cracks those big instructions into small inner steps. A RISC chip can still have a hefty one, such as store many registers. Judge the style you program, not the sticker on the package." }
    ],
    takeaway: "ARM microcontrollers are RISC: small regular instructions, a simpler core, and a compiler that uses several of them.",
    quiz: {
      q: "Why did microcontrollers mostly choose RISC?",
      choices: [
        "The core stays smaller and easier to pipeline, which helps power and timing",
        "One RISC instruction can perform unlimited memory writes",
        "A RISC chip cannot be programmed in C"
      ],
      a: 0,
      because: "The smaller, regular instructions make the hardware simpler. C still compiles. It just becomes more instructions."
    }
  },
  {
    id: "load-store",
    module: "RISC, CISC, and ARM",
    title: "Only load and store touch memory",
    word: { term: "Load/store", means: "math uses registers only. LDR and STR are the doors to memory." },
    steps: [
      { label: "Registers only", text: "On a RISC core the arithmetic unit does not reach into RAM. It only sees registers, the small slots inside the CPU." },
      { label: "The two doors", text: "LDR loads a word from memory into a register. STR stores a register back to memory. Those are the doors. Other instructions stay inside." },
      { label: "Add takes three", text: "To add two variables that live in RAM, the program loads each one, adds the registers, then stores the result. Three instructions, not one." },
      { label: "Keep hot values", text: "This looks longer than a CISC add-from-memory. The gain is a simple, regular core. A good compiler keeps hot numbers in registers so those loads do not happen on every line." }
    ],
    takeaway: "If a value is in RAM, load it before you do math. Store it back only when memory needs the new copy.",
    quiz: {
      q: "How does a load/store core add two variables that live in RAM?",
      choices: [
        "With one instruction that adds two memory addresses directly",
        "Load both into registers, add, then store the result",
        "By changing the flash wait states"
      ],
      a: 1,
      because: "The adder never sees RAM. Loads bring the numbers in. A store sends the answer back."
    }
  },
  {
    id: "cortex-family",
    module: "RISC, CISC, and ARM",
    title: "The Cortex-M ladder",
    word: { term: "Cortex-M", means: "ARM's microcontroller line. Cortex-A is the larger line used in phones." },
    steps: [
      { label: "M is not A", text: "ARM is the architecture. Cortex-M is the branch made for microcontrollers: Thumb code, a fixed address map, and interrupts designed to be predictable. Cortex-A is the branch in phones and Linux boards. Do not treat them as the same chip." },
      { label: "The small end", text: "Cortex-M0 and M0+ are the small end. They run mostly 16-bit Thumb, use very little power, and have no hardware divide. A floating-point library, if you pull one in, is slow and bulky." },
      { label: "M3 and M4", text: "Cortex-M3 adds the richer Thumb-2 set, a hardware divide, and a fuller interrupt controller. Cortex-M4 adds DSP helpers such as multiply-accumulate. An M4F also has single-precision floating point in hardware. The F is not free on every M4. Read the part number." },
      { label: "Fast and newer", text: "Cortex-M7 is the fast end of that generation: a longer pipeline, and room for caches and tightly coupled memory when the math is heavy. Cortex-M23 and M33 are newer. They can split the chip into a secure world and a normal world. That split is called TrustZone-M." },
      { label: "Pick by the job", text: "A button and a sensor often fit an M0+. A motor loop with filters often wants an M4F. The datasheet, not the family name, tells you the clock, the RAM, and whether the floating-point unit is actually fitted." }
    ],
    takeaway: "Learn the ladder: M0+ is tiny, M3 is the full integer core, M4F adds DSP and float, M7 is the fast one, M33 can add a secure world.",
    quiz: {
      q: "What is the difference between Cortex-M and Cortex-A?",
      choices: [
        "M is the microcontroller line. A is the application line used in phones and larger boards",
        "They are two names for the same core",
        "Cortex-A cannot execute instructions"
      ],
      a: 0,
      because: "Both are ARM. M is built for bare metal and real-time devices. A is built for bigger systems, often with Linux."
    }
  },
  {
    id: "arm-registers",
    module: "RISC, CISC, and ARM",
    title: "The slots inside the core",
    word: { term: "Register file", means: "R0 through R15, plus the flags. This is where the core wants to work." },
    steps: [
      { label: "R0 to R12", text: "R0 through R12 are general registers. The core would rather add and compare here than in RAM. You will see them first in the debugger." },
      { label: "Two stack pointers", text: "R13 is the stack pointer. Cortex-M has two. MSP is the main stack, used at reset and inside exceptions. PSP is the process stack, which an RTOS can use for tasks. The stack grows downward, toward lower addresses." },
      { label: "Link and PC", text: "R14 is the link register, LR. A call leaves the return address there. R15 is the program counter, PC. It is the address the fetch stage is walking through." },
      { label: "Flags", text: "xPSR holds the flags: negative, zero, carry, and overflow. While an exception is active it also records which exception number is running." },
      { label: "You meet them later", text: "Ordinary C does not name these. The compiler assigns them. You meet them in a fault dump, in the debugger, and on the day you write a few lines of assembly." }
    ],
    takeaway: "SP is the stack, LR is the return address, PC is where execution is. R0 through R12 hold the working values.",
    quiz: {
      q: "Which register holds the return address after a normal call?",
      choices: [
        "R0, the first argument register",
        "R13, the stack pointer",
        "R14, the link register"
      ],
      a: 2,
      because: "A branch-and-link writes the return address to R14. The callee saves it if it makes another call."
    }
  },
  {
    id: "thumb-isa",
    module: "RISC, CISC, and ARM",
    title: "Thumb, and the odd address",
    word: { term: "Thumb-2", means: "a mix of 16-bit and 32-bit instructions. Cortex-M runs Thumb only." },
    steps: [
      { label: "Sixteen bits", text: "Early ARM instructions were all 32 bits wide. That is simple for the decoder, and expensive in flash. Thumb repacks the common instructions into 16 bits so more program fits." },
      { label: "Mixed widths", text: "Thumb-2 mixes both widths in one stream. The first bits of each instruction tell the core whether this one is 16 or 32 bits wide. Fetch has to respect that, or it will cut an instruction in half." },
      { label: "Thumb only", text: "A Cortex-M core executes Thumb only. There is no switch into the old 32-bit ARM instruction set. Density is the point: more of your program in the same flash." },
      { label: "The bottom bit", text: "A Thumb target address is odd. The bottom bit is a marker that means Thumb, not an extra place in memory. Branch to an even address and the core faults instead of running. C function pointers stay safe. A hand-built address must keep that bit set." }
    ],
    takeaway: "Cortex-M code is Thumb. If a jump faults immediately, check that the target address is odd.",
    quiz: {
      q: "What happens if a Cortex-M core branches to an even code address?",
      choices: [
        "It faults. The bottom bit must be 1 to mark Thumb",
        "It switches into the x86 instruction set",
        "It runs the same code twice as fast"
      ],
      a: 0,
      because: "The low bit is the Thumb marker. An even address means the core was asked to run a state it does not have."
    }
  },
  {
    id: "arm-pipeline",
    module: "RISC, CISC, and ARM",
    title: "Overlapped steps",
    word: { term: "Pipeline", means: "later instructions start before earlier ones finish." },
    steps: [
      { label: "Three stages", text: "A Cortex-M3 or M4 has three stages: fetch, decode, execute. While one instruction executes, the next is decoded and another is being fetched." },
      { label: "Shorter and longer", text: "The M0+ uses a shorter pipe, two stages, which keeps branches cheap. The M7 uses about six stages, and it can start more than one instruction at a time, so a high clock can finish heavier work." },
      { label: "Branch penalty", text: "A branch can throw away instructions already fetched down the wrong path. That lost work is the branch penalty. Tight loops and predictable branches waste less of it." },
      { label: "Flash can stall", text: "Flash is often slower than the core. At a high clock the core inserts wait states on each fetch, unless a buffer, a cache, or tightly coupled RAM is feeding it. A one-cycle instruction is not one cycle if the fetch stalled." },
      { label: "Count the real work", text: "When timing matters, read the disassembly. Count memory accesses and branches, not lines of C. One C line can be several instructions, and one of them can stall." }
    ],
    takeaway: "The pipe overlaps fetch, decode, and execute. Branches and slow flash are what steal the cycles you thought you had.",
    quiz: {
      q: "Why can a short line of C take many clocks?",
      choices: [
        "RISC cores are not allowed to use a pipeline",
        "It may be several instructions, and flash or a branch can stall the core",
        "The stack pointer is required to stay odd"
      ],
      a: 1,
      because: "C is not the instruction stream. Loads, stores, branches, and flash wait states are."
    }
  },
  {
    id: "arm-call",
    module: "RISC, CISC, and ARM",
    title: "How a C call is seated",
    word: { term: "Calling convention", means: "the agreed seats for arguments, the return value, and saved registers. On ARM it is AAPCS." },
    steps: [
      { label: "Branch and link", text: "A call uses BL. It stores the return address in LR, then jumps. The callee returns by moving LR back into the PC, or by popping a saved copy if it used LR for its own call." },
      { label: "Four seats", text: "The first four arguments travel in R0, R1, R2, and R3. A fifth argument goes on the stack. The return value comes back in R0. A 64-bit return uses R0 and R1." },
      { label: "Who saves what", text: "The callee may trash R0 through R3 and R12. If it uses R4 through R11, it must save them and put them back. The caller trusts those. That split is why a function prologue pushes a few registers and the link register." },
      { label: "Eight-byte stack", text: "At a public call the stack must be aligned to 8 bytes. If hand-written assembly breaks that, later calls and the floating-point unit fail in ways that look unrelated." },
      { label: "In the debugger", text: "A nonsense argument usually means you stopped before the registers were filled, or the value was the fifth one and lives on the stack. Look at R0 first, then the stack, not at a random local." }
    ],
    takeaway: "Arguments start in R0. The result returns in R0. R4 through R11 survive a call. The rest do not.",
    quiz: {
      q: "Where does a Cortex-M function find its first argument?",
      choices: [
        "In R0",
        "In the reset vector",
        "In the link register"
      ],
      a: 0,
      because: "AAPCS puts the first argument in R0 and the return value in R0 as well."
    }
  },
  {
    id: "arm-exception",
    module: "RISC, CISC, and ARM",
    title: "The hardware stack frame",
    word: { term: "Vector table", means: "a list of words at the start of memory. The first is the initial stack. The second is reset." },
    steps: [
      { label: "Two words at reset", text: "On reset the core reads two words from address 0, or from VTOR if you moved the table. The first word becomes the stack pointer. The second is the address of the reset handler." },
      { label: "Then the handlers", text: "After those come NMI, HardFault, and the interrupt handlers. The NVIC uses this table. Your software does not search for the function. The hardware already has the address." },
      { label: "Eight words", text: "When an interrupt wins, hardware pushes eight words before your handler runs: R0, R1, R2, R3, R12, LR, the return address, and the flags. That is why a C handler can be an ordinary function. Those caller-saved registers are already on the stack." },
      { label: "A special return", text: "LR is then overwritten with a special return code, not a code address. The handler returns by branching to that code. Hardware pops the frame. If the floating-point unit was in use, a longer frame can be stacked too." },
      { label: "Tail-chaining", text: "If another interrupt is already waiting, the core can tail-chain. It skips the pop and the push and enters the next handler directly. That saved work is hardware, not something you code in the handler." }
    ],
    takeaway: "Reset reads the stack and the reset address. An interrupt stacks a frame for you, then tail-chains if another one is waiting.",
    quiz: {
      q: "What has the hardware done before a Cortex-M handler starts?",
      choices: [
        "Erased SRAM so the handler gets a clean desk",
        "Pushed a frame of registers, including the return address",
        "Nothing. The handler must push every register itself"
      ],
      a: 1,
      because: "The eight-word frame is why a C interrupt function works like a normal function. Callee-saved registers are still the function's own job."
    }
  },
  {
    id: "arm-map",
    module: "RISC, CISC, and ARM",
    title: "The address map and priority",
    word: { term: "NVIC", means: "the interrupt controller. A smaller priority number is more urgent." },
    steps: [
      { label: "Four windows", text: "The architecture draws a fixed map. Code sits near address 0. SRAM sits at 0x20000000. Peripherals sit at 0x40000000. The NVIC, SysTick, and system control sit up at 0xE0000000." },
      { label: "Your chip fills them", text: "The vendor fills those windows with real flash, real RAM, and real timers. The linker script must match that chip. A generic picture is not a memory map you can flash." },
      { label: "Smaller wins", text: "Each interrupt has a priority number. A smaller number can preempt a larger number. This surprises people who have used chips where a bigger number means more urgent. On Cortex-M, smaller wins." },
      { label: "Not every bit counts", text: "The chip may implement only the top few priority bits. The low bits read back as zero. Two numbers that look different in C can be the same priority on a core with only three bits. Read how many bits your part implements." },
      { label: "PRIMASK and the MPU", text: "PRIMASK is the blunt switch. Set it and configurable interrupts wait. Use it for a few instructions, not for a long chore. An MPU, if fitted, is not a PC memory manager. It is a handful of regions with allow and deny rules. There is no virtual memory here." }
    ],
    takeaway: "Know the four address windows, and remember that interrupt priority 0 beats priority 5.",
    quiz: {
      q: "Two interrupts are pending. Which one runs first?",
      choices: [
        "The one with the larger priority number",
        "The one written higher in the C file",
        "The one with the smaller priority number"
      ],
      a: 2,
      because: "Cortex-M treats a lower priority number as more urgent. File order does not decide."
    }
  },
  {
    id: "big-o-embedded",
    module: "Structures and algorithms",
    title: "How the work grows",
    word: { term: "Growth", means: "how many steps an algorithm takes as the data gets bigger." },
    steps: [
      { label: "Constant", text: "Constant work does about the same number of steps for 4 items or 400. Reading one register is constant. So is indexing one array slot when you already know the index." },
      { label: "Linear", text: "Linear work walks every item. Eight sensors, about eight steps. Eighty sensors, about eighty. A scan of a list, and a naive average that re-adds every sample, are linear." },
      { label: "Logarithmic", text: "Logarithmic work cuts the problem in half each time. Eight sorted items take about three comparisons. A thousand take about ten. Binary search is the usual example." },
      { label: "The blow-up", text: "Comparing every item with every other item is fine for six tasks. It is how you miss a deadline at six hundred. Know the shape before you put the routine in the loop that has a deadline." }
    ],
    takeaway: "Ask how the steps grow. Constant and logarithmic stay friendly. Walking every pair does not.",
    quiz: {
      q: "As a sorted table grows, how does binary search grow?",
      choices: [
        "It always scans every entry",
        "By a logarithm: each step throws away half the table",
        "It stays one step, but only if the table is in flash"
      ],
      a: 1,
      because: "Each comparison keeps one half. Doubling the table adds about one comparison, not a double workload."
    }
  },
  {
    id: "arrays-embed",
    module: "Structures and algorithms",
    title: "The row you should reach for",
    word: { term: "Array", means: "equal slots in a row. Item i is at base plus i times the width of one item." },
    steps: [
      { label: "One multiply", text: "An array is a row of equal slots. The address of item i is the base plus i times the width. One multiply and one add. No pointer to chase." },
      { label: "Any slot", text: "Reading the first slot and the last slot costs the same. Filters, sample buffers, and pin maps should be arrays unless you have a real reason to choose something else." },
      { label: "Insert hurts", text: "Inserting in the middle is the expensive part. Every item after that slot shifts over. If you insert all day, a plain array is the wrong tool for that job." },
      { label: "Stay inside", text: "Keep the length in a variable, and never write past it. On a microcontroller that overflow lands on the next variable or the stack. There is no polite error page." }
    ],
    takeaway: "Use an array by default. The next item is a fixed step away, and the layout is obvious in the debugger.",
    quiz: {
      q: "Why is an array the usual structure on a small chip?",
      choices: [
        "The next item is a fixed step away, so access is cheap and the layout is obvious",
        "Arrays grow without bound at no cost",
        "The CPU cannot follow a pointer"
      ],
      a: 0,
      because: "Contiguous equal slots make indexing a multiply-add. The CPU can follow pointers. It just costs more when the items are scattered."
    }
  },
  {
    id: "ring-buffer",
    module: "Structures and algorithms",
    title: "A queue in a circle",
    word: { term: "Ring buffer", means: "a fixed array used in a circle. Head writes. Tail reads." },
    steps: [
      { label: "Queue and stack", text: "A queue is first in, first out. A UART stream and a log want that, without malloc. A stack is the opposite: push and pop the same end. The CPU already has a stack. A ring is how you build the queue." },
      { label: "Head and tail", text: "The writer stores at head, then advances head. The reader takes from tail, then advances tail. When an index passes the last slot, it becomes zero." },
      { label: "Empty and full", text: "If head equals tail, the ring is empty. Full is the dangerous twin, because it can look the same. Either leave one slot unused, or keep a counter. Pick one rule and never mix the two." },
      { label: "Power of two", text: "A length of 8, 16, or 32 makes the wrap a bit mask: index AND (size minus 1). That is cheaper than a divide. Seven is a poor length for a ring." },
      { label: "One writer", text: "One interrupt writer and one main reader can share a ring if each index is a single word and you update it only after the byte is stored. Two writers need a real lock. A torn index is a classic bug." }
    ],
    takeaway: "A ring is a fixed queue. Decide how full is detected, use a power-of-two length, and publish the index only after the data is written.",
    quiz: {
      q: "Why are ring lengths often 8, 16, or 32?",
      choices: [
        "Wrapping is then a bit mask, not a divide",
        "The NVIC only accepts those sizes",
        "Thumb instructions can only count to 32"
      ],
      a: 0,
      because: "index AND (size minus 1) wraps a power-of-two buffer. A divide on every byte is wasted work."
    }
  },
  {
    id: "lists-pools",
    module: "Structures and algorithms",
    title: "Lists, and a pool instead of malloc",
    word: { term: "Memory pool", means: "equal slots, taken and returned in constant time. No general heap." },
    steps: [
      { label: "A chain", text: "A linked list stores a value and the address of the next node. If you already hold a node, inserting beside it is just rewiring two pointers." },
      { label: "The chase", text: "Finding a node still walks the chain. Each step can miss the memory the CPU was about to fetch. The extra pointer also costs RAM on every item." },
      { label: "Fragmentation", text: "Calling malloc for each node is worse on a small chip. Freed holes become the wrong shape for the next request. Later an allocation fails even though the free bytes, added up, would fit. That is fragmentation." },
      { label: "Equal slots", text: "A pool avoids it. At startup you cut one array into equal slots and chain the free ones. Taking a slot and giving it back are both constant work. The holes always fit, because every hole is the same size." },
      { label: "Index links", text: "If you truly need a list, store the nodes in that array and link them by index, not by a pointer from malloc. The whole structure stays in one block you can see in the debugger." }
    ],
    takeaway: "Prefer an array or a pool. Use a list only when the rewiring is the point, and keep the nodes in one fixed block.",
    quiz: {
      q: "What does a fixed-size pool avoid that malloc often hits on a small chip?",
      choices: [
        "The need for any indexes",
        "Fragmentation: free space split into holes that do not fit the next request",
        "Interrupts in general"
      ],
      a: 1,
      because: "Equal slots always fit the next request. A general heap can have enough free bytes and still fail."
    }
  },
  {
    id: "search-algs",
    module: "Structures and algorithms",
    title: "Linear search and binary search",
    word: { term: "Binary search", means: "on a sorted row, compare the middle and throw away half." },
    steps: [
      { label: "Walk the row", text: "Linear search starts at the front and checks each item until it matches or the row ends. Worst case, it looks at all of them. Use it when the row is short or not sorted." },
      { label: "Cut in half", text: "Binary search needs a sorted row. Look at the middle. If the key is smaller, keep the left half. If it is larger, keep the right half. Repeat." },
      { label: "Find 30", text: "In the row 3, 8, 12, 19, 21, 30, 44, 50, the first middle is 19. Thirty is larger, so the left half is discarded. The next middle is 30. Found in two comparisons, not eight." },
      { label: "The ends", text: "The usual bug is the ends: whether the high index is included, and what happens when the key is missing. Test the first item, the last item, and a key that is not there." },
      { label: "Insertion sort", text: "If ten items must be sorted on the chip, insertion sort is the honest tool. Take the next item and slide it backward until it sits in order. It needs almost no extra RAM. Do not sort inside an interrupt, and do not re-sort a table you only read." }
    ],
    takeaway: "Scan a short unsorted row. Binary-search a sorted one. For a handful of items, insertion sort is enough.",
    quiz: {
      q: "What must be true before binary search is valid?",
      choices: [
        "The row is sorted by the key you compare",
        "The length is a power of two",
        "The table is stored in a ring buffer"
      ],
      a: 0,
      because: "Throwing away half is only safe when everything on that side is smaller or larger. The length can be any size."
    }
  },
  {
    id: "lookup-avg",
    module: "Structures and algorithms",
    title: "Tables and a moving average",
    word: { term: "Moving average", means: "the sum of the last N samples, divided by N." },
    steps: [
      { label: "Remember it", text: "Some functions are cheaper to remember than to compute. A sensor curve or a sine quarter-wave can live in flash. The index is the input. The slot is the answer." },
      { label: "Between slots", text: "Between two entries you can interpolate: step part of the way from the lower value toward the upper one. That costs a little math and saves a lot of flash if the curve is smooth." },
      { label: "The running sum", text: "A moving average keeps the last N samples in a ring. Re-adding all of them every time is linear work. Keep a running sum instead. Subtract the sample that falls out, add the new one, then divide by N." },
      { label: "A number", text: "Samples 2, 4, 6, and 8 sum to 20. The average is 5. A new sample 10 pushes 2 out. The sum becomes 20 minus 2 plus 10, which is 28. The average is 7. One subtract and one add, not four." },
      { label: "The lag", text: "If N is a power of two, the divide is a shift. The average lags the real signal. A huge N is smooth and late. Do not put that lag in a control loop that needs to be quick." }
    ],
    takeaway: "Store a curve in a table. Smooth samples with a running sum. Remember that smoothing delays the signal.",
    quiz: {
      q: "What does the running-sum trick avoid?",
      choices: [
        "Sorting the samples first",
        "Storing any samples at all",
        "Adding all N samples again on every new reading"
      ],
      a: 2,
      because: "You still store the N samples so you can subtract the one that leaves. You do not walk them to rebuild the sum."
    }
  },
  {
    id: "fixed-point",
    module: "Structures and algorithms",
    title: "Fractions without a float unit",
    word: { term: "Q15", means: "a signed integer whose real value is the integer divided by 32768." },
    steps: [
      { label: "No float unit", text: "A Cortex-M0 has no floating-point hardware. Software float is large and slow. If an M4F is fitted, hardware float is fine for occasional math. A tight loop may still want integers." },
      { label: "A fixed dot", text: "Fixed point stores a fraction in an integer. In Q15 the real value is the integer divided by 32768. So 16384 means one half. The top bit is the sign. The range is about -1 to just under 1." },
      { label: "Half times half", text: "Multiply two Q15 numbers and the product is Q30 inside a 32-bit register. Shift right by 15, keeping the sign, to return to Q15. One half times one half is 16384 times 16384, then a shift, which gives 8192. That is one quarter." },
      { label: "Same format", text: "Add numbers only when they share a format. Do not add a Q15 to a Q7 and expect a meaning. Scale one of them first. Two 16-bit factors need a 32-bit home before you shift, or the product overflows." },
      { label: "Saturation", text: "A filter that overflows an integer wraps around and can become a huge negative. DSP instructions on an M4 can saturate instead of wrapping. On a smaller core you check the range yourself." }
    ],
    takeaway: "Q15 means divide the integer by 32768. Multiply in a wider type, then shift right by 15 to come back.",
    quiz: {
      q: "Two Q15 values were multiplied into a 32-bit product. How do you get Q15 again?",
      choices: [
        "Divide by 10",
        "Shift right by 15, keeping the sign",
        "Set the low bit of the program counter"
      ],
      a: 1,
      because: "Each Q15 factor contributed 15 fraction bits, so the product has 30. Dropping 15 puts the dot back."
    }
  },
  {
    id: "crc-check",
    module: "Structures and algorithms",
    title: "A remainder that catches flipped bits",
    word: { term: "CRC", means: "a remainder from dividing the message bits by an agreed polynomial." },
    steps: [
      { label: "Better than a sum", text: "A checksum asks whether bytes changed on the wire. A plain sum misses some changes, including swaps that keep the same total. A CRC catches many more of those patterns." },
      { label: "Shift and XOR", text: "Bits shift through a register. When a 1 shifts out, the register is XORed with a fixed pattern, the polynomial. The bits left at the end are the remainder you send with the message." },
      { label: "Same recipe", text: "Both ends must share the width, the polynomial, the starting value, and whether the result is flipped at the end. CRC-16 and CRC-32 are families, not one recipe. A mismatch looks like a broken cable." },
      { label: "A table", text: "Doing it one bit at a time is clear and slow. A 256-entry table turns a whole byte into one lookup and one XOR. The table costs flash. On a busy link it is usually worth it." },
      { label: "Not a lock", text: "A matching CRC means the bytes are very likely intact. It is not a signature and it is not encryption. Anyone who can change the bytes can recompute the CRC too." }
    ],
    takeaway: "A CRC is a shift-and-XOR remainder. Both ends must use the same polynomial and the same extra rules.",
    quiz: {
      q: "What has to match before a CRC is meaningful?",
      choices: [
        "Width, polynomial, start value, and the final-flip rule",
        "Only the baud rate",
        "The priority number of the UART interrupt"
      ],
      a: 0,
      because: "Different recipes produce different remainders from the same bytes. The baud rate only gets the bits across."
    }
  },
  {
    id: "bits-and-states",
    module: "Structures and algorithms",
    title: "Bit tricks and a state table",
    word: { term: "State table", means: "rows of state, event, next state, and action. The loop finds the row." },
    steps: [
      { label: "Four moves", text: "Set a bit by ORing a one in that place. Clear it by ANDing the inverse. Toggle with XOR. Test with AND. These four moves are behind every careful register write." },
      { label: "A field", text: "A field wider than one bit needs a mask. Shift the value down, AND off the width, then shift a new value up and merge it so the neighbor bits survive. That is read-modify-write aimed at a field." },
      { label: "CLZ and bit-band", text: "Cortex-M3 and above have CLZ, count leading zeros. It finds the highest one-bit in one instruction. An M0 scans in a short loop instead. Many M3 and M4 chips also offer bit-band, a second address per bit. Cortex-M7 does not. Check the datasheet before you depend on it." },
      { label: "Rows, not nests", text: "When a state machine outgrows a few branches, make it data. Each row says: current state, event, next state, action. The loop finds the row. Adding a behavior is adding a row, not nesting another if inside an interrupt." },
      { label: "Keep it in flash", text: "The table can live in flash. Number the states tightly and you can index instead of scanning. Test every row you care about, including the events that should be ignored." }
    ],
    takeaway: "Clear a bit with AND of its inverse. When the machine grows, put the transitions in a table.",
    quiz: {
      q: "How do you clear bit 3 without changing the other bits?",
      choices: [
        "OR the register with 0x08",
        "AND the register with the inverse of 0x08",
        "Add 8 to the program counter"
      ],
      a: 1,
      because: "0x08 is bit 3. AND with its inverse forces that bit to 0 and leaves every other bit as it was."
    }
  }
);
