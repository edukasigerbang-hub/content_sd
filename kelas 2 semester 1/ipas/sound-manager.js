(function () {
  const STORAGE_KEY = "ipas_sound_enabled";
  const DEFAULT_ENABLED = true;
  const SOUND_BOOST = {
    volume: 1.35,
    duration: 1.2,
  };
  const DEBOUNCE_MS = {
    "object-click": 180,
    "select": 180,
    "button-hover": 250,
    "button-click": 80,
  };

  const templates = {
    "button-click": [
      { frequency: 540, duration: 0.06, volume: 0.035, waveform: "square" },
    ],
    "button-hover": [
      { frequency: 760, duration: 0.05, volume: 0.018, waveform: "sine" },
    ],
    "back": [
      { frequency: 430, duration: 0.08, volume: 0.03, waveform: "triangle", slide: -0.18 },
      { frequency: 290, duration: 0.11, volume: 0.028, waveform: "triangle", slide: -0.25 },
    ],
    "next": [
      { frequency: 280, duration: 0.08, volume: 0.03, waveform: "triangle", slide: 0.18 },
      { frequency: 430, duration: 0.11, volume: 0.028, waveform: "triangle", slide: 0.25 },
    ],
    "open": [
      { frequency: 290, duration: 0.09, volume: 0.028, waveform: "sine", slide: 0.25 },
      { frequency: 430, duration: 0.12, volume: 0.024, waveform: "sine", slide: 0.18 },
    ],
    "close": [
      { frequency: 430, duration: 0.08, volume: 0.026, waveform: "triangle", slide: -0.18 },
      { frequency: 290, duration: 0.12, volume: 0.022, waveform: "triangle", slide: -0.2 },
    ],
    "object-click": [
      { frequency: 420, duration: 0.07, volume: 0.03, waveform: "triangle" },
    ],
    "select": [
      { frequency: 640, duration: 0.07, volume: 0.028, waveform: "sine" },
    ],
    "correct": [
      { frequency: 480, duration: 0.08, volume: 0.03, waveform: "triangle", slide: 0.28 },
      { frequency: 620, duration: 0.1, volume: 0.03, waveform: "triangle", slide: 0.18 },
      { frequency: 820, duration: 0.1, volume: 0.024, waveform: "triangle", slide: 0.12 },
    ],
    "wrong": [
      { frequency: 380, duration: 0.08, volume: 0.028, waveform: "triangle", slide: -0.18 },
      { frequency: 250, duration: 0.12, volume: 0.026, waveform: "triangle", slide: -0.25 },
    ],
    "match": [
      { frequency: 420, duration: 0.07, volume: 0.03, waveform: "triangle", slide: 0.2 },
      { frequency: 560, duration: 0.1, volume: 0.03, waveform: "triangle", slide: 0.18 },
    ],
    "drag-drop": [
      { frequency: 510, duration: 0.08, volume: 0.03, waveform: "triangle", slide: 0.2 },
      { frequency: 720, duration: 0.1, volume: 0.03, waveform: "triangle", slide: 0.15 },
    ],
    "activity-complete": [
      { frequency: 420, duration: 0.08, volume: 0.024, waveform: "sine", slide: 0.12 },
      { frequency: 560, duration: 0.08, volume: 0.024, waveform: "sine", slide: 0.12 },
      { frequency: 700, duration: 0.12, volume: 0.024, waveform: "sine", slide: 0.1 },
    ],
    "star-earned": [
      { frequency: 660, duration: 0.09, volume: 0.028, waveform: "triangle", slide: 0.18 },
      { frequency: 820, duration: 0.08, volume: 0.028, waveform: "triangle", slide: 0.12 },
      { frequency: 980, duration: 0.12, volume: 0.026, waveform: "triangle", slide: 0.1 },
    ],
    "level-complete": [
      { frequency: 310, duration: 0.11, volume: 0.03, waveform: "triangle", slide: 0.1 },
      { frequency: 480, duration: 0.12, volume: 0.03, waveform: "triangle", slide: 0.12 },
      { frequency: 620, duration: 0.15, volume: 0.025, waveform: "triangle", slide: 0.1 },
    ],
    "celebration": [
      { frequency: 430, duration: 0.08, volume: 0.026, waveform: "sine", slide: 0.12 },
      { frequency: 620, duration: 0.09, volume: 0.026, waveform: "sine", slide: 0.12 },
      { frequency: 820, duration: 0.13, volume: 0.024, waveform: "sine", slide: 0.12 },
    ],
    "confetti": [
      { frequency: 520, duration: 0.08, volume: 0.022, waveform: "triangle", slide: 0.14 },
      { frequency: 690, duration: 0.08, volume: 0.022, waveform: "triangle", slide: 0.12 },
      { frequency: 860, duration: 0.08, volume: 0.02, waveform: "triangle", slide: 0.12 },
    ],
    "start": [
      { frequency: 320, duration: 0.09, volume: 0.03, waveform: "triangle", slide: 0.15 },
      { frequency: 440, duration: 0.09, volume: 0.03, waveform: "triangle", slide: 0.12 },
      { frequency: 540, duration: 0.11, volume: 0.028, waveform: "triangle", slide: 0.1 },
    ],
    "finish": [
      { frequency: 520, duration: 0.1, volume: 0.028, waveform: "triangle", slide: 0.18 },
      { frequency: 700, duration: 0.12, volume: 0.028, waveform: "triangle", slide: 0.14 },
    ],
  };

  const state = {
    enabled: readStoredState(),
    context: null,
    toggleButton: null,
    lastPlayed: {},
    initialized: false,
  };

  function readStoredState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) return DEFAULT_ENABLED;
      return raw !== "false";
    } catch (error) {
      return DEFAULT_ENABLED;
    }
  }

  function saveStoredState() {
    try {
      localStorage.setItem(STORAGE_KEY, String(state.enabled));
    } catch (error) {
      // ignore storage errors
    }
  }

  function getAudioContext() {
    if (!state.context) {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return null;
      state.context = new AudioCtor();
    }
    if (state.context.state === "suspended") {
      state.context.resume().catch(() => {});
    }
    return state.context;
  }

  function getLabel() {
    return state.enabled ? "🔊" : "🔇";
  }

  function updateToggleButton() {
    if (!state.toggleButton) return;
    state.toggleButton.textContent = getLabel();
    state.toggleButton.setAttribute(
      "aria-label",
      state.enabled ? "Matikan suara" : "Nyalakan suara",
    );
    state.toggleButton.title = state.enabled ? "Sound ON" : "Sound OFF";
  }

  function createToggleButton() {
    if (state.toggleButton) return;

    const host = document.querySelector("#ipas-app") || document.body;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "ipas-sound-toggle";
    button.textContent = getLabel();
    button.setAttribute("aria-label", state.enabled ? "Matikan suara" : "Nyalakan suara");
    button.title = state.enabled ? "Sound ON" : "Sound OFF";
    button.style.position = "absolute";
    button.style.top = "14px";
    button.style.right = "18px";
    button.style.zIndex = "7";
    button.style.border = "0";
    button.style.borderRadius = "999px";
    button.style.background = "rgba(255,255,255,0.9)";
    button.style.boxShadow = "0 6px 14px rgba(28, 96, 150, 0.18)";
    button.style.padding = "8px 12px";
    button.style.fontSize = "20px";
    button.style.lineHeight = "1";
    button.style.cursor = "pointer";
    button.style.fontWeight = "900";
    button.style.transform = "translateY(0)";
    button.style.transition = "transform 0.15s ease";

    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setEnabled(!state.enabled);
      play("button-click", { debounceMs: 120 });
    });

    button.addEventListener("pointerdown", () => {
      getAudioContext();
    });

    host.appendChild(button);
    state.toggleButton = button;
    updateToggleButton();
  }

  function setEnabled(nextEnabled) {
    state.enabled = Boolean(nextEnabled);
    saveStoredState();
    updateToggleButton();
  }

  function play(name, options = {}) {
    const soundName = templates[name] ? name : "button-click";
    const config = options || {};
    if (!state.enabled) return;

    const now = performance.now();
    const debounceMs = config.debounceMs ?? DEBOUNCE_MS[soundName] ?? 0;
    const last = state.lastPlayed[soundName] || 0;
    if (debounceMs && now - last < debounceMs) {
      return;
    }
    state.lastPlayed[soundName] = now;

    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const pattern = templates[soundName] || templates["button-click"];
      pattern.forEach((part, index) => {
        const startAt = ctx.currentTime + (part.start || index * 0.02 || 0);
        const effectiveDuration = (part.duration || 0.08) * SOUND_BOOST.duration;
        const effectiveVolume = Math.max(0.0001, (part.volume || 0.02) * SOUND_BOOST.volume);
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        oscillator.type = part.waveform || "triangle";
        oscillator.frequency.setValueAtTime(
          (part.frequency || 440) * (1 + (part.slide || 0)),
          startAt,
        );

        gain.gain.setValueAtTime(0.0001, startAt);
        gain.gain.exponentialRampToValueAtTime(
          effectiveVolume,
          startAt + 0.012,
        );
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          startAt + effectiveDuration,
        );

        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start(startAt);
        oscillator.stop(startAt + effectiveDuration + 0.02);
      });
    } catch (error) {
      // fail silently to avoid breaking experience
    }
  }

  function bindGenericInputs() {
    document.addEventListener("pointerover", (event) => {
      const element = event.target.closest(
        ".map-level, .module-action, .module-next, .btn-general, .module-button",
      );
      if (!element) return;
      if (element.closest(".ipas-sound-toggle")) return;
      play("button-hover", { debounceMs: 250 });
    });

    document.addEventListener("click", (event) => {
      const target = event.target.closest("button, a");
      if (!target || target.closest(".ipas-sound-toggle")) return;

      if (target.closest(".map-level")) {
        play("open", { debounceMs: 120 });
        return;
      }

      if (target.closest(".module-button") || target.closest(".module-next")) {
        play("close", { debounceMs: 120 });
        return;
      }

      if (target.id === "previousButton") {
        play("back", { debounceMs: 80 });
        return;
      }

      if (target.id === "nextButton") {
        play("next", { debounceMs: 80 });
        return;
      }

      if (target.closest(".module-action") && target.dataset.go === "1") {
        play("start", { debounceMs: 120 });
        return;
      }

      if (target.closest(".visual-card") || target.closest(".observe") || target.closest(".match-card")) {
        play("object-click", { debounceMs: 180 });
        return;
      }

      if (target.closest(".quiz-option")) {
        play("select", { debounceMs: 120 });
        return;
      }

      play("button-click", { debounceMs: 80 });
    });
  }

  function init() {
    if (state.initialized) return;
    state.initialized = true;

    createToggleButton();
    bindGenericInputs();
    getAudioContext();
  }

  window.IPASSoundManager = {
    init,
    play,
    setEnabled,
    getEnabled: () => state.enabled,
    toggle: () => setEnabled(!state.enabled),
  };

  init();
})();
