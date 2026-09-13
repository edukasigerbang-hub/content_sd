(function () {
  const root = document.getElementById("ipas-app");
  const semester = root.dataset.semester;
  const chapter = Number(root.dataset.chapter);
  const content = window.CLASS3_CONTENT[semester][chapter];
  const progressKey = semester === "semester1" ? "ipas_kelas3_semester1_progress" : "ipas_kelas3_semester2_progress";
  const sound = window.IPASSoundManager || { play: function () {} };
  const saved = JSON.parse(localStorage.getItem(progressKey) || "{}");
  const state = saved["bab" + chapter] || { steps: [], stars: 0, completed: false };
  state.steps = Array.isArray(state.steps) ? state.steps : [];
  let current = 0;
  let observeSelected = [];
  let practiceSelected = [];
  let experimentStep = 0;
  let quizIndex = 0;
  let quizLocked = false;
  let challengeDone = false;
  const screens = [...document.querySelectorAll(".screen")];
  const get = (id) => document.getElementById(id);

  function save() {
    const all = JSON.parse(localStorage.getItem(progressKey) || "{}");
    all["bab" + chapter] = state;
    localStorage.setItem(progressKey, JSON.stringify(all));
  }

  function stars() {
    return "★".repeat(state.stars) + "☆".repeat(5 - state.stars);
  }

  function complete(step) {
    if (!state.steps.includes(step)) {
      state.steps.push(step);
      state.stars = Math.min(5, state.stars + 1);
      sound.play("star-earned");
      save();
    }
    get("starCount").textContent = state.stars;
    get("rewardStars").textContent = stars();
  }

  function feedback(id, message, kind) {
    const element = get(id);
    element.textContent = message;
    element.className = "feedback " + (kind || "");
  }

  function renderConcepts() {
    get("conceptContent").innerHTML = content.concepts.map((item) =>
      `<button class="class3-card" data-concept="${item[0]}"><span>${item[0]}</span><small>${item[1]}</small></button>`,
    ).join("");
    document.querySelectorAll("[data-concept]").forEach((button) => {
      button.onclick = () => {
        button.classList.add("selected");
        get("conceptInfo").textContent = content.concepts.find((item) => item[0] === button.dataset.concept)[1];
        sound.play("object-click");
        complete("concept");
      };
    });
  }

  function renderObserve() {
    get("observePrompt").textContent = content.observe.prompt;
    get("observeOptions").innerHTML = content.observe.options.map((option, index) =>
      `<button class="class3-option" data-observe-index="${index}">${option}</button>`,
    ).join("");
    document.querySelectorAll("[data-observe-index]").forEach((button) => {
      button.onclick = () => {
        const index = Number(button.dataset.observeIndex);
        if (observeSelected.includes(index)) {
          observeSelected = observeSelected.filter((value) => value !== index);
          button.classList.remove("selected");
        } else if (observeSelected.length < content.observe.targets.length) {
          observeSelected.push(index);
          button.classList.add("selected");
          sound.play("select");
        }
        feedback("observeFeedback", `Terpilih: ${observeSelected.length} / ${content.observe.targets.length}`, "");
        if (observeSelected.length === content.observe.targets.length) {
          const correct = observeSelected.every((value) => content.observe.targets.includes(value));
          if (correct) {
            feedback("observeFeedback", "🎉 Hebat! Pengamatanmu tepat.", "good");
            complete("observe");
          } else {
            feedback("observeFeedback", "😊 Coba lagi! Pilih ciri yang benar.", "try");
          }
        }
      };
    });
  }

  function renderExperiment() {
    get("experimentProblem").textContent = content.experiment.problem;
    get("experimentPrediction").textContent = content.experiment.prediction;
    get("experimentChoices").innerHTML = content.experiment.choices.map((choice, index) =>
      `<button class="class3-option" data-prediction="${index}">${choice}</button>`,
    ).join("");
    get("experimentSteps").innerHTML = content.experiment.steps.map((step, index) =>
      `<button class="class3-option experiment-step" data-step="${index}" disabled>${index + 1}. ${step}</button>`,
    ).join("");
    document.querySelectorAll("[data-prediction]").forEach((button) => {
      button.onclick = () => {
        document.querySelectorAll("[data-prediction]").forEach((item) => item.classList.remove("selected", "wrong"));
        const correct = Number(button.dataset.prediction) === 0;
        button.classList.add(correct ? "selected" : "wrong");
        feedback("experimentFeedback", correct ? "Prediksimu siap diuji. Sekarang lakukan langkahnya." : "😊 Pikirkan kembali berdasarkan masalahnya.", correct ? "good" : "try");
        if (correct) {
          document.querySelectorAll("[data-step]").forEach((step) => { step.disabled = false; });
          sound.play("correct");
        } else sound.play("wrong");
      };
    });
    document.querySelectorAll("[data-step]").forEach((button) => {
      button.onclick = () => {
        const index = Number(button.dataset.step);
        if (index !== experimentStep) return;
        button.classList.add("selected");
        button.disabled = true;
        experimentStep++;
        sound.play("select");
        if (experimentStep === content.experiment.steps.length) {
          get("experimentResult").textContent = `Hasil: ${content.experiment.result}`;
          get("experimentConclusion").textContent = `Kesimpulan: ${content.experiment.conclusion}`;
          complete("experiment");
        }
      };
    });
  }

  function renderPractice() {
    get("practicePrompt").textContent = content.practice.prompt;
    const practice = content.practice;
    if (practice.order) {
      get("practiceOptions").innerHTML = practice.options.map((option, index) => `<button class="class3-option" data-practice="${index}">${option}</button>`).join("");
      document.querySelectorAll("[data-practice]").forEach((button) => {
        button.onclick = () => {
          const index = Number(button.dataset.practice);
          if (practiceSelected.includes(index)) return;
          practiceSelected.push(index);
          button.classList.add("selected");
          if (practiceSelected.length === practice.order.length) {
            const correct = practiceSelected.every((value, position) => value === practice.order[position]);
            feedback("practiceFeedback", correct ? "🎉 Urutannya tepat!" : "😊 Coba lagi dengan memperhatikan urutan proses.", correct ? "good" : "try");
            if (correct) complete("practice");
          }
        };
      });
    } else if (practice.groups) {
      get("practiceOptions").innerHTML = practice.options.map((option, index) => `<div class="class3-group-row"><span>${option}</span><button class="class3-option" data-group-index="${index}" data-group-value="">Pilih: ...</button></div>`).join("");
      document.querySelectorAll("[data-group-index]").forEach((button) => {
        button.onclick = () => {
          const values = ["hemat", "boros"];
          const next = values.indexOf(button.dataset.groupValue) + 1;
          button.dataset.groupValue = values[next % values.length];
          button.textContent = "Pilih: " + button.dataset.groupValue;
          button.classList.add("selected");
          const buttons = [...document.querySelectorAll("[data-group-index]")];
          if (buttons.every((item) => item.dataset.groupValue)) {
            const correct = buttons.every((item, itemIndex) => item.dataset.groupValue === practice.groups[itemIndex]);
            feedback("practiceFeedback", correct ? "🎉 Pengelompokanmu tepat!" : "😊 Periksa lagi setiap kelompok.", correct ? "good" : "try");
            if (correct) complete("practice");
          }
        };
      });
    } else {
      get("practiceOptions").innerHTML = practice.options.map((option, index) => `<button class="class3-option" data-practice-target="${index}">${option}</button>`).join("");
      document.querySelectorAll("[data-practice-target]").forEach((button) => {
        button.onclick = () => {
          const index = Number(button.dataset.practiceTarget);
          button.classList.toggle("selected");
          practiceSelected = button.classList.contains("selected") ? [...practiceSelected, index] : practiceSelected.filter((value) => value !== index);
          if (practiceSelected.length === practice.targets.length) {
            const correct = practiceSelected.every((value) => practice.targets.includes(value));
            feedback("practiceFeedback", correct ? "🎉 Pilihanmu tepat!" : "😊 Coba periksa kembali.", correct ? "good" : "try");
            if (correct) complete("practice");
          }
        };
      });
    }
  }

  function renderQuiz() {
    const question = content.quiz[quizIndex];
    get("quizNumber").textContent = `Soal ${quizIndex + 1} dari ${content.quiz.length}`;
    get("quizQuestion").textContent = question[0];
    get("quizOptions").innerHTML = question[1].map((option, index) => `<button class="class3-option" data-quiz-answer="${index}">${option}</button>`).join("");
    get("quizFeedback").textContent = "";
    quizLocked = false;
    document.querySelectorAll("[data-quiz-answer]").forEach((button) => {
      button.onclick = () => {
        if (quizLocked) return;
        const correct = Number(button.dataset.quizAnswer) === question[2];
        button.classList.add(correct ? "selected" : "wrong");
        if (correct) {
          quizLocked = true;
          sound.play("correct");
          get("quizFeedback").textContent = "🎉 Hebat! " + question[3];
          get("quizFeedback").className = "feedback good";
          if (quizIndex === content.quiz.length - 1) complete("quiz");
        } else {
          sound.play("wrong");
          get("quizFeedback").textContent = "😊 Coba lagi! " + question[3];
          get("quizFeedback").className = "feedback try";
        }
        if (correct) {
          document.querySelectorAll("[data-quiz-answer]").forEach((item) => { item.disabled = true; });
        }
        get("quizNext").disabled = !correct;
      };
    });
    get("quizNext").disabled = true;
  }

  function render() {
    screens.forEach((screen, index) => screen.classList.toggle("active", index === current));
    document.querySelectorAll(".progress-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === current);
      dot.style.width = index === current ? "26px" : "18px";
      dot.style.background = index === current ? "#2d8fe8" : "#c9dce6";
    });
    get("screenCount").textContent = `Screen ${current + 1} dari ${screens.length}`;
    get("previousButton").disabled = current === 0;
    get("nextButton").disabled = current === screens.length - 1;
    get("starCount").textContent = state.stars;
    get("rewardStars").textContent = stars();
  }

  get("chapterTitle").textContent = `🌟 BAB ${chapter}`;
  get("chapterName").textContent = content.title;
  get("introIcon").textContent = content.icon;
  get("introTitle").textContent = content.title.toUpperCase();
  get("introSummary").textContent = content.summary;
  get("objective").textContent = content.objective;
  get("vocabulary").textContent = content.vocabulary;
  get("challengeText").textContent = content.challenge;
  get("reflectionPrompt").textContent = "Pilih kalimat yang paling sesuai dengan pengalaman belajarmu.";
  document.querySelector(".class3-reflections").innerHTML = content.reflection.map((item, index) => `<button data-reflection="${index}">${item}</button>`).join("");
  get("completionText").textContent = `Kamu sudah menyelesaikan petualangan ${content.title}. Terus gunakan cara berpikir ilmiah dalam kehidupan sehari-hari.`;
  renderConcepts();
  renderObserve();
  renderExperiment();
  renderPractice();
  renderQuiz();

  document.querySelectorAll("[data-go]").forEach((button) => {
    button.onclick = () => { current = Number(button.dataset.go); sound.play("button-click"); render(); };
  });
  get("nextButton").onclick = () => { if (current < screens.length - 1) { current++; sound.play("next"); render(); } };
  get("previousButton").onclick = () => { if (current > 0) { current--; sound.play("back"); render(); } };
  get("quizNext").onclick = () => {
    if (quizIndex < content.quiz.length - 1) { quizIndex++; renderQuiz(); sound.play("next"); }
    else { current++; render(); }
  };
  get("challengeButton").onclick = () => {
    challengeDone = true;
    get("challengeButton").classList.add("selected");
    get("challengeFeedback").textContent = "🎉 Tantangan dicatat. Sekarang pilih refleksimu.";
    get("challengeFeedback").className = "feedback good";
    sound.play("correct");
  };
  document.querySelectorAll("[data-reflection]").forEach((button) => {
    button.onclick = () => {
      document.querySelectorAll("[data-reflection]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      get("reflectionFeedback").textContent = "Terima kasih sudah merefleksikan belajarmu.";
      complete("reflection");
      state.completed = true;
      save();
    };
  });
  for (let index = 0; index < screens.length; index++) {
    const dot = document.createElement("button");
    dot.className = "progress-dot";
    dot.title = `Screen ${index + 1}`;
    dot.onclick = () => { current = index; render(); };
    get("dots").appendChild(dot);
  }
  render();
})();
