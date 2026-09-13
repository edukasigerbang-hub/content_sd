(() => {
  const chapter = Number(location.pathname.match(/bab(\d+)/)?.[1]) || 1;
  const data = window.PROBLEM_CONTENT[chapter];
  const semester = location.pathname.includes("semester-2") ? "semester2" : "semester1";
  const key = `ipas_kelas6_${semester}_progress`;
  const sound = window.IPASSoundManager || { play() {} };
  const screens = [...document.querySelectorAll(".screen")];
  const $ = (id) => document.getElementById(id);
  const saved = JSON.parse(localStorage.getItem(key) || "{}");
  const state = saved[`bab${chapter}`] || { steps: [], stars: 0, completed: false };
  let current = 0;
  let decision = null;
  let quizLocked = false;

  function save() { const all = JSON.parse(localStorage.getItem(key) || "{}"); all[`bab${chapter}`] = state; localStorage.setItem(key, JSON.stringify(all)); }
  function update() { $("starCount").textContent = state.stars; $("rewardStars").textContent = "★".repeat(state.stars) + "☆".repeat(5 - state.stars); }
  function reward(step) { if (!state.steps.includes(step)) { state.steps.push(step); state.stars = Math.min(5, state.stars + 1); sound.play("star-earned"); save(); } update(); }
  function feedback(id, text, type) { $(id).textContent = text; $(id).className = `feedback ${type || ""}`; }
  function render() { screens.forEach((screen, index) => screen.classList.toggle("active", index === current)); document.querySelectorAll(".progress-dot").forEach((dot, index) => { dot.classList.toggle("active", index === current); dot.style.width = index === current ? "28px" : "18px"; dot.style.background = index === current ? "#2d8fe8" : "#c9dce6"; }); $("screenCount").textContent = `Screen ${current + 1} dari ${screens.length}`; $("previousButton").disabled = current === 0; $("nextButton").disabled = current === screens.length - 1; update(); }
  function renderQuiz() { const question = data.quiz[0]; $("quizQuestion").textContent = question[0]; $("quizOptions").innerHTML = question[1].map((option, index) => `<button class="decision-option" data-quiz="${index}">${option}</button>`).join(""); $("quizNext").disabled = true; document.querySelectorAll("[data-quiz]").forEach((button) => { button.onclick = () => { if (quizLocked) return; const correct = Number(button.dataset.quiz) === question[2]; button.classList.add(correct ? "selected" : "wrong"); feedback("quizFeedback", correct ? "Benar! Kamu menggunakan konsep untuk mengevaluasi masalah." : "Belum tepat. Periksa kembali bukti dan pilihanmu.", correct ? "good" : "try"); sound.play(correct ? "correct" : "wrong"); if (correct) { quizLocked = true; document.querySelectorAll("[data-quiz]").forEach((item) => { item.disabled = true; }); $("quizNext").disabled = false; reward("quiz"); } }; }); }
  function fill() {
    $("missionTitle").textContent = `🧭 BAB ${chapter} · PROBLEM SOLVING`;
    $("missionName").textContent = data.title;
    $("missionIcon").textContent = data.icon;
    $("problem").textContent = data.problem;
    $("context").textContent = data.context;
    $("objective").textContent = data.objective;
    $("science").textContent = data.science;
    $("application").textContent = data.application;
    $("challenge").textContent = data.challenge;
    $("reflection").textContent = data.reflection;
    $("conclusion").innerHTML = data.conclusion.map((item) => `<li>✓ ${item}</li>`).join("");
    $("evidence").innerHTML = data.evidence.map((item) => `<button class="evidence-card" data-evidence="${item[0]}"><strong>${item[0]}</strong><small>Periksa bukti</small></button>`).join("");
    document.querySelectorAll("[data-evidence]").forEach((button) => { button.onclick = () => { button.classList.add("selected"); $("evidenceText").textContent = data.evidence.find((item) => item[0] === button.dataset.evidence)[1]; sound.play("object-click"); if (document.querySelectorAll("[data-evidence].selected").length >= 2) reward("evidence"); }; });
    $("dataText").textContent = data.data;
    $("options").innerHTML = data.options.map((option, index) => `<button class="decision-option" data-option="${index}"><strong>${option.label}</strong><small>Pilih untuk melihat consequence</small></button>`).join("");
    document.querySelectorAll("[data-option]").forEach((button) => { button.onclick = () => { decision = Number(button.dataset.option); document.querySelectorAll("[data-option]").forEach((item) => item.classList.remove("selected")); button.classList.add("selected"); $("decisionText").textContent = data.options[decision].label; $("consequence").textContent = data.options[decision].result; $("scoreText").textContent = `Impact score: ${data.options[decision].score}/3`; feedback("decisionFeedback", "Keputusan dicatat. Evaluasi keuntungan dan kelemahannya.", "good"); reward("decision"); sound.play("select"); }; });
    renderQuiz();
  }
  fill();
  document.querySelectorAll("[data-go]").forEach((button) => { button.onclick = () => { current = Number(button.dataset.go); sound.play("next"); render(); }; });
  $("nextButton").onclick = () => { if (current < screens.length - 1) { current++; sound.play("next"); render(); } };
  $("previousButton").onclick = () => { if (current > 0) { current--; sound.play("back"); render(); } };
  $("quizNext").onclick = () => { current = 12; render(); };
  $("applicationButton").onclick = () => { reward("application"); feedback("applicationFeedback", "Aplikasi dicatat. Hubungkan keputusan dengan kehidupan nyata.", "good"); };
  $("challengeButton").onclick = () => { reward("challenge"); feedback("challengeFeedback", "Solusi dikirim. Jelaskan alasan dan trade-off-nya.", "good"); sound.play("correct"); };
  document.querySelectorAll("[data-reflection]").forEach((button) => { button.onclick = () => { document.querySelectorAll("[data-reflection]").forEach((item) => item.classList.remove("selected")); button.classList.add("selected"); reward("reflection"); state.completed = true; save(); feedback("reflectionFeedback", "Refleksi tersimpan. Kamu sudah memecahkan masalah dengan alasan.", "good"); }; });
  for (let index = 0; index < screens.length; index++) { const dot = document.createElement("button"); dot.className = "progress-dot"; dot.title = `Screen ${index + 1}`; dot.onclick = () => { current = index; render(); }; $("dots").appendChild(dot); }
  render();
})();
