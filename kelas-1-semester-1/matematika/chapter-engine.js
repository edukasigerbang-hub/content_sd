(() => {
  const content = window.GRADE1_MATH_CONTENT;
  const chapter = content.chapters.find((item) => item.id === window.MATH_CHAPTER_ID);
  const app = document.querySelector('#chapter-app');
  const starCount = document.querySelector('#starCount');
  let stars = Number(localStorage.getItem('grade1MathStars') || 0);
  if (!Number.isFinite(stars) || stars < 0) stars = 0;
  let activeIndex = -1;
  let answered = false;

  const speak = (text) => window.Grade1MathSound.speak(text);
  const updateStars = () => { starCount.textContent = Number.isFinite(stars) ? stars : 0; };
  const mascot = (message, mood = 'happy') => `<div class="grade1-math-mascot"><div class="grade1-math-bunny mood-${mood}" aria-label="Kiko si kelinci">🐰</div><div class="grade1-math-speech">${message}</div></div>`;
  const renderChapter = () => {
    app.innerHTML = `<section class="grade1-math-heading"><div class="grade1-math-kicker">BAB ${chapter.number}</div><h1>${chapter.title}</h1><p>${chapter.goal}</p></section><a class="grade1-math-back" href="index.html">← Semua BAB</a><section class="grade1-math-subjects">${chapter.subs.map((sub, index) => `<a class="grade1-math-subject" href="?sub=${index + 1}"><span class="subject-number">0${index + 1}</span><span><b>${sub.title}</b><small>${sub.concept}</small></span><span class="subject-play">▶</span></a>`).join('')}</section><div class="grade1-math-note">${mascot('Setiap tantangan punya satu tujuan. Pelan-pelan saja, ya!', 'thinking')}</div>`;
    const params = new URLSearchParams(location.search);
    if (params.has('sub')) renderActivity(Number(params.get('sub')) - 1);
  };
  const visual = (activity) => {
    if (activity.type === 'count') return `<div class="math-objects">${activity.items.repeat(activity.answer)}</div>`;
    if (activity.type === 'sum') return `<div class="math-objects math-equation">${'🍎'.repeat(activity.left)} <b>+</b> ${'🍎'.repeat(activity.right)}</div>`;
    if (activity.type === 'difference') return `<div class="math-objects math-equation">${'⚽'.repeat(activity.left)} <b>−</b> <span class="muted-objects">${'⚽'.repeat(activity.right)}</span></div>`;
    if (activity.type === 'shape') return '<div class="shape-row"><span class="shape-circle">○</span><span class="shape-triangle">△</span><span class="shape-square">□</span></div>';
    return '<div class="math-objects math-equation">🍊🍊🍊🍊 &nbsp; • &nbsp; 🍊🍊🍊🍊🍊🍊</div>';
  };
  const renderActivity = (index) => {
    const sub = chapter.subs[index];
    if (!sub) return;
    activeIndex = index;
    answered = false;
    const activity = sub.activity;
    app.innerHTML = `<section class="grade1-math-activity-head"><a class="grade1-math-back" href="bab${chapter.number}.html">← ${chapter.title}</a><span>BAB ${chapter.number} · SUBBAB ${index + 1}</span></section><section class="grade1-math-activity-card">${mascot('Ayo, kita coba!', 'curious')}<div class="activity-label">COBA</div>${visual(activity)}<h1>${activity.prompt}</h1><div class="answer-grid">${activity.choices.map((choice) => `<button class="answer-button" type="button" data-answer="${choice}">${choice}</button>`).join('')}</div><div class="feedback" id="feedback" role="status"></div><button class="listen-button" id="listen" type="button">🔊 Dengarkan lagi</button></section>`;
    document.querySelectorAll('.answer-button').forEach((button) => button.addEventListener('click', () => answer(button, activity)));
    document.querySelector('#listen').addEventListener('click', () => speak(activity.instruction || activity.prompt));
    speak(activity.instruction || activity.prompt);
  };
  const answer = (button, activity) => {
    const feedback = document.querySelector('#feedback');
    if (answered) return;
    if (String(button.dataset.answer) === String(activity.answer)) {
      answered = true;
      button.classList.add('is-correct');
      const doneKey = `grade1MathDone:${chapter.id}:${activeIndex}`;
      const alreadyDone = localStorage.getItem(doneKey) === 'true';
      const nextHref = activeIndex < chapter.subs.length - 1
        ? `bab${chapter.number}.html?sub=${activeIndex + 2}`
        : `bab${chapter.number}.html`;
      const nextLabel = activeIndex < chapter.subs.length - 1 ? 'Subbab berikutnya' : 'Kembali ke BAB';
      feedback.innerHTML = `<strong>Hebat! Benar!</strong><span>${alreadyDone ? '⭐ Tantangan sudah selesai' : '⭐ +1 bintang'}</span><a class="next-button" href="${nextHref}">${nextLabel}</a>`;
      if (!alreadyDone) {
        stars += 1;
        localStorage.setItem('grade1MathStars', String(stars));
        localStorage.setItem(doneKey, 'true');
      }
      updateStars();
      speak('Hebat! Benar!');
    } else {
      button.classList.add('is-try-again');
      feedback.innerHTML = '<strong>Coba lagi.</strong><span>Yuk lihat sekali lagi.</span>';
      speak('Coba lagi.');
      window.setTimeout(() => button.classList.remove('is-try-again'), 450);
    }
  };
  updateStars();
  renderChapter();
})();