(function () {
  const progress = JSON.parse(localStorage.getItem("IPAS_SEMESTER2") || "{}");
  const levels = [...document.querySelectorAll(".map-level")];
  levels.forEach((level, index) => {
    const number = index + 1;
    const stars = Number(progress["bab" + number]?.stars) || 0;
    const label = level.querySelector("small");
    if (label) label.textContent = "★".repeat(stars) + "☆".repeat(5 - stars);
    if (stars >= 5) level.classList.add("completed");
  });
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
  check();
  window.addEventListener("resize", check);
})();
