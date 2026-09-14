(() => {
  const content = window.MATH_CONTENT;
  const chapter = content.chapters.find((item) => item.id === window.MATH_CHAPTER_ID);
  const app = document.querySelector('#chapter-app');
  const starCount = document.querySelector('#starCount');
  let stars = Number(localStorage.getItem(`${content.storageKey}:stars`) || 0);
  if (!Number.isFinite(stars) || stars < 0) stars = 0;
  let activeIndex = -1;
  let answered = false;

  const playSound = (name) => window.Grade1MathSound.play(name);
  const speak = (text) => window.Grade1MathSound.speak(text);
  const updateStars = () => { starCount.textContent = Number.isFinite(stars) ? stars : 0; };
  const mascot = (message, mood = 'happy') => `<div class="grade1-math-mascot"><div class="grade1-math-bunny mood-${mood}" aria-label="Kiko si kelinci">🐰</div><div class="grade1-math-speech">${message}</div></div>`;
  const missionVisual = (activity, index) => {
    if (activity.type === 'count') return `<div class="mission-mini-visual">${activity.items.repeat(Math.min(activity.answer, 5))} <b>→ ${activity.answer}</b></div>`;
    if (activity.type === 'choose') return '<div class="mission-mini-visual mission-number-run"><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span></div>';
    if (activity.type === 'sum') return `<div class="mission-mini-visual">${'●'.repeat(activity.left)} <b>+</b> ${'●'.repeat(activity.right)} <b>→ ${activity.answer}</b></div>`;
    if (activity.type === 'difference') return `<div class="mission-mini-visual">${'●'.repeat(activity.left)} <b>−</b> ${activity.right} <b>→ ${activity.answer}</b></div>`;
    if (activity.type === 'shape') return '<div class="mission-mini-visual">○ △ □</div>';
    return `<div class="mission-mini-visual">4 <b>•</b> 6 <b>→</b> ${activity.answer}</div>`;
  };
  const renderChapter = () => {
    document.title = `${chapter.title} | ${content.title}`;
    const completed = chapter.subs.filter((_, index) => localStorage.getItem(`${content.storageKey}:done:${chapter.id}:${index}`) === 'true').length;
    const allDone = completed === chapter.subs.length;
    const progressStars = chapter.subs.map((_, index) => `<span class="chapter-star ${index < completed ? 'is-earned' : ''}" aria-hidden="true">${index < completed ? '⭐' : '☆'}</span>`).join('');
    document.querySelector('.chapter-map-button')?.remove();
    document.body.insertAdjacentHTML('afterbegin', '<a class="chapter-map-button" href="index.html" aria-label="Kembali ke peta petualangan"><img src="images/btn-peta.png" alt="Peta"></a>');
    document.querySelector('.chapter-title-board')?.remove();
    document.querySelector('.grade1-math-header').insertAdjacentHTML('afterend', `<section class="chapter-title-board"><div class="grade1-math-kicker">LEVEL 0${chapter.number}</div><h1>${chapter.title}</h1><p>${chapter.goal}</p></section>`);
    document.querySelector('.chapter-progress-floating')?.remove();
    document.body.insertAdjacentHTML('afterbegin', `<section class="chapter-progress-floating" aria-label="BAB, ${completed} dari ${chapter.subs.length} selesai"><strong>BAB • ⭐ ${completed}/${chapter.subs.length}</strong></section>`);
    app.innerHTML = `<section class="level-heading"></section><section class="grade1-math-mission-zone" aria-label="Misi Level ${chapter.number}">${mascot('Pilih satu misi untuk mulai bermain!', 'thinking')}<div class="grade1-math-subjects">${chapter.subs.map((sub, index) => { const done = localStorage.getItem(`${content.storageKey}:done:${chapter.id}:${index}`) === 'true'; return `<article class="grade1-math-subject ${done ? 'is-done' : ''}"><span class="subject-number">0${index + 1}</span><span class="mission-copy"><b>${sub.title}</b>${missionVisual(sub.activity, index)}<small>${sub.concept}</small><span class="mission-reward" aria-label="${done ? 'Misi selesai' : 'Misi belum selesai'}">${done ? '✓ ⭐' : '☆ ☆'}</span></span><a class="subject-play mission-action" href="?sub=${index + 1}" aria-label="${done ? 'Main lagi' : 'Main'} ${sub.title}">${done ? 'MAIN LAGI ▶' : 'MAIN ▶'}</a></article>`; }).join('')}</div></section><section class="chapter-complete ${allDone ? 'is-visible' : ''}" aria-live="polite"><strong>🎉 BAB SELESAI!</strong><span>Semua misi sudah kamu mainkan.</span></section>`;
    const params = new URLSearchParams(location.search);
    if (params.has('sub')) { document.querySelector('.chapter-title-board')?.remove(); renderActivity(Number(params.get('sub')) - 1); }
  };
  const visual = (activity) => {
    if (activity.type === 'count') return `<div class="math-objects">${activity.items.repeat(activity.answer)}</div>`;
    if (activity.type === 'sum') return `<div class="math-objects math-equation">${'🍎'.repeat(activity.left)} <b>+</b> ${'🍎'.repeat(activity.right)}</div>`;
    if (activity.type === 'difference') return `<div class="math-objects math-equation">${'⚽'.repeat(activity.left)} <b>−</b> <span class="muted-objects">${'⚽'.repeat(activity.right)}</span></div>`;
    if (activity.type === 'shape') return '<div class="shape-row"><span class="shape-circle">○</span><span class="shape-triangle">△</span><span class="shape-square">□</span></div>';
    return '<div class="math-objects math-equation">🍊🍊🍊🍊 &nbsp; • &nbsp; 🍊🍊🍊🍊🍊🍊</div>';
  };
  const renderInteraction = (activity) => {
    if (activity.mode === 'input') {
      return `<form class="number-input-form" id="number-input-form"><label for="number-answer">Tulis hasil atau jawabanmu</label><div><input id="number-answer" name="answer" inputmode="${typeof activity.answer === 'number' ? 'numeric' : 'text'}" autocomplete="off" aria-label="Jawaban"><button class="check-button" type="submit">PERIKSA</button></div></form>`;
    }
    if (activity.mode === 'sequence') {
      return `<div class="sequence-game"><div class="sequence-choices">${activity.choices.map((choice) => `<button class="sequence-choice" type="button" data-value="${choice}">${choice}</button>`).join('')}</div><p id="sequence-picked" aria-live="polite">Urutanmu: belum dipilih</p><button class="check-button sequence-check" type="button">PERIKSA URUTAN</button></div>`;
    }
    if (activity.mode === 'strategy') {
      return `<div class="answer-grid strategy-answers">${activity.choices.map((choice) => `<button class="answer-button" type="button" data-answer="${choice}">${choice}</button>`).join('')}</div>`;
    }
    return `<div class="answer-grid activity-answers">${activity.choices.map((choice) => `<button class="answer-button" type="button" data-answer="${choice}">${choice}</button>`).join('')}</div>`;
  };
  const renderActivity = (index) => {
    const sub = chapter.subs[index];
    if (!sub) return;
    activeIndex = index;
    answered = false;
    const activity = sub.activity;
    const progressDots = chapter.subs.map((_, subIndex) => `<span class="progress-dot ${subIndex <= index ? 'is-active' : ''}" aria-hidden="true"></span>`).join('');
    const label = activity.challenge ? 'MINI CHALLENGE · PILIH STRATEGI' : activity.mode === 'strategy' ? 'PAHAMI · PILIH STRATEGI' : 'PAHAMI · COBA · PECAHKAN';
    app.innerHTML = `<section class="grade1-math-activity-head"><a class="grade1-math-back" href="index.html" onclick="if (history.length > 1) { event.preventDefault(); history.back(); }">⬅️ KEMBALI</a><span>LEVEL 0${chapter.number} · MISI ${index + 1}</span><span class="activity-stars">⭐ ${stars}</span></section><section class="grade1-math-activity-card">${mascot(activity.mascot || 'Menurutmu, cara mana yang paling membantu?', 'curious')}<div class="activity-label">${label}</div><div class="activity-tools"><button class="activity-listen" type="button" aria-label="Dengarkan soal">🔊 Dengarkan soal</button><button class="hint-button" type="button">💡 Petunjuk</button></div><div class="activity-visual">${visual(activity)}</div><h1 class="level-prompt activity-prompt">${activity.prompt}</h1>${renderInteraction(activity)}<div class="hint-output" id="hint-output" role="status"></div><div class="feedback" id="feedback" role="status"></div><div class="level-progress-dots" aria-label="Misi ${index + 1} dari ${chapter.subs.length}">${progressDots}</div></section>`;
    document.querySelectorAll('.answer-button').forEach((button) => button.addEventListener('click', () => answer(button, activity)));
    document.querySelector('.activity-listen')?.addEventListener('click', () => speak(activity.instruction || activity.prompt));
    document.querySelector('#number-input-form')?.addEventListener('submit', (event) => { event.preventDefault(); const input = event.currentTarget.elements.answer; answerValue(input.value, activity, input); });
    const selectedSequence = [];
    document.querySelectorAll('.sequence-choice').forEach((button) => button.addEventListener('click', () => { if (answered) return; selectedSequence.push(button.dataset.value); button.disabled = true; button.classList.add('is-picked'); document.querySelector('#sequence-picked').textContent = `Urutanmu: ${selectedSequence.join(' → ')}`; playSound('select'); }));
    document.querySelector('.sequence-check')?.addEventListener('click', () => answerValue(selectedSequence, activity, document.querySelector('.sequence-check')));
    let hintIndex = 0;
    document.querySelector('.hint-button')?.addEventListener('click', () => { const hints = activity.hints || [activity.hint || 'Perhatikan kembali informasi penting pada soal.']; const hint = hints[Math.min(hintIndex, hints.length - 1)]; hintIndex += 1; document.querySelector('#hint-output').textContent = hint; speak(hint); playSound('click'); });
  };
  const answer = (button, activity) => answerValue(button.dataset.answer, activity, button);
  const answerValue = (value, activity, sourceButton) => {
    const feedback = document.querySelector('#feedback');
    if (answered) return;
    const actual = Array.isArray(value) ? value.join('|') : String(value).trim();
    const expected = Array.isArray(activity.answer) ? activity.answer.join('|') : String(activity.answer).trim();
    if (actual === expected) {
      answered = true;
      sourceButton?.classList.add('is-correct');
      const doneKey = `${content.storageKey}:done:${chapter.id}:${activeIndex}`;
      const alreadyDone = localStorage.getItem(doneKey) === 'true';
      const nextHref = activeIndex < chapter.subs.length - 1
        ? `bab${chapter.number}.html?sub=${activeIndex + 2}`
        : `bab${chapter.number}.html`;
      const nextLabel = activeIndex < chapter.subs.length - 1 ? 'Berikutnya' : 'Kembali ke BAB';
      feedback.innerHTML = `<strong>Hebat! Benar!</strong><span>${activity.explanation || 'Strategimu tepat.'}</span><span>${alreadyDone ? '⭐ Tantangan sudah selesai' : '⭐ +1 bintang'}</span><a class="next-button" href="${nextHref}">${nextLabel}</a>`;
      if (!alreadyDone) {
        stars += 1;
        localStorage.setItem(`${content.storageKey}:stars`, String(stars));
        localStorage.setItem(doneKey, 'true');
      }
      const completedNow = chapter.subs.filter((_, subIndex) => localStorage.getItem(`${content.storageKey}:done:${chapter.id}:${subIndex}`) === 'true').length;
      const progress = document.querySelector('.chapter-progress-floating');
      if (progress) {
        progress.setAttribute('aria-label', `BAB, ${completedNow} dari ${chapter.subs.length} selesai`);
        progress.querySelector('strong').textContent = `BAB • ⭐ ${completedNow}/${chapter.subs.length}`;
      }
      updateStars();
      playSound('correct');
      speak(activity.explanation || 'Hebat! Jawabanmu benar.');
    } else {
      sourceButton?.classList.add('is-try-again');
      feedback.innerHTML = `<strong>Coba lagi.</strong><span>${activity.hint || 'Periksa lagi informasi penting pada soal.'}</span>`;
      playSound('wrong');
      speak(activity.hint || 'Hampir benar. Periksa lagi strategimu.');
      window.setTimeout(() => sourceButton?.classList.remove('is-try-again'), 450);
    }
  };
  updateStars();
  renderChapter();
})();