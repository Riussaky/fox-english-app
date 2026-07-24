// ============================================================
// Fox English — lógica de la app (vanilla JS, sin frameworks)
// ============================================================

const STORAGE_KEY = "fox-english-progress-v1";
const MUSIC_KEY = "fox-english-music-v1";
const STARS_PER_ACTIVITY = 3;

const STAR_SVG_ON = `<svg viewBox="0 0 24 24" fill="#FFD93D" stroke="#E8B923" stroke-width="1"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z"/></svg>`;
const STAR_SVG_OFF = `<svg viewBox="0 0 24 24" fill="#E8E8F0" stroke="#D8D8E0" stroke-width="1"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7L2 9.2l7.1-.6z"/></svg>`;

const MASCOT_SVG = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="60" cy="100" rx="34" ry="10" fill="#00000012"/>
  <path d="M30 40 L14 12 L42 32 Z" fill="#F0904C"/>
  <path d="M90 40 L106 12 L78 32 Z" fill="#F0904C"/>
  <path d="M32 40 L20 20 L44 34 Z" fill="#FBD9B8"/>
  <path d="M88 40 L100 20 L76 34 Z" fill="#FBD9B8"/>
  <circle cx="60" cy="56" r="38" fill="#F0904C"/>
  <path d="M60 60 C40 60 34 78 44 90 C50 96 70 96 76 90 C86 78 80 60 60 60 Z" fill="#FDF1E4"/>
  <circle cx="46" cy="52" r="6" fill="#2E2A26"/>
  <circle cx="74" cy="52" r="6" fill="#2E2A26"/>
  <path d="M60 68 L54 76 L66 76 Z" fill="#2E2A26"/>
  <path d="M60 76 Q60 84 70 80" stroke="#2E2A26" stroke-width="3" fill="none" stroke-linecap="round"/>
