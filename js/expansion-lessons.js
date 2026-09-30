/* Production Embedded Systems expansion track. Existing lessons remain unchanged. */
LESSONS.push({
  "id": "cpp-raii",
  "module": "C++ for embedded",
  "title": "RAII without a desktop-sized runtime",
  "word": {
    "term": "RAII",
    "means": "resource lifetime tied to object lifetime, so construction acquires and destruction releases a resource."
  },
  "steps": [
    {
      "label": "Resource",
      "text": "A resource might be a lock, interrupt mask, peripheral claim, or temporary hardware configuration."
    },
    {
      "label": "Scope",
      "text": "A small object can acquire the resource in its constructor and release it in its destructor."
    },
    {
      "label": "Exception-free",
      "text": "Embedded C++ does not require exceptions or a heap to use the RAII idea. A tiny guard can be deterministic."
    },
    {
      "label": "Review",
      "text": "The destructor must be short and safe in every supported context. Do not hide expensive hardware work in a scope guard."
    },
    {
      "label": "Benefit",
      "text": "Early returns become safer because cleanup follows scope instead of being duplicated across branches."
    }
  ],
  "code": "struct Guard {\n  Guard()  { take(); }\n  ~Guard() { release(); } /* short: release only */\n};\nvoid work() {\n  Guard g;\n  if (stop) return; /* destructor still runs */\n}",
  "takeaway": "RAII is a lifetime discipline, not a demand for exceptions or dynamic allocation.",
  "quiz": {
    "q": "What is the main RAII benefit?",
    "choices": [
      "Cleanup follows object lifetime",
      "It guarantees zero RAM usage",
      "It requires garbage collection"
    ],
    "a": 0,
    "because": "The resource is released when the guard leaves scope."
  }
},
{
  "id": "rtos-task-model",
  "module": "RTOS design",
  "title": "A task is a planned execution context",
  "word": {
    "term": "Task",
    "means": "an independently scheduled execution context with its own stack and scheduling state."
  },
  "steps": [
    {
      "label": "Loop",
      "text": "A bare-metal loop can serve many activities, but each activity must cooperate with the others."
    },
    {
      "label": "Task",
      "text": "An RTOS task owns a stack and a program counter context. The scheduler chooses which ready task runs."
    },
    {
      "label": "Block",
      "text": "A good task sleeps or blocks while waiting for work instead of spinning and burning CPU time."
    },
    {
      "label": "Priority",
      "text": "Priority expresses urgency. It does not mean the highest-priority task should run forever."
    },
    {
      "label": "Design",
      "text": "Keep each task's responsibility narrow and make communication explicit through queues, notifications, events, or shared protected data."
    }
  ],
  "takeaway": "Good RTOS design is mostly about clear ownership, bounded waiting, and explicit communication.",
  "quiz": {
    "q": "What should an idle task normally do?",
    "choices": [
      "Spin at maximum CPU forever",
      "Run when no higher-priority work is ready",
      "Disable interrupts"
    ],
    "a": 1,
    "because": "The scheduler can run idle work when no application task is ready."
  }
},
{
  "id": "rtos-queue",
  "module": "RTOS design",
  "title": "Queues move data between contexts",
  "word": {
    "term": "Queue",
    "means": "a synchronization object that transports discrete items between producers and consumers."
  },
  "steps": [
    {
      "label": "Producer",
      "text": "An ISR or task produces an event or data item."
    },
    {
      "label": "Buffer",
      "text": "The queue stores a bounded number of items. Its capacity is part of the design."
    },
    {
      "label": "Consumer",
      "text": "A task blocks until an item arrives, then processes it outside the ISR."
    },
    {
      "label": "Backpressure",
      "text": "If the queue fills, the system must have a defined policy: block, drop, overwrite, count an error, or reset."
    },
    {
      "label": "Sizing",
      "text": "Size it from the burst. If ten items can arrive in 2 ms and the consumer runs every 5 ms, four slots will overflow. Write down what happens when it does."
    }
  ],
  "takeaway": "A queue is both a data path and a timing contract: its depth and overflow policy matter.",
  "quiz": {
    "q": "Why move substantial work out of an ISR?",
    "choices": [
      "To keep interrupt latency bounded",
      "Because tasks cannot access RAM",
      "Because queues only work in boot ROM"
    ],
    "a": 0,
    "because": "Short ISRs protect responsiveness; the task can do the longer processing."
  }
},
{
  "id": "rtos-priority-inversion",
  "module": "RTOS design",
  "title": "Priority inversion and inheritance",
  "word": {
    "term": "Priority inversion",
    "means": "a high-priority task waits indirectly because a lower-priority task holds a resource."
  },
  "steps": [
    {
      "label": "Three actors",
      "text": "Imagine a low-priority task owns a mutex, a high-priority task needs it, and a medium-priority task keeps running."
    },
    {
      "label": "Wait",
      "text": "The high-priority task blocks on the mutex."
    },
    {
      "label": "Inversion",
      "text": "The medium task can run while the low task is prevented from finishing the critical section."
    },
    {
      "label": "Inheritance",
      "text": "Priority inheritance temporarily raises the low task so it can finish and release the mutex."
    },
    {
      "label": "Design",
      "text": "Inheritance helps, but short critical sections, clear ownership, and avoiding unnecessary shared locks are still better design tools."
    }
  ],
  "takeaway": "Priority inheritance limits one classic inversion pattern; it does not excuse long or tangled critical sections.",
  "quiz": {
    "q": "What triggers the classic inversion?",
    "choices": [
      "A low-priority owner blocks a high-priority waiter",
      "The CPU loses power",
      "A UART changes baud rate"
    ],
    "a": 0,
    "because": "The high-priority task cannot proceed until the lower-priority owner releases the resource."
  }
},
{
  "id": "debug-gdb",
  "module": "Debugging",
  "title": "Debug from evidence, not guesses",
  "word": {
    "term": "Backtrace",
    "means": "a call-chain view showing where the program is currently executing or where it faulted."
  },
  "steps": [
    {
      "label": "Stop",
      "text": "Pause the target at a breakpoint or fault."
    },
    {
      "label": "Inspect",
      "text": "Read registers, the program counter, stack pointer, and relevant memory."
    },
    {
      "label": "Backtrace",
      "text": "Walk the call chain to see how execution reached the current point."
    },
    {
      "label": "Hypothesis",
      "text": "Pick one explanation that fits the evidence, then inspect the exact variable or instruction that would confirm it."
    },
    {
      "label": "Repeat",
      "text": "Change one thing, reproduce, and compare evidence. A debugger is strongest when paired with a reproducible failure."
    }
  ],
  "takeaway": "A debugger should reduce uncertainty step by step; random stepping is not a debugging strategy.",
  "quiz": {
    "q": "What should you inspect first after a hard fault?",
    "choices": [
      "Evidence such as PC, stack frame, and fault status",
      "The color of the PCB",
      "The Git remote URL"
    ],
    "a": 0,
    "because": "The faulting PC and saved context can identify the instruction and path that failed."
  },
  "code": "break main\ncontinue\nbt\ninfo registers\nx/16wx $sp"
},
{
  "id": "debug-hardfault",
  "module": "Debugging",
  "title": "Turn a HardFault into a location",
  "word": {
    "term": "Fault status",
    "means": "CPU registers that explain categories of memory, bus, usage, or escalation faults."
  },
  "steps": [
    {
      "label": "Exception",
      "text": "The core enters HardFault after a severe fault or escalation."
    },
    {
      "label": "Stacked PC",
      "text": "On exception entry, the hardware stacks a return frame containing the PC that was executing."
    },
    {
      "label": "Status",
      "text": "CFSR, HFSR, and related registers can reveal why the fault occurred, subject to the exact Cortex-M implementation."
    },
    {
      "label": "Decode",
      "text": "Map the stacked PC back to source with the ELF, map file, and debugger."
    },
    {
      "label": "Fix",
      "text": "Do not clear the fault and move on. Capture the evidence, reproduce it, and fix the underlying invalid access or execution path."
    }
  ],
  "takeaway": "A HardFault is a symptom. The stacked PC and fault-status evidence can turn it into a concrete instruction to investigate.",
  "quiz": {
    "q": "Which value often points toward the faulting instruction?",
    "choices": [
      "The stacked PC",
      "The UART baud rate",
      "The GPIO output level"
    ],
    "a": 0,
    "because": "The exception stack frame contains the saved program counter."
  }
},
{
  "id": "can-architecture",
  "module": "Automotive CAN",
  "title": "From CAN signal to ECU software",
  "word": {
    "term": "Signal path",
    "means": "the chain from a physical vehicle value to an application variable and back onto the network."
  },
  "steps": [
    {
      "label": "Wire",
      "text": "A CAN frame arrives through the transceiver and CAN controller."
    },
    {
      "label": "Driver",
      "text": "The MCAL CAN driver handles controller hardware. CanIf provides the AUTOSAR abstraction above it."
    },
    {
      "label": "Routing",
      "text": "PduR routes PDUs between communication modules. COM handles signal packing and unpacking."
    },
    {
      "label": "RTE",
      "text": "The application SWC receives a typed signal through an RTE interface."
    },
    {
      "label": "Meaning",
      "text": "The application sees engineering meaning such as vehicle speed rather than raw CAN bits."
    }
  ],
  "takeaway": "A vehicle signal is not just a CAN ID: it crosses hardware, MCAL, communication services, RTE, and application layers.",
  "quiz": {
    "q": "Which AUTOSAR module commonly packs and unpacks application signals into I-PDUs?",
    "choices": [
      "COM",
      "MCAL GPT",
      "NvM"
    ],
    "a": 0,
    "because": "COM manages signal-level communication representation above lower PDU routing layers."
  }
},
{
  "id": "can-signal-layout",
  "module": "Automotive CAN",
  "title": "A signal is more than start bit and length",
  "word": {
    "term": "Signal metadata",
    "means": "the definition needed to turn bits into an engineering value."
  },
  "steps": [
    {
      "label": "Position",
      "text": "Start bit, length, byte order, and signedness define how bits are extracted."
    },
    {
      "label": "Scaling",
      "text": "Physical value equals raw times factor, plus offset. A teaching signal: raw 148, factor 0.5, offset -40, so 148 times 0.5 minus 40 is 34. The same three numbers must be used on every ECU that reads it."
    },
    {
      "label": "Limits",
      "text": "Minimum, maximum, invalid values, timeout behavior, and update rules belong to the signal contract."
    },
    {
      "label": "Network",
      "text": "The signal is associated with a message/frame, CAN identifier, cycle or event behavior, and sender/receiver roles."
    },
    {
      "label": "Software",
      "text": "The same metadata must stay consistent from network description to generated COM configuration and application interface."
    }
  ],
  "code": "/* Teaching sketch. factor 0.5, offset -40, result in tenths. */\nint32_t physical_x10(uint8_t raw) {\n  return (int32_t)raw * 5 - 400; /* 148 -> 340, which is 34.0 */\n}",
  "takeaway": "A signal definition is a contract between the network database, generated configuration, and application.",
  "quiz": {
    "q": "What converts a raw integer into an engineering value?",
    "choices": [
      "Factor and offset",
      "The ECU hostname",
      "The linker stack size"
    ],
    "a": 0,
    "because": "Scaling metadata defines the engineering conversion."
  }
},
{
  "id": "autosar-layers",
  "module": "AUTOSAR Classic",
  "title": "The Classic stack as a vertical path",
  "word": {
    "term": "RTE",
    "means": "the generated communication layer that connects application software components to the configured BSW services and interfaces."
  },
  "steps": [
    {
      "label": "Application",
      "text": "SWCs contain application behavior and communicate through standardized ports and interfaces."
    },
    {
      "label": "RTE",
      "text": "The RTE connects runnables to communication and service access without exposing the application to MCAL details."
    },
    {
      "label": "Services",
      "text": "COM, DCM, DEM, NvM, OS, and other BSW services provide reusable system functions."
    },
    {
      "label": "ECU abstraction",
      "text": "Modules such as CanIf hide controller-specific details from higher layers."
    },
    {
      "label": "MCAL",
      "text": "MCAL is the microcontroller-specific layer that finally configures and drives the hardware peripherals."
    }
  ],
  "takeaway": "AUTOSAR separates application intent from ECU and microcontroller details through defined layers and generated configuration.",
  "quiz": {
    "q": "What is the main architectural purpose of the RTE?",
    "choices": [
      "Connect application SWCs to configured communication/services",
      "Replace the microcontroller",
      "Store CAN frames permanently"
    ],
    "a": 0,
    "because": "The RTE provides the configured interface between application software and the underlying BSW environment."
  }
},
{
  "id": "autosar-runnable",
  "module": "AUTOSAR Classic",
  "title": "A runnable is the unit the RTE schedules",
  "word": {
    "term": "Runnable entity",
    "means": "a piece of SWC behavior triggered by an RTE event."
  },
  "steps": [
    {
      "label": "Trigger",
      "text": "A runnable can be triggered periodically, by data reception, an operation call, or another configured event. A 10 ms timing event is a common one. The OS task it is mapped to decides the real urgency."
    },
    {
      "label": "Context",
      "text": "The runnable executes in a defined OS/task context. Its timing assumptions must match the actual mapping."
    },
    {
      "label": "Read",
      "text": "It obtains inputs through RTE interfaces rather than reaching into communication registers."
    },
    {
      "label": "Compute",
      "text": "The application logic runs using its local state and provided data."
    },
    {
      "label": "Write",
      "text": "Outputs go back through RTE ports, where the configured communication path takes over."
    }
  ],
  "takeaway": "The runnable is where application behavior executes; the RTE event and OS mapping determine when and where it runs.",
  "quiz": {
    "q": "What normally triggers an AUTOSAR runnable?",
    "choices": [
      "A configured RTE event",
      "A direct write to a CAN transceiver pin",
      "A linker symbol"
    ],
    "a": 0,
    "because": "RTE events define the conditions under which a runnable is activated."
  }
},
{
  "id": "autosar-diagnostic-path",
  "module": "AUTOSAR Diagnostics",
  "title": "A UDS request has a long journey",
  "word": {
    "term": "UDS",
    "means": "Unified Diagnostic Services, standardized diagnostic services transported over vehicle communication protocols."
  },
  "steps": [
    {
      "label": "Tester",
      "text": "A diagnostic tester sends a request such as ReadDataByIdentifier."
    },
    {
      "label": "Transport",
      "text": "The request can cross CAN/DoIP and transport-protocol layers depending on the vehicle architecture."
    },
    {
      "label": "DCM",
      "text": "AUTOSAR DCM receives and interprets diagnostic services and manages their configured processing."
    },
    {
      "label": "Application",
      "text": "Configured callbacks or interfaces provide the requested data."
    },
    {
      "label": "Response",
      "text": "DCM constructs the positive or negative response and the communication stack sends it back."
    }
  ],
  "takeaway": "Diagnostics are a configured communication path, not a direct function call from the tester to application code.",
  "quiz": {
    "q": "Which AUTOSAR module manages UDS service processing?",
    "choices": [
      "DCM",
      "PWM",
      "GPT"
    ],
    "a": 0,
    "because": "DCM is the Diagnostic Communication Manager."
  }
},
{
  "id": "autosar-nvm",
  "module": "AUTOSAR Services",
  "title": "Persistent data needs a strategy",
  "word": {
    "term": "NvM",
    "means": "AUTOSAR Non-volatile Memory Manager that manages configured logical blocks over underlying memory abstractions."
  },
  "steps": [
    {
      "label": "RAM copy",
      "text": "Application data normally lives in RAM while the ECU is running."
    },
    {
      "label": "Block",
      "text": "NvM exposes configured logical blocks rather than making application code depend directly on flash addresses."
    },
    {
      "label": "Write",
      "text": "A write request is scheduled through the configured memory stack. Flash programming has timing and endurance costs."
    },
    {
      "label": "Integrity",
      "text": "Configured blocks can use checks such as CRC and redundancy depending on the design."
    },
    {
      "label": "Recovery",
      "text": "On startup, the stack decides whether valid data exists and what default or recovery behavior applies."
    }
  ],
  "takeaway": "Persistent ECU data is a managed service with integrity, timing, and endurance constraints.",
  "quiz": {
    "q": "Why avoid writing flash on every loop iteration?",
    "choices": [
      "Flash has limited endurance and programming takes time",
      "Because RAM cannot store integers",
      "Because CAN IDs change"
    ],
    "a": 0,
    "because": "Persistent memory writes must be controlled for endurance and timing."
  }
},
{
  "id": "autosar-dem",
  "module": "AUTOSAR Diagnostics",
  "title": "DEM turns failures into diagnostic events",
  "word": {
    "term": "Diagnostic Event",
    "means": "a configured software event representing a monitored failure condition."
  },
  "steps": [
    {
      "label": "Monitor",
      "text": "Application or BSW logic detects a condition such as sensor plausibility failure."
    },
    {
      "label": "Report",
      "text": "The component reports a configured event to DEM."
    },
    {
      "label": "Debounce",
      "text": "DEM can apply configured qualification. A counter that needs three failed reports will ignore one glitch. One noisy sample does not immediately become a confirmed fault."
    },
    {
      "label": "Status",
      "text": "The event gets diagnostic status information according to configuration and operation history."
    },
    {
      "label": "DTC",
      "text": "Configured event information can contribute to diagnostic trouble code behavior exposed through DCM."
    }
  ],
  "takeaway": "DEM separates failure detection from the larger diagnostic lifecycle and DTC handling.",
  "quiz": {
    "q": "What is DEM primarily responsible for?",
    "choices": [
      "Managing diagnostic event information",
      "Driving the PWM pin directly",
      "Compiling C code"
    ],
    "a": 0,
    "because": "DEM manages reported diagnostic events and their configured status/lifecycle."
  }
},
{
  "id": "iso26262-flow",
  "module": "Functional Safety",
  "title": "From hazard to safety requirement",
  "word": {
    "term": "HARA",
    "means": "Hazard Analysis and Risk Assessment used to identify hazards and classify safety-related risk."
  },
  "steps": [
    {
      "label": "Item",
      "text": "Start by defining the item, its boundaries, functions, and operating context."
    },
    {
      "label": "Hazard",
      "text": "Identify hazardous malfunctions in relevant operational situations."
    },
    {
      "label": "Risk",
      "text": "Assess severity, exposure, and controllability to derive an ASIL classification where applicable."
    },
    {
      "label": "Safety goal",
      "text": "Define a top-level safety goal that constrains the hazardous behavior."
    },
    {
      "label": "Requirements",
      "text": "Flow the goal into functional and technical safety requirements that can be allocated and verified."
    }
  ],
  "takeaway": "Safety requirements should be traceable back to the hazard and forward into implementation and verification.",
  "quiz": {
    "q": "What does HARA help derive?",
    "choices": [
      "Safety-related risk classification and safety goals",
      "The ECU MAC address",
      "The C compiler version"
    ],
    "a": 0,
    "because": "HARA connects hazardous malfunctions and operating situations to safety-related goals and classifications."
  }
},
{
  "id": "asil-decomposition",
  "module": "Functional Safety",
  "title": "ASIL is a development constraint, not a sticker",
  "word": {
    "term": "ASIL",
    "means": "Automotive Safety Integrity Level, a classification used by ISO 26262 to determine rigor and safety-related requirements."
  },
  "steps": [
    {
      "label": "Classification",
      "text": "ASIL is derived from hazard risk assessment rather than chosen because a component sounds important."
    },
    {
      "label": "Scope",
      "text": "A safety requirement can carry an ASIL, and decomposition can be applied under defined conditions."
    },
    {
      "label": "Independence",
      "text": "Decomposition relies on sufficient independence and architectural assumptions. It is not simply splitting one requirement into two identical pieces."
    },
    {
      "label": "Mechanisms",
      "text": "Diagnostics, monitoring, redundancy, and fault handling can contribute to the safety architecture."
    },
    {
      "label": "Evidence",
      "text": "The project still needs analysis, verification, and work products appropriate to the assigned safety requirements."
    }
  ],
  "takeaway": "ASIL communicates required safety rigor and constraints; it does not by itself prove that an ECU is safe.",
  "quiz": {
    "q": "What determines an ASIL?",
    "choices": [
      "The safety risk assessment and applicable ISO 26262 process",
      "The software team's preferred color",
      "The CAN baud rate"
    ],
    "a": 0,
    "because": "ASIL classification comes from the safety analysis and defined ISO 26262 methods."
  }
},
{
  "id": "fmea-fta",
  "module": "Functional Safety",
  "title": "FMEA and FTA ask different questions",
  "word": {
    "term": "FTA",
    "means": "Fault Tree Analysis, a top-down analysis of combinations of faults that can lead to an undesired top event."
  },
  "steps": [
    {
      "label": "FMEA",
      "text": "Failure Mode and Effects Analysis starts from component or function failure modes and examines their effects."
    },
    {
      "label": "FTA",
      "text": "Fault tree analysis starts from a top event and works downward toward contributing causes."
    },
    {
      "label": "Example",
      "text": "Top event: unintended actuator activation. Work backward through logic, power, communication, and hardware causes."
    },
    {
      "label": "Use",
      "text": "The analyses expose different parts of the risk picture and can support safety mechanism design."
    },
    {
      "label": "Evidence",
      "text": "Keep assumptions and boundaries explicit. A safety analysis is only as useful as the system model behind it."
    }
  ],
  "takeaway": "FMEA is commonly bottom-up; FTA is commonly top-down. They complement rather than replace each other.",
  "quiz": {
    "q": "What is the usual direction of FTA?",
    "choices": [
      "Top event toward contributing causes",
      "Source code toward variable names",
      "CAN ID toward baud rate"
    ],
    "a": 0,
    "because": "FTA begins with an undesired top event and decomposes its causes."
  }
},
{
  "id": "safety-mechanisms",
  "module": "Functional Safety",
  "title": "A safety mechanism must detect something useful",
  "word": {
    "term": "Diagnostic coverage",
    "means": "the degree to which relevant faults are detected by the implemented diagnostic mechanisms."
  },
  "steps": [
    {
      "label": "Fault",
      "text": "Imagine a failure mode such as a stuck sensor value or corrupted communication."
    },
    {
      "label": "Mechanism",
      "text": "A range check, timeout, watchdog, CRC, plausibility check, or redundant measurement can detect some faults."
    },
    {
      "label": "Reaction",
      "text": "Detection is only useful if the system enters a defined safe or degraded state."
    },
    {
      "label": "Coverage",
      "text": "The mechanism does not automatically detect every fault. Analysis must define what fault set it covers."
    },
    {
      "label": "Evidence",
      "text": "Test injection and analysis provide evidence that the mechanism behaves as designed."
    }
  ],
  "takeaway": "A safety mechanism is a chain: fault model, detection, decision, reaction, and evidence.",
  "quiz": {
    "q": "Why is a watchdog alone not a complete safety argument?",
    "choices": [
      "It detects only certain failure behaviors and needs a defined reaction",
      "It cannot reset a CPU",
      "It changes CAN IDs"
    ],
    "a": 0,
    "because": "A watchdog covers specific classes of failures; the safety concept must define what it detects and what follows."
  }
},
{
  "id": "iso21434-tara",
  "module": "Automotive Cybersecurity",
  "title": "TARA starts with the asset",
  "word": {
    "term": "TARA",
    "means": "Threat Analysis and Risk Assessment used to identify cybersecurity risks and derive security goals and requirements."
  },
  "steps": [
    {
      "label": "Asset",
      "text": "Identify what needs protection: commands, keys, vehicle data, diagnostics, or firmware."
    },
    {
      "label": "Threat",
      "text": "Name the unwanted action against that asset. For a diagnostic command that moves an actuator, the threat is that someone sends it with no authority. The goal comes from that statement."
    },
    {
      "label": "Impact",
      "text": "Consider the consequences if the attack succeeds."
    },
    {
      "label": "Risk",
      "text": "Assess attack feasibility and impact using the project's defined method."
    },
    {
      "label": "Goal",
      "text": "Derive cybersecurity goals and requirements such as authentication, integrity, access control, or secure update."
    }
  ],
  "takeaway": "Cybersecurity engineering starts from assets and attack paths, then derives protections.",
  "quiz": {
    "q": "What comes before choosing a security mechanism?",
    "choices": [
      "Understanding the asset and threat",
      "Picking an encryption library at random",
      "Changing the CAN bitrate"
    ],
    "a": 0,
    "because": "Security controls should address identified threats and assets."
  }
},
{
  "id": "secure-boot",
  "module": "Automotive Cybersecurity",
  "title": "Secure boot establishes a trust chain",
  "word": {
    "term": "Chain of trust",
    "means": "a sequence where each trusted stage verifies the authenticity and integrity of the next stage."
  },
  "steps": [
    {
      "label": "Root",
      "text": "A hardware-protected root of trust anchors the first verification decision."
    },
    {
      "label": "Verify",
      "text": "Boot code verifies the next image before transferring control."
    },
    {
      "label": "Continue",
      "text": "The next trusted stage verifies later components such as the application image."
    },
    {
      "label": "Reject",
      "text": "An invalid signature or image integrity failure must lead to a defined recovery or refusal path."
    },
    {
      "label": "Update",
      "text": "Key provisioning, rollback policy, recovery images, and lifecycle states are part of the real design."
    }
  ],
  "takeaway": "Secure boot is not just a signature check; it is a lifecycle and trust-chain design.",
  "quiz": {
    "q": "What is the key purpose of secure boot?",
    "choices": [
      "Prevent execution of unauthorized or invalid software",
      "Make CAN faster",
      "Increase SRAM size"
    ],
    "a": 0,
    "because": "The trust chain controls which software is allowed to execute."
  }
},
{
  "id": "secoc",
  "module": "Automotive Cybersecurity",
  "title": "Integrity on a vehicle message",
  "word": {
    "term": "SecOC",
    "means": "AUTOSAR Secure Onboard Communication, providing authenticity and freshness protection for configured PDUs."
  },
  "steps": [
    {
      "label": "Message",
      "text": "A sender transmits a PDU carrying application data."
    },
    {
      "label": "Authenticator",
      "text": "A configured authenticator such as a MAC protects integrity and authenticity."
    },
    {
      "label": "Freshness",
      "text": "A freshness value helps prevent an attacker from replaying an old valid message."
    },
    {
      "label": "Receiver",
      "text": "The receiver validates the authenticator and freshness before accepting the protected data."
    },
    {
      "label": "Key",
      "text": "Key management and lifecycle are separate engineering concerns; the MAC algorithm alone is not a complete security architecture."
    }
  ],
  "takeaway": "Message authentication needs both authenticity/integrity and replay protection, plus sound key management.",
  "quiz": {
    "q": "Why is freshness important?",
    "choices": [
      "It helps reject replayed old messages",
      "It increases CAN payload length automatically",
      "It replaces all keys"
    ],
    "a": 0,
    "because": "A previously valid message should not remain valid forever."
  }
},
{
  "id": "embedded-build",
  "module": "Build and integration",
  "title": "Compiler, linker, image: three different jobs",
  "word": {
    "term": "Linker",
    "means": "the build-stage program that combines object files and places sections at final addresses."
  },
  "steps": [
    {
      "label": "Compile",
      "text": "Each source file becomes an object file containing machine code, data, symbols, and relocation information."
    },
    {
      "label": "Link",
      "text": "The linker combines objects and libraries and places sections according to the linker script."
    },
    {
      "label": "ELF",
      "text": "The ELF contains rich debug and symbol information useful to tools."
    },
    {
      "label": "Image",
      "text": "A binary or hex image is a deployment representation derived from the build output."
    },
    {
      "label": "Evidence",
      "text": "Map files, compiler flags, linker scripts, and image hashes should be reproducible build artifacts."
    }
  ],
  "takeaway": "Compilation creates object files; linking creates the program layout; deployment images are derived outputs.",
  "quiz": {
    "q": "Which stage decides final memory placement?",
    "choices": [
      "Linking",
      "Typing the source",
      "Running the board"
    ],
    "a": 0,
    "because": "The linker and its script determine the final placement of sections."
  }
},
{
  "id": "linker-script",
  "module": "Build and integration",
  "title": "The linker script is the memory contract",
  "word": {
    "term": "Linker script",
    "means": "rules describing memory regions and how program sections are placed into them."
  },
  "steps": [
    {
      "label": "Regions",
      "text": "MEMORY defines address ranges such as FLASH and RAM."
    },
    {
      "label": "Sections",
      "text": ".text, .rodata, .data, .bss, stack, and special sections are placed into those regions."
    },
    {
      "label": "Load vs run",
      "text": "Initialized data may have a load address in flash and a run address in RAM; startup code copies it."
    },
    {
      "label": "Overflow",
      "text": "A region overflow is a design problem, not a warning to ignore."
    },
    {
      "label": "Review",
      "text": "Use the map file to inspect the largest sections and unexpected pulls from libraries."
    }
  ],
  "takeaway": "The linker script expresses the physical memory contract between software and the MCU.",
  "quiz": {
    "q": "Why can .data have both a flash location and a RAM location?",
    "choices": [
      "Initial values are stored in flash and copied to RAM at startup",
      "RAM is read-only",
      "The CPU has two program counters"
    ],
    "a": 0,
    "because": "The initial image is in non-volatile memory; runtime writable data belongs in RAM."
  }
},
{
  "id": "boot-startup",
  "module": "Boot and startup",
  "title": "Reset to main is a real sequence",
  "word": {
    "term": "Reset handler",
    "means": "the early software entry point reached from the vector table after reset."
  },
  "steps": [
    {
      "label": "Vector",
      "text": "The vector table provides the initial stack pointer and reset handler address."
    },
    {
      "label": "Clock",
      "text": "Startup configures clocks and low-level hardware according to the MCU and board design."
    },
    {
      "label": "Data",
      "text": "Initialized .data is copied to RAM and .bss is cleared."
    },
    {
      "label": "Runtime",
      "text": "C/C++ runtime initialization prepares static objects and libraries as configured."
    },
    {
      "label": "Main",
      "text": "Only after required startup does control reach main or the RTOS/application entry."
    }
  ],
  "takeaway": "main is not the beginning of the machine; it is the point reached after hardware and runtime startup work.",
  "quiz": {
    "q": "What does the first vector-table word normally provide?",
    "choices": [
      "The initial stack pointer",
      "The CAN identifier",
      "The heap size"
    ],
    "a": 0,
    "because": "The initial stack pointer is followed by the reset handler address in the vector table."
  }
},
{
  "id": "watchdog-design",
  "module": "Reliability",
  "title": "A watchdog needs a proof of health",
  "word": {
    "term": "Watchdog",
    "means": "a timer that forces a defined recovery action when software fails to service it correctly."
  },
  "steps": [
    {
      "label": "Failure",
      "text": "A deadlock, runaway loop, clock failure, or blocked task can stop normal progress."
    },
    {
      "label": "Timeout",
      "text": "If the watchdog is not serviced inside its window, for example 100 ms, it triggers its configured reset or recovery action."
    },
    {
      "label": "Wrong pattern",
      "text": "Blindly kicking the watchdog from one fast timer can hide a dead application."
    },
    {
      "label": "Health",
      "text": "A supervisor should service the watchdog only after required tasks have demonstrated progress."
    },
    {
      "label": "Recovery",
      "text": "After reset, record the reset cause and preserve enough evidence to diagnose repeated failures."
    }
  ],
  "code": "uint8_t sense_ok, control_ok;\n\nvoid supervisor(void) {\n  if (sense_ok && control_ok) kick_watchdog();\n  sense_ok = 0;\n  control_ok = 0;\n}",
  "takeaway": "The watchdog should prove system health, not merely prove that one timer interrupt still runs.",
  "quiz": {
    "q": "What is a common watchdog design mistake?",
    "choices": [
      "Kicking it unconditionally from a task that can survive while the system is unhealthy",
      "Recording reset cause",
      "Using a defined timeout"
    ],
    "a": 0,
    "because": "A blind kick can mask failures elsewhere in the system."
  }
},
{
  "id": "brownout-reset",
  "module": "Reliability",
  "title": "Power faults are software events too",
  "word": {
    "term": "Brownout",
    "means": "a supply voltage condition below a defined operating threshold that can make digital behavior unreliable."
  },
  "steps": [
    {
      "label": "Supply",
      "text": "MCUs have voltage ranges and reset behavior specified for defined conditions."
    },
    {
      "label": "Drop",
      "text": "A transient load or weak supply can pull voltage down."
    },
    {
      "label": "Protection",
      "text": "Brownout detection or reset circuitry can hold the MCU in a defined state."
    },
    {
      "label": "Data",
      "text": "A power interruption can leave partially written non-volatile data if the design has no integrity strategy."
    },
    {
      "label": "Test",
      "text": "Power-fail testing should be deliberate: vary voltage and timing and inspect reset reason and persistent data recovery."
    }
  ],
  "takeaway": "Power integrity and software recovery meet at reset behavior and persistent-data integrity.",
  "quiz": {
    "q": "Why record reset cause?",
    "choices": [
      "To distinguish power, watchdog, software, and other reset paths during diagnosis",
      "To increase CPU frequency",
      "To disable brownout"
    ],
    "a": 0,
    "because": "Reset-cause evidence is valuable when the failure is intermittent."
  }
},
{
  "id": "unit-testing-embedded",
  "module": "Verification",
  "title": "Test logic without the hardware first",
  "word": {
    "term": "Host-based test",
    "means": "a test that runs target-independent logic on a development machine."
  },
  "steps": [
    {
      "label": "Pure logic",
      "text": "Calculations, state machines, scaling, parsers, and protocol logic can often be tested without an MCU."
    },
    {
      "label": "Boundary",
      "text": "Feed minimum, maximum, invalid, timeout, and overflow cases."
    },
    {
      "label": "Mock",
      "text": "Replace hardware-facing interfaces with controlled test doubles."
    },
    {
      "label": "Target",
      "text": "Use hardware-in-the-loop for timing, registers, interrupts, electrical behavior, and integration that host tests cannot represent."
    },
    {
      "label": "Evidence",
      "text": "Keep tests deterministic and make failures easy to reproduce."
    }
  ],
  "code": "/* Host test. No registers inside. */\nint celsius_from_raw(uint8_t raw) {\n  return (int)raw * 5 / 10 - 40; /* 148 -> 34 */\n}",
  "takeaway": "Separate pure logic from hardware access so more behavior can be tested quickly and deterministically.",
  "quiz": {
    "q": "What is a good candidate for host-based testing?",
    "choices": [
      "A pure signal-scaling function",
      "A GPIO voltage threshold on a specific PCB",
      "A silicon reset circuit"
    ],
    "a": 0,
    "because": "Pure computation is independent of the MCU and is easy to test on a host."
  }
},
{
  "id": "integration-traceability",
  "module": "Engineering process",
  "title": "Requirement to evidence is a chain",
  "word": {
    "term": "Traceability",
    "means": "the ability to connect a requirement to implementation, verification, and resulting evidence."
  },
  "steps": [
    {
      "label": "Requirement",
      "text": "Start with a precise statement including conditions, limits, and expected behavior."
    },
    {
      "label": "Design",
      "text": "Link it to architecture, interfaces, and components."
    },
    {
      "label": "Implementation",
      "text": "Identify the code/configuration that realizes it."
    },
    {
      "label": "Verification",
      "text": "Link unit, integration, system, or review evidence to the requirement."
    },
    {
      "label": "Change",
      "text": "When the requirement changes, the trace chain exposes the affected artifacts."
    }
  ],
  "takeaway": "Traceability is useful when it answers a practical question: what changed, what implements it, and what proves it?",
  "quiz": {
    "q": "What does end-to-end traceability connect?",
    "choices": [
      "Requirement through implementation to verification evidence",
      "Only two source files",
      "A CAN ID to a Git password"
    ],
    "a": 0,
    "because": "The useful chain links intent, realization, and evidence."
  }
},
{
  "id": "git-embedded-workflow",
  "module": "Engineering process",
  "title": "Git history should explain engineering intent",
  "word": {
    "term": "Commit",
    "means": "a recorded snapshot of repository changes with metadata and a message describing the change."
  },
  "steps": [
    {
      "label": "Small change",
      "text": "Keep a commit focused enough that a reviewer can understand the intent."
    },
    {
      "label": "Evidence",
      "text": "Include relevant test results or issue references when the project process expects them."
    },
    {
      "label": "Review",
      "text": "A reviewer should be able to see what behavior changed and why."
    },
    {
      "label": "Revert",
      "text": "A focused commit is easier to revert when integration exposes a problem."
    },
    {
      "label": "Release",
      "text": "Tags, branches, generated artifacts, and build metadata should support reproducing a released image."
    }
  ],
  "takeaway": "Good Git history is an engineering aid: it preserves intent, review context, and recovery options.",
  "quiz": {
    "q": "Why keep commits focused?",
    "choices": [
      "They are easier to review, bisect, and revert",
      "Git requires exactly one file per commit",
      "It increases RAM"
    ],
    "a": 0,
    "because": "Focused changes make history more useful during debugging and release work."
  }
}
);
