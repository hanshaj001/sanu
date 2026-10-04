/* ==========================================================================
   Apology Website Logic - Sincere & Interactive for Sanu
   ========================================================================== */

// --- Apology Data Store ---
const apologyMessages = {
  1: {
    icon: "🥺",
    tag: "THE REGRET IN MY HEART",
    title: "Kasto Regret Bhairaxa...",
    content: `
      <p><strong>Sanu,</strong></p>
      <p>Maile k k bhane timilai... ani pachi kasto naramro lagiraxa aailey.</p>
      <p>Bihana dekhi tei sochiraxu, kina bhaneko hola timilai tyesto bhanera. Eakdamai naramro lagiraxa bhitra bata. Maile bolnu agadi sochnu parne thiyo, tara hasty bhayera dherai bole.</p>
      <p>Please know that my words were careless, but my heart never wanted to bring you any sadness.</p>
    `
  },
  2: {
    icon: "💔",
    tag: "WHAT HURTS MOST",
    title: "Mero Karan Timi Royeko...",
    content: `
      <p><strong>Sanu,</strong></p>
      <p>Ani mero karan timi roko... malai manai pardaina royeko. Kasto naramro lagxa malai, koi royesi hurt bhayera.</p>
      <p>If the reason is me, then kasari sahane maile tyo? Timro aankha ma aansu aunu mero karan le, tyo bhanda naramro kura mero lagi kehi xaina.</p>
      <p>I feel so helpless knowing I caused you pain. I am genuinely, wholeheartedly sorry.</p>
    `
  },
  3: {
    icon: "🕯️",
    tag: "CANNOT CONCENTRATE",
    title: "Ma Concentrate Garnai Sakirako Xaina",
    content: `
      <p><strong>Sanu,</strong></p>
      <p>Timile bhanyeu tyo kura haru, malai kasto naramro lagyo. K garu k garu bhairaxa bihan dekhi.</p>
      <p>Ma concentrate garnai sakirako xaina aaja. Maile chahekai thiyina timilai testo feel garauna lai. Galti mero ho, ani tyo kura le malai eakdamai poliraxa.</p>
      <p>Sorry haii Sanu, maile dherai bole. I am so sorry.</p>
    `
  },
  4: {
    icon: "💌",
    tag: "COMPLETE HEARTFELT LETTER",
    title: "From Hansh Raj to Sanu",
    content: `
      <p><strong>Pyari Sanu,</strong></p>
      <p>Words can sometimes slip and hurt the person who matters the most, and that's exactly what I foolishly did today.</p>
      <p>Seeing you upset and crying broke my peace completely. I don't want any anger or silence between us. You deserve warmth, respect, and kindness every single second.</p>
      <p>Please forgive me this time. I promise to be more understanding, more gentle, and to never let my words hurt you ever again.</p>
      <p style="text-align: right; margin-top: 15px; font-weight: 600; color: #e11d48;">- Sincerest Apologies, Always.</p>
    `
  }
};

let currentToastSection = 1;

// --- Scroll Progress Bar ---
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progressPercent = (scrollTop / docHeight) * 100;
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = progressPercent + '%';
  }
});

// --- Scroll Intersection Observer for Popups/Toasts ---
const sections = document.querySelectorAll('.story-section');
const scrollToast = document.getElementById('scrollToast');
const toastTitle = document.getElementById('toastTitle');
const toastDesc = document.getElementById('toastDesc');

let lastSectionTriggered = -1;
let toastTimeout;

const observerOptions = {
  root: null,
  threshold: 0.45
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const sectionId = entry.target.getAttribute('data-popup-id');
      const sectionNum = parseInt(sectionId.replace('popup-', ''), 10);
      const title = entry.target.getAttribute('data-trigger-title');
      const msg = entry.target.getAttribute('data-trigger-msg');

      if (sectionNum !== lastSectionTriggered) {
        lastSectionTriggered = sectionNum;
        currentToastSection = sectionNum;
        showToast(title, msg);
      }
    }
  });
}, observerOptions);

sections.forEach((sec) => sectionObserver.observe(sec));

function showToast(title, msg) {
  if (!scrollToast) return;
  toastTitle.textContent = title || "Message for Sanu";
  toastDesc.textContent = msg || "Tap to view this heartfelt message...";

  scrollToast.classList.remove('hidden');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    scrollToast.classList.add('hidden');
  }, 7000);
}

function closeToast() {
  if (scrollToast) {
    scrollToast.classList.add('hidden');
  }
}

function triggerToastModal() {
  closeToast();
  openApologyModal(currentToastSection);
}

// --- Modal Functionality ---
const modal = document.getElementById('apologyModal');
const modalIcon = document.getElementById('modalIcon');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');