</svg>`;

const CONFETTI_COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#B18CF0", "#FFB84D"];

// ---------------- Background music (synthesized, no external files) ----------------
const AudioEngine = (() => {
  let ctx = null;
  let masterGain = null;
  let playing = false;
  let schedulerTimer = null;
  let nextNoteTime = 0;
  let noteIndex = 0;

  // Melodía alegre en pentatónica de Do mayor (C D E G A), estilo cajita de música
  const MELODY = [261.63, 293.66, 329.63, 392.0, 440.0, 392.0, 329.63, 293.66];
  // Acompañamiento una octava más alto que un bajo real: los parlantes de celular
  // casi no reproducen graves, así que un "bajo" grave se oye casi mudo en Android.
  const PAD = [261.63, 392.0, 349.23, 392.0]; // C4 G4 F4 G4
  const NOTE_DUR = 0.3;

  function ensureCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      masterGain = ctx.createGain();
      masterGain.gain.value = 0.0001;
      // El compresor sube el volumen percibido (normaliza picos) sin distorsionar,
      // clave para que se escuche bien en parlantes pequeños de celular.
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -18;
      compressor.knee.value = 24;
      compressor.ratio.value = 6;
      compressor.attack.value = 0.005;
      compressor.release.value = 0.15;
      masterGain.connect(compressor);
      compressor.connect(ctx.destination);
    }
    return ctx;
  }

  function pluck(freq, time, dur, type, peak) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(peak, time + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(g);
    g.connect(masterGain);
    osc.start(time);
    osc.stop(time + dur + 0.05);
  }

  function scheduler() {
    if (!playing) return;
    while (nextNoteTime < ctx.currentTime + 0.5) {
      pluck(MELODY[noteIndex % MELODY.length], nextNoteTime, NOTE_DUR * 0.85, "triangle", 0.5);
      if (noteIndex % 4 === 0) {
        pluck(PAD[Math.floor(noteIndex / 4) % PAD.length], nextNoteTime, NOTE_DUR * 4 * 0.9, "sine", 0.28);
      }
      nextNoteTime += NOTE_DUR;
      noteIndex++;
    }
    schedulerTimer = setTimeout(scheduler, 120);
  }

  function start() {
    if (playing) return;
    if (!ensureCtx()) return;
    if (ctx.state === "suspended") ctx.resume();
    playing = true;
    masterGain.gain.cancelScheduledValues(ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.6);
    nextNoteTime = ctx.currentTime + 0.1;
    noteIndex = 0;
    scheduler();
  }

  function stop() {
    if (!playing) return;
    playing = false;
    if (schedulerTimer) clearTimeout(schedulerTimer);
    if (ctx && masterGain) {
      masterGain.gain.cancelScheduledValues(ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
    }
  }

  return { start, stop };
})();

let musicPref = localStorage.getItem(MUSIC_KEY) !== "off";

function setMusicPref(on) {
  musicPref = on;
  localStorage.setItem(MUSIC_KEY, on ? "on" : "off");
  if (on) AudioEngine.start();
  else AudioEngine.stop();
}

function initMusicAutoStart() {
  const startOnce = () => {
    if (musicPref) AudioEngine.start();
    document.removeEventListener("click", startOnce);
    document.removeEventListener("touchstart", startOnce);
  };
  document.addEventListener("click", startOnce, { once: true });
  document.addEventListener("touchstart", startOnce, { once: true });
}

// ---------------- Progress persistence ----------------
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}
function saveProgress(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}
let progress = loadProgress();

function lessonKey(levelId, lessonId) {
  return `${levelId}.${lessonId}`;
}
const ACTIVITIES = ["flashcards", "memory", "quiz", "drag", "scramble"];
const MAX_LESSON_STARS = ACTIVITIES.length * STARS_PER_ACTIVITY;

function getLessonProgress(levelId, lessonId) {
  const key = lessonKey(levelId, lessonId);
  return progress[key] || { flashcards: 0, memory: 0, quiz: 0, drag: 0, scramble: 0, stars: 0 };
}
// Guarda el mejor puntaje (1-3 estrellas) obtenido en una actividad; nunca baja el récord previo.
function setActivityStars(levelId, lessonId, activityKey, starsEarned) {
  const key = lessonKey(levelId, lessonId);
  const current = getLessonProgress(levelId, lessonId);
  const prevStars = current[activityKey] || 0;
  const newStars = Math.max(prevStars, starsEarned);
  const merged = { ...current, [activityKey]: newStars };
  merged.stars = ACTIVITIES.reduce((sum, a) => sum + (merged[a] || 0), 0);
  progress[key] = merged;
  saveProgress(progress);
  return { progress: merged, improved: newStars > prevStars };
}
function starsForScore(mistakes, total) {
  if (mistakes <= 0) return 3;
  if (mistakes <= Math.max(1, Math.ceil(total * 0.3))) return 2;
  return 1;
}
function totalStars() {
  return Object.values(progress).reduce((sum, l) => sum + (l.stars || 0), 0);
}
function levelStars(level) {
  return level.lessons.reduce((sum, l) => sum + getLessonProgress(level.id, l.id).stars, 0);
}

// ---------------- Utility ----------------
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function speak(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.85;
  u.pitch = 1.15;
  window.speechSynthesis.speak(u);
}
function findLevel(levelId) {
  return LEVELS.find((l) => l.id === levelId);
}
function findLesson(levelId, lessonId) {
  return findLevel(levelId).lessons.find((l) => l.id === lessonId);
}
function launchConfetti() {
  const count = 40;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const size = 6 + Math.random() * 8;
    piece.style.width = size + "px";
    piece.style.height = size * 0.6 + "px";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    piece.style.animationDuration = 2 + Math.random() * 1.5 + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3600);
  }
}
function starsRow(n, max) {
  return Array.from({ length: max }, (_, idx) => idx + 1).map((i) => (n >= i ? STAR_SVG_ON : STAR_SVG_OFF)).join("");
}

// ---------------- App shell ----------------
const app = document.getElementById("app");

function topbar(showBack) {
  const musicIcon = musicPref ? "🎵" : "🔇";
  return `
    <div class="topbar">
      ${showBack ? `<button class="back-btn" id="backBtn">← Volver</button>` : `<div class="brand">${MASCOT_SVG.replace('viewBox="0 0 120 120"', 'viewBox="0 0 120 120" class="mascot-mini"')} Fox English</div>`}
      <div class="topbar-right">
        <button class="music-btn ${musicPref ? "" : "music-off"}" id="musicBtn" title="Música">${musicIcon}</button>
        <div class="stars-total">${STAR_SVG_ON} ${totalStars()}</div>
      </div>
    </div>
  `;
}

function mascotMessage(text) {
  return `
    <div class="mascot-row">
      <div class="mascot-big">${MASCOT_SVG}</div>
      <div class="bubble">${text}</div>
    </div>
  `;
}

// Conecta el botón "Volver" (si existe) y el botón de música de la topbar.
function wireTopbar(onBack) {
  const backBtnEl = document.getElementById("backBtn");
  if (backBtnEl && onBack) backBtnEl.addEventListener("click", onBack);
  const musicBtn = document.getElementById("musicBtn");
  if (musicBtn) {
    musicBtn.addEventListener("click", () => {
      setMusicPref(!musicPref);
      musicBtn.textContent = musicPref ? "🎵" : "🔇";
      musicBtn.classList.toggle("music-off", !musicPref);
    });
  }
}

// ---------------- Screen: Home ----------------
function renderHome() {
  const cards = LEVELS.map((level, i) => {
    const totalLessonStars = level.lessons.length * MAX_LESSON_STARS;
    const earned = levelStars(level);
    const pct = Math.round((earned / totalLessonStars) * 100);
    return `
      <button class="level-card lvl-${level.id}" style="animation-delay:${i * 0.08}s" data-level="${level.id}">
        <div class="badge-icon">${levelBadge(level.id)}</div>
        <h2>${level.name}</h2>
        <p>${level.subtitle}</p>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        <div class="progress-label">${earned} / ${totalLessonStars} ⭐</div>
      </button>
    `;
  }).join("");

  app.innerHTML = `
    ${topbar(false)}
    ${mascotMessage("¡Hola! Soy <b>Fox</b> 🦊 ¿Qué nivel quieres practicar hoy?")}
    <div class="level-grid">${cards}</div>
    <footer class="credit">Hecho con cariño para pequeños exploradores del inglés 🌟</footer>
  `;
  wireTopbar();

  app.querySelectorAll(".level-card").forEach((btn) => {
    btn.addEventListener("click", () => renderLevel(btn.dataset.level));
  });
}

function levelBadge(levelId) {
  if (levelId === "basico") {
    return `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#ffffff33"/><path d="M60 90 C40 90 34 70 40 54 C44 60 50 60 52 52 C56 62 66 62 68 50 C76 62 80 82 60 90 Z" fill="#fff"/></svg>`;
  }
  if (levelId === "medio") {
    return `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#ffffff33"/><path d="M60 20 L72 46 L100 50 L78 68 L86 96 L60 80 L34 96 L42 68 L20 50 L48 46 Z" fill="#fff"/></svg>`;
  }
  return `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" fill="#ffffff33"/><path d="M60 18 C74 32 82 50 78 70 L66 70 L66 92 L54 92 L54 70 L42 70 C38 50 46 32 60 18 Z" fill="#fff"/><circle cx="60" cy="46" r="7" fill="#8F63D8"/></svg>`;
}

