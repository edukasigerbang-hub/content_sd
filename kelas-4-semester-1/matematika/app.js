(() => {
  const content = window.MATH_LAB;
  const screen = document.querySelector('#screen');
  const key = content.storageKey;
    const soundKey = `${key}:sound`;
    let soundOn = localStorage.getItem(soundKey) !== 'false';
    let activeLab = null;
    let activeMission = null;
    let attempts = 0;

    const done = (labId, missionId) => localStorage.getItem(`${key}:done:${labId}:${missionId}`) === 'true';
    const allMissions = () => content.labs.flatMap((lab) => lab.missions.map((mission) => ({ lab, mission })));
    const completed = () => allMissions().filter(({ lab, mission }) => done(lab.id, mission.id)).length;
    const percent = () => Math.round((completed() / allMissions().length) * 100);
    const labPercent = (lab) => Math.round((lab.missions.filter((mission) => done(lab.id, mission.id)).length / lab.missions.length) * 100);
    const nextMission = () => allMissions().find(({ lab, mission }) => !done(lab.id, mission.id));
    const speak = (text) => {
      if (soundOn && 'speechSynthesis' in window) {
        speechSynthesis.cancel();
        const voice = new SpeechSynthesisUtterance(text);
        voice.lang = 'id-ID';
        voice.rate = .9;
        speechSynthesis.speak(voice);
      }
    };
    const updateHeader = () => {
      document.querySelector('#masteryTotal').textContent = `${percent()}% penguasaan`;
      const button = document.querySelector('#soundToggle');
      button.textContent = soundOn ? '🔊' : '🔇';
      button.setAttribute('aria-pressed', String(soundOn));
    };
    const progressBar = (value) => `<div class="bar" role="progressbar" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"><span style="width:${value}%"></span></div>`;
    const badgeFor = (lab) => {
      const value = lab.missions.filter((mission) => done(lab.id, mission.id)).length;
      return value === lab.missions.length ? '<span class="badge">✓ MISI SELESAI</span>' : `<span class="badge muted">${value}/${lab.missions.length} misi</span>`;
    };
    const achievementList = () => content.labs.filter((lab) => lab.missions.every((mission) => done(lab.id, mission.id))).map((lab) => `<span class="achievement">${lab.badge}</span>`).join('') || '<span class="muted-copy">Selesaikan satu lab untuk membuka pencapaian.</span>';
    const renderDashboard = () => {
      activeLab = null;
      activeMission = null;
      updateHeader();
      const next = nextMission();
      const cards = content.labs.map((lab) => `<button class="lab-card ${lab.color}" data-lab="${lab.id}"><span class="lab-code">LAB ${lab.code}</span><span class="lab-icon">${lab.icon}</span><strong>${lab.name}</strong><small>${lab.question}</small>${progressBar(labPercent(lab))}<span class="lab-progress">${labPercent(lab)}% penguasaan</span>${badgeFor(lab)}</button>`).join('');
      const continueButton = next ? `<button class="continue-mission" id="continueMission"><span>▶</span><span><b>LANJUTKAN MISI</b><small>${next.mission.title} · ${next.lab.name}</small></span></button>` : '<div class="complete-banner"><b>SEMESTER SELESAI</b><span>Semua misi sudah dikuasai. Pilih lab untuk berlatih lagi.</span></div>';
      screen.innerHTML = `<section class="dashboard"><div class="dashboard-intro"><p class="eyebrow">LABORATORIUM DIGITAL · FASE B</p><h1>Math Lab</h1><p>Amati, jelajahi, uji strategi, dan jelaskan penemuan matematikamu.</p><div class="mastery-card"><span>PENGUASAAN MATEMATIKA</span><strong>${percent()}%</strong>${progressBar(percent())}<small>${completed()} dari ${allMissions().length} misi selesai</small></div>${continueButton}<div class="achievement-panel"><span class="section-label">PENCAPAIAN</span><div class="achievements">${achievementList()}</div></div></div><div><div class="lab-grid">${cards}</div></div></section>`;
      document.querySelectorAll('.lab-card').forEach((button) => button.addEventListener('click', () => renderLab(button.dataset.lab)));
      document.querySelector('#continueMission')?.addEventListener('click', () => renderMission(next.mission.id, next.lab.id));
    };
    const renderLab = (labId) => {
      activeLab = content.labs.find((lab) => lab.id === labId);
      screen.innerHTML = `<section class="lab-view"><button class="back-button" id="back">← Beranda</button><div class="lab-heading"><p class="eyebrow">LAB ${activeLab.code} · ${activeLab.name}</p><h1>${activeLab.question}</h1><p>Amati → Jelajahi → Temukan → Pecahkan → Jelaskan</p><div class="lab-summary">${progressBar(labPercent(activeLab))}<span>${labPercent(activeLab)}% penguasaan · ${activeLab.badge}</span></div></div><div class="mission-list">${activeLab.missions.map((mission, index) => `<button class="mission-row" data-mission="${mission.id}"><span class="mission-index">0${index + 1}</span><span><b>${mission.title}</b><small>${mission.phase}</small><em>${mission.objective}</em></span><span class="mission-state">${done(activeLab.id, mission.id) ? '✓ SELESAI' : 'MULAI →'}</span></button>`).join('')}</div><div class="challenge-strip"><span class="section-label">TANTANGAN LAB</span><b>${activeLab.challenge.title}</b><span>${activeLab.challenge.prompt}</span></div></section>`;
      document.querySelector('#back').addEventListener('click', renderDashboard);
      document.querySelectorAll('.mission-row').forEach((button) => button.addEventListener('click', () => renderMission(button.dataset.mission, activeLab.id)));
    };
    const renderMission = (missionId, labId = activeLab.id) => {
      activeLab = content.labs.find((lab) => lab.id === labId);
      activeMission = activeLab.missions.find((mission) => mission.id === missionId);
      attempts = 0;
      const choices = activeMission.choices || [];
      let interaction;
      if (activeMission.type === 'input') interaction = '<form id="answerForm" class="input-form"><input id="answer" aria-label="Jawaban" autocomplete="off" inputmode="text"><button type="submit">PERIKSA</button></form>';
      else if (activeMission.type === 'sequence') interaction = `<div class="sequence"><div class="sequence-choices">${choices.map((choice) => `<button type="button" class="sequence-choice" data-value="${choice}">${choice}</button>`).join('')}</div><p id="sequencePicked">Urutan: —</p><button id="sequenceCheck" class="action-button" type="button">PERIKSA URUTAN</button></div>`;
      else interaction = `<div class="choice-grid">${choices.map((choice) => `<button type="button" class="choice" data-value="${choice}">${choice}</button>`).join('')}</div>`;
      screen.innerHTML = `<section class="mission-view"><button class="back-button" id="back">← ${activeLab.name}</button><div class="mission-top"><span class="eyebrow">${activeMission.phase}</span><span class="mission-step">MISI ${activeLab.missions.indexOf(activeMission) + 1} / ${activeLab.missions.length}</span></div><div class="mission-panel"><div class="mission-visual ${activeLab.color}">${activeMission.visual}</div><div class="objective"><span class="section-label">TUJUAN BELAJAR</span><p>${activeMission.objective}</p></div><h1>${activeMission.prompt}</h1><button class="listen" id="listen">🔊 Dengarkan instruksi</button>${interaction}<button class="hint" id="hint">💡 Petunjuk</button><p class="hint-text" id="hintText"></p><div class="result" id="result" role="status"></div></div></section>`;
      document.querySelector('#back').addEventListener('click', () => renderLab(activeLab.id));
      document.querySelector('#listen').addEventListener('click', () => speak(`${activeMission.objective}. ${activeMission.prompt}`));
      document.querySelector('#hint').addEventListener('click', () => { attempts += 1; document.querySelector('#hintText').textContent = activeMission.hint || 'Amati representasi dan cari hubungan antar informasi.'; speak(document.querySelector('#hintText').textContent); });
      if (activeMission.type === 'input') document.querySelector('#answerForm').addEventListener('submit', (event) => { event.preventDefault(); checkAnswer(event.currentTarget.elements.answer.value); });
      if (activeMission.type === 'sequence') {
        const selected = [];
        document.querySelectorAll('.sequence-choice').forEach((button) => button.addEventListener('click', () => { selected.push(button.dataset.value); button.disabled = true; document.querySelector('#sequencePicked').textContent = `Urutan: ${selected.join(' → ')}`; }));
        document.querySelector('#sequenceCheck').addEventListener('click', () => checkAnswer(selected));
      } else document.querySelectorAll('.choice').forEach((button) => button.addEventListener('click', () => checkAnswer(button.dataset.value)));
    };
    const checkAnswer = (value) => {
      const result = document.querySelector('#result');
      const expected = Array.isArray(activeMission.answer) ? activeMission.answer.join('|') : String(activeMission.answer);
      const actual = Array.isArray(value) ? value.join('|') : String(value).trim();
      if (actual === expected) {
        localStorage.setItem(`${key}:done:${activeLab.id}:${activeMission.id}`, 'true');
        result.innerHTML = `<strong>Hebat, benar!</strong><span>${activeMission.explain}</span><button class="action-button" id="continue">BERIKUTNYA</button>`;
        speak(activeMission.explain);
        document.querySelector('#continue').addEventListener('click', () => renderLab(activeLab.id));
      } else {
        result.innerHTML = `<strong class="wrong">Belum tepat.</strong><span>Uji kembali idemu. ${attempts ? activeMission.hint || '' : ''}</span>`;
        speak('Belum tepat. Uji kembali idemu.');
      }
    };
    document.querySelector('#soundToggle').addEventListener('click', () => { soundOn = !soundOn; localStorage.setItem(soundKey, String(soundOn)); updateHeader(); });
    renderDashboard();
})();
/*
  let soundOn = localStorage.getItem(soundKey) !== 'false';
  let activeLab = null;
  let activeMission = null;
  let attempts = 0;
  const done = (labId, missionId) => localStorage.getItem(`${key}:done:${labId}:${missionId}`) === 'true';
  const allMissions = () => content.labs.flatMap((lab) => lab.missions.map((mission) => ({ lab, mission })));
  const completed = () => allMissions().filter(({ lab, mission }) => done(lab.id, mission.id)).length;
  const percent = () => Math.round((completed() / allMissions().length) * 100);
  const speak = (text) => { if (soundOn && 'speechSynthesis' in window) { speechSynthesis.cancel(); const voice = new SpeechSynthesisUtterance(text); voice.lang = 'id-ID'; voice.rate = .9; speechSynthesis.speak(voice); } };
  const updateHeader = () => { document.querySelector('#masteryTotal').textContent = `${percent()}% mastery`; const button = document.querySelector('#soundToggle'); button.textContent = soundOn ? '🔊' : '🔇'; button.setAttribute('aria-pressed', String(soundOn)); };
  const progressBar = (value) => `<div class="bar"><span style="width:${value}%"></span></div>`;
  const badgeFor = (lab) => { const value = lab.missions.filter((mission) => done(lab.id, mission.id)).length; return value === lab.missions.length ? `<span class="badge">✓ MASTERED</span>` : `<span class="badge muted">${value}/${lab.missions.length} missions</span>`; };
  const renderDashboard = () => { activeLab = null; activeMission = null; updateHeader(); const cards = content.labs.map((lab) => { const value = Math.round((lab.missions.filter((mission) => done(lab.id, mission.id)).length / lab.missions.length) * 100); return `<button class="lab-card ${lab.color}" data-lab="${lab.id}"><span class="lab-code">LAB ${lab.code}</span><span class="lab-icon">${lab.icon}</span><strong>${lab.name}</strong><small>${lab.question}</small>${progressBar(value)}${badgeFor(lab)}</button>`; }).join(''); screen.innerHTML = `<section class="dashboard"><div class="dashboard-intro"><p class="eyebrow">DIGITAL LABORATORY · FASE B</p><h1>Math Lab</h1><p>Eksplorasi ide, uji strategi, dan jelaskan penemuanmu.</p><div class="mastery-card"><span>SEMESTER MASTERY</span><strong>${percent()}%</strong>${progressBar(percent())}<small>${completed()} dari ${allMissions().length} mission selesai</small></div></div><div class="lab-grid">${cards}</div></section>`; document.querySelectorAll('.lab-card').forEach((button) => button.addEventListener('click', () => renderLab(button.dataset.lab))); };
  const renderLab = (labId) => { activeLab = content.labs.find((lab) => lab.id === labId); screen.innerHTML = `<section class="lab-view"><button class="back-button" id="back">← Dashboard</button><div class="lab-heading"><p class="eyebrow">LAB ${activeLab.code} · ${activeLab.name}</p><h1>${activeLab.question}</h1><p>Observe → Explore → Discover → Solve → Explain</p></div><div class="mission-list">${activeLab.missions.map((mission, index) => `<button class="mission-row" data-mission="${mission.id}"><span class="mission-index">0${index + 1}</span><span><b>${mission.title}</b><small>${mission.phase}</small></span><span class="mission-state">${done(activeLab.id, mission.id) ? '✓ DONE' : 'OPEN →'}</span></button>`).join('')}</div></section>`; document.querySelector('#back').addEventListener('click', renderDashboard); document.querySelectorAll('.mission-row').forEach((button) => button.addEventListener('click', () => renderMission(button.dataset.mission))); };
  const renderMission = (missionId) => { activeMission = activeLab.missions.find((mission) => mission.id === missionId); attempts = 0; const choices = activeMission.choices || []; let interaction = activeMission.type === 'input' ? `<form id="answerForm" class="input-form"><input id="answer" aria-label="Jawaban" autocomplete="off" inputmode="text"><button type="submit">CHECK</button></form>` : activeMission.type === 'sequence' ? `<div class="sequence">${choices.map((choice) => `<button type="button" class="sequence-choice" data-value="${choice}">${choice}</button>`).join('')}<p id="sequencePicked">Urutan: —</p><button id="sequenceCheck" class="action-button" type="button">CHECK ORDER</button></div>` : `<div class="choice-grid">${choices.map((choice) => `<button type="button" class="choice" data-value="${choice}">${choice}</button>`).join('')}</div>`; screen.innerHTML = `<section class="mission-view"><button class="back-button" id="back">← ${activeLab.name}</button><div class="mission-top"><span class="eyebrow">${activeMission.phase}</span><span class="mission-step">MISSION ${activeLab.missions.indexOf(activeMission) + 1} / ${activeLab.missions.length}</span></div><div class="mission-panel"><div class="mission-visual ${activeLab.color}">${activeMission.visual}</div><h1>${activeMission.prompt}</h1><button class="listen" id="listen">🔊 Dengarkan</button>${interaction}<button class="hint" id="hint">💡 Hint</button><p class="hint-text" id="hintText"></p><div class="result" id="result" role="status"></div></div></section>`; document.querySelector('#back').addEventListener('click', () => renderLab(activeLab.id)); document.querySelector('#listen').addEventListener('click', () => speak(activeMission.prompt)); document.querySelector('#hint').addEventListener('click', () => { attempts += 1; document.querySelector('#hintText').textContent = activeMission.hint || 'Amati representasi dan cari hubungan antar informasi.'; speak(document.querySelector('#hintText').textContent); }); if (activeMission.type === 'input') document.querySelector('#answerForm').addEventListener('submit', (event) => { event.preventDefault(); checkAnswer(event.currentTarget.elements.answer.value); }); if (activeMission.type === 'sequence') { const selected = []; document.querySelectorAll('.sequence-choice').forEach((button) => button.addEventListener('click', () => { selected.push(button.dataset.value); button.disabled = true; document.querySelector('#sequencePicked').textContent = `Urutan: ${selected.join(' → ')}`; })); document.querySelector('#sequenceCheck').addEventListener('click', () => checkAnswer(selected)); } else document.querySelectorAll('.choice').forEach((button) => button.addEventListener('click', () => checkAnswer(button.dataset.value))); };
  const checkAnswer = (value) => { const result = document.querySelector('#result'); const expected = Array.isArray(activeMission.answer) ? activeMission.answer.join('|') : String(activeMission.answer); const actual = Array.isArray(value) ? value.join('|') : String(value).trim(); if (actual === expected) { localStorage.setItem(`${key}:done:${activeLab.id}:${activeMission.id}`, 'true'); result.innerHTML = `<strong>Discovery confirmed.</strong><span>${activeMission.explain}</span><button class="action-button" id="continue">CONTINUE</button>`; speak(activeMission.explain); document.querySelector('#continue').addEventListener('click', () => renderLab(activeLab.id)); } else { result.innerHTML = `<strong>Belum tepat.</strong><span>Uji kembali idemu. ${attempts ? activeMission.hint || '' : ''}</span>`; speak('Belum tepat. Uji kembali idemu.'); } };
  document.querySelector('#soundToggle').addEventListener('click', () => { soundOn = !soundOn; localStorage.setItem(soundKey, String(soundOn)); updateHeader(); });
  renderDashboard();
})();
*/
