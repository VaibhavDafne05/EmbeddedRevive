const STORAGE_KEY = "embedded-refresher-v1";

const state = {
  course: "chip",
  index: 0,
  frame: 0,
  playing: true,
  pace: 1,
  done: {},
  answered: null,
  books: {
    chip: { index: 0, done: {} },
    c: { index: 0, done: {} },
    linux: { index: 0, done: {} }
  }
};

let playToken = 0;
let timer = 0;
let cleanupHook = function () {};
let railStamp = "";

const byId = (id) => document.getElementById(id);

function activeLessons() {
  if (state.course === "linux") return LINUX_LESSONS;
  if (state.course === "c") return C_LESSONS;
  return LESSONS;
}

function courseList(course) {
  if (course === "linux") return LINUX_LESSONS;
  if (course === "c") return C_LESSONS;
  return LESSONS;
}

function knownCourse(course) {
  if (course === "linux" || course === "c") return course;
  return "chip";
}

function clampIndex(list, index) {
  if (!Number.isInteger(index) || index < 0 || index >= list.length) return 0;
  return index;
}

function readBook(raw, list) {
  const done = raw && raw.done && typeof raw.done === "object" ? raw.done : {};
  return { index: clampIndex(list, raw && raw.index), done: done };
}

function loadProgress() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (raw.pace === 0.62) state.pace = 0.62;
    if (raw.chip && raw.linux) {
      state.books.chip = readBook(raw.chip, LESSONS);
      state.books.linux = readBook(raw.linux, LINUX_LESSONS);
      state.books.c = readBook(raw.c, C_LESSONS);
      state.course = knownCourse(raw.course);
    } else {
      state.books.chip = readBook(raw, LESSONS);
      state.books.linux = { index: 0, done: {} };
      state.books.c = { index: 0, done: {} };
      state.course = "chip";
    }
  } catch (err) {
    state.course = "chip";
    state.books = {
      chip: { index: 0, done: {} },
      c: { index: 0, done: {} },
      linux: { index: 0, done: {} }
    };
  }
  state.index = state.books[state.course].index;
  state.done = state.books[state.course].done;
}

function saveProgress() {
  state.books[state.course] = { index: state.index, done: state.done };
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    course: state.course,
    pace: state.pace,
    chip: state.books.chip,
    c: state.books.c,
    linux: state.books.linux
  }));
}

function useCourse(course) {
  course = knownCourse(course);
  if (course === state.course) return;
  state.books[state.course] = { index: state.index, done: state.done };
  state.course = course;
  state.index = clampIndex(activeLessons(), state.books[course].index);
  state.done = state.books[course].done;
  railStamp = "";
}

function currentLesson() {
  return activeLessons()[state.index];
}

function dwell(step) {
  const words = step.text.trim().split(/\s+/).length;
  const base = Math.min(7600, Math.max(3900, 1700 + words * 210));
  return Math.round(base * state.pace);
}

function stopPlayback() {
  state.playing = false;
  playToken += 1;
  clearTimeout(timer);
}

function schedule() {
  clearTimeout(timer);
  const token = ++playToken;
  const wait = dwell(currentLesson().steps[state.frame]);
  timer = setTimeout(function () {
    if (token !== playToken || !state.playing) return;
    const last = currentLesson().steps.length - 1;
    if (state.frame >= last) {
      state.playing = false;
      render();
      return;
    }
    state.frame += 1;
    render();
    schedule();
  }, wait);
}

function applyFrame(root, frame) {
  root.dataset.frame = String(frame);
  root.querySelectorAll("[data-show]").forEach(function (node) {
    const show = Number(node.getAttribute("data-show"));
    const hideRaw = node.getAttribute("data-hide");
    const hide = hideRaw == null ? Infinity : Number(hideRaw);
    node.classList.toggle("on", frame >= show && frame <= hide);
  });
  root.querySelectorAll("[data-hot]").forEach(function (node) {
    const frames = node.getAttribute("data-hot").split(",").map(function (n) {
      return Number(n.trim());
    });
    node.classList.toggle("hot", frames.includes(frame));
  });
}

