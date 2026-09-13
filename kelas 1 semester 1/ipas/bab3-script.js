(function () {
  const key = "IPAS",
    all = JSON.parse(localStorage.getItem(key) || "{}"),
    state = all.bab3 || { stars: 0, steps: [] };
  let current = 0;
  const screens = [...document.querySelectorAll(".screen")],
    save = () => {
      const data = JSON.parse(localStorage.getItem(key) || "{}");
      data.bab3 = state;
      localStorage.setItem(key, JSON.stringify(data));
    },
    done = (s) => {
      if (!state.steps.includes(s)) {
        state.steps.push(s);
        state.stars = Math.min(5, state.stars + 1);
        save();
      }
      render();
    },
    render = () => {
      screens.forEach((s, i) => s.classList.toggle("active", i === current));
      document
        .querySelectorAll(".progress-dot")
        .forEach((d, i) => d.classList.toggle("active", i === current));
      count.textContent = "Screen " + (current + 1) + " dari 6";
      prev.disabled = current === 0;
      next.disabled = current === 5;
      stars.textContent = state.stars;
      reward.textContent =
        "★".repeat(state.stars) + "☆".repeat(5 - state.stars);
    };
  for (let i = 0; i < 6; i++) {
    const d = document.createElement("button");
    d.className = "progress-dot";
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
  prev.onclick = () => {
    if (current > 0) {
      current--;
      render();
    }
  };
  next.onclick = () => {
    if (current < 5) {
      current++;
      render();
    }
  };
  document.querySelectorAll(".part").forEach(
    (b) =>
      (b.onclick = () => {
        info.textContent = b.dataset.info;
        done("parts");
      }),
  );
  document.querySelectorAll(".need,.care").forEach(
    (b) =>
      (b.onclick = () => {
        const ok = b.dataset.ok === "true";
        b.classList.toggle("selected", ok);
        const id = b.classList.contains("need")
          ? "needFeedback"
          : "careFeedback";
        feedback(
          id,
          ok ? "🎉 Pilihan benar!" : "😊 Pilih tindakan baik.",
          ok ? "good" : "try",
        );
        if (ok) done(b.classList.contains("need") ? "need" : "care");
      }),
  );
  document.querySelectorAll("[data-answer]").forEach(
    (b) =>
      (b.onclick = () => {
        const ok = b.dataset.answer === "true";
        b.classList.add(ok ? "correct" : "wrong");
        feedback(
          "quizFeedback",
          ok ? "🎉 Benar! Akar menyerap air." : "😊 Coba lagi.",
          ok ? "good" : "try",
        );
        if (ok) done("quiz");
      }),
  );
  function feedback(id, text, kind) {
    const e = document.getElementById(id);
    e.textContent = text;
    e.className = "feedback " + kind;
  }
  render();
})();
