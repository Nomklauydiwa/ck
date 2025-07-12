const messages = [
  "ก่อนเริ่มผมนั่งเขียนแล้วก็แก้โค้ดอยู่ชม.กว่า\nฉะนั้นดูให้จบด้วยย",
  "ผมคิดว่าผมมีอะไรจะบอกคุณ",
  "ไม่รู้ว่าคุณจะคิดยังไงนะ",
  "แต่ว่าสิ่งที่ผมอยากจะบอกคุณคือ...",
  "ไอแมวอ้วนนนนน"
];

let current = 0;
const box = document.getElementById("messageBox");
const btn = document.getElementById("sakuraButton");
const prevBtn = document.getElementById("prevButton");
const nextBtn = document.getElementById("nextButton");

let typingTimeout;
let isTyping = false;

const colors = ['#a0507a', '#c0739e', '#dca9c8', '#eec9dd', '#f7e4f1'];

const typeSound = document.getElementById("typeSound");

// ฟังก์ชันแสดงข้อความแบบ typewriter effect พร้อมเสียงจิ้มๆ
function typeWriter(text, i = 0) {
  if (i === 0) box.textContent = "";
  if (i < text.length) {
    box.textContent += text.charAt(i);
    playTypeSound();
    typingTimeout = setTimeout(() => typeWriter(text, i + 1), 50);
  } else {
    isTyping = false;
    if(current === messages.length - 1) {
      createLargeSakura(10);
      createBurstSakura(30);
      createBurstHeart(15);
    }
  }
}

function playTypeSound() {
  typeSound.currentTime = 0;
  typeSound.volume = 0.12;
  typeSound.play().catch(() => {});
}

// แสดงข้อความและจัดการปุ่ม
function showMessage(index) {
  if (index < 0) index = 0;
  if (index >= messages.length) index = messages.length - 1;
  isTyping = true;
  clearTimeout(typingTimeout);
  typeWriter(messages[index]);
  box.style.color = colors[index % colors.length];
  box.style.animation = "fadeInSlide 0.6s ease forwards";
  current = index;
  
  nextBtn.disabled = current === messages.length - 1;
  prevBtn.disabled = current === 0;
}

// ปุ่มกลีบซากุระ กดแล้วมีกลีบพุ่งและหัวใจพุ่ง + แสงวูบปุ่ม
btn.addEventListener("click", () => {
  if (!isTyping) {
    flashButton(btn);
    createBurstSakura();
    createBurstHeart();
    playSakuraSound();
  }
});

// ปุ่มถัดไป
nextBtn.addEventListener("click", () => {
  if (current < messages.length - 1 && !isTyping) {
    showMessage(current + 1);
  }
});

// ปุ่มย้อนกลับ
prevBtn.addEventListener("click", () => {
  if (current > 0 && !isTyping) {
    showMessage(current - 1);
  }
});

// ปุ่มแสงวูบปุ่ม
function flashButton(button) {
  button.classList.add("flash");
  setTimeout(() => {
    button.classList.remove("flash");
  }, 400);
}

// สร้างกลีบซากุระพุ่ง (จำนวนกำหนดได้)
function createBurstSakura(count = 10) {
  for (let i = 0; i < count; i++) {
    const burst = document.createElement("div");
    burst.classList.add("sakura-burst");
    burst.textContent = "🌸";

    const rect = btn.getBoundingClientRect();
    burst.style.left = rect.left + rect.width / 2 + "px";
    burst.style.top = rect.top + rect.height / 2 + "px";

    document.body.appendChild(burst);

    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 1) * 200;
    burst.style.transform = `translate(${x}px, ${y}px)`;
    burst.style.opacity = 0;

    setTimeout(() => burst.remove(), 1000);
  }
}

// สร้างหัวใจพุ่ง (จำนวนกำหนดได้)
function createBurstHeart(count = 5) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart-burst");
    heart.textContent = "❤️";

    const rect = btn.getBoundingClientRect();
    heart.style.left = rect.left + rect.width / 2 + "px";
    heart.style.top = rect.top + rect.height / 2 + "px";

    document.body.appendChild(heart);

    const x = (Math.random() - 0.5) * 200;
    const y = (Math.random() - 1) * 200;
    heart.style.transform = `translate(${x}px, ${y}px)`;
    heart.style.opacity = 0;

    setTimeout(() => heart.remove(), 1000);
  }
}

// สร้างกลีบซากุระใหญ่ลอยขึ้นตอนจบข้อความ
function createLargeSakura(count = 5) {
  for (let i = 0; i < count; i++) {
    const sakura = document.createElement("div");
    sakura.classList.add("sakura-large");
    sakura.textContent = "🌸";

    sakura.style.left = (window.innerWidth * Math.random()) + "px";
    sakura.style.top = (window.innerHeight - 100) + "px";

    document.body.appendChild(sakura);

    setTimeout(() => sakura.remove(), 2000);
  }
}

// กลีบซากุระร่วงเรื่อย ๆ
function createSakura() {
  const sakura = document.createElement("div");
  sakura.classList.add("sakura-fall");
  sakura.textContent = "🌸";

  sakura.style.left = Math.random() * 100 + "vw";
  sakura.style.animationDuration = (5 + Math.random() * 5) + "s";

  document.body.appendChild(sakura);

  sakura.addEventListener("animationend", () => {
    sakura.remove();
  });
}

setInterval(createSakura, 500);

// กลีบซากุระลอยตามเมาส์
document.addEventListener("mousemove", e => {
  const sakura = document.createElement("div");
  sakura.classList.add("sakura-follow");
  sakura.textContent = "🌸";
  sakura.style.left = e.clientX + "px";
  sakura.style.top = e.clientY + "px";

  document.body.appendChild(sakura);

  const moveX = (Math.random() - 0.5) * 100;
  const moveY = (Math.random() - 0.5) * 100;
  sakura.style.transform = `translate(${moveX}px, ${moveY}px)`;
  sakura.style.opacity = 0;

  setTimeout(() => sakura.remove(), 2000);
});

// เล่นเสียงซากุระเบาๆ
function playSakuraSound() {
  const audio = document.getElementById("sakuraSound");
  audio.volume = 0.2;
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

// แสดงข้อความเริ่มต้น
showMessage(current);