function openApologyModal(id) {
  const data = apologyMessages[id];
  if (!data || !modal) return;

  modalIcon.textContent = data.icon;
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

// --- Interactive Forgiveness Logic ---
let dodgeCount = 0;
const dodgePhrases = [
  "Please Sanu? 🥺",
  "Ekchoti maafi deu na...",
  "Herana ma kati regret gardaixu...",
  "I promise never again! 🤍",
  "Timi bina garo xa... 🥺",
  "Please forgive me? 💕"
];

function dodgeNoButton() {
  const btnNo = document.getElementById('btnNo');
  if (!btnNo) return;

  dodgeCount++;

  // Change button text pleadingly
  const phraseIndex = (dodgeCount - 1) % dodgePhrases.length;
  btnNo.textContent = dodgePhrases[phraseIndex];

  // Random gentle displacement
  const randomX = (Math.random() - 0.5) * 160;
  const randomY = (Math.random() - 0.5) * 80;

  btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
  btnNo.style.transition = 'transform 0.2s ease';
}

function handleForgiveYes() {
  const feedback = document.getElementById('forgivenessFeedback');
  const btnYes = document.getElementById('btnYes');
  const btnNo = document.getElementById('btnNo');

  if (btnNo) btnNo.style.display = 'none';
  if (btnYes) {
    btnYes.style.transform = 'scale(1.1)';
    btnYes.textContent = "Thank You, Sanu! ❤️";
  }

  if (feedback) {
    feedback.classList.remove('hidden');
    feedback.innerHTML = `
      <h3>Thank you so much, Sanu! 🥺🤍</h3>
      <p>
        Timro maafi mero lagi sabai bhanda thulo kura ho. 
        I truly promise to value your smile, protect your heart, and never make you cry again. 
        <br><br>
        <strong>Timro khusi mero lagi sabai bhanda important ho. Always. 💕</strong>
      </p>
    `;
  }

  // Trigger Heart Confetti
  triggerHeartConfetti();
}

// --- Floating Hearts & Petals Canvas ---
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

let particles = [];
const particleCount = 28;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class FloatingParticle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * (canvas ? canvas.width : 500);
    this.y = Math.random() * (canvas ? canvas.height : 500) - 20;
    this.size = Math.random() * 12 + 8;
    this.speedY = Math.random() * 0.8 + 0.4;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.opacity = Math.random() * 0.5 + 0.25;
    this.type = Math.random() > 0.45 ? 'heart' : 'petal';
    this.angle = Math.random() * 360;
    this.angularSpeed = (Math.random() - 0.5) * 0.02;
  }

  update() {
    this.y += this.speedY;
    this.x += Math.sin(this.y * 0.01) * 0.5 + this.speedX;
    this.angle += this.angularSpeed;

    if (this.y > (canvas ? canvas.height : 800) + 20) {
      this.y = -20;
      this.x = Math.random() * (canvas ? canvas.width : 500);
    }
  }

  draw() {
    if (!ctx) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.opacity;

    if (this.type === 'heart') {
      ctx.fillStyle = '#f472b6';
      ctx.font = `${this.size}px serif`;
      ctx.fillText('🌸', 0, 0);
    } else {
      ctx.fillStyle = '#fda4af';
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size / 2, this.size / 3, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new FloatingParticle());
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

// --- Heart Confetti Burst on "Yes" ---
function triggerHeartConfetti() {
  const emojis = ['💖', '💕', '✨', '🌸', '🤍', '🥺'];
  for (let i = 0; i < 45; i++) {
    const burst = document.createElement('div');
    burst.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    burst.style.position = 'fixed';
    burst.style.left = '50%';
    burst.style.top = '60%';
    burst.style.fontSize = `${Math.random() * 20 + 20}px`;
    burst.style.pointerEvents = 'none';
    burst.style.zIndex = '9999';
    burst.style.transition = 'all 2s cubic-bezier(0.1, 0.8, 0.3, 1)';
    burst.style.opacity = '1';

    document.body.appendChild(burst);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 320 + 100;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance - 80;

    setTimeout(() => {
      burst.style.transform = `translate(${destX}px, ${destY}px) rotate(${Math.random() * 360}deg)`;
      burst.style.opacity = '0';
    }, 20);

    setTimeout(() => {
      burst.remove();
    }, 2200);
  }
}

// --- Soft Melodic Ambient Sound Generator (Web Audio API) ---
// Plays a soothing, peaceful harp-like ambient chord progression with zero external dependencies
let audioCtx = null;
let isPlayingMelody = false;
let melodyInterval = null;

const chords = [
  [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
  [220.00, 261.63, 329.63, 392.00], // Am7 (A3, C4, E4, G4)
  [174.61, 220.00, 261.63, 329.63], // Fmaj7 (F3, A3, C4, E4)
  [196.00, 246.94, 293.66, 392.00]  // G7 (G3, B3, D4, G4)
];
let chordIndex = 0;

function playAmbientTone(freq, duration = 2.5) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Smooth envelope attack and decay for a delicate music box / warm chime sound
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.045, audioCtx.currentTime + 0.3);
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
      if (isPlayingMelody) playAmbientTone(note, 3.0);
    }, idx * 450);
  });
  chordIndex = (chordIndex + 1) % chords.length;
}

const musicBtn = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');

if (musicBtn) {
  musicBtn.addEventListener('click', () => {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (!isPlayingMelody) {
      isPlayingMelody = true;
      musicBtn.classList.add('playing');
      musicIcon.textContent = "🎶";
      playChordArpeggio();
      melodyInterval = setInterval(playChordArpeggio, 2800);
    } else {
      isPlayingMelody = false;
      musicBtn.classList.remove('playing');
      musicIcon.textContent = "🎵";
      clearInterval(melodyInterval);
    }
  });
}