// ---------------- Screen: Level (lesson list) ----------------
function renderLevel(levelId) {
  const level = findLevel(levelId);
  const cards = level.lessons.map((lesson, i) => {
    const p = getLessonProgress(level.id, lesson.id);
    return `
      <button class="lesson-card" style="animation-delay:${i * 0.07}s" data-lesson="${lesson.id}">
        <span class="emoji">${lesson.icon}</span>
        <h3>${lesson.name}</h3>
        <div class="lesson-stars">${STAR_SVG_ON} ${p.stars} / ${MAX_LESSON_STARS}</div>
      </button>
    `;
  }).join("");

  app.innerHTML = `
    ${topbar(true)}
    <div class="section-title"><h1>${level.name}</h1></div>
    <p class="subtitle">${level.subtitle} Elige una lección para empezar.</p>
    <div class="lesson-grid">${cards}</div>
  `;
  wireTopbar(renderHome);
  app.querySelectorAll(".lesson-card").forEach((btn) => {
    btn.addEventListener("click", () => renderLessonMenu(levelId, btn.dataset.lesson));
  });
}

// ---------------- Screen: Lesson menu (choose activity) ----------------
function renderLessonMenu(levelId, lessonId) {
  const lesson = findLesson(levelId, lessonId);
  const p = getLessonProgress(levelId, lessonId);
  app.innerHTML = `
    ${topbar(true)}
    <div class="section-title"><h1>${lesson.icon} ${lesson.name}</h1></div>
    ${mascotMessage("Elige cómo quieres practicar estas palabras.")}
    <div class="activity-grid">
      <button class="activity-card act-flash" data-act="flash">
        <span class="big-emoji">🗂️</span>
        <h3>Tarjetas</h3>
        <p>Conoce las palabras nuevas</p>
        <div class="mini-stars">${starsRow(p.flashcards, STARS_PER_ACTIVITY)}</div>
      </button>
      <button class="activity-card act-memory" data-act="memory">
        <span class="big-emoji">🧠</span>
        <h3>Memorama</h3>
        <p>Encuentra las parejas</p>
        <div class="mini-stars">${starsRow(p.memory, STARS_PER_ACTIVITY)}</div>
      </button>
      <button class="activity-card act-quiz" data-act="quiz">
        <span class="big-emoji">❓</span>
        <h3>Quiz</h3>
        <p>Pon a prueba lo aprendido</p>
        <div class="mini-stars">${starsRow(p.quiz, STARS_PER_ACTIVITY)}</div>
      </button>
      <button class="activity-card act-drag" data-act="drag">
        <span class="big-emoji">🖐️</span>
        <h3>Arrastra y Une</h3>
        <p>Une cada imagen con su palabra</p>
        <div class="mini-stars">${starsRow(p.drag, STARS_PER_ACTIVITY)}</div>
      </button>
      <button class="activity-card act-scramble" data-act="scramble">
        <span class="big-emoji">🔤</span>
        <h3>Ordena las Letras</h3>
        <p>Forma la palabra en inglés</p>
        <div class="mini-stars">${starsRow(p.scramble, STARS_PER_ACTIVITY)}</div>
      </button>
    </div>
  `;
  wireTopbar(() => renderLevel(levelId));
  app.querySelectorAll(".activity-card").forEach((btn) => {
    const act = btn.dataset.act;
    btn.addEventListener("click", () => {
      if (act === "flash") renderFlashcards(levelId, lessonId);
      if (act === "memory") renderMemory(levelId, lessonId);
      if (act === "quiz") renderQuiz(levelId, lessonId);
      if (act === "drag") renderDrag(levelId, lessonId);
      if (act === "scramble") renderScramble(levelId, lessonId);
    });
  });
}

