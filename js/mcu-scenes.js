/* Step pictures for the MCU course. Each frame highlights that step's label. */
function mcuScene(lessonId) {
  var lesson = null;
  for (var i = 0; i < MCU_LESSONS.length; i += 1) {
    if (MCU_LESSONS[i].id === lessonId) {
      lesson = MCU_LESSONS[i];
      break;
    }
  }
  if (!lesson) return board("<text x=\"400\" y=\"220\" class=\"m\" text-anchor=\"middle\">Lesson not found</text>");

  var count = lesson.steps.length;
  var cols = count <= 4 ? count : 5;
  var gap = 18;
  var left = 34;
  var totalW = 732;
  var bw = Math.floor((totalW - gap * (cols - 1)) / cols);
  var top = 72;
  var html = "";

  lesson.steps.forEach(function (step, idx) {
    var col = idx % cols;
    var row = Math.floor(idx / cols);
    var x = left + col * (bw + gap);
    var y = top + row * 132;
    var cls = idx === count - 1 ? "green" : (idx % 3 === 1 ? "blue" : "");
    html += "<g " + vis(idx, idx) + ">";
    html += box(x, y, bw, 88, cls);
    html += tx(x + bw / 2, y + 38, String(idx + 1).padStart(2, "0"), "tiny", "text-anchor=\"middle\"");
    html += tx(x + bw / 2, y + 66, step.label, "m", "text-anchor=\"middle\"");
    html += "</g>";
    if (idx < count - 1 && col < cols - 1) {
      var nx = x + bw;
      var ny = y + 44;
      html += "<path class=\"wire\" d=\"M " + nx + " " + ny + " L " + (nx + gap) + " " + ny + "\" marker-end=\"url(#ah)\"></path>";
    }
  });

  var caption = lesson.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  html += "<g " + vis(count - 1) + ">";
  html += tx(400, 370, caption, "h", "text-anchor=\"middle\"");
  html += tx(400, 402, lesson.track + " · follow the evidence", "s", "text-anchor=\"middle\"");
  html += "</g>";
  return board(html);
}

MCU_LESSONS.forEach(function (lesson) {
  SCENES[lesson.id] = function () { return mcuScene(lesson.id); };
});
