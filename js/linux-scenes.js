SCENES["why-linux"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(160, 90, 480, 140, "green") + tx(400, 150, "one program", "h", "text-anchor=\"middle\"") + tx(400, 184, "it owns the whole chip", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 90, 200, 100) + tx(148, 140, "shell", "m", "text-anchor=\"middle\"") +
    box(290, 90, 200, 100, "blue") + tx(390, 140, "logger", "m", "text-anchor=\"middle\"") +
    box(532, 90, 220, 100, "copper") + tx(642, 140, "your app", "m", "text-anchor=\"middle\"") +
    tx(48, 240, "Several programs, one board.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 70, 250, 90) + tx(205, 115, "your program", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 330 115 L 430 115\" marker-end=\"url(#ah)\"></path>" +
    box(440, 70, 280, 90, "green") + tx(580, 115, "kernel", "h", "text-anchor=\"middle\"") +
    tx(80, 220, "The program asks. The kernel touches the hardware.", "m") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 640, 120, "blue") + tx(400, 140, "this board already boots Linux", "h", "text-anchor=\"middle\"") + tx(400, 174, "next: the path from reset to a shell", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["boot-chain"] = function () {
  const names = ["ROM", "SPL", "Loader", "Kernel", "init"];
  const lines = [
    "Fixed code inside the chip",
    "Turns the DRAM on",
    "Loads the kernel and the tree",
    "Starts drivers, mounts root",
    "Then a shell can exist"
  ];
  return board(
    "<circle class=\"greendot token\" cx=\"96\" cy=\"70\" r=\"8\"></circle>" +
    names.map(function (name, i) {
      return "<g " + hot(String(i)) + ">" +
        box(36 + i * 148, 96, 120, 72) +
        tx(96 + i * 148, 132, name, "m", "text-anchor=\"middle\"") +
        "</g>";
    }).join("") +
    lines.map(function (line, i) {
      return "<g " + vis(i, i) + ">" + tx(48, 230, line, "m") + "</g>";
    }).join("")
  );
};

SCENES["boot-rom"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 130, "copper") + tx(220, 145, "inside the chip", "h", "text-anchor=\"middle\"") + tx(220, 178, "not on the SD card", "s", "text-anchor=\"middle\"") +
    box(440, 90, 280, 130) + tx(580, 145, "replacing the card", "m", "text-anchor=\"middle\"") + tx(580, 178, "does not replace this", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    ["SD", "eMMC", "SPI", "USB"].map(function (name, i) {
      return box(48 + i * 180, 100, 150, 80, i === 0 ? "green" : "") + tx(123 + i * 180, 140, name, "m", "text-anchor=\"middle\"");
    }).join("") +
    tx(48, 230, "Pins or fuses pick the media.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 250, 110) + tx(205, 140, "small image", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 330 145 L 430 145\" marker-end=\"url(#ah)\"></path>" +
    box(440, 90, 280, 110, "blue") + tx(580, 140, "on-chip SRAM", "h", "text-anchor=\"middle\"") + tx(580, 168, "DRAM is still off", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 280, 120, "copper") + tx(220, 140, "bad header", "h", "text-anchor=\"middle\"") + tx(220, 172, "try the next device", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "green") + tx(575, 140, "good header", "h", "text-anchor=\"middle\"") + tx(575, 172, "jump into SRAM", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["spl-dram"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 120, "blue") + tx(220, 140, "SPL in SRAM", "h", "text-anchor=\"middle\"") + tx(220, 172, "the file the ROM loaded", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120) + tx(575, 140, "not the kernel", "m", "text-anchor=\"middle\"") + tx(575, 172, "not the boot ROM", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(160, 80, 480, 140, "green") + tx(400, 140, "program the DRAM timing", "h", "text-anchor=\"middle\"") + tx(400, 176, "clocks must match these chips", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 100, 220, 90) + tx(158, 145, "boot media", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 268 145 L 360 145\" marker-end=\"url(#ah)\"></path>" +
    box(370, 100, 360, 90, "green") + tx(550, 145, "full bootloader in DRAM", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 640, 120) + tx(400, 140, "the ROM looks at a fixed offset", "h", "text-anchor=\"middle\"") + tx(400, 174, "that raw area is not the Linux partition", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["bootloader-jump"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 300, 120, "copper") + tx(230, 140, "bootloader prompt", "h", "text-anchor=\"middle\"") + tx(230, 172, "this is not Linux yet", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120) + tx(575, 140, "serial countdown", "m", "text-anchor=\"middle\"") + tx(575, 172, "stop it to look", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 100, 210, 80, "green") + tx(153, 140, "kernel", "m", "text-anchor=\"middle\"") +
    box(290, 100, 210, 80, "blue") + tx(395, 140, "device tree", "m", "text-anchor=\"middle\"") +
    box(532, 100, 220, 80) + tx(642, 140, "initramfs?", "m", "text-anchor=\"middle\"") +
    tx(48, 230, "The tree describes this board.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(60, 90, 680, 110, "green") + tx(400, 135, "console and root disk", "h", "text-anchor=\"middle\"") + tx(400, 168, "rootwait: do not give up if the card is late", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 250, 100) + tx(205, 140, "tree address", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 330 140 L 450 140\" marker-end=\"url(#ah)\"></path>" +
    box(460, 90, 260, 100, "green") + tx(590, 140, "jump to kernel", "h", "text-anchor=\"middle\"") +
    tx(80, 240, "The bootloader does not return.", "m") +
    "</g>"
  );
};

SCENES["kernel-mount"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 120) + tx(220, 140, "unpack the image", "h", "text-anchor=\"middle\"") + tx(220, 172, "read the device tree", "s", "text-anchor=\"middle\"") +
    box(420, 90, 300, 120, "green") + tx(570, 140, "serial stays up", "m", "text-anchor=\"middle\"") + tx(570, 172, "so the console keeps printing", "tiny", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 100, 220, 90, "blue") + tx(158, 145, "storage driver", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire\" d=\"M 268 145 L 360 145\" marker-end=\"url(#ah)\"></path>" +
    box(370, 100, 360, 90) + tx(550, 145, "the named partition", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(120, 90, 560, 120, "green") + tx(400, 140, "rootwait", "h", "text-anchor=\"middle\"") + tx(400, 176, "the card may appear a moment later", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 90, 320, 120) + tx(208, 140, "initramfs", "h", "text-anchor=\"middle\"") + tx(208, 172, "a packed spare, if you need it", "tiny", "text-anchor=\"middle\"") +
    box(420, 90, 320, 120, "green") + tx(580, 140, "then the real disk", "h", "text-anchor=\"middle\"") + tx(580, 172, "mounted at /", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["first-process"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(160, 90, 480, 120, "green") + tx(400, 140, "PID 1", "h", "text-anchor=\"middle\"") + tx(400, 174, "/sbin/init", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 100, 200, 90) + tx(148, 145, "init", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire\" d=\"M 248 145 L 330 145\" marker-end=\"url(#ah)\"></path>" +
    box(340, 100, 180, 90, "blue") + tx(430, 145, "getty", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 520 145 L 590 145\" marker-end=\"url(#ah)\"></path>" +
    box(600, 100, 150, 90, "green") + tx(675, 145, "shell", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 300, 120) + tx(230, 140, "login, then a shell", "m", "text-anchor=\"middle\"") + tx(230, 172, "a desk board", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "green") + tx(575, 140, "start the product app", "m", "text-anchor=\"middle\"") + tx(575, 172, "a shipped board", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(120, 90, 560, 120, "copper") + tx(400, 140, "if PID 1 exits", "h", "text-anchor=\"middle\"") + tx(400, 176, "userspace has nobody left to start programs", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["kernel-user"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 90, 320, 120) + tx(208, 140, "user mode", "h", "text-anchor=\"middle\"") + tx(208, 172, "your program", "s", "text-anchor=\"middle\"") +
    box(420, 90, 320, 120, "dark") + tx(580, 140, "kernel", "h on-dark", "text-anchor=\"middle\"") + tx(580, 172, "may touch devices", "s on-dark", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(60, 100, 160, 80) + tx(140, 140, "read", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 220 140 L 330 140\" marker-end=\"url(#ah)\"></path>" +
    box(340, 90, 200, 100, "green") + tx(440, 140, "system call", "h", "text-anchor=\"middle\"") +
    "<path class=\"wire\" d=\"M 540 140 L 620 140\" marker-end=\"url(#ah)\"></path>" +
    box(630, 100, 120, 80, "dark") + tx(690, 140, "work", "s on-dark", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 640, 120) + tx(400, 140, "the kernel checks the request", "h", "text-anchor=\"middle\"") + tx(400, 176, "one program cannot quietly use another's memory", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 300, 120, "copper") + tx(230, 140, "one byte per call", "m", "text-anchor=\"middle\"") + tx(230, 172, "pays the trap every time", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "green") + tx(575, 140, "batch the bytes", "m", "text-anchor=\"middle\"") + tx(575, 172, "when you can", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["device-files"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(140, 90, 520, 120, "green") + tx(400, 140, "/dev/ttyS0", "h", "text-anchor=\"middle\"") + tx(400, 176, "a name the driver published", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    ["open", "read", "write"].map(function (name, i) {
      return box(80 + i * 220, 100, 180, 80, i === 1 ? "green" : "") + tx(170 + i * 220, 140, name, "m", "text-anchor=\"middle\"");
    }).join("") +
    tx(80, 230, "The same calls as a text file.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 300, 120) + tx(230, 140, "a document", "h", "text-anchor=\"middle\"") + tx(230, 172, "has a length", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "copper") + tx(575, 140, "a device", "h", "text-anchor=\"middle\"") + tx(575, 172, "may wait for the next byte", "tiny", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 100, 220, 80) + tx(158, 140, "disk", "m", "text-anchor=\"middle\"") +
    box(290, 100, 220, 80, "blue") + tx(400, 140, "GPIO", "m", "text-anchor=\"middle\"") +
    box(532, 100, 220, 80) + tx(642, 140, "sensor", "m", "text-anchor=\"middle\"") +
    tx(48, 230, "Each one is a name, if its driver started.", "m") +
    "</g>"
  );
};

SCENES["processes"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 250, 110) + tx(205, 140, "/bin/sh", "h", "text-anchor=\"middle\"") + tx(205, 168, "a file on disk", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 110, "green") + tx(575, 140, "two running copies", "h", "text-anchor=\"middle\"") + tx(575, 168, "two processes", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 90, 200, 100, "copper") + tx(180, 135, "pid 1", "h", "text-anchor=\"middle\"") + tx(180, 162, "init", "s", "text-anchor=\"middle\"") +
    box(320, 90, 180, 100, "green") + tx(410, 140, "pid 42", "m", "text-anchor=\"middle\"") +
    box(540, 90, 180, 100) + tx(630, 140, "pid 43", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    ["directory", "open files", "user"].map(function (name, i) {
      return box(60 + i * 240, 100, 200, 80) + tx(160 + i * 240, 140, name, "m", "text-anchor=\"middle\"");
    }).join("") +
    tx(60, 230, "The pid is how you find this copy later.", "m") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 100, 220, 90, "blue") + tx(190, 145, "shell", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 300 145 L 400 145\" marker-end=\"url(#ah)\"></path>" +
    box(410, 100, 300, 90, "green") + tx(560, 145, "starts a child, then waits", "m", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["own-memory"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 80, 320, 130) + tx(208, 130, "process A", "h", "text-anchor=\"middle\"") + tx(208, 162, "0x1000 holds X", "s", "text-anchor=\"middle\"") +
    box(420, 80, 320, 130, "blue") + tx(580, 130, "process B", "h", "text-anchor=\"middle\"") + tx(580, 162, "0x1000 holds Y", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 90, 280, 120, "copper") + tx(220, 140, "bad pointer", "h", "text-anchor=\"middle\"") + tx(220, 172, "this process stops", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "green") + tx(575, 140, "the other keeps going", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 100, 200, 80) + tx(148, 140, "pipe", "m", "text-anchor=\"middle\"") +
    box(290, 100, 200, 80, "green") + tx(390, 140, "file", "m", "text-anchor=\"middle\"") +
    box(532, 100, 220, 80, "blue") + tx(642, 140, "shared region", "m", "text-anchor=\"middle\"") +
    tx(48, 230, "Sharing is a request, not a shared physical address.", "m") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(140, 90, 520, 120) + tx(400, 140, "maps cost RAM", "h", "text-anchor=\"middle\"") + tx(400, 176, "a tiny board can run out before your array does", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["driver-picture"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 120) + tx(220, 140, "UART registers", "h", "text-anchor=\"middle\"") + tx(220, 172, "same idea as the chip course", "tiny", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "dark") + tx(575, 140, "driver only", "h on-dark", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(60, 100, 200, 90, "blue") + tx(160, 145, "device tree", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire\" d=\"M 260 145 L 350 145\" marker-end=\"url(#ah)\"></path>" +
    box(360, 100, 180, 90, "green") + tx(450, 145, "driver", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 540 145 L 610 145\" marker-end=\"url(#ah)\"></path>" +
    box(620, 100, 130, 90) + tx(685, 145, "/dev", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 280, 120) + tx(220, 140, "your open and read", "m", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "green") + tx(575, 140, "driver's interrupt", "m", "text-anchor=\"middle\"") + tx(575, 172, "not a function in your code", "tiny", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 300, 120) + tx(230, 140, "built into the image", "m", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "blue") + tx(575, 140, "or loaded later", "m", "text-anchor=\"middle\"") + tx(575, 172, "either way, kernel code", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["root-disk"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    [" /bin", "/etc", "/dev", "/tmp"].map(function (name, i) {
      return box(40 + i * 185, 100, 165, 70) + tx(122 + i * 185, 135, name, "m", "text-anchor=\"middle\"");
    }).join("") +
    tx(40, 220, "All of these hang under /.", "m") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 80, 220, 160, "copper") + tx(158, 140, "raw front", "m", "text-anchor=\"middle\"") + tx(158, 168, "SPL and loader", "s", "text-anchor=\"middle\"") +
    box(300, 80, 440, 160, "green") + tx(520, 150, "Linux partition", "h", "text-anchor=\"middle\"") + tx(520, 184, "this is the root tree", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 280, 120) + tx(220, 140, "the executable", "m", "text-anchor=\"middle\"") +
    box(420, 90, 300, 120, "blue") + tx(570, 140, "shared libraries", "m", "text-anchor=\"middle\"") + tx(570, 172, "copying one file is not enough", "tiny", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(120, 90, 560, 120, "copper") + tx(400, 140, "a write can still be in a cache", "h", "text-anchor=\"middle\"") + tx(400, 176, "flush before you trust the card", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["serial-shell"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 100, 180, 80) + tx(170, 140, "TX", "m", "text-anchor=\"middle\"") +
    box(340, 100, 120, 80, "blue") + tx(400, 140, "GND", "m", "text-anchor=\"middle\"") +
    box(540, 100, 180, 80) + tx(630, 140, "RX", "m", "text-anchor=\"middle\"") +
    tx(80, 230, "Same wire the kernel already printed on.", "m") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(140, 90, 520, 120, "green") + tx(400, 145, "#", "h", "text-anchor=\"middle\"") + tx(400, 178, "waiting for Enter", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 300, 110) + tx(230, 145, "uname -s", "h", "text-anchor=\"middle\"") +
    box(440, 90, 280, 110, "green") + tx(580, 145, "Linux", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 300, 120, "copper") + tx(230, 140, "bootloader prompt", "m", "text-anchor=\"middle\"") + tx(230, 172, "let the countdown finish", "tiny", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "green") + tx(575, 140, "shell prompt", "m", "text-anchor=\"middle\"") + tx(575, 172, "the filesystem is there", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["paths"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 110, "green") + tx(220, 140, "pwd", "h", "text-anchor=\"middle\"") + tx(220, 168, "/root", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 110) + tx(575, 140, "no leading slash", "m", "text-anchor=\"middle\"") + tx(575, 168, "starts here", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 90, 250, 110) + tx(205, 145, "ls", "h", "text-anchor=\"middle\"") +
    box(400, 90, 320, 110, "blue") + tx(560, 145, "ls /etc", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(140, 90, 520, 120, "green") + tx(400, 140, "cd changes this shell only", "h", "text-anchor=\"middle\"") + tx(400, 176, "it does not move a file", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 100, 200, 80) + tx(180, 140, ".", "h", "text-anchor=\"middle\"") + tx(180, 162, "here", "s", "text-anchor=\"middle\"") +
    box(340, 100, 200, 80, "copper") + tx(440, 140, "..", "h", "text-anchor=\"middle\"") + tx(440, 162, "parent", "s", "text-anchor=\"middle\"") +
    box(560, 100, 180, 80) + tx(650, 145, "cd ..", "m", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["read-write"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 110) + tx(220, 145, "cat", "h", "text-anchor=\"middle\"") +
    box(430, 90, 290, 110, "green") + tx(575, 145, "prints the file", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(140, 90, 520, 110, "blue") + tx(400, 145, "echo writes to the screen", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 100, 220, 90) + tx(158, 145, "echo hello", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 268 145 L 380 145\" marker-end=\"url(#ah)\"></path>" +
    box(390, 100, 340, 90, "green") + tx(560, 145, "/tmp/note", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(140, 90, 520, 120) + tx(400, 140, "cat /tmp/note", "h", "text-anchor=\"middle\"") + tx(400, 176, "/tmp may vanish on the next boot", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["who-may"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    ["r", "w", "-", "r", "-", "-", "r", "-", "-"].map(function (name, i) {
      const cls = i < 3 ? "green" : i < 6 ? "blue" : "";
      return box(36 + i * 82, 90, 70, 64, cls) + tx(71 + i * 82, 122, name, "m", "text-anchor=\"middle\"");
    }).join("") +
    tx(36, 200, "owner, then group, then everyone else", "m") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 90, 220, 110, "green") + tx(158, 140, "r read", "m", "text-anchor=\"middle\"") +
    box(290, 90, 220, 110) + tx(400, 140, "w write", "m", "text-anchor=\"middle\"") +
    box(532, 90, 220, 110, "blue") + tx(642, 140, "x execute", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 280, 120, "dark") + tx(220, 145, "root", "h on-dark", "text-anchor=\"middle\"") + tx(220, 176, "may ignore the bits", "s on-dark", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120) + tx(575, 145, "a normal login", "m", "text-anchor=\"middle\"") + tx(575, 176, "must obey them", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(140, 90, 520, 110, "green") + tx(400, 145, "chmod a+x ./app", "h", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["pipes"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(60, 100, 200, 90) + tx(160, 145, "ls", "h", "text-anchor=\"middle\"") +
    box(300, 100, 180, 90, "green") + tx(390, 145, "pipe", "h", "text-anchor=\"middle\"") +
    box(520, 100, 200, 90, "blue") + tx(620, 145, "head", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 90, 640, 110, "green") + tx(400, 145, "ls /etc | head", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(140, 90, 520, 120) + tx(400, 140, "a queue in the kernel", "h", "text-anchor=\"middle\"") + tx(400, 176, "it does not show up in ls", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 90, 320, 120, "green") + tx(208, 140, "normal output", "m", "text-anchor=\"middle\"") + tx(208, 172, "goes through the pipe", "s", "text-anchor=\"middle\"") +
    box(420, 90, 320, 120, "copper") + tx(580, 140, "errors", "m", "text-anchor=\"middle\"") + tx(580, 172, "still go to the screen", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["see-processes"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 80, 160, 64, "copper") + tx(160, 112, "1", "h", "text-anchor=\"middle\"") + tx(280, 112, "init", "m") +
    box(80, 160, 160, 64, "green") + tx(160, 192, "42", "h", "text-anchor=\"middle\"") + tx(280, 192, "your app", "m") +
    tx(80, 270, "ps prints the pid and the command.", "m") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 90, 280, 120, "blue") + tx(220, 145, "shell", "h", "text-anchor=\"middle\"") + tx(220, 176, "still waiting", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "green") + tx(575, 145, "child", "h", "text-anchor=\"middle\"") + tx(575, 176, "gone when it exits", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 300, 120, "copper") + tx(230, 140, "kill needs a pid", "h", "text-anchor=\"middle\"") + tx(230, 172, "leave pid 1 alone", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120) + tx(575, 145, "read ps first", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(140, 90, 520, 120, "green") + tx(400, 140, "top", "h", "text-anchor=\"middle\"") + tx(400, 176, "who is using the CPU right now", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["kernel-log"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(140, 80, 520, 50) + tx(400, 108, "older line", "s", "text-anchor=\"middle\"") +
    box(140, 140, 520, 50, "green") + tx(400, 168, "newest line", "m", "text-anchor=\"middle\"") +
    tx(140, 240, "A ring. New lines push old ones out.", "m") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(60, 100, 220, 90) + tx(170, 145, "dmesg", "h", "text-anchor=\"middle\"") +
    box(320, 100, 140, 90, "green") + tx(390, 145, "pipe", "m", "text-anchor=\"middle\"") +
    box(500, 100, 220, 90, "blue") + tx(610, 145, "tail", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 640, 120) + tx(400, 140, "mmc, uart, usb", "h", "text-anchor=\"middle\"") + tx(400, 176, "a failed probe usually says why", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 90, 330, 120, "green") + tx(213, 140, "driver lines", "h", "text-anchor=\"middle\"") + tx(213, 172, "dmesg", "s", "text-anchor=\"middle\"") +
    box(420, 90, 320, 120) + tx(580, 140, "printf", "h", "text-anchor=\"middle\"") + tx(580, 172, "your terminal, not dmesg", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["start-your-app"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(140, 90, 520, 120, "green") + tx(400, 145, "./readport", "h", "text-anchor=\"middle\"") + tx(400, 178, "this directory, and the execute bit", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(60, 100, 200, 90) + tx(160, 145, "open", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire\" d=\"M 260 145 L 340 145\" marker-end=\"url(#ah)\"></path>" +
    box(350, 100, 160, 90, "blue") + tx(430, 145, "read", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 510 145 L 580 145\" marker-end=\"url(#ah)\"></path>" +
    box(590, 100, 150, 90, "green") + tx(665, 145, "print", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 90, 330, 120) + tx(213, 140, "no ampersand", "h", "text-anchor=\"middle\"") + tx(213, 172, "the shell waits", "s", "text-anchor=\"middle\"") +
    box(420, 90, 320, 120, "green") + tx(580, 140, "with an ampersand", "h", "text-anchor=\"middle\"") + tx(580, 172, "prompt returns, process stays", "tiny", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 280, 120, "copper") + tx(220, 140, "a hand start", "m", "text-anchor=\"middle\"") + tx(220, 172, "dies with the session", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "green") + tx(575, 140, "init", "h", "text-anchor=\"middle\"") + tx(575, 172, "can start it every boot", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};
