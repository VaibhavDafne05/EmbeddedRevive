function cFrames(parts) {
  return board(parts.map(function (html, i) {
    return "<g " + vis(i, i) + ">" + html + "</g>";
  }).join(""));
}

function cDuo(left, right) {
  function side(item, x) {
    return box(x, 90, 330, 150, item.cls || "") +
      tx(x + 165, 150, item.title, "h", "text-anchor=\"middle\"") +
      tx(x + 165, 186, item.sub, "s", "text-anchor=\"middle\"");
  }
  return side(left, 48) + side(right, 422);
}

function cNote(text) {
  return tx(48, 300, text, "m");
}

SCENES["clang-shape"] = function () {
  return cFrames([
    box(160, 90, 480, 120, "green") + tx(400, 145, "adc_read()", "h", "text-anchor=\"middle\"") + tx(400, 178, "a function, plus the data it uses", "s", "text-anchor=\"middle\""),
    box(48, 100, 250, 110) + tx(173, 150, "adc.c", "h", "text-anchor=\"middle\"") + tx(173, 180, "the body", "s", "text-anchor=\"middle\"") +
      box(500, 100, 250, 110, "blue") + tx(625, 150, "control.c", "h", "text-anchor=\"middle\"") + tx(625, 180, "the loop", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 120) + tx(400, 145, "uint16_t adc_read(void);", "h", "text-anchor=\"middle\"") + tx(400, 178, "the shared promise", "s", "text-anchor=\"middle\""),
    box(200, 100, 400, 110, "dark") + tx(400, 150, "one image", "h on-dark", "text-anchor=\"middle\"") + tx(400, 182, "the chip runs this", "s on-dark", "text-anchor=\"middle\"")
  ]);
};

