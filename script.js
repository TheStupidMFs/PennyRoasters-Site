const canvas = document.getElementById("beanCanvas");
const ctx = canvas.getContext("2d");

let beans = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  beans = Array.from({ length: 45 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 7 + Math.random() * 12,
    speed: 0.35 + Math.random() * 0.8,
    drift: Math.random() * 0.8,
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.03,
    opacity: 0.08 + Math.random() * 0.18
  }));
}

function drawBean(bean) {
  ctx.save();
  ctx.translate(bean.x, bean.y);
  ctx.rotate(bean.rotation);
  ctx.globalAlpha = bean.opacity;

  ctx.fillStyle = "#8b542f";
  ctx.beginPath();
  ctx.ellipse(0, 0, bean.size * 1.35, bean.size, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 247, 237, 0.42)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, -bean.size * 0.7);
  ctx.bezierCurveTo(
    bean.size * 0.4,
    -bean.size * 0.2,
    -bean.size * 0.4,
    bean.size * 0.2,
    0,
    bean.size * 0.7
  );
  ctx.stroke();

  ctx.restore();
}

function animateBeans() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  beans.forEach((bean) => {
    bean.y += bean.speed;
    bean.x += Math.sin(bean.y * 0.01) * bean.drift;
    bean.rotation += bean.spin;

    if (bean.y > canvas.height + 40) {
      bean.y = -40;
      bean.x = Math.random() * canvas.width;
    }

    drawBean(bean);
  });

  requestAnimationFrame(animateBeans);
}

document.querySelectorAll(".interactive-card button").forEach((button) => {
  button.addEventListener("click", () => {
    const resultBox = document.getElementById("resultBox");
    resultBox.textContent = button.dataset.result;

    resultBox.classList.remove("pop");
    void resultBox.offsetWidth;
    resultBox.classList.add("pop");
  });
});

document.addEventListener("mousemove", (event) => {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;

  document.querySelectorAll(".steam").forEach((steam, index) => {
    steam.style.transform = `translate(${x * (20 + index * 10)}px, ${y * 20}px)`;
  });
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animateBeans();
