const C_LESSONS = [
  {
    id: "clang-shape",
    module: "The program",
    title: "A program is functions and data",
    word: { term: "Translation unit", means: "one source file after the preprocessor, compiled on its own." },
    steps: [
      { label: "One file", text: "A C file holds functions and objects. A function is a named piece of work. An object is a named piece of storage, such as a counter or a buffer." },
      { label: "Many files", text: "A real program is several files. adc.c knows how to read the converter. control.c knows the loop. Each file is compiled alone, then the linker joins them." },
      { label: "Names must agree", text: "If control.c calls adc_read, some file must define adc_read with the same type. A header is the shared promise: the name, the arguments, and the return type." },
      { label: "One program", text: "After the link there is one image. The chip does not run the .c files. It runs the machine code the compiler produced from them." }
    ],
    code: `/* adc.h is the promise. adc.c is the body. */
uint16_t adc_read(void);

uint16_t adc_read(void) {
  return raw;
}`,
    takeaway: "You write functions and data in source files. The compiler and linker turn those files into one program.",
    quiz: {
      q: "What does the chip actually run?",
      choices: [
        "The machine code produced from the source files",
        "The .c text, one line at a time",
        "The header file"
      ],
      a: 0,
      because: "Source is for people and for the compiler. The chip runs the linked image."
    }
  },
  {
    id: "clang-translate",
    module: "The program",
    title: "Three passes before the chip",
    word: { term: "Preprocessor", means: "the first pass. It pastes headers and replaces macros, and it does not understand C types." },
    steps: [
      { label: "Paste", text: "The preprocessor handles lines that start with a hash. include pastes a header into this file. define replaces a name with text. ifdef keeps or drops a section." },
      { label: "Compile", text: "The compiler reads that result and emits an object file: machine code, data, and a list of names it still needs from other files." },
      { label: "Link", text: "The linker matches those names to definitions, places sections with the linker script, and writes the image." },
      { label: "Evidence", text: "A missing semicolon fails at compile time. A missing function body fails at link time. A wrong formula compiles cleanly and fails on the board." }
    ],
    code: `/* 1. preprocessor pastes adc.h
   2. compiler writes control.o
   3. linker builds the image */`,
    takeaway: "Include and define happen first. The compiler makes object files. The linker makes the program.",
    quiz: {
      q: "Which pass replaces a macro with text?",
      choices: [
        "The preprocessor",
        "The linker",
        "The chip, at reset"
      ],
      a: 0,
      because: "Macros are text replacement before the compiler checks types."
    }
  },
  {
    id: "clang-main",
    module: "The program",
    title: "main is called, it is not the reset",
    word: { term: "main", means: "the function startup calls after the stack, the clocks, and the data copy are ready." },
    steps: [
      { label: "Reset first", text: "Reset enters the reset handler from the vector table. That code sets the stack, copies initialized data, and clears the zeroed data." },
      { label: "Then main", text: "Only then does it call main. On a hosted program main returns to the system. On a bare-metal board, returning from main often loops or resets. Do not treat it as a normal exit." },
      { label: "Arguments", text: "int main(void) takes nothing. int main(int argc, char **argv) is for a program that was given a command line. A microcontroller image usually has no command line." },
      { label: "Return", text: "The return type is int. return 0 means success on a hosted program. The value rarely matters on a bare-metal board, but the type still does." }
    ],
    code: `int main(void) {
  setup();
  for (;;) {
    control_tick();
  }
}`,
    takeaway: "Startup prepares the machine. main is the first function of your program, not the first instruction after reset.",
    quiz: {
      q: "What has already happened before main runs?",
      choices: [
        "The stack is set, and initialized data has been copied",
        "The shell has printed a prompt",
        "Every interrupt has already run"
      ],
      a: 0,
      because: "The reset handler does that work, then it calls main."
    }
  },
  {
    id: "clang-stmt",
    module: "The program",
    title: "A statement does work. An expression has a value",
    word: { term: "Expression", means: "a piece of code that produces a value, such as a sum or a comparison." },
    steps: [
      { label: "Expression", text: "raw + 1 is an expression. Its value is one more than raw. A comparison such as raw == 0 is also an expression. Its value is 1 when true and 0 when false." },
      { label: "Statement", text: "A statement is a complete step. count = raw + 1; is an assignment statement. The semicolon finishes it. if, while, and a brace block are statements too." },
      { label: "Block", text: "Braces group statements into one block. Names declared inside the block are not visible outside it." },
      { label: "Order", text: "Inside a function, statements run from top to bottom unless a loop, a branch, or a return says otherwise." }
    ],
    code: `uint16_t raw = adc_read(); /* statement */
uint16_t next = raw + 1;   /* raw + 1 is an expression */
if (next == 0) {            /* the compare is an expression */
  overflow = 1;
}`,
    takeaway: "Expressions produce values. Statements use those values to do a step. Semicolons and braces mark the steps.",
    quiz: {
      q: "What does a comparison expression produce?",
      choices: [
        "1 when it is true, and 0 when it is false",
        "The text true or false",
        "A new function"
      ],
      a: 0,
      because: "C has no separate boolean result at the expression level. A compare yields 1 or 0."
    }
  },
  {
    id: "clang-types",
    module: "Types",
    title: "Ask for a width, do not guess it",
    word: { term: "stdint.h", means: "the header that names integer types by their exact width, such as uint8_t and int32_t." },
    steps: [
      { label: "The loose names", text: "char is at least 8 bits. short and int are at least 16. long is at least 32. long long is at least 64. The standard does not promise that int is 32. A compiler may choose a wider int." },
      { label: "This chip", text: "On a common Cortex-M compiler, int and long are 32 bits and long long is 64. That is a property of that compiler, not a rule of the language. Check it when you change tools." },
      { label: "Exact widths", text: "uint8_t, uint16_t, int32_t, and the rest come from stdint.h. Use them for registers, protocol bytes, and anything stored in a fixed layout." },
      { label: "Object", text: "A type tells the compiler the size, the alignment, and how to interpret the bits. uint16_t count; reserves two bytes and treats them as a number from 0 to 65535." }
    ],
    code: `#include <stdint.h>

uint8_t  flags;   /* 0 to 255 */
uint16_t sample;  /* 0 to 65535 */
int32_t  error;   /* negative values allowed */`,
    takeaway: "int is a compiler choice. For wires, registers, and saved layout, name the width with stdint.h.",
    quiz: {
      q: "Why prefer uint16_t for a 16-bit register?",
      choices: [
        "The width is part of the type, on every compiler that provides it",
        "It is always faster than int",
        "It lives in flash"
      ],
      a: 0,
      because: "A register has a fixed width. uint16_t says 16 bits. int does not."
    }
  },
  {
    id: "clang-signed",
    module: "Types",
    title: "Signed and unsigned are different numbers",
    word: { term: "Unsigned", means: "a type that cannot be negative. It wraps modulo its width. Signed overflow is not defined that way." },
    steps: [
      { label: "Two readings", text: "The same 8 bits, all ones, are 255 as uint8_t and -1 as int8_t. The bits did not change. The type tells you which reading to use." },
      { label: "Unsigned wrap", text: "A uint8_t at 255 plus 1 becomes 0. That wrap is defined. It is modulo 256." },
      { label: "Signed overflow", text: "Overflow of a signed int is undefined. The compiler may assume it never happens. Do not write a counter that depends on a signed value wrapping." },
      { label: "Mixing", text: "If a signed value and an unsigned value meet in one operation, the usual arithmetic conversions apply. A negative int compared with an unsigned value can become a huge unsigned number. Keep both sides the same type." }
    ],
    code: `uint8_t u = 255;
u = (uint8_t)(u + 1); /* 0, defined */

int8_t s = -1;        /* bits 11111111 */
/* do not rely on signed overflow */`,
    takeaway: "Unsigned wrap is defined. Signed overflow is not. Do not mix a negative value into an unsigned compare.",
    quiz: {
      q: "What is defined for a uint8_t at 255 when you add 1?",
      choices: [
        "It becomes 0",
        "It stays 255",
        "The program is required to fault"
      ],
      a: 0,
      because: "Unsigned arithmetic wraps modulo the width. 256 mod 256 is 0."
    }
  },
  {
    id: "clang-chars",
    module: "Types",
    title: "A character is a small integer. A string ends at zero",
    word: { term: "String", means: "a sequence of char values with a zero byte after the last character." },
    steps: [
      { label: "A code", text: "The character A in single quotes is an integer code, 65 in ASCII. It is not the text A stored as a word. char can hold that code. Whether plain char is signed is up to the compiler." },
      { label: "A string", text: "Double quotes make an array of char with an extra zero at the end. The string Hi is three bytes: H, i, and 0. The zero is how strlen and printf know where to stop." },
      { label: "Do not write it", text: "A string literal lives with the constants. Writing into it is not allowed. Copy it into an array you own if you need to change the bytes." },
      { label: "Length", text: "The array is one longer than the visible text, because of the zero. A 16-byte buffer holds 15 characters plus the terminator. Forget the terminator and the next reader walks off the end." }
    ],
    code: `char code = 'A';          /* 65 */
const char *name = "Hi";  /* 'H', 'i', 0 */
char buf[16];
/* leave room for the ending 0 */`,
    takeaway: "Single quotes are one integer code. Double quotes are bytes plus a zero. The zero is part of the string.",
    quiz: {
      q: "How many bytes does the literal Hi occupy?",
      choices: [
        "Three: the two letters and a zero",
        "Two: just the letters",
        "One: the word Hi"
      ],
      a: 0,
      because: "A string literal includes the terminating zero byte."
    }
  },
  {
    id: "clang-enum",
    module: "Types",
    title: "Name the numbers you would otherwise memorize",
    word: { term: "Enumeration", means: "a set of named integer constants, written as an enum." },
    steps: [
      { label: "Naked numbers", text: "A state variable set to 2 means nothing at the call site. The reader has to hunt for the legend." },
      { label: "Names", text: "enum { STATE_IDLE = 0, STATE_RUN = 1, STATE_FAULT = 2 }; gives those numbers names. The compiler still stores an integer." },
      { label: "const", text: "A const object is a typed value the compiler will not let you assign to. It is not a text macro. Use const for a table or a scale factor that has a real type." },
      { label: "Not a new machine", text: "An enum does not make the processor reject a wrong number. You can still store 9 in an int. The names are for the program and for the reader." }
    ],
    code: `enum {
  STATE_IDLE = 0,
  STATE_RUN = 1,
  STATE_FAULT = 2
};
const uint16_t FULL_SCALE = 4095;`,
    takeaway: "enum and const name the numbers. The stored value is still an integer.",
    quiz: {
      q: "What does an enum constant become in the program?",
      choices: [
        "An integer constant",
        "A string stored in RAM",
        "A hardware pin"
      ],
      a: 0,
      because: "The names exist for the compiler and the reader. The value is an integer."
    }
  },
  {
    id: "clang-math",
    module: "Operators",
    title: "Integer division drops the fraction",
    word: { term: "Truncation", means: "integer division keeps the whole part and drops the fraction, toward zero." },
    steps: [
      { label: "Four operations", text: "Plus, minus, times, and divide work on the values. Percent is the remainder. 7 divided by 2 is 3. 7 remainder 2 is 1." },
      { label: "Toward zero", text: "C99 divides toward zero. Negative 7 divided by 2 is negative 3, not negative 4. Do not assume it rounds away from zero or toward even." },
      { label: "Width", text: "The operation uses the type of the operands after conversion, not the type of the place you store the result. A uint8_t times a uint8_t is computed in int, then truncated if you store it back in a uint8_t." },
      { label: "Order", text: "Multiply and divide happen before plus and minus. Parentheses say the order when the formula would otherwise surprise you. (a + b) / 2 is not a + b / 2." }
    ],
    code: `int q = 7 / 2;    /* 3 */
int r = 7 % 2;    /* 1 */
int avg = (lo + hi) / 2;  /* add first */`,
    takeaway: "Integer division drops the fraction toward zero. Parentheses decide the order. The math width is the converted operand type.",
    quiz: {
      q: "What is 7 divided by 2 in integer arithmetic?",
      choices: [
        "3",
        "3.5",
        "4"
      ],
      a: 0,
      because: "Integer division truncates toward zero. The fraction is dropped."
    }
  },
  {
    id: "clang-equal",
    module: "Operators",
    title: "One equals sign stores. Two ask a question",
    word: { term: "Assignment", means: "the single equals sign. It stores the right-hand value into the object on the left." },
    steps: [
      { label: "Store", text: "count = 3; writes 3 into count. The assignment itself has a value, which is the value that was stored. That is why a mistake inside if still compiles." },
      { label: "Ask", text: "count == 3 compares. It is 1 when count holds 3, and 0 otherwise. It does not change count." },
      { label: "The bug", text: "if (count = 3) stores 3 and then tests that value. Three is not zero, so the branch is taken. The compiler can warn. Treat that warning as a real bug." },
      { label: "Update", text: "count += 1 is count = count + 1. The same shape works for minus, times, and the bit operators. It still stores." }
    ],
    code: `count = 3;          /* store */
if (count == 3) {   /* ask */
  ready = 1;
}
count += 1;`,
    takeaway: "One equals sign writes. Two equals signs compare. An assignment inside a condition is almost always a bug.",
    quiz: {
      q: "What does if (count = 3) do?",
      choices: [
        "It stores 3 in count, then takes the branch",
        "It compares count with 3 and changes nothing",
        "It refuses to compile on every compiler"
      ],
      a: 0,
      because: "A single equals sign is assignment. The stored value 3 is not zero, so the if is true."
    }
  },
  {
    id: "clang-logic",
    module: "Operators",
    title: "And and or can skip the rest",
    word: { term: "Short circuit", means: "and stops when the left side is false. or stops when the left side is true. The right side is not evaluated." },
    steps: [
      { label: "And", text: "ready && fresh is 1 only when both sides are non-zero. If ready is 0, fresh is not even read." },
      { label: "Or", text: "fault || timeout is 1 when either side is non-zero. If fault is already 1, timeout is not read." },
      { label: "Not", text: "A leading ! turns zero into 1 and anything else into 0. !ready is the opposite of ready." },
      { label: "Use the skip", text: "if (p != 0 && *p == 5) is safe only because the star is on the right. If p is zero, the load does not happen. Swap the sides and a zero pointer is loaded." }
    ],
    code: `if (p != 0 && *p == 5) {
  use(*p);
}
if (fault || timeout) {
  safe_state();
}`,
    takeaway: "Logical and stops on false. Logical or stops on true. Put the safety check on the left.",
    quiz: {
      q: "When is the right side of a logical and evaluated?",
      choices: [
        "Only when the left side is true",
        "Always, both sides, every time",
        "Only when the left side is false"
      ],
      a: 0,
      because: "And short-circuits. A false left side means the result is already false."
    }
  },
  {
    id: "clang-bits",
    module: "Operators",
    title: "Bits are a different set of operators",
    word: { term: "Shift", means: "move the bits left or right by a count. A left shift of an unsigned value fills with zeros." },
    steps: [
      { label: "Not logical", text: "Bitwise AND, OR, XOR, and complement work on each bit. They are not the logical operators. Logical and answers yes or no. Bitwise AND mixes two patterns." },
      { label: "A mask", text: "1u shifted left by 3 is a value with only bit 3 set. AND with that mask tests the bit. OR with it sets the bit. AND with the inverted mask clears it." },
      { label: "Shift limits", text: "Shifting a 32-bit value by 32 or more is undefined. Shifting a negative signed value left is undefined. Shift unsigned values, and keep the count inside the width." },
      { label: "Times two", text: "A left shift by 1 of an unsigned value is a multiply by 2, until the bit falls off the top. Prefer a shift when you mean a bit, and a multiply when you mean arithmetic." }
    ],
    code: `const uint32_t BIT3 = 1u << 3;
uint32_t on = reg & BIT3;     /* test */
reg = reg | BIT3;             /* set */
reg = reg & ~BIT3;            /* clear */`,
    takeaway: "Bit operators change patterns. Logical operators answer yes or no. Keep shifts inside the width, on unsigned values.",
    quiz: {
      q: "Which shift count is undefined for a 32-bit value?",
      choices: [
        "A count of 32 or more",
        "A count of 1",
        "A count of 0"
      ],
      a: 0,
      because: "The shift count must be from 0 up to one less than the width. 32 is not a valid shift of a 32-bit value."
    }
  },
  {
    id: "clang-promote",
    module: "Operators",
    title: "Small integers grow before the operator",
    word: { term: "Integer promotion", means: "a value narrower than int is converted to int before most arithmetic." },
    steps: [
      { label: "The rule", text: "uint8_t and uint16_t are promoted to int when they appear in an expression, if int can hold every value of that type. On this chip, int is 32 bits, so it can." },
      { label: "Invert", text: "uint8_t a = 1; then ~a does not invert 8 bits. a becomes the int 1 first. Complement of that int has the high bits set. The result is not the 8-bit value 0xFE." },
      { label: "Cast back", text: "uint8_t b = (uint8_t)~a; truncates that wide result to 8 bits, which is 0xFE. The cast is the moment it becomes 8 bits again." },
      { label: "Compare", text: "~a == 0xFE is false. The left side is a wide int. The right side is 254. They are not equal. This is a common bug in flag math." }
    ],
    code: `uint8_t a = 1;
uint8_t b = (uint8_t)~a; /* 0xFE */
/* ~a == 0xFE is false.
   ~a is a wide int, not an 8-bit value. */`,
    takeaway: "Narrow unsigned values promote to int before the operator. Cast back when you wanted an 8-bit or 16-bit result.",
    quiz: {
      q: "Why is ~a == 0xFE false when a is a uint8_t holding 1?",
      choices: [
        "a is promoted to int before the complement, so the result is wider than 8 bits",
        "Complement is not allowed on unsigned values",
        "0xFE cannot be written in C"
      ],
      a: 0,
      because: "The promotion happens first. The complement is of a 32-bit int, not of an 8-bit byte."
    }
  },
  {
    id: "clang-if",
    module: "Control",
    title: "if chooses one path",
    word: { term: "Branch", means: "a choice. The condition is tested, and one of the paths runs." },
    steps: [
      { label: "The test", text: "if runs the next statement when the condition is not zero. Zero skips it. A compare, a flag, or a pointer can be the condition." },
      { label: "else", text: "else is the path for zero. else if tests another condition only when the earlier ones were zero." },
      { label: "Braces", text: "Without braces, if owns only the next statement. A second line that looks indented still runs every time. Put braces around every branch." },
      { label: "One of them", text: "The paths rejoin after the if. Variables you need on both paths must be set on both paths, or the compiler will tell you one path left them unset." }
    ],
    code: `if (sample > LIMIT) {
  state = STATE_FAULT;
} else {
  state = STATE_RUN;
}`,
    takeaway: "if takes the non-zero path. else takes the zero path. Brace every branch so the next line cannot escape.",
    quiz: {
      q: "When does the else path run?",
      choices: [
        "When the condition is zero",
        "When the condition is 1",
        "Always, after the if body"
      ],
      a: 0,
      because: "else is the path taken when the tested value is zero."
    }
  },
  {
    id: "clang-switch",
    module: "Control",
    title: "switch matches a value, and it falls through",
    word: { term: "Case", means: "one labeled value inside a switch. Without a break, execution continues into the next case." },
    steps: [
      { label: "Match", text: "switch (state) jumps to the case whose constant equals state. default runs when none of the cases match." },
      { label: "break", text: "A case does not end by itself. Execution continues into the next case until a break, a return, or the end of the switch. That is fall-through." },
      { label: "On purpose", text: "Fall-through can share a tail between two cases. If you mean that, say so in a comment. An accidental missing break runs the wrong work." },
      { label: "Constants", text: "Case labels must be integer constants, not ranges and not strings. For a range, use if." }
    ],
    code: `switch (state) {
case STATE_IDLE:
  idle();
  break;
case STATE_RUN:
  run();
  break;
default:
  fault();
  break;
}`,
    takeaway: "switch jumps to a matching constant. break leaves the switch. Without it, the next case runs too.",
    quiz: {
      q: "What happens if a case has no break?",
      choices: [
        "Execution continues into the next case",
        "The switch ends immediately",
        "The program returns from main"
      ],
      a: 0,
      because: "Cases fall through until a break, a return, or the end of the switch."
    }
  },
  {
    id: "clang-loops",
    module: "Control",
    title: "A loop repeats until the test fails",
    word: { term: "Loop", means: "a statement that runs its body again while a condition stays non-zero." },
    steps: [
      { label: "while", text: "while tests first. If the condition is already zero, the body never runs." },
      { label: "for", text: "for (i = 0; i < 4; i++) is init, then test, then body, then the update, then the test again. i++ happens after the body, not before." },
      { label: "do", text: "do runs the body once, then tests. Use it when the work must happen before you know whether to repeat." },
      { label: "Forever", text: "for (;;) is the bare-metal main loop. It has no test, so it does not end. An empty while (1) is the same idea." }
    ],
    code: `uint8_t i;
for (i = 0; i < 4; i++) {
  sum += buf[i];
}`,
    takeaway: "while tests first. do tests after one run. for packs the counter into the header. for (;;) does not end.",
    quiz: {
      q: "When does the update i++ run in a for loop?",
      choices: [
        "After the body, before the test is tried again",
        "Before the body, every time",
        "Only when the loop is finished"
      ],
      a: 0,
      because: "The order is init, test, body, update, and then back to the test."
    }
  },
  {
    id: "clang-jump",
    module: "Control",
    title: "break, continue, and return leave early",
    word: { term: "return", means: "leave the current function, optionally with a value." },
    steps: [
      { label: "break", text: "break leaves the innermost loop or switch. It does not leave the function." },
      { label: "continue", text: "continue skips the rest of this loop body and goes to the next test. In a for loop, the update still runs." },
      { label: "return", text: "return leaves the function immediately. A non-void function must return a value on every path that the caller can reach." },
      { label: "One exit", text: "Several returns are fine when each one is obvious. A cleanup that must run on every path belongs in one place, so a new return cannot skip it." }
    ],
    code: `for (i = 0; i < n; i++) {
  if (buf[i] == 0) continue; /* next i */
  if (buf[i] == MARK) break; /* leave the loop */
}
return sum;`,
    takeaway: "break leaves the loop or switch. continue starts the next pass. return leaves the function.",
    quiz: {
      q: "What does continue do inside a for loop?",
      choices: [
        "It skips the rest of the body and runs the update, then the test",
        "It leaves the function",
        "It restarts the program"
      ],
      a: 0,
      because: "continue abandons this pass. The for update and the test still happen."
    }
  },
  {
    id: "clang-call",
    module: "Functions",
    title: "A call copies the arguments and may return one value",
    word: { term: "Parameter", means: "the name inside the function for a copy of the argument the caller passed." },
    steps: [
      { label: "Define", text: "A definition is the body. uint16_t scale(uint16_t raw) says the name, the argument type, and the return type, then the braces hold the work." },
      { label: "Copy", text: "The caller passes a value. The function receives a copy. Changing the parameter does not change the caller's object." },
      { label: "Return", text: "return sends one value back. The call expression becomes that value. A void function returns nothing." },
      { label: "To change a caller", text: "If the function must write the caller's object, pass a pointer to it. The pointer is still copied. The object it points at is not." }
    ],
    code: `uint16_t scale(uint16_t raw) {
  return (uint16_t)(raw / 2); /* raw is a copy */
}

void set_flag(uint8_t *flags) {
  *flags = 1; /* writes the caller's object */
}`,
    takeaway: "Arguments are copies. The return value is one result. A pointer parameter is how a function writes an object the caller owns.",
    quiz: {
      q: "If a function assigns to its uint16_t parameter, what changes?",
      choices: [
        "Only the function's copy",
        "The caller's variable, automatically",
        "The return address"
      ],
      a: 0,
      because: "C passes the value. The parameter is a separate object."
    }
  },
  {
    id: "clang-header",
    module: "Functions",
    title: "A header is a promise. A guard keeps it once",
    word: { term: "Declaration", means: "a promise that a name exists, with a type, without providing the body." },
    steps: [
      { label: "Promise", text: "uint16_t adc_read(void); tells this file the name and the type. The body can live in another file. The compiler checks the call against the promise." },
      { label: "Header", text: "Put the promise in a header. Every file that calls the function includes that header, and so does the file that defines the function. Then the definition is checked against the same promise." },
      { label: "Once", text: "A header included twice in one file defines the same names twice. A guard skips the second paste: if the macro is already defined, the body of the header is dropped." },
      { label: "Mismatch", text: "If one file thinks adc_read returns uint16_t and another defines it as uint32_t, the link may still succeed and the value will be wrong. The shared header is what catches that." }
    ],
    code: `#ifndef ADC_H
#define ADC_H
#include <stdint.h>
uint16_t adc_read(void);
#endif`,
    takeaway: "Declare the function in a header, include it everywhere, and guard the header so it is pasted only once.",
    quiz: {
      q: "What does a header guard prevent?",
      choices: [
        "The same header being pasted twice into one file",
        "The linker from running",
        "A function from returning a value"
      ],
      a: 0,
      because: "The guard macro makes the preprocessor skip the header on the second include."
    }
  },
  {
    id: "clang-scope",
    module: "Functions",
    title: "Braces decide who can see a name",
    word: { term: "Scope", means: "the region of source where a name is visible." },
    steps: [
      { label: "Block", text: "A name declared inside braces is visible from that line to the closing brace. Outside, it does not exist." },
      { label: "File", text: "A name at file scope is visible from its declaration to the end of the file. static on that name hides it from other files. Without static, other files may refer to it with extern." },
      { label: "Shadow", text: "An inner name can reuse an outer name. Inside the block, the inner one wins. That is easy to misread. Prefer a different name." },
      { label: "Lifetime is separate", text: "Scope is about the source text. Lifetime is about when the object exists. A static local is invisible outside the function, but it exists for the whole program." }
    ],
    code: `static uint32_t boots; /* this file only */

void tick(void) {
  static uint16_t calls; /* hidden, but it survives */
  uint16_t n = 0;        /* gone when tick returns */
  calls++;
}`,
    takeaway: "Braces and file scope decide who can say the name. static at file scope keeps the name private. A static local still lives for the whole run.",
    quiz: {
      q: "What does static on a file-scope function do?",
      choices: [
        "It hides the name from other files",
        "It puts the function in RAM",
        "It makes the function run at reset"
      ],
      a: 0,
      because: "File-scope static limits linkage. Other translation units cannot call that name."
    }
  },
  {
    id: "clang-array",
    module: "Data",
    title: "An array is a row. Its name becomes a pointer",
    word: { term: "Array", means: "a sequence of objects of one type, laid out in order." },
    steps: [
      { label: "The row", text: "uint8_t buf[4]; is four bytes, buf[0] through buf[3]. The index of the last element is 3, not 4." },
      { label: "No check", text: "C does not test the index. buf[4] is past the end. It may read the next object, or fault, depending on what sits there." },
      { label: "Decay", text: "In most expressions the array name becomes a pointer to the first element. You can pass buf to a function that expects uint8_t *. The function does not receive the length." },
      { label: "sizeof", text: "sizeof buf in the function that declared it is 4, the whole row. sizeof of the pointer parameter is the size of a pointer, 4 on this chip, not the length of the row. Pass the length yourself." }
    ],
    code: `uint8_t buf[4] = { 10, 20, 30, 40 };
uint8_t first = buf[0];
/* sizeof buf is 4 here.
   a uint8_t * parameter is not the row. */`,
    takeaway: "An array is a row with no built-in length check. Passed to a function, the name becomes a pointer, and the length has to travel separately.",
    quiz: {
      q: "What is the index of the last element of uint8_t buf[4]?",
      choices: [
        "3",
        "4",
        "5"
      ],
      a: 0,
      because: "Four elements are numbered 0, 1, 2, and 3."
    }
  },
  {
    id: "clang-struct",
    module: "Data",
    title: "A struct groups fields, and it may pad them",
    word: { term: "Padding", means: "unused bytes the compiler inserts so the next field starts on its required alignment." },
    steps: [
      { label: "Fields", text: "A struct is one object with named fields. sample.id and sample.value are parts of that object, not two independent variables." },
      { label: "Order", text: "The fields are laid out in the order you wrote, plus any padding. A uint8_t followed by a uint32_t often grows a gap so the 32-bit field starts on a 4-byte boundary." },
      { label: "Size", text: "On a typical Cortex-M, a struct of one uint8_t and one uint32_t is 8 bytes: the byte, three padding bytes, then the word. sizeof tells you. Do not add the field sizes by hand and call that the wire size." },
      { label: "Wire", text: "A protocol has its own layout. Copy bytes in and out with a defined order. Do not send a padded struct onto a wire and expect the other end to see the same gaps." }
    ],
    code: `struct sample {
  uint8_t id;
  uint32_t value; /* alignment may insert padding before this */
};
/* sizeof may be 8, not 5 */`,
    takeaway: "Fields sit in order, with padding for alignment. sizeof is the size in memory. A wire format is a separate layout.",
    quiz: {
      q: "Why can sizeof a struct be larger than the sum of its fields?",
      choices: [
        "The compiler may insert padding so fields are aligned",
        "Every struct stores a hidden string name",
        "sizeof counts only the first field"
      ],
      a: 0,
      because: "Alignment gaps are part of the object. They are not part of a packed wire format unless you define one."
    }
  },
  {
    id: "clang-union",
    module: "Data",
    title: "A union is one object with several readings",
    word: { term: "Union", means: "an object whose members share the same memory. Writing one member changes what the others read." },
    steps: [
      { label: "Shared bytes", text: "A union is as large as its largest member, plus any alignment. All members start at the same address." },
      { label: "One active", text: "You write one member and read that member. Reading a different member is a different interpretation of the same bytes. Use it when the format really is two views of one payload, such as a uint16_t or two uint8_t values." },
      { label: "Endian", text: "Which byte of the uint16_t is the low byte depends on the chip. Cortex-M is little-endian: the low byte sits at the lower address. Do not use a union as a portable way to split a protocol field." },
      { label: "typedef", text: "typedef gives an existing type a new name. typedef uint16_t sample_t; does not create a new type with new rules. It makes the declarations easier to read." }
    ],
    code: `union word {
  uint16_t all;
  uint8_t byte[2]; /* low byte first on Cortex-M */
};
typedef uint16_t sample_t;`,
    takeaway: "Union members overlap. Read the member you wrote. typedef only adds a name.",
    quiz: {
      q: "Where do the members of a union live?",
      choices: [
        "At the same address, sharing the bytes",
        "One after another, like a struct",
        "Each in its own flash page"
      ],
      a: 0,
      because: "A union stores one object. The members are different ways to read it."
    }
  },
  {
    id: "clang-macro",
    module: "Data",
    title: "A macro is text, not a typed value",
    word: { term: "Macro", means: "a preprocessor name that is replaced with text before the compiler runs." },
    steps: [
      { label: "Paste", text: "define SAMPLES 8 replaces every later SAMPLES with the characters 8. There is no type and no place in memory, unless the replacement itself creates one." },
      { label: "Parentheses", text: "define DOUBLE(x) x + x is a trap. DOUBLE(1) * 3 becomes 1 + 1 * 3, which is 7. Write ((x) + (x)) if you need a macro function, or write a real function." },
      { label: "Prefer a function", text: "A static inline function has a type, and the arguments are evaluated once. A macro evaluates an argument every time it appears in the replacement." },
      { label: "Where macros belong", text: "Include guards, conditional compilation, and a few token pastes are what macros are good at. A scale factor wants const. A width wants a typedef or stdint." }
    ],
    code: `#define SAMPLES 8

static inline uint16_t twice(uint16_t x) {
  return (uint16_t)(x + x); /* evaluated once, typed */
}`,
    takeaway: "A macro pastes text. It has no type. Use a function or a const when the name is a value.",
    quiz: {
      q: "Why can a macro surprise you in an expression?",
      choices: [
        "It pastes text, so precedence and repeated arguments follow the replacement",
        "It always runs after the linker",
        "It stores the value in EEPROM"
      ],
      a: 0,
      because: "The preprocessor does not know C expressions. It only substitutes characters."
    }
  },
  {
    id: "clang-ptr",
    module: "Pointers",
    title: "A pointer stores an address",
    word: { term: "Pointer", means: "an object that holds the address of another object, and a type that says how to read it." },
    steps: [
      { label: "Address", text: "The operator & gives the address of an object. uint16_t *p = &sample; stores that address. The type says the object is a uint16_t." },
      { label: "Load", text: "The operator * uses the address. *p reads or writes sample. If p does not point at a live object of that type, the load is invalid." },
      { label: "Step", text: "p + 1 moves by one object, not by one byte. For a uint16_t pointer, that is two bytes. For a uint32_t pointer, it is four." },
      { label: "const", text: "const uint16_t *p can change p, but not the object. uint16_t *const p can change the object, but not p. Read the const as applying to the thing on its left." }
    ],
    code: `uint16_t sample;
uint16_t *p = &sample;
*p = 34;
const uint16_t *view = p; /* view cannot write */`,
    takeaway: "& takes an address. * uses it. Pointer plus one steps by the size of the pointed-to type. const says what you promise not to write.",
    quiz: {
      q: "How far does a uint32_t pointer move when you add 1?",
      choices: [
        "Four bytes",
        "One byte",
        "One bit"
      ],
      a: 0,
      because: "Pointer arithmetic counts objects. A uint32_t object is four bytes."
    }
  }
];
