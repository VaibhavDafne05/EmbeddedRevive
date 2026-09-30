const LESSONS = [
  {
    id: "one-job",
    module: "The big idea",
    title: "A computer with one job",
    word: { term: "Embedded system", means: "a computer built into a product to run that product." },
    steps: [
      { label: "Everyday things", text: "A microwave, a car lock, and a watch look like simple objects. Hidden inside, a tiny computer is in charge." },
      { label: "The hidden chip", text: "That chip reads the buttons, watches the time, and turns motors or lights on. It was hired for this product, not for general homework." },
      { label: "The same loop", text: "While power is on, it repeats its job. Read, decide, act. Then do it again." },
      { label: "One job", text: "That is an embedded system: a small computer built into a thing, to run that thing." }
    ],
    takeaway: "If a product has a quiet computer inside with one job, that computer is an embedded system.",
    quiz: {
      q: "What is an embedded system?",
      choices: [
        "A laptop that has been made very small",
        "A computer built into a device to do that device's job",
        "Only a sensor, with no program"
      ],
      a: 1,
      because: "The computer is part of a larger product, and the program exists to run that product."
    }
  },
  {
    id: "not-a-pc",
    module: "The big idea",
    title: "Not the same as a laptop",
    word: { term: "Deadline", means: "a moment by which the answer must already be done." },
    steps: [
      { label: "A general helper", text: "A laptop is a general helper. Many apps share a big screen, lots of memory, and an operating system." },
      { label: "Hired by one product", text: "An embedded board usually keeps one program close to the wires. Those wires touch lights, motors, and sensors." },
      { label: "Late can be wrong", text: "A laptop may pause to install an update. A brake controller has a deadline. A late correct answer is still a wrong answer." },
      { label: "Same brain, new promise", text: "Both have a CPU, the part that follows instructions. The embedded promise is different: stay small, stay on the job, and answer on time." }
    ],
    takeaway: "Embedded work is about the product's wires and its deadlines, not about a general desk computer.",
    quiz: {
      q: "What usually makes embedded software different?",
      choices: [
        "It must serve real hardware, often before a deadline",
        "The chip is not allowed to run a program",
        "It is only a laptop with a smaller screen"
      ],
      a: 0,
      because: "The program owns a product's hardware, and finishing too late can make the result useless."
    }
  },
  {
    id: "sense-think-act",
    module: "The big idea",
    title: "Sense, think, act",
    word: { term: "State machine", means: "a few named situations, plus rules for moving between them." },
    steps: [
      { label: "Sense", text: "A sensor notices the world. A temperature chip, a button, or a light sensor turns something physical into a signal the program can read." },
      { label: "Think", text: "The program decides. Too hot. Button pressed. Light is low. The decision should be small and clear." },
      { label: "Act", text: "An actuator does the work in the world. A fan spins, a lock clicks, or a lamp turns on." },
      { label: "Repeat", text: "Then it repeats, for as long as the power is on. This loop is the shape of most embedded programs." },
      { label: "Named states", text: "The thinking is often a state machine. Idle, heating, done. You are always in one state, and events move you to the next." }
    ],
    takeaway: "Read the world, decide, drive an output, and repeat. Name the states so the decision stays simple.",
    quiz: {
      q: "What shape do most embedded programs have?",
      choices: [
        "Wait for a mouse click, then quit",
        "Run once at the factory and never again",
        "Read inputs, decide, drive outputs, and repeat"
      ],
      a: 2,
      because: "The product stays alive, so the program keeps sensing, deciding, and acting."
    }
  },
  {
    id: "inside-mcu",
    module: "The chip",
    title: "One chip, many rooms",
    word: { term: "Microcontroller", means: "a CPU, memory, and hardware helpers on a single chip." },
    steps: [
      { label: "One package", text: "A microcontroller is a small computer in one package. You solder it down, add a clock and power, and it can run a product." },
      { label: "The CPU", text: "The CPU follows instructions, one small step at a time. It is the part that does the thinking." },
      { label: "Memory", text: "Flash memory keeps the program even when power is off. RAM keeps live numbers, and those numbers disappear without power." },
      { label: "Helpers", text: "Peripherals are built-in helpers: pins, timers, analog input, and message wires. DMA is a porter that moves bytes so the CPU does not carry each one." },
      { label: "Pins", text: "Pins are the doors. Sensors, buttons, and outputs connect there. Inside the chip, a peripheral stands behind each door." }
    ],
    takeaway: "Learn the rooms: CPU, flash, RAM, peripherals, and pins. Almost every lesson lives in one of them.",
    quiz: {
      q: "What is already inside a typical microcontroller?",
      choices: [
        "Only a sensor",
        "A CPU, memory, and peripherals on one chip",
        "A full laptop operating system and a hard disk"
      ],
      a: 1,
      because: "The point of a microcontroller is that the computer and its everyday helpers share one chip."
    }
  },
  {
    id: "clock",
    module: "The chip",
    title: "The heartbeat",
    word: { term: "Clock", means: "the steady tick that steps the chip's work." },
    steps: [
      { label: "A steady tick", text: "Nothing in the logic moves until the clock ticks. The clock is a metronome, not the time of day on a watch." },
      { label: "How fast", text: "A 16 MHz clock ticks about 16 million times a second. The CPU can do a little work on those ticks." },
      { label: "Speed it up", text: "A crystal can make a slow, accurate beat. Circuits inside the chip multiply that beat into a faster clock." },
      { label: "Speed costs power", text: "A faster clock finishes work sooner and usually drinks more current. Slowing down, or stopping, saves the battery." },
      { label: "Don't guess time", text: "Waiting with an empty counting loop is a guess. Change the clock, and the guess is wrong. A hardware timer keeps real time." }
    ],
    takeaway: "The clock steps the chip. Measure real time with a timer, not with a loop that hopes it knows the speed.",
    quiz: {
      q: "What is the chip's clock for?",
      choices: [
        "Showing the user today's date",
        "Stepping the chip's logic at a steady rate",
        "Replacing the need for a program"
      ],
      a: 1,
      because: "Digital logic changes on clock ticks. The user's clock, if there is one, is a separate job."
    }
  },
  {
    id: "memory",
    module: "The chip",
    title: "Where things live",
    word: { term: "Flash and RAM", means: "flash keeps the program; RAM keeps live numbers." },
    steps: [
      { label: "The shelf", text: "Flash is the shelf. The program stays there when you unplug the board. Writing flash is slower, and it wears out if you do it constantly." },
      { label: "The desk", text: "RAM is the desk. Variables live here while the program runs. Power off, and the desk is cleared." },
      { label: "Saved settings", text: "A volume, a calibration, or a device name must survive power loss. Store those in a data page of flash, or in EEPROM if the chip has it." },
      { label: "Stack and heap", text: "The stack is a corner of RAM used when functions call each other. If it grows into other data, the crash looks random. On small chips, prefer fixed memory. A heap that grows and shrinks can fail months later." }
    ],
    takeaway: "Program in flash. Live data in RAM. Saved settings in non-volatile memory. Keep the stack small and predictable.",
    quiz: {
      q: "You unplug the board. What is still there after you plug it back in?",
      choices: [
        "The program stored in flash",
        "Every local variable and the stack history",
        "Nothing at all, including the program"
      ],
      a: 0,
      because: "Flash keeps its contents without power. Ordinary RAM does not."
    }
  },
  {
    id: "instruction",
    module: "The chip",
    title: "One step at a time",
    word: { term: "Instruction cycle", means: "fetch an instruction, decode it, do it, then repeat." },
    steps: [
      { label: "Fetch", text: "The CPU fetches the next instruction from flash. An instruction is a tiny order: add, copy, compare, or jump." },
      { label: "Decode", text: "It decodes that order so the circuits know which operation to perform." },
      { label: "Execute", text: "It executes the order. Then it fetches the next one. Some chips overlap these stages to go faster, but you still debug one instruction at a time." },
      { label: "Reset", text: "On reset, the chip jumps to a fixed start address. Startup code prepares memory, then calls main. Your loop begins after that quiet setup." }
    ],
    takeaway: "Reset starts at a known address. After that the CPU only fetches, decodes, and executes.",
    quiz: {
      q: "What does the CPU repeat?",
      choices: [
        "Compile, link, and upload",
        "Fetch, decode, and execute",
        "Sense, think, and act, with no instructions involved"
      ],
      a: 1,
      because: "Sense, think, and act is the program's story. Fetch, decode, and execute is how the CPU carries out each line."
    }
  },
  {
    id: "bits-hex",
    module: "Bits and registers",
    title: "Bits, bytes, and hex",
    word: { term: "Hex", means: "a short way to write bits, using digits 0–9 and letters A–F." },
    steps: [
      { label: "Only 0 and 1", text: "Inside the chip, a wire is in one of two states. We call them 0 and 1. A bit is one of those states." },
      { label: "A byte", text: "Eight bits make a byte. Hex packs those bits so people can read them. The byte 10100101 is written 0xA5." },
      { label: "Bit weights", text: "The rightmost bit is worth 1. The next is worth 2, then 4, 8, and so on, up to 128 on the left of a byte." },
      { label: "A mask", text: "Datasheets speak hex because it points at bits. 0x08 means only the bit worth 8 is on. That is bit 3, counting from 0 on the right." }
    ],
    takeaway: "When a datasheet says 0x08, translate it back into bits before you flip anything.",
    quiz: {
      q: "What does 0x08 mean in an 8-bit register?",
      choices: [
        "Every bit is on",
        "Only the bit worth 8 is on",
        "The register holds the decimal number 80"
      ],
      a: 1,
      because: "0x08 is binary 00001000. Counting from the right, starting at 0, that is bit 3."
    }
  },
  {
    id: "registers",
    module: "Bits and registers",
    title: "Switches inside the chip",
    word: { term: "Register", means: "a tiny hardware slot the program reads or writes to control a peripheral." },
    steps: [
      { label: "A named slot", text: "A register is a small row of bits at a fixed address. The CPU reaches it like memory, but the bits are wired to hardware." },
      { label: "Turn a feature on", text: "Write a 1 to an enable bit and a timer starts. Write a 0 and it stops. You are flipping a real switch, not storing a note." },
      { label: "Status bits", text: "Some bits are yours to set. Some are status the hardware sets, such as done or error. You read those. Writing them may do nothing, or may clear them. The datasheet says which." },
      { label: "Change one bit", text: "To turn one bit on without erasing the others, read the register, change that bit, and write the whole row back. That is a read-modify-write." }
    ],
    takeaway: "Peripherals obey registers. Read the datasheet for each bit: control, status, or clear-on-write.",
    quiz: {
      q: "What is a peripheral register?",
      choices: [
        "A hardware control or status slot at a fixed address",
        "A file on a memory card",
        "The name of a C function"
      ],
      a: 0,
      because: "The program controls built-in hardware by reading and writing these slots."
    }
  },
  {
    id: "gpio",
    module: "Pins and signals",
    title: "Pins that are on or off",
    word: { term: "GPIO", means: "a general pin you can set as an input or an output." },
    steps: [
      { label: "A general pin", text: "GPIO means a general-purpose pin. It can be a simple input or a simple output. It does not speak analog by itself." },
      { label: "Choose a direction", text: "First set the direction. Output can drive a light. Input watches a wire. Using the wrong direction is a very common early bug." },
      { label: "High or low", text: "High is near the supply voltage, often 3.3 volts. Low is near ground, 0 volts. A series resistor, often a few hundred ohms, protects a small LED." },
      { label: "A small current", text: "A pin can source or sink only a small current. A motor, a relay, or a bright lamp needs a transistor or driver in between. The pin sends the order. The driver sends the power." }
    ],
    takeaway: "Set direction, then drive high or low. Treat the pin as a signal, not as a power supply.",
    quiz: {
      q: "How do you turn an LED on from a GPIO pin?",
      choices: [
        "Set the pin as an output, then drive it high or low through a safe resistor",
        "Set the baud rate and hope the LED hears it",
        "Connect the motor supply straight to the pin with no driver"
      ],
      a: 0,
      because: "Direction comes first. The pin only switches a small current. The resistor keeps that current safe."
    }
  },
  {
    id: "button",
    module: "Pins and signals",
    title: "Reading a noisy button",
    word: { term: "Debounce", means: "waiting until a jumpy contact stays steady before you trust it." },
    steps: [
      { label: "Pull-up", text: "A pull-up resistor gently holds the pin high. When the button is pressed, it connects the pin to ground and the pin reads low." },
      { label: "Pressed", text: "Open reads high. Closed reads low. This is called active low, because the interesting event is the low level." },
      { label: "Bounce", text: "The metal contact bounces. For a few milliseconds the pin chatters high, low, high, low. A fast program sees many presses." },
      { label: "Wait for steady", text: "Debounce means: accept the new level only after it stays the same for a short, fixed time. A timer is a clean way to do that wait." }
    ],
    takeaway: "Pull the pin to a known idle level. Treat a button as ready only after the bounce has settled.",
    quiz: {
      q: "Why debounce a button?",
      choices: [
        "Because the contact chatters before it settles",
        "Because buttons transmit UART by default",
        "Because the CPU clock stops while the button is down"
      ],
      a: 0,
      because: "One physical press can look like several edges unless you wait for a stable level."
    }
  },
  {
    id: "adc",
    module: "Pins and signals",
    title: "Smooth signals become numbers",
    word: { term: "ADC", means: "a converter that turns a voltage into a digital count." },
    steps: [
      { label: "The world is smooth", text: "Light, temperature, and sound are smooth voltages. A GPIO pin only knows high or low, so it cannot store a level in between." },
      { label: "Steps", text: "An ADC samples the voltage and picks the nearest step. Ten bits means 1024 steps. Twelve bits means 4096 steps. More steps means a finer reading, not a magical exact one." },
      { label: "The reference", text: "The top of the scale is a reference voltage. If the reference is 3.3 volts and a 12-bit result is halfway, the pin was about 1.65 volts." },
      { label: "Hold still", text: "The converter needs the voltage to hold still while it measures. Changing the pin in the middle of a conversion gives a number you cannot trust." }
    ],
    takeaway: "A count from an ADC is a fraction of the reference voltage. Know the reference, or the number has no unit.",
    quiz: {
      q: "A 10-bit ADC splits its reference into how many levels?",
      choices: [
        "10 levels",
        "100 levels",
        "1024 levels"
      ],
      a: 2,
      because: "Ten bits can form 2 to the power of 10 different codes, which is 1024."
    }
  },
  {
    id: "pwm",
    module: "Pins and signals",
    title: "Brightness and speed from on and off",
    word: { term: "Duty cycle", means: "the share of each cycle that the pin stays high." },
    steps: [
      { label: "Pulses", text: "Many small chips have no true analog output. They pulse a pin instead. If the pulses are fast, a lamp or a motor feels the average." },
      { label: "Mostly low", text: "Duty cycle is the percent of the cycle spent high. Near 20 percent, the lamp is dim and a motor is slow." },
      { label: "Half", text: "Near 50 percent, the average sits in the middle. The pin is still only high or low. The average is what the load feels." },
      { label: "Mostly high", text: "Near 90 percent, the lamp is bright. Frequency is how fast the pulses repeat. Duty changes the average. Frequency keeps the flicker or the whine out of the way." }
    ],
    takeaway: "PWM is fast on-off. Duty sets the average. Frequency sets how smooth that average feels.",
    quiz: {
      q: "What does duty cycle change?",
      choices: [
        "How much of each cycle the signal stays high",
        "How many pins the chip has",
        "The number of bits in flash"
      ],
      a: 0,
      because: "A higher duty cycle raises the average voltage the load experiences."
    }
  },
  {
    id: "timers",
    module: "Pins and signals",
    title: "Time without guessing",
    word: { term: "Watchdog", means: "a timer that resets the chip if the program stops checking in." },
    steps: [
      { label: "A hardware counter", text: "A hardware timer counts clock ticks by itself. The CPU can do other work and look at the count when it cares." },
      { label: "Prescaler", text: "If the clock is too fast, the counter overflows immediately. A prescaler throws away some ticks first, so the counter sees a slower beat." },
      { label: "Compare match", text: "You choose a number. When the count reaches it, hardware can flip a pin or raise an event. PWM and regular jobs are born here." },
      { label: "Pet the dog", text: "A watchdog is a separate timer with a grim job. If your program does not pet it in time, it resets the chip. It is how a locked product gets a chance to start over." }
    ],
    takeaway: "Let timers count. Use compare-match for repeatable work. Use a watchdog so a freeze does not last forever.",
    quiz: {
      q: "What does a watchdog timer do?",
      choices: [
        "It resets the chip if the program stops checking in",
        "It measures temperature more accurately",
        "It replaces the CPU"
      ],
      a: 0,
      because: "The watchdog only cares that the program keeps petting it. Silence means reset."
    }
  },
  {
    id: "interrupts",
    module: "Time and events",
    title: "Asking versus being tapped",
    word: { term: "Interrupt", means: "a hardware tap that pauses the main program for a short handler." },
    steps: [
      { label: "Polling", text: "Polling means the program keeps asking: button down yet? It is easy to read, but it spends time asking, and it can miss a very short pulse." },
      { label: "A tap", text: "An interrupt is a tap on the shoulder. Hardware pauses the main work, runs a handler, then puts the main work back exactly where it was." },
      { label: "Keep it short", text: "The handler should be short. Set a flag or store a byte. Do the heavy thinking back in the main loop, where delays are safer." },
      { label: "Shared numbers", text: "If both the main code and the handler touch the same wide number, one can interrupt the other mid-write and tear the value. Use a flag, or pause interrupts for that tiny copy. Priority decides which tap goes first when two arrive." }
    ],
    takeaway: "Poll when missing an event is harmless. Interrupt when you must notice quickly, and return from the handler fast.",
    quiz: {
      q: "What belongs in an interrupt handler?",
      choices: [
        "A little work, then a quick return",
        "A long wait loop and a full report",
        "Recompiling the program"
      ],
      a: 0,
      because: "Long handlers block other events and make timing hard to reason about."
    }
  },
  {
    id: "realtime",
    module: "Time and events",
    title: "On time beats as fast as possible",
    word: { term: "Real-time", means: "correct only if the result arrives before its deadline." },
    steps: [
      { label: "A deadline", text: "Real-time does not mean as fast as possible. It means the result is right only if it arrives before a deadline." },
      { label: "In time", text: "An airbag that fires on time does its job. The math can be simple. The schedule is the product." },
      { label: "Too late", text: "The same math, delivered late, fails. Speed records do not rescue a missed deadline." },
      { label: "Hard and soft", text: "Hard real-time: missing the deadline is a failure. Soft real-time: late is worse, but not always fatal. Design from the slowest, worst case, not from a lucky average." }
    ],
    takeaway: "Ask when the answer is due, and whether late is fatal. Then measure the worst case.",
    quiz: {
      q: "What does real-time mean here?",
      choices: [
        "The chip must always run at its highest clock",
        "The work must finish by a deadline",
        "The display always refreshes 60 times a second"
      ],
      a: 1,
      because: "A real-time result is judged by its deadline. Raw speed is only a tool for meeting that deadline."
    }
  },
  {
    id: "uart",
    module: "Moving bytes",
    title: "UART, one bit at a time",
    word: { term: "Baud rate", means: "the agreed speed of the bits, in bits per second for this kind of link." },
    steps: [
      { label: "Two wires", text: "UART uses two signal wires. TX sends. RX listens. There is no shared clock wire. Both sides also need a common ground." },
      { label: "Agree the speed", text: "Both sides agree on a baud rate before they start. A common training speed is 9600 bits per second. If the speeds differ, the bytes look like noise." },
      { label: "Start and stop", text: "Each byte is wrapped with a start bit and a stop bit so the listener can find the edges. The data bits ride in between, least significant bit first." },
      { label: "Cross the wires", text: "Connect your TX to the other chip's RX, and the other way around. On a board these are logic levels, often 3.3 volts, not the old high-voltage serial plugs." }
    ],
    takeaway: "Same baud rate, shared ground, TX crossed to RX. UART is simple because the clock is implied, not sent.",
    quiz: {
      q: "What must UART partners agree on?",
      choices: [
        "The same baud rate",
        "A chip-select wire for every byte",
        "An address byte before every bit"
      ],
      a: 0,
      because: "Without a clock wire, the only shared timing is the baud rate you both promised to use."
    }
  },
  {
    id: "spi",
    module: "Moving bytes",
    title: "SPI, a clocked team",
    word: { term: "SPI", means: "a fast link where a controller clocks bits to a selected device." },
    steps: [
      { label: "A controller", text: "SPI has one controller and one or more devices. The controller makes the clock. Devices follow that clock." },
      { label: "The wires", text: "You will see a clock, data out, data in, and a select wire. Select is usually active low: low means you are the chosen device." },
      { label: "Both ways at once", text: "On each clock pulse, one bit can leave and one bit can arrive. That is full duplex. It is fast and easy to follow on a logic analyzer." },
      { label: "The datasheet edge", text: "The datasheet says which clock edge matters, and whether the clock idles high or low. Match that, or the bits shift by one. Extra devices usually need their own select pin." }
    ],
    takeaway: "SPI trades pins for speed and simplicity. The controller makes the clock and selects one device.",
    quiz: {
      q: "Why is SPI called synchronous?",
      choices: [
        "Both sides step on a clock the controller sends",
        "It only works once per day",
        "It has no wires"
      ],
      a: 0,
      because: "The clock wire tells both chips exactly when to read and write each bit."
    }
  },
  {
    id: "i2c",
    module: "Moving bytes",
    title: "I2C, two wires, many chips",
    word: { term: "I2C", means: "a shared two-wire bus where devices are called by address." },
    steps: [
      { label: "Two shared wires", text: "I2C uses two wires for many chips: SCL for the clock and SDA for the data. Both are pulled high by resistors. A chip may only pull a wire low, so two chips never both push high and fight." },
      { label: "Call an address", text: "The controller sends an address first. The chip wearing that address answers. The others stay quiet. The address must be unique on that bus." },
      { label: "Ack", text: "After each byte, the listener pulls the data wire low for one beat. That ack means got it. No ack means nobody is home, or the chip is busy." },
      { label: "Ask for time", text: "A slow chip may hold the clock low to ask for more time. That is clock stretching. Fewer pins than SPI, usually slower, and very common for sensors." }
    ],
    takeaway: "Two wires, pull-up resistors, a unique address, and an ack after each byte. That is the heart of I2C.",
    quiz: {
      q: "How does I2C choose which chip to talk to?",
      choices: [
        "With a separate select pin for every chip",
        "By sending an address on the shared data wire",
        "By changing the baud rate only"
      ],
      a: 1,
      because: "The chips share the wires. The address in the first byte selects who answers."
    }
  },
  {
    id: "other-buses",
    module: "Moving bytes",
    title: "Other wires you will meet",
    word: { term: "Bus", means: "a shared set of wires with rules for who may talk." },
    steps: [
      { label: "On the desk", text: "UART, SPI, and I2C cover most chips sitting on the same board, a short distance apart." },
      { label: "CAN", text: "CAN is common in cars and machines. Two wires carry opposite copies of the signal, so noise that hits both can be ignored. Messages have IDs, and a more urgent ID wins the wire." },
      { label: "USB and RS-485", text: "USB is the structured conversation with a computer. A dedicated block usually handles it. RS-485 is a tough differential link for long cables between boxes." },
      { label: "How you choose", text: "Pick by distance, speed, pin count, and noise. The idea never changes: agree on the rules, share a ground or a pair, then move bytes." }
    ],
    takeaway: "Desk buses are UART, SPI, and I2C. Distance and noise push you toward CAN, RS-485, or a ready-made USB block.",
    quiz: {
      q: "Why do CAN and RS-485 send a signal and its opposite?",
      choices: [
        "So noise that hits both wires can be rejected",
        "So they can avoid using any ground reference ever",
        "So each bit is stored in flash twice"
      ],
      a: 0,
      because: "The receiver looks at the difference. Noise common to both wires mostly cancels."
    }
  },
  {
    id: "firmware",
    module: "Building systems",
    title: "From the keyboard to the chip",
    word: { term: "Flashing", means: "writing the finished program into the chip's non-volatile memory." },
    steps: [
      { label: "Source", text: "You write source, often C or C++. The chip does not run that text. It runs machine instructions." },
      { label: "Compile and link", text: "A compiler translates the text. A linker places code and data at real addresses. The seating chart is the linker script: flash here, RAM there. The result is often an ELF or HEX image." },
      { label: "Flash", text: "A programmer writes that image into flash. Unplug the board, plug it back in, and the program is still there. This step is called flashing." },
      { label: "Debug", text: "A debugger can halt the CPU, read variables, and step one instruction. Many ARM chips use a two-pin debug door called SWD. If the story in the debugger and the story on the wire disagree, believe the wire." }
    ],
    takeaway: "Source becomes an image, the image is flashed, and a debugger lets you watch the CPU. The pins tell you what really happened.",
    quiz: {
      q: "What does flashing mean?",
      choices: [
        "Making an LED brighter with PWM",
        "Writing the program image into non-volatile memory",
        "Clearing RAM on purpose"
      ],
      a: 1,
      because: "Flashing stores the built program in flash so it survives power loss."
    }
  },
  {
    id: "bare-rtos",
    module: "Building systems",
    title: "One loop, or many tasks",
    word: { term: "RTOS", means: "a small operating system that switches the CPU among timed tasks." },
    steps: [
      { label: "Bare metal", text: "Bare metal means your main loop is the whole schedule. It is clear, small, and a good fit when the jobs are few." },
      { label: "Several jobs", text: "When several jobs have different timings, a loop full of special cases gets brittle. A real-time operating system lets each job look like its own loop." },
      { label: "The scheduler", text: "The scheduler gives the CPU to the ready task that is most urgent. The RTOS does not make the CPU faster. It makes the waiting and the taking of turns explicit." },
      { label: "Don't share badly", text: "Two tasks must not rewrite the same data at once. Queues and short locks pass work safely. Keep a lock tiny: a slow task holding a key can block an urgent one." }
    ],
    takeaway: "Use a superloop while the story stays simple. Use an RTOS when several timed jobs must share one CPU in an orderly way.",
    quiz: {
      q: "What does an RTOS change?",
      choices: [
        "It removes the need to design timing",
        "It schedules tasks. It does not make the CPU faster",
        "It erases flash on every tick"
      ],
      a: 1,
      because: "An RTOS is a way to share the CPU. The chip's speed is still the clock and the code."
    }
  },
  {
    id: "power",
    module: "Building systems",
    title: "Awake, asleep, and brownouts",
    word: { term: "Sleep", means: "a mode that stops most of the clock until a wake event." },
    steps: [
      { label: "Awake is thirsty", text: "A running CPU and busy peripherals drink current. A battery product has to care about microamps, not just features." },
      { label: "Sleep between jobs", text: "Do the work, then sleep. A pin change, a timer, or a message can wake the chip. Sleeping between events is the usual battery pattern." },
      { label: "How deep", text: "Light sleep pauses the CPU and keeps RAM. Deeper sleep saves more, and on some chips forgets RAM. Check the datasheet for that exact sleep level before you rely on it." },
      { label: "Brownout", text: "If the supply sags, logic can half-run and corrupt memory. A brown-out reset holds the chip in reset until the voltage is safe again." }
    ],
    takeaway: "Work, then sleep, and wake for a real reason. Let a brown-out circuit hold reset when voltage is unsafe.",
    quiz: {
      q: "What is the usual way to save battery current?",
      choices: [
        "Leave the CPU spinning in an empty loop",
        "Sleep, and wake only for a timer, a pin, or a message",
        "Erase flash whenever the product is idle"
      ],
      a: 1,
      because: "Most of the current is the clocked logic. Stopping that clock, until a real event, is the savings."
    }
  },
  {
    id: "mistakes",
    module: "Building systems",
    title: "Bugs that show up in hardware",
    word: { term: "volatile", means: "a promise that this value can change behind the compiler's back, so it must be read again." },
    steps: [
      { label: "Torn values", text: "A number wider than one simple write can be torn if an interrupt lands halfway. The reader sees a mix of the old value and the new one. Copy it with interrupts briefly paused, or hand over a flag." },
      { label: "volatile", text: "If hardware or an interrupt changes a variable, mark it volatile. Otherwise the compiler may reuse an old copy it kept in a register and never look at memory again." },
      { label: "Stuck or smashed", text: "A long wait inside an interrupt, a stack that is too small, or a buffer with no room will freeze or reboot the product. Handlers return. Buffers have a last legal index." },
      { label: "Look at the wire", text: "An unused input left floating can wander and waste power. Tie pins up, down, or drive them. When the bug remains, measure the real wire, and let the watchdog recover a freeze." }
    ],
    takeaway: "Protect shared data, mark hardware values volatile, keep handlers short, tie unused pins, and measure the wire.",
    quiz: {
      q: "What does volatile tell the compiler?",
      choices: [
        "This pin is an output",
        "This value can change outside the normal flow, so read it again",
        "This task has the highest priority"
      ],
      a: 1,
      because: "volatile stops the compiler from deleting a read it thinks is redundant. It does not, by itself, make a wide value atomic."
    }
  },
  {
    id: "whole-map",
    module: "Building systems",
    title: "The whole machine",
    word: { term: "Memory map", means: "the address seating chart for flash, RAM, and registers." },
    steps: [
      { label: "The world", text: "Start outside. Sensors and actuators are the product. The program exists to serve them." },
      { label: "Pins", text: "Pins are the doors. Direction, level, pull-ups, and drivers live here." },
      { label: "Peripherals", text: "Timers, ADC, PWM, UART, SPI, and I2C are the helpers behind the doors. Registers are their switches." },
      { label: "CPU", text: "The CPU fetches, decodes, and executes. Interrupts tap it. An RTOS, if you use one, only decides which task it runs next." },
      { label: "Memory", text: "Flash keeps the program. RAM keeps the desk. The linker script is the seating chart for both." },
      { label: "Clock and power", text: "The clock makes the logic move. Sleep saves energy. A brown-out reset and a watchdog keep a bad moment from lasting forever." },
      { label: "Your firmware", text: "You write the loop or the tasks, build an image, flash it, and check it with a debugger and a measurement on the real wire." }
    ],
    takeaway: "You now have the map: world, pins, peripherals, CPU, memory, time, power, and firmware.",
    quiz: {
      q: "Which part keeps the program when the power is off?",
      choices: [
        "RAM",
        "Flash",
        "The GPIO pins"
      ],
      a: 1,
      because: "Flash is non-volatile. RAM and pin levels do not hold the program across power loss."
    }
  }
];
