const worlds = {
  aku: {
    name: 'Aku dan Diriku',
    intro: 'Ayo tunjuk bagian tubuhmu!',
    activities: [
      {
        prompt: 'Ayo tunjuk hidung.',
        instruction: 'Ayo tunjuk hidung.',
        emoji: ['👂', '👃', '👁️'],
        options: ['👂', '👃', '👁️'],
        answer: '👃',
        reward: 'Hebat! Kamu tahu hidung.'
      },
      {
        prompt: 'Mana yang benar untuk mencuci tangan?',
        instruction: 'Pilih kegiatan yang baik.',
        emoji: ['🧼', '🧻', '🪥'],
        options: ['🧻', '🧼', '🪥'],
        answer: '🧼',
        reward: 'Bagus! Mencuci tangan itu baik.'
      }
    ]
  },
  keluarga: {
    name: 'Keluargaku',
    intro: 'Ayo kenali keluarga!',
    activities: [
      {
        prompt: 'Siapa yang membantu kita di rumah?',
        instruction: 'Pilih orang yang paling dekat.',
        emoji: ['👨', '👩', '🧒'],
        options: ['👨', '👩', '🧒'],
        answer: '👨',
        reward: 'Benar! Ayah membantu keluarga.'
      },
      {
        prompt: 'Kegiatan yang baik di rumah?',
        instruction: 'Pilih perilaku baik.',
        emoji: ['🧹', '📺', '🧸'],
        options: ['🧹', '📺', '🧸'],
        answer: '🧹',
        reward: 'Hebat! Membersihkan rumah itu baik.'
      }
    ]
  },
  sekolah: {
    name: 'Sekolahku',
    intro: 'Ayo kenali alat sekolah!',
    activities: [
      {
        prompt: 'Apa yang dipakai untuk menulis?',
        instruction: 'Pilih benda sekolah yang benar.',
        emoji: ['✏️', '🧢', '🚲'],
        options: ['✏️', '🧢', '🚲'],
        answer: '✏️',
        reward: 'Benar! Pensil untuk menulis.'
      },
      {
        prompt: 'Mana yang benar saat antre?',
        instruction: 'Pilih sikap yang baik.',
        emoji: ['🚶', '🧵', '🎒'],
        options: ['🚶', '🧵', '🎒'],
        answer: '🚶',
        reward: 'Bagus! Antre itu baik.'
      }
    ]
  },
  huruf: {
    name: 'Huruf Ceria',
    intro: 'Ayo dengarkan hurufnya!',
    activities: [
      {
        prompt: 'Huruf apa ini?',
        instruction: 'Pilih huruf yang benar.',
        emoji: ['A', 'B', 'C'],
        options: ['A', 'B', 'C'],
        answer: 'A',
        reward: 'Hebat! A untuk apel.'
      },
      {
        prompt: 'Buat suku kata dari B dan U?',
        instruction: 'Cocokkan suku kata.',
        emoji: ['B', 'U', 'BU'],
        options: ['B', 'U', 'BU'],
        answer: 'BU',
        reward: 'Cocok! B dan U menjadi BU.'
      }
    ]
  },
  angka: {
    name: 'Angka Ceria',
    intro: 'Ayo hitung benda!',
    activities: [
      {
        prompt: 'Ada berapa apel?',
        instruction: 'Hitung jumlah apel.',
        emoji: ['🍎', '🍎', '🍎'],
        options: ['2', '3', '4'],
        answer: '3',
        reward: 'Hebat! Ada tiga apel.'
      },
      {
        prompt: 'Mana angka 5?',
        instruction: 'Pilih angka yang benar.',
        emoji: ['3', '5', '8'],
        options: ['3', '5', '8'],
        answer: '5',
        reward: 'Bagus! Kamu tahu angka 5.'
      }
    ]
  },
  warna: {
    name: 'Warna dan Bentuk',
    intro: 'Ayo cari warna merah!',
    activities: [
      {
        prompt: 'Mana yang berwarna merah?',
        instruction: 'Cari warna merah.',
        emoji: ['🔵', '🍎', '🟢'],
        options: ['🔵', '🍎', '🟢'],
        answer: '🍎',
        reward: 'Benar! Merah seperti apel.'
      },
      {
        prompt: 'Bentuk apa ini?',
        instruction: 'Pilih bentuk lingkaran.',
        emoji: ['🔺', '🟢', '⚪'],
        options: ['🔺', '🟢', '⚪'],
        answer: '⚪',
        reward: 'Hebat! Itu bentuk lingkaran.'
      }
    ]
  }
};

const state = {
  stars: 0,
  worldKey: 'aku',
  activityIndex: 0,
  unlocked: ['aku'],
  answered: false,
  currentView: 'home'
};

