(function () {
  const app = document.getElementById("ipas-app");
  const chapter = Number(app.dataset.chapter);
  const data = window.EXPEDITION_CONTENT[chapter];
  const key = "ipas_kelas4_semester1_progress";
  const sound = window.IPASSoundManager || { play: function () {} };
  const store = JSON.parse(localStorage.getItem(key) || "{}");
  const state = store["bab" + chapter] || { steps: [], stars: 0, completed: false };
  let screen = 0;
  let predictionDone = false;
  let clueCount = 0;
  let experimentStep = 0;
  let quizIndex = 0;
  let quizLocked = false;
  const screens = [...document.querySelectorAll(".screen")];
  const $ = (id) => document.getElementById(id);
  function save() { const all = JSON.parse(localStorage.getItem(key) || "{}"); all["bab" + chapter] = state; localStorage.setItem(key, JSON.stringify(all)); }
  function reward(step) { if (!state.steps.includes(step)) { state.steps.push(step); state.stars = Math.min(5, state.stars + 1); sound.play("star-earned"); save(); } update(); }
  function update() { $("starCount").textContent = state.stars; $("rewardStars").textContent = "★".repeat(state.stars) + "☆".repeat(5 - state.stars); }
  function message(id, text, type) { $(id).textContent = text; $(id).className = "feedback " + (type || ""); }
  function render() { screens.forEach((item, index) => item.classList.toggle("active", index === screen)); document.querySelectorAll(".progress-dot").forEach((dot, index) => { dot.classList.toggle("active", index === screen); dot.style.width = index === screen ? "28px" : "18px"; dot.style.background = index === screen ? "#2d8fe8" : "#c9dce6"; }); $("screenCount").textContent = `Screen ${screen + 1} dari ${screens.length}`; $("previousButton").disabled = screen === 0; $("nextButton").disabled = screen === screens.length - 1; update(); }
  function fill() {
    $("missionTitle").textContent = `🌟 BAB ${chapter} · EXPEDITION`;
    $("missionName").textContent = data.title;
    $("missionIcon").textContent = data.icon;
    $("missionBriefing").textContent = data.mission;
    $("phenomenon").textContent = data.phenomenon;
    $("objective").textContent = data.objective;
    $("discovery").textContent = data.discovery;
    $("challenge").textContent = data.challenge;
    $("conclusion").innerHTML = data.conclusion.map((item) => `<li>✓ ${item}</li>`).join("");
    $("clues").innerHTML = data.clues.map((item) => `<button class="evidence-card" data-clue="${item[0]}"><strong>${item[0]}</strong><small>Periksa bukti</small></button>`).join("");
    document.querySelectorAll("[data-clue]").forEach((button) => { button.onclick = () => { button.classList.add("selected"); $("clueText").textContent = data.clues.find((item) => item[0] === button.dataset.clue)[1]; sound.play("object-click"); clueCount++; if (clueCount >= 2) reward("clues"); }; });
    $("predictionQuestion").textContent = data.prediction.q;
    $("predictionOptions").innerHTML = data.prediction.options.map((item, index) => `<button class="mission-option" data-prediction="${index}">${item}</button>`).join("");
    document.querySelectorAll("[data-prediction]").forEach((button) => { button.onclick = () => { const ok = Number(button.dataset.prediction) === data.prediction.answer; document.querySelectorAll("[data-prediction]").forEach((item) => item.classList.remove("selected", "wrong")); button.classList.add(ok ? "selected" : "wrong"); if (ok) { predictionDone = true; document.querySelectorAll("[data-experiment]").forEach((item) => { item.disabled = false; }); message("predictionFeedback", "Prediksimu dicatat. Sekarang uji dengan bukti.", "good"); reward("prediction"); } else message("predictionFeedback", "Belum tepat. Perhatikan fenomena dan clue.", "try"); sound.play(ok ? "correct" : "wrong"); }; });
    $("experimentTitle").textContent = data.experiment.title;
    $("experimentItems").innerHTML = data.experiment.items.map((item, index) => `<button class="mission-option experiment-item" data-experiment="${index}" disabled>${index + 1}. ${item}</button>`).join("");
    document.querySelectorAll("[data-experiment]").forEach((button) => { button.onclick = () => { const index = Number(button.dataset.experiment); if (index !== experimentStep) return; button.disabled = true; button.classList.add("selected"); experimentStep++; sound.play("select"); if (experimentStep === data.experiment.items.length) { $("dataEvidence").textContent = data.data; $("dataBoardText").textContent = data.data; reward("experiment"); message("experimentFeedback", "Bukti terkumpul. Baca data sebelum menganalisis.", "good"); } }; });
    $("analysisQuestion").textContent = data.analysis.q;
    $("analysisOptions").innerHTML = data.analysis.options.map((item, index) => `<button class="mission-option" data-analysis="${index}">${item}</button>`).join("");
    document.querySelectorAll("[data-analysis]").forEach((button) => { button.onclick = () => { const ok = Number(button.dataset.analysis) === data.analysis.answer; button.classList.add(ok ? "selected" : "wrong"); message("analysisFeedback", ok ? "Benar! Bukti yang kamu temukan mendukung kesimpulan ini." : "Belum tepat. Coba perhatikan kembali hasil pengamatan.", ok ? "good" : "try"); if (ok) reward("analysis"); sound.play(ok ? "correct" : "wrong"); }; });
    $("quizQuestion").textContent = data.quiz[0][0]; renderQuiz();
  }
  function renderQuiz() { const item = data.quiz[quizIndex]; $("quizNumber").textContent = `Bukti ${quizIndex + 1} dari ${data.quiz.length}`; $("quizQuestion").textContent = item[0]; $("quizOptions").innerHTML = item[1].map((option, index) => `<button class="mission-option" data-quiz="${index}">${option}</button>`).join(""); $("quizFeedback").textContent = ""; quizLocked = false; $("quizNext").disabled = true; document.querySelectorAll("[data-quiz]").forEach((button) => { button.onclick = () => { if (quizLocked) return; const ok = Number(button.dataset.quiz) === item[2]; button.classList.add(ok ? "selected" : "wrong"); message("quizFeedback", ok ? "Benar! Bukti yang kamu temukan mendukung kesimpulan ini." : "Belum tepat. Coba perhatikan kembali hasil pengamatan.", ok ? "good" : "try"); sound.play(ok ? "correct" : "wrong"); if (ok) { quizLocked = true; document.querySelectorAll("[data-quiz]").forEach((option) => option.disabled = true); $("quizNext").disabled = false; if (quizIndex === data.quiz.length - 1) reward("quiz"); } }; }); }
  fill();
  document.querySelectorAll("[data-go]").forEach((button) => button.onclick = () => { screen = Number(button.dataset.go); sound.play("next"); render(); });
  $("nextButton").onclick = () => { if (screen < screens.length - 1) { screen++; sound.play("next"); render(); } };
  $("previousButton").onclick = () => { if (screen > 0) { screen--; sound.play("back"); render(); } };
  $("quizNext").onclick = () => { if (quizIndex < data.quiz.length - 1) { quizIndex++; renderQuiz(); } else { screen++; render(); } };
  $("challengeButton").onclick = () => { $("challengeButton").classList.add("selected"); message("challengeFeedback", "Misi tantangan dicatat. Gunakan alasan dari bukti yang kamu temukan.", "good"); reward("challenge"); sound.play("correct"); };
  for (let index = 0; index < screens.length; index++) { const dot = document.createElement("button"); dot.className = "progress-dot"; dot.title = `Screen ${index + 1}`; dot.onclick = () => { screen = index; render(); }; $("dots").appendChild(dot); }
  render();
})();
