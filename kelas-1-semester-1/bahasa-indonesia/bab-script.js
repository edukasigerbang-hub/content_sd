(() => {
  const content = window.GRADE1_INDO_CONTENT;
  const number = Number(document.body.dataset.chapter || 1);
  const chapter = content.chapters[number - 1];
  const app = document.querySelector('#lesson');
  const doneKey = (index) => `grade1IndoDone:${chapter.id}:${index}`;
  const starsKey = 'grade1IndoStars';
  let current = Number(new URLSearchParams(location.search).get('sub') || 1) - 1;
  if (!Number.isInteger(current) || current < 0 || current >= chapter.subs.length) current = 0;
  const render = () => {
    const sub = chapter.subs[current];
    const completed = localStorage.getItem(doneKey(current)) === 'true';
    app.innerHTML = `<section class="lesson-head ${chapter.color}"><a href="index.html" class="back">← Peta belajar</a><div class="lesson-label">MATERI 0${chapter.number} · ${chapter.focus}</div><h1>${chapter.icon} ${chapter.title}</h1><p>${chapter.description}</p><div class="sub-tabs">${chapter.subs.map((item, index) => `<button class="${index === current ? 'active' : ''} ${localStorage.getItem(doneKey(index)) === 'true' ? 'done' : ''}" data-go="${index}">${index + 1}</button>`).join('')}</div></section><article class="lesson-body"><div class="explain"><p class="kicker">LANGKAH ${current + 1}</p><h2>${sub.title}</h2><p>${sub.explain}</p><div class="example"><strong>Contoh</strong><span>${sub.example}</span></div></div><section class="activity"><h3>🎯 Ayo lakukan</h3><p>${sub.activity}</p><div class="game-box"><span>🎮</span><div><strong>Mini-game: ${sub.game}</strong><button id="gameButton">Mulai mini-game</button></div></div></section><section class="practice"><h3>Latihan bertahap</h3><ol>${sub.practice.map((item, index) => `<li><span class="level">${['Mudah','Sedang','Tantangan'][index]}</span>${item}</li>`).join('')}</ol></section><div class="feedback" id="feedback" aria-live="polite"></div><button class="finish ${completed ? 'is-done' : ''}" id="finish">${completed ? '✓ Sudah selesai' : '⭐ Tandai langkah selesai'}</button><nav class="lesson-nav"><button id="prev" ${current === 0 ? 'disabled' : ''}>← Sebelumnya</button><button id="next">${current === chapter.subs.length - 1 ? 'Lihat evaluasi' : 'Berikutnya →'}</button></nav></article>`;
    app.querySelectorAll('[data-go]').forEach((button) => button.addEventListener('click', () => { current = Number(button.dataset.go); render(); }));
    document.querySelector('#lessonTitle').textContent = chapter.title;
    document.querySelector('#prev').addEventListener('click', () => { current -= 1; render(); });
    document.querySelector('#next').addEventListener('click', () => { if (current < chapter.subs.length - 1) { current += 1; render(); } else renderQuiz(); });
    document.querySelector('#gameButton').addEventListener('click', (event) => { event.target.textContent = '✓ Hebat! Coba sampai selesai!'; document.querySelector('#feedback').textContent = '⭐ Kamu menemukan cara belajar yang tepat!'; });
    document.querySelector('#finish').addEventListener('click', () => { if (!completed) { localStorage.setItem(doneKey(current), 'true'); localStorage.setItem(starsKey, String(Number(localStorage.getItem(starsKey) || 0) + 1)); } render(); });
  };
  const renderQuiz = () => {
    app.innerHTML = `<section class="lesson-head ${chapter.color}"><a href="index.html" class="back">← Peta belajar</a><div class="lesson-label">PENUTUP MATERI 0${chapter.number}</div><h1>🎯 Evaluasi ${chapter.title}</h1><p>Jawab dengan tenang. Kamu boleh mencoba lagi.</p></section><article class="quiz-body"><div class="quiz-list">${chapter.quiz.map((question, index) => `<fieldset><legend>${index + 1}. ${question[0]}</legend>${question[1] ? question[1].map((answer, answerIndex) => `<label><input type="radio" name="q${index}" value="${answerIndex}"> ${answer}</label>`).join('') : '<textarea aria-label="Jawaban" placeholder="Tulis atau ceritakan jawabanmu di sini..."></textarea>'}</fieldset>`).join('')}</div><button class="finish" id="checkQuiz">Periksa jawaban</button><div class="feedback" id="feedback" aria-live="polite"></div><a class="return-map" href="index.html">Kembali ke peta belajar</a></article>`;
    document.querySelector('#checkQuiz').addEventListener('click', () => { let score = 0; chapter.quiz.forEach((question, index) => { const selected = document.querySelector(`input[name="q${index}"]:checked`); if (selected && Number(selected.value) === question[2]) score += 1; }); document.querySelector('#feedback').textContent = `⭐ Kamu mendapat ${score} dari ${chapter.quiz.length} jawaban pilihan. Hebat, terus berlatih!`; });
  };
  render();
})();