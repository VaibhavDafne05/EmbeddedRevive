SCENES["path-search"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 200, 90) + tx(180, 135, "ls", "h", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 280 135 L 380 135\" marker-end=\"url(#ah)\"></path>" +
    box(390, 90, 320, 90, "green") + tx(550, 135, "search PATH", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 100, 200, 80, "green") + tx(148, 140, "/bin", "m", "text-anchor=\"middle\"") +
    box(280, 100, 220, 80, "green") + tx(390, 140, "/usr/bin", "m", "text-anchor=\"middle\"") +
    box(530, 100, 220, 80) + tx(640, 140, "not here", "m", "text-anchor=\"middle\"") +
    tx(48, 230, "Colons separate the directories.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(140, 90, 520, 120, "green") + tx(400, 145, "./readport", "h", "text-anchor=\"middle\"") + tx(400, 178, "this file, in this directory", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 90, 320, 120, "copper") + tx(208, 140, "earlier directory", "h", "text-anchor=\"middle\"") + tx(208, 172, "wins the name", "s", "text-anchor=\"middle\"") +
    box(420, 90, 320, 120) + tx(580, 140, "the copy you just made", "m", "text-anchor=\"middle\"") + tx(580, 172, "never reached", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["three-streams"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 100, 220, 80) + tx(158, 140, "input", "m", "text-anchor=\"middle\"") +
    box(290, 100, 220, 80, "green") + tx(400, 140, "output", "m", "text-anchor=\"middle\"") +
    box(532, 100, 220, 80, "copper") + tx(642, 140, "errors", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(60, 100, 200, 90, "green") + tx(160, 145, "output", "m", "text-anchor=\"middle\"") +
    box(300, 100, 160, 90) + tx(380, 145, "pipe", "m", "text-anchor=\"middle\"") +
    box(500, 100, 240, 90, "copper") + tx(620, 145, "errors stay", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 280, 110) + tx(220, 145, "ls fails", "h", "text-anchor=\"middle\"") +
    "<path class=\"wire copper\" d=\"M 360 145 L 460 145\" marker-end=\"url(#ah)\"></path>" +
    box(470, 90, 250, 110, "copper") + tx(595, 145, "/tmp/err", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(140, 90, 520, 120, "blue") + tx(400, 140, "a file can feed input too", "h", "text-anchor=\"middle\"") + tx(400, 176, "only if the command reads that stream", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["grep-line"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 80, 300, 50) + tx(198, 108, "uart ok", "s", "text-anchor=\"middle\"") +
    box(48, 140, 300, 50, "green") + tx(198, 168, "ttyS0 ready", "s", "text-anchor=\"middle\"") +
    box(48, 200, 300, 50) + tx(198, 228, "mmc ready", "s", "text-anchor=\"middle\"") +
    box(420, 140, 300, 50, "green") + tx(570, 168, "kept", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 100, 200, 90) + tx(148, 145, "dmesg", "h", "text-anchor=\"middle\"") +
    box(280, 100, 160, 90, "green") + tx(360, 145, "pipe", "m", "text-anchor=\"middle\"") +
    box(470, 100, 260, 90, "blue") + tx(600, 145, "grep tty", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(140, 90, 520, 120) + tx(400, 145, "or a file, by name", "h", "text-anchor=\"middle\"") + tx(400, 178, "a plain word is the safe search", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(140, 90, 520, 120, "copper") + tx(400, 140, "no lines", "h", "text-anchor=\"middle\"") + tx(400, 176, "that means nothing matched", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["shell-script"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(140, 90, 520, 120, "green") + tx(400, 140, "#!/bin/sh", "h", "text-anchor=\"middle\"") + tx(400, 176, "the kernel starts this shell", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 90, 280, 110) + tx(220, 145, "NAME=board", "h", "text-anchor=\"middle\"") +
    box(420, 90, 300, 110, "blue") + tx(570, 145, "$NAME", "h", "text-anchor=\"middle\"") +
    tx(80, 250, "No spaces around the equals sign.", "m") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 100, 250, 90) + tx(205, 145, "chmod a+x", "m", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 330 145 L 430 145\" marker-end=\"url(#ah)\"></path>" +
    box(440, 100, 280, 90, "green") + tx(580, 145, "./status", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(48, 90, 330, 120, "green") + tx(213, 140, "a few commands", "h", "text-anchor=\"middle\"") + tx(213, 172, "a script is enough", "s", "text-anchor=\"middle\"") +
    box(420, 90, 320, 120) + tx(580, 140, "branches and timeouts", "m", "text-anchor=\"middle\"") + tx(580, 172, "use a real program", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["users-root"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 120, "copper") + tx(220, 140, "uid 0", "h", "text-anchor=\"middle\"") + tx(220, 172, "root", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "green") + tx(575, 140, "any other uid", "h", "text-anchor=\"middle\"") + tx(575, 172, "a normal user", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(140, 90, 520, 120, "copper") + tx(400, 140, "root ignores permission bits", "h", "text-anchor=\"middle\"") + tx(400, 176, "a bug then ignores them too", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 100, 250, 90, "blue") + tx(205, 145, "sudo one command", "m", "text-anchor=\"middle\"") +
    box(400, 100, 320, 90, "green") + tx(560, 145, "then you are yourself", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 300, 120, "green") + tx(230, 140, "the product app", "h", "text-anchor=\"middle\"") + tx(230, 172, "a normal user", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120) + tx(575, 140, "give it the device", "m", "text-anchor=\"middle\"") + tx(575, 172, "not the whole board", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["signals"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 120, "green") + tx(220, 140, "TERM", "h", "text-anchor=\"middle\"") + tx(220, 172, "please finish and exit", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120) + tx(575, 145, "the program can catch it", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 90, 250, 110) + tx(205, 145, "ps", "h", "text-anchor=\"middle\"") +
    "<path class=\"wire\" d=\"M 330 145 L 430 145\" marker-end=\"url(#ah)\"></path>" +
    box(440, 90, 280, 110, "green") + tx(580, 145, "pid 42", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 300, 120, "copper") + tx(230, 140, "KILL", "h", "text-anchor=\"middle\"") + tx(230, 172, "cannot be caught", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120) + tx(575, 140, "half-written files", "m", "text-anchor=\"middle\"") + tx(575, 172, "use it second", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(160, 90, 480, 120, "copper") + tx(400, 140, "leave pid 1", "h", "text-anchor=\"middle\"") + tx(400, 176, "restart your app by its own pid", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["proc-window"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 120, "blue") + tx(220, 140, "/proc", "h", "text-anchor=\"middle\"") + tx(220, 172, "not on the SD card", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120) + tx(575, 140, "1  42  43", "h", "text-anchor=\"middle\"") + tx(575, 172, "those are pids", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 100, 220, 80, "green") + tx(158, 140, "cmdline", "m", "text-anchor=\"middle\"") +
    box(290, 100, 220, 80) + tx(400, 140, "status", "m", "text-anchor=\"middle\"") +
    box(532, 100, 220, 80, "blue") + tx(642, 140, "the user", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 280, 110) + tx(220, 145, "meminfo", "h", "text-anchor=\"middle\"") +
    box(430, 90, 290, 110, "green") + tx(575, 145, "cpuinfo", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(140, 90, 520, 120, "copper") + tx(400, 140, "a pid folder vanishes", "h", "text-anchor=\"middle\"") + tx(400, 176, "do not store settings here", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["mounts"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(48, 100, 200, 90, "green") + tx(148, 145, "/", "h", "text-anchor=\"middle\"") +
    box(300, 100, 200, 90, "blue") + tx(400, 145, "/data", "h", "text-anchor=\"middle\"") +
    box(552, 100, 200, 90) + tx(652, 145, "other disk", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 80, 640, 70) + tx(400, 118, "/   40% full", "m", "text-anchor=\"middle\"") +
    box(80, 170, 640, 70, "copper") + tx(400, 208, "/data   full", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 280, 120, "blue") + tx(220, 140, "/proc", "h", "text-anchor=\"middle\"") + tx(220, 172, "no disk", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "blue") + tx(575, 140, "/sys", "h", "text-anchor=\"middle\"") + tx(575, 172, "devices and knobs", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(140, 90, 520, 120, "copper") + tx(400, 140, "unmount, then pull the card", "h", "text-anchor=\"middle\"") + tx(400, 176, "a live card can tear a file", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["modules"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 640, 50) + tx(120, 118, "uart", "m") + tx(400, 118, "used by 1", "s") +
    box(80, 160, 640, 50, "green") + tx(120, 188, "sensor", "m") + tx(400, 188, "used by 0", "s") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(60, 100, 220, 90) + tx(170, 145, "modprobe", "h", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 280 145 L 380 145\" marker-end=\"url(#ah)\"></path>" +
    box(390, 100, 320, 90, "green") + tx(550, 145, "a new /dev name", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 300, 120, "copper") + tx(230, 140, "still open", "h", "text-anchor=\"middle\"") + tx(230, 172, "rmmod refuses", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "green") + tx(575, 140, "close it first", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(140, 90, 520, 120) + tx(400, 140, "use the modules the board ships", "h", "text-anchor=\"middle\"") + tx(400, 176, "open the device they publish", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["ram-left"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 200, 120) + tx(180, 145, "total", "h", "text-anchor=\"middle\"") +
    box(300, 90, 200, 120, "copper") + tx(400, 145, "used", "h", "text-anchor=\"middle\"") +
    box(520, 90, 200, 120, "green") + tx(620, 145, "available", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(140, 90, 520, 120, "blue") + tx(400, 140, "file cache", "h", "text-anchor=\"middle\"") + tx(400, 176, "given back when a program needs it", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(140, 90, 520, 120, "copper") + tx(400, 140, "nothing available", "h", "text-anchor=\"middle\"") + tx(400, 176, "the kernel may kill a process", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 300, 120, "green") + tx(230, 140, "one runaway", "h", "text-anchor=\"middle\"") + tx(230, 172, "ps can sort by memory", "tiny", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120) + tx(575, 140, "or the board is small", "m", "text-anchor=\"middle\"") + tx(575, 172, "kernel plus maps plus app", "tiny", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["ip-addr"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 120, "green") + tx(220, 140, "eth0", "h", "text-anchor=\"middle\"") + tx(220, 172, "192.168.1.10", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120) + tx(575, 145, "the name can differ", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 90, 280, 120, "copper") + tx(220, 140, "DOWN", "h", "text-anchor=\"middle\"") + tx(220, 172, "will not answer", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "green") + tx(575, 140, "UP", "h", "text-anchor=\"middle\"") + tx(575, 172, "cable present", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(140, 90, 520, 120, "blue") + tx(400, 140, "127.0.0.1", "h", "text-anchor=\"middle\"") + tx(400, 176, "the board talking to itself", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 300, 120) + tx(230, 140, "handed out", "m", "text-anchor=\"middle\"") + tx(230, 172, "by a router", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "green") + tx(575, 140, "or fixed", "m", "text-anchor=\"middle\"") + tx(575, 172, "ip addr shows the result", "tiny", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["ping-ssh"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 100, 220, 90) + tx(190, 145, "ping", "h", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 300 145 L 420 145\" marker-end=\"url(#ah)\"></path>" +
    box(430, 100, 280, 90, "green") + tx(570, 145, "replies", "h", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(140, 90, 520, 120, "green") + tx(400, 140, "ssh", "h", "text-anchor=\"middle\"") + tx(400, 176, "a shell, same commands as the cable", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(140, 90, 520, 120, "copper") + tx(400, 140, "accept the host key once", "h", "text-anchor=\"middle\"") + tx(400, 176, "a later change means a different board", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(80, 90, 300, 120) + tx(230, 140, "serial cable", "h", "text-anchor=\"middle\"") + tx(230, 172, "when the address is wrong", "tiny", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "green") + tx(575, 140, "ssh", "h", "text-anchor=\"middle\"") + tx(575, 172, "when the path works", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["boot-again"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 120, "copper") + tx(220, 140, "typed by hand", "h", "text-anchor=\"middle\"") + tx(220, 172, "gone after reboot", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120) + tx(575, 145, "the shell does not remember", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(80, 100, 220, 90, "blue") + tx(190, 145, "init", "h", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 300 145 L 420 145\" marker-end=\"url(#ah)\"></path>" +
    box(430, 100, 290, 90, "green") + tx(575, 145, "/usr/bin/readport", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(140, 90, 520, 120) + tx(400, 140, "it should keep running", "h", "text-anchor=\"middle\"") + tx(400, 176, "init can start it again if it exits", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(140, 90, 520, 120, "green") + tx(400, 140, "reboot and watch", "h", "text-anchor=\"middle\"") + tx(400, 176, "no typing required", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["log-file"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 120, "copper") + tx(220, 140, "dmesg", "h", "text-anchor=\"middle\"") + tx(220, 172, "a ring in RAM", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120) + tx(575, 140, "reboot clears it", "m", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(140, 90, 520, 120, "green") + tx(400, 140, "/var/log", "h", "text-anchor=\"middle\"") + tx(400, 176, "files, if a disk is behind them", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(140, 90, 520, 120, "blue") + tx(400, 140, "sometimes /var/log is RAM", "h", "text-anchor=\"middle\"") + tx(400, 176, "df shows the mount", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(140, 90, 520, 120, "copper") + tx(400, 140, "a log can fill the disk", "h", "text-anchor=\"middle\"") + tx(400, 176, "then ordinary writes fail", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["readonly-root"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(140, 90, 520, 120, "green") + tx(400, 140, "/ is read-only", "h", "text-anchor=\"middle\"") + tx(400, 176, "a power cut cannot tear it", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(48, 100, 220, 90, "blue") + tx(158, 145, "/tmp in RAM", "m", "text-anchor=\"middle\"") +
    box(300, 100, 200, 90, "green") + tx(400, 145, "/data", "m", "text-anchor=\"middle\"") +
    box(530, 100, 220, 90) + tx(640, 145, "settings live here", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(80, 90, 280, 120) + tx(220, 140, "ro", "h", "text-anchor=\"middle\"") + tx(220, 172, "writes refused", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "copper") + tx(575, 140, "rw", "h", "text-anchor=\"middle\"") + tx(575, 172, "writes allowed", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(60, 100, 200, 80) + tx(160, 140, "remount", "m", "text-anchor=\"middle\"") +
    box(290, 100, 200, 80, "green") + tx(390, 140, "copy", "m", "text-anchor=\"middle\"") +
    box(520, 100, 220, 80) + tx(630, 140, "read-only again", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};

SCENES["copy-binary"] = function () {
  return board(
    "<g " + vis(0, 0) + ">" +
    box(80, 90, 280, 120) + tx(220, 140, "PC binary", "h", "text-anchor=\"middle\"") + tx(220, 172, "often x86-64", "s", "text-anchor=\"middle\"") +
    box(430, 90, 290, 120, "copper") + tx(575, 140, "ARM board", "h", "text-anchor=\"middle\"") + tx(575, 172, "will not run it", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(1, 1) + ">" +
    box(140, 90, 520, 120, "green") + tx(400, 140, "cross compiler", "h", "text-anchor=\"middle\"") + tx(400, 176, "runs on the PC, writes the board's CPU", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(2, 2) + ">" +
    box(48, 100, 200, 90) + tx(148, 145, "scp", "h", "text-anchor=\"middle\"") +
    "<path class=\"wire green\" d=\"M 248 145 L 340 145\" marker-end=\"url(#ah)\"></path>" +
    box(350, 100, 180, 90, "blue") + tx(440, 145, "/usr/bin", "m", "text-anchor=\"middle\"") +
    box(560, 100, 190, 90, "green") + tx(655, 145, "chmod a+x", "s", "text-anchor=\"middle\"") +
    "</g>" +
    "<g " + vis(3) + ">" +
    box(140, 90, 520, 120) + tx(400, 140, "file tells you the CPU", "h", "text-anchor=\"middle\"") + tx(400, 176, "compare it with cpuinfo", "s", "text-anchor=\"middle\"") +
    "</g>"
  );
};
