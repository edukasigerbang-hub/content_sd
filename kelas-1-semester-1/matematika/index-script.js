(() => {
  const content = window.GRADE1_MATH_CONTENT;
  const map = document.querySelector('#math-map');
  let stars = Number(localStorage.getItem('grade1MathStars') || 0);
  if (!Number.isFinite(stars) || stars < 0) stars = 0;
  localStorage.setItem('grade1MathStars', String(stars));
  document.querySelector('#starCount').textContent = stars;

  map.innerHTML = `<section class="grade1-math-heading"><div class="grade1-math-kicker">MATEMATIKA · KELAS 1 · SEMESTER 1</div><h1>Ruang Bermain Angka</h1><p>Ayo bermain matematika bersama Kiko!</p></section><div class="grade1-math-mascot"><div class="grade1-math-bunny" aria-label="Kiko si kelinci">🐰</div><div class="grade1-math-speech">Pilih satu BAB. Kita belajar dengan melihat, mencoba, lalu bermain!</div></div><section class="grade1-math-chapters" aria-label="Daftar bab Matematika">${content.chapters.map((chapter) => { const done = chapter.subs.filter((_, index) => localStorage.getItem(`grade1MathDone:${chapter.id}:${index}`) === 'true').length; return `<a class="grade1-math-chapter chapter-${chapter.color}" href="bab${chapter.number}.html"><span class="chapter-icon">${chapter.icon}</span><span><b>BAB ${chapter.number}</b><strong>${chapter.title}</strong><small>${chapter.subs.length} subbab · ⭐ ${done}/${chapter.subs.length}</small></span><span class="chapter-arrow">→</span></a>`; }).join('')}</section>`;
})();