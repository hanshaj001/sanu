/* ==========================================================================
   Apology Website Logic - Sincere, Polite & Grounded
   ========================================================================== */

// --- 3 Chapters Data ---
const apologyMessages = {
  1: {
    tag: "CHAPTER 01",
    title: "Kasto Regret Bhairaxa...",
    content: `
      <p><strong>Sanu,</strong></p>
      <p>Maile k k bhane timilai... ani pachi kasto naramro lagiraxa aailey.</p>
      <p>Bihana dekhi tei sochiraxu, kina bhaneko hola timilai tyesto bhanera. Kasto regret bhairaxa.</p>
      <p>Eakdamai naramro lagiraxa malai bhitra bata. I should have thought before speaking, instead of letting hasty words hurt you.</p>
    `
  },
  2: {
    tag: "CHAPTER 02",
    title: "Seeing You Hurt",
    content: `
      <p><strong>Sanu,</strong></p>
      <p>Ani mero karan timi roko... malai manai pardaina royeko.</p>
      <p>Kasto naramro lagxa malai, koi royesi hurt bhayera. If the reason is me, then kasari sahane maile tyo?</p>
      <p>Knowing that my words were the cause of your distress makes me feel really guilty. I am genuinely sorry for putting you through that.</p>
    `
  },
  3: {
    tag: "CHAPTER 03",
    title: "Sorry Haii Sanu",
    content: `
      <p><strong>Sanu,</strong></p>
      <p>Timile bhanyeu tyo kura haru, malai kasto naramro lagyo. K garu k garu bhairaxa bihan dekhi. Ma concentrate garnai sakirako xaina.</p>
      <p>Sorry haii Sanu, maile chahekai thiyina testo garauna lai. Maile dherai bole, jun maile bolnu hudaina thiyo.</p>
      <p>I am really sorry. I promise to be more patient, understanding, and respectful.</p>
    `
  }
};

let currentToastChapter = 1;

// --- Scroll Progress Bar ---
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progressPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = progressPercent + '%';
  }
});

// --- Scroll Intersection Observer for Chapter Popups ---
const sections = document.querySelectorAll('.story-section');
const scrollToast = document.getElementById('scrollToast');
const toastTitle = document.getElementById('toastTitle');
const toastDesc = document.getElementById('toastDesc');

let lastChapterTriggered = -1;
let toastTimeout;

const observerOptions = {
  root: null,
  threshold: 0.4
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const chapter = parseInt(entry.target.getAttribute('data-chapter'), 10);
      const title = entry.target.getAttribute('data-title');
      const desc = entry.target.getAttribute('data-desc');

      if (chapter !== lastChapterTriggered) {
        lastChapterTriggered = chapter;
        currentToastChapter = chapter;
        showToast(title, desc);
      }
    }
  });
}, observerOptions);

sections.forEach((sec) => sectionObserver.observe(sec));

function showToast(title, desc) {
  if (!scrollToast) return;
  toastTitle.innerHTML = title || "Note for Sanu";
  toastDesc.textContent = desc || "Tap to view this message...";

  scrollToast.classList.remove('hidden');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    scrollToast.classList.add('hidden');
  }, 6000);
}

function closeToast() {
  if (scrollToast) {
    scrollToast.classList.add('hidden');
  }
}

function triggerToastModal() {
  closeToast();
  openApologyModal(currentToastChapter);
}

// --- Modal Functionality ---
const modal = document.getElementById('apologyModal');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');

function openApologyModal(id) {
  const data = apologyMessages[id];
  if (!data || !modal) return;

  modalTag.textContent = data.tag;
  modalTitle.textContent = data.title;
  modalContent.innerHTML = data.content;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeApologyModal(e) {
  if (e && e.target !== modal && !e.target.classList.contains('modal-close-btn') && !e.target.classList.contains('modal-confirm-btn')) {
    return;
  }
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// --- Respectful Forgiveness Handlers ---
function handleForgiveYes() {
  const feedback = document.getElementById('forgivenessFeedback');
  const btnYes = document.getElementById('btnYes');
  const btnNo = document.getElementById('btnNo');

  if (btnNo) btnNo.style.display = 'none';
  if (btnYes) {
    btnYes.disabled = true;
    btnYes.style.opacity = '0.9';
    btnYes.textContent = "Thank you, Sanu";
  }

  if (feedback) {
    feedback.classList.remove('hidden');
    feedback.innerHTML = `
      <h3>Thank you, Sanu.</h3>
      <p>
        I genuinely appreciate your understanding. I will be much more careful with my words and actions moving forward.
      </p>
    `;
  }
}

function handleForgiveLater() {
  const feedback = document.getElementById('forgivenessFeedback');
  const btnNo = document.getElementById('btnNo');

  if (btnNo) {
    btnNo.disabled = true;
    btnNo.textContent = "Understood";
  }

  if (feedback) {
    feedback.classList.remove('hidden');
    feedback.innerHTML = `
      <h3>Take all the time you need.</h3>
      <p>
        I completely understand and respect your space. I just wanted you to know that I am truly sorry for what happened.
      </p>
    `;
  }
}

// --- Subtle Ambient Canvas (Soft floating dust motes) ---
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];
const particleCount = 20;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class AmbientParticle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * (canvas ? canvas.width : 500);
    this.y = Math.random() * (canvas ? canvas.height : 500);
    this.radius = Math.random() * 2 + 1;
    this.speedY = Math.random() * 0.4 + 0.1;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.35 + 0.1;
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;

    if (this.y < -10) {
      this.y = (canvas ? canvas.height : 800) + 10;
      this.x = Math.random() * (canvas ? canvas.width : 500);
    }
  }

  draw() {
    if (!ctx) return;
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(168, 140, 150, ${this.opacity})`;
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new AmbientParticle());
}

function animateParticles() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();
