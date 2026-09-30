/* Embedded C lessons for the C tab. */
C_LESSONS.push({
  "id": "c-memory-model",
  "module": "C for embedded",
  "title": "Where a C variable really lives",
  "word": {
    "term": "Storage duration",
    "means": "how long an object exists and where the linker places it."
  },
  "steps": [
    {
      "label": "Source",
      "text": "A C variable is not just a name. The compiler gives it a size, lifetime, alignment, and eventually an address."
    },
    {
      "label": "Stack",
      "text": "A local automatic variable normally lives on the current stack. Its address can change every time a function is entered."
    },
    {
      "label": "Static",
      "text": "A static or global object exists for the whole program. Initialized data normally lands in .data; zero-initialized data normally lands in .bss."
    },
    {
      "label": "Flash",
      "text": "A const table can often stay in read-only flash. On a microcontroller, that can save scarce SRAM."
    },
    {
      "label": "Map",
      "text": "The linker script decides the final regions. The map file is the evidence: use it when memory behavior matters."
    }
  ],
  "code": "/* Teaching sketch. The name is not the place. */\nvoid sense(void) {\n  int n;                  /* stack: a new address each call */\n  static int count = 3;  /* .data: lives for the whole program */\n}\nconst uint16_t table[4] = { 0, 10, 20, 30 }; /* can stay in flash */",
  "takeaway": "Think of C storage as a contract between source code, compiler, linker, and memory map.",
  "quiz": {
    "q": "Where does a normal local variable usually live? ",
    "choices": [
      "Flash forever",
      "The current stack",
      "The CAN bus"
    ],
    "a": 1,
    "because": "Automatic locals normally use the current stack unless optimization or special storage changes the implementation."
  }
},
{
  "id": "c-volatile",
  "module": "C for embedded",
  "title": "volatile is not a thread lock",
  "word": {
    "term": "volatile",
    "means": "tells the compiler that an access must be observed as an actual memory access; it does not make compound operations atomic."
  },
  "steps": [
    {
      "label": "Hardware",
      "text": "A memory-mapped status register can change without the C code writing it. The compiler must not assume its value stays unchanged."
    },
    {
      "label": "ISR",
      "text": "An ISR and main code can also share a volatile flag. Volatile makes the reads and writes visible to generated code."
    },
    {
      "label": "Not atomic",
      "text": "x++ is still a read-modify-write sequence. Volatile does not prevent an interrupt or another core from changing x between those operations."
    },
    {
      "label": "Barrier",
      "text": "Ordering and visibility across cores or peripherals may require atomic operations, compiler barriers, CPU barriers, or peripheral-specific rules."
    },
    {
      "label": "Rule",
      "text": "Use volatile for its actual purpose: externally changing memory. Do not use it as a substitute for synchronization."
    }
  ],
  "code": "volatile uint8_t flag; /* ISR writes it, main reads it */\n\nvoid isr(void) { flag = 1; }\n\n/* flag++ is still read, add, write.\n   volatile does not lock those three steps. */",
  "takeaway": "volatile controls compiler assumptions; it does not provide mutual exclusion or atomicity.",
  "quiz": {
    "q": "What does volatile NOT guarantee?",
    "choices": [
      "That a read is emitted",
      "Mutual exclusion",
      "That a hardware register can change"
    ],
    "a": 1,
    "because": "Synchronization requires stronger mechanisms than volatile alone."
  }
},
{
  "id": "c-pointer",
  "module": "C for embedded",
  "title": "Pointers are addresses with a type",
  "word": {
    "term": "Pointer",
    "means": "a value used to refer to an object or function at an address."
  },
  "steps": [
    {
      "label": "Address",
      "text": "&x produces the address of x. A pointer stores that address and carries a type describing how the program interprets the target."
    },
    {
      "label": "Dereference",
      "text": "*p means access the object reached by p. If p is wrong, the CPU may read the wrong peripheral or fault."
    },
    {
      "label": "Register",
      "text": "A memory-mapped register can be represented by a volatile pointer to a fixed address."
    },
    {
      "label": "Arithmetic",
      "text": "Pointer arithmetic moves in units of the pointed-to type. p+1 is not necessarily one byte later."
    },
    {
      "label": "Safety",
      "text": "A pointer has no automatic proof that its target is valid. Bounds, lifetime, alignment, and ownership remain the programmer's job."
    }
  ],
  "code": "int32_t x;\nint32_t *p = &x;\nint32_t *next = p + 1; /* four bytes later, not one */\n\nvolatile uint32_t *reg =\n  (volatile uint32_t *)0x40000000u;",
  "takeaway": "In embedded C, a pointer is powerful because hardware is addressable; that power makes invalid addresses expensive.",
  "quiz": {
    "q": "What does p + 1 mean for an int32_t pointer?",
    "choices": [
      "One byte later",
      "One int32_t element later",
      "The next CPU instruction"
    ],
    "a": 1,
    "because": "Pointer arithmetic advances by sizeof(*p)."
  }
},
{
  "id": "c-bitfields",
  "module": "C for embedded",
  "title": "Bit masks beat mystery numbers",
  "word": {
    "term": "Bit mask",
    "means": "a value used to select, set, clear, or test specific bits."
  },
  "steps": [
    {
      "label": "Select",
      "text": "A mask such as 1u << 3 selects bit 3. AND with the mask tests whether that bit is set."
    },
    {
      "label": "Set",
      "text": "reg |= mask sets selected bits without changing the others."
    },
    {
      "label": "Clear",
      "text": "reg &= ~mask clears selected bits."
    },
    {
      "label": "Toggle",
      "text": "reg ^= mask flips selected bits, but only use this when toggling is actually the desired hardware operation."
    },
    {
      "label": "Register",
      "text": "For hardware registers, follow the reference manual's read/write behavior. Some status bits clear by writing one; a generic read-modify-write may be unsafe."
    }
  ],
  "takeaway": "Bit operations are simple; the register's documented side effects determine whether they are safe.",
  "quiz": {
    "q": "Which expression tests bit 3?",
    "choices": [
      "reg AND a mask that has only bit 3 set",
      "reg OR a mask that has only bit 3 set",
      "reg equal to 3"
    ],
    "a": 0,
    "because": "AND with a one-bit mask isolates the selected bit."
  },
  "code": "#define LED_EN   (1u << 3)\nreg |= LED_EN;          /* set */\nreg &= ~LED_EN;        /* clear */\nif (reg & LED_EN) { }  /* test */"
},
{
  "id": "c-function-pointers",
  "module": "C for embedded",
  "title": "Why embedded drivers use callbacks",
  "word": {
    "term": "Callback",
    "means": "a function address stored so another component can call application code later."
  },
  "steps": [
    {
      "label": "Interface",
      "text": "A driver often needs to notify upper software when a transfer completes. It should not know the application's whole design."
    },
    {
      "label": "Pointer",
      "text": "A function pointer stores the callback address."
    },
    {
      "label": "Registration",
      "text": "The application registers its function with the driver during initialization."
    },
    {
      "label": "Event",
      "text": "An ISR or deferred handler calls the registered callback when the event occurs."
    },
    {
      "label": "Contract",
      "text": "The callback API must define context, execution level, allowed operations, and lifetime. Calling arbitrary application code from an ISR can be a design error."
    }
  ],
  "code": "typedef void (*done_fn)(void);\nstatic done_fn on_done;\n\nvoid driver_set_done(done_fn fn) { on_done = fn; }\n\nvoid transfer_done_isr(void) {\n  if (on_done) on_done(); /* keep this short */\n}",
  "takeaway": "Callbacks decouple drivers from applications, but the execution context must be part of the interface contract.",
  "quiz": {
    "q": "Why use a callback?",
    "choices": [
      "To couple every driver to one application",
      "To let a driver notify application code through an interface",
      "To replace the CPU clock"
    ],
    "a": 1,
    "because": "A callback keeps the driver reusable while allowing application-specific handling."
  }
}
);