// ---------------- Screen: Flashcards ----------------
function renderFlashcards(levelId, lessonId) {
  const lesson = findLesson(levelId, lessonId);
  let index = 0;
  let flipped = false;

  function draw() {
    const word = lesson.words[index];
    app.innerHTML = `
      ${topbar(true)}
      <div class="section-title"><h1>${lesson.icon} ${lesson.name}</h1></div>
      <div class="flash-wrap">
        <div class="flash-progress">Tarjeta ${index + 1} de ${lesson.words.length}</div>
        <div class="flashcard ${flipped ? "flipped" : ""}" id="flashcard">
          <div class="flashcard-inner">
            <div class="flash-face">
              <div class="icon-wrap">${word.icon}</div>
              <div class="word-en">${word.en}</div>
              <button class="speak-btn" id="speakBtn">🔊 Escuchar</button>
            </div>
            <div class="flash-face flash-back">
              <div class="word-es-big">${word.es}</div>
              <div class="flash-hint">= ${word.en}</div>
            </div>
          </div>
        </div>
        <div class="flash-hint">Toca la tarjeta para voltearla</div>
        <div class="nav-row">
          <button class="nav-btn" id="prevBtn" ${index === 0 ? "disabled" : ""}>←</button>
          ${index === lesson.words.length - 1
            ? `<button class="primary-btn" id="finishBtn">¡Terminar! 🎉</button>`
            : `<button class="nav-btn" id="nextBtn">→</button>`}
        </div>
      </div>
    `;
    wireTopbar(() => renderLessonMenu(levelId, lessonId));

    const card = document.getElementById("flashcard");
    card.addEventListener("click", () => {
      flipped = !flipped;
      card.classList.toggle("flipped");
    });
    document.getElementById("speakBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      speak(word.en);
    });
    const prevBtn = document.getElementById("prevBtn");
    if (prevBtn) prevBtn.addEventListener("click", () => { index--; flipped = false; draw(); });
    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) nextBtn.addEventListener("click", () => { index++; flipped = false; draw(); });
    const finishBtn = document.getElementById("finishBtn");
    if (finishBtn) finishBtn.addEventListener("click", () => {
      const { improved } = setActivityStars(levelId, lessonId, "flashcards", 3);
      renderComplete(levelId, lessonId, "flash", 3, improved);
    });
  }
  draw();
}

