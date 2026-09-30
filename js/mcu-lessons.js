/* MCU fundamentals: 8051 → ARM Cortex-M */
const MCU_LESSONS = [
{
  "id": "mcu-01",
  "module": "8051 basics",
  "title": "The 8051 mental model",
  "word": {
    "term": "Architecture, registers, memory and peripherals",
    "means": "Learn why the classic 8051 is useful for understanding MCU fundamentals."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Learn why the classic 8051 is useful for understanding MCU fundamentals."
    },
    {
      "label": "Architecture",
      "text": "Architecture, registers, memory and peripherals is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Learn why the classic 8051 is useful for understanding MCU fundamentals.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "8051"
},
{
  "id": "mcu-02",
  "module": "8051 basics",
  "title": "8051 architecture",
  "word": {
    "term": "CPU, SFRs, program memory, data memory and I/O",
    "means": "Build the basic 8051 block diagram in your head."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Build the basic 8051 block diagram in your head."
    },
    {
      "label": "Architecture",
      "text": "CPU, SFRs, program memory, data memory and I/O is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Build the basic 8051 block diagram in your head.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "8051"
},
{
  "id": "mcu-03",
  "module": "8051 basics",
  "title": "8051 registers",
  "word": {
    "term": "Accumulator, B register, PSW, SP and DPTR",
    "means": "Understand the registers used by real 8051 code."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Understand the registers used by real 8051 code."
    },
    {
      "label": "Architecture",
      "text": "Accumulator, B register, PSW, SP and DPTR is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Understand the registers used by real 8051 code.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "8051"
},
{
  "id": "mcu-04",
  "module": "8051 memory",
  "title": "8051 memory organization",
  "word": {
    "term": "Code, internal RAM, SFR space and external memory",
    "means": "Separate address spaces and understand why they matter."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Separate address spaces and understand why they matter."
    },
    {
      "label": "Architecture",
      "text": "Code, internal RAM, SFR space and external memory is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Separate address spaces and understand why they matter.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "8051"
},
{
  "id": "mcu-05",
  "module": "8051 memory",
  "title": "8051 stack",
  "word": {
    "term": "Stack pointer, PUSH, POP and call/return",
    "means": "Trace a subroutine and interrupt through the 8051 stack."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Trace a subroutine and interrupt through the 8051 stack."
    },
    {
      "label": "Architecture",
      "text": "Stack pointer, PUSH, POP and call/return is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Trace a subroutine and interrupt through the 8051 stack.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "8051"
},
{
  "id": "mcu-06",
  "module": "8051 GPIO",
  "title": "8051 ports",
  "word": {
    "term": "Quasi-bidirectional I/O and port latches",
    "means": "Understand the unusual but important 8051 port model."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Understand the unusual but important 8051 port model."
    },
    {
      "label": "Architecture",
      "text": "Quasi-bidirectional I/O and port latches is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Understand the unusual but important 8051 port model.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "8051"
},
{
  "id": "mcu-07",
  "module": "8051 timers",
  "title": "8051 timers and counters",
  "word": {
    "term": "Timer modes, overflow and event counting",
    "means": "Connect timer configuration to periodic software behavior."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Connect timer configuration to periodic software behavior."
    },
    {
      "label": "Architecture",
      "text": "Timer modes, overflow and event counting is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Connect timer configuration to periodic software behavior.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "8051"
},
{
  "id": "mcu-08",
  "module": "8051 interrupts",
  "title": "8051 interrupt system",
  "word": {
    "term": "Interrupt sources, vectors, priority and ISR flow",
    "means": "Learn the classic interrupt model before moving to NVIC."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Learn the classic interrupt model before moving to NVIC."
    },
    {
      "label": "Architecture",
      "text": "Interrupt sources, vectors, priority and ISR flow is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Learn the classic interrupt model before moving to NVIC.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "8051"
},
{
  "id": "mcu-09",
  "module": "8051 serial",
  "title": "8051 UART",
  "word": {
    "term": "Serial modes, baud generation and transmit/receive flow",
    "means": "Understand UART from the register level."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Understand UART from the register level."
    },
    {
      "label": "Architecture",
      "text": "Serial modes, baud generation and transmit/receive flow is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Understand UART from the register level.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "8051"
},
{
  "id": "mcu-10",
  "module": "8051 coding",
  "title": "8051 C vs bare metal",
  "word": {
    "term": "SFR access, bit operations and ISR structure",
    "means": "See how C maps onto an 8-bit MCU."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "See how C maps onto an 8-bit MCU."
    },
    {
      "label": "Architecture",
      "text": "SFR access, bit operations and ISR structure is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "See how C maps onto an 8-bit MCU.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "8051"
},
{
  "id": "mcu-11",
  "module": "ARM Cortex-M",
  "title": "Why Cortex-M",
  "word": {
    "term": "Modern 32-bit MCU architecture and the embedded use case",
    "means": "Understand why Cortex-M is a natural next step from 8051."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Understand why Cortex-M is a natural next step from 8051."
    },
    {
      "label": "Architecture",
      "text": "Modern 32-bit MCU architecture and the embedded use case is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Understand why Cortex-M is a natural next step from 8051.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "ARM"
},
{
  "id": "mcu-12",
  "module": "ARM Cortex-M",
  "title": "Cortex-M registers",
  "word": {
    "term": "R0-R15, xPSR, MSP and PSP",
    "means": "Build the mental model for a 32-bit ARM core."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Build the mental model for a 32-bit ARM core."
    },
    {
      "label": "Architecture",
      "text": "R0-R15, xPSR, MSP and PSP is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Build the mental model for a 32-bit ARM core.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "ARM"
},
{
  "id": "mcu-13",
  "module": "ARM Cortex-M",
  "title": "Cortex-M exception model",
  "word": {
    "term": "Reset, faults, interrupts and exception return",
    "means": "Understand the foundation beneath an RTOS."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Understand the foundation beneath an RTOS."
    },
    {
      "label": "Architecture",
      "text": "Reset, faults, interrupts and exception return is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Understand the foundation beneath an RTOS.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "ARM"
},
{
  "id": "mcu-14",
  "module": "ARM Cortex-M",
  "title": "NVIC",
  "word": {
    "term": "Interrupt enable, priority and nesting",
    "means": "Compare NVIC concepts with the 8051 interrupt controller."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Compare NVIC concepts with the 8051 interrupt controller."
    },
    {
      "label": "Architecture",
      "text": "Interrupt enable, priority and nesting is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Compare NVIC concepts with the 8051 interrupt controller.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "ARM"
},
{
  "id": "mcu-15",
  "module": "ARM Cortex-M",
  "title": "SysTick",
  "word": {
    "term": "Periodic tick and timebase",
    "means": "See how a simple timer becomes an RTOS timebase."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "See how a simple timer becomes an RTOS timebase."
    },
    {
      "label": "Architecture",
      "text": "Periodic tick and timebase is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "See how a simple timer becomes an RTOS timebase.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "ARM"
},
{
  "id": "mcu-16",
  "module": "ARM Cortex-M",
  "title": "Memory-mapped peripherals",
  "word": {
    "term": "Addressing GPIO, timers, UART and control registers",
    "means": "Connect C pointers and MCU peripherals."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Connect C pointers and MCU peripherals."
    },
    {
      "label": "Architecture",
      "text": "Addressing GPIO, timers, UART and control registers is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Connect C pointers and MCU peripherals.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "ARM"
},
{
  "id": "mcu-17",
  "module": "ARM Cortex-M",
  "title": "DMA",
  "word": {
    "term": "Peripheral-to-memory transfers without CPU copying",
    "means": "Understand why DMA changes embedded architecture."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Understand why DMA changes embedded architecture."
    },
    {
      "label": "Architecture",
      "text": "Peripheral-to-memory transfers without CPU copying is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Understand why DMA changes embedded architecture.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "ARM"
},
{
  "id": "mcu-18",
  "module": "ARM Cortex-M",
  "title": "MPU and privilege",
  "word": {
    "term": "Memory protection and execution domains",
    "means": "Learn the Cortex-M mechanisms used for isolation."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Learn the Cortex-M mechanisms used for isolation."
    },
    {
      "label": "Architecture",
      "text": "Memory protection and execution domains is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Learn the Cortex-M mechanisms used for isolation.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "ARM"
},
{
  "id": "mcu-19",
  "module": "ARM startup",
  "title": "Vector table and startup",
  "word": {
    "term": "Reset handler, stack initialization and runtime startup",
    "means": "Trace reset to main on a modern Cortex-M."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Trace reset to main on a modern Cortex-M."
    },
    {
      "label": "Architecture",
      "text": "Reset handler, stack initialization and runtime startup is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Trace reset to main on a modern Cortex-M.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "ARM"
},
{
  "id": "mcu-20",
  "module": "ARM debugging",
  "title": "SWD and GDB",
  "word": {
    "term": "Breakpoints, registers, memory and fault investigation",
    "means": "Use the debugger as an engineering instrument."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Use the debugger as an engineering instrument."
    },
    {
      "label": "Architecture",
      "text": "Breakpoints, registers, memory and fault investigation is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Use the debugger as an engineering instrument.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "ARM"
},
{
  "id": "mcu-21",
  "module": "ARM RTOS",
  "title": "Context switching",
  "word": {
    "term": "Saved registers, stacks and scheduler handoff",
    "means": "Connect Cortex-M exceptions to RTOS behavior."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Connect Cortex-M exceptions to RTOS behavior."
    },
    {
      "label": "Architecture",
      "text": "Saved registers, stacks and scheduler handoff is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Connect Cortex-M exceptions to RTOS behavior.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "ARM"
},
{
  "id": "mcu-22",
  "module": "ARM performance",
  "title": "Clock and power",
  "word": {
    "term": "Clock tree, prescalers, sleep and wakeup",
    "means": "Understand the tradeoff between performance and power."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Understand the tradeoff between performance and power."
    },
    {
      "label": "Architecture",
      "text": "Clock tree, prescalers, sleep and wakeup is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Understand the tradeoff between performance and power.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "ARM"
},
{
  "id": "mcu-23",
  "module": "ARM comparison",
  "title": "8051 to Cortex-M",
  "word": {
    "term": "Architecture, memory, interrupts, tools and software model",
    "means": "Use the comparison to transfer your fundamentals rather than memorize two unrelated MCUs."
  },
  "steps": [
    {
      "label": "Concept",
      "text": "Use the comparison to transfer your fundamentals rather than memorize two unrelated MCUs."
    },
    {
      "label": "Architecture",
      "text": "Architecture, memory, interrupts, tools and software model is examined at the hardware/software boundary rather than as a list of registers."
    },
    {
      "label": "Trace",
      "text": "Follow one event from hardware state to CPU instruction and then to application behavior."
    },
    {
      "label": "Compare",
      "text": "Ask what is handled by hardware, what is handled by startup/driver code, and what remains application responsibility."
    },
    {
      "label": "Practice",
      "text": "Use the debugger, datasheet and reference manual as evidence when exact device behavior matters."
    }
  ],
  "takeaway": "Use the comparison to transfer your fundamentals rather than memorize two unrelated MCUs.",
  "quiz": {
    "q": "What is the most useful learning habit for MCU architecture?",
    "choices": [
      "Memorize register names without context",
      "Trace hardware → software → application behavior",
      "Ignore the reference manual"
    ],
    "a": 1,
    "because": "Architecture becomes reusable knowledge when you can trace behavior across the hardware/software boundary."
  },
  "track": "ARM"
}
];