function mountScene() {
  cleanupHook();
  const lesson = currentLesson();
  const stage = byId("stage");
  const draw = SCENES[lesson.id];
  if (!draw) {
    stage.innerHTML = "<p class=\"boot\">This picture is missing.</p>";
    cleanupHook = function () {};
    return;
  }
  stage.innerHTML = "<div class=\"scene scene-" + lesson.id + "\" data-frame=\"0\">" + draw() + "</div>";
  const root = stage.firstElementChild;
  cleanupHook = HOOKS[lesson.id] ? HOOKS[lesson.id](root) : function () {};
  applyFrame(root, state.frame);
}

function renderRail() {
  const stamp = state.course + ":" + state.index + ":" + Object.keys(state.done).sort().join(",");
  const scroller = byId("rail");
  const top = scroller.scrollTop;
  let html = "";
  let lastModule = "";
  activeLessons().forEach(function (lesson, index) {
    if (lesson.module !== lastModule) {
      html += "<p class=\"module-label\">" + lesson.module + "</p>";
      lastModule = lesson.module;
    }
    const classes = ["lesson-btn"];
    if (index === state.index) classes.push("active");
    if (state.done[lesson.id]) classes.push("done");
    const num = String(index + 1).padStart(2, "0");
    html += "<button type=\"button\" class=\"" + classes.join(" ") + "\" data-lesson=\"" + index + "\">" +
      "<span class=\"idx\">" + num + "</span><span class=\"name\">" + lesson.title + "</span></button>";
  });
  byId("rail-list").innerHTML = html;
  byId("rail-list").querySelectorAll("button").forEach(function (button) {
    button.addEventListener("click", function () {
      goToLesson(Number(button.dataset.lesson), true);
    });
  });
  scroller.scrollTop = top;
  if (stamp !== railStamp) {
    const active = byId("rail-list").querySelector(".active");
    if (active) active.scrollIntoView({ block: "nearest" });
    railStamp = stamp;
  }
}

function renderJump() {
  const jump = byId("jump");
  jump.innerHTML = activeLessons().map(function (lesson, index) {
    const num = String(index + 1).padStart(2, "0");
    return "<option value=\"" + index + "\">" + num + "  " + lesson.title + "</option>";
  }).join("");
  jump.value = String(state.index);
}

function renderDots() {
  const lesson = currentLesson();
  byId("dots").innerHTML = lesson.steps.map(function (step, index) {
    const cls = index === state.frame ? "dot on" : index < state.frame ? "dot seen" : "dot";
    return "<button type=\"button\" class=\"" + cls + "\" data-frame=\"" + index + "\">" + step.label + "</button>";
  }).join("");
  byId("dots").querySelectorAll("button").forEach(function (button) {
    button.addEventListener("click", function () {
      state.frame = Number(button.dataset.frame);
      if (state.frame !== currentLesson().steps.length - 1) state.answered = null;
      render();
      if (state.playing) schedule();
    });
  });
}

