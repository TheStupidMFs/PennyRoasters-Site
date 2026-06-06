const canvas = document.getElementById("beanCanvas");
const ctx = canvas.getContext("2d");
const glow = document.querySelector(".cursor-glow");

let beans = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  beans = Array.from({ length: 42 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 6 + Math.random() * 12,
    speed: 0.25 + Math.random() * 0.7,
    rotate: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.03,
    opacity: 0.08 + Math.random() * 0.16
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

  ctx.strokeStyle = "rgba(255, 250, 241, 0.75)";
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

function animateBeans() {
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

  requestAnimationFrame(animateBeans);
}

document.querySelectorAll(".mood-card").forEach((button) => {
  button.addEventListener("click", () => {
    const resultBox = document.getElementById("resultBox");

    resultBox.textContent = button.dataset.result;
    resultBox.classList.remove("pop");
    void resultBox.offsetWidth;
    resultBox.classList.add("pop");
  });
});

document.querySelectorAll(".magnetic").forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const box = item.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;

    item.style.setProperty("--x", `${x}px`);
    item.style.setProperty("--y", `${y}px`);

    const moveX = (x - box.width / 2) * 0.12;
    const moveY = (y - box.height / 2) * 0.12;

    item.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "";
  });
});

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;

    const rotateY = ((x / box.width) - 0.5) * 10;
    const rotateX = ((y / box.height) - 0.5) * -10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

window.addEventListener("mousemove", (e) => {
  glow.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(166, 96, 45, 0.18), transparent 18%)`;
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
animateBeans();