const homeScreen = document.getElementById('homeScreen');
const lessonScreen = document.getElementById('lessonScreen');
const lessonTag = document.getElementById('lessonTag');
const stage = document.getElementById('activityStage');
const optionsList = document.getElementById('optionsList');
const dialogue = document.getElementById('dialogue');
const progressStars = document.getElementById('progressStars');
const starCount = document.getElementById('starCount');
const homeBubble = document.getElementById('homeBubble');

const speak = (text) => {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'id-ID';
  utterance.rate = 0.9;
  utterance.pitch = 1.15;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

const renderStars = () => {
  const stars = Array.from({ length: 5 }, (_, i) => (i < state.stars ? '⭐' : '☆')).join(' ');
  progressStars.innerHTML = stars;
  starCount.textContent = String(state.stars);
};

const showHome = () => {
  state.currentView = 'home';
  homeScreen.classList.add('active');
  lessonScreen.classList.remove('active');
  homeBubble.textContent = 'Halo! Ayo belajar sambil bermain!';
  speak('Halo! Ayo belajar sambil bermain!');
};

const getCurrentActivity = () => {
  const world = worlds[state.worldKey];
  return world.activities[state.activityIndex];
};

const renderActivity = () => {
  const world = worlds[state.worldKey];
  const activity = getCurrentActivity();
  state.answered = false;

  lessonTag.textContent = world.name;
  dialogue.textContent = `Kiko: ${activity.prompt}`;
  speak(activity.instruction);

  const stageMarkup = activity.emoji
    .map((item) => `<span class="grade1-stage-emoji">${item}</span>`)
    .join('');

  stage.innerHTML = `<div class="grade1-stage-content">${stageMarkup}</div>`;
  optionsList.innerHTML = '';

  activity.options.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'grade1-option-button';
    button.textContent = option;
    button.addEventListener('click', () => handleAnswer(button, option, activity.answer));
    optionsList.appendChild(button);
  });
};

const handleAnswer = (button, selected, answer) => {
  if (state.answered) return;
  state.answered = true;

  const isCorrect = selected === answer;
  const allButtons = [...optionsList.querySelectorAll('.grade1-option-button')];

  allButtons.forEach((optionButton) => {
    if (optionButton.textContent === answer) {
      optionButton.classList.add('correct');
    }
    if (optionButton === button && !isCorrect) {
      optionButton.classList.add('wrong');
    }
  });

  if (isCorrect) {
    const nextStars = Math.min(5, state.stars + 1);
    state.stars = nextStars;
    renderStars();
    dialogue.textContent = `Kiko: ${getCurrentActivity().reward}`;
    speak(getCurrentActivity().reward);
  } else {
    dialogue.textContent = 'Kiko: Coba lagi. Yuk lihat baik-baik.';
    speak('Coba lagi. Yuk lihat baik-baik.');
  }
};

const showLesson = (worldKey) => {
  state.worldKey = worldKey;
  state.activityIndex = 0;
  state.currentView = 'lesson';
  homeScreen.classList.remove('active');
  lessonScreen.classList.add('active');
  renderStars();
  renderActivity();
};

const goToNextActivity = () => {
  const world = worlds[state.worldKey];
  if (state.activityIndex < world.activities.length - 1) {
    state.activityIndex += 1;
    renderActivity();
    return;
  }

  const worldNames = Object.keys(worlds);
  const currentIndex = worldNames.indexOf(state.worldKey);
  if (currentIndex < worldNames.length - 1) {
    const nextWorld = worldNames[currentIndex + 1];
    showLesson(nextWorld);
  } else {
    showHome();
  }
};

const startBtn = document.getElementById('startBtn');
const repeatIntroBtn = document.getElementById('repeatIntroBtn');
const repeatBtn = document.getElementById('repeatBtn');
const nextBtn = document.getElementById('nextBtn');
const homeBtn = document.getElementById('homeBtn');

startBtn.addEventListener('click', () => showLesson('aku'));
repeatIntroBtn.addEventListener('click', () => speak('Halo! Ayo belajar sambil bermain!'));
repeatBtn.addEventListener('click', () => {
  const activity = getCurrentActivity();
  speak(activity.instruction);
});
nextBtn.addEventListener('click', () => {
  if (!state.answered) {
    const activity = getCurrentActivity();
    dialogue.textContent = `Kiko: ${activity.reward}`;
    speak(activity.reward);
    return;
  }
  goToNextActivity();
});
homeBtn.addEventListener('click', () => showHome());

document.querySelectorAll('.grade1-world-card').forEach((card) => {
  card.addEventListener('click', () => showLesson(card.dataset.world));
});

renderStars();
showHome();
