(() => {
  const STORAGE_KEY = 'grade1MathSoundEnabled';
  const templates = {
    click: [{ frequency: 540, duration: .06, volume: .035, waveform: 'square' }],
    open: [{ frequency: 300, duration: .08, volume: .03, waveform: 'sine', slide: .25 }, { frequency: 440, duration: .1, volume: .025, waveform: 'sine', slide: .18 }],
    select: [{ frequency: 640, duration: .07, volume: .028, waveform: 'sine' }],
    correct: [{ frequency: 480, duration: .08, volume: .03, waveform: 'triangle', slide: .28 }, { frequency: 620, duration: .1, volume: .03, waveform: 'triangle', slide: .18 }, { frequency: 820, duration: .1, volume: .024, waveform: 'triangle', slide: .12 }],
    wrong: [{ frequency: 380, duration: .08, volume: .028, waveform: 'triangle', slide: -.18 }, { frequency: 250, duration: .12, volume: .026, waveform: 'triangle', slide: -.25 }],
    back: [{ frequency: 430, duration: .08, volume: .03, waveform: 'triangle', slide: -.18 }, { frequency: 290, duration: .11, volume: .028, waveform: 'triangle', slide: -.25 }]
  };
  let context;
  let enabled = localStorage.getItem(STORAGE_KEY) !== 'false';

  const getContext = () => {
    if (!context) {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return null;
      context = new AudioCtor();
    }
    if (context.state === 'suspended') context.resume().catch(() => {});
    return context;
  };

  const play = (name = 'click') => {
    if (!enabled) return;
    const audio = getContext();
    if (!audio) return;
    (templates[name] || templates.click).forEach((part, index) => {
      const start = audio.currentTime + index * .02;
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.type = part.waveform;
      oscillator.frequency.setValueAtTime(part.frequency * (1 + (part.slide || 0)), start);
      gain.gain.setValueAtTime(.0001, start);
      gain.gain.exponentialRampToValueAtTime(part.volume, start + .012);
      gain.gain.exponentialRampToValueAtTime(.0001, start + part.duration);
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.start(start);
      oscillator.stop(start + part.duration + .02);
    });
  };

  document.addEventListener('pointerdown', (event) => {
    const target = event.target.closest('button, a');
    if (!target) return;
    if (target.matches('.answer-button')) play('select');
    else if (target.matches('.subject-play, .primary-cta')) play('open');
    else if (target.matches('.grade1-math-back')) play('back');
    else play('click');
  });

  window.Grade1MathSound = {
    play,
    setEnabled(value) {
      enabled = Boolean(value);
      localStorage.setItem(STORAGE_KEY, String(enabled));
    },
    getEnabled: () => enabled
  };
})();