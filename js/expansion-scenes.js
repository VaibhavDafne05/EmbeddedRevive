/*
 * One picture per step for the production expansion track.
 * Each frame stands alone. Captions stay inside that frame.
 */
function frames(parts) {
  return board(parts.map(function (html, i) {
    return "<g " + vis(i, i) + ">" + html + "</g>";
  }).join(""));
}

function duo(left, right) {
  function side(item, x) {
    return box(x, 90, 330, 150, item.cls || "") +
      tx(x + 165, 150, item.title, "h", "text-anchor=\"middle\"") +
      tx(x + 165, 186, item.sub, "s", "text-anchor=\"middle\"");
  }
  return side(left, 48) + side(right, 422);
}

function note(text) {
  return tx(48, 300, text, "m");
}

function ladder(names, active) {
  return names.map(function (name, i) {
    var y = 28 + i * 78;
    return box(170, y, 460, 64, i === active ? "green" : "") +
      tx(400, y + 40, name, "m", "text-anchor=\"middle\"");
  }).join("");
}

SCENES["c-memory-model"] = function () {
  return frames([
    box(80, 70, 640, 90) + tx(400, 122, "int speed;", "h", "text-anchor=\"middle\"") +
      note("The name is not the place. Size, life, and address come later."),
    box(80, 80, 280, 140, "green") + tx(220, 140, "function", "h", "text-anchor=\"middle\"") +
      tx(220, 174, "local n on the stack", "s", "text-anchor=\"middle\"") +
      box(430, 80, 280, 140) + tx(570, 140, "next call", "h", "text-anchor=\"middle\"") +
      tx(570, 174, "a different address", "s", "text-anchor=\"middle\""),
    box(48, 80, 330, 130, "blue") + tx(213, 135, ".data", "h", "text-anchor=\"middle\"") +
      tx(213, 168, "static count = 3", "s", "text-anchor=\"middle\"") +
      box(422, 80, 330, 130) + tx(587, 135, ".bss", "h", "text-anchor=\"middle\"") +
      tx(587, 168, "static flags, starts at 0", "s", "text-anchor=\"middle\""),
    box(48, 80, 330, 130, "dark") + tx(213, 135, "flash", "h on-dark", "text-anchor=\"middle\"") +
      tx(213, 168, "const table stays here", "s on-dark", "text-anchor=\"middle\"") +
      box(422, 80, 330, 130, "copper") + tx(587, 135, "SRAM saved", "h", "text-anchor=\"middle\"") +
      tx(587, 168, "do not copy it unless you must", "tiny", "text-anchor=\"middle\""),
    box(48, 90, 220, 120, "dark") + tx(158, 145, "FLASH", "m on-dark", "text-anchor=\"middle\"") +
      tx(158, 174, "0x08000000", "s on-dark", "text-anchor=\"middle\"") +
      box(300, 90, 220, 120, "green") + tx(410, 145, "SRAM", "m", "text-anchor=\"middle\"") +
      tx(410, 174, "0x20000000", "s", "text-anchor=\"middle\"") +
      box(552, 90, 200, 120) + tx(652, 145, "map file", "m", "text-anchor=\"middle\"") +
      tx(652, 174, "the evidence", "s", "text-anchor=\"middle\"")
  ]);
};

SCENES["c-volatile"] = function () {
  return frames([
    box(48, 90, 300, 120, "green") + tx(198, 140, "status reg", "h", "text-anchor=\"middle\"") +
      tx(198, 172, "changes by itself", "s", "text-anchor=\"middle\"") +
      box(420, 90, 320, 120) + tx(580, 140, "compiler", "h", "text-anchor=\"middle\"") +
      tx(580, 172, "must read it again", "s", "text-anchor=\"middle\""),
    box(48, 90, 300, 120) + tx(198, 145, "main reads flag", "m", "text-anchor=\"middle\"") +
      box(420, 90, 320, 120, "copper") + tx(580, 140, "ISR writes flag", "m", "text-anchor=\"middle\"") +
      tx(580, 172, "volatile uint8_t", "s", "text-anchor=\"middle\""),
    box(48, 100, 200, 90) + tx(148, 152, "read", "m", "text-anchor=\"middle\"") +
      box(290, 100, 200, 90, "blue") + tx(390, 152, "add 1", "m", "text-anchor=\"middle\"") +
      box(532, 100, 200, 90, "copper") + tx(632, 152, "write", "m", "text-anchor=\"middle\"") +
      note("x++ is still three steps. volatile does not lock them."),
    duo({ title: "one core", sub: "volatile can be enough", cls: "green" }, { title: "two cores", sub: "you also need a barrier", cls: "" }),
    duo({ title: "use volatile", sub: "hardware and ISR flags", cls: "green" }, { title: "do not use it as", sub: "a lock between tasks", cls: "copper" })
  ]);
};

