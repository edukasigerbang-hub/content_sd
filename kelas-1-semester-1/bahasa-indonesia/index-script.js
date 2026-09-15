(() => {
  const content = window.GRADE1_INDO_CONTENT;
  const map = document.querySelector('#indo-map');
  const doneKey = (chapter, sub) => `grade1IndoDone:${chapter}:${sub}`;
  const completed = content.chapters.reduce((total, chapter) => total + chapter.subs.filter((_, index) => localStorage.getItem(doneKey(chapter.id, index)) === 'true').length, 0);
  const total = content.chapters.reduce((sum, chapter) => sum + chapter.subs.length, 0);
  let stars = Number(localStorage.getItem('grade1IndoStars') || 0);
  if (!Number.isFinite(stars) || stars < 0) stars = 0;
  document.querySelector('#starCount').textContent = stars;
  const first = content.chapters.find((chapter) => chapter.subs.some((_, index) => localStorage.getItem(doneKey(chapter.id, index)) !== 'true')) || content.chapters[0];
  map.innerHTML = `<section class="hero"><div><p class="eyebrow">BAHASA INDONESIA · PETUALANGAN LITERASI</p><h1>Aku Bisa<br>Membaca!</h1><p>Dengarkan, ucapkan, baca, dan tulis bersama teman belajar.</p><a class="cta" href="bab${first.number}.html">▶ ${completed ? 'Lanjutkan belajar' : 'Mulai belajar'}</a></div><div class="hero-art" aria-hidden="true">📖<span>✨</span></div></section><section class="progress"><div><strong>Peta belajar</strong><span>${completed} dari ${total} langkah selesai</span></div><div class="progress-track"><i style="width:${Math.round(completed / total * 100)}%"></i></div></section><section class="chapter-grid" aria-label="Empat materi Bahasa Indonesia">${content.chapters.map((chapter) => { const done = chapter.subs.filter((_, index) => localStorage.getItem(doneKey(chapter.id, index)) === 'true').length; return `<a class="chapter ${chapter.color}" href="bab${chapter.number}.html"><span class="chapter-icon">${chapter.icon}</span><small>MATERI 0${chapter.number}</small><h2>${chapter.title}</h2><p>${chapter.description}</p><b>${done}/${chapter.subs.length} submateri selesai <span>→</span></b></a>`; }).join('')}</section>`;
})();