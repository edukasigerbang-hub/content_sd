(() => {
  const content = window.GRADE1_MATH_CONTENT;
  const map = document.querySelector('#math-map');
  const stars = Number(localStorage.getItem('grade1MathStars') || 0);
  document.querySelector('#starCount').textContent = Number.isFinite(stars) ? stars : 0;

  map.innerHTML = `<section class="grade1-math-heading"><div class="grade1-math-kicker">RUANG BERMAIN ANGKA</div><h1>Matematika Kelas 1</h1><p>Ayo bermain matematika bersama Kiko!</p></section><div class="grade1-math-mascot"><div class="grade1-math-bunny" aria-label="Kiko si kelinci">🐰</div><div class="grade1-math-speech">Pilih satu BAB. Kita belajar dengan melihat, mencoba, lalu bermain!</div></div><section class="grade1-math-chapters" aria-label="Daftar bab Matematika">${content.chapters.map((chapter) => { const done = chapter.subs.filter((_, index) => localStorage.getItem(`grade1MathDone:${chapter.id}:${index}`)).length; return `<a class="grade1-math-chapter chapter-${chapter.color}" href="bab${chapter.number}.html"><span class="chapter-icon">${chapter.icon}</span><span><b>BAB ${chapter.number}</b><strong>${chapter.title}</strong><small>${chapter.subs.length} subbab · ⭐ ${done}/${chapter.subs.length}</small></span><span class="chapter-arrow">→</span></a>`; }).join('')}</section>`;
})();