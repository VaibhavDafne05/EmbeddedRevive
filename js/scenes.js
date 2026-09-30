function board(inner) {
  return "<svg class=\"board\" viewBox=\"0 0 800 450\" aria-hidden=\"true\">" +
    "<defs><marker id=\"ah\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"7\" markerHeight=\"7\" orient=\"auto-start-reverse\">" +
    "<path d=\"M 0 1.4 L 8.6 5 L 0 8.6 z\" fill=\"#1c1915\"></path></marker></defs>" + inner + "</svg>";
}

function vis(from, to) {
  return to == null ? "data-show=\"" + from + "\"" : "data-show=\"" + from + "\" data-hide=\"" + to + "\"";
}

function hot(frames) {
  return "data-hot=\"" + frames + "\"";
}

function box(x, y, w, h, cls, extra) {
  return "<rect class=\"box" + (cls ? " " + cls : "") + "\" x=\"" + x + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"" + h + "\" rx=\"12\" " + (extra || "") + "></rect>";
}

function tx(x, y, text, cls, extra) {
  return "<text class=\"" + (cls || "m") + "\" x=\"" + x + "\" y=\"" + y + "\" " + (extra || "") + ">" + text + "</text>";
}

function squareWave(x, yHigh, yLow, periods, duty, width) {
  const period = width / periods;
  let cx = x;
  const pts = [cx + "," + yLow];
  for (let i = 0; i < periods; i += 1) {
    const high = Math.max(4, period * duty);
    pts.push(cx.toFixed(1) + "," + yHigh);
    cx += high;
    pts.push(cx.toFixed(1) + "," + yHigh);
    pts.push(cx.toFixed(1) + "," + yLow);
    cx += period - high;
    pts.push(cx.toFixed(1) + "," + yLow);
  }
  return pts.join(" ");
}

function sinePoints(x0, samples, step, mid, amp, cycles) {
  const pts = [];
  for (let i = 0; i <= samples; i += 1) {
    const x = x0 + i * step;
    const y = mid + Math.sin((i / samples) * Math.PI * 2 * cycles) * amp;
    pts.push(x.toFixed(1) + "," + y.toFixed(1));
  }
  return pts.join(" ");
}

function stairPath(x0, samples, step, mid, amp, cycles, every) {
  let d = "";
  for (let i = 0; i <= samples; i += every) {
    const x = x0 + i * step;
    const y = mid + Math.sin((i / samples) * Math.PI * 2 * cycles) * amp;
    const x2 = x0 + Math.min(samples, i + every) * step;
    d += (d ? " L " : "M ") + x.toFixed(1) + " " + y.toFixed(1) + " L " + x2.toFixed(1) + " " + y.toFixed(1);
  }
  return d;
}

function bitCells(bits, x, y, w) {
  return bits.map(function (bit, i) {
    const kind = bit === "S" ? "start" : bit === "P" ? "stop" : bit === "1" ? "one" : "zero";
    const label = bit === "S" ? "St" : bit === "P" ? "Sp" : bit;
    return "<g transform=\"translate(" + (x + i * w) + " " + y + ")\">" +
      "<rect class=\"bit " + kind + "\" width=\"32\" height=\"36\" rx=\"6\"></rect>" +
      tx(16, 18, label, "tiny", "text-anchor=\"middle\"") + "</g>";
  }).join("");
}

