// Fallback for local preview, when the deploy has not replaced the placeholder.
document.querySelectorAll("#name, #footer-name").forEach(function (el) {
  if (el.textContent.trim() === "__NAME__") el.textContent = "Superstar";
});
if (document.title.indexOf("__NAME__") !== -1) {
  document.title = document.title.replace("__NAME__", "Superstar");
}

var wishes = [
  "Your wish is on its way to the stars! ⭐",
  "Wish made! The universe is listening 🌠",
  "Blow out the candles... it's going to come true! 🕯️",
  "Something wonderful is about to happen 🌈"
];

var canvas = document.getElementById("confetti");
var ctx = canvas.getContext("2d");
var colors = ["#ff3d8b", "#ff9f1c", "#ffe14d", "#2ec4b6", "#3a86ff", "#8338ec"];
var pieces = [];
var running = false;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function burst(count, x, y) {
  for (var i = 0; i < count; i++) {
    pieces.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -14 - 4,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.4,
      life: 0
    });
  }
  if (!running) {
    running = true;
    requestAnimationFrame(tick);
  }
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces = pieces.filter(function (p) {
    return p.y < canvas.height + 20 && p.life < 240;
  });
  pieces.forEach(function (p) {
    p.vy += 0.3;
    p.vx *= 0.99;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life++;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  });
  if (pieces.length) {
    requestAnimationFrame(tick);
  } else {
    running = false;
  }
}

var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function celebrate() {
  if (reduceMotion) return;
  burst(120, canvas.width / 2, canvas.height / 3);
  burst(60, canvas.width * 0.15, canvas.height / 2);
  burst(60, canvas.width * 0.85, canvas.height / 2);
}

document.getElementById("wish").addEventListener("click", function () {
  document.getElementById("wish-msg").textContent =
    wishes[Math.floor(Math.random() * wishes.length)];
  celebrate();
});

document.addEventListener("click", function (e) {
  if (!reduceMotion && e.target.closest && !e.target.closest("#wish")) {
    burst(30, e.clientX, e.clientY);
  }
});

window.addEventListener("load", function () {
  setTimeout(celebrate, 400);
});