// ---------------- Screen: Memory game ----------------
function renderMemory(levelId, lessonId) {
  const lesson = findLesson(levelId, lessonId);
  const chosen = shuffle(lesson.words).slice(0, 6);
  let cards = [];
  chosen.forEach((w, i) => {
    cards.push({ pairId: i, type: "icon", word: w });
    cards.push({ pairId: i, type: "text", word: w });
  });
  cards = shuffle(cards);

  let first = null;
  let lock = false;
  let matches = 0;
  let mistakes = 0;

  function draw() {
    app.innerHTML = `
      ${topbar(true)}
      <div class="section-title"><h1>${lesson.icon} ${lesson.name} — Memorama</h1></div>
      <p class="subtitle">Encuentra la pareja: imagen + palabra (${matches}/${chosen.length})</p>
      <div class="memory-grid" id="memGrid"></div>
    `;
    wireTopbar(() => renderLessonMenu(levelId, lessonId));

    const grid = document.getElementById("memGrid");
    cards.forEach((c, idx) => {
      const el = document.createElement("div");
      el.className = "mem-card" + (c.matched ? " matched" : "") + (c.flipped ? " flipped" : "");
      el.innerHTML = `
        <div class="mem-card-inner">
          <div class="mem-face mem-front"></div>
          <div class="mem-face mem-back">
            ${c.type === "icon" ? c.word.icon : `<div class="mem-word">${c.word.en}</div>`}
          </div>
        </div>
      `;
      el.addEventListener("click", () => onCardClick(idx));
      grid.appendChild(el);
    });
  }

  function onCardClick(idx) {
    const c = cards[idx];
    if (lock || c.matched || c.flipped) return;
    c.flipped = true;
    draw();

    if (first === null) {
      first = idx;
      return;
    }
    lock = true;
    const a = cards[first];
    const b = cards[idx];
    if (a.pairId === b.pairId && a.type !== b.type) {
      a.matched = true;
      b.matched = true;
      matches++;
      speak(a.word.en);
      first = null;
      lock = false;
      setTimeout(draw, 200);
      if (matches === chosen.length) {
        setTimeout(() => {
          const earned = starsForScore(mistakes, chosen.length);
          const { improved } = setActivityStars(levelId, lessonId, "memory", earned);
          renderComplete(levelId, lessonId, "memory", earned, improved);
        }, 500);
      }
    } else {
      mistakes++;
      setTimeout(() => {
        a.flipped = false;
        b.flipped = false;
        first = null;
        lock = false;
        draw();
      }, 800);
    }
  }

  draw();
}