function renderQuiz() {
  const lesson = currentLesson();
  const quiz = byId("quiz");
  const atEnd = state.frame === lesson.steps.length - 1;
  quiz.hidden = !atEnd;
  if (!atEnd) {
    quiz.innerHTML = "";
    return;
  }
  const picked = state.answered;
  const choices = lesson.quiz.choices.map(function (choice, index) {
    let cls = "choice";
    if (picked != null && index === lesson.quiz.a) cls += " right";
    if (picked != null && index === picked && picked !== lesson.quiz.a) cls += " wrong";
    return "<button type=\"button\" class=\"" + cls + "\" data-choice=\"" + index + "\"" +
      (picked != null ? " disabled" : "") + ">" + choice + "</button>";
  }).join("");
  let feedback = "";
  if (picked != null) {
    const ok = picked === lesson.quiz.a;
    feedback = "<p class=\"because " + (ok ? "yes" : "no") + "\">" + lesson.quiz.because + "</p>";
  }
  let actions = "";
  if (picked != null) {
    const last = state.index === activeLessons().length - 1;
    const nextLabel = last ? "Replay from the start" : "Next lesson";
    const retry = picked === lesson.quiz.a ? "" : "<button type=\"button\" class=\"ctrl\" id=\"retry\">See the pictures again</button>";
    actions = "<div class=\"quiz-actions\">" + retry +
      "<button type=\"button\" class=\"ctrl primary\" id=\"next-lesson\">" + nextLabel + "</button></div>";
  }
  quiz.innerHTML = "<h2>Quick check</h2><p class=\"q\">" + lesson.quiz.q + "</p>" + choices + feedback + actions;
  quiz.querySelectorAll("[data-choice]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (state.answered != null) return;
      state.answered = Number(button.dataset.choice);
      if (state.answered === lesson.quiz.a) state.done[lesson.id] = true;
      stopPlayback();
      saveProgress();
      render();
    });
  });
  const next = byId("next-lesson");
  if (next) {
    next.addEventListener("click", function () {
      if (state.index === activeLessons().length - 1) goToLesson(0, true);
      else goToLesson(state.index + 1, true);
    });
  }
  const retry = byId("retry");
  if (retry) retry.addEventListener("click", replay);
  requestAnimationFrame(function () {
    quiz.scrollIntoView({ block: "end" });
  });
}

function render() {
  const lesson = currentLesson();
  const step = lesson.steps[state.frame];
  const last = lesson.steps.length - 1;
  document.title = lesson.title + (state.course === "linux" ? " · Linux refresher" : state.course === "c" ? " · C refresher" : " · Embedded refresher");
  byId("module").textContent = lesson.module;
  byId("title").textContent = lesson.title;
  byId("count").textContent = "Lesson " + (state.index + 1) + " of " + activeLessons().length;
  byId("tab-chip").setAttribute("aria-selected", state.course === "chip" ? "true" : "false");
  byId("tab-c").setAttribute("aria-selected", state.course === "c" ? "true" : "false");
  byId("tab-linux").setAttribute("aria-selected", state.course === "linux" ? "true" : "false");
  byId("brand-note").textContent = state.course === "linux"
    ? "Plain words. Moving pictures. From the first instruction, through the shell, to the network and the next boot."
    : state.course === "c"
    ? "Plain words. Moving pictures. The C language, then the habits that matter on a small chip."
    : "Plain words. Moving pictures. From the chip and the buses through AUTOSAR, safety, and the build.";
  byId("rail-blurb").textContent = state.course === "linux"
    ? "Teaching model for a board that already runs Linux. The board manual still names the boot pins and the real device paths."
    : state.course === "c"
    ? "Teaching model for C on a microcontroller. Widths match a common Cortex-M. The compiler manual still wins for its choices."
    : "Teaching model for everyday microcontrollers. The datasheet still wins for exact registers and voltages.";
  byId("word").innerHTML = "<b>" + lesson.word.term + "</b> " + lesson.word.means;
  byId("line").textContent = step.text;
  const sampleWrap = byId("sample-wrap");
  const code = step.code || lesson.code || "";
  sampleWrap.hidden = code.length === 0;
  byId("sample").textContent = code;
  byId("pic").textContent = "Picture " + (state.frame + 1) + " of " + lesson.steps.length + " · " + step.label;
  byId("bar").style.width = ((state.frame + 1) / lesson.steps.length * 100) + "%";
  byId("play").textContent = state.playing ? "Pause" : "Play";
  byId("pace").textContent = state.pace < 1 ? "Pace: brisk" : "Pace: steady";
  byId("prev").disabled = state.frame === 0;
  byId("next").disabled = state.frame === last;
  const takeaway = byId("takeaway");
  takeaway.hidden = state.frame !== last;
  takeaway.textContent = lesson.takeaway;
  const prefix = state.course === "linux" ? "#linux/" : state.course === "c" ? "#c/" : "#";
  const hash = prefix + (state.index + 1) + "." + (state.frame + 1);
  if (location.hash !== hash || location.search) {
    history.replaceState(null, "", location.pathname + hash);
  }
  const root = byId("stage").firstElementChild;
  if (root && root.classList.contains("scene")) applyFrame(root, state.frame);
  renderDots();
  renderRail();
  renderJump();
  renderQuiz();
}