const SCENES = {
  "one-job": function () {
    return board(
      "<g class=\"thing\">" + box(48, 70, 190, 130) +
      box(70, 92, 100, 70, "dark") +
      "<g " + vis(1) + ">" + box(96, 112, 48, 32, "green") + tx(120, 128, "chip", "tiny", "text-anchor=\"middle\"") + "</g>" +
      tx(48, 230, "Microwave", "m") + "</g>" +
      "<g>" + box(300, 110, 200, 70) + box(340, 78, 100, 44) +
      "<circle class=\"inkdot\" cx=\"340\" cy=\"188\" r=\"16\"></circle><circle class=\"inkdot\" cx=\"470\" cy=\"188\" r=\"16\"></circle>" +
      "<g " + vis(1) + ">" + box(372, 128, 48, 28, "green") + tx(396, 142, "chip", "tiny", "text-anchor=\"middle\"") + "</g>" +
      tx(300, 230, "Car lock", "m") + "</g>" +
      "<g>" + "<circle class=\"box\" cx=\"670\" cy=\"140\" r=\"58\"></circle>" +
      box(652, 78, 36, 22) + box(652, 180, 36, 22) +
      "<g " + vis(1) + ">" + box(650, 126, 40, 26, "green") + tx(670, 139, "chip", "tiny", "text-anchor=\"middle\"") + "</g>" +
      tx(620, 230, "Watch", "m") + "</g>" +
      "<g " + vis(2) + ">" +
      "<path class=\"wire loop\" d=\"M 80 290 H 700\" marker-end=\"url(#ah)\"></path>" +
      tx(80, 330, "Read the product. Decide. Drive the outputs. Repeat.", "m") + "</g>" +
      "<g " + vis(3) + ">" +
      tx(48, 380, "one job: heat", "s") + tx(300, 380, "one job: lock", "s") + tx(590, 380, "one job: keep time", "s") +
      "</g>"
    );
  },

  "not-a-pc": function () {
    return board(
      box(36, 36, 340, 378) + box(424, 36, 340, 378) +
      tx(56, 68, "Laptop", "h") + tx(444, 68, "Embedded board", "h") +
      "<g " + vis(0) + ">" +
      box(64, 100, 150, 36, "blue") + tx(78, 118, "mail", "s") +
      box(86, 146, 170, 36, "blue") + tx(100, 164, "browser", "s") +
      box(110, 192, 180, 36, "blue") + tx(124, 210, "update", "s") +
      tx(64, 260, "Many apps, one operating system", "s") +
      "</g>" +
      "<g " + vis(0) + ">" +
      box(452, 108, 200, 70, "green") + tx(552, 143, "one program", "m", "text-anchor=\"middle\"") +
      "<line class=\"wire\" x1=\"652\" y1=\"143\" x2=\"710\" y2=\"110\"></line>" +
      "<line class=\"wire\" x1=\"652\" y1=\"143\" x2=\"710\" y2=\"143\"></line>" +
      "<line class=\"wire\" x1=\"652\" y1=\"143\" x2=\"710\" y2=\"176\"></line>" +
      tx(676, 96, "lamp", "tiny") + tx(676, 168, "motor", "tiny") + tx(676, 200, "sensor", "tiny") +
      "</g>" +
      "<g " + vis(1, 1) + ">" +
      tx(64, 300, "RAM", "s") + box(64, 312, 250, 16, "blue") +
      tx(452, 250, "RAM", "s") + box(452, 262, 90, 16, "green") +
      tx(452, 300, "A little memory, wires to the product", "s") +
      "</g>" +
      "<g " + vis(2, 2) + ">" +
      tx(64, 300, "time", "tiny") +
      box(100, 288, 40, 18, "dark") + box(150, 288, 70, 18, "copper") + box(230, 288, 40, 18, "dark") +
      tx(150, 330, "paused", "tiny") +
      tx(452, 300, "deadline", "tiny") +
      box(520, 288, 18, 18, "green") + box(546, 288, 18, 18, "green") + box(572, 288, 18, 18, "green") +
      "<line class=\"wire copper\" x1=\"640\" y1=\"270\" x2=\"640\" y2=\"320\"></line>" +
      tx(648, 300, "due", "tiny") +
      "</g>" +
      "<g " + vis(3) + ">" +
      box(56, 280, 300, 90, "green") + tx(206, 325, "Same kind of CPU", "m", "text-anchor=\"middle\"") +
      box(444, 280, 300, 90, "green") + tx(594, 325, "Must answer on time", "m", "text-anchor=\"middle\"") +
      "</g>"
    );
  },

  "sense-think-act": function () {
    return board(
      "<circle class=\"greendot token\" cx=\"148\" cy=\"78\" r=\"8\"></circle>" +
      "<g " + hot("0") + ">" + box(48, 96, 200, 120) + tx(148, 140, "Sense", "h", "text-anchor=\"middle\"") + tx(148, 172, "temperature", "s", "text-anchor=\"middle\"") + "</g>" +
      "<g " + hot("1") + ">" + box(300, 96, 200, 120) + tx(400, 140, "Think", "h", "text-anchor=\"middle\"") + tx(400, 172, "too hot?", "s", "text-anchor=\"middle\"") + "</g>" +
      "<g " + hot("2,3,4") + ">" + box(552, 96, 200, 120) + tx(652, 132, "Act", "h", "text-anchor=\"middle\"") +
      "<g transform=\"translate(626 156)\"><g class=\"fan\">" +
      "<circle class=\"box\" cx=\"26\" cy=\"26\" r=\"22\"></circle>" +
      "<line class=\"wire\" x1=\"26\" y1=\"10\" x2=\"26\" y2=\"42\"></line>" +
      "<line class=\"wire\" x1=\"10\" y1=\"26\" x2=\"42\" y2=\"26\"></line>" +
      "</g></g></g>" +
      "<path class=\"wire\" d=\"M 248 156 H 300\" marker-end=\"url(#ah)\"></path>" +
      "<path class=\"wire\" d=\"M 500 156 H 552\" marker-end=\"url(#ah)\"></path>" +
      "<g " + vis(3, 3) + "><path class=\"wire loop\" d=\"M 120 250 H 680\" marker-end=\"url(#ah)\"></path>" +
      tx(120, 286, "Then repeat, for as long as power is on", "m") + "</g>" +
      "<g " + vis(4) + ">" +
      "<g " + hot("4") + ">" + box(300, 320, 160, 56, "copper") + tx(380, 348, "HEATING", "m", "text-anchor=\"middle\"") + "</g>" +
      box(48, 320, 140, 56) + tx(118, 348, "IDLE", "m", "text-anchor=\"middle\"") +
      box(560, 320, 140, 56) + tx(630, 348, "DONE", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 188 348 H 300\" marker-end=\"url(#ah)\"></path>" +
      "<path class=\"wire\" d=\"M 460 348 H 560\" marker-end=\"url(#ah)\"></path>" +
      "</g>"
    );
  },

  "inside-mcu": function () {
    return board(
      box(28, 24, 744, 400, "flat") +
      tx(400, 210, "One chip. A whole small computer.", "h", "text-anchor=\"middle\" " + vis(0, 0)) +
      "<g " + vis(1) + " " + hot("1") + ">" + box(300, 48, 200, 84) + tx(400, 90, "CPU", "h", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(2) + " " + hot("2") + ">" + box(48, 48, 200, 84) + tx(148, 78, "Flash", "h", "text-anchor=\"middle\"") + tx(148, 104, "the program", "s", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(2) + " " + hot("2") + ">" + box(552, 48, 200, 84) + tx(652, 78, "RAM", "h", "text-anchor=\"middle\"") + tx(652, 104, "live numbers", "s", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(3) + " " + hot("3") + ">" +
      box(48, 180, 120, 64) + tx(108, 212, "GPIO", "m", "text-anchor=\"middle\"") +
      box(184, 180, 120, 64) + tx(244, 212, "Timer", "m", "text-anchor=\"middle\"") +
      box(320, 180, 120, 64) + tx(380, 212, "ADC", "m", "text-anchor=\"middle\"") +
      box(456, 180, 120, 64) + tx(516, 212, "UART", "m", "text-anchor=\"middle\"") +
      box(592, 180, 160, 64) + tx(672, 204, "DMA", "m", "text-anchor=\"middle\"") + tx(672, 224, "byte porter", "tiny", "text-anchor=\"middle\"") +
      "</g>" +
      "<g " + vis(4) + " " + hot("4") + ">" +
      [0, 1, 2, 3, 4, 5, 6, 7].map(function (i) {
        return box(70 + i * 84, 330, 48, 28) + tx(94 + i * 84, 344, String(i), "s", "text-anchor=\"middle\"");
      }).join("") +
      tx(70, 390, "Pins: the doors to the product", "m") +
      "</g>"
    );
  },

  clock: function () {
    return board(
      box(56, 120, 28, 78) +
      "<line class=\"wire\" x1=\"70\" y1=\"120\" x2=\"70\" y2=\"78\"></line>" +
      "<line class=\"wire\" x1=\"70\" y1=\"198\" x2=\"70\" y2=\"240\"></line>" +
      tx(48, 270, "crystal", "s") +
      "<line class=\"wire\" x1=\"140\" y1=\"160\" x2=\"210\" y2=\"160\" marker-end=\"url(#ah)\"></line>" +
      "<g " + vis(2) + ">" + box(230, 70, 120, 44, "copper") + tx(290, 92, "x inside", "s", "text-anchor=\"middle\"") + "</g>" +
      "<polyline class=\"wire live\" points=\"" + squareWave(250, 130, 190, 8, 0.5, 460) + "\"></polyline>" +
      "<g class=\"beat\">" + "<circle class=\"box\" cx=\"140\" cy=\"360\" r=\"28\"></circle><line class=\"wire\" x1=\"140\" y1=\"360\" x2=\"140\" y2=\"338\"></line></g>" +
      tx(180, 360, "ticks, not the time of day", "m") +
      "<g " + vis(1) + ">" + tx(250, 230, "16 MHz  ·  about 16 million ticks a second", "m") + "</g>" +
      "<g " + vis(3) + ">" + box(250, 280, 220, 36, "copper") + tx(360, 298, "faster  ·  more current", "s", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(4) + ">" + box(490, 280, 250, 64) + tx(615, 304, "empty delay loop", "s", "text-anchor=\"middle\"") + tx(615, 324, "use a timer instead", "s", "text-anchor=\"middle\"") + "</g>"
    );
  },

  memory: function () {
    return board(
      "<g " + hot("0") + " " + vis(0) + ">" + box(48, 48, 320, 250) +
      tx(208, 90, "Flash", "h", "text-anchor=\"middle\"") +
      box(90, 120, 230, 70, "dark") + tx(205, 155, "program", "m on-dark", "text-anchor=\"middle\"") +
      tx(208, 230, "Unplug the board.", "s", "text-anchor=\"middle\"") +
      tx(208, 254, "The program stays.", "s", "text-anchor=\"middle\"") + "</g>" +
      "<g " + hot("1") + " " + vis(1) + ">" + box(420, 48, 330, 250) +
      tx(585, 90, "RAM", "h", "text-anchor=\"middle\"") +
      "<g " + vis(1, 1) + ">" + box(470, 130, 90, 48, "blue") + box(575, 150, 110, 36, "blue") + "</g>" +
      tx(585, 230, "Live numbers.", "s", "text-anchor=\"middle\"") +
      tx(585, 254, "Power off clears the desk.", "s", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(2) + " " + hot("2") + ">" + box(48, 320, 320, 90) + tx(208, 354, "Settings page", "m", "text-anchor=\"middle\"") + tx(208, 378, "kept on purpose, not every variable", "s", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(3) + " " + hot("3") + ">" + box(420, 320, 330, 90, "copper") + tx(585, 354, "Stack grows. Heap can surprise you.", "s", "text-anchor=\"middle\"") + tx(585, 378, "Prefer fixed memory on small chips.", "s", "text-anchor=\"middle\"") + "</g>"
    );
  },

  instruction: function () {
    return board(
      "<circle class=\"greendot token\" cx=\"148\" cy=\"78\" r=\"9\"></circle>" +
      "<g " + hot("0") + ">" + box(48, 110, 200, 110) + tx(148, 154, "Fetch", "h", "text-anchor=\"middle\"") + tx(148, 184, "get the next order", "s", "text-anchor=\"middle\"") + "</g>" +
      "<g " + hot("1") + ">" + box(300, 110, 200, 110) + tx(400, 154, "Decode", "h", "text-anchor=\"middle\"") + tx(400, 184, "what kind of step?", "s", "text-anchor=\"middle\"") + "</g>" +
      "<g " + hot("2,3") + ">" + box(552, 110, 200, 110) + tx(652, 154, "Execute", "h", "text-anchor=\"middle\"") + tx(652, 184, "do that step", "s", "text-anchor=\"middle\"") + "</g>" +
      "<path class=\"wire\" d=\"M 248 165 H 300\" marker-end=\"url(#ah)\"></path>" +
      "<path class=\"wire\" d=\"M 500 165 H 552\" marker-end=\"url(#ah)\"></path>" +
      "<path class=\"wire\" d=\"M 652 220 C 652 280, 148 280, 148 220\" fill=\"none\"></path>" +
      "<g " + vis(3) + ">" + box(48, 330, 700, 70, "copper") +
      tx(400, 354, "Reset jumps to a fixed first address.", "m", "text-anchor=\"middle\"") +
      tx(400, 378, "Startup prepares memory, then calls main.", "s", "text-anchor=\"middle\"") + "</g>"
    );
  },

  "bits-hex": function () {
    const bits = ["1", "0", "1", "0", "0", "1", "0", "1"];
    const weights = ["128", "64", "32", "16", "8", "4", "2", "1"];
    return board(
      "<g " + vis(0, 0) + ">" + tx(400, 180, "0", "h", "text-anchor=\"middle\" style=\"font-size:64px\"") + tx(480, 180, "1", "h", "text-anchor=\"middle\" style=\"font-size:64px\"") +
      tx(400, 250, "A bit is one of these. Nothing else.", "m", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(1) + ">" +
      bits.map(function (bit, i) {
        const on = bit === "1" ? " one" : " zero";
        return "<g transform=\"translate(" + (96 + i * 76) + " 70)\"><rect class=\"bit" + on + "\" width=\"64\" height=\"64\" rx=\"8\"></rect>" +
          tx(32, 32, bit, "h", "text-anchor=\"middle\"") + "</g>";
      }).join("") +
      tx(400, 170, "10100101   is   0xA5", "h", "text-anchor=\"middle\"") +
      "</g>" +
      "<g " + vis(2) + ">" +
      weights.map(function (w, i) {
        return tx(128 + i * 76, 210, w, "s", "text-anchor=\"middle\"");
      }).join("") +
      tx(400, 250, "Rightmost bit is worth 1. Each step left doubles.", "s", "text-anchor=\"middle\"") +
      "</g>" +
      "<g " + vis(3) + ">" +
      ["0", "0", "0", "0", "1", "0", "0", "0"].map(function (bit, i) {
        const on = bit === "1" ? " one" : " zero";
        return "<g transform=\"translate(" + (96 + i * 76) + " 290)\"><rect class=\"bit" + on + "\" width=\"64\" height=\"48\" rx=\"8\"></rect>" +
          tx(32, 24, bit, "m", "text-anchor=\"middle\"") + "</g>";
      }).join("") +
      tx(400, 370, "0x08  ·  only the bit worth 8 is on", "m", "text-anchor=\"middle\"") +
      "</g>"
    );
  },

  registers: function () {
    const names = ["enable", "", "", "", "start", "", "", "done"];
    return board(
      tx(48, 48, "CTRL    address 0x4000", "h") +
      names.map(function (name, i) {
        const index = 7 - i;
        return "<g transform=\"translate(" + (48 + i * 90) + " 80)\">" +
          "<rect class=\"bit\" width=\"78\" height=\"70\" rx=\"8\"></rect>" +
          tx(39, 28, String(index), "tiny", "text-anchor=\"middle\"") +
          tx(39, 50, name || "·", "tiny", "text-anchor=\"middle\"") + "</g>";
      }).join("") +
      "<g " + vis(1) + ">" +
      box(560, 180, 190, 70, "green") + tx(655, 215, "timer running", "m", "text-anchor=\"middle\"") +
      tx(48, 190, "Write 1 to enable. The helper starts.", "m") + "</g>" +
      "<g " + vis(2) + ">" +
      box(48, 250, 360, 70, "blue") + tx(228, 285, "done is set by hardware. You read it.", "s", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(3) + ">" +
      box(48, 350, 150, 56) + tx(123, 378, "1  read", "m", "text-anchor=\"middle\"") +
      box(230, 350, 170, 56) + tx(315, 378, "2  change a bit", "s", "text-anchor=\"middle\"") +
      box(430, 350, 150, 56) + tx(505, 378, "3  write", "m", "text-anchor=\"middle\"") +
      "<path class=\"wire\" d=\"M 198 378 H 230\" marker-end=\"url(#ah)\"></path>" +
      "<path class=\"wire\" d=\"M 400 378 H 430\" marker-end=\"url(#ah)\"></path>" +
      "</g>"
    );
  },

  gpio: function () {
    return board(
      box(36, 130, 170, 140) + tx(121, 200, "MCU", "h", "text-anchor=\"middle\"") +
      "<line class=\"wire\" x1=\"206\" y1=\"200\" x2=\"520\" y2=\"200\"></line>" +
      box(300, 176, 70, 48) + tx(335, 200, "R", "m", "text-anchor=\"middle\"") +
      "<circle class=\"led\" cx=\"470\" cy=\"200\" r=\"18\"></circle>" +
      "<circle class=\"electron\" r=\"5\"></circle><circle class=\"electron e2\" r=\"5\"></circle><circle class=\"electron e3\" r=\"5\"></circle>" +
      tx(500, 250, "LED", "s") +
      "<g " + vis(1) + ">" + box(36, 40, 250, 48, "blue") + tx(161, 64, "direction: output", "m", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(2) + ">" + box(300, 40, 160, 48, "green") + tx(380, 64, "level: HIGH", "m", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(3) + ">" +
      box(300, 300, 120, 56, "copper") + tx(360, 328, "driver", "m", "text-anchor=\"middle\"") +
      box(500, 300, 140, 56) + tx(570, 328, "motor", "m", "text-anchor=\"middle\"") +
      "<line class=\"wire\" x1=\"206\" y1=\"250\" x2=\"206\" y2=\"328\"></line>" +
      "<line class=\"wire\" x1=\"206\" y1=\"328\" x2=\"300\" y2=\"328\"></line>" +
      "<line class=\"wire\" x1=\"420\" y1=\"328\" x2=\"500\" y2=\"328\" marker-end=\"url(#ah)\"></line>" +
      tx(300, 390, "The pin gives the order. The driver gives the power.", "s") +
      "</g>"
    );
  },

  button: function () {
    return board(
      tx(80, 50, "3.3 V", "s") +
      "<line class=\"wire\" x1=\"100\" y1=\"64\" x2=\"100\" y2=\"110\"></line>" +
      box(70, 110, 60, 36) + tx(100, 128, "pull-up", "tiny", "text-anchor=\"middle\"") +
      "<line class=\"wire\" x1=\"100\" y1=\"146\" x2=\"100\" y2=\"210\"></line>" +
      "<line class=\"wire\" x1=\"100\" y1=\"210\" x2=\"250\" y2=\"210\"></line>" +
      box(250, 186, 140, 48) + tx(320, 210, "GPIO in", "m", "text-anchor=\"middle\"") +
      "<line class=\"wire\" x1=\"100\" y1=\"210\" x2=\"100\" y2=\"280\"></line>" +
      "<g class=\"btncap\">" + box(70, 280, 60, 40) + tx(100, 300, "button", "tiny", "text-anchor=\"middle\"") + "</g>" +
      "<line class=\"wire\" x1=\"100\" y1=\"320\" x2=\"100\" y2=\"360\"></line>" +
      "<line class=\"wire\" x1=\"80\" y1=\"360\" x2=\"120\" y2=\"360\"></line>" +
      "<line class=\"wire thin\" x1=\"88\" y1=\"366\" x2=\"112\" y2=\"366\"></line>" +
      "<line class=\"wire thin\" x1=\"94\" y1=\"372\" x2=\"106\" y2=\"372\"></line>" +
      tx(140, 300, "to ground", "tiny") +
      "<g " + vis(0, 0) + ">" + tx(450, 120, "idle = HIGH", "h") + "</g>" +
      "<g " + vis(1, 1) + ">" + tx(450, 120, "pressed = LOW", "h") + "</g>" +
      "<g " + vis(2, 2) + ">" +
      "<polyline class=\"wire copper\" points=\"430,80 500,80 500,150 530,80 560,150 590,80 620,150 760,150\"></polyline>" +
      tx(430, 190, "bounce: one press, many edges", "m") + "</g>" +
      "<g " + vis(3) + ">" +
      "<polyline class=\"wire green\" points=\"430,80 560,80 560,150 760,150\"></polyline>" +
      box(500, 200, 220, 48, "green") + tx(610, 224, "accept after it stays", "s", "text-anchor=\"middle\"") +
      "</g>"
    );
  },

  adc: function () {
    const wave = sinePoints(60, 40, 12, 180, 60, 1);
    const stairs = stairPath(60, 40, 12, 180, 60, 1, 5);
    const dots = [];
    for (let i = 0; i <= 40; i += 5) {
      const x = 60 + i * 12;
      const y = 180 + Math.sin((i / 40) * Math.PI * 2) * 60;
      dots.push("<circle class=\"copperdot\" cx=\"" + x.toFixed(1) + "\" cy=\"" + y.toFixed(1) + "\" r=\"5\" " + vis(1) + "></circle>");
    }
    return board(
      "<polyline class=\"wire\" points=\"" + wave + "\"></polyline>" +
      "<path class=\"wire blue\" d=\"" + stairs + "\" " + vis(1) + "></path>" +
      dots.join("") +
      "<line class=\"wire copper scan\" x1=\"60\" y1=\"90\" x2=\"60\" y2=\"270\"></line>" +
      tx(60, 50, "smooth voltage", "s") +
      "<g " + vis(1) + ">" + tx(560, 50, "nearest steps", "s") + "</g>" +
      "<g " + vis(2) + ">" +
      "<line class=\"wire\" x1=\"620\" y1=\"90\" x2=\"620\" y2=\"270\"></line>" +
      tx(636, 100, "1023", "s") + tx(636, 180, "512", "s") + tx(636, 260, "0", "s") +
      tx(60, 320, "The count is a fraction of the reference voltage.", "m") +
      "</g>" +
      "<g " + vis(3) + ">" + box(60, 360, 420, 52, "copper") + tx(270, 386, "Hold the voltage still while it converts", "s", "text-anchor=\"middle\"") + "</g>"
    );
  },

  pwm: function () {
    return board(
      "<circle class=\"lamp\" cx=\"690\" cy=\"150\" r=\"36\"></circle>" +
      tx(690, 210, "load", "s", "text-anchor=\"middle\"") +
      "<line class=\"wire copper scan\" x1=\"40\" y1=\"70\" x2=\"40\" y2=\"250\"></line>" +
      "<g " + vis(0, 0) + "><polyline class=\"wire\" points=\"" + squareWave(40, 120, 190, 6, 0.35, 560) + "\"></polyline>" +
      tx(40, 250, "Fast on and off. The load feels the average.", "m") + "</g>" +
      "<g " + vis(1, 1) + "><polyline class=\"wire\" points=\"" + squareWave(40, 120, 190, 5, 0.2, 560) + "\"></polyline>" +
      tx(40, 250, "Duty about 20 percent. Dim or slow.", "m") + "</g>" +
      "<g " + vis(2, 2) + "><polyline class=\"wire\" points=\"" + squareWave(40, 120, 190, 5, 0.5, 560) + "\"></polyline>" +
      tx(40, 250, "Duty about 50 percent. The middle.", "m") + "</g>" +
      "<g " + vis(3) + "><polyline class=\"wire\" points=\"" + squareWave(40, 120, 190, 4, 0.9, 560) + "\"></polyline>" +
      tx(40, 250, "Duty about 90 percent. Frequency keeps it smooth.", "m") + "</g>"
    );
  },

  timers: function () {
    return board(
      box(48, 48, 280, 150) + tx(188, 90, "Timer", "h", "text-anchor=\"middle\"") +
      tx(188, 140, "000", "h", "text-anchor=\"middle\" id=\"tick\"") +
      "<circle id=\"match\" class=\"copperdot\" cx=\"290\" cy=\"70\" r=\"8\"></circle>" +
      "<g " + vis(1) + ">" + box(380, 48, 360, 80) + tx(560, 78, "Prescaler drops extra ticks", "m", "text-anchor=\"middle\"") + tx(560, 104, "so the counter can keep up", "s", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(2) + ">" +
      "<line class=\"wire\" x1=\"80\" y1=\"280\" x2=\"520\" y2=\"280\"></line>" +
      "<circle class=\"greendot\" cx=\"300\" cy=\"280\" r=\"8\"></circle>" +
      tx(300, 250, "compare match", "s", "text-anchor=\"middle\"") +
      tx(80, 330, "Count reaches your number. Hardware can pulse a pin.", "m") +
      "</g>" +
      "<g " + vis(3) + ">" + box(80, 360, 620, 60, "copper") + tx(390, 390, "Watchdog: no pet, no mercy, the chip resets", "m", "text-anchor=\"middle\"") + "</g>"
    );
  },

  interrupts: function () {
    return board(
      "<g " + vis(0, 0) + ">" +
      box(48, 80, 300, 200) + tx(198, 130, "Main loop", "h", "text-anchor=\"middle\"") +
      tx(198, 180, "Button yet?", "m", "text-anchor=\"middle\"") +
      tx(198, 214, "Button yet?", "m", "text-anchor=\"middle\"") +
      tx(198, 248, "This is polling.", "s", "text-anchor=\"middle\"") +
      "</g>" +
      "<g " + vis(1) + ">" +
      box(48, 70, 250, 120) + tx(173, 130, "Main work", "h", "text-anchor=\"middle\"") +
      box(360, 70, 380, 120, "copper") + tx(550, 116, "Handler", "h", "text-anchor=\"middle\"") + tx(550, 148, "a short tap", "s", "text-anchor=\"middle\"") +
      "<path class=\"wire copper\" d=\"M 298 130 H 360\" marker-end=\"url(#ah)\"></path>" +
      "</g>" +
      "<g " + vis(2) + ">" + box(360, 230, 380, 70, "green") + tx(550, 265, "Set a flag. Think later.", "m", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(3) + ">" +
      box(48, 330, 220, 70) + tx(158, 365, "priority 1", "m", "text-anchor=\"middle\"") +
      box(290, 330, 220, 70) + tx(400, 365, "shared number", "m", "text-anchor=\"middle\"") +
      box(530, 330, 220, 70, "blue") + tx(640, 365, "copy it safely", "m", "text-anchor=\"middle\"") +
      "</g>"
    );
  },

  realtime: function () {
    return board(
      "<line class=\"wire\" x1=\"60\" y1=\"180\" x2=\"740\" y2=\"180\"></line>" +
      "<line class=\"wire copper\" x1=\"560\" y1=\"140\" x2=\"560\" y2=\"230\"></line>" +
      tx(560, 120, "deadline", "s", "text-anchor=\"middle\"") +
      tx(60, 70, "time", "s") +
      "<g " + vis(1, 1) + ">" + "<circle class=\"greendot\" cx=\"360\" cy=\"180\" r=\"12\"></circle>" + tx(360, 260, "in time: the result counts", "h", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(2, 2) + ">" + "<circle class=\"copperdot\" cx=\"660\" cy=\"180\" r=\"12\"></circle>" + tx(400, 260, "late: the math can be perfect and still fail", "h", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(0, 0) + ">" + tx(60, 260, "Real-time means there is a due time.", "h") + "</g>" +
      "<g " + vis(3) + ">" +
      box(60, 320, 300, 80) + tx(210, 352, "Hard", "h", "text-anchor=\"middle\"") + tx(210, 376, "late is failure", "s", "text-anchor=\"middle\"") +
      box(420, 320, 300, 80, "blue") + tx(570, 352, "Soft", "h", "text-anchor=\"middle\"") + tx(570, 376, "late is worse, not always fatal", "s", "text-anchor=\"middle\"") +
      "</g>"
    );
  },

  uart: function () {
    const pattern = ["S", "1", "0", "1", "1", "0", "0", "1", "0", "P"];
    return board(
      box(36, 36, 200, 80) + tx(136, 76, "Your TX", "h", "text-anchor=\"middle\"") +
      box(560, 36, 200, 80) + tx(660, 76, "Other RX", "h", "text-anchor=\"middle\"") +
      "<line class=\"wire\" x1=\"236\" y1=\"76\" x2=\"560\" y2=\"76\" marker-end=\"url(#ah)\"></line>" +
      tx(360, 54, "cross the wires", "tiny", "text-anchor=\"middle\"") +
      "<line class=\"wire thin\" x1=\"80\" y1=\"140\" x2=\"720\" y2=\"140\"></line>" +
      tx(36, 140, "GND", "tiny") +
      "<g " + vis(1) + ">" + box(230, 168, 340, 44, "copper") + tx(400, 190, "both sides: 9600", "m", "text-anchor=\"middle\"") + "</g>" +
      bitCells(pattern, 180, 240, 40) +
      "<g " + vis(2) + ">" + tx(80, 310, "St is the start bit. Sp is the stop bit. No clock wire.", "m") + "</g>" +
      "<g " + vis(3) + ">" + tx(80, 360, "Board UART is a logic level, often 3.3 V. Share ground.", "m") + "</g>"
    );
  },

  spi: function () {
    return board(
      box(36, 150, 180, 120) + tx(126, 210, "Controller", "h", "text-anchor=\"middle\"") +
      box(560, 70, 200, 70) + tx(660, 105, "Device A", "m", "text-anchor=\"middle\"") +
      box(560, 250, 200, 70) + tx(660, 285, "Device B", "m", "text-anchor=\"middle\"") +
      tx(250, 70, "clock", "s") + "<line class=\"wire live\" x1=\"220\" y1=\"84\" x2=\"560\" y2=\"84\"></line>" +
      tx(250, 120, "data out", "s") + "<line class=\"wire green\" x1=\"220\" y1=\"134\" x2=\"560\" y2=\"134\"></line>" +
      tx(250, 300, "data in", "s") + "<line class=\"wire blue\" x1=\"220\" y1=\"314\" x2=\"560\" y2=\"314\"></line>" +
      "<g " + vis(1) + ">" +
      "<line class=\"wire copper\" x1=\"220\" y1=\"180\" x2=\"560\" y2=\"110\"></line>" +
      tx(250, 200, "select A", "tiny") +
      "<line class=\"wire\" x1=\"220\" y1=\"230\" x2=\"560\" y2=\"270\"></line>" +
      tx(250, 250, "select B", "tiny") +
      "</g>" +
      "<g " + vis(2) + ">" + tx(36, 40, "Each clock pulse moves one bit out and one bit in.", "m") + "</g>" +
      "<g " + vis(3) + ">" + box(36, 370, 720, 52) + tx(396, 396, "Match the datasheet's clock edge, or every bit slides over.", "s", "text-anchor=\"middle\"") + "</g>"
    );
  },

  i2c: function () {
    return board(
      box(36, 160, 170, 100) + tx(121, 210, "Controller", "m", "text-anchor=\"middle\"") +
      "<g " + hot("1") + ">" + box(520, 60, 200, 80) + tx(620, 100, "0x68 sensor", "m", "text-anchor=\"middle\"") + "</g>" +
      box(520, 280, 200, 80) + tx(620, 320, "0x48 other", "m", "text-anchor=\"middle\"") +
      "<line class=\"wire\" x1=\"206\" y1=\"190\" x2=\"520\" y2=\"100\"></line>" +
      "<line class=\"wire\" x1=\"206\" y1=\"190\" x2=\"520\" y2=\"310\"></line>" +
      "<line class=\"wire blue\" x1=\"206\" y1=\"230\" x2=\"700\" y2=\"230\"></line>" +
      tx(220, 70, "SCL clock", "s") + tx(220, 250, "SDA data", "s") +
      "<g " + vis(0) + ">" + tx(36, 40, "Resistors pull both wires high. Chips only pull low.", "m") + "</g>" +
      "<g " + vis(1) + ">" + box(220, 300, 250, 48, "green") + tx(345, 324, "address 0x68", "m", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(2) + ">" + box(220, 360, 250, 48, "blue") + tx(345, 384, "ack: got it", "m", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(3) + ">" + tx(36, 130, "A slow chip may hold the clock low to ask for time.", "s") + "</g>"
    );
  },

  "other-buses": function () {
    return board(
      "<g " + vis(0) + " " + hot("0") + ">" + box(36, 40, 220, 150) + tx(146, 100, "On one board", "h", "text-anchor=\"middle\"") + tx(146, 132, "UART  SPI  I2C", "s", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(1) + " " + hot("1") + ">" + box(290, 40, 470, 150) + tx(525, 90, "CAN", "h", "text-anchor=\"middle\"") + tx(525, 124, "two opposite wires, messages with IDs", "s", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(2) + ">" +
      box(36, 230, 340, 150, "blue") + tx(206, 290, "USB", "h", "text-anchor=\"middle\"") + tx(206, 322, "talks to a computer", "s", "text-anchor=\"middle\"") +
      box(420, 230, 340, 150, "copper") + tx(590, 290, "RS-485", "h", "text-anchor=\"middle\"") + tx(590, 322, "long cable, noisy room", "s", "text-anchor=\"middle\"") +
      "</g>" +
      "<g " + vis(3) + ">" + tx(36, 410, "Choose by distance, speed, pins, and noise.", "m") + "</g>"
    );
  },

  firmware: function () {
    return board(
      "<circle class=\"greendot packet\" cx=\"110\" cy=\"70\" r=\"10\"></circle>" +
      "<g " + hot("0") + ">" + box(40, 100, 150, 90) + tx(115, 145, "Source", "h", "text-anchor=\"middle\"") + "</g>" +
      "<g " + hot("1") + ">" + box(230, 100, 150, 90) + tx(305, 136, "Build", "h", "text-anchor=\"middle\"") + tx(305, 162, "compile + link", "tiny", "text-anchor=\"middle\"") + "</g>" +
      "<g " + hot("2") + ">" + box(420, 100, 150, 90) + tx(495, 145, "Flash", "h", "text-anchor=\"middle\"") + "</g>" +
      "<g " + hot("3") + ">" + box(610, 100, 150, 90) + tx(685, 145, "Debug", "h", "text-anchor=\"middle\"") + "</g>" +
      "<path class=\"wire\" d=\"M 190 145 H 230\" marker-end=\"url(#ah)\"></path>" +
      "<path class=\"wire\" d=\"M 380 145 H 420\" marker-end=\"url(#ah)\"></path>" +
      "<path class=\"wire\" d=\"M 570 145 H 610\" marker-end=\"url(#ah)\"></path>" +
      "<g " + vis(1, 2) + ">" +
      box(40, 250, 520, 36, "dark") + tx(300, 268, "flash addresses", "s on-dark", "text-anchor=\"middle\"") +
      box(40, 300, 240, 36, "blue") + tx(160, 318, "RAM addresses", "s", "text-anchor=\"middle\"") +
      tx(40, 370, "The linker script is the seating chart.", "m") +
      "</g>" +
      "<g " + vis(3) + ">" + box(40, 280, 720, 80, "green") + tx(400, 320, "A debugger can halt the CPU", "m", "text-anchor=\"middle\"") + tx(400, 346, "Many ARM chips use a two-pin door called SWD", "s", "text-anchor=\"middle\"") + "</g>"
    );
  },

  "bare-rtos": function () {
    return board(
      "<g " + vis(0, 1) + ">" +
      "<rect class=\"box\" x=\"80\" y=\"70\" width=\"280\" height=\"180\" rx=\"90\"></rect>" +
      tx(220, 160, "main loop", "h", "text-anchor=\"middle\"") +
      tx(80, 290, "Bare metal: you are the schedule.", "m") +
      "</g>" +
      "<g " + vis(2) + ">" +
      box(48, 80, 160, 80) + tx(128, 120, "sense", "m", "text-anchor=\"middle\"") +
      box(248, 80, 160, 80) + tx(328, 120, "talk", "m", "text-anchor=\"middle\"") +
      box(448, 80, 160, 80) + tx(528, 120, "log", "m", "text-anchor=\"middle\"") +
      "<circle class=\"greendot hopper\" cx=\"128\" cy=\"60\" r=\"8\"></circle>" +
      tx(48, 200, "The scheduler moves the CPU. It does not speed it up.", "m") +
      "</g>" +
      "<g " + vis(3) + ">" +
      box(48, 280, 300, 90) + tx(198, 325, "queue", "h", "text-anchor=\"middle\"") +
      box(400, 280, 340, 90, "copper") + tx(570, 314, "short lock", "h", "text-anchor=\"middle\"") + tx(570, 340, "or an urgent task waits", "tiny", "text-anchor=\"middle\"") +
      "</g>"
    );
  },

  power: function () {
    return board(
      tx(70, 50, "Always awake", "m") +
      box(70, 70, 220, 36) +
      "<rect class=\"box green drain\" x=\"74\" y=\"74\" width=\"212\" height=\"28\" rx=\"6\"></rect>" +
      tx(420, 50, "Sleep between jobs", "m") +
      box(420, 70, 220, 36) +
      "<rect class=\"box green\" x=\"424\" y=\"74\" width=\"180\" height=\"28\" rx=\"6\"></rect>" +
      "<g " + vis(2) + ">" +
      "<polyline class=\"wire\" points=\"60,200 200,200 260,280 340,160 420,200 740,200\"></polyline>" +
      tx(260, 320, "voltage sag", "s") +
      "<polyline class=\"wire copper\" points=\"300,360 340,360 340,400 420,400 420,360 700,360\"></polyline>" +
      tx(450, 390, "held in reset", "s") +
      "</g>" +
      "<g " + vis(1, 1) + ">" + tx(70, 150, "Do the work, then sleep. Wake for a pin, a timer, or a message.", "m") + "</g>" +
      "<g " + vis(3) + ">" + tx(70, 150, "Deeper sleep saves more. Check whether that sleep keeps RAM.", "m") + "</g>"
    );
  },

  mistakes: function () {
    return board(
      "<g " + vis(0, 0) + ">" + box(80, 80, 640, 200, "copper") +
      tx(400, 150, "A wide number, copied halfway", "h", "text-anchor=\"middle\"") +
      tx(400, 190, "old high half + new low half", "m", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(1, 1) + ">" + box(80, 80, 640, 200, "blue") +
      tx(400, 150, "volatile", "h", "text-anchor=\"middle\"") +
      tx(400, 190, "Read memory again. Hardware changed it.", "m", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(2, 2) + ">" + box(80, 80, 640, 200) +
      tx(400, 150, "Long wait inside the interrupt", "h", "text-anchor=\"middle\"") +
      tx(400, 190, "or a stack with nowhere left to grow", "m", "text-anchor=\"middle\"") + "</g>" +
      "<g " + vis(3) + ">" +
      box(40, 60, 160, 80, "green") + tx(120, 100, "short ISR", "s", "text-anchor=\"middle\"") +
      box(220, 60, 160, 80, "green") + tx(300, 100, "watchdog", "s", "text-anchor=\"middle\"") +
      box(400, 60, 160, 80, "green") + tx(480, 100, "measure", "s", "text-anchor=\"middle\"") +
      box(580, 60, 180, 80, "green") + tx(670, 100, "tie pins", "s", "text-anchor=\"middle\"") +
      "<line class=\"wire\" x1=\"80\" y1=\"220\" x2=\"700\" y2=\"300\"></line>" +
      tx(80, 360, "If the screen and the wire disagree, believe the wire.", "h") +
      "</g>"
    );
  },

  "whole-map": function () {
    return board(
      "<g " + hot("0") + ">" + box(36, 36, 150, 70) + tx(111, 71, "World", "m", "text-anchor=\"middle\"") + "</g>" +
      "<g " + hot("1") + ">" + box(230, 36, 150, 70) + tx(305, 71, "Pins", "m", "text-anchor=\"middle\"") + "</g>" +
      "<g " + hot("2") + ">" + box(424, 36, 170, 70) + tx(509, 71, "Peripherals", "m", "text-anchor=\"middle\"") + "</g>" +
      "<g " + hot("3") + ">" + box(640, 36, 120, 70) + tx(700, 71, "CPU", "m", "text-anchor=\"middle\"") + "</g>" +
      "<path class=\"wire\" d=\"M 186 71 H 230\" marker-end=\"url(#ah)\"></path>" +
      "<path class=\"wire\" d=\"M 380 71 H 424\" marker-end=\"url(#ah)\"></path>" +
      "<path class=\"wire\" d=\"M 594 71 H 640\" marker-end=\"url(#ah)\"></path>" +
      "<g " + hot("4") + ">" + box(230, 180, 200, 80) + tx(330, 220, "Flash and RAM", "m", "text-anchor=\"middle\"") + "</g>" +
      "<g " + hot("5") + ">" + box(480, 180, 280, 80) + tx(620, 210, "Clock and power", "m", "text-anchor=\"middle\"") + tx(620, 234, "sleep, reset, watchdog", "tiny", "text-anchor=\"middle\"") + "</g>" +
      "<g " + hot("6") + ">" + box(36, 320, 724, 90, "green") + tx(398, 354, "Your firmware", "h", "text-anchor=\"middle\"") + tx(398, 382, "write, build, flash, measure", "s", "text-anchor=\"middle\"") + "</g>"
    );
  }
};

const HOOKS = {
  timers: function (root) {
    const label = root.querySelector("#tick");
    const lamp = root.querySelector("#match");
    let value = 0;
    const id = setInterval(function () {
      value = (value + 1) % 400;
      if (label) label.textContent = String(value).padStart(3, "0");
      if (lamp) lamp.classList.toggle("lit", value % 100 === 0);
    }, 45);
    return function () { clearInterval(id); };
  }
};
