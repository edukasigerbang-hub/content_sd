(() => {
  const content = window.GRADE1_INDO_CONTENT;
  const number = Number(document.body.dataset.chapter || 1);
  const chapter = content.chapters[number - 1];
  const app = document.querySelector('#lesson');
  const doneKey = (index) => `grade1IndoDone:${chapter.id}:${index}`;
  const starsKey = 'grade1IndoStars';
  const iconSet = ['👋', '👂', '👉', '💬'];
  const shortDesc = [
    'Kenali namamu dan namanya.',
    'Dengar, pahami, lalu jawab.',
    'Ikuti langkah demi langkah.',
    'Bicara dengan kata yang baik.'
  ];
  let current = Number(new URLSearchParams(location.search).get('sub') || 1) - 1;
  if (!Number.isInteger(current) || current < 0 || current >= chapter.subs.length) current = 0;

  const getStars = () => Number(localStorage.getItem(starsKey) || 0);

  const syncRoute = (includeStep = true) => {
    const url = new URL(window.location.href);
    if (!includeStep) {
      url.searchParams.delete('sub');
    } else {
      url.searchParams.set('sub', String(current + 1));
    }
    history.replaceState({}, '', `${url.pathname}${url.search}`);
  };

  const renderOverview = () => {
    const completedCount = chapter.subs.filter((_, index) => localStorage.getItem(doneKey(index)) === 'true').length;
    const chapterWords = chapter.title.split(' ');
    const accentWord = chapterWords[chapterWords.length - 1];
    const prefixText = chapterWords.length > 1 ? chapterWords.slice(0, -1).join(' ') : '';

    app.innerHTML = `
      <div class="bi-bab1-shell">
        <div class="bi-bab1-scene">
          <header class="bi-bab1-topbar">
            <div class="bi-bab1-brand">
              <span class="bi-bab1-brand-mark">📚</span>
              <span>GERBANG EDUKASI</span>
            </div>

            <div class="bi-bab1-subject">
              <span class="bi-bab1-subject-mark">📖</span>
              <div class="bi-bab1-subject-text">
                <strong>BAHASA INDONESIA</strong>
                <small>KELAS 1 · SEMESTER 1</small>
              </div>
            </div>

            <div class="bi-bab1-tools">
              <div class="bi-bab1-star-pill" aria-label="Jumlah bintang">⭐ <span>${getStars()}</span></div>
              <div class="bi-bab1-avatar" aria-hidden="true">👧</div>
              <div class="bi-bab1-greeting">Halo, Teman!</div>
            </div>
          </header>

          <main class="bi-bab1-main">
            <img class="bi-bab1-character" src="karakter1.png" alt="Karakter perempuan" />

            <button type="button" class="bi-bab1-back" id="backToMap">← Kembali</button>

            <section class="bi-bab1-hero">
              <div class="bi-bab1-char-area" aria-hidden="true">
                <div class="bi-bab1-speech">Halo,<br>Teman!<br>Siap belajar<br>hari ini?</div>
              </div>

              <div class="bi-bab1-board-wrap">
                <div class="bi-bab1-board">
                  <div class="bi-bab1-board-label">BAB ${chapter.number}</div>
                  <div class="bi-bab1-title-board">
                    <h1>${prefixText ? `${prefixText} ` : ''}<span class="accent">${accentWord}</span></h1>
                  </div>
                  <div class="bi-bab1-subtitle">${chapter.description}</div>

                  <div class="bi-bab1-progress-box">
                    ${chapter.subs.map((_, index) => {
                      const done = localStorage.getItem(doneKey(index)) === 'true';
                      const stateClass = done ? 'is-done' : index === current ? 'is-current' : '';
                      const stepText = index + 1;
                      return `
                        <span class="bi-bab1-step-pill ${stateClass}">${stepText}</span>
                        ${index < chapter.subs.length - 1 ? '<span class="bi-bab1-progress-even"></span>' : ''}
                      `;
                    }).join('')}
                    <span class="bi-bab1-progress-num"><span>${completedCount}</span><small>/ ${chapter.subs.length}</small></span>
                  </div>

                  <button type="button" class="bi-bab1-start" id="startBab1">▶ Mulai Belajar →</button>
                </div>
              </div>

              <div class="bi-bab1-side-note" aria-hidden="true">
                <div class="bi-bab1-note">Setiap<br>Aku Istimewa</div>
              </div>
            </section>
          </main>

          <div class="bi-bab1-journey-wrap">
            <div class="bi-bab1-journey-banner">
              <span>Perjalanan Belajarmu</span>
            </div>

            <section class="bi-bab1-journey">
              ${chapter.subs.map((item, index) => {
                const done = localStorage.getItem(doneKey(index)) === 'true';
                const active = index === current;
                const tagText = done ? '✓ Selesai' : active ? 'Mulai' : 'Belum';
                const tagClass = done ? 'is-done' : active ? 'is-start' : '';
                return `
                  <button type="button" class="bi-bab1-card ${done ? 'is-done' : ''} ${active ? 'is-active' : ''} ${index > 0 && !done && !active ? 'is-locked' : ''}" data-go="${index}">
                    <span class="bi-bab1-card-no">${String(index + 1).padStart(2, '0')}</span>
                    <span class="bi-bab1-card-icon">${iconSet[index]}</span>
                    <h3>${item.title}</h3>
                    <p>${shortDesc[index]}</p>
                    <div class="bi-bab1-card-row">
                      <span class="bi-bab1-card-tag ${tagClass}">${tagText}</span>
                      <span class="bi-bab1-card-arrow">→</span>
                    </div>
                  </button>
                `;
              }).join('')}
            </section>
          </div>

          <div class="bi-bab1-footer">“Pelan-pelan membaca, berani bercerita, jadi diri sendiri yang hebat!”</div>
        </div>
      </div>
    `;

    current = 0;
    syncRoute(false);
    document.querySelector('#lessonTitle').textContent = chapter.title;
    app.querySelector('#backToMap').addEventListener('click', () => { window.location.href = 'index.html'; });
    app.querySelector('#startBab1').addEventListener('click', () => renderStep(0));
    app.querySelectorAll('[data-go]').forEach((button) => {
      button.addEventListener('click', () => renderStep(Number(button.dataset.go)));
    });
  };

  const renderStep = (stepIndex = current) => {
    current = stepIndex;
    syncRoute(true);
    const sub = chapter.subs[current];
    const completed = localStorage.getItem(doneKey(current)) === 'true';
    app.innerHTML = `
      <div class="bi-bab1-shell">
        <div class="bi-bab1-scene">
          <header class="bi-bab1-topbar">
            <button type="button" class="bi-bab1-back" id="backOverview" aria-label="Kembali ke halaman utama">← Kembali</button>
            <div class="bi-bab1-title">${chapter.title}</div>
            <div class="bi-bab1-stars" aria-label="Jumlah bintang">⭐ ${getStars()}</div>
          </header>

          <main class="bi-bab1-main">
            <section class="bi-bab1-lesson-flow">
              <div class="bi-bab1-character-wrap" aria-hidden="true">
                <img class="bi-bab1-character" src="karakter1.png" alt="Karakter perempuan" />
                <span class="bi-bab1-bubble bi-bab1-bubble--one">⭐</span>
                <span class="bi-bab1-bubble bi-bab1-bubble--two">🎉</span>
              </div>

              <div class="bi-bab1-board">
                <div class="bi-bab1-label">Langkah ${current + 1}</div>
                <h2>${sub.title}</h2>
                <p>${sub.explain}</p>

                <div class="bi-bab1-example">
                  <strong>Contoh</strong>
                  <span>${sub.example}</span>
                </div>

                <div class="bi-bab1-board-actions">
                  <button type="button" class="bi-bab1-primary" id="finish">${completed ? '✓ Sudah selesai' : 'MULAI ▶'}</button>
                  <button type="button" class="bi-bab1-secondary" id="overviewButton">Lihat jalur</button>
                </div>
              </div>
            </section>

            <div class="bi-bab1-panel-grid">
              <article class="bi-bab1-panel">
                <h3>🎯 Ayo lakukan</h3>
                <p>${sub.activity}</p>
                <div class="bi-bab1-game-box">
                  <span>🎮</span>
                  <div>
                    <strong>${sub.game}</strong>
                    <button type="button" id="gameButton">Mulai mini-game</button>
                  </div>
                </div>
              </article>

              <article class="bi-bab1-panel">
                <h3>Latihan</h3>
                <ol class="bi-bab1-practice">${sub.practice.map((item, index) => `<li><span class="bi-bab1-status-tag">${['Mudah', 'Sedang', 'Tantangan'][index % 3]}</span> ${item}</li>`).join('')}</ol>
              </article>
            </div>

            <div class="bi-bab1-step-nav">
              <button type="button" class="bi-bab1-nav" id="prev" ${current === 0 ? 'disabled' : ''}>← Sebelumnya</button>
              <button type="button" class="bi-bab1-nav" id="next">${current === chapter.subs.length - 1 ? 'Lihat evaluasi' : 'Berikutnya →'}</button>
            </div>
          </main>

          <div class="bi-bab1-footer">“Pelan-pelan membaca, berani bercerita, jadi diri sendiri yang hebat!”</div>
        </div>
      </div>
    `;

    document.querySelector('#lessonTitle').textContent = `${chapter.title} · ${sub.title}`;
    app.querySelector('#backOverview').addEventListener('click', renderOverview);
    app.querySelector('#overviewButton').addEventListener('click', renderOverview);
    app.querySelector('#gameButton').addEventListener('click', (event) => {
      event.target.textContent = '✓ Hebat!';
      const feedback = document.createElement('div');
      feedback.className = 'bi-bab1-status-tag';
      feedback.textContent = 'Sudah siap!';
      event.target.parentNode.appendChild(feedback);
    });
    app.querySelector('#finish').addEventListener('click', () => {
      if (!completed) {
        localStorage.setItem(doneKey(current), 'true');
        localStorage.setItem(starsKey, String(getStars() + 1));
      }
      renderOverview();
    });
    app.querySelector('#prev').addEventListener('click', () => {
      if (current > 0) renderStep(current - 1);
    });
    app.querySelector('#next').addEventListener('click', () => {
      if (current < chapter.subs.length - 1) {
        renderStep(current + 1);
      } else {
        renderOverview();
      }
    });
  };

  if (new URLSearchParams(location.search).get('sub')) {
    renderStep(current);
  } else {
    renderOverview();
  }
})();