SCENES["c-pointer"] = function () {
  return frames([
    box(48, 100, 280, 110) + tx(188, 150, "x", "h", "text-anchor=\"middle\"") +
      tx(188, 180, "the object", "s", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 328 155 L 430 155\" marker-end=\"url(#ah)\"></path>" +
      box(440, 100, 300, 110, "green") + tx(590, 145, "p = &x", "h", "text-anchor=\"middle\"") +
      tx(590, 178, "0x20001000", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 130, "green") + tx(400, 145, "*p", "h", "text-anchor=\"middle\"") +
      tx(400, 180, "read or write the object at that address", "s", "text-anchor=\"middle\""),
    box(120, 90, 560, 130, "dark") + tx(400, 145, "0x40000000", "h on-dark", "text-anchor=\"middle\"") +
      tx(400, 180, "volatile uint32_t *reg", "s on-dark", "text-anchor=\"middle\""),
    bitCells(["0", "1", "2", "3"], 160, 80, 90) +
      tx(160, 160, "byte 0", "tiny") + tx(250, 160, "byte 1", "tiny") + tx(340, 160, "byte 2", "tiny") + tx(430, 160, "byte 3", "tiny") +
      note("int32_t *p;  p + 1 moves 4 bytes, not 1."),
    duo({ title: "valid p", sub: "aligned, alive, in range", cls: "green" }, { title: "wrong p", sub: "fault or the wrong chip", cls: "copper" })
  ]);
};

SCENES["c-bitfields"] = function () {
  return frames([
    tx(48, 48, "bit 7 down to bit 0", "s") +
      bitCells(["0", "0", "0", "0", "1", "0", "0", "0"], 80, 90, 70) +
      note("1u shifted 3 places selects bit 3. AND tests it."),
    box(80, 90, 640, 110, "green") + tx(400, 140, "reg |= mask", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "sets bit 3, leaves the others", "s", "text-anchor=\"middle\""),
    box(80, 90, 640, 110) + tx(400, 140, "reg &= ~mask", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "clears bit 3, leaves the others", "s", "text-anchor=\"middle\""),
    box(80, 90, 640, 110, "blue") + tx(400, 140, "reg ^= mask", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "flips bit 3. Only if the manual says flip is safe.", "s", "text-anchor=\"middle\""),
    duo({ title: "normal bit", sub: "read, change, write back", cls: "green" }, { title: "write-1-to-clear", sub: "a plain read-modify-write can lie", cls: "copper" })
  ]);
};

SCENES["c-function-pointers"] = function () {
  return frames([
    box(48, 90, 300, 120) + tx(198, 145, "driver", "h", "text-anchor=\"middle\"") +
      tx(198, 178, "does not know the app", "s", "text-anchor=\"middle\"") +
      box(420, 90, 320, 120, "green") + tx(580, 145, "app", "h", "text-anchor=\"middle\"") +
      tx(580, 178, "knows what done means", "s", "text-anchor=\"middle\""),
    box(140, 90, 520, 120, "green") + tx(400, 145, "on_done", "h", "text-anchor=\"middle\"") +
      tx(400, 178, "a stored function address", "s", "text-anchor=\"middle\""),
    box(48, 100, 250, 100) + tx(173, 158, "app_init", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 298 150 L 470 150\" marker-end=\"url(#ah)\"></path>" +
      box(480, 100, 260, 100, "green") + tx(610, 145, "driver slot", "m", "text-anchor=\"middle\"") +
      tx(610, 172, "holds on_done", "s", "text-anchor=\"middle\""),
    box(80, 80, 250, 110, "copper") + tx(205, 130, "transfer done", "m", "text-anchor=\"middle\"") +
      tx(205, 158, "ISR sees the flag", "s", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 330 135 L 450 135\" marker-end=\"url(#ah)\"></path>" +
      box(460, 80, 260, 110, "green") + tx(590, 130, "on_done()", "m", "text-anchor=\"middle\"") +
      tx(590, 158, "app hears about it", "s", "text-anchor=\"middle\""),
    duo({ title: "from a task", sub: "the app may take a lock", cls: "green" }, { title: "from an ISR", sub: "the app must stay short", cls: "copper" })
  ]);
};

SCENES["cpp-raii"] = function () {
  return frames([
    box(160, 90, 480, 120) + tx(400, 140, "the resource", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "a lock, a pin claim, a short mask", "s", "text-anchor=\"middle\""),
    box(200, 70, 400, 200, "green") + tx(400, 130, "{ Guard g; }", "h", "text-anchor=\"middle\"") +
      tx(400, 170, "acquire at the top", "s", "text-anchor=\"middle\"") +
      tx(400, 200, "release when the brace ends", "s", "text-anchor=\"middle\""),
    duo({ title: "no exceptions", sub: "still works", cls: "green" }, { title: "no heap", sub: "the guard is a local", cls: "green" }),
    duo({ title: "short destructor", sub: "release only", cls: "green" }, { title: "hidden work", sub: "do not program flash here", cls: "copper" }),
    box(80, 80, 180, 80) + tx(170, 128, "return", "m", "text-anchor=\"middle\"") +
      box(310, 80, 180, 80) + tx(400, 128, "return", "m", "text-anchor=\"middle\"") +
      box(540, 80, 180, 80) + tx(630, 128, "return", "m", "text-anchor=\"middle\"") +
      box(160, 200, 480, 80, "green") + tx(400, 248, "every path still releases", "m", "text-anchor=\"middle\"")
  ]);
};

SCENES["rtos-task-model"] = function () {
  return frames([
    box(80, 100, 640, 100) + tx(400, 145, "one loop does every job", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "each job must yield on its own", "s", "text-anchor=\"middle\""),
    box(48, 90, 220, 140, "green") + tx(158, 145, "sense", "h", "text-anchor=\"middle\"") +
      tx(158, 178, "own stack", "s", "text-anchor=\"middle\"") +
      box(290, 90, 220, 140, "blue") + tx(400, 145, "control", "h", "text-anchor=\"middle\"") +
      tx(400, 178, "own stack", "s", "text-anchor=\"middle\"") +
      box(532, 90, 220, 140) + tx(642, 145, "log", "h", "text-anchor=\"middle\"") +
      tx(642, 178, "own stack", "s", "text-anchor=\"middle\""),
    duo({ title: "blocked", sub: "waiting for a queue", cls: "green" }, { title: "spinning", sub: "burns the core", cls: "copper" }),
    box(48, 100, 220, 110, "green") + tx(158, 150, "more urgent", "m", "text-anchor=\"middle\"") +
      tx(158, 178, "runs while ready", "s", "text-anchor=\"middle\"") +
      box(300, 100, 220, 110) + tx(410, 150, "less urgent", "m", "text-anchor=\"middle\"") +
      tx(410, 178, "waits its turn", "s", "text-anchor=\"middle\"") +
      box(552, 100, 200, 110) + tx(652, 150, "idle", "m", "text-anchor=\"middle\"") +
      tx(652, 178, "only if both wait", "tiny", "text-anchor=\"middle\""),
    note("One job per task. Talk through a queue, not a hidden global.")
  ]);
};

SCENES["rtos-queue"] = function () {
  return frames([
    box(48, 90, 250, 110, "copper") + tx(173, 140, "ISR", "h", "text-anchor=\"middle\"") +
      tx(173, 170, "posts one item", "s", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 298 145 L 430 145\" marker-end=\"url(#ah)\"></path>" +
      box(440, 90, 280, 110, "green") + tx(580, 145, "queue", "h", "text-anchor=\"middle\"") +
      tx(580, 175, "item copied in", "s", "text-anchor=\"middle\""),
    bitCells(["A", "B", "C", " "], 140, 90, 100) +
      note("Four slots. Three are full. The depth is part of the design."),
    box(48, 90, 280, 120) + tx(188, 145, "task blocks", "h", "text-anchor=\"middle\"") +
      tx(188, 175, "until an item arrives", "s", "text-anchor=\"middle\"") +
      box(400, 90, 340, 120, "green") + tx(570, 145, "then it works", "h", "text-anchor=\"middle\"") +
      tx(570, 175, "outside the ISR", "s", "text-anchor=\"middle\""),
    duo({ title: "queue full", sub: "a chosen policy", cls: "copper" }, { title: "drop, count, or wait", sub: "write it down", cls: "" }),
    box(80, 90, 640, 120, "green") + tx(400, 140, "depth follows the burst", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "10 items in 2 ms, consumer every 5 ms: size for that", "s", "text-anchor=\"middle\"")
  ]);
};

SCENES["rtos-priority-inversion"] = function () {
  return frames([
    box(48, 80, 220, 100) + tx(158, 125, "Low", "h", "text-anchor=\"middle\"") +
      tx(158, 155, "holds the lock", "s", "text-anchor=\"middle\"") +
      box(290, 80, 220, 100, "green") + tx(400, 125, "High", "h", "text-anchor=\"middle\"") +
      tx(400, 155, "needs the lock", "s", "text-anchor=\"middle\"") +
      box(532, 80, 220, 100, "blue") + tx(642, 125, "Mid", "h", "text-anchor=\"middle\"") +
      tx(642, 155, "also ready", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 120, "copper") + tx(400, 145, "High is blocked", "h", "text-anchor=\"middle\"") +
      tx(400, 178, "it cannot run until Low releases", "s", "text-anchor=\"middle\""),
    box(48, 90, 300, 130) + tx(198, 145, "Low is ready", "m", "text-anchor=\"middle\"") +
      tx(198, 175, "but Mid outranks it", "s", "text-anchor=\"middle\"") +
      box(420, 90, 320, 130, "blue") + tx(580, 145, "Mid keeps running", "m", "text-anchor=\"middle\"") +
      tx(580, 175, "High waits behind Mid", "s", "text-anchor=\"middle\""),
    box(48, 90, 320, 130, "green") + tx(208, 140, "Low is boosted", "h", "text-anchor=\"middle\"") +
      tx(208, 175, "to High, just for the lock", "tiny", "text-anchor=\"middle\"") +
      box(430, 90, 310, 130) + tx(585, 145, "then it drops back", "m", "text-anchor=\"middle\"") +
      tx(585, 175, "and High runs", "s", "text-anchor=\"middle\""),
    duo({ title: "short lock", sub: "the better fix", cls: "green" }, { title: "inheritance", sub: "limits this one pattern", cls: "" })
  ]);
};

SCENES["debug-gdb"] = function () {
  return frames([
    box(160, 90, 480, 110, "copper") + tx(400, 140, "stopped at a breakpoint", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "or inside the fault handler", "s", "text-anchor=\"middle\""),
    box(48, 90, 220, 120) + tx(158, 145, "PC", "h", "text-anchor=\"middle\"") +
      tx(158, 175, "which instruction", "s", "text-anchor=\"middle\"") +
      box(290, 90, 220, 120, "green") + tx(400, 145, "SP", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "which stack", "s", "text-anchor=\"middle\"") +
      box(532, 90, 220, 120) + tx(642, 145, "memory", "h", "text-anchor=\"middle\"") +
      tx(642, 175, "the bytes nearby", "s", "text-anchor=\"middle\""),
    box(80, 110, 160, 70) + tx(160, 152, "main", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 240 145 L 300 145\" marker-end=\"url(#ah)\"></path>" +
      box(310, 110, 160, 70) + tx(390, 152, "read_adc", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 470 145 L 530 145\" marker-end=\"url(#ah)\"></path>" +
      box(540, 110, 180, 70, "copper") + tx(630, 152, "scale", "m", "text-anchor=\"middle\"") +
      note("The chain shows how you got here."),
    duo({ title: "one hypothesis", sub: "a bad pointer in scale", cls: "green" }, { title: "the check", sub: "print that pointer", cls: "" }),
    note("Change one thing. Run the same failure again. Compare.")
  ]);
};

SCENES["debug-hardfault"] = function () {
  return frames([
    box(160, 90, 480, 110, "copper") + tx(400, 145, "HardFault", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "the core has stopped the bad path", "s", "text-anchor=\"middle\""),
    box(80, 70, 640, 200) + tx(120, 110, "stacked", "s") +
      tx(120, 150, "R0 R1 R2 R3 R12 LR", "m") +
      tx(120, 195, "PC", "h") + tx(220, 195, "the instruction that faulted", "m") +
      tx(120, 235, "xPSR", "m") +
      note("On Cortex-M the saved PC is the 7th stacked word."),
    box(48, 100, 330, 110) + tx(213, 145, "CFSR", "h", "text-anchor=\"middle\"") +
      tx(213, 178, "0xE000ED28 on M3 and up", "tiny", "text-anchor=\"middle\"") +
      box(420, 100, 320, 110, "copper") + tx(580, 150, "M0 has no CFSR", "m", "text-anchor=\"middle\""),
    box(120, 90, 560, 120, "green") + tx(400, 140, "PC to a source line", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "ELF plus the map file, in the debugger", "s", "text-anchor=\"middle\""),
    duo({ title: "keep the evidence", sub: "PC, stack, status", cls: "green" }, { title: "then fix the access", sub: "do not just clear the fault", cls: "" })
  ]);
};

SCENES["can-architecture"] = function () {
  return frames([
    ladder(["transceiver and controller", "CAN driver", "CanIf and PduR", "COM signal", "application speed"], 0),
    ladder(["transceiver and controller", "CAN driver", "CanIf and PduR", "COM signal", "application speed"], 1),
    ladder(["transceiver and controller", "CAN driver", "CanIf and PduR", "COM signal", "application speed"], 2),
    ladder(["transceiver and controller", "CAN driver", "CanIf and PduR", "COM signal", "application speed"], 3),
    ladder(["transceiver and controller", "CAN driver", "CanIf and PduR", "COM signal", "application speed"], 4)
  ]);
};

SCENES["can-signal-layout"] = function () {
  return frames([
    tx(48, 48, "byte 0, 8 bits, unsigned", "s") +
      bitCells(["1", "0", "0", "1", "0", "1", "0", "0"], 80, 90, 70) +
      note("Start bit and length say which bits. This raw value is 148."),
    box(80, 90, 640, 130, "green") + tx(400, 145, "physical = raw x 0.5 + (-40)", "h", "text-anchor=\"middle\"") +
      tx(400, 185, "148 x 0.5 - 40 = 34", "m", "text-anchor=\"middle\""),
    duo({ title: "34 is in range", sub: "min  -40, max 150", cls: "green" }, { title: "0xFF invalid", sub: "do not treat it as 87.5", cls: "copper" }),
    box(48, 90, 220, 120) + tx(158, 140, "id 0x120", "h", "text-anchor=\"middle\"") +
      tx(158, 172, "every 20 ms", "s", "text-anchor=\"middle\"") +
      box(300, 90, 220, 120, "blue") + tx(410, 145, "sender ECU A", "m", "text-anchor=\"middle\"") +
      box(552, 90, 200, 120) + tx(652, 145, "timeout", "m", "text-anchor=\"middle\"") +
      tx(652, 175, "3 missed cycles", "tiny", "text-anchor=\"middle\""),
    note("The same start bit, factor, and offset must be in the database and in COM.")
  ]);
};

SCENES["autosar-layers"] = function () {
  return frames([
    ladder(["Application SWC", "RTE", "Services", "ECU abstraction", "MCAL"], 0),
    ladder(["Application SWC", "RTE", "Services", "ECU abstraction", "MCAL"], 1),
    ladder(["Application SWC", "RTE", "Services", "ECU abstraction", "MCAL"], 2),
    ladder(["Application SWC", "RTE", "Services", "ECU abstraction", "MCAL"], 3),
    ladder(["Application SWC", "RTE", "Services", "ECU abstraction", "MCAL"], 4)
  ]);
};

SCENES["autosar-runnable"] = function () {
  return frames([
    box(160, 90, 480, 110, "green") + tx(400, 140, "every 10 ms", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "an RTE timing event", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110) + tx(400, 140, "mapped to one OS task", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "that task's priority is the real urgency", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110, "blue") + tx(400, 145, "Rte_Read of speed", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "not a peek at the CAN register", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110, "green") + tx(400, 150, "compute the new duty", "h", "text-anchor=\"middle\""),
    box(160, 90, 480, 110) + tx(400, 140, "Rte_Write of duty", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "COM and the driver take it from here", "s", "text-anchor=\"middle\"")
  ]);
};

SCENES["autosar-diagnostic-path"] = function () {
  return frames([
    ladder(["tester: read id 0xF190", "CAN transport", "DCM", "application callback", "positive response"], 0),
    ladder(["tester: read id 0xF190", "CAN transport", "DCM", "application callback", "positive response"], 1),
    ladder(["tester: read id 0xF190", "CAN transport", "DCM", "application callback", "positive response"], 2),
    ladder(["tester: read id 0xF190", "CAN transport", "DCM", "application callback", "positive response"], 3),
    ladder(["tester: read id 0xF190", "CAN transport", "DCM", "application callback", "positive response"], 4)
  ]);
};

SCENES["autosar-nvm"] = function () {
  return frames([
    box(160, 90, 480, 110, "green") + tx(400, 140, "RAM copy", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "odometer lives here while you run", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110) + tx(400, 140, "NvM block 3", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "a name, not a raw flash address", "s", "text-anchor=\"middle\""),
    duo({ title: "write on change", sub: "and at shutdown", cls: "green" }, { title: "write every loop", sub: "wears the flash out", cls: "copper" }),
    box(48, 100, 330, 110, "blue") + tx(213, 145, "CRC on the block", "m", "text-anchor=\"middle\"") +
      box(420, 100, 320, 110) + tx(580, 145, "a second copy", "m", "text-anchor=\"middle\"") +
      tx(580, 175, "if the design asked for one", "tiny", "text-anchor=\"middle\""),
    duo({ title: "CRC matches", sub: "restore the RAM copy", cls: "green" }, { title: "CRC fails", sub: "use the configured default", cls: "copper" })
  ]);
};

SCENES["autosar-dem"] = function () {
  return frames([
    box(160, 90, 480, 110, "copper") + tx(400, 140, "sensor stuck", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "the monitor sees it", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110) + tx(400, 145, "report event 12", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "failed, this cycle", "s", "text-anchor=\"middle\""),
    box(80, 120, 80, 50) + tx(120, 150, "1", "m", "text-anchor=\"middle\"") +
      box(190, 120, 80, 50) + tx(230, 150, "2", "m", "text-anchor=\"middle\"") +
      box(300, 120, 80, 50, "copper") + tx(340, 150, "3", "m", "text-anchor=\"middle\"") +
      note("Three failed reports qualify it. One glitch does not."),
    box(160, 90, 480, 110, "green") + tx(400, 145, "test failed, confirmed", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "status bits, not a raw boolean only", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110) + tx(400, 140, "DTC stored", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "DCM can read it later", "s", "text-anchor=\"middle\"")
  ]);
};

SCENES["iso26262-flow"] = function () {
  return frames([
    box(160, 90, 480, 110) + tx(400, 140, "the item", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "steering assist, and its boundary", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110, "copper") + tx(400, 140, "hazard", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "unwanted assist while driving", "s", "text-anchor=\"middle\""),
    box(48, 100, 220, 110) + tx(158, 145, "severity", "m", "text-anchor=\"middle\"") +
      box(290, 100, 220, 110, "blue") + tx(400, 145, "exposure", "m", "text-anchor=\"middle\"") +
      box(532, 100, 220, 110, "green") + tx(642, 145, "control", "m", "text-anchor=\"middle\"") +
      note("Those three feed the ASIL. They are not a guess."),
    box(160, 90, 480, 110, "green") + tx(400, 140, "safety goal", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "no assist torque without a valid request", "tiny", "text-anchor=\"middle\""),
    box(80, 100, 180, 80) + tx(170, 148, "functional", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 260 140 L 310 140\" marker-end=\"url(#ah)\"></path>" +
      box(320, 100, 180, 80, "green") + tx(410, 148, "technical", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 500 140 L 550 140\" marker-end=\"url(#ah)\"></path>" +
      box(560, 100, 180, 80) + tx(650, 148, "test", "m", "text-anchor=\"middle\"")
  ]);
};

SCENES["asil-decomposition"] = function () {
  return frames([
    duo({ title: "from the hazard", sub: "ASIL is assigned", cls: "green" }, { title: "from a wish", sub: "ASIL is not picked", cls: "copper" }),
    box(160, 90, 480, 110) + tx(400, 140, "one requirement, ASIL D", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "decomposition is optional, and ruled", "s", "text-anchor=\"middle\""),
    box(48, 90, 330, 140, "green") + tx(213, 145, "path A", "h", "text-anchor=\"middle\"") +
      tx(213, 180, "ASIL B(D)", "m", "text-anchor=\"middle\"") +
      box(422, 90, 330, 140, "blue") + tx(587, 145, "path B", "h", "text-anchor=\"middle\"") +
      tx(587, 180, "ASIL B(D)", "m", "text-anchor=\"middle\"") +
      note("The (D) stays. The two paths must be independent."),
    duo({ title: "range check", sub: "detects a stuck value", cls: "green" }, { title: "safe state", sub: "assist off", cls: "" }),
    note("The analysis, the tests, and the work products still have to exist.")
  ]);
};

SCENES["fmea-fta"] = function () {
  return frames([
    box(80, 220, 200, 70) + tx(180, 262, "sensor short", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 180 220 L 400 150\" marker-end=\"url(#ah)\"></path>" +
      box(300, 70, 200, 70, "copper") + tx(400, 112, "wrong torque", "m", "text-anchor=\"middle\"") +
      note("FMEA starts at the part and asks what happens next."),
    box(300, 60, 200, 70, "copper") + tx(400, 102, "wrong torque", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 350 130 L 180 200\" marker-end=\"url(#ah)\"></path>" +
      "<path class=\"wire\" d=\"M 450 130 L 620 200\" marker-end=\"url(#ah)\"></path>" +
      box(70, 200, 200, 70) + tx(170, 242, "sensor short", "s", "text-anchor=\"middle\"") +
      box(520, 200, 210, 70) + tx(625, 242, "bad command", "s", "text-anchor=\"middle\"") +
      note("FTA starts at the unwanted event and walks down."),
    box(160, 90, 480, 120, "copper") + tx(400, 140, "top event", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "actuator moves with no request", "s", "text-anchor=\"middle\""),
    duo({ title: "FMEA", sub: "finds the local effects", cls: "green" }, { title: "FTA", sub: "finds the combinations", cls: "blue" }),
    note("Write the boundary. An analysis of a different system does not count.")
  ]);
};

SCENES["safety-mechanisms"] = function () {
  return frames([
    box(160, 90, 480, 110, "copper") + tx(400, 145, "stuck sensor", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "the same raw value for 200 ms", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110, "green") + tx(400, 145, "range and stuck check", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "this mechanism sees that fault", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110) + tx(400, 145, "safe state", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "command goes to zero, fault is stored", "s", "text-anchor=\"middle\""),
    duo({ title: "covered", sub: "stuck and out of range", cls: "green" }, { title: "not covered", sub: "a wrong but plausible value", cls: "copper" }),
    note("Inject the stuck value on the bench. Confirm the safe state.")
  ]);
};

SCENES["iso21434-tara"] = function () {
  return frames([
    box(160, 90, 480, 110, "green") + tx(400, 140, "the asset", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "a diagnostic command that moves an actuator", "tiny", "text-anchor=\"middle\""),
    box(160, 90, 480, 110, "copper") + tx(400, 140, "the threat", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "someone sends that command without authority", "tiny", "text-anchor=\"middle\""),
    box(160, 90, 480, 110) + tx(400, 145, "impact", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "unwanted motion, safety and privacy", "s", "text-anchor=\"middle\""),
    duo({ title: "how hard", sub: "feasibility", cls: "blue" }, { title: "how bad", sub: "impact", cls: "copper" }),
    box(160, 90, 480, 110, "green") + tx(400, 140, "security goal", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "only an authorized tester may send it", "s", "text-anchor=\"middle\"")
  ]);
};

SCENES["secure-boot"] = function () {
  return frames([
    box(250, 80, 300, 90, "dark") + tx(400, 132, "root in the chip", "m on-dark", "text-anchor=\"middle\""),
    box(48, 160, 200, 80, "dark") + tx(148, 208, "ROM", "m on-dark", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 248 200 L 310 200\" marker-end=\"url(#ah)\"></path>" +
      box(320, 160, 200, 80, "green") + tx(420, 198, "check", "m", "text-anchor=\"middle\"") +
      tx(420, 220, "bootloader", "tiny", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 520 200 L 580 200\" marker-end=\"url(#ah)\"></path>" +
      box(590, 160, 160, 80) + tx(670, 208, "next", "m", "text-anchor=\"middle\""),
    box(80, 150, 180, 80, "green") + tx(170, 198, "bootloader", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 260 190 L 340 190\" marker-end=\"url(#ah)\"></path>" +
      box(350, 150, 160, 80, "green") + tx(430, 198, "check", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 510 190 L 560 190\" marker-end=\"url(#ah)\"></path>" +
      box(570, 150, 160, 80) + tx(650, 198, "app", "m", "text-anchor=\"middle\""),
    box(160, 90, 480, 120, "copper") + tx(400, 145, "check fails", "h", "text-anchor=\"middle\"") +
      tx(400, 178, "do not jump. Stay in recovery.", "s", "text-anchor=\"middle\""),
    duo({ title: "a good update", sub: "passes the same check", cls: "green" }, { title: "an old image", sub: "policy can refuse it", cls: "copper" })
  ]);
};

SCENES["secoc"] = function () {
  return frames([
    box(80, 100, 640, 90) + tx(400, 152, "PDU: speed and a command", "h", "text-anchor=\"middle\""),
    box(80, 100, 300, 100) + tx(230, 158, "the bytes", "m", "text-anchor=\"middle\"") +
      box(420, 100, 300, 100, "green") + tx(570, 145, "authenticator", "m", "text-anchor=\"middle\"") +
      tx(570, 172, "travels with them", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110, "blue") + tx(400, 140, "freshness 41", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "an old copy used 40", "s", "text-anchor=\"middle\""),
    duo({ title: "both checks pass", sub: "accept the PDU", cls: "green" }, { title: "either fails", sub: "drop it", cls: "copper" }),
    note("Who may hold the key, and when it changes, is its own design.")
  ]);
};

SCENES["embedded-build"] = function () {
  return frames([
    box(48, 120, 160, 80) + tx(128, 168, "main.c", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 208 160 L 280 160\" marker-end=\"url(#ah)\"></path>" +
      box(290, 120, 160, 80, "green") + tx(370, 168, "main.o", "m", "text-anchor=\"middle\"") +
      note("Compile one file. You get code, data, and symbols."),
    box(80, 100, 640, 110, "green") + tx(400, 145, "linker", "h", "text-anchor=\"middle\"") +
      tx(400, 178, "main.o + startup.o + the library", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110) + tx(400, 140, "app.elf", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "addresses plus debug symbols", "s", "text-anchor=\"middle\""),
    duo({ title: "app.hex", sub: "what you program", cls: "green" }, { title: "app.elf", sub: "what the debugger wants", cls: "" }),
    note("Same flags, same script, same sources: the same hash.")
  ]);
};

SCENES["linker-script"] = function () {
  return frames([
    box(48, 90, 330, 140, "dark") + tx(213, 145, "FLASH", "h on-dark", "text-anchor=\"middle\"") +
      tx(213, 180, "0x08000000, 256K", "s on-dark", "text-anchor=\"middle\"") +
      box(422, 90, 330, 140, "green") + tx(587, 145, "RAM", "h", "text-anchor=\"middle\"") +
      tx(587, 180, "0x20000000, 64K", "s", "text-anchor=\"middle\""),
    box(48, 70, 160, 70) + tx(128, 112, ".text", "m", "text-anchor=\"middle\"") +
      box(230, 70, 160, 70) + tx(310, 112, ".rodata", "m", "text-anchor=\"middle\"") +
      box(412, 70, 160, 70, "blue") + tx(492, 112, ".data", "m", "text-anchor=\"middle\"") +
      box(594, 70, 160, 70) + tx(674, 112, ".bss", "m", "text-anchor=\"middle\"") +
      note(".text and .rodata stay in flash. .bss is only RAM."),
    box(48, 100, 300, 120, "dark") + tx(198, 150, "load address", "m on-dark", "text-anchor=\"middle\"") +
      tx(198, 180, ".data in flash", "s on-dark", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 348 160 L 430 160\" marker-end=\"url(#ah)\"></path>" +
      box(440, 100, 300, 120, "green") + tx(590, 150, "run address", "m", "text-anchor=\"middle\"") +
      tx(590, 180, ".data in RAM", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110, "copper") + tx(400, 145, "region overflow", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "the link must fail, not warn and ship", "s", "text-anchor=\"middle\""),
    note("Open the map. Sort by size. Ask why a library appeared.")
  ]);
};

SCENES["boot-startup"] = function () {
  return frames([
    box(48, 100, 300, 120, "dark") + tx(198, 150, "word 0", "m on-dark", "text-anchor=\"middle\"") +
      tx(198, 180, "initial MSP", "s on-dark", "text-anchor=\"middle\"") +
      box(420, 100, 320, 120, "green") + tx(580, 150, "word 1", "m", "text-anchor=\"middle\"") +
      tx(580, 180, "reset handler, odd address", "tiny", "text-anchor=\"middle\""),
    box(160, 90, 480, 110) + tx(400, 145, "clocks first", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "the board manual names the source", "s", "text-anchor=\"middle\""),
    duo({ title: "copy .data", sub: "flash to RAM", cls: "green" }, { title: "zero .bss", sub: "so statics start at 0", cls: "" }),
    box(160, 90, 480, 110, "blue") + tx(400, 145, "C runtime", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "static constructors, if you have any", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110, "green") + tx(400, 150, "main", "h", "text-anchor=\"middle\"") +
      tx(400, 180, "only after the copy and the clear", "s", "text-anchor=\"middle\"")
  ]);
};

SCENES["watchdog-design"] = function () {
  return frames([
    box(48, 90, 220, 120, "copper") + tx(158, 145, "task stuck", "m", "text-anchor=\"middle\"") +
      box(290, 90, 220, 120) + tx(400, 145, "loop runaway", "m", "text-anchor=\"middle\"") +
      box(532, 90, 220, 120) + tx(642, 145, "clock gone", "m", "text-anchor=\"middle\""),
    box(160, 80, 480, 160) + tx(400, 140, "window 100 ms", "h", "text-anchor=\"middle\"") +
      tx(400, 180, "no honest kick, then reset", "m", "text-anchor=\"middle\""),
    duo({ title: "kick from a timer", sub: "the app can be dead", cls: "copper" }, { title: "the timer still runs", sub: "so the kick keeps coming", cls: "" }),
    box(48, 110, 140, 70, "green") + tx(118, 152, "sense", "s", "text-anchor=\"middle\"") +
      box(210, 110, 140, 70, "green") + tx(280, 152, "control", "s", "text-anchor=\"middle\"") +
      box(372, 110, 140, 70) + tx(442, 152, "log late", "s", "text-anchor=\"middle\"") +
      box(534, 110, 200, 70, "copper") + tx(634, 152, "no kick", "m", "text-anchor=\"middle\""),
    box(160, 90, 480, 110, "green") + tx(400, 140, "after reset", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "save the reset cause before you clear it", "s", "text-anchor=\"middle\"")
  ]);
};

SCENES["brownout-reset"] = function () {
  return frames([
    box(160, 90, 480, 110) + tx(400, 140, "3.3 V nominal", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "the datasheet names the real range", "s", "text-anchor=\"middle\""),
    "<polyline class=\"wire\" points=\"80,140 300,140 420,240 700,240\"></polyline>" +
      tx(80, 120, "supply", "s") + tx(430, 270, "dip under the limit", "m"),
    box(160, 90, 480, 110, "copper") + tx(400, 140, "brownout reset", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "holds the core until the rail returns", "s", "text-anchor=\"middle\""),
    duo({ title: "half a flash write", sub: "CRC will fail later", cls: "copper" }, { title: "a finished block", sub: "CRC still matches", cls: "green" }),
    note("Drop the rail on purpose. Read the reset cause and the block.")
  ]);
};

SCENES["unit-testing-embedded"] = function () {
  return frames([
    box(120, 90, 560, 120, "green") + tx(400, 140, "celsius_from_raw", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "no registers inside. Test it on the PC.", "s", "text-anchor=\"middle\""),
    box(48, 110, 160, 80) + tx(128, 158, "raw 0", "m", "text-anchor=\"middle\"") +
      box(240, 110, 160, 80) + tx(320, 158, "raw 148", "m", "text-anchor=\"middle\"") +
      box(432, 110, 160, 80, "copper") + tx(512, 158, "raw 255", "m", "text-anchor=\"middle\"") +
      box(624, 110, 140, 80) + tx(694, 150, "timeout", "s", "text-anchor=\"middle\""),
    duo({ title: "fake CAN port", sub: "returns a frame you chose", cls: "blue" }, { title: "real pins", sub: "not in this test", cls: "" }),
    duo({ title: "host", sub: "the formula", cls: "green" }, { title: "board", sub: "the sample time", cls: "" }),
    note("Same inputs, same answer, every run.")
  ]);
};

SCENES["integration-traceability"] = function () {
  return frames([
    box(80, 100, 640, 100, "green") + tx(400, 145, "REQ-14", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "speed timeout sets the safe duty", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110) + tx(400, 145, "design", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "COM timeout flag into the 10 ms runnable", "tiny", "text-anchor=\"middle\""),
    box(160, 90, 480, 110, "blue") + tx(400, 150, "control_tick()", "h", "text-anchor=\"middle\""),
    box(160, 90, 480, 110, "green") + tx(400, 140, "test T-14", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "drop 3 frames, expect duty 0", "s", "text-anchor=\"middle\""),
    note("Change REQ-14, and the design, the function, and T-14 light up.")
  ]);
};

SCENES["git-embedded-workflow"] = function () {
  return frames([
    box(160, 90, 480, 110, "green") + tx(400, 140, "one commit", "h", "text-anchor=\"middle\"") +
      tx(400, 172, "timeout sets duty to 0", "s", "text-anchor=\"middle\""),
    box(160, 90, 480, 110) + tx(400, 145, "T-14 passed", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "the message says so", "s", "text-anchor=\"middle\""),
    duo({ title: "the diff", sub: "only the timeout path", cls: "green" }, { title: "the why", sub: "in the message", cls: "" }),
    box(160, 90, 480, 110, "copper") + tx(400, 145, "revert that commit", "h", "text-anchor=\"middle\"") +
      tx(400, 175, "the rest of the release stays", "s", "text-anchor=\"middle\""),
    box(80, 110, 180, 80) + tx(170, 158, "tag v1.2", "m", "text-anchor=\"middle\"") +
      box(310, 110, 180, 80, "green") + tx(400, 158, "same script", "m", "text-anchor=\"middle\"") +
      box(540, 110, 180, 80) + tx(630, 158, "same hash", "m", "text-anchor=\"middle\"")
  ]);
};