function lessonFromHash() {
  const linux = /^#linux\/(\d+)(?:\.(\d+))?/.exec(location.hash);
  const clang = /^#c\/(\d+)(?:\.(\d+))?/.exec(location.hash);
  const chip = /^#(\d+)(?:\.(\d+))?/.exec(location.hash);
  const match = linux || clang || chip;
  if (!match) return null;
  const course = linux ? "linux" : clang ? "c" : "chip";
  const list = courseList(course);
  const index = Number(match[1]) - 1;
  if (!list[index]) return null;
  const max = list[index].steps.length - 1;
  const frame = match[2] ? Math.min(max, Math.max(0, Number(match[2]) - 1)) : 0;
  return { course: course, index: index, frame: frame };
}

function switchCourse(course) {
  if (course === state.course) return;
  stopPlayback();
  useCourse(course);
  goToLesson(state.index, true, 0);
}

function goToLesson(index, autoplay, frame) {
  stopPlayback();
  state.index = index;
  state.frame = frame || 0;
  state.answered = null;
  state.playing = autoplay;
  mountScene();
  render();
  saveProgress();
  if (autoplay) schedule();
}

function replay() {
  state.frame = 0;
  state.answered = null;
  state.playing = true;
  render();
  schedule();
}

function stepBy(delta) {
  const last = currentLesson().steps.length - 1;
  const next = Math.min(last, Math.max(0, state.frame + delta));
  if (next === state.frame) return;
  state.frame = next;
  if (state.frame !== last) state.answered = null;
  render();
  if (state.playing) schedule();
}

function togglePlay() {
  if (state.playing) {
    stopPlayback();
    render();
    return;
  }
  if (state.frame >= currentLesson().steps.length - 1) {
    state.frame = 0;
    state.answered = null;
  }
  state.playing = true;
  render();
  schedule();
}

function init() {
  loadProgress();
  byId("play").addEventListener("click", togglePlay);
  byId("prev").addEventListener("click", function () { stepBy(-1); });
  byId("next").addEventListener("click", function () { stepBy(1); });
  byId("replay").addEventListener("click", replay);
  byId("pace").addEventListener("click", function () {
    state.pace = state.pace < 1 ? 1 : 0.62;
    saveProgress();
    render();
    if (state.playing) schedule();
  });
  byId("jump").addEventListener("change", function (event) {
    goToLesson(Number(event.target.value), true);
  });
  byId("clear").addEventListener("click", function () {
    state.done = {};
    saveProgress();
    render();
  });
  byId("tab-chip").addEventListener("click", function () { switchCourse("chip"); });
  byId("tab-c").addEventListener("click", function () { switchCourse("c"); });
  byId("tab-linux").addEventListener("click", function () { switchCourse("linux"); });
  window.addEventListener("keydown", function (event) {
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (event.code === "Space") {
      if (tag === "BUTTON") return;
      event.preventDefault();
      togglePlay();
    } else if (event.code === "ArrowRight") {
      event.preventDefault();
      stepBy(1);
    } else if (event.code === "ArrowLeft") {
      event.preventDefault();
      stepBy(-1);
    }
  });
  const params = new URLSearchParams(location.search);
  const holdStill = params.get("still") === "1";
  let start = lessonFromHash();
  if (params.get("lesson")) {
    const asked = params.get("course");
    const course = asked === "linux" || asked === "chip" || asked === "c" ? asked : (start ? start.course : state.course);
    const list = courseList(course);
    const index = Number(params.get("lesson")) - 1;
    const frame = params.get("frame") ? Number(params.get("frame")) - 1 : 0;
    if (list[index]) {
      const max = list[index].steps.length - 1;
      start = { course: course, index: index, frame: Math.min(max, Math.max(0, frame)) };
    }
  }
  if (start) useCourse(start.course);
  if (start) goToLesson(start.index, !holdStill, start.frame);
  else goToLesson(state.index, !holdStill, 0);
  document.body.dataset.ready = "1";
}

init();
