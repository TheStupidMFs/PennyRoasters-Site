const canvas = document.getElementById("beans");
const ctx = canvas.getContext("2d");
const result = document.getElementById("result");

let beans = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  beans = Array.from({ length: 35 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 6 + Math.random() * 10,
    speed: 0.25 + Math.random() * 0.6,
    rotate: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.03,
    opacity: 0.08 + Math.random() * 0.14
  }));
}

function drawBean(bean) {
  ctx.save();
  ctx.translate(bean.x, bean.y);
  ctx.rotate(bean.rotate);
  ctx.globalAlpha = bean.opacity;

  ctx.fillStyle = "#7b4426";
  ctx.beginPath();
  ctx.ellipse(0, 0, bean.size * 1.35, bean.size, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 250, 241, 0.8)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, -bean.size * 0.7);
  ctx.bezierCurveTo(
    bean.size * 0.4,
    -bean.size * 0.15,
    -bean.size * 0.4,
    bean.size * 0.15,
    0,
    bean.size * 0.7
  );
  ctx.stroke();

  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  beans.forEach((bean) => {
    bean.y += bean.speed;
    bean.x += Math.sin(bean.y * 0.01) * 0.45;
    bean.rotate += bean.spin;

    if (bean.y > canvas.height + 30) {
      bean.y = -30;
      bean.x = Math.random() * canvas.width;
    }

    drawBean(bean);
  });

  requestAnimationFrame(animate);
}

document.querySelectorAll(".mood-grid button").forEach((button) => {
  button.addEventListener("click", () => {
    result.textContent = button.dataset.result;
    result.classList.remove("pop");
    void result.offsetWidth;
    result.classList.add("pop");
  });
});

window.addEventListener("resize", resize);

resize();
animate();
