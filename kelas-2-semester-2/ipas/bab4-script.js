(function () {
  const key = "IPAS_KELAS2_SEMESTER2";
  const sound = window.IPASSoundManager || { play: function () {} };
  const saved = JSON.parse(localStorage.getItem(key) || "{}");
  const state = saved.bab4 || { steps: [], stars: 0 };
  state.steps = Array.isArray(state.steps) ? state.steps : [];
  let current = 0;
  let selected = [];
  let first = null;
  let pairs = 0;
  const screens = [...document.querySelectorAll(".screen")];

  const save = () => {
    const all = JSON.parse(localStorage.getItem(key) || "{}");
    all.bab4 = state;
    localStorage.setItem(key, JSON.stringify(all));
  };

  const updateStars = () => {
    starCount.textContent = state.stars;
    rewardStars.textContent = "★".repeat(state.stars) + "☆".repeat(5 - state.stars);
  };

  const complete = (step) => {
    if (!state.steps.includes(step)) {
      state.steps.push(step);
      state.stars = Math.min(5, state.stars + 1);
      sound.play("star-earned");
      sound.play(state.stars >= 5 ? "level-complete" : "activity-complete");
      save();
    }
    updateStars();
  };

  const feedback = (id, text, kind) => {
    const el = document.getElementById(id);
    el.textContent = text;
    el.className = "feedback " + (kind || "");
  };

  const render = () => {
    screens.forEach((s, i) => s.classList.toggle("active", i === current));
    document.querySelectorAll(".progress-dot").forEach((d, i) => {
      d.classList.toggle("active", i === current);
      d.style.width = i === current ? "26px" : "18px";
      d.style.height = i === current ? "5px" : "4px";
      d.style.background = i === current ? "#2d8fe8" : "#c9dce6";
    });
    screenCount.textContent = "Screen " + (current + 1) + " dari 7";
    previousButton.disabled = current === 0;
    nextButton.disabled = current === screens.length - 1;
    updateStars();
  };

  for (let i = 0; i < 7; i++) {
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
    if (current < screens.length - 1) {
      current++;
      render();
    }
  };

  document.querySelectorAll("[data-part]").forEach(
    (b) =>
      (b.onclick = () => {
        bodyInfo.innerHTML =
          "<strong>" + b.dataset.part + "</strong><br>" + b.dataset.info;
        sound.play("object-click");
        complete("materi");
      }),
  );

  document.querySelectorAll(".observe").forEach(
    (b) =>
      (b.onclick = () => {
        if (!selected.includes(b.dataset.observe)) {
          selected.push(b.dataset.observe);
          b.classList.add("selected");
          sound.play("select");
        }
        feedback(
          "observeFeedback",
          "Terpilih: " + selected.length + " / 3 ⭐",
          selected.length === 3 ? "good" : "",
        );
        if (selected.length === 3) complete("observe");
      }),
  );

  document.querySelectorAll(".match-card").forEach(
    (b) =>
      (b.onclick = () => {
        if (b.classList.contains("matched")) return;
        if (!first) {
          first = b;
          b.classList.add("selected");
          sound.play("select");
          return;
        }
        b.classList.add("selected");
        if (first !== b && first.dataset.match === b.dataset.match) {
          first.classList.remove("selected");
          first.classList.add("matched");
          b.classList.add("matched");
          first = null;
          pairs++;
          sound.play("match");
          feedback(
            "matchFeedback",
            "Pasangan benar: " + pairs + " / 4",
            pairs === 4 ? "good" : "",
          );
          if (pairs === 4) complete("match");
        } else {
          sound.play("wrong");
          feedback("matchFeedback", "😊 Belum cocok. Coba lagi.", "try");
          const old = first;
          setTimeout(() => {
            old.classList.remove("selected");
            b.classList.remove("selected");
            first = null;
          }, 350);
        }
      }),
  );

  document.querySelectorAll("[data-answer]").forEach(
    (b) =>
      (b.onclick = () => {
        const ok = b.dataset.answer === "true";
        document.querySelectorAll("[data-answer]").forEach((x) => {
          x.disabled = true;
          if (x.dataset.answer === "true") x.classList.add("correct");
        });
        b.classList.add(ok ? "correct" : "wrong");
        sound.play(ok ? "correct" : "wrong");
        feedback(
          "quizFeedback",
          ok
            ? "🎉 BENAR! Menanam pohon adalah cara menjaga alam."
            : "💡 Coba lagi! Menanam pohon adalah cara menjaga alam.",
          ok ? "good" : "try",
        );
        if (ok) complete("quiz");
      }),
  );

  const check = () => {
    console.assert(
      document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      "ERROR: Horizontal overflow detected",
    );
    console.assert(
      document.documentElement.scrollHeight <= document.documentElement.clientHeight,
      "ERROR: Vertical overflow detected",
    );
  };

  render();
  check();
  window.addEventListener("resize", check);
})();
