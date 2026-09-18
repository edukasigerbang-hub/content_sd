(() => {
  const content = window.GRADE1_INDO_CONTENT;
  const map = document.querySelector('#indo-map');
  const doneKey = (chapter, sub) => `grade1IndoDone:${chapter}:${sub}`;
  const stateKey = (chapter, sub) => `grade1IndoState:${chapter}:${sub}`;
  const parseState = (saved) => {
    if (!saved) return {};
    try { return JSON.parse(saved) || {}; } catch { return {}; }
  };
  const isSubComplete = (chapter, index) => {
    const saved = localStorage.getItem(stateKey(chapter.id, index));
    return parseState(saved).completed === true || localStorage.getItem(doneKey(chapter.id, index)) === 'true';
  };
  const isChapterComplete = (chapter) => chapter.subs.every((_, index) => isSubComplete(chapter, index));
  const isUnlocked = () => true;
  const completed = content.chapters.reduce((total, chapter) => total + chapter.subs.filter((_, index) => isSubComplete(chapter, index)).length, 0);
  const total = content.chapters.reduce((sum, chapter) => sum + chapter.subs.length, 0);
  let stars = Number(localStorage.getItem('grade1IndoStars') || 0);
  if (!Number.isFinite(stars) || stars < 0) stars = 0;
  document.querySelector('#starCount').textContent = stars;
  const first = content.chapters.find((chapter, index) => isUnlocked(index) && chapter.subs.some((_, sub) => !isSubComplete(chapter, sub))) || content.chapters[0];
  const chapterHref = (chapter, index) => isUnlocked(index) ? `bab${chapter.number}.html` : '#locked';
  map.innerHTML = `<aside class="side-nav" aria-label="Navigasi Bahasa Indonesia"><a class="side-link active" href="index.html" aria-current="page"><span>⌂</span>Beranda</a><a class="side-link" href="${chapterHref(first, content.chapters.indexOf(first))}"><span>📖</span>Materi</a><a class="side-link" href="${chapterHref(first, content.chapters.indexOf(first))}"><span>🎮</span>Permainan</a><a class="side-link" href="#achievements"><span>★</span>Prestasi</a><a class="side-link" href="#footer-note"><span>⚙</span>Pengaturan</a></aside><div class="dashboard-content"><section class="hero"><div class="hero-copy"><p class="eyebrow">BAHASA INDONESIA · PETUALANGAN LITERASI</p><h1>Aku Bisa<br><em>Membaca!</em></h1><p>Dengarkan, ucapkan, baca, dan tulis bersama teman belajar.</p><a class="cta" href="${chapterHref(first, content.chapters.indexOf(first))}"><span>▶</span> ${completed ? 'Lanjutkan Belajar' : 'Mulai Belajar'}</a></div><div class="hero-scene" aria-label="Ilustrasi anak belajar membaca"><span class="character-frame character-left"><img class="character-art" src="karakter1.png" alt="Anak perempuan dan kucing belajar membaca"></span><span class="character-frame character-right"><img class="character-art" src="karakter2.png" alt="Anak laki-laki belajar Bahasa Indonesia"></span></div></section><section class="learning-section" id="achievements"><div class="chapter-grid" aria-label="Empat materi Bahasa Indonesia">${content.chapters.map((chapter, index) => { const done = chapter.subs.filter((_, sub) => isSubComplete(chapter, sub)).length; const unlocked = isUnlocked(index); return `<a class="chapter ${chapter.color} ${!unlocked ? 'is-locked' : ''}" href="${chapterHref(chapter, index)}" ${!unlocked ? 'aria-disabled="true"' : ''}><span class="chapter-icon">${chapter.icon}</span><small>MATERI 0${chapter.number}</small><h3>${chapter.title}</h3><p>${chapter.description}</p><div class="card-visual" aria-hidden="true">${['👋','🔤','✏️','🌳'][chapter.number - 1]}</div><b>${unlocked ? `${done}/${chapter.subs.length} submateri selesai` : '🔒 Selesaikan materi sebelumnya'} <span aria-hidden="true">→</span></b></a>`; }).join('')}</div></section><section class="progress"><div class="progress-heading"><div><strong>Peta Belajar</strong><span>${completed} dari ${total} submateri selesai</span></div><strong>${Math.round((completed / total) * 100)}%</strong></div><div class="progress-track" aria-label="Progress belajar ${completed} dari ${total}"><i style="width:${(completed / total) * 100}%"></i></div></section></div>`;
  map.querySelectorAll('img.character-art').forEach((image) => {
    const fallback = image.getAttribute('src');
    image.src = fallback.replace('.png', '.webp');
    image.addEventListener('error', () => { image.src = fallback; }, { once: true });
  });
  map.querySelectorAll('[aria-disabled="true"]').forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); }));
  const achievementSummary = document.createElement('div');
  achievementSummary.className = 'achievement-summary';
  achievementSummary.setAttribute('aria-label', 'Ringkasan prestasi');
  achievementSummary.innerHTML = `<strong>Prestasi Belajar</strong><span>${completed} submateri selesai</span><span>⭐ ${stars} bintang</span>`;
  map.querySelector('.learning-section').prepend(achievementSummary);
  map.querySelectorAll('.side-link').forEach((link) => {
    if (/Permainan|Pengaturan/.test(link.textContent)) link.remove();
  });
})();
