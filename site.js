// Test-run strip: a row of squares, one per "run". Most pass (green);
// a few are flaky and flip between passing and failing on their own.
(function () {
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function fill(strip) {
    strip.textContent = "";
    var count = Math.ceil(strip.clientWidth / 16) + 1;
    for (var n = 0; n < count; n++) {
      var cell = document.createElement("i");
      // About one square in eleven is flaky; the positions are fixed so
      // the strip looks the same on each visit.
      if ((n * 7 + 3) % 11 === 0) {
        cell.className = n % 2 ? "flaky off" : "flaky";
      }
      strip.appendChild(cell);
    }
  }

  var strips = document.querySelectorAll(".runs");
  strips.forEach(fill);

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { strips.forEach(fill); }, 150);
  });

  if (!still && strips.length) {
    setInterval(function () {
      var flaky = document.querySelectorAll(".runs .flaky");
      if (!flaky.length) return;
      flaky[Math.floor(Math.random() * flaky.length)].classList.toggle("off");
    }, 700);
  }
})();

// Publications page: topic filter.
(function () {
  var buttons = document.querySelectorAll(".filters button");
  if (!buttons.length) return;
  var pubs = document.querySelectorAll(".pubs .pub");
  var count = document.getElementById("pub-count");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var topic = button.getAttribute("data-topic");
      var shown = 0;
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === button)); });
      pubs.forEach(function (pub) {
        var match = topic === "all" || pub.getAttribute("data-topic") === topic;
        pub.hidden = !match;
        if (match) shown++;
      });
      if (count) count.textContent = shown + (shown === 1 ? " paper" : " papers");
    });
  });
})();
