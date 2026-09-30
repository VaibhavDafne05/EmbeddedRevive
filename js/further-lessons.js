LESSONS.push(
  {
    id: "thread-mode",
    module: "Schedule, faults, and control",
    title: "Two modes, two stacks",
    word: { term: "Handler mode", means: "the mode the core uses inside an exception. It always uses the main stack, MSP." },
    steps: [
      { label: "Handler", text: "While an interrupt or fault is running, the core is in handler mode. That mode always uses the main stack pointer, MSP. The stack you set from the vector table is this one." },
      { label: "Thread", text: "Ordinary code, including main and RTOS tasks, runs in thread mode. Thread mode may use MSP, or it may use the process stack, PSP. An RTOS gives each task a PSP so one task cannot walk on another's stack." },
      { label: "The bit", text: "Bit 1 of the CONTROL register chooses the thread stack. Clear means MSP. Set means PSP. Handler mode ignores that bit and stays on MSP." },
      { label: "Privilege", text: "Bit 0 of CONTROL can drop thread mode to unprivileged. Handler mode stays privileged, so it can program the interrupt controller and the MPU. Many small programs never clear bit 0. An RTOS often does." }
    ],
    code: `/* Teaching sketch. Bit 1 of CONTROL is SPSEL. */
int thread_uses_psp(void) {
  uint32_t control;
  __asm volatile("mrs %0, control" : "=r"(control));
  return (control & 2u) != 0u;
}`,
    takeaway: "Exceptions run on MSP. Tasks can each have a PSP. CONTROL bit 1 is the switch for thread mode.",
    quiz: {
      q: "Which stack does handler mode use?",
      choices: [
        "Whichever stack the task last selected",
        "Always the main stack, MSP",
        "Always the process stack, PSP"
      ],
      a: 1,
      because: "Handler mode ignores SPSEL and uses MSP. PSP belongs to thread mode."
    }
  },
  {
    id: "pendsv",
    module: "Schedule, faults, and control",
    title: "Switch later, not inside the tick",
    word: { term: "PendSV", means: "a low-priority exception used to finish a context switch after the urgent handler returns." },
    steps: [
      { label: "A short tick", text: "SysTick, or a device interrupt, has a deadline of its own. It should count time or grab a byte, then get out. Switching stacks inside it makes every device wait." },
      { label: "Set the flag", text: "If a switch is due, the handler writes the PendSV-set bit and returns. PendSV is left at the lowest urgency, so every real device interrupt still beats it." },
      { label: "Then the switch", text: "When the urgent handlers are done, PendSV runs. That is where the registers are saved and the next task's stack is chosen. The device handler never did that work." },
      { label: "One place", text: "All switches go through this one low-priority door. A button interrupt and the tick do not each grow their own copy of the switcher." }
    ],
    code: `void SysTick_Handler(void) {
  tick_ms++;
  if (schedule_due()) {
    /* ICSR bit PENDSVSET. Any exception can pend it. */
    *(volatile uint32_t *)0xE000ED04 = (1u << 28);
  }
}

void PendSV_Handler(void) {
  switch_tasks(); /* the long part lives here */
}`,
    takeaway: "Urgent handlers only pend PendSV. The context switch runs after they return, at the lowest urgency.",
    quiz: {
      q: "Why pend PendSV instead of switching inside SysTick?",
      choices: [
        "So device interrupts are not stuck behind the switch",
        "Because SysTick cannot read RAM",
        "Because PendSV runs at the highest urgency"
      ],
      a: 0,
      because: "PendSV is configured as the least urgent exception. Higher interrupts still preempt it."
    }
  },
  {
    id: "switch-save",
    module: "Schedule, faults, and control",
    title: "The registers the hardware did not save",
    word: { term: "Context switch", means: "saving one task's registers and stack, then restoring another's." },
    steps: [
      { label: "Already stacked", text: "Entering PendSV, the hardware has already pushed R0, R1, R2, R3, R12, LR, the return address, and the flags. That is the same eight-word frame as any other exception." },
      { label: "Save the rest", text: "R4 through R11 survive a normal call, so the hardware does not stack them. The switch must. They are stored on that task's process stack." },
      { label: "Keep the return", text: "A branch-and-link inside the switcher overwrites LR. LR currently holds the special return code, not a function address. Save LR with R4 through R11, or the return code is gone." },
      { label: "Swap and return", text: "Store the updated stack pointer in the task block. Load the next task's pointer. Pop R4 through R11 and LR. Write the pointer back to PSP. Branch to LR. Hardware then pops the eight-word frame of the new task." }
    ],
    code: `/* PendSV, naked. sched_next takes the old PSP in r0
   and returns the new PSP in r0. */
__attribute__((naked)) void PendSV_Handler(void) {
  __asm volatile(
    "mrs   r0, psp\n"
    "stmdb r0!, {r4-r11, lr}\n" /* lr holds EXC_RETURN */
    "bl    sched_next\n"
    "ldmia r0!, {r4-r11, lr}\n"
    "msr   psp, r0\n"
    "bx    lr\n"               /* hardware pops R0-R3, R12, PC, xPSR */
  );
}`,
    takeaway: "Hardware stacked the caller-saved registers. PendSV stacks R4–R11 and LR, swaps PSP, and returns through the special code.",
    quiz: {
      q: "Why must the software switch save LR?",
      choices: [
        "LR holds the special return code, and a call inside the switcher overwrites it",
        "LR is the only register the hardware stacked",
        "LR is the peripheral clock gate"
      ],
      a: 0,
      because: "The hardware frame is already on the stack. LR in the CPU still holds EXC_RETURN until a bl replaces it."
    }
  },
  {
    id: "lock-surprise",
    module: "Schedule, faults, and control",
    title: "The lock that blocks the urgent task",
    word: { term: "Priority inheritance", means: "while a task holds a lock an urgent task needs, the holder is lifted so it can finish and let go." },
    steps: [
      { label: "Low holds it", text: "Task Low takes a mutex and starts a short update of a shared buffer. The update must not be torn, so the lock is real." },
      { label: "High waits", text: "Task High becomes ready and needs the same lock. It cannot enter. It waits." },
      { label: "Medium cuts in", text: "Without help, Task Medium, which does not need the lock, runs ahead of Low. High stays blocked behind a task it does not even share data with. That is priority inversion." },
      { label: "Lift the holder", text: "Inheritance raises Low to High's urgency until Low releases the lock. Medium no longer sneaks in. Then Low drops back to its own urgency. The locked stretch still has to be tiny. Inheritance is a safety net, not a permit to hold a lock across a delay." }
    ],
    code: `/* Teaching sketch, not an atomic lock.
   urgency is the opposite of the NVIC number:
   a bigger urgency runs first. */
void lock(mutex_t *m) {
  while (m->held) {
    if (me->urgency > m->owner->urgency)
      m->owner->urgency = me->urgency;
    yield();
  }
  m->held = 1;
  m->owner = me;
}

void unlock(mutex_t *m) {
  me->urgency = me->base_urgency;
  m->held = 0;
  m->owner = 0;
  yield();
}`,
    takeaway: "A lock can let a slow holder block an urgent task. Lift the holder until it unlocks, and keep the locked work short.",
    quiz: {
      q: "What does priority inheritance change?",
      choices: [
        "The lock holder runs at the urgency of the waiter until it unlocks",
        "It deletes the medium task",
        "It turns the mutex into a queue of bytes"
      ],
      a: 0,
      because: "The holder is lifted only for the duration of the lock, so the waiter is not stuck behind an unrelated medium task."
    }
  },
  {
    id: "stack-paint",
    module: "Schedule, faults, and control",
    title: "Paint the stack, then see how deep it went",
    word: { term: "High-water mark", means: "the furthest the stack has grown since you painted the unused words." },
    steps: [
      { label: "A known pattern", text: "Before a stack is used, fill it with a repeating word such as 0xA5A5A5A5. Unused words stay painted. Used words get overwritten with real frames." },
      { label: "Measure from the end", text: "Later, walk from the unused end until the paint stops. The distance you walked is the unused margin. The rest is the high-water mark." },
      { label: "Each stack", text: "Main, each task, and the interrupt stack are separate. Paint and measure each one. A task that looks fine can still be one interrupt away from colliding." },
      { label: "Leave a margin", text: "If the unused margin is a handful of words, the stack is too small. Give it room for the deepest call plus one interrupt frame. Measure on the real chip, with the real interrupts firing." }
    ],
    code: `#define PAINT 0xA5A5A5A5u

void stack_paint(uint32_t *bottom, uint32_t *top) {
  while (bottom < top) *bottom++ = PAINT;
}

uint32_t stack_unused_bytes(uint32_t *bottom, uint32_t *top) {
  uint32_t *p = bottom;
  while (p < top && *p == PAINT) p++;
  return (uint32_t)(p - bottom) * 4u;
}`,
    takeaway: "Paint unused stack, run the real workload, and keep a margin beyond the deepest word that changed.",
    quiz: {
      q: "What does leftover paint mean?",
      choices: [
        "Those words were never written, so they are still spare stack",
        "The chip failed to reset",
        "The CRC of flash is wrong"
      ],
      a: 0,
      because: "A used word is overwritten. Paint that remains is the unused side of the high-water mark."
    }
  },
  {
    id: "dma-porter",
    module: "Schedule, faults, and control",
    title: "The porter that moves bytes alone",
    word: { term: "DMA", means: "a hardware mover. It copies from a source to a destination for a count, without the CPU in the loop." },
    steps: [
      { label: "A request", text: "A peripheral says a byte is ready, or a timer says a sample is due. That request triggers the DMA channel. The CPU does not poll." },
      { label: "Source and dest", text: "You program a source address, a destination address, and a count. Each side can stay put or step forward. A UART data register stays put. A memory buffer steps." },
      { label: "The CPU leaves", text: "After the channel is enabled, the copies happen on their own. The CPU can sleep, run another task, or fill the next buffer." },
      { label: "Half and done", text: "Many controllers can interrupt at the halfway mark and when the count hits zero. Half means you may read the first half while the porter fills the second." },
      { label: "Circular", text: "Circular mode reloads the count and walks the same buffer forever. Point it at the ring you already use for UART. Publish bytes only up to the index the DMA has finished, or you will read a hole." }
    ],
    code: `/* Teaching sketch of a circular UART-to-RAM channel. */
void dma_uart_circle(uint8_t *ring, uint16_t n) {
  dma.src = UART_DATA_REG; /* register, do not increment */
  dma.dst = (uint32_t)ring; /* memory, increment */
  dma.count = n;            /* power of two, same as the ring */
  dma.src_inc = 0;
  dma.dst_inc = 1;
  dma.circular = 1;
  dma.half_irq = 1;
  dma.done_irq = 1;
  dma.enable = 1;
}`,
    takeaway: "Program source, destination, count, and which side increments. Let the porter run, and do not read past the index it has completed.",
    quiz: {
      q: "Why is the UART data register not incremented?",
      choices: [
        "Every byte arrives in the same register, while memory walks the buffer",
        "DMA cannot read peripherals",
        "The ring length must be 7"
      ],
      a: 0,
      because: "The peripheral address stays fixed. The memory address steps once per byte."
    }
  },
  {
    id: "alignment",
    module: "Schedule, faults, and control",
    title: "Bytes in the order the wire expects",
    word: { term: "Little-endian", means: "the low byte of a number sits at the low address. Cortex-M is little-endian." },
    steps: [
      { label: "Low byte first", text: "The number 0x00000344 is stored in RAM as the bytes 44, then 03, then 00, then 00. The low byte comes first. That is little-endian, and it is how Cortex-M works." },
      { label: "Aligned loads", text: "A 32-bit load wants an address that is a multiple of 4. A 16-bit load wants a multiple of 2. An M0 is strict. On a larger M, ordinary RAM may forgive an unaligned load. Device memory, the peripheral window, does not. An unaligned access there faults." },
      { label: "Do not trust the struct", text: "A C struct's padding and endianness are the compiler's choice. A packet on a wire is a row of bytes with a written order. Copy each field in and out with shifts. Then the layout cannot change under you." },
      { label: "One helper", text: "Write the low byte to the first slot, then the next, up to the high byte. Reading is the reverse: slot 0 is the least significant byte. The same helpers serve UART payloads, Modbus, and an image header." }
    ],
    code: `void put_u32_le(uint8_t *p, uint32_t v) {
  p[0] = (uint8_t)v;
  p[1] = (uint8_t)(v >> 8);
  p[2] = (uint8_t)(v >> 16);
  p[3] = (uint8_t)(v >> 24);
}

uint32_t get_u32_le(const uint8_t *p) {
  return (uint32_t)p[0]
       | ((uint32_t)p[1] << 8)
       | ((uint32_t)p[2] << 16)
       | ((uint32_t)p[3] << 24);
}`,
    takeaway: "Cortex-M stores the low byte first. On the wire, place each byte yourself so padding and alignment cannot surprise you.",
    quiz: {
      q: "How is 0x00000344 stored in Cortex-M memory?",
      choices: [
        "The bytes 44, 03, 00, 00 starting at the low address",
        "The bytes 00, 00, 03, 44 starting at the low address",
        "As a single Thumb bit"
      ],
      a: 0,
      because: "Little-endian puts the least significant byte at the lowest address."
    }
  },
  {
    id: "hardfault",
    module: "Schedule, faults, and control",
    title: "Read the fault from the stacked PC",
    word: { term: "CFSR", means: "the configurable fault status register on Cortex-M3 and above. It says which kind of fault happened." },
    steps: [
      { label: "Which stack", text: "A fault is an exception, so it stacks a frame first. Bit 2 of LR tells you where. Clear means the frame is on MSP. Set means it is on PSP, because the fault happened in a task." },
      { label: "The return address", text: "Word 6 of that frame is the program counter that was interrupted. That address, in the disassembly, is the instruction that faulted or the one just after a branch. Start there." },
      { label: "Three groups", text: "On M3 and above, CFSR at 0xE000ED28 groups the reason. Memory faults include a blocked MPU access. Bus faults include a bad peripheral address. Usage faults include an undefined instruction, an even Thumb target, and an unaligned access." },
      { label: "Two familiar ones", text: "An even function address is the Thumb-bit fault you already know. An unaligned read of a peripheral register is the alignment fault. The stacked PC plus the status bit names the bug. An M0 only has HardFault, so you still start from the stacked PC." }
    ],
    code: `/* Thumb-2. M3 and above. M0 has no CFSR and no IT block. */
void HardFault_Handler(void) {
  uint32_t *sp;
  __asm volatile(
    "tst lr, #4\n"          /* bit 2: 0 = MSP, 1 = PSP */
    "ite eq\n"
    "mrseq %0, msp\n"
    "mrsne %0, psp\n"
    : "=r"(sp));
  uint32_t pc = sp[6];
  uint32_t cfsr = *(volatile uint32_t *)0xE000ED28;
  log_fault(pc, cfsr);      /* then stop; do not stumble on */
  while (1) {}
}`,
    takeaway: "Pick MSP or PSP from LR, read the stacked PC, then read CFSR on M3 and above. That pair names the fault.",
    quiz: {
      q: "Which word of the hardware frame is the program counter?",
      choices: [
        "Word 0, which is R0",
        "Word 6, after R0, R1, R2, R3, R12, and LR",
        "The NVIC priority register"
      ],
      a: 1,
      because: "The frame order is R0, R1, R2, R3, R12, LR, PC, xPSR. PC is index 6."
    }
  },
  {
    id: "mpu-regions",
    module: "Schedule, faults, and control",
    title: "Regions that allow or deny",
    word: { term: "MPU", means: "a memory protection unit. It checks address ranges. It does not translate them into different pages." },
    steps: [
      { label: "Not a PC map", text: "An MPU does not give each task a private view of memory the way a laptop does. The address 0x20001000 is still that RAM cell. The MPU only decides whether this access may happen." },
      { label: "Power-of-two windows", text: "A region has a base and a size that is a power of two, and the base must be aligned to that size. A 32 KB region starts on a 32 KB boundary." },
      { label: "Three useful rules", text: "Flash may be read and executed. RAM may be read and written, and must not be executed. The peripheral window may be read and written, and must not be executed. Execute-never on RAM stops a smashed stack from being run as code." },
      { label: "Fault instead of smash", text: "Turn on a default deny, then allow only those regions. A wild pointer becomes a memory-management fault with a stacked PC, instead of a silent write into someone else's variables." }
    ],
    code: `typedef struct {
  uint32_t base;
  uint8_t size_log2; /* 16 means 64 KB */
  uint8_t execute;   /* 1 = allow fetch */
  uint8_t write;     /* 1 = allow stores */
} region_t;

/* Program these into the MPU, then enable it.
   Anything outside the table is denied. */
const region_t map[] = {
  { 0x00000000u, 20, 1, 0 }, /* flash, execute, read-only */
  { 0x20000000u, 16, 0, 1 }, /* SRAM, no execute, read-write */
  { 0x40000000u, 28, 0, 1 }, /* peripherals, no execute */
};`,
    takeaway: "Allow flash to execute, allow RAM and peripherals to be data, and deny everything else. A bad pointer then faults at a known PC.",
    quiz: {
      q: "What should be true of RAM on a microcontroller with an MPU?",
      choices: [
        "Read and write, and execute-never",
        "Execute-only, so variables cannot be stored",
        "Translated to a different address for every task"
      ],
      a: 0,
      because: "RAM holds data. Refusing to fetch instructions from it stops a corrupted stack from running."
    }
  },
  {
    id: "sampling",
    module: "Schedule, faults, and control",
    title: "Sample faster than the wiggle",
    word: { term: "Aliasing", means: "a fast signal sampled too slowly, so it shows up as a slower fake wave." },
    steps: [
      { label: "Too few dots", text: "If a signal wiggles three times between your samples, the dots can look like one slow wave. The fast motion did not vanish. Your samples lied about it." },
      { label: "The rule", text: "Sample faster than twice the fastest change you care about. Twice is the edge of the rule, not a comfortable rate. Practical loops sample several times faster." },
      { label: "Filter first", text: "A resistor and capacitor, or a filter in front of the ADC, should knock down the wiggles you do not intend to measure. Software cannot unmix a lie that the samples already told." },
      { label: "A timer, not a guess", text: "Start each sample from a hardware timer so the gap is fixed. A delay loop changes when the clock or the work changes. The later filter and the PID both assume that gap." }
    ],
    takeaway: "Sample on a timer, faster than twice the motion you care about, and filter the rest before the ADC.",
    quiz: {
      q: "What is aliasing?",
      choices: [
        "A fast change that looks slow because the samples were too far apart",
        "A CRC that matches by accident",
        "Two tasks sharing MSP"
      ],
      a: 0,
      because: "The samples are real voltages. They are just too sparse to show the true speed of the wave."
    }
  },
  {
    id: "fir-taps",
    module: "Schedule, faults, and control",
    title: "A weighted walk along the ring",
    word: { term: "FIR", means: "a finite impulse response filter. The output is a weighted sum of the last N samples, and then those samples are forgotten." },
    steps: [
      { label: "Equal weights", text: "The moving average is an FIR. Every one of the last N samples has the same weight, one over N. The running sum you already use is just the fast way to add equal weights." },
      { label: "Different weights", text: "A general FIR gives each tap its own weight. Newest sample times w0, the one before times w1, and so on. Add those products. That sum is the output." },
      { label: "Q15 weights", text: "Keep samples and weights in Q15, accumulate in 32 bits, then shift right by 15. The ring length should be a power of two so the index wraps with a mask." },
      { label: "Cost and lag", text: "The work grows with the number of taps. One new sample does N multiplies. The delay is about half the length. A long FIR is smooth, late, and expensive. Do not run a 200-tap FIR inside a 1-millisecond motor loop unless you have counted those multiplies." }
    ],
    code: `/* Teaching sketch. n is a power of two.
   head is the newest sample. w[i] weights the sample
   i steps older. Weights are Q15. */
int32_t fir_q15(const int16_t *ring, int head,
                const int16_t *w, int n) {
  int32_t acc = 0;
  for (int i = 0; i < n; i++) {
    int k = (head - i) & (n - 1);
    acc += (int32_t)ring[k] * (int32_t)w[i];
  }
  return acc >> 15;
}

int16_t moving_average(const int16_t *ring, int n) {
  int32_t sum = 0;
  for (int i = 0; i < n; i++) sum += ring[i];
  return (int16_t)(sum / n);
}`,
    takeaway: "An FIR is a weighted sum of the last N samples. Equal weights are an average. More taps cost more multiplies and add delay.",
    quiz: {
      q: "How does FIR work grow when you add taps?",
      choices: [
        "Each new sample does one more multiply per added tap",
        "The cost stays one multiply no matter how long the filter is",
        "The ADC resolution doubles"
      ],
      a: 0,
      because: "Every tap is one multiply-add per sample. N taps means N multiplies."
    }
  },
  {
    id: "one-pole",
    module: "Schedule, faults, and control",
    title: "One multiply, one memory",
    word: { term: "One-pole smoother", means: "y becomes y plus a fraction of the distance from y to the new sample." },
    steps: [
      { label: "The step", text: "Keep one output, y. When sample x arrives, move y part of the way toward x. In symbols, y = y + a times (x minus y). a is a fraction between 0 and 1." },
      { label: "What a does", text: "If a is near 1, y jumps to x and barely smooths. If a is near 0, y creeps. Noise shrinks, and a real step shows up late. You pick a from how late you can stand to be." },
      { label: "In Q15", text: "Store y, x, and a as Q15. Subtract in a 32-bit temporary, multiply by a, shift right 15, and add back to y. One remembered value replaces a whole ring." },
      { label: "Compared with FIR", text: "This is cheaper than a long FIR and uses one word of RAM. It is also an infinite response: a huge old sample never fully leaves, it only fades. Do not use it where you need a hard cutoff. Use it to calm a noisy measurement before a PID." }
    ],
    code: `/* Teaching sketch. a, x, and y are Q15.
   a is between 1 and 32767. The shift keeps the sign. */
int16_t smooth(int16_t y, int16_t x, int16_t a) {
  int32_t diff = (int32_t)x - (int32_t)y;
  int32_t step = (diff * (int32_t)a) >> 15;
  return (int16_t)((int32_t)y + step);
}`,
    takeaway: "Move the old output a fraction of the way toward the new sample. One multiply, one stored value, and a lag you chose with a.",
    quiz: {
      q: "What does a small a do in y = y + a*(x - y)?",
      choices: [
        "It creeps toward x, so the result is smoother and later",
        "It skips the ADC",
        "It clears the Thumb bit"
      ],
      a: 0,
      because: "A small fraction of the gap is added each sample, so y changes slowly."
    }
  },
  {
    id: "pid-loop",
    module: "Schedule, faults, and control",
    title: "P, I, and D into a duty cycle",
    word: { term: "PID", means: "a controller. P pushes with the error, I removes a standing error, D damps a fast change." },
    steps: [
      { label: "P", text: "Error is the setpoint minus the measurement. P multiplies that error. Far away, it pushes hard. Close, it pushes gently. P alone often sits a little off the setpoint." },
      { label: "I, with a clamp", text: "I adds the error every sample, then multiplies. That accumulated push removes the leftover offset. If the output is already as high as the PWM can go, stop adding. Otherwise the accumulator winds up and overshoots when the plant finally moves." },
      { label: "D on the measurement", text: "D looks at how fast the measurement is changing, not how fast the setpoint jumped. A sudden new setpoint would otherwise look like a huge slope and kick the output. Use the change in the measurement, with the opposite sign, so a rising measurement eases the push." },
      { label: "Fixed time, then PWM", text: "Run this only from the sample timer, so I and D mean a known amount per second. Clamp the sum to a legal duty. The loop is: timer, ADC, smoother if you need it, PID in Q15, PWM. The deadline is the sample period." }
    ],
    code: `typedef struct {
  int32_t i;
  int16_t prev_meas;
  int16_t kp, ki, kd; /* Q15. ki already includes the sample time. */
  int32_t i_max;
  int16_t out_max;    /* PWM counts */
} pid_t;

int16_t pid_step(pid_t *p, int16_t set, int16_t meas) {
  int32_t err = (int32_t)set - meas;
  int32_t d = (int32_t)p->prev_meas - meas; /* D on measurement */
  p->prev_meas = meas;
  p->i += err;
  if (p->i > p->i_max) p->i = p->i_max;
  if (p->i < -p->i_max) p->i = -p->i_max;
  int32_t out = ((err * p->kp) >> 15)
              + ((p->i * p->ki) >> 15)
              + ((d   * p->kd) >> 15);
  if (out > p->out_max) out = p->out_max;
  if (out < 0) out = 0;
  return (int16_t)out;
}

void control_tick(void) { /* sample timer */
  int16_t meas = adc_to_q15();
  pwm_set(pid_step(&loop, setpoint, meas));
}`,
    takeaway: "P on the error, I clamped so it cannot wind up, D on the measurement. Run it on the sample timer and clamp the duty.",
    quiz: {
      q: "Why is the D term taken from the measurement, not the error?",
      choices: [
        "A step in the setpoint would otherwise look like a huge slope and kick the output",
        "The measurement is always an integer power of two",
        "D replaces the need for a timer"
      ],
      a: 0,
      because: "Error jumps when the setpoint jumps, even if the plant has not moved. The measurement's slope is the plant's slope."
    }
  },
  {
    id: "reset-main",
    module: "Boot and update",
    title: "From the vector table to main",
    word: { term: "Startup", means: "the reset handler's job: copy initial values into RAM, zero the rest, then call main." },
    steps: [
      { label: "Two words", text: "Reset reads word 0 as MSP and word 1 as the reset handler. That handler is not main. It is a small piece of code the toolchain usually gives you, and you can write it yourself." },
      { label: "Copy data", text: "Variables with an initial value live in flash so they survive power loss, and they must run in RAM so the program can change them. Startup copies that block from its flash address to its RAM address." },
      { label: "Zero bss", text: "Uninitialized globals and statics are supposed to start at zero. They do not occupy flash. Startup writes zeros over their RAM range. If you skip this, they start as whatever RAM power-up left behind." },
      { label: "Then main", text: "After the copy and the zeros, call main. Interrupts are still off unless you turned them on. The vector table is in force. main is the first C that can assume globals are honest." }
    ],
    code: `extern uint32_t data_load[], data_start[], data_end[];
extern uint32_t bss_start[], bss_end[];
extern int main(void);

void reset_handler(void) {
  uint32_t *src = data_load;
  uint32_t *dst = data_start;
  while (dst < data_end) *dst++ = *src++;
  for (uint32_t *b = bss_start; b < bss_end; ++b) *b = 0;
  main();
  while (1) {}
}`,
    takeaway: "Reset sets the stack and enters startup. Startup copies .data, zeros .bss, then calls main.",
    quiz: {
      q: "Why copy .data from flash into RAM?",
      choices: [
        "Those variables have initial values that must survive power loss and still be writable",
        "RAM cannot hold zeros",
        "The Thumb bit lives in .data"
      ],
      a: 0,
      because: "Flash keeps the initial image. RAM is where the running program is allowed to change it."
    }
  },
  {
    id: "linker-map",
    module: "Boot and update",
    title: "Where each section sits",
    word: { term: "Load address", means: "where a section is stored in the image. The run address is where the CPU uses it." },
    steps: [
      { label: "Code stays", text: ".text and .rodata stay in flash. Their load address and run address are the same. The CPU fetches them in place." },
      { label: "Data moves", text: ".data has two addresses. The load address is in flash, inside the file you program. The run address is in RAM. Startup copies from the first to the second. The linker script is what publishes both." },
      { label: "Bss and stack", text: ".bss has only a RAM address and a size. Nothing is stored for it in the file except the range to zero. The stack is the unused RAM above the variables, growing down from the top you chose." },
      { label: "Match the chip", text: "The script's FLASH and RAM origins must be the windows from the datasheet, the same map you saw at 0x00000000 and 0x20000000. A script from a different part will boot into the wrong place." }
    ],
    code: `MEMORY {
  FLASH (rx) : ORIGIN = 0x00000000, LENGTH = 256K
  RAM  (rwx) : ORIGIN = 0x20000000, LENGTH = 64K
}
SECTIONS {
  .text  : { *(.text*) *(.rodata*) } > FLASH
  .data  : { *(.data*) } > RAM AT > FLASH
  .bss   : { *(.bss*) *(COMMON) } > RAM
}`,
    takeaway: ".text stays in flash. .data is stored in flash and copied to RAM. .bss is RAM that startup zeros. The origins must match the chip.",
    quiz: {
      q: "What does the AT FLASH clause mean on a section that runs in RAM?",
      choices: [
        "Store the initial bytes in flash, and use them at the RAM address",
        "Execute the RAM with the Thumb bit clear",
        "Put the stack in the peripheral window"
      ],
      a: 0,
      because: "The run region is RAM. AT gives the load address in flash that startup copies from."
    }
  },
  {
    id: "boot-jump",
    module: "Boot and update",
    title: "A small program that jumps to the real one",
    word: { term: "Bootloader", means: "the first program in flash. It checks the application, then jumps to it." },
    steps: [
      { label: "Lives at the start", text: "The bootloader occupies the reset address, so power always enters it. The application image sits higher in flash, with its own vector table." },
      { label: "Check, then aim", text: "If the image header is honest, write VTOR to the application's vector table. From then on, interrupts use the application's handlers, not the bootloader's." },
      { label: "New stack, odd address", text: "Load MSP from word 0 of that table. Word 1 is the reset handler, and it must be odd because it is Thumb. Branch there. Do this with interrupts masked, or a handler from the old table can run halfway through." },
      { label: "No return", text: "This jump does not come back. The application is now the program. If the check fails, stay in the bootloader and wait for a new image. Do not branch to an even address or to an empty sector." }
    ],
    code: `typedef void (*entry_t)(void);

void jump_to_image(uint32_t base) {
  uint32_t sp = *(volatile uint32_t *)base;
  uint32_t reset = *(volatile uint32_t *)(base + 4u);
  __disable_irq();
  *(volatile uint32_t *)0xE000ED08 = base; /* VTOR */
  __asm volatile("dsb\n isb");             /* let the new table land */
  __asm volatile("msr msp, %0" :: "r"(sp));
  ((entry_t)reset)(); /* reset is odd: Thumb */
}`,
    takeaway: "Mask interrupts, point VTOR at the new table, load MSP from word 0, and branch to the odd reset address in word 1.",
    quiz: {
      q: "Why write VTOR before the jump?",
      choices: [
        "So later interrupts use the application's vector table",
        "So the CRC polynomial changes",
        "So PSP becomes the flash base"
      ],
      a: 0,
      because: "Until VTOR moves, exceptions still fetch handlers from the bootloader's table."
    }
  },
  {
    id: "two-slots",
    module: "Boot and update",
    title: "A new image that can fail safely",
    word: { term: "Confirmed image", means: "a slot whose CRC matched and which has already run far enough to say so." },
    steps: [
      { label: "Two homes", text: "Keep slot A as the image you trust. Write the new image into slot B. A power cut while B is programming leaves A bootable." },
      { label: "Header and CRC", text: "Each slot starts with a header: a magic word, a version, a size, and a CRC of the bytes that follow. The bootloader refuses a slot whose CRC does not match. This is the same remainder idea you already use on a wire." },
      { label: "Try once", text: "If B has a good CRC and a newer version, jump to B once. The new program must confirm itself after it has started its real work. Until that mark is written, the next reset goes back to A." },
      { label: "Watch the first boot", text: "Arm the watchdog before the jump. If the new image faults before it confirms, the watchdog resets the chip and A runs again. Do not confirm from the bootloader. Confirm from the application, after it is actually up." }
    ],
    code: `typedef struct {
  uint32_t magic, version, size, crc;
  uint8_t body[];
} image_t;

int crc_ok(const image_t *img) {
  return img->magic == 0x314D4749u
      && crc32(img->body, img->size) == img->crc;
}

/* trial_used and confirmed_version live in flash or a
   backup register. RAM forgets them on reset. */
const image_t *choose_slot(void) {
  if (crc_ok(slot_b) && slot_b->version == confirmed_version)
    return slot_b;
  if (crc_ok(slot_b) && slot_b->version > confirmed_version
      && !trial_used) {
    trial_used = 1;          /* one try, then fall back */
    return slot_b;
  }
  if (crc_ok(slot_a)) return slot_a;
  return 0;                  /* stay in the bootloader */
}

void confirm_boot(void) {   /* app calls this once it is really up */
  confirmed_version = this_image->version;
  trial_used = 0;
}`,
    takeaway: "Program the spare slot, check its CRC, try it once, and keep the old slot until the new program confirms itself.",
    quiz: {
      q: "When is a new image marked confirmed?",
      choices: [
        "After the application has started and says so",
        "As soon as the first flash byte is written",
        "When the baud rate matches"
      ],
      a: 0,
      because: "Confirming early would make a half-written or crashing image the one you trust."
    }
  },
  {
    id: "can-frame",
    module: "CAN and Modbus",
    title: "A frame with an identifier, not an address",
    word: { term: "CAN identifier", means: "the name of a message. Lower identifier wins the wire. It is not the address of a chip." },
    steps: [
      { label: "Who is speaking", text: "Classical CAN carries an identifier and up to 8 data bytes. Nodes listen for identifiers they care about. There is no chip-select and no slave address in the frame." },
      { label: "Dominant wins", text: "A 0 bit is dominant. A 1 bit is recessive. If two nodes write at once, the 0 is what the wire shows. Each node watches the wire. If it sent a 1 and sees a 0, it lost and goes quiet." },
      { label: "Lower id first", text: "Identifiers are sent most significant bit first. A smaller identifier has a 0 in the first place the other has a 1, so the smaller identifier wins. Urgent messages get the small numbers. This is the same idea as Cortex-M priority, applied to the wire." },
      { label: "Eight bytes here", text: "Classical CAN stops at 8 data bytes. CAN FD can carry more, and it can speed up after the identifier. This lesson stays with the classical frame: identifier, length, up to 8 bytes, and a CRC the controller checks for you." }
    ],
    code: `typedef struct {
  uint16_t id;     /* 11-bit standard identifier */
  uint8_t len;     /* 0 to 8 in classical CAN */
  uint8_t data[8];
} can_frame_t;

/* The controller sends id MSB first.
   A 0 beats a 1. A smaller id wins. */
void can_send(const can_frame_t *f) {
  hw_write_id(f->id);
  hw_write_len(f->len);
  hw_write_bytes(f->data, f->len);
  hw_request_transmit();
}`,
    takeaway: "A CAN frame is an identifier plus up to 8 bytes. A smaller identifier wins because a dominant 0 beats a recessive 1.",
    quiz: {
      q: "Two nodes start a classical CAN frame together. Which frame continues?",
      choices: [
        "The one with the smaller identifier",
        "The one with the longer data field",
        "The one that was reset last"
      ],
      a: 0,
      because: "Bits are sent high bit first, and 0 dominates 1, so the lower identifier survives arbitration."
    }
  },
  {
    id: "can-arbitrate",
    module: "CAN and Modbus",
    title: "CAN Arbitration",
    word: { term: "Arbitration", means: "the bit-by-bit contest on the wire. The lower identifier keeps sending. The other one stops." },
    steps: [
      { label: "Two ECUs want the bus", text: "ECU A has identifier 0x120. ECU B has 0x250. The bus is idle, so both may start a frame. Neither waits for a token. The wire itself will decide." },
      { label: "Both transmit", text: "They start together and write the identifier most significant bit first. While the bits match, both keep going. Each one also reads the wire, so it can see if the bit it wrote is the bit that stuck." },
      { label: "Dominant/recessive bits", text: "A 0 is dominant. A 1 is recessive. If one ECU writes 0 and the other writes 1, the wire shows 0. The ECU that wrote 1 can tell it lost, because it sees a bit it did not send." },
      { label: "Lower ID wins", text: "0x120 is 00100100000. 0x250 is 01001010000. The first bit is 0 for both. The next bit is 0 for 0x120 and 1 for 0x250. That 0 dominates. 0x120 is the smaller identifier, so it wins." },
      { label: "Losing ECU stops", text: "0x250 stops transmitting at once. It does not smash the rest of the frame. It waits for the bus to go idle, then it may try again." },
      { label: "Winning ECU continues", text: "0x120 never stopped. It finishes the frame: DLC 8, then the eight data bytes. The other nodes read that identifier and those bytes. The loser retries only after this frame ends." }
    ],
    code: `/* Teaching sketch. 0x120 wins against 0x250. */
CAN_ID = 0x120;
DLC = 8;
DATA = {0x10, 0x27, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00};`,
    takeaway: "0x120 beats 0x250 because the first different bit is a dominant 0 against a recessive 1. The loser stops. The winner sends DLC 8 and the data.",
    quiz: {
      q: "Why does 0x120 beat 0x250?",
      choices: [
        "The first bit where they differ is 0 for 0x120 and 1 for 0x250, and 0 dominates",
        "0x120 carries more data bytes",
        "0x120 was powered on last"
      ],
      a: 0,
      because: "Identifiers go out high bit first. Bit 9 is 0 in 0x120 and 1 in 0x250. The 0 sticks, so 0x250 stops and 0x120 continues."
    }
  },
  {
    id: "can-sample",
    module: "CAN and Modbus",
    title: "Judge the bit once, in the middle of it",
    word: { term: "Sample point", means: "the instant inside a bit time when the controller decides the bit was 0 or 1." },
    steps: [
      { label: "Opposite copies", text: "CAN uses two wires with opposite levels. Noise that hits both wires is common, and the receiver looks at the difference. The shared noise falls out. That is why the pair can run through a noisy machine." },
      { label: "One sample", text: "Each bit lasts a fixed time, split into small quanta. The controller samples once, often around three quarters of the way through the bit, after the edges have settled. Sampling on the edge would catch the ringing." },
      { label: "Agree the time", text: "Every node derives that bit time from its own clock, so the clocks must be close and the sample point must match. A node that samples too early reads a different bit from everyone else and will start shouting errors." },
      { label: "Shout and drop", text: "A node that sees a broken rule transmits an error frame, a run of dominant bits. Everyone discards the frame. The sender tries again. Occasional errors are normal. A counter that climbs means the timing, the wiring, or the termination is wrong." }
    ],
    takeaway: "CAN judges each bit at a sample point on a differential pair. A broken bit becomes an error frame, and the message is sent again.",
    quiz: {
      q: "Why sample away from the edge of the bit?",
      choices: [
        "The level has had time to settle, so the reading is the bit and not the ringing",
        "The identifier is only valid on the edge",
        "Edges are reserved for Modbus"
      ],
      a: 0,
      because: "The sample point sits inside the bit time, after the transition, when every node should see the same level."
    }
  },
  {
    id: "modbus-rtu",
    module: "CAN and Modbus",
    title: "Address, function, data, CRC",
    word: { term: "Modbus RTU", means: "a master-and-slave frame on a UART. Silence marks the end of the frame." },
    steps: [
      { label: "One master", text: "One master speaks. The first byte is the slave address. Only that slave answers. Address 0 is a broadcast some functions use, and nobody answers it." },
      { label: "The function", text: "The second byte says what to do. 0x03 means read holding registers. The following bytes are the arguments, such as a register number and a count. Multi-byte numbers here are big-endian: high byte first. That is the opposite of Cortex-M memory, so use the byte helpers." },
      { label: "CRC-16", text: "The last two bytes are a CRC-16, Modbus recipe: start at 0xFFFF, reflected polynomial 0xA001, and the CRC itself is sent low byte first. A mismatch means drop the frame. It is not a retry by itself. The master decides to ask again." },
      { label: "The quiet gap", text: "There is no length byte for the whole frame and no stop character. A silent gap of about three and a half character times means the frame has ended. A gap in the middle splits one request into two broken ones. Do not print debug bytes inside a frame." }
    ],
    code: `uint16_t crc16_modbus(const uint8_t *p, int n) {
  uint16_t crc = 0xFFFFu;
  for (int i = 0; i < n; i++) {
    crc ^= p[i];
    for (int b = 0; b < 8; b++) {
      if (crc & 1u) crc = (uint16_t)((crc >> 1) ^ 0xA001u);
      else crc = (uint16_t)(crc >> 1);
    }
  }
  return crc;
}

/* Read holding registers. Numbers in the body are big-endian.
   The CRC is little-endian. Returns the byte count. */
int rtu_read_holding(uint8_t *out, uint8_t addr,
                     uint16_t reg, uint16_t count) {
  out[0] = addr;
  out[1] = 0x03;
  out[2] = (uint8_t)(reg >> 8);
  out[3] = (uint8_t)reg;
  out[4] = (uint8_t)(count >> 8);
  out[5] = (uint8_t)count;
  uint16_t c = crc16_modbus(out, 6);
  out[6] = (uint8_t)c;
  out[7] = (uint8_t)(c >> 8);
  return 8;
}`,
    takeaway: "Modbus RTU is address, function, data, and a Modbus CRC-16. Silence ends the frame. Body fields are big-endian.",
    quiz: {
      q: "How does a Modbus RTU receiver know the frame has ended?",
      choices: [
        "A silent gap of about 3.5 character times",
        "A Thumb bit in the last byte",
        "A CAN identifier of zero"
      ],
      a: 0,
      because: "RTU has no length for the whole frame. The idle gap is the delimiter."
    }
  },
  {
    id: "modbus-read",
    module: "CAN and Modbus",
    title: "One legal read, and the refusal",
    word: { term: "Exception response", means: "the slave's reply when the request is illegal. The function byte has its top bit set." },
    steps: [
      { label: "The request", text: "Function 0x03 asks for holding registers. The master sends the starting register and how many. A count of 1 or 2 is a normal sensor read. A count of hundreds may be legal on paper and rude on a slow UART." },
      { label: "The happy reply", text: "The slave repeats its address and the function 0x03, then a byte count, then the register bytes, high byte first, then the CRC. The master checks the CRC before it trusts a single value." },
      { label: "The refusal", text: "If the function is unknown or the register does not exist, the slave does not stay silent. It sends the function with the top bit set, then one exception code. 0x01 means illegal function. 0x02 means illegal address. The CRC still covers that short reply." },
      { label: "Master's job", text: "Silence is not an exception. Silence is a timeout, a wrong address, or a broken wire. Wait a bounded time, then retry a small number of times. Do not parse a reply whose CRC fails." }
    ],
    code: `/* fn | 0x80, then one code.
   0x01 illegal function, 0x02 illegal address.
   CRC helper is crc16_modbus from the previous lesson. */
int rtu_exception(uint8_t *out, uint8_t addr,
                  uint8_t fn, uint8_t code) {
  out[0] = addr;
  out[1] = (uint8_t)(fn | 0x80u);
  out[2] = code;
  uint16_t c = crc16_modbus(out, 3);
  out[3] = (uint8_t)c;
  out[4] = (uint8_t)(c >> 8);
  return 5;
}

int reply_ok(const uint8_t *frame, int n) {
  if (n < 4) return 0;
  uint16_t got = (uint16_t)frame[n - 2]
               | ((uint16_t)frame[n - 1] << 8);
  return crc16_modbus(frame, n - 2) == got;
}`,
    takeaway: "A good 0x03 reply carries the register bytes. An illegal request comes back with the function's top bit set. A bad CRC is dropped.",
    quiz: {
      q: "What does a function byte of 0x83 mean in a reply?",
      choices: [
        "An exception to function 0x03, read holding registers",
        "A CAN frame with identifier 0x83",
        "The slave wants a faster baud rate"
      ],
      a: 0,
      because: "The top bit marks an exception. The low bits are the function that was refused."
    }
  }
);
