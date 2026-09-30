SCENES["risc-cisc"] = function () {
  return board(
    "<g " + vis(0, 0) + " " + hot("0") + ">" +
    box(48, 70, 700, 200) +
    tx(80, 120, "CISC", "h") +
    tx(80, 170, "one long instruction", "m") +
    tx(80, 210, "add  memory, memory", "s") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 70, 220, 90) + tx(158, 115, "load", "m", "text-anchor=\"middle\"") +
    box(290, 70, 220, 90, "green") + tx(400, 115, "add", "m", "text-anchor=\"middle\"") +
    box(532, 70, 220, 90) + tx(642, 115, "store", "m", "text-anchor=\"middle\"") +
    tx(48, 210, "RISC: several small, regular instructions", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 80, 320, 160, "green") + tx(208, 140, "simpler core", "h", "text-anchor=\"middle\"") + tx(208, 176, "easier to pipeline", "s", "text-anchor=\"middle\"") +
    box(420, 80, 330, 160) + tx(585, 140, "smarter compiler", "h", "text-anchor=\"middle\"") + tx(585, 176, "more instructions", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 70, 700, 80, "blue") + tx(398, 110, "Inside, a CISC chip may split big instructions", "s", "text-anchor=\"middle\"") +
    box(48, 180, 700, 80, "copper") + tx(398, 220, "A RISC chip may still have a few hefty ones", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["load-store"] = function () {
  return board(
    box(300, 40, 200, 70, "green") + tx(400, 75, "ALU", "h", "text-anchor=\"middle\"") +
    box(40, 180, 140, 56) + tx(110, 208, "R0", "m", "text-anchor=\"middle\"") +
    box(200, 180, 140, 56) + tx(270, 208, "R1", "m", "text-anchor=\"middle\"") +
    box(460, 180, 140, 56) + tx(530, 208, "R2", "m", "text-anchor=\"middle\"") +
    box(250, 320, 300, 70, "blue") + tx(400, 355, "RAM", "h", "text-anchor=\"middle\"") +
    "<g " + vis(1) + ">" +
    "<path class=\"wire green\" d=\"M 400 390 L 400 250\" marker-end=\"url(#ah)\"></path>" +
    tx(420, 300, "LDR", "s") +
    "</g>" +
    "<g " + vis(2) + ">" +
    "<path class=\"wire\" d=\"M 180 180 L 340 110\"></path>" +
    "<path class=\"wire\" d=\"M 270 180 L 400 110\"></path>" +
    "<path class=\"wire green\" d=\"M 460 110 L 530 180\" marker-end=\"url(#ah)\"></path>" +
    tx(48, 280, "add writes a register, not RAM", "m") +
    "</g>" +
    "<g " + vis(3) + ">" +
    "<path class=\"wire copper\" d=\"M 530 236 L 500 320\" marker-end=\"url(#ah)\"></path>" +
    tx(560, 280, "STR", "s") +
    "</g>"
  );
};

SCENES["cortex-family"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 80, 300, 140) + tx(198, 140, "Cortex-M", "h", "text-anchor=\"middle\"") + tx(198, 172, "microcontroller", "s", "text-anchor=\"middle\"") +
    box(420, 80, 300, 140, "blue") + tx(570, 140, "Cortex-A", "h", "text-anchor=\"middle\"") + tx(570, 172, "phones and Linux", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + " " + hot("1") + ">" + box(48, 100, 680, 120) + tx(388, 150, "M0 and M0+", "h", "text-anchor=\"middle\"") + tx(388, 184, "small Thumb, no hardware divide", "s", "text-anchor=\"middle\"") + "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 80, 320, 140) + tx(208, 140, "M3", "h", "text-anchor=\"middle\"") + tx(208, 172, "Thumb-2 and divide", "s", "text-anchor=\"middle\"") +
    box(420, 80, 320, 140, "green") + tx(580, 130, "M4 / M4F", "h", "text-anchor=\"middle\"") + tx(580, 164, "DSP, and float if F", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3, 3) + ">" +
    box(48, 80, 320, 140, "copper") + tx(208, 140, "M7", "h", "text-anchor=\"middle\"") + tx(208, 172, "longer pipeline", "s", "text-anchor=\"middle\"") +
    box(420, 80, 320, 140, "blue") + tx(580, 130, "M23 / M33", "h", "text-anchor=\"middle\"") + tx(580, 164, "TrustZone-M", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(4) + ">" +
    tx(48, 70, "Pick from the job, then check the datasheet.", "m") +
    box(48, 120, 200, 80) + tx(148, 160, "button", "m", "text-anchor=\"middle\"") +
    box(290, 120, 200, 80, "green") + tx(390, 160, "motor loop", "m", "text-anchor=\"middle\"") +
    box(530, 120, 210, 80, "blue") + tx(635, 160, "M4F?", "m", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["arm-registers"] = function () {
  const rows = [
    ["R0 to R12", "working values", "0"],
    ["R13 SP", "stack grows down", "1"],
    ["R14 LR", "return address", "2"],
    ["R15 PC", "fetch address", "2"],
    ["xPSR", "flags", "3"]
  ];
  return board(
    rows.map(function (row, i) {
      return "<g " + hot(row[2]) + ">" +
        box(40, 36 + i * 70, 280, 58) +
        tx(56, 65 + i * 70, row[0], "m") +
        tx(360, 65 + i * 70, row[1], "s") +
        "</g>";
    }).join("") +
    "<g " + vis(4) + ">" + tx(360, 400, "C assigns them. You meet them in a fault.", "m") + "</g>" +
    "<g " + vis(1, 1) + ">" + tx(520, 120, "MSP and PSP", "m") + "</g>"
  );
};

SCENES["thumb-isa"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 80, 280, 70) + tx(220, 115, "32-bit ARM", "m", "text-anchor=\"middle\"") +
    box(420, 80, 140, 70, "green") + tx(490, 115, "16-bit", "m", "text-anchor=\"middle\"") +
    tx(80, 200, "Thumb packs the common cases.", "m") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 90, 120, 70, "green") + box(180, 90, 240, 70) + box(440, 90, 120, 70, "green") + box(580, 90, 160, 70) +
    tx(400, 210, "16 and 32 mixed. The first bits say which.", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(120, 90, 560, 120, "green") + tx(400, 150, "Cortex-M runs Thumb only", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 80, 250, 90, "copper") + tx(205, 125, "even address", "m", "text-anchor=\"middle\"") + tx(205, 150, "fault", "s", "text-anchor=\"middle\"") +
    box(430, 80, 250, 90, "green") + tx(555, 125, "odd address", "m", "text-anchor=\"middle\"") + tx(555, 150, "Thumb marker", "s", "text-anchor=\"middle\"") +
    tx(80, 230, "The bottom bit is a flag, not a real extra address.", "m") +
    "</g>"
  );
};

SCENES["arm-pipeline"] = function () {
  return board(
    "<circle class=\"greendot token\" cx=\"148\" cy=\"78\" r=\"9\"></circle>" +
    "<g " + hot("0") + ">" + box(48, 100, 200, 90) + tx(148, 145, "Fetch", "h", "text-anchor=\"middle\"") + "</g>" +
    "<g " + hot("1") + ">" + box(300, 100, 200, 90) + tx(400, 145, "Decode", "h", "text-anchor=\"middle\"") + "</g>" +
    "<g " + hot("2") + ">" + box(552, 100, 200, 90) + tx(652, 145, "Execute", "h", "text-anchor=\"middle\"") + "</g>" +
    "<g " + vis(3, 3) + ">" +
    box(48, 240, 700, 80, "copper") + tx(398, 280, "A branch throws away the wrong-path fetch", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(4) + ">" +
    box(48, 240, 700, 100) + tx(398, 278, "Flash wait", "h", "text-anchor=\"middle\"") + tx(398, 308, "A one-cycle instruction still stalls if the fetch does", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["arm-call"] = function () {
  return board(
    "<g " + hot("0") + ">" + box(40, 36, 160, 64) + tx(120, 68, "BL", "h", "text-anchor=\"middle\"") + "</g>" +
    "<g " + hot("1") + ">" +
    box(230, 36, 100, 64, "green") + tx(280, 68, "R0", "m", "text-anchor=\"middle\"") +
    box(342, 36, 100, 64) + tx(392, 68, "R1", "m", "text-anchor=\"middle\"") +
    box(454, 36, 100, 64) + tx(504, 68, "R2", "m", "text-anchor=\"middle\"") +
    box(566, 36, 100, 64) + tx(616, 68, "R3", "m", "text-anchor=\"middle\"") +
    "</g>" +
    box(690, 36, 70, 64, "blue") + tx(725, 68, "+5", "s", "text-anchor=\"middle\"") +
    "<g " + hot("2") + ">" +
    box(40, 150, 340, 80) + tx(210, 190, "R4 to R11 saved", "m", "text-anchor=\"middle\"") +
    box(420, 150, 340, 80, "copper") + tx(590, 190, "R0 to R3 scratch", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3, 3) + ">" + box(40, 270, 720, 70, "blue") + tx(400, 305, "Stack aligned to 8 bytes at the call", "m", "text-anchor=\"middle\"") + "</g>" +
    "<g " + vis(4) + ">" + box(40, 270, 720, 90, "green") + tx(400, 305, "Look at R0 first", "h", "text-anchor=\"middle\"") + tx(400, 334, "The fifth argument is on the stack", "s", "text-anchor=\"middle\"") + "</g>"
  );
};

SCENES["arm-exception"] = function () {
  const vectors = ["stack", "reset", "NMI", "fault", "IRQ"];
  return board(
    vectors.map(function (name, i) {
      return "<g " + hot(i < 2 ? "0" : "1") + ">" +
        box(36, 30 + i * 52, 180, 44) +
        tx(126, 52 + i * 52, name, "s", "text-anchor=\"middle\"") +
        "</g>";
    }).join("") +
    "<g " + vis(2) + ">" +
    ["R0", "R1", "R2", "R3", "R12", "LR", "PC", "PSR"].map(function (name, i) {
      const col = i % 4;
      const row = Math.floor(i / 4);
      return box(250 + col * 130, 40 + row * 80, 116, 60, "green") +
        tx(308 + col * 130, 70 + row * 80, name, "s", "text-anchor=\"middle\"");
    }).join("") +
    tx(250, 230, "Hardware pushes this frame", "m") +
    "</g>" +
    "<g " + vis(3, 3) + ">" + box(250, 270, 500, 70, "copper") + tx(500, 305, "Return through a special LR code", "s", "text-anchor=\"middle\"") + "</g>" +
    "<g " + vis(4) + ">" + box(250, 270, 500, 80, "blue") + tx(500, 300, "Tail-chain", "h", "text-anchor=\"middle\"") + tx(500, 326, "skip the pop and the next push", "s", "text-anchor=\"middle\"") + "</g>"
  );
};

SCENES["arm-map"] = function () {
  const bands = [
    ["0x00000000", "code", "0"],
    ["0x20000000", "SRAM", "0"],
    ["0x40000000", "peripherals", "0"],
    ["0xE0000000", "NVIC and SysTick", "0"]
  ];
  return board(
    bands.map(function (band, i) {
      return box(40, 28 + i * 58, 430, 48) +
        tx(56, 52 + i * 58, band[0], "s") +
        tx(250, 52 + i * 58, band[1], "m");
    }).join("") +
    "<g " + vis(2) + " " + hot("2,3") + ">" +
    box(500, 28, 260, 70, "green") + tx(630, 54, "priority 0", "m", "text-anchor=\"middle\"") + tx(630, 76, "runs first", "tiny", "text-anchor=\"middle\"") +
    box(500, 114, 260, 70) + tx(630, 149, "priority 5", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3, 3) + ">" + tx(40, 290, "Low priority bits may not exist. They read as zero.", "m") + "</g>" +
    "<g " + vis(4) + ">" +
    box(40, 280, 300, 70) + tx(190, 315, "PRIMASK", "m", "text-anchor=\"middle\"") +
    box(380, 280, 370, 70, "blue") + tx(565, 315, "MPU: regions, not pages", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["big-o-embedded"] = function () {
  return board(
    "<g " + hot("0") + ">" + box(40, 50, 220, 200) + tx(150, 90, "constant", "h", "text-anchor=\"middle\"") + tx(150, 140, "1 slot", "s", "text-anchor=\"middle\"") + tx(150, 170, "same cost", "s", "text-anchor=\"middle\"") + "</g>" +
    "<g " + hot("1") + ">" + box(290, 50, 220, 200) + tx(400, 90, "linear", "h", "text-anchor=\"middle\"") + tx(400, 140, "8 items, 8 steps", "s", "text-anchor=\"middle\"") + tx(400, 170, "80 items, 80", "s", "text-anchor=\"middle\"") + "</g>" +
    "<g " + hot("2") + ">" + box(540, 50, 220, 200, "green") + tx(650, 90, "log", "h", "text-anchor=\"middle\"") + tx(650, 140, "8 items, ~3", "s", "text-anchor=\"middle\"") + tx(650, 170, "1000 items, ~10", "s", "text-anchor=\"middle\"") + "</g>" +
    "<g " + vis(3) + ">" + box(40, 290, 720, 90, "copper") + tx(400, 335, "Every item against every other item blows up", "m", "text-anchor=\"middle\"") + "</g>"
  );
};

SCENES["arrays-embed"] = function () {
  const cells = [0, 1, 2, 3, 4, 5].map(function (i) {
    return box(40 + i * 120, 80, 100, 70) + tx(90 + i * 120, 115, String(i), "h", "text-anchor=\"middle\"");
  }).join("");
  return board(
    cells +
    "<g " + vis(0) + ">" + tx(40, 190, "address = base + index x width", "m") + "</g>" +
    "<g " + vis(1, 1) + " " + hot("1") + ">" + box(40, 80, 100, 70) + box(640, 80, 100, 70) + tx(40, 230, "First and last cost the same", "m") + "</g>" +
    "<g " + vis(2, 2) + ">" +
    "<path class=\"wire copper\" d=\"M 280 80 L 400 40\" marker-end=\"url(#ah)\"></path>" +
    tx(40, 230, "Insert in the middle: everyone to the right shifts", "m") +
    "</g>" +
    "<g " + vis(3) + ">" + box(40, 280, 720, 80, "copper") + tx(400, 320, "Past the length: you smash the next variable", "m", "text-anchor=\"middle\"") + "</g>"
  );
};

SCENES["ring-buffer"] = function () {
  const cells = [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) {
    const mark = i < 3 ? " " + hot("1") : "";
    return "<g" + mark + ">" + box(36 + i * 94, 110, 84, 64) + tx(78 + i * 94, 142, String(i), "s", "text-anchor=\"middle\"") + "</g>";
  }).join("");
  return board(
    cells +
    "<g " + vis(1, 2) + ">" +
    tx(78, 86, "T", "m", "text-anchor=\"middle\"") +
    tx(360, 86, "H", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(0, 0) + ">" + tx(40, 200, "Queue: first in, first out. Stack: same end.", "m") + "</g>" +
    "<g " + vis(2, 2) + ">" + tx(40, 200, "Empty if head equals tail. Do not use that test for full.", "m") + "</g>" +
    "<g " + vis(3, 3) + ">" + box(36, 190, 720, 70, "copper") + tx(396, 225, "Leave one slot empty, or keep a counter", "s", "text-anchor=\"middle\"") + "</g>" +
    "<g " + vis(4) + ">" + box(36, 190, 720, 80, "blue") + tx(396, 220, "size 8, 16, 32", "h", "text-anchor=\"middle\"") + tx(396, 246, "wrap with AND, not divide", "s", "text-anchor=\"middle\"") + "</g>"
  );
};

SCENES["lists-pools"] = function () {
  return board(
    "<g " + vis(0, 1) + ">" +
    box(40, 60, 140, 70) + tx(110, 95, "A", "h", "text-anchor=\"middle\"") +
    box(240, 60, 140, 70) + tx(310, 95, "B", "h", "text-anchor=\"middle\"") +
    box(440, 60, 140, 70) + tx(510, 95, "C", "h", "text-anchor=\"middle\"") +
    "<path class=\"wire\" d=\"M 180 95 H 240\" marker-end=\"url(#ah)\"></path>" +
    "<path class=\"wire\" d=\"M 380 95 H 440\" marker-end=\"url(#ah)\"></path>" +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(40, 80, 80, 50, "copper") + box(140, 120, 120, 40, "copper") + box(300, 70, 60, 70, "copper") + box(400, 140, 160, 36) +
    tx(40, 230, "Free bytes that do not fit the next request", "m") +
    "</g>" +
    "<g " + vis(3) + ">" +
    [0, 1, 2, 3, 4, 5].map(function (i) {
      return box(40 + i * 120, 70, 100, 70, i === 0 ? "green" : "") + tx(90 + i * 120, 105, "slot", "s", "text-anchor=\"middle\"");
    }).join("") +
    tx(40, 180, "Every hole is the same size, so the next request fits.", "m") +
    "</g>" +
    "<g " + vis(4) + ">" + tx(40, 280, "Link by index inside one array. Skip malloc.", "m") + "</g>"
  );
};

SCENES["search-algs"] = function () {
  const vals = ["3", "8", "12", "19", "21", "30", "44", "50"];
  const row = vals.map(function (v, i) {
    const hotFrames = i === 3 ? "2" : i === 5 ? "3" : "";
    const mark = hotFrames ? " " + hot(hotFrames) : "";
    return "<g" + mark + ">" + box(28 + i * 96, 70, 88, 64) + tx(72 + i * 96, 102, v, "m", "text-anchor=\"middle\"") + "</g>";
  }).join("");
  return board(
    "<g " + vis(0, 0) + ">" + tx(40, 160, "Linear: check 3, then 8, then 12, until the end.", "m") + "</g>" +
    "<g " + vis(1, 3) + ">" + row + "</g>" +
    "<g " + vis(2, 2) + ">" + tx(40, 180, "Middle is 19. 30 is larger. Drop the left half.", "m") + "</g>" +
    "<g " + vis(3, 3) + ">" + tx(40, 180, "Next middle is 30. Found.", "m") + "</g>" +
    "<g " + vis(4) + ">" +
    box(40, 200, 80, 56) + tx(80, 228, "4", "m", "text-anchor=\"middle\"") +
    box(140, 200, 80, 56) + tx(180, 228, "1", "m", "text-anchor=\"middle\"") +
    box(240, 200, 80, 56) + tx(280, 228, "3", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire\" d=\"M 360 228 H 460\" marker-end=\"url(#ah)\"></path>" +
    box(480, 200, 70, 56, "green") + tx(515, 228, "1", "m", "text-anchor=\"middle\"") +
    box(560, 200, 70, 56) + tx(595, 228, "3", "m", "text-anchor=\"middle\"") +
    box(640, 200, 70, 56) + tx(675, 228, "4", "m", "text-anchor=\"middle\"") +
    tx(40, 300, "Insertion sort: slide the next item back until it fits.", "m") +
    "</g>"
  );
};

SCENES["lookup-avg"] = function () {
  return board(
    "<g " + vis(0, 1) + ">" +
    [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) {
      const h = 40 + (i % 4) * 18;
      return box(40 + i * 90, 160 - h, 70, h, "blue");
    }).join("") +
    tx(40, 200, "Index in. Value out.", "m") +
    "</g>" +
    "<g " + vis(2) + ">" +
    box(40, 60, 80, 60) + tx(80, 90, "2", "m", "text-anchor=\"middle\"") +
    box(140, 60, 80, 60) + tx(180, 90, "4", "m", "text-anchor=\"middle\"") +
    box(240, 60, 80, 60) + tx(280, 90, "6", "m", "text-anchor=\"middle\"") +
    box(340, 60, 80, 60) + tx(380, 90, "8", "m", "text-anchor=\"middle\"") +
    tx(460, 90, "sum 20", "m") +
    "</g>" +
    "<g " + vis(3, 3) + ">" +
    box(40, 160, 80, 60, "copper") + tx(80, 190, "2", "m", "text-anchor=\"middle\"") +
    box(140, 160, 80, 60) + tx(180, 190, "4", "m", "text-anchor=\"middle\"") +
    box(240, 160, 80, 60) + tx(280, 190, "6", "m", "text-anchor=\"middle\"") +
    box(340, 160, 80, 60) + tx(380, 190, "8", "m", "text-anchor=\"middle\"") +
    box(460, 160, 80, 60, "green") + tx(500, 190, "10", "m", "text-anchor=\"middle\"") +
    tx(560, 190, "sum 28", "m") +
    "</g>" +
    "<g " + vis(4) + ">" + box(40, 250, 700, 80, "copper") + tx(390, 290, "Smooth, and late. A huge N lags the loop.", "m", "text-anchor=\"middle\"") + "</g>"
  );
};

SCENES["fixed-point"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 80, 300, 120) + tx(198, 130, "software float", "h", "text-anchor=\"middle\"") + tx(198, 162, "slow on M0", "s", "text-anchor=\"middle\"") +
    box(420, 80, 300, 120, "green") + tx(570, 130, "Q15 integer", "h", "text-anchor=\"middle\"") + tx(570, 162, "a fixed dot", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 90, 640, 120, "blue") +
    tx(400, 140, "16384  means  1/2", "h", "text-anchor=\"middle\"") +
    tx(400, 176, "value = integer / 32768", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    tx(60, 80, "16384", "h") + tx(220, 80, "x", "h") + tx(280, 80, "16384", "h") +
    tx(60, 150, "shift right 15", "m") +
    box(60, 190, 280, 80, "green") + tx(200, 230, "8192 = 1/4", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3, 3) + ">" + box(60, 80, 680, 100, "copper") + tx(400, 130, "Same Q format before you add", "h", "text-anchor=\"middle\"") + "</g>" +
    "<g " + vis(4) + ">" + box(60, 80, 680, 120) + tx(400, 130, "Wrap becomes a huge negative", "h", "text-anchor=\"middle\"") + tx(400, 164, "Saturate, or check the range", "s", "text-anchor=\"middle\"") + "</g>"
  );
};

SCENES["crc-check"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 80, 300, 100) + tx(198, 130, "plain sum", "h", "text-anchor=\"middle\"") +
    box(420, 80, 300, 100, "green") + tx(570, 130, "CRC", "h", "text-anchor=\"middle\"") +
    tx(48, 230, "A sum can miss a swap. A CRC catches more patterns.", "m") +
    "</g>" +
    "<g " + vis(1, 2) + ">" +
    box(80, 90, 70, 70) + box(160, 90, 70, 70) + box(240, 90, 70, 70) + box(320, 90, 70, 70, "green") +
    tx(440, 125, "shift", "m") +
    "<path class=\"wire\" d=\"M 400 125 H 520\" marker-end=\"url(#ah)\"></path>" +
    "</g>" +
    "<g " + vis(2, 2) + ">" + box(80, 200, 560, 70, "copper") + tx(360, 235, "If a 1 falls out, XOR the polynomial", "s", "text-anchor=\"middle\"") + "</g>" +
    "<g " + vis(3, 3) + ">" + box(80, 80, 640, 140, "blue") + tx(400, 140, "Same width. Same polynomial.", "h", "text-anchor=\"middle\"") + tx(400, 176, "Same start value and final flip.", "s", "text-anchor=\"middle\"") + "</g>" +
    "<g " + vis(4) + ">" +
    box(80, 80, 250, 100) + tx(205, 130, "bit by bit", "m", "text-anchor=\"middle\"") +
    box(400, 80, 300, 100, "green") + tx(550, 120, "256-entry table", "m", "text-anchor=\"middle\"") + tx(550, 148, "one XOR per byte", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["bits-and-states"] = function () {
  return board(
    "<g " + vis(0, 1) + ">" +
    ["1", "0", "1", "1", "0", "0", "0", "0"].map(function (bit, i) {
      return "<g transform=\"translate(" + (40 + i * 70) + " 50)\">" +
        "<rect class=\"bit" + (bit === "1" ? " one" : "") + "\" width=\"60\" height=\"50\" rx=\"8\"></rect>" +
        tx(30, 25, bit, "m", "text-anchor=\"middle\"") + "</g>";
    }).join("") +
    "</g>" +
    "<g " + vis(0, 0) + ">" + tx(40, 150, "OR sets. AND with inverse clears. XOR toggles.", "m") + "</g>" +
    "<g " + vis(1, 1) + ">" + tx(40, 150, "Shift, mask, shift back. Neighbors stay.", "m") + "</g>" +
    "<g " + vis(2, 2) + ">" + box(40, 140, 700, 80, "blue") + tx(390, 180, "CLZ on M3 and up. Bit-band only if the datasheet says so.", "s", "text-anchor=\"middle\"") + "</g>" +
    "<g " + vis(3) + ">" +
    box(40, 200, 160, 50) + tx(120, 225, "IDLE", "s", "text-anchor=\"middle\"") +
    box(210, 200, 160, 50) + tx(290, 225, "press", "s", "text-anchor=\"middle\"") +
    box(380, 200, 160, 50, "green") + tx(460, 225, "RUN", "s", "text-anchor=\"middle\"") +
    box(550, 200, 200, 50) + tx(650, 225, "start motor", "s", "text-anchor=\"middle\"") +
    tx(40, 280, "state, event, next, action", "m") +
    "</g>" +
    "<g " + vis(4) + ">" + tx(40, 330, "The table lives in flash. Ignored events need a row too.", "m") + "</g>"
  );
};
