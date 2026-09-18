(() => {
  const content = window.GRADE1_INDO_CONTENT;
  const number = Number(document.body.dataset.chapter || 1);
  const chapter = content.chapters[number - 1];
  const app = document.querySelector('#lesson');
  const starsKey = 'grade1IndoStars';
  const stateKey = (index) => `grade1IndoState:${chapter.id}:${index}`;
  const legacyDoneKey = (index) => `grade1IndoDone:${chapter.id}:${index}`;
  const rewardKey = (index) => `grade1IndoReward:${chapter.id}:${index}`;
  const iconSet = ['👋', '👂', '👉', '💬'];
  const shortDesc = ['Kenali namamu dan namanya.', 'Dengar, pahami, lalu jawab.', 'Ikuti langkah demi langkah.', 'Bicara dengan kata yang baik.'];
  let current = Number(new URLSearchParams(location.search).get('sub') || 1) - 1;
  if (!Number.isInteger(current) || current < 0 || current >= chapter.subs.length) current = 0;

  const getStars = () => {
    const stars = Number(localStorage.getItem(starsKey) || 0);
    return Number.isFinite(stars) && stars >= 0 ? stars : 0;
  };
  const parseState = (saved) => {
    if (!saved) return {};
    try { return JSON.parse(saved) || {}; } catch { return {}; }
  };
  const readState = (index) => {
    const saved = localStorage.getItem(stateKey(index));
    const state = parseState(saved);
    if (localStorage.getItem(legacyDoneKey(index)) === 'true') state.completed = true;
    return { started: false, practice: false, game: false, quiz: false, completed: false, ...state };
  };
  const writeState = (index, state) => localStorage.setItem(stateKey(index), JSON.stringify(state));
  const isComplete = (index) => readState(index).completed;
  const chapterComplete = (targetChapter) => targetChapter.subs.every((_, index) => {
    const saved = localStorage.getItem(`grade1IndoState:${targetChapter.id}:${index}`);
    return parseState(saved).completed === true || localStorage.getItem(`grade1IndoDone:${targetChapter.id}:${index}`) === 'true';
  });
  const chapterUnlocked = () => true;
  const subUnlocked = (index) => index === 0 || isComplete(index - 1);
  const addReward = (index) => {
    if (localStorage.getItem(rewardKey(index)) === 'true') return;
    localStorage.setItem(rewardKey(index), 'true');
    localStorage.setItem(starsKey, String(getStars() + 1));
  };
  const syncRoute = (includeStep = true) => {
    const url = new URL(window.location.href);
    if (includeStep) url.searchParams.set('sub', String(current + 1));
    else url.searchParams.delete('sub');
    history.replaceState({}, '', `${url.pathname}${url.search}`);
  };
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const feedback = (message, type = '') => `<div class="bi-bab1-feedback ${type}" role="status" aria-live="polite">${message}</div>`;

  const renderOverview = () => {
    const completedCount = chapter.subs.filter((_, index) => isComplete(index)).length;
    const chapterWords = chapter.title.split(' ');
    const accentWord = chapterWords[chapterWords.length - 1];
    const prefixText = chapterWords.length > 1 ? chapterWords.slice(0, -1).join(' ') : '';
    app.innerHTML = `<div class="bi-bab1-shell"><div class="bi-bab1-scene">
      <header class="bi-bab1-topbar"><div class="bi-bab1-brand"><span class="bi-bab1-brand-mark">📚</span><span>GERBANG EDUKASI</span></div><div class="bi-bab1-subject"><span class="bi-bab1-subject-mark">📖</span><div class="bi-bab1-subject-text"><strong>BAHASA INDONESIA</strong><small>KELAS 1 · SEMESTER 1</small></div></div><div class="bi-bab1-tools"><div class="bi-bab1-star-pill" aria-label="Jumlah bintang">⭐ <span>${getStars()}</span></div><div class="bi-bab1-avatar" aria-hidden="true">👧</div><div class="bi-bab1-greeting">Halo, Teman!</div></div></header>
      <main class="bi-bab1-main"><img class="bi-bab1-character" src="karakter1.png" alt="Karakter perempuan" /><button type="button" class="bi-bab1-back" id="backToMap">← Kembali</button><section class="bi-bab1-hero"><div class="bi-bab1-char-area" aria-hidden="true"><div class="bi-bab1-speech">Halo,<br>Teman!<br>Siap belajar<br>hari ini?</div></div><div class="bi-bab1-board-wrap"><div class="bi-bab1-board"><div class="bi-bab1-board-label">BAB ${chapter.number}</div><div class="bi-bab1-title-board"><h1>${prefixText ? `${prefixText} ` : ''}<span class="accent">${accentWord}</span></h1></div><div class="bi-bab1-subtitle">${chapter.description}</div><div class="bi-bab1-progress-box">${chapter.subs.map((_, index) => { const done = isComplete(index); const stateClass = done ? 'is-done' : index === current && subUnlocked(index) ? 'is-current' : ''; return `<span class="bi-bab1-step-pill ${stateClass}">${index + 1}</span>${index < chapter.subs.length - 1 ? '<span class="bi-bab1-progress-even"></span>' : ''}`; }).join('')}<span class="bi-bab1-progress-num"><span>${completedCount}</span><small>/ ${chapter.subs.length}</small></span></div><button type="button" class="bi-bab1-start" id="startBab1">▶ ${completedCount ? 'Lanjutkan Belajar' : 'Mulai Belajar'} →</button></div></div><div class="bi-bab1-side-note" aria-hidden="true"><div class="bi-bab1-note">Setiap<br>Aku Istimewa</div></div></section></main>
      <div class="bi-bab1-journey-wrap"><div class="bi-bab1-journey-banner"><span>Perjalanan Belajarmu</span></div><section class="bi-bab1-journey" aria-label="Submateri bab ${chapter.number}">${chapter.subs.map((item, index) => { const done = isComplete(index); const unlocked = subUnlocked(index); const tagText = done ? '✓ Selesai' : unlocked ? 'Mulai' : '🔒 Terkunci'; return `<button type="button" class="bi-bab1-card ${done ? 'is-done' : ''} ${index === current && unlocked ? 'is-active' : ''} ${!unlocked ? 'is-locked' : ''}" data-go="${index}" ${!unlocked ? 'disabled aria-disabled="true"' : ''}><span class="bi-bab1-card-no">${String(index + 1).padStart(2, '0')}</span><span class="bi-bab1-card-icon">${iconSet[index]}</span><h3>${item.title}</h3><p>${shortDesc[index]}</p><div class="bi-bab1-card-row"><span class="bi-bab1-card-tag ${done ? 'is-done' : unlocked ? 'is-start' : ''}">${tagText}</span><span class="bi-bab1-card-arrow" aria-hidden="true">→</span></div></button>`; }).join('')}</section></div><div class="bi-bab1-footer">“Pelan-pelan membaca, berani bercerita, jadi diri sendiri yang hebat!”</div>
    </div></div>`;
    current = chapter.subs.findIndex((_, index) => !isComplete(index) && subUnlocked(index));
    if (current < 0) current = chapter.subs.length - 1;
    syncRoute(false);
    app.querySelectorAll('img.bi-bab1-character').forEach((image) => {
      const fallback = image.getAttribute('src');
      image.src = fallback.replace('.png', '.webp');
      image.addEventListener('error', () => { image.src = fallback; }, { once: true });
    });
    document.querySelector('#lessonTitle').textContent = chapter.title;
    app.querySelector('#backToMap').addEventListener('click', () => { window.location.href = 'index.html'; });
    app.querySelector('#startBab1').addEventListener('click', () => renderStep(current));
    app.querySelector(`[data-go="${current}"]`)?.setAttribute('aria-current', 'step');
    app.querySelectorAll('[data-go]').forEach((button) => button.addEventListener('click', () => renderStep(Number(button.dataset.go))));
  };

  const getGameQuestion = (index) => {
    const matchingQuestion = chapter.quiz[index];
    return matchingQuestion && Array.isArray(matchingQuestion[1]) && Number.isInteger(matchingQuestion[2])
      ? matchingQuestion
      : chapter.quiz.find((item) => Array.isArray(item[1]) && Number.isInteger(item[2])) || ['Pilih jawaban untuk mencoba permainan.', ['Saya siap mencoba', 'Nanti saja'], 0, 'pilihan'];
  };

  const renderStep = (stepIndex = current) => {
    if (!subUnlocked(stepIndex)) return renderOverview();
    current = stepIndex;
    const state = readState(current);
    state.started = true;
    writeState(current, state);
    syncRoute(true);
    const sub = chapter.subs[current];
    const finalChapterQuiz = chapter.quiz[chapter.subs.length];
    const quizItem = current === chapter.subs.length - 1 && finalChapterQuiz ? finalChapterQuiz : (chapter.quiz[current] || chapter.quiz[0]);
    const gameItem = getGameQuestion(current);
    app.innerHTML = `<div class="bi-bab1-shell"><div class="bi-bab1-scene"><header class="bi-bab1-topbar"><button type="button" class="bi-bab1-back" id="backOverview" aria-label="Kembali ke halaman utama">← Kembali</button><div class="bi-bab1-title">${chapter.title}</div><div class="bi-bab1-stars" aria-label="Jumlah bintang">⭐ ${getStars()}</div></header><main class="bi-bab1-main"><section class="bi-bab1-lesson-flow"><div class="bi-bab1-character-wrap" aria-hidden="true"><img class="bi-bab1-character" src="karakter1.png" alt="" /><span class="bi-bab1-bubble bi-bab1-bubble--one">⭐</span><span class="bi-bab1-bubble bi-bab1-bubble--two">🎉</span></div><div class="bi-bab1-board"><div class="bi-bab1-label">Langkah ${current + 1} dari ${chapter.subs.length}</div><h2>${sub.title}</h2><p>${sub.explain}</p><div class="bi-bab1-example"><strong>Contoh</strong><span>${sub.example}</span></div><div class="bi-bab1-board-actions"><button type="button" class="bi-bab1-primary" id="finish" ${state.completed ? 'disabled' : ''}>${state.completed ? '✓ Sudah selesai' : 'Selesaikan langkah'}</button><button type="button" class="bi-bab1-secondary" id="overviewButton">Lihat jalur</button></div><div id="completionHint">${!state.completed ? feedback('Coba, bermain, dan evaluasi untuk mendapat bintang.') : feedback('Langkah ini sudah selesai. Bintang sudah diberikan.', 'is-correct')}</div></div></section><div class="bi-bab1-panel-grid"><article class="bi-bab1-panel"><h3>🎯 Ayo lakukan</h3><p>${sub.activity}</p><div class="bi-bab1-game-box"><span>🎮</span><div><strong>${sub.game}</strong><p class="bi-bab1-practice-prompt"><b>Coba:</b> ${sub.practice[0]}</p><div id="gameArea"><button type="button" id="gameButton">${state.practice ? 'Mulai mini-game' : 'Saya siap mencoba'}</button></div></div></div><div id="gameFeedback"></div></article><article class="bi-bab1-panel"><h3>📝 Evaluasi</h3><p id="quizPrompt">Jawab satu pertanyaan untuk memeriksa pemahamanmu.</p><div id="quizArea"></div><div id="quizFeedback"></div></article></div><div class="bi-bab1-step-nav"><button type="button" class="bi-bab1-nav" id="prev" ${current === 0 ? 'disabled' : ''}>← Sebelumnya</button><button type="button" class="bi-bab1-nav" id="next">${current === chapter.subs.length - 1 ? 'Kembali ke jalur' : 'Berikutnya →'}</button></div></main><div class="bi-bab1-footer">“Pelan-pelan membaca, berani bercerita, jadi diri sendiri yang hebat!”</div></div></div>`;
    app.querySelectorAll('img.bi-bab1-character').forEach((image) => {
      const fallback = image.getAttribute('src');
      image.src = fallback.replace('.png', '.webp');
      image.addEventListener('error', () => { image.src = fallback; }, { once: true });
    });
    const lessonLabel = app.querySelector('.bi-bab1-label');
    lessonLabel.textContent = `Kenali dan contoh · Langkah ${current + 1} dari ${chapter.subs.length}`;
    app.querySelector('.bi-bab1-panel h3').textContent = '🎮 Bermain';
    const characterBubble = app.querySelector('.bi-bab1-bubble--two');
    const setCharacterMessage = (message) => { characterBubble.textContent = message; characterBubble.setAttribute('aria-label', message); };
    setCharacterMessage(state.completed ? '🎉' : 'Yuk!');
    const quizPanel = app.querySelectorAll('.bi-bab1-panel')[1];
    quizPanel.hidden = !state.game;
    if (!state.game) app.querySelector('#quizPrompt').textContent = 'Mainkan dulu agar evaluasi terbuka.';
    if (sub.audioSrc) {
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.preload = 'none';
      audio.setAttribute('aria-label', `Audio ${sub.title}`);
      audio.src = sub.audioSrc;
      app.querySelector('.bi-bab1-example').after(audio);
    }
    document.querySelector('#lessonTitle').textContent = `${chapter.title} · ${sub.title}`;
    app.querySelector('#backOverview').addEventListener('click', renderOverview);
    app.querySelector('#overviewButton').addEventListener('click', renderOverview);
    app.querySelector('#prev').addEventListener('click', () => { if (current > 0) renderStep(current - 1); });
    app.querySelector('#next').addEventListener('click', () => { if (current < chapter.subs.length - 1 && subUnlocked(current + 1)) renderStep(current + 1); else renderOverview(); });
    app.querySelector('#finish').addEventListener('click', () => {
      const latest = readState(current);
      if (!latest.practice || !latest.game || !latest.quiz) { app.querySelector('#completionHint').innerHTML = feedback('Belum selesai. Coba dulu, mainkan mini-game, lalu jawab evaluasi.', 'is-wrong'); return; }
      latest.completed = true;
      writeState(current, latest);
      localStorage.setItem(legacyDoneKey(current), 'true');
      addReward(current);
      renderStep(current);
    });

    const renderGame = () => {
      const [prompt, options, answer] = gameItem;
      app.querySelector('#gameArea').innerHTML = `<fieldset class="bi-bab1-choice"><legend>${prompt}</legend>${options.map((option, index) => `<button type="button" class="bi-bab1-choice-button" data-game-answer="${index}">${option}</button>`).join('')}</fieldset>`;
      app.querySelectorAll('[data-game-answer]').forEach((button) => button.addEventListener('click', () => {
        if (Number(button.dataset.gameAnswer) === answer) { const latest = readState(current); latest.game = true; writeState(current, latest); quizPanel.hidden = false; app.querySelector('#quizPrompt').textContent = 'Jawab satu pertanyaan untuk memeriksa pemahamanmu.'; app.querySelector('#gameFeedback').innerHTML = feedback('Hebat! Jawabanmu benar. Coba evaluasi sekarang.', 'is-correct'); setCharacterMessage('Hebat!'); app.querySelectorAll('[data-game-answer]').forEach((item) => { item.disabled = true; }); }
        else { app.querySelector('#gameFeedback').innerHTML = feedback('Belum tepat. Coba lagi.', 'is-wrong'); setCharacterMessage('Coba lagi.'); }
      }));
    };
    app.querySelector('#gameButton').addEventListener('click', () => {
      const latest = readState(current);
      latest.practice = true;
      writeState(current, latest);
      renderGame();
    });

    const renderQuiz = () => {
      const [prompt, options, answer, type] = quizItem;
      if (!options) {
        const savedResponse = escapeHtml(state.response || '');
        app.querySelector('#quizArea').innerHTML = `<p class="bi-bab1-open-task">${prompt}</p><label class="bi-bab1-response-label" for="openResponse">Tulis atau catat jawabanmu</label><textarea id="openResponse" rows="3" placeholder="Ketik jawabanmu di sini" ${state.quiz ? 'disabled' : ''}>${savedResponse}</textarea><button type="button" class="bi-bab1-game-action" id="confirmQuiz" ${state.quiz ? 'disabled' : ''}>${state.quiz ? '✓ Jawaban tersimpan' : 'Kirim jawaban'}</button>`;
        app.querySelector('#confirmQuiz').addEventListener('click', () => {
          const response = app.querySelector('#openResponse').value.trim();
          if (response.length < 2) { app.querySelector('#quizFeedback').innerHTML = feedback('Tulis jawabanmu dulu, lalu coba lagi.', 'is-wrong'); return; }
          const latest = readState(current); latest.quiz = true; latest.response = response; writeState(current, latest); app.querySelector('#quizFeedback').innerHTML = feedback('Bagus, kamu sudah berlatih.', 'is-correct'); app.querySelector('#openResponse').disabled = true; app.querySelector('#confirmQuiz').disabled = true;
        });
        return;
      }
      app.querySelector('#quizArea').innerHTML = `<fieldset class="bi-bab1-choice"><legend>${prompt}</legend>${options.map((option, index) => `<button type="button" class="bi-bab1-choice-button" data-quiz-answer="${index}">${option}</button>`).join('')}</fieldset>`;
      app.querySelectorAll('[data-quiz-answer]').forEach((button) => button.addEventListener('click', () => { if (Number(button.dataset.quizAnswer) === answer) { const latest = readState(current); latest.quiz = true; writeState(current, latest); app.querySelector('#quizFeedback').innerHTML = feedback('Benar! Kamu memahami materi ini.', 'is-correct'); app.querySelectorAll('[data-quiz-answer]').forEach((item) => { item.disabled = true; }); } else app.querySelector('#quizFeedback').innerHTML = feedback(type === 'benar-salah' ? 'Belum tepat. Baca contoh lagi, lalu coba lagi.' : 'Belum tepat. Coba pilihan lain.', 'is-wrong'); }));
    };
    renderQuiz();
  };

  if (!chapter || !chapterUnlocked()) { window.location.href = 'index.html'; return; }
  if (new URLSearchParams(location.search).get('sub')) renderStep(current);
  else renderOverview();
})();
