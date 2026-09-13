const worlds = {
  bilangan: {
    name: 'Bilangan',
    intro: 'Ayo kenali angka!',
    activities: [
      {
        prompt: 'Pilih angka yang benar.',
        instruction: 'Ini angka lima.',
        emoji: ['3', '5', '7'],
        options: ['3', '5', '7'],
        answer: '5',
        reward: 'Hebat! Ini angka lima.'
      },
      {
        prompt: 'Urutan angka mana yang benar?',
        instruction: 'Pilih urutan dari kecil ke besar.',
        emoji: ['1', '2', '3'],
        options: ['3, 1, 2', '1, 2, 3', '2, 3, 1'],
        answer: '1, 2, 3',
        reward: 'Bagus! Urutannya benar.'
      }
    ]
  },
  membilang: {
    name: 'Membilang',
    intro: 'Ayo hitung benda!',
    activities: [
      {
        prompt: 'Kiko punya 4 apel. Ada berapa apel?',
        instruction: 'Hitung jumlah apel.',
        emoji: ['🍎', '🍎', '🍎', '🍎'],
        options: ['3', '4', '5'],
        answer: '4',
        reward: 'Benar! Ada empat apel.'
      },
      {
        prompt: 'Berapa banyak bola ini?',
        instruction: 'Hitung jumlah bola.',
        emoji: ['⚽', '⚽', '⚽'],
        options: ['2', '3', '4'],
        answer: '3',
        reward: 'Hebat! Ada tiga bola.'
      }
    ]
  },
  membandingkan: {
    name: 'Membandingkan',
    intro: 'Ayo bandingkan jumlah!',
    activities: [
      {
        prompt: 'Mana yang lebih banyak?',
        instruction: 'Pilih kelompok yang lebih banyak.',
        emoji: ['🍓', '🍓', '🍓', '🍓', '🍓', '🍓'],
        options: ['Kiri', 'Kanan'],
        answer: 'Kanan',
        reward: 'Benar! Kelompok kanan lebih banyak.'
      },
      {
        prompt: 'Mana yang sama banyak?',
        instruction: 'Pilih kelompok sama banyak.',
        emoji: ['🧁', '🧁', '🧁', '🧁'],
        options: ['2 dan 3', '2 dan 2', '3 dan 4'],
        answer: '2 dan 2',
        reward: 'Hebat! Sama banyak.'
      }
    ]
  },
  operasi: {
    name: 'Operasi Sederhana',
    intro: 'Ayo tambah dan kurang!',
    activities: [
      {
        prompt: '2 + 1 = ?',
        instruction: 'Pilih hasil penjumlahan yang benar.',
        emoji: ['🍏', '🍏', '🍏'],
        options: ['2', '3', '4'],
        answer: '3',
        reward: 'Benar! 2 ditambah 1 sama dengan 3.'
      },
      {
        prompt: '5 - 2 = ?',
        instruction: 'Pilih hasil pengurangan yang benar.',
        emoji: ['🪙', '🪙', '🪙', '🪙', '🪙'],
        options: ['2', '3', '4'],
        answer: '3',
        reward: 'Hebat! 5 kurang 2 sama dengan 3.'
      }
    ]
  },
  bentuk: {
    name: 'Bentuk',
    intro: 'Ayo kenali bentuk!',
    activities: [
      {
        prompt: 'Cari bentuk segitiga.',
        instruction: 'Pilih bentuk yang benar.',
        emoji: ['🔵', '🔺', '🟩'],
        options: ['🔵', '🔺', '🟩'],
        answer: '🔺',
        reward: 'Benar! Ini segitiga.'
      },
      {
        prompt: 'Bentuk apa ini?',
        instruction: 'Pilih lingkaran.',
        emoji: ['⚪', '🔺', '⬜'],
        options: ['⚪', '🔺', '⬜'],
        answer: '⚪',
        reward: 'Hebat! Ini lingkaran.'
      }
    ]
  },
  ukuran: {
    name: 'Ukuran',
    intro: 'Ayo cari benda yang lebih besar!',
    activities: [
      {
        prompt: 'Mana yang lebih besar?',
        instruction: 'Pilih benda yang lebih besar.',
        emoji: ['🟦', '🟥'],
        options: ['🟦', '🟥'],
        answer: '🟥',
        reward: 'Benar! Ini lebih besar.'
      },
      {
        prompt: 'Mana yang lebih pendek?',
        instruction: 'Pilih yang lebih pendek.',
        emoji: ['📏', '📏'],
        options: ['Panjang', 'Pendek'],
        answer: 'Pendek',
        reward: 'Bagus! Ini lebih pendek.'
      }
    ]
  },
  pola: {
    name: 'Pola',
    intro: 'Ayo lanjutkan pola!',
    activities: [
      {
        prompt: 'Lanjutkan pola ini.',
        instruction: 'Pilih pola yang benar.',
        emoji: ['🔴', '🔵', '🔴', '🔵', '?'],
        options: ['🔴', '🔵', '🟢'],
        answer: '🔴',
        reward: 'Hebat! Polanya berulang dengan benar.'
      },
      {
        prompt: 'Pola mana yang benar?',
        instruction: 'Pilih bentuk yang tepat.',
        emoji: ['🔺', '🔺', '⬜', '⬜', '?'],
        options: ['🔺', '⬜', '🔵'],
        answer: '🔺',
        reward: 'Benar! Polanya sama.'
      }
    ]
  }
};

const state = {
  stars: 0,
  worldKey: 'bilangan',
  activityIndex: 0,
  unlocked: ['bilangan'],
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
  homeBubble.textContent = 'Ayo bermain matematika!';
  speak('Ayo bermain matematika!');
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

startBtn.addEventListener('click', () => showLesson('bilangan'));
repeatIntroBtn.addEventListener('click', () => speak('Ayo bermain matematika!'));
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
