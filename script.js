/* ==========================================================================
   Apology Website Logic - Sincere, Polite & Grounded for Sanu
   No lover/partner framing, strictly honest & respectful
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
      <p>Eakdamai naramro lagiraxa malai bhitra bata. I should have thought before speaking, instead of letting careless words upset you.</p>
    `
  },
  2: {
    tag: "CHAPTER 02",
    title: "Seeing You Upset",
    content: `
      <p><strong>Sanu,</strong></p>
      <p>Ani mero karan timi roko... malai manai pardaina royeko. Kasto naramro lagxa malai, koi royesi hurt bhayera.</p>
      <p>If the reason is me, then kasari sahane maile tyo? Timro aankha ma aansu aunu mero words le garda, tyo bhanda naramro feeling kehi xaina.</p>
      <p>Knowing that my words caused you that distress makes me feel really guilty. I am genuinely sorry for that.</p>
    `
  },
  3: {
    tag: "CHAPTER 03",
    title: "Sorry Haii Sanu",
    content: `
      <p><strong>Sanu,</strong></p>
      <p>Timile bhanyeu tyo kura haru, malai kasto naramro lagyo. K garu k garu bhairaxa bihan dekhi. Ma concentrate garnai sakirako xaina.</p>
      <p><strong>Malai thaha thiyena ki timilai testo kura gareko man pareko thiyena bhanera, tyei bhayera maile testo boleko.</strong></p>
      <p>Had I realized earlier that it bothered you, ma kaile tyesto kura garne nai thiyina. Maile dherai bole, jun maile bolnu hudaina thiyo.</p>
      <p>Sorry haii Sanu. Aaba dekhi ma dhyan rakhxu.</p>
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

// --- Interactive Still Upset / Forgiveness Handlers ---
let dodgeCount = 0;
const dodgePhrases = [
  "Ekchoti maafi deu na please... 🥺",
  "Sachai galti bhayo Sanu...",
  "Aaba dekhi testo kura kaile nikalina...",
  "Herana ma kati regret gardaixu...",
  "Galti realize bhairaxa malai...",
  "Take your time, tara please consider na... 🥺"
];

function dodgeStillUpset() {
  const btnNo = document.getElementById('btnNo');
  if (!btnNo) return;

  dodgeCount++;
  const phraseIndex = (dodgeCount - 1) % dodgePhrases.length;
  btnNo.textContent = dodgePhrases[phraseIndex];

  // Gentle playful displacement on hover/click
  const randomX = (Math.random() - 0.5) * 140;
  const randomY = (Math.random() - 0.5) * 60;
  btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
  btnNo.style.transition = 'transform 0.25s ease';
}

function handleForgiveYes() {
  const feedback = document.getElementById('forgivenessFeedback');
  const btnYes = document.getElementById('btnYes');
  const btnNo = document.getElementById('btnNo');

  if (btnNo) btnNo.style.display = 'none';
  if (btnYes) {
    btnYes.style.transform = 'scale(1.05)';
    btnYes.textContent = "Thank you, Sanu 🤍";
  }

  if (feedback) {
    feedback.classList.remove('hidden');
    feedback.innerHTML = `
      <h3>Thank you, Sanu. 🤍</h3>
      <p>
        Timro understanding mero lagi dherai important xa.
        <br><br>
        Maile bolnu agadi sochnu parne thiyo. Aaba dekhi ma aafno words ma dhyan rakhxu ani kaile testo kura repeat gardina.
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
    ctx.fillStyle = `rgba(160, 135, 145, ${this.opacity})`;
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

// --- Soft Ambient Melody Synthesizer (Web Audio API) ---
let audioCtx = null;
let isPlayingMelody = false;
let melodyInterval = null;

const chords = [
  [261.63, 329.63, 392.00, 493.88], // Cmaj7
  [220.00, 261.63, 329.63, 392.00], // Am7
  [174.61, 220.00, 261.63, 329.63], // Fmaj7
  [196.00, 246.94, 293.66, 392.00]  // G7
];
let chordIndex = 0;

function playTone(freq, duration = 2.4) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.035, audioCtx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    console.error(err);
  }
}

function playChordArpeggio() {
  const currentChord = chords[chordIndex];
  currentChord.forEach((note, idx) => {
    setTimeout(() => {
      if (isPlayingMelody) playTone(note, 2.8);
    }, idx * 460);
  });
  chordIndex = (chordIndex + 1) % chords.length;
}

function toggleMelody() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const heroBtn = document.getElementById('heroMelodyBtn');
  const floatBtn = document.getElementById('floatingMusicBtn');
  const bubbleIcon = document.getElementById('bubbleIcon');
  const bubbleText = document.getElementById('bubbleText');

  if (!isPlayingMelody) {
    isPlayingMelody = true;
    if (heroBtn) heroBtn.classList.add('playing');
    if (floatBtn) floatBtn.classList.add('playing');
    if (bubbleIcon) bubbleIcon.textContent = "🎶";
    if (bubbleText) bubbleText.textContent = "Playing calming melody...";

    playChordArpeggio();
    melodyInterval = setInterval(playChordArpeggio, 2800);
  } else {
    isPlayingMelody = false;
    if (heroBtn) heroBtn.classList.remove('playing');
    if (floatBtn) floatBtn.classList.remove('playing');
    if (bubbleIcon) bubbleIcon.textContent = "🎵";
    if (bubbleText) bubbleText.textContent = "Play calming melody while reading";

    clearInterval(melodyInterval);
  }
}

// Attach event listeners
const floatingMusicBtn = document.getElementById('floatingMusicBtn');
if (floatingMusicBtn) {
  floatingMusicBtn.addEventListener('click', toggleMelody);
}
