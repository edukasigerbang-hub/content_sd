(function () {
  const root = document.getElementById("ipas-app");
  const semester = root.dataset.semester;
  const progressKey = semester === "semester1" ? "ipas_kelas3_semester1_progress" : "ipas_kelas3_semester2_progress";
  const labels = semester === "semester1"
    ? [["🌱", "Makhluk Hidup Bertumbuh"], ["⚡", "Energi di Sekitar Kita"], ["🛞", "Gaya Membuat Benda Bergerak"], ["🌦️", "Cuaca dan Pengukuran"]]
    : [["🧊", "Materi dan Perubahannya"], ["🌍", "Bumi dan Kenampakan Alam"], ["🌾", "Sumber Daya dan Kebutuhan"], ["♻️", "Lingkungan Sehat dan Solusi"]];
  const levels = [...document.querySelectorAll(".map-level")];
  const progress = JSON.parse(localStorage.getItem(progressKey) || "{}");
  levels.forEach((level, index) => {
    const item = labels[index];
    level.querySelector(".level-icon").textContent = item[0];
    level.querySelector("strong").innerHTML = `LEVEL ${index + 1}<br>${item[1]}`;
    const stars = Number(progress["bab" + (index + 1)]?.stars) || 0;
    level.querySelector("small").textContent = "★".repeat(stars) + "☆".repeat(5 - stars);
    if (progress["bab" + (index + 1)]?.completed) level.classList.add("completed");
  });
})();
