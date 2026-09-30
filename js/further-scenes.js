SCENES["thread-mode"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 160, "copper") + tx(220, 150, "Handler", "h", "text-anchor=\"middle\"") + tx(220, 186, "always MSP", "m", "text-anchor=\"middle\"") +
    box(440, 90, 280, 160) + tx(580, 150, "exception", "m", "text-anchor=\"middle\"") + tx(580, 180, "uses this stack", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 70, 280, 130, "green") + tx(220, 120, "Thread", "h", "text-anchor=\"middle\"") + tx(220, 154, "main and tasks", "s", "text-anchor=\"middle\"") +
    box(440, 70, 140, 130) + tx(510, 130, "MSP", "m", "text-anchor=\"middle\"") +
    box(600, 70, 140, 130, "blue") + tx(670, 120, "PSP", "m", "text-anchor=\"middle\"") + tx(670, 148, "one per task", "tiny", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    tx(80, 70, "CONTROL bit 1, thread mode only", "m") +
    box(80, 110, 70, 70, "green") + tx(115, 145, "1", "h", "text-anchor=\"middle\"") + tx(80, 210, "set: PSP", "s") +
    box(180, 110, 70, 70) + tx(215, 145, "0", "h", "text-anchor=\"middle\"") + tx(180, 210, "clear: MSP", "s") +
    box(360, 110, 360, 90, "copper") + tx(540, 155, "Handler ignores this bit", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 280, 140) + tx(220, 145, "Bit 0 clear", "h", "text-anchor=\"middle\"") + tx(220, 180, "privileged thread", "s", "text-anchor=\"middle\"") +
    box(440, 90, 280, 140, "blue") + tx(580, 145, "Bit 0 set", "h", "text-anchor=\"middle\"") + tx(580, 180, "unprivileged thread", "s", "text-anchor=\"middle\"") +
    tx(80, 280, "Handler mode stays privileged.", "m") +
    "</g>"
  );
};