// ---------------- Screen: Quiz ----------------
function renderQuiz(levelId, lessonId) {
  const lesson = findLesson(levelId, lessonId);
  const questions = shuffle(lesson.words).map((word) => {
    const distractors = shuffle(lesson.words.filter((w) => w.en !== word.en)).slice(0, 3);
    const options = shuffle([word, ...distractors]);
    return { word, options };
  });
  let qIndex = 0;
  let correctCount = 0;

  function draw() {
    const q = questions[qIndex];
    app.innerHTML = `
      ${topbar(true)}
      <div class="section-title"><h1>${lesson.icon} ${lesson.name} — Quiz</h1></div>
      <div class="quiz-wrap">
        <div class="quiz-progress-track"><div class="quiz-progress-fill" style="width:${(qIndex / questions.length) * 100}%"></div></div>
        <div class="quiz-icon">${q.word.icon}</div>
        <div class="quiz-question">¿Cómo se dice <b>"${q.word.es}"</b> en inglés?</div>
        <div class="quiz-options">
          ${q.options.map((opt) => `<button class="quiz-option" data-en="${opt.en}">${opt.en}</button>`).join("")}
        </div>
      </div>
    `;
    wireTopbar(() => renderLessonMenu(levelId, lessonId));

    app.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.addEventListener("click", () => {
        const isCorrect = btn.dataset.en === q.word.en;
        app.querySelectorAll(".quiz-option").forEach((b) => {
          b.disabled = true;
          if (b.dataset.en === q.word.en) b.classList.add("correct");
        });
        if (!isCorrect) btn.classList.add("incorrect");
        else { correctCount++; speak(q.word.en); }

        setTimeout(() => {
          qIndex++;
          if (qIndex < questions.length) draw();
          else finishQuiz();
        }, 900);
      });
    });
  }

  function finishQuiz() {
    const passed = correctCount >= Math.ceil(questions.length * 0.6);
    if (passed) {
      const wrong = questions.length - correctCount;
      const earned = starsForScore(wrong, questions.length);
      const { improved } = setActivityStars(levelId, lessonId, "quiz", earned);
      renderComplete(levelId, lessonId, "quiz", earned, improved, correctCount, questions.length);
    } else {
      renderQuizRetry(levelId, lessonId, correctCount, questions.length);
    }
  }

  draw();
}

function renderQuizRetry(levelId, lessonId, correct, total) {
  app.innerHTML = `
    ${topbar(true)}
    <div class="complete-wrap">
      <div class="complete-mascot">${MASCOT_SVG}</div>
      <h2>¡Casi lo logras!</h2>
      <p>Acertaste ${correct} de ${total}. ¡Inténtalo de nuevo, tú puedes! 💪</p>
      <button class="primary-btn" id="retryBtn">Intentar otra vez</button>
    </div>
  `;
  wireTopbar(() => renderLessonMenu(levelId, lessonId));
  document.getElementById("retryBtn").addEventListener("click", () => renderQuiz(levelId, lessonId));
}