SCENES["clang-translate"] = function () {
  return cFrames([
    box(80, 110, 640, 90, "green") + tx(400, 162, "include and define", "h", "text-anchor=\"middle\""),
    box(48, 120, 160, 80) + tx(128, 168, "control.c", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 208 160 L 280 160\" marker-end=\"url(#ah)\"></path>" +
      box(290, 120, 180, 80, "green") + tx(380, 168, "control.o", "m", "text-anchor=\"middle\"") +
      cNote("Compile one file. Names it still needs stay unresolved."),
    box(160, 100, 480, 110, "green") + tx(400, 150, "linker", "h", "text-anchor=\"middle\"") + tx(400, 180, "matches names, places sections", "s", "text-anchor=\"middle\""),
    cDuo({ title: "missing semicolon", sub: "fails at compile", cls: "copper" }, { title: "missing body", sub: "fails at link", cls: "copper" })
  ]);
};

SCENES["clang-main"] = function () {
  return cFrames([
    box(80, 100, 280, 110, "dark") + tx(220, 150, "reset handler", "m on-dark", "text-anchor=\"middle\"") + tx(220, 180, "stack, data, bss", "s on-dark", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 360 155 L 450 155\" marker-end=\"url(#ah)\"></path>" +
      box(460, 100, 260, 110, "green") + tx(590, 162, "main", "h", "text-anchor=\"middle\""),
    box(160, 100, 480, 110) + tx(400, 150, "return from main", "h", "text-anchor=\"middle\"") + tx(400, 180, "on bare metal, do not treat it as exit", "tiny", "text-anchor=\"middle\""),
    cDuo({ title: "main(void)", sub: "no command line", cls: "green" }, { title: "argc, argv", sub: "a hosted program", cls: "" }),
    box(200, 110, 400, 90, "green") + tx(400, 162, "return type is int", "h", "text-anchor=\"middle\"")
  ]);
};

SCENES["clang-stmt"] = function () {
  return cFrames([
    box(140, 100, 520, 100, "green") + tx(400, 145, "raw + 1", "h", "text-anchor=\"middle\"") + tx(400, 175, "a value", "s", "text-anchor=\"middle\""),
    box(140, 100, 520, 100) + tx(400, 145, "count = raw + 1;", "h", "text-anchor=\"middle\"") + tx(400, 175, "a step, finished by the semicolon", "s", "text-anchor=\"middle\""),
    box(180, 80, 440, 180, "blue") + tx(400, 150, "{ block }", "h", "text-anchor=\"middle\"") + tx(400, 185, "names die at the closing brace", "s", "text-anchor=\"middle\""),
    cNote("Top to bottom, unless a branch, a loop, or a return says otherwise.")
  ]);
};

SCENES["clang-types"] = function () {
  return cFrames([
    box(48, 90, 220, 120) + tx(158, 145, "int", "h", "text-anchor=\"middle\"") + tx(158, 175, "at least 16 bits", "s", "text-anchor=\"middle\"") +
      box(290, 90, 220, 120) + tx(400, 145, "long", "h", "text-anchor=\"middle\"") + tx(400, 175, "at least 32", "s", "text-anchor=\"middle\"") +
      box(532, 90, 220, 120) + tx(642, 145, "long long", "m", "text-anchor=\"middle\"") + tx(642, 175, "at least 64", "s", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "green") + tx(400, 145, "on this Cortex-M", "h", "text-anchor=\"middle\"") + tx(400, 178, "int is 32 bits, until you change compilers", "tiny", "text-anchor=\"middle\""),
    box(48, 110, 220, 90, "green") + tx(158, 162, "uint8_t", "m", "text-anchor=\"middle\"") +
      box(290, 110, 220, 90, "green") + tx(400, 162, "uint16_t", "m", "text-anchor=\"middle\"") +
      box(532, 110, 220, 90, "green") + tx(642, 162, "int32_t", "m", "text-anchor=\"middle\""),
    box(160, 100, 480, 110) + tx(400, 145, "uint16_t count", "h", "text-anchor=\"middle\"") + tx(400, 178, "two bytes, 0 to 65535", "s", "text-anchor=\"middle\"")
  ]);
};

SCENES["clang-signed"] = function () {
  return cFrames([
    cDuo({ title: "uint8_t", sub: "11111111 is 255", cls: "green" }, { title: "int8_t", sub: "11111111 is -1", cls: "blue" }),
    box(160, 100, 480, 110, "green") + tx(400, 145, "255 + 1", "h", "text-anchor=\"middle\"") + tx(400, 178, "uint8_t becomes 0", "s", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "copper") + tx(400, 145, "signed overflow", "h", "text-anchor=\"middle\"") + tx(400, 178, "not a defined wrap", "s", "text-anchor=\"middle\""),
    cNote("Keep both sides of a compare the same signedness.")
  ]);
};

SCENES["clang-chars"] = function () {
  return cFrames([
    box(200, 100, 400, 100, "green") + tx(400, 145, "'A'", "h", "text-anchor=\"middle\"") + tx(400, 175, "the integer 65", "s", "text-anchor=\"middle\""),
    bitCells(["H", "i", "0"], 220, 110, 90) + cNote("Three bytes. The last one is the terminator."),
    cDuo({ title: "literal", sub: "do not write into it", cls: "copper" }, { title: "your array", sub: "copy, then edit", cls: "green" }),
    box(160, 100, 480, 110) + tx(400, 145, "char buf[16]", "h", "text-anchor=\"middle\"") + tx(400, 178, "15 characters, plus the zero", "s", "text-anchor=\"middle\"")
  ]);
};

SCENES["clang-enum"] = function () {
  return cFrames([
    box(250, 110, 300, 90, "copper") + tx(400, 162, "state = 2", "h", "text-anchor=\"middle\""),
    box(80, 110, 200, 90, "green") + tx(180, 162, "IDLE 0", "m", "text-anchor=\"middle\"") +
      box(300, 110, 200, 90, "green") + tx(400, 162, "RUN 1", "m", "text-anchor=\"middle\"") +
      box(520, 110, 200, 90, "copper") + tx(620, 162, "FAULT 2", "m", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "blue") + tx(400, 145, "const FULL_SCALE", "h", "text-anchor=\"middle\"") + tx(400, 178, "a typed value, not a macro", "s", "text-anchor=\"middle\""),
    cNote("The name is for the reader. The stored value is still an integer.")
  ]);
};

SCENES["clang-math"] = function () {
  return cFrames([
    cDuo({ title: "7 / 2", sub: "3", cls: "green" }, { title: "7 % 2", sub: "1", cls: "blue" }),
    box(160, 100, 480, 110) + tx(400, 145, "(-7) / 2", "h", "text-anchor=\"middle\"") + tx(400, 178, "is -3, toward zero", "s", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "green") + tx(400, 145, "uint8_t times uint8_t", "h", "text-anchor=\"middle\"") + tx(400, 178, "the multiply happens in int", "s", "text-anchor=\"middle\""),
    cDuo({ title: "(a + b) / 2", sub: "add, then divide", cls: "green" }, { title: "a + b / 2", sub: "divide b first", cls: "copper" })
  ]);
};

SCENES["clang-equal"] = function () {
  return cFrames([
    box(160, 100, 480, 110, "green") + tx(400, 145, "count = 3", "h", "text-anchor=\"middle\"") + tx(400, 178, "stores 3", "s", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "blue") + tx(400, 145, "count == 3", "h", "text-anchor=\"middle\"") + tx(400, 178, "asks, and changes nothing", "s", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "copper") + tx(400, 145, "if (count = 3)", "h", "text-anchor=\"middle\"") + tx(400, 178, "stores, then the branch is taken", "s", "text-anchor=\"middle\""),
    box(200, 110, 400, 90) + tx(400, 162, "count += 1", "h", "text-anchor=\"middle\"")
  ]);
};

SCENES["clang-logic"] = function () {
  return cFrames([
    box(48, 110, 300, 100) + tx(198, 155, "ready is 0", "m", "text-anchor=\"middle\"") +
      box(420, 110, 320, 100) + tx(580, 155, "fresh is not read", "m", "text-anchor=\"middle\"") +
      cNote("And stops when the left side is false."),
    box(48, 110, 300, 100, "green") + tx(198, 155, "fault is 1", "m", "text-anchor=\"middle\"") +
      box(420, 110, 320, 100) + tx(580, 155, "timeout is skipped", "m", "text-anchor=\"middle\""),
    box(200, 110, 400, 90, "blue") + tx(400, 162, "!ready", "h", "text-anchor=\"middle\""),
    cDuo({ title: "p != 0 first", sub: "then *p", cls: "green" }, { title: "*p first", sub: "a zero p is loaded", cls: "copper" })
  ]);
};

SCENES["clang-bits"] = function () {
  return cFrames([
    cDuo({ title: "logical and", sub: "yes or no", cls: "blue" }, { title: "bitwise AND", sub: "mixes two patterns", cls: "green" }),
    bitCells(["0", "0", "0", "0", "1", "0", "0", "0"], 80, 110, 70) + cNote("1 shifted left by 3. Only bit 3 is set."),
    box(160, 100, 480, 110, "copper") + tx(400, 145, "shift by 32", "h", "text-anchor=\"middle\"") + tx(400, 178, "not defined for a 32-bit value", "s", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "green") + tx(400, 145, "unsigned left by 1", "h", "text-anchor=\"middle\"") + tx(400, 178, "multiply by 2, until a bit falls off", "s", "text-anchor=\"middle\"")
  ]);
};

SCENES["clang-promote"] = function () {
  return cFrames([
    box(160, 100, 480, 110) + tx(400, 145, "uint8_t becomes int", "h", "text-anchor=\"middle\"") + tx(400, 178, "before most operators", "s", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "copper") + tx(400, 145, "~ of a wide int", "h", "text-anchor=\"middle\"") + tx(400, 178, "high bits are set", "s", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "green") + tx(400, 145, "cast back to uint8_t", "h", "text-anchor=\"middle\"") + tx(400, 178, "the low 8 bits are 0xFE", "s", "text-anchor=\"middle\""),
    cDuo({ title: "~a == 0xFE", sub: "false", cls: "copper" }, { title: "(uint8_t)~a", sub: "0xFE", cls: "green" })
  ]);
};

SCENES["clang-if"] = function () {
  return cFrames([
    box(160, 100, 480, 110, "green") + tx(400, 145, "condition not zero", "h", "text-anchor=\"middle\"") + tx(400, 178, "the next statement runs", "s", "text-anchor=\"middle\""),
    cDuo({ title: "if", sub: "sample over the limit", cls: "copper" }, { title: "else", sub: "otherwise run", cls: "green" }),
    box(200, 70, 400, 200) + tx(400, 120, "if (ok)", "m", "text-anchor=\"middle\"") + tx(400, 160, "{", "m", "text-anchor=\"middle\"") + tx(400, 200, "both lines belong", "s", "text-anchor=\"middle\"") + tx(400, 235, "}", "m", "text-anchor=\"middle\""),
    cNote("Set a value on every path that needs it later.")
  ]);
};

SCENES["clang-switch"] = function () {
  return cFrames([
    box(80, 80, 180, 70, "green") + tx(170, 122, "IDLE", "m", "text-anchor=\"middle\"") +
      box(310, 80, 180, 70) + tx(400, 122, "RUN", "m", "text-anchor=\"middle\"") +
      box(540, 80, 180, 70) + tx(630, 122, "default", "m", "text-anchor=\"middle\"") +
      cNote("switch jumps to the matching constant."),
    box(160, 100, 480, 110, "copper") + tx(400, 145, "no break", "h", "text-anchor=\"middle\"") + tx(400, 178, "the next case runs too", "s", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "green") + tx(400, 145, "break", "h", "text-anchor=\"middle\"") + tx(400, 178, "leave the switch", "s", "text-anchor=\"middle\""),
    cDuo({ title: "case 2", sub: "a constant", cls: "green" }, { title: "a range", sub: "use if instead", cls: "" })
  ]);
};

SCENES["clang-loops"] = function () {
  return cFrames([
    box(160, 100, 480, 110) + tx(400, 145, "while", "h", "text-anchor=\"middle\"") + tx(400, 178, "test first. Zero means skip.", "s", "text-anchor=\"middle\""),
    box(60, 120, 150, 70) + tx(135, 162, "i = 0", "m", "text-anchor=\"middle\"") +
      box(230, 120, 150, 70, "green") + tx(305, 162, "i < 4", "m", "text-anchor=\"middle\"") +
      box(400, 120, 150, 70) + tx(475, 162, "body", "m", "text-anchor=\"middle\"") +
      box(570, 120, 160, 70, "blue") + tx(650, 162, "i++", "m", "text-anchor=\"middle\""),
    box(160, 100, 480, 110) + tx(400, 145, "do", "h", "text-anchor=\"middle\"") + tx(400, 178, "body once, then the test", "s", "text-anchor=\"middle\""),
    box(200, 110, 400, 90, "green") + tx(400, 162, "for (;;)", "h", "text-anchor=\"middle\"")
  ]);
};

SCENES["clang-jump"] = function () {
  return cFrames([
    box(160, 100, 480, 110, "copper") + tx(400, 145, "break", "h", "text-anchor=\"middle\"") + tx(400, 178, "leaves the loop, not the function", "s", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "blue") + tx(400, 145, "continue", "h", "text-anchor=\"middle\"") + tx(400, 178, "next pass. The for update still runs.", "tiny", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "green") + tx(400, 145, "return sum", "h", "text-anchor=\"middle\"") + tx(400, 178, "leaves the function now", "s", "text-anchor=\"middle\""),
    cNote("A cleanup that must always run should have one path to it.")
  ]);
};

SCENES["clang-call"] = function () {
  return cFrames([
    box(160, 100, 480, 110, "green") + tx(400, 145, "scale(raw)", "h", "text-anchor=\"middle\"") + tx(400, 178, "name, argument, return type", "s", "text-anchor=\"middle\""),
    cDuo({ title: "caller raw", sub: "unchanged", cls: "green" }, { title: "parameter", sub: "a separate copy", cls: "blue" }),
    box(160, 100, 480, 110) + tx(400, 145, "return", "h", "text-anchor=\"middle\"") + tx(400, 178, "the call becomes that value", "s", "text-anchor=\"middle\""),
    box(80, 110, 250, 90) + tx(205, 162, "uint8_t *flags", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 330 155 L 430 155\" marker-end=\"url(#ah)\"></path>" +
      box(440, 110, 280, 90, "green") + tx(580, 162, "*flags = 1", "m", "text-anchor=\"middle\"")
  ]);
};

SCENES["clang-header"] = function () {
  return cFrames([
    box(160, 100, 480, 110) + tx(400, 145, "uint16_t adc_read(void);", "h", "text-anchor=\"middle\"") + tx(400, 178, "a promise, no body", "s", "text-anchor=\"middle\""),
    box(48, 100, 220, 120, "green") + tx(158, 150, "adc.h", "h", "text-anchor=\"middle\"") + tx(158, 180, "included by both", "tiny", "text-anchor=\"middle\"") +
      box(300, 100, 200, 120) + tx(400, 165, "adc.c", "m", "text-anchor=\"middle\"") +
      box(530, 100, 220, 120) + tx(640, 165, "control.c", "m", "text-anchor=\"middle\""),
    box(160, 90, 480, 130, "blue") + tx(400, 145, "#ifndef ADC_H", "h", "text-anchor=\"middle\"") + tx(400, 180, "second include is skipped", "s", "text-anchor=\"middle\""),
    cDuo({ title: "same header", sub: "types are checked", cls: "green" }, { title: "two stories", sub: "the link may still succeed", cls: "copper" })
  ]);
};

SCENES["clang-scope"] = function () {
  return cFrames([
    box(180, 70, 440, 190, "green") + tx(400, 130, "{", "h", "text-anchor=\"middle\"") + tx(400, 175, "int n;", "m", "text-anchor=\"middle\"") + tx(400, 215, "}", "h", "text-anchor=\"middle\""),
    cDuo({ title: "static in the file", sub: "other files cannot see it", cls: "green" }, { title: "no static", sub: "extern can name it", cls: "" }),
    box(160, 100, 480, 110, "copper") + tx(400, 145, "inner name wins", "h", "text-anchor=\"middle\"") + tx(400, 178, "easy to misread. Pick another name.", "s", "text-anchor=\"middle\""),
    cDuo({ title: "static local", sub: "hidden, but it survives", cls: "blue" }, { title: "automatic local", sub: "gone when the call returns", cls: "" })
  ]);
};

SCENES["clang-array"] = function () {
  return cFrames([
    bitCells(["10", "20", "30", "40"], 140, 110, 110) + cNote("Indexes 0, 1, 2, and 3."),
    box(160, 100, 480, 110, "copper") + tx(400, 145, "buf[4]", "h", "text-anchor=\"middle\"") + tx(400, 178, "past the end. C does not check.", "s", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "green") + tx(400, 145, "buf becomes a pointer", "h", "text-anchor=\"middle\"") + tx(400, 178, "the function does not get the length", "s", "text-anchor=\"middle\""),
    cDuo({ title: "sizeof buf", sub: "4, the whole row", cls: "green" }, { title: "sizeof pointer", sub: "4, the address only", cls: "blue" })
  ]);
};

SCENES["clang-struct"] = function () {
  return cFrames([
    box(120, 100, 560, 110, "green") + tx(200, 162, "id", "m", "text-anchor=\"middle\"") + tx(480, 162, "value", "m", "text-anchor=\"middle\""),
    box(80, 130, 80, 70, "green") + tx(120, 172, "id", "s", "text-anchor=\"middle\"") +
      box(170, 130, 180, 70) + tx(260, 172, "pad", "s", "text-anchor=\"middle\"") +
      box(360, 130, 280, 70, "blue") + tx(500, 172, "value", "m", "text-anchor=\"middle\"") +
      cNote("The word wants a 4-byte boundary."),
    box(160, 100, 480, 110) + tx(400, 145, "sizeof is 8", "h", "text-anchor=\"middle\"") + tx(400, 178, "not 1 + 4", "s", "text-anchor=\"middle\""),
    cDuo({ title: "memory layout", sub: "padding included", cls: "green" }, { title: "wire format", sub: "copy the bytes yourself", cls: "copper" })
  ]);
};

SCENES["clang-union"] = function () {
  return cFrames([
    box(200, 90, 400, 140, "green") + tx(400, 145, "one object", "h", "text-anchor=\"middle\"") + tx(400, 180, "as large as the biggest member", "s", "text-anchor=\"middle\""),
    cDuo({ title: "uint16_t all", sub: "one reading", cls: "green" }, { title: "two bytes", sub: "the same address", cls: "blue" }),
    box(160, 100, 480, 110) + tx(400, 145, "low byte first", "h", "text-anchor=\"middle\"") + tx(400, 178, "Cortex-M is little-endian", "s", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "blue") + tx(400, 145, "typedef sample_t", "h", "text-anchor=\"middle\"") + tx(400, 178, "a new name, not a new kind of value", "s", "text-anchor=\"middle\"")
  ]);
};

SCENES["clang-macro"] = function () {
  return cFrames([
    box(80, 120, 250, 80) + tx(205, 168, "SAMPLES", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 330 160 L 430 160\" marker-end=\"url(#ah)\"></path>" +
      box(440, 120, 250, 80, "green") + tx(565, 168, "8", "h", "text-anchor=\"middle\""),
    box(120, 100, 560, 110, "copper") + tx(400, 145, "1 + 1 * 3", "h", "text-anchor=\"middle\"") + tx(400, 178, "the paste forgot the parentheses", "s", "text-anchor=\"middle\""),
    box(160, 100, 480, 110, "green") + tx(400, 145, "static inline", "h", "text-anchor=\"middle\"") + tx(400, 178, "typed, and the argument runs once", "s", "text-anchor=\"middle\""),
    cDuo({ title: "guard, ifdef", sub: "a macro is right", cls: "green" }, { title: "a scale factor", sub: "use const", cls: "blue" })
  ]);
};

SCENES["clang-ptr"] = function () {
  return cFrames([
    box(48, 110, 250, 100) + tx(173, 155, "sample", "m", "text-anchor=\"middle\"") + tx(173, 182, "the object", "s", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 298 160 L 420 160\" marker-end=\"url(#ah)\"></path>" +
      box(430, 110, 300, 100, "green") + tx(580, 155, "p = &sample", "m", "text-anchor=\"middle\"") + tx(580, 182, "the address", "s", "text-anchor=\"middle\""),
    box(200, 100, 400, 110, "green") + tx(400, 150, "*p = 34", "h", "text-anchor=\"middle\"") + tx(400, 180, "writes sample", "s", "text-anchor=\"middle\""),
    box(80, 140, 140, 60) + tx(150, 176, "byte 0", "s", "text-anchor=\"middle\"") +
      box(230, 140, 140, 60) + tx(300, 176, "byte 1", "s", "text-anchor=\"middle\"") +
      box(380, 140, 140, 60, "green") + tx(450, 176, "byte 2", "s", "text-anchor=\"middle\"") +
      box(530, 140, 140, 60, "green") + tx(600, 176, "byte 3", "s", "text-anchor=\"middle\"") +
      cNote("A uint32_t pointer plus 1 skips four bytes."),
    cDuo({ title: "const uint16_t *", sub: "cannot write the object", cls: "green" }, { title: "uint16_t *const", sub: "cannot change the pointer", cls: "blue" })
  ]);
};