SCENES["pendsv"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 100, 250, 120, "copper") + tx(205, 155, "SysTick", "h", "text-anchor=\"middle\"") + tx(205, 186, "count, then leave", "s", "text-anchor=\"middle\"") +
    box(430, 100, 280, 120) + tx(570, 155, "devices wait", "m", "text-anchor=\"middle\"") + tx(570, 186, "if the tick switches", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 90, 250, 100) + tx(205, 140, "SysTick", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 330 140 L 430 140\" marker-end=\"url(#ah)\"></path>" +
    box(440, 90, 280, 100, "green") + tx(580, 130, "PendSV set", "h", "text-anchor=\"middle\"") + tx(580, 158, "lowest urgency", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(60, 80, 180, 80) + tx(150, 118, "UART done", "s", "text-anchor=\"middle\"") +
    box(280, 80, 180, 80) + tx(370, 118, "tick done", "s", "text-anchor=\"middle\"") +
    box(500, 80, 220, 80, "green") + tx(610, 118, "PendSV runs", "m", "text-anchor=\"middle\"") +
    tx(80, 230, "The switch happens after the urgent work.", "m") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(200, 80, 400, 160, "green") + tx(400, 145, "one switcher", "h", "text-anchor=\"middle\"") + tx(400, 180, "every request uses it", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["switch-save"] = function () {
  const hw = ["R0", "R1", "R2", "R3", "R12", "LR", "PC", "xPSR"];
  return board(
    "<g " + vis(0, 0) + ">" +
    tx(48, 50, "Hardware already stacked these", "m") +
    hw.map(function (name, i) {
      return box(36 + i * 94, 90, 84, 64, "blue") + tx(78 + i * 94, 122, name, "s", "text-anchor=\"middle\"");
    }).join("") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    tx(48, 50, "Software still has to stack these", "m") +
    ["R4", "R5", "R6", "R7", "R8", "R9", "R10", "R11"].map(function (name, i) {
      return box(36 + i * 94, 90, 84, 64, "green") + tx(78 + i * 94, 122, name, "s", "text-anchor=\"middle\"");
    }).join("") +
    tx(48, 200, "They survive a normal call, so the exception frame skipped them.", "s") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 80, 300, 120, "copper") + tx(198, 130, "bl sched_next", "h", "text-anchor=\"middle\"") + tx(198, 162, "overwrites LR", "s", "text-anchor=\"middle\"") +
    box(400, 80, 340, 120, "green") + tx(570, 130, "save LR too", "h", "text-anchor=\"middle\"") + tx(570, 162, "it holds EXC_RETURN", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 70, 160, 80) + tx(128, 108, "old PSP", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire\" d=\"M 208 110 L 300 110\" marker-end=\"url(#ah)\"></path>" +
    box(310, 70, 180, 80, "green") + tx(400, 108, "new PSP", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 490 110 L 560 110\" marker-end=\"url(#ah)\"></path>" +
    box(570, 70, 180, 80, "blue") + tx(660, 108, "bx lr", "m", "text-anchor=\"middle\"") +
    tx(48, 210, "Hardware then pops the new task's eight words.", "m") +
    "</g>"
  );
};

SCENES["lock-surprise"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 100, 200, 100, "copper") + tx(148, 145, "Low", "h", "text-anchor=\"middle\"") + tx(148, 172, "holds the lock", "s", "text-anchor=\"middle\"") +
    box(300, 100, 200, 100) + tx(400, 145, "buffer", "m", "text-anchor=\"middle\"") +
    box(552, 100, 200, 100) + tx(652, 145, "High", "h", "text-anchor=\"middle\"") + tx(652, 172, "not ready yet", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 100, 200, 100, "copper") + tx(148, 145, "Low", "h", "text-anchor=\"middle\"") + tx(148, 172, "still holding", "s", "text-anchor=\"middle\"") +
    box(300, 100, 200, 100, "green") + tx(400, 145, "High", "h", "text-anchor=\"middle\"") + tx(400, 172, "waiting", "s", "text-anchor=\"middle\"") +
    box(552, 100, 200, 100) + tx(652, 145, "Medium", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 80, 220, 90) + tx(158, 122, "Low paused", "m", "text-anchor=\"middle\"") +
    box(290, 80, 220, 90, "copper") + tx(400, 122, "Medium runs", "m", "text-anchor=\"middle\"") +
    box(532, 80, 220, 90) + tx(642, 122, "High still waits", "m", "text-anchor=\"middle\"") +
    tx(48, 230, "High is blocked by a task that does not use the lock.", "m") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 80, 300, 120, "green") + tx(198, 130, "Low lifted", "h", "text-anchor=\"middle\"") + tx(198, 162, "to High's urgency", "s", "text-anchor=\"middle\"") +
    box(400, 80, 340, 120) + tx(570, 130, "then it unlocks", "m", "text-anchor=\"middle\"") + tx(570, 162, "and drops back", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["stack-paint"] = function () {
  const cells = ["A5", "A5", "A5", "A5", "used", "used", "used"];
  return board(
    "<g " + vis(0, 0) + ">" +
    tx(48, 50, "Paint before the stack is used", "m") +
    cells.map(function (name, i) {
      const cls = name === "A5" ? "blue" : "";
      return box(40 + i * 104, 90, 92, 64, cls) + tx(86 + i * 104, 122, name, "s", "text-anchor=\"middle\"");
    }).join("") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    tx(48, 50, "Walk from the unused end until the paint stops", "m") +
    cells.map(function (name, i) {
      const cls = i < 4 ? "green" : "copper";
      return box(40 + i * 104, 90, 92, 64, cls) + tx(86 + i * 104, 122, name, "s", "text-anchor=\"middle\"");
    }).join("") +
    tx(48, 190, "Green is spare. Copper is the high-water mark.", "s") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 80, 210, 110) + tx(153, 130, "main", "h", "text-anchor=\"middle\"") +
    box(290, 80, 210, 110, "blue") + tx(395, 130, "each task", "h", "text-anchor=\"middle\"") +
    box(532, 80, 210, 110, "copper") + tx(637, 130, "interrupts", "h", "text-anchor=\"middle\"") +
    tx(48, 240, "Three stacks. Measure each one.", "m") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 80, 280, 140, "copper") + tx(220, 140, "a few words left", "m", "text-anchor=\"middle\"") + tx(220, 170, "too small", "s", "text-anchor=\"middle\"") +
    box(430, 80, 280, 140, "green") + tx(570, 140, "a real margin", "m", "text-anchor=\"middle\"") + tx(570, 170, "deepest call plus one interrupt", "tiny", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["dma-porter"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 100, 240, 110) + tx(200, 150, "UART ready", "h", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 320 155 L 430 155\" marker-end=\"url(#ah)\"></path>" +
    box(440, 100, 260, 110, "green") + tx(570, 150, "DMA request", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 80, 200, 90) + tx(148, 122, "source", "m", "text-anchor=\"middle\"") + tx(148, 146, "stay put", "s", "text-anchor=\"middle\"") +
    box(290, 80, 200, 90, "blue") + tx(390, 122, "memory", "m", "text-anchor=\"middle\"") + tx(390, 146, "step forward", "s", "text-anchor=\"middle\"") +
    box(532, 80, 200, 90, "green") + tx(632, 122, "count", "m", "text-anchor=\"middle\"") +
    tx(48, 230, "The data register does not increment. The buffer does.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 260, 120, "green") + tx(210, 145, "porter copies", "h", "text-anchor=\"middle\"") +
    box(440, 90, 280, 120) + tx(580, 145, "CPU is elsewhere", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3, 3) + ">" +
    box(80, 90, 280, 80, "blue") + tx(220, 128, "half: read this side", "m", "text-anchor=\"middle\"") +
    box(400, 90, 320, 80, "green") + tx(560, 128, "porter fills this side", "m", "text-anchor=\"middle\"") +
    tx(80, 230, "A second interrupt fires when the count hits zero.", "m") +
    "</g>" +
    "<g " + vis(4) + ">" +
    tx(48, 50, "Circular: same ring, forever", "m") +
    ["0", "1", "2", "3", "4", "5", "6", "7"].map(function (name, i) {
      return box(40 + i * 92, 90, 80, 60, i < 3 ? "green" : "") + tx(80 + i * 92, 120, name, "s", "text-anchor=\"middle\"");
    }).join("") +
    tx(48, 200, "Read only up to the index the porter has finished.", "m") +
    "</g>"
  );
};

SCENES["alignment"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    tx(48, 50, "0x00000344 in memory", "m") +
    ["44", "03", "00", "00"].map(function (name, i) {
      return box(80 + i * 120, 90, 100, 70, i === 0 ? "green" : "") + tx(130 + i * 120, 125, name, "h", "text-anchor=\"middle\"");
    }).join("") +
    tx(80, 200, "low address", "s") + tx(500, 200, "high address", "s") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 80, 320, 120, "green") + tx(208, 130, "multiple of 4", "h", "text-anchor=\"middle\"") + tx(208, 162, "a 32-bit load is happy", "s", "text-anchor=\"middle\"") +
    box(420, 80, 320, 120, "copper") + tx(580, 130, "odd device address", "h", "text-anchor=\"middle\"") + tx(580, 162, "faults", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 80, 320, 130) + tx(208, 130, "C struct", "h", "text-anchor=\"middle\"") + tx(208, 162, "padding is the compiler's", "s", "text-anchor=\"middle\"") +
    box(420, 80, 320, 130, "green") + tx(580, 130, "wire bytes", "h", "text-anchor=\"middle\"") + tx(580, 162, "you place each one", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(160, 90, 480, 120, "green") + tx(400, 140, "low byte in the first slot", "h", "text-anchor=\"middle\"") + tx(400, 172, "same helper for UART, Modbus, headers", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["hardfault"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 90, 320, 130) + tx(208, 145, "LR bit 2 clear", "h", "text-anchor=\"middle\"") + tx(208, 178, "frame is on MSP", "s", "text-anchor=\"middle\"") +
    box(420, 90, 320, 130, "blue") + tx(580, 145, "LR bit 2 set", "h", "text-anchor=\"middle\"") + tx(580, 178, "frame is on PSP", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    ["R0", "R1", "R2", "R3", "R12", "LR", "PC", "PSR"].map(function (name, i) {
      const cls = i === 6 ? "green" : "";
      return box(28 + i * 96, 90, 86, 64, cls) + tx(71 + i * 96, 122, name, "s", "text-anchor=\"middle\"");
    }).join("") +
    tx(48, 200, "Word 6 is the address to open in the listing.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    tx(48, 50, "CFSR on M3 and above", "m") +
    box(48, 90, 210, 100) + tx(153, 135, "memory", "m", "text-anchor=\"middle\"") +
    box(290, 90, 210, 100, "blue") + tx(395, 135, "bus", "m", "text-anchor=\"middle\"") +
    box(532, 90, 210, 100, "copper") + tx(637, 135, "usage", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 80, 330, 130, "copper") + tx(213, 135, "even target", "h", "text-anchor=\"middle\"") + tx(213, 168, "Thumb bit was clear", "s", "text-anchor=\"middle\"") +
    box(420, 80, 330, 130, "copper") + tx(585, 135, "unaligned device", "h", "text-anchor=\"middle\"") + tx(585, 168, "peripheral window", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["mpu-regions"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 80, 640, 80) + tx(400, 118, "0x20001000 is still that RAM cell", "m", "text-anchor=\"middle\"") +
    box(80, 190, 280, 90, "green") + tx(220, 232, "allow", "m", "text-anchor=\"middle\"") +
    box(440, 190, 280, 90, "copper") + tx(580, 232, "deny", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 100, 160, 80, "blue") + tx(160, 140, "8 KB", "m", "text-anchor=\"middle\"") +
    box(260, 100, 220, 80, "blue") + tx(370, 140, "16 KB", "m", "text-anchor=\"middle\"") +
    box(500, 100, 240, 80, "green") + tx(620, 140, "32 KB", "m", "text-anchor=\"middle\"") +
    tx(80, 240, "Size is a power of two. Base matches that size.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 80, 220, 120, "green") + tx(158, 130, "flash", "h", "text-anchor=\"middle\"") + tx(158, 160, "execute, read", "s", "text-anchor=\"middle\"") +
    box(290, 80, 220, 120) + tx(400, 130, "RAM", "h", "text-anchor=\"middle\"") + tx(400, 160, "read, write, no execute", "tiny", "text-anchor=\"middle\"") +
    box(532, 80, 220, 120, "blue") + tx(642, 130, "peripherals", "h", "text-anchor=\"middle\"") + tx(642, 160, "data only", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 640, 140, "copper") + tx(400, 150, "everything else faults", "h", "text-anchor=\"middle\"") + tx(400, 184, "the stacked PC names the wild pointer", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["sampling"] = function () {
  const fast = sinePoints(50, 160, 4, 140, 40, 8);
  const slow = stairPath(50, 160, 4, 140, 40, 8, 17);
  let dots = "";
  for (let i = 0; i <= 160; i += 17) {
    const x = 50 + i * 4;
    const y = 140 + Math.sin((i / 160) * Math.PI * 2 * 8) * 40;
    dots += "<circle class=\"copperdot\" cx=\"" + x.toFixed(1) + "\" cy=\"" + y.toFixed(1) + "\" r=\"5\"></circle>";
  }
  return board(
    "<g " + vis(0, 0) + ">" +
    "<polyline class=\"wire thin\" points=\"" + fast + "\"></polyline>" +
    "<path class=\"wire copper\" d=\"" + slow + "\"></path>" +
    dots +
    tx(50, 250, "The copper steps are a slow lie told by sparse dots.", "m") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 90, 280, 120) + tx(220, 145, "twice", "h", "text-anchor=\"middle\"") + tx(220, 176, "the edge of the rule", "s", "text-anchor=\"middle\"") +
    box(420, 90, 300, 120, "green") + tx(570, 145, "several times", "h", "text-anchor=\"middle\"") + tx(570, 176, "a practical loop", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 90, 180, 90) + tx(138, 132, "sensor", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire\" d=\"M 228 135 L 300 135\" marker-end=\"url(#ah)\"></path>" +
    box(310, 90, 180, 90, "green") + tx(400, 132, "filter", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 490 135 L 560 135\" marker-end=\"url(#ah)\"></path>" +
    box(570, 90, 160, 90, "blue") + tx(650, 132, "ADC", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 280, 120, "copper") + tx(220, 145, "delay loop", "h", "text-anchor=\"middle\"") + tx(220, 176, "gap drifts", "s", "text-anchor=\"middle\"") +
    box(420, 90, 300, 120, "green") + tx(570, 145, "hardware timer", "h", "text-anchor=\"middle\"") + tx(570, 176, "gap stays put", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["fir-taps"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    ["1/4", "1/4", "1/4", "1/4"].map(function (name, i) {
      return box(80 + i * 160, 90, 130, 70, "green") + tx(145 + i * 160, 125, name, "m", "text-anchor=\"middle\"");
    }).join("") +
    tx(80, 210, "Equal weights: a moving average.", "m") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    [["w0", "newest"], ["w1", "older"], ["w2", "older"], ["w3", "oldest"]].map(function (pair, i) {
      return box(60 + i * 180, 80, 150, 90, i === 0 ? "green" : "") +
        tx(135 + i * 180, 115, pair[0], "h", "text-anchor=\"middle\"") +
        tx(135 + i * 180, 142, pair[1], "s", "text-anchor=\"middle\"");
    }).join("") +
    tx(60, 220, "Output is the sum of sample times weight.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 90, 200, 90) + tx(148, 132, "Q15 samples", "m", "text-anchor=\"middle\"") +
    box(280, 90, 200, 90, "blue") + tx(380, 132, "32-bit sum", "m", "text-anchor=\"middle\"") +
    box(512, 90, 220, 90, "green") + tx(622, 132, "shift 15", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 80, 320, 120) + tx(208, 130, "more taps", "h", "text-anchor=\"middle\"") + tx(208, 162, "more multiplies", "s", "text-anchor=\"middle\"") +
    box(420, 80, 320, 120, "copper") + tx(580, 130, "about half the length", "h", "text-anchor=\"middle\"") + tx(580, 162, "of delay", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["one-pole"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(60, 100, 160, 90) + tx(140, 142, "y old", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 220 145 L 310 145\" marker-end=\"url(#ah)\"></path>" +
    box(320, 100, 160, 90, "green") + tx(400, 142, "part way", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire\" d=\"M 480 145 L 560 145\" marker-end=\"url(#ah)\"></path>" +
    box(570, 100, 160, 90, "blue") + tx(650, 142, "x new", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 90, 320, 120, "green") + tx(208, 140, "a near 1", "h", "text-anchor=\"middle\"") + tx(208, 172, "jumps, little smoothing", "s", "text-anchor=\"middle\"") +
    box(420, 90, 320, 120) + tx(580, 140, "a near 0", "h", "text-anchor=\"middle\"") + tx(580, 172, "creeps, late and smooth", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(180, 80, 440, 140, "green") + tx(400, 140, "one stored y", "h", "text-anchor=\"middle\"") + tx(400, 176, "multiply, shift 15, add back", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 90, 330, 120) + tx(213, 140, "cheaper than a long FIR", "m", "text-anchor=\"middle\"") + tx(213, 170, "one word of RAM", "s", "text-anchor=\"middle\"") +
    box(420, 90, 330, 120, "copper") + tx(585, 140, "old samples fade", "m", "text-anchor=\"middle\"") + tx(585, 170, "they never hard-cut", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["pid-loop"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 250, 120) + tx(205, 140, "error", "h", "text-anchor=\"middle\"") + tx(205, 172, "setpoint minus measured", "tiny", "text-anchor=\"middle\"") +
    box(420, 90, 280, 120, "green") + tx(560, 140, "P pushes", "h", "text-anchor=\"middle\"") + tx(560, 172, "harder when far", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 90, 300, 120, "blue") + tx(198, 140, "add the error", "h", "text-anchor=\"middle\"") + tx(198, 172, "every sample", "s", "text-anchor=\"middle\"") +
    box(400, 90, 340, 120, "copper") + tx(570, 140, "stop at the clamp", "h", "text-anchor=\"middle\"") + tx(570, 172, "or it winds up", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 80, 330, 130) + tx(213, 135, "measurement rising", "h", "text-anchor=\"middle\"") + tx(213, 168, "ease the push", "s", "text-anchor=\"middle\"") +
    box(420, 80, 330, 130, "green") + tx(585, 135, "ignore setpoint jumps", "m", "text-anchor=\"middle\"") + tx(585, 168, "D is not taken from the error", "tiny", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    ["timer", "ADC", "PID", "PWM"].map(function (name, i) {
      return box(40 + i * 190, 100, 160, 80, i === 2 ? "green" : "") + tx(120 + i * 190, 140, name, "m", "text-anchor=\"middle\"");
    }).join("") +
    tx(40, 230, "Same gap every time. Duty stays inside the legal range.", "m") +
    "</g>"
  );
};

SCENES["reset-main"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 110, "blue") + tx(220, 135, "word 0", "h", "text-anchor=\"middle\"") + tx(220, 168, "initial MSP", "s", "text-anchor=\"middle\"") +
    box(430, 90, 280, 110, "green") + tx(570, 135, "word 1", "h", "text-anchor=\"middle\"") + tx(570, 168, "reset handler", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 90, 250, 110) + tx(173, 140, "flash initial values", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 298 145 L 400 145\" marker-end=\"url(#ah)\"></path>" +
    box(410, 90, 250, 110, "green") + tx(535, 140, "RAM .data", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(160, 90, 480, 120, "blue") + tx(400, 140, ".bss becomes zeros", "h", "text-anchor=\"middle\"") + tx(400, 172, "nothing was stored for it in flash", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 180, 90) + tx(170, 132, "copy", "m", "text-anchor=\"middle\"") +
    box(290, 90, 180, 90, "blue") + tx(380, 132, "zero", "m", "text-anchor=\"middle\"") +
    box(500, 90, 200, 90, "green") + tx(600, 132, "main", "h", "text-anchor=\"middle\"") +
    tx(80, 230, "Globals are honest only after those two loops.", "m") +
    "</g>"
  );
};

SCENES["linker-map"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 80, 640, 70, "dark") + tx(400, 115, "FLASH", "h on-dark", "text-anchor=\"middle\"") +
    box(100, 180, 250, 80, "green") + tx(225, 218, ".text", "m", "text-anchor=\"middle\"") +
    box(400, 180, 250, 80) + tx(525, 218, ".rodata", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 70, 300, 100, "dark") + tx(198, 115, "load in flash", "m on-dark", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 348 120 L 440 120\" marker-end=\"url(#ah)\"></path>" +
    box(450, 70, 300, 100, "green") + tx(600, 115, "run in RAM", "m", "text-anchor=\"middle\"") +
    tx(48, 230, ".data has both addresses. Startup copies one to the other.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 200, 280, 80, "blue") + tx(220, 238, ".bss", "m", "text-anchor=\"middle\"") +
    box(400, 80, 280, 200) + tx(540, 160, "stack", "h", "text-anchor=\"middle\"") + tx(540, 190, "grows down", "s", "text-anchor=\"middle\"") +
    "<path class=\"wire\" d=\"M 540 150 L 540 100\" marker-end=\"url(#ah)\"></path>" +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 280, 100) + tx(220, 135, "0x00000000", "m", "text-anchor=\"middle\"") + tx(220, 162, "flash origin", "s", "text-anchor=\"middle\"") +
    box(430, 90, 280, 100, "green") + tx(570, 135, "0x20000000", "m", "text-anchor=\"middle\"") + tx(570, 162, "RAM origin", "s", "text-anchor=\"middle\"") +
    tx(80, 250, "A script from another part boots in the wrong place.", "m") +
    "</g>"
  );
};

SCENES["boot-jump"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 90, 250, 120, "copper") + tx(173, 140, "bootloader", "h", "text-anchor=\"middle\"") + tx(173, 172, "owns reset", "s", "text-anchor=\"middle\"") +
    box(400, 90, 340, 120) + tx(570, 140, "application", "h", "text-anchor=\"middle\"") + tx(570, 172, "higher in flash", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(160, 90, 480, 120, "green") + tx(400, 140, "VTOR", "h", "text-anchor=\"middle\"") + tx(400, 174, "interrupts now use the application's table", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 80, 220, 110, "blue") + tx(158, 125, "word 0", "m", "text-anchor=\"middle\"") + tx(158, 152, "new MSP", "s", "text-anchor=\"middle\"") +
    box(300, 80, 220, 110, "green") + tx(410, 125, "word 1", "m", "text-anchor=\"middle\"") + tx(410, 152, "odd address", "s", "text-anchor=\"middle\"") +
    box(552, 80, 200, 110, "copper") + tx(652, 125, "IRQs off", "m", "text-anchor=\"middle\"") + tx(652, 152, "during the jump", "tiny", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 90, 320, 120, "copper") + tx(208, 140, "check failed", "h", "text-anchor=\"middle\"") + tx(208, 172, "stay and wait", "s", "text-anchor=\"middle\"") +
    box(420, 90, 320, 120, "green") + tx(580, 140, "check passed", "h", "text-anchor=\"middle\"") + tx(580, 172, "branch, do not return", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["two-slots"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 130, "green") + tx(220, 145, "slot A", "h", "text-anchor=\"middle\"") + tx(220, 178, "the one you trust", "s", "text-anchor=\"middle\"") +
    box(430, 90, 280, 130) + tx(570, 145, "slot B", "h", "text-anchor=\"middle\"") + tx(570, 178, "the one being written", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    ["magic", "version", "size", "CRC"].map(function (name, i) {
      return box(48 + i * 185, 90, 165, 80, i === 3 ? "green" : "") + tx(130 + i * 185, 128, name, "m", "text-anchor=\"middle\"");
    }).join("") +
    tx(48, 220, "A bad remainder never gets a jump.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 80, 220, 110, "green") + tx(158, 125, "try B once", "m", "text-anchor=\"middle\"") +
    box(300, 80, 220, 110, "copper") + tx(410, 125, "no confirm", "m", "text-anchor=\"middle\"") +
    box(552, 80, 200, 110) + tx(652, 125, "next boot: A", "m", "text-anchor=\"middle\"") +
    tx(48, 240, "The trial mark has to survive reset.", "m") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 90, 320, 120, "copper") + tx(208, 140, "watchdog", "h", "text-anchor=\"middle\"") + tx(208, 172, "armed before the jump", "s", "text-anchor=\"middle\"") +
    box(420, 90, 320, 120, "green") + tx(580, 140, "confirm", "h", "text-anchor=\"middle\"") + tx(580, 172, "from the app, once it is up", "tiny", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["can-frame"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 90, 220, 100, "green") + tx(158, 135, "identifier", "h", "text-anchor=\"middle\"") + tx(158, 164, "a message name", "s", "text-anchor=\"middle\"") +
    box(300, 90, 440, 100) + tx(520, 135, "up to 8 data bytes", "h", "text-anchor=\"middle\"") + tx(520, 164, "no chip-select", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 80, 250, 110, "green") + tx(205, 125, "0 dominant", "h", "text-anchor=\"middle\"") + tx(205, 156, "the wire shows this", "s", "text-anchor=\"middle\"") +
    box(430, 80, 280, 110) + tx(570, 125, "1 recessive", "h", "text-anchor=\"middle\"") + tx(570, 156, "loses if the other sent 0", "tiny", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    tx(48, 48, "sent high bit first", "m") +
    tx(48, 90, "A", "m") + bitCells(["1", "0", "1", "1"], 100, 70, 48) +
    tx(48, 150, "B", "m") + bitCells(["1", "0", "0", "1"], 100, 130, 48) +
    tx(48, 220, "wire", "m") + bitCells(["1", "0", "0", "1"], 100, 200, 48) +
    tx(320, 230, "B's 0 wins. Smaller id continues.", "m") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 90, 320, 120, "green") + tx(208, 140, "classical CAN", "h", "text-anchor=\"middle\"") + tx(208, 172, "8 data bytes", "s", "text-anchor=\"middle\"") +
    box(420, 90, 320, 120) + tx(580, 140, "CAN FD", "h", "text-anchor=\"middle\"") + tx(580, 172, "longer, and faster after the id", "tiny", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["can-arbitrate"] = function () {
  function idBits(bits, x, y) {
    return bits.map(function (bit, i) {
      const win = bit === "0";
      return "<g transform=\"translate(" + (x + i * 52) + " " + y + ")\">" +
        "<rect class=\"bit " + (win ? "one" : "zero") + "\" width=\"44\" height=\"40\" rx=\"6\"></rect>" +
        tx(22, 22, bit, "m", "text-anchor=\"middle\"") + "</g>";
    }).join("");
  }
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 90, 300, 120) + tx(198, 140, "ECU A", "h", "text-anchor=\"middle\"") + tx(198, 172, "id 0x120", "s", "text-anchor=\"middle\"") +
    box(430, 90, 300, 120) + tx(580, 140, "ECU B", "h", "text-anchor=\"middle\"") + tx(580, 172, "id 0x250", "s", "text-anchor=\"middle\"") +
    tx(48, 260, "The bus is idle. Both may start.", "m") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 70, 200, 80) + tx(148, 110, "0x120", "m", "text-anchor=\"middle\"") +
    box(552, 70, 200, 80) + tx(652, 110, "0x250", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire\" d=\"M 148 150 L 400 230\"></path>" +
    "<path class=\"wire\" d=\"M 652 150 L 400 230\"></path>" +
    box(250, 230, 300, 70, "green") + tx(400, 268, "both write the id", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 80, 280, 130, "green") + tx(220, 135, "0 dominant", "h", "text-anchor=\"middle\"") + tx(220, 168, "the wire shows this", "s", "text-anchor=\"middle\"") +
    box(430, 80, 290, 130) + tx(575, 135, "1 recessive", "h", "text-anchor=\"middle\"") + tx(575, 168, "loses if the other sent 0", "tiny", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3, 3) + ">" +
    tx(36, 48, "high bit first", "s") +
    tx(36, 100, "0x120", "s") + idBits(["0", "0", "1", "0"], 120, 72) +
    tx(36, 168, "0x250", "s") + idBits(["0", "1", "0", "0"], 120, 140) +
    tx(36, 250, "Bit 9 decides. The 0 from 0x120 sticks.", "m") +
    "</g>" +
    "<g " + vis(4, 4) + ">" +
    box(48, 90, 300, 130, "copper") + tx(198, 145, "0x250 stops", "h", "text-anchor=\"middle\"") + tx(198, 178, "waits for idle", "s", "text-anchor=\"middle\"") +
    box(430, 90, 300, 130, "green") + tx(580, 145, "0x120 still sending", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(5) + ">" +
    tx(36, 48, "0x120 continues", "m") +
    box(36, 70, 80, 56, "green") + tx(76, 98, "8", "m", "text-anchor=\"middle\"") +
    ["10", "27", "00", "00", "00", "00", "00", "00"].map(function (name, i) {
      return box(130 + i * 80, 70, 70, 56) + tx(165 + i * 80, 98, name, "s", "text-anchor=\"middle\"");
    }).join("") +
    tx(36, 170, "DLC, then the eight data bytes.", "m") +
    "</g>"
  );
};

SCENES["can-sample"] = function () {
  const wave = squareWave(60, 90, 160, 6, 0.55, 520);
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 80, 300, 100) + tx(198, 122, "CAN high", "m", "text-anchor=\"middle\"") + tx(198, 148, "one copy", "s", "text-anchor=\"middle\"") +
    box(430, 80, 300, 100, "blue") + tx(580, 122, "CAN low", "m", "text-anchor=\"middle\"") + tx(580, 148, "the opposite copy", "s", "text-anchor=\"middle\"") +
    tx(48, 240, "The receiver keeps the difference. Shared noise falls out.", "m") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    "<polyline class=\"wire\" points=\"" + wave + "\"></polyline>" +
    "<circle class=\"greendot\" cx=\"170\" cy=\"90\" r=\"8\"></circle>" +
    tx(148, 68, "sample here", "s") +
    tx(60, 230, "Inside the bit, after the edge has settled.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 90, 320, 120, "green") + tx(208, 140, "clocks close", "h", "text-anchor=\"middle\"") + tx(208, 172, "same sample point", "s", "text-anchor=\"middle\"") +
    box(420, 90, 320, 120, "copper") + tx(580, 140, "too early", "h", "text-anchor=\"middle\"") + tx(580, 172, "reads a different bit", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 280, 110, "copper") + tx(220, 140, "error frame", "h", "text-anchor=\"middle\"") + tx(220, 168, "dominant bits", "s", "text-anchor=\"middle\"") +
    box(430, 90, 280, 110) + tx(570, 140, "everyone drops it", "m", "text-anchor=\"middle\"") + tx(570, 168, "sender tries again", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["modbus-rtu"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 100, 200, 100, "green") + tx(148, 145, "address", "h", "text-anchor=\"middle\"") + tx(148, 172, "which slave", "s", "text-anchor=\"middle\"") +
    box(300, 100, 200, 100) + tx(400, 145, "master", "m", "text-anchor=\"middle\"") +
    box(552, 100, 200, 100) + tx(652, 145, "only that slave", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    ["addr", "0x03", "reg hi", "reg lo", "n hi", "n lo"].map(function (name, i) {
      return box(28 + i * 126, 90, 114, 70, i === 1 ? "green" : "") + tx(85 + i * 126, 125, name, "s", "text-anchor=\"middle\"");
    }).join("") +
    tx(28, 210, "Body numbers are high byte first.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 90, 400, 90) + tx(248, 132, "the bytes so far", "m", "text-anchor=\"middle\"") +
    box(480, 90, 260, 90, "green") + tx(610, 125, "CRC-16", "h", "text-anchor=\"middle\"") + tx(610, 152, "low byte first", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(60, 110, 80, 50, "blue") + box(160, 110, 80, 50, "blue") + box(260, 110, 80, 50, "blue") +
    box(420, 100, 280, 80) + tx(560, 138, "silence", "h", "text-anchor=\"middle\"") +
    tx(60, 220, "A gap of about 3.5 characters ends the frame.", "m") +
    "</g>"
  );
};

SCENES["modbus-read"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    tx(36, 48, "Read register 0, count 1", "m") +
    ["01", "03", "00", "00", "00", "01", "84", "0A"].map(function (name, i) {
      const cls = i >= 6 ? "green" : "";
      return box(36 + i * 92, 80, 80, 64, cls) + tx(76 + i * 92, 112, name, "s", "text-anchor=\"middle\"");
    }).join("") +
    tx(36, 190, "Last two bytes are the CRC, low byte first.", "m") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    ["addr", "0x03", "nbytes", "data", "CRC"].map(function (name, i) {
      return box(36 + i * 150, 100, 132, 70, i === 3 ? "green" : "") + tx(102 + i * 150, 135, name, "s", "text-anchor=\"middle\"");
    }).join("") +
    tx(36, 220, "Trust the data only after the CRC matches.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 90, 220, 100, "copper") + tx(158, 135, "0x83", "h", "text-anchor=\"middle\"") + tx(158, 162, "0x03 with the top bit", "tiny", "text-anchor=\"middle\"") +
    box(300, 90, 180, 100) + tx(390, 135, "code", "m", "text-anchor=\"middle\"") + tx(390, 162, "0x02 bad address", "tiny", "text-anchor=\"middle\"") +
    box(510, 90, 220, 100, "green") + tx(620, 135, "CRC", "h", "text-anchor=\"middle\"") + tx(620, 162, "still covers it", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 90, 320, 120) + tx(208, 140, "silence", "h", "text-anchor=\"middle\"") + tx(208, 172, "timeout, then a short retry", "tiny", "text-anchor=\"middle\"") +
    box(420, 90, 320, 120, "copper") + tx(580, 140, "bad CRC", "h", "text-anchor=\"middle\"") + tx(580, 172, "drop it, do not parse", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};