// ---------------- Screen: Drag & Drop matching ----------------
function renderDrag(levelId, lessonId) {
  const lesson = findLesson(levelId, lessonId);
  const words = shuffle(lesson.words);
  const zoneOrder = shuffle(words);
  let placed = 0;
  let mistakes = 0;

  function draw() {
    app.innerHTML = `
      ${topbar(true)}
      <div class="section-title"><h1>${lesson.icon} ${lesson.name} — Arrastra y Une</h1></div>
      <p class="subtitle" id="dragSubtitle">Arrastra cada palabra hacia su imagen (${placed}/${words.length})</p>
      <div class="drag-wrap">
        <div class="drag-zones" id="dragZones">
          ${zoneOrder.map((w) => `
            <div class="drag-zone" data-word="${w.en}" id="zone-${w.en}">
              <div class="drag-zone-icon">${w.icon}</div>
              <div class="drag-zone-slot" id="slot-${w.en}">?</div>
            </div>
          `).join("")}
        </div>
        <div class="drag-tray" id="dragTray">
          ${shuffle(words).map((w) => `<div class="drag-chip" data-word="${w.en}" id="chip-${w.en}">${w.en}</div>`).join("")}
        </div>
      </div>
    `;
    wireTopbar(() => renderLessonMenu(levelId, lessonId));

    document.querySelectorAll(".drag-chip").forEach((chip) => {
      chip.addEventListener("pointerdown", (e) => startDrag(e, chip));
    });
  }

  function startDrag(e, chip) {
    e.preventDefault();
    const rect = chip.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    chip.setPointerCapture(e.pointerId);
    chip.classList.add("dragging");
    chip.style.position = "fixed";
    chip.style.left = rect.left + "px";
    chip.style.top = rect.top + "px";
    chip.style.width = rect.width + "px";

    function onMove(ev) {
      chip.style.left = ev.clientX - offsetX + "px";
      chip.style.top = ev.clientY - offsetY + "px";
    }
    function onUp(ev) {
      chip.removeEventListener("pointermove", onMove);
      chip.removeEventListener("pointerup", onUp);
      chip.classList.remove("dragging");
      chip.style.pointerEvents = "none";
      const dropEl = document.elementFromPoint(ev.clientX, ev.clientY);
      chip.style.pointerEvents = "";

      const zone = dropEl ? dropEl.closest(".drag-zone") : null;
      if (zone && zone.dataset.word === chip.dataset.word && !zone.classList.contains("filled")) {
        zone.classList.add("filled");
        document.getElementById("slot-" + chip.dataset.word).textContent = "✓";
        chip.remove();
        placed++;
        speak(chip.dataset.word);
        const sub = document.getElementById("dragSubtitle");
        if (sub) sub.textContent = `Arrastra cada palabra hacia su imagen (${placed}/${words.length})`;
        if (placed === words.length) {
          setTimeout(() => {
            const earned = starsForScore(mistakes, words.length);
            const { improved } = setActivityStars(levelId, lessonId, "drag", earned);
            renderComplete(levelId, lessonId, "drag", earned, improved);
          }, 500);
        }
      } else {
        mistakes++;
        chip.style.position = "";
        chip.style.left = "";
        chip.style.top = "";
        chip.style.width = "";
        chip.classList.add("wrong-drop");
        setTimeout(() => chip.classList.remove("wrong-drop"), 400);
      }
    }
    chip.addEventListener("pointermove", onMove);
    chip.addEventListener("pointerup", onUp);
  }

  draw();
}

