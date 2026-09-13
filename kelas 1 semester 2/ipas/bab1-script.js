(function () {
  const key = "IPAS_SEMESTER2";
  const sound = window.IPASSoundManager || { play: function () {} };
  const saved = JSON.parse(localStorage.getItem(key) || "{}");
  const state = saved.bab1 || { steps: [], stars: 0 };
  state.steps = Array.isArray(state.steps) ? state.steps : [];
  let current = 0;
  let selected = [];
  const screens = [...document.querySelectorAll(".screen")];
  const save = () => {
    const all = JSON.parse(localStorage.getItem(key) || "{}");
    all.bab1 = state;
    localStorage.setItem(key, JSON.stringify(all));
  };
  const complete = (step) => {
    if (!state.steps.includes(step)) {
      state.steps.push(step);
      state.stars = Math.min(5, state.stars + 1);
      sound.play("star-earned");
      if (state.stars >= 5) {
        sound.play("level-complete");
      } else {
        sound.play("activity-complete");
      }
      save();
    }
    update();
  };
  const update = () => {
    starCount.textContent = state.stars;
    rewardStars.textContent = "★".repeat(state.stars) + "☆".repeat(5 - state.stars);
  };
  const feedback = (id, text, kind) => {
    const e = document.getElementById(id);
    e.textContent = text;
    e.className = "feedback " + (kind || "");
  };
  const render = () => {
    screens.forEach((s, i) => s.classList.toggle("active", i === current));
    document.querySelectorAll(".progress-dot").forEach((d, i) => {
      d.classList.toggle("active", i === current);
      d.style.width = i === current ? "26px" : "18px";
      d.style.height = i === current ? "5px" : "4px";
      d.style.background = i === current ? "#2d8fe8" : "#c9dce6";
    });
    screenCount.textContent = "Screen " + (current + 1) + " dari 6";
    previousButton.disabled = current === 0;
    nextButton.disabled = current === 5;
    update();
  };
  for (let i = 0; i < 6; i++) {
    const d = document.createElement("button");
    d.className = "progress-dot";
    d.title = "Screen " + (i + 1);
    d.style.minWidth = "0";
    d.style.minHeight = "0";
    d.style.width = "18px";
    d.style.height = "4px";
    d.style.borderRadius = "999px";
    d.style.padding = "0";
    d.style.background = "#c9dce6";
    d.style.boxShadow = "none";
    d.onclick = () => {
      current = i;
      render();
    };
    dots.appendChild(d);
  }
  document.querySelectorAll("[data-go]").forEach(
    (b) =>
      (b.onclick = () => {
        current = +b.dataset.go;
        render();
      }),
  );
  previousButton.onclick = () => {
    if (current > 0) {
      current--;
      render();
    }
  };
  nextButton.onclick = () => {
    if (current < 5) {
      current++;
      render();
    }
  };
  document.querySelectorAll("[data-part]").forEach(
    (b) =>
      (b.onclick = () => {
        bodyInfo.innerHTML = "<strong>" + b.dataset.part + "</strong><br>" + b.dataset.info;
        complete("materi");
      }),
  );
  document.querySelectorAll(".observe").forEach(
    (b) =>
      (b.onclick = () => {
        if (!selected.includes(b.dataset.observe)) {
          selected.push(b.dataset.observe);
          b.classList.add("selected");
        }
        feedback(
          "observeFeedback",
          "Terpilih: " + selected.length + " / 3 ⭐",
          selected.length === 3 ? "good" : "",
        );
        if (selected.length === 3) complete("observe");
      }),
  );
  document.querySelectorAll("[data-answer]").forEach(
    (b) =>
      (b.onclick = () => {
        const ok = b.dataset.answer === "true";
        const feedbackId = b.dataset.feedback || "quizFeedback";
        const buttons = document.querySelectorAll("[data-feedback='" + feedbackId + "']");
        buttons.forEach((x) => {
          x.disabled = true;
          if (x.dataset.answer === "true") x.classList.add("correct");
        });
        b.classList.add(ok ? "correct" : "wrong");
        sound.play(ok ? "correct" : "wrong");
        feedback(
          feedbackId,
          ok ? "🎉 BENAR!" : "💡 Coba lagi!",
          ok ? "good" : "try",
        );
        if (ok) complete(feedbackId === "activityFeedback" ? "activity" : "quiz");
      }),
  );
  render();
})();
