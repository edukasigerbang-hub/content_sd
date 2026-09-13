(() => {
  const chapter = Number(location.pathname.match(/bab(\d+)/)?.[1]) || 1;
  const data = window.EXPERIMENT_CONTENT[chapter];
  const semester = location.pathname.includes("semester-2") ? "semester2" : "semester1";
  const progressKey = `ipas_kelas5_${semester}_progress`;
  const sound = window.IPASSoundManager || { play() {} };
  const screens = [...document.querySelectorAll(".screen")];
  const $ = (id) => document.getElementById(id);
  const saved = JSON.parse(localStorage.getItem(progressKey) || "{}");
  const state = saved[`bab${chapter}`] || { steps: [], stars: 0, completed: false };
  let current = 0;
  let experimentStep = 0;
  let quizIndex = 0;
  let quizLocked = false;

  function save() {
    const all = JSON.parse(localStorage.getItem(progressKey) || "{}");
    all[`bab${chapter}`] = state;
    localStorage.setItem(progressKey, JSON.stringify(all));
  }
  function update() {
    $("starCount").textContent = state.stars;
    $("rewardStars").textContent = "★".repeat(state.stars) + "☆".repeat(5 - state.stars);
  }
  function reward(step) {
    if (!state.steps.includes(step)) {
      state.steps.push(step);
      state.stars = Math.min(5, state.stars + 1);
      sound.play("star-earned");
      save();
    }
    update();
  }
  function feedback(id, text, type) {
    $(id).textContent = text;
    $(id).className = `feedback ${type || ""}`;
  }
  function render() {
    screens.forEach((item, index) => item.classList.toggle("active", index === current));
    document.querySelectorAll(".progress-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === current);
      dot.style.width = index === current ? "28px" : "18px";
      dot.style.background = index === current ? "#2d8fe8" : "#c9dce6";
    });
    $("screenCount").textContent = `Screen ${current + 1} dari ${screens.length}`;
    $("previousButton").disabled = current === 0;
    $("nextButton").disabled = current === screens.length - 1;
    update();
  }
  function renderQuiz() {
    const question = data.quiz[quizIndex];
    $("quizNumber").textContent = `Analisis ${quizIndex + 1} dari ${data.quiz.length}`;
    $("quizQuestion").textContent = question[0];
    $("quizOptions").innerHTML = question[1].map((option, index) => `<button class="mission-option" data-quiz="${index}">${option}</button>`).join("");
    $("quizNext").disabled = true;
    $("quizFeedback").textContent = "";
    quizLocked = false;
    document.querySelectorAll("[data-quiz]").forEach((button) => {
      button.onclick = () => {
        if (quizLocked) return;
        const correct = Number(button.dataset.quiz) === question[2];
        button.classList.add(correct ? "selected" : "wrong");
        feedback("quizFeedback", correct ? "Benar! Data dan konsep mendukung jawabanmu." : "Belum tepat. Gunakan petunjuk dan data lagi.", correct ? "good" : "try");
        sound.play(correct ? "correct" : "wrong");
        if (correct) {
          quizLocked = true;
          document.querySelectorAll("[data-quiz]").forEach((option) => { option.disabled = true; });
          $("quizNext").disabled = false;
          if (quizIndex === data.quiz.length - 1) reward("quiz");
        }
      };
    });
  }
  function fill() {
    $("missionTitle").textContent = `🔬 BAB ${chapter} · EXPERIMENT & ANALYSIS`;
    $("missionName").textContent = data.title;
    $("missionIcon").textContent = data.icon;
    $("problem").textContent = data.problem;
    $("question").textContent = data.question;
    $("objective").textContent = data.objective;
    $("hypothesis").textContent = data.hypothesis.q;
    $("variable").textContent = data.variable;
    $("discovery").textContent = data.discovery;
    $("application").textContent = data.application;
    $("challenge").textContent = data.challenge;
    $("reflection").textContent = data.reflection;
    $("conclusion").innerHTML = data.conclusion.map((item) => `<li>✓ ${item}</li>`).join("");
    $("clues").innerHTML = data.clues.map((item) => `<button class="evidence-card" data-clue="${item[0]}"><strong>${item[0]}</strong><small>Periksa data</small></button>`).join("");
    document.querySelectorAll("[data-clue]").forEach((button) => {
      button.onclick = () => {
        button.classList.add("selected");
        $("clueText").textContent = data.clues.find((item) => item[0] === button.dataset.clue)[1];
        sound.play("object-click");
        if (document.querySelectorAll("[data-clue].selected").length >= 2) reward("clues");
      };
    });
    $("hypothesisOptions").innerHTML = data.hypothesis.options.map((item, index) => `<button class="mission-option" data-hypothesis="${index}">${item}</button>`).join("");
    document.querySelectorAll("[data-hypothesis]").forEach((button) => {
      button.onclick = () => {
        const correct = Number(button.dataset.hypothesis) === data.hypothesis.answer;
        button.classList.add(correct ? "selected" : "wrong");
        if (correct) {
          document.querySelectorAll("[data-experiment]").forEach((item) => { item.disabled = false; });
          reward("hypothesis");
          feedback("hypothesisFeedback", "Hipotesismu dicatat. Sekarang uji dengan data.", "good");
        } else feedback("hypothesisFeedback", "Belum tepat. Kembali ke masalah dan cari petunjuk.", "try");
        sound.play(correct ? "correct" : "wrong");
      };
    });
    $("experimentTitle").textContent = data.experiment.title;
    $("experimentItems").innerHTML = data.experiment.items.map((item, index) => `<button class="mission-option" data-experiment="${index}" disabled>${index + 1}. ${item}</button>`).join("");
    document.querySelectorAll("[data-experiment]").forEach((button) => {
      button.onclick = () => {
        const index = Number(button.dataset.experiment);
        if (index !== experimentStep) return;
        button.disabled = true;
        button.classList.add("selected");
        experimentStep++;
        sound.play("select");
        if (experimentStep === data.experiment.items.length) {
          $("dataText").textContent = data.data;
          reward("experiment");
          feedback("experimentFeedback", "Data berhasil dicatat. Bandingkan hasilnya.", "good");
        }
      };
    });
    $("comparison").textContent = data.comparison;
    $("analysisQuestion").textContent = data.analysis.q;
    $("analysisOptions").innerHTML = data.analysis.options.map((item, index) => `<button class="mission-option" data-analysis="${index}">${item}</button>`).join("");
    document.querySelectorAll("[data-analysis]").forEach((button) => {
      button.onclick = () => {
        const correct = Number(button.dataset.analysis) === data.analysis.answer;
        button.classList.add(correct ? "selected" : "wrong");
        feedback("analysisFeedback", correct ? "Benar! Data mendukung analisis ini." : "Belum tepat. Bandingkan kembali data dan pola.", correct ? "good" : "try");
        if (correct) reward("analysis");
        sound.play(correct ? "correct" : "wrong");
      };
    });
    renderQuiz();
  }
  fill();
  document.querySelectorAll("[data-go]").forEach((button) => {
    button.onclick = () => { current = Number(button.dataset.go); sound.play("next"); render(); };
  });
  $("nextButton").onclick = () => { if (current < screens.length - 1) { current++; sound.play("next"); render(); } };
  $("previousButton").onclick = () => { if (current > 0) { current--; sound.play("back"); render(); } };
  $("quizNext").onclick = () => { if (quizIndex < data.quiz.length - 1) { quizIndex++; renderQuiz(); } else { current = 9; render(); } };
  $("applicationButton").onclick = () => { reward("application"); feedback("applicationFeedback", "Aplikasi dipilih. Hubungkan dengan kehidupan nyata.", "good"); };
  $("challengeButton").onclick = () => { reward("challenge"); feedback("challengeFeedback", "Solusi dicatat. Gunakan alasan dari data eksperimenmu.", "good"); sound.play("correct"); };
  document.querySelectorAll("[data-reflection]").forEach((button) => {
    button.onclick = () => { document.querySelectorAll("[data-reflection]").forEach((item) => item.classList.remove("selected")); button.classList.add("selected"); reward("reflection"); state.completed = true; save(); feedback("reflectionFeedback", "Refleksi tersimpan. Kamu siap menjadi analis sains.", "good"); };
  });
  for (let index = 0; index < screens.length; index++) { const dot = document.createElement("button"); dot.className = "progress-dot"; dot.title = `Screen ${index + 1}`; dot.onclick = () => { current = index; render(); }; $("dots").appendChild(dot); }
  render();
})();