// ---------------- Screen: Word scramble (ordena las letras) ----------------
function renderScramble(levelId, lessonId) {
  const lesson = findLesson(levelId, lessonId);
  const words = shuffle(lesson.words);
  let index = 0;
  let mistakes = 0;
  let letters = [];
  let slots = [];

  function setupWord() {
    const word = words[index].en.toLowerCase();
    letters = shuffle(word.split("")).map((ch, i) => ({ ch, id: i, used: false }));
    slots = new Array(word.length).fill(null);
  }

  function draw() {
    const word = words[index];
    app.innerHTML = `
      ${topbar(true)}
      <div class="section-title"><h1>${lesson.icon} ${lesson.name} — Ordena las Letras</h1></div>
      <div class="scramble-wrap">
        <div class="flash-progress">Palabra ${index + 1} de ${words.length}</div>
        <div class="scramble-icon">${word.icon}</div>
        <div class="scramble-hint">Pista: "${word.es}"</div>
        <div class="scramble-slots" id="scrambleSlots">
          ${slots.map((s, i) => `<div class="scramble-slot ${s ? "filled" : ""}" data-idx="${i}">${s ? s.ch : ""}</div>`).join("")}
        </div>
        <div class="scramble-letters" id="scrambleLetters">
          ${letters.map((l) => `<button class="scramble-letter" data-id="${l.id}" ${l.used ? "disabled style='visibility:hidden'" : ""}>${l.ch}</button>`).join("")}
        </div>
        <button class="nav-btn" id="clearBtn" title="Borrar">🧹</button>
      </div>
    `;
    wireTopbar(() => renderLessonMenu(levelId, lessonId));

    document.querySelectorAll(".scramble-letter").forEach((btn) => {
      btn.addEventListener("click", () => onLetterClick(Number(btn.dataset.id)));
    });
    document.querySelectorAll(".scramble-slot").forEach((el) => {
      el.addEventListener("click", () => onSlotClick(Number(el.dataset.idx)));
    });
    document.getElementById("clearBtn").addEventListener("click", () => resetSlots(true));
  }

  function onLetterClick(letterId) {
    const letter = letters.find((l) => l.id === letterId);
    if (!letter || letter.used) return;
    const emptyIdx = slots.findIndex((s) => s === null);
    if (emptyIdx === -1) return;
    slots[emptyIdx] = letter;
    letter.used = true;
    draw();
    if (slots.every((s) => s !== null)) checkWord();
  }

  function onSlotClick(idx) {
    const s = slots[idx];
    if (!s) return;
    s.used = false;
    slots[idx] = null;
    draw();
  }

  function resetSlots(redraw) {
    letters.forEach((l) => (l.used = false));
    slots = slots.map(() => null);
    if (redraw) draw();
  }

  function checkWord() {
    const attempt = slots.map((s) => s.ch).join("");
    const word = words[index];
    if (attempt === word.en.toLowerCase()) {
      speak(word.en);
      const slotsEl = document.getElementById("scrambleSlots");
      if (slotsEl) slotsEl.classList.add("correct-flash");
      setTimeout(() => {
        index++;
        if (index < words.length) { setupWord(); draw(); }
        else finish();
      }, 900);
    } else {
      mistakes++;
      const slotsEl = document.getElementById("scrambleSlots");
      if (slotsEl) slotsEl.classList.add("shake");
      setTimeout(() => resetSlots(true), 500);
    }
  }

  function finish() {
    const earned = starsForScore(mistakes, words.length);
    const { improved } = setActivityStars(levelId, lessonId, "scramble", earned);
    renderComplete(levelId, lessonId, "scramble", earned, improved);
  }

  setupWord();
  draw();
}

// ---------------- Screen: Completion ----------------
function renderComplete(levelId, lessonId, activity, starsEarned, isFirstTime, correct, total) {
  const lesson = findLesson(levelId, lessonId);
  const p = getLessonProgress(levelId, lessonId);
  const activityNames = {
    flash: "Tarjetas",
    memory: "Memorama",
    quiz: `Quiz${correct !== undefined ? ` (${correct}/${total})` : ""}`,
    drag: "Arrastra y Une",
    scramble: "Ordena las Letras",
  };
  const perfMessage = starsEarned >= 3 ? "¡Perfecto! 🌟" : starsEarned === 2 ? "¡Muy bien! 👍" : "¡Bien hecho! Sigue practicando";
  app.innerHTML = `
    ${topbar(true)}
    <div class="complete-wrap">
      <div class="complete-mascot">${MASCOT_SVG}</div>
      <h2>${perfMessage}</h2>
      <p class="activity-label">${activityNames[activity]}</p>
      <div class="big-stars">${starsRow(starsEarned, STARS_PER_ACTIVITY)}</div>
      <p>Llevas ${p.stars} de ${MAX_LESSON_STARS} estrellas en "${lesson.name}"</p>
      <button class="primary-btn" id="continueBtn">Continuar</button>
    </div>
  `;
  wireTopbar(() => renderLessonMenu(levelId, lessonId));
  document.getElementById("continueBtn").addEventListener("click", () => renderLessonMenu(levelId, lessonId));
  if (isFirstTime || starsEarned >= 3) launchConfetti();
}

// ---------------- Init ----------------
renderHome();
initMusicAutoStart();

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
