// Web Audio API Procedural Sound Synthesizer (0 External MP3 Files Required)

let audioContext: AudioContext | null = null;
let soundEnabled = false;

export function isAudioEnabled(): boolean {
  return soundEnabled;
}

export function toggleAudioState(): boolean {
  if (typeof window === 'undefined') return false;

  if (!audioContext) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    playHapticClick(600, 'sine', 0.1);
  }
  return soundEnabled;
}

export function playHapticClick(freq = 600, type: OscillatorType = 'sine', duration = 0.06): void {
  if (!soundEnabled || !audioContext || typeof window === 'undefined') return;

  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);

    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + duration);
  } catch (err) {
    console.error('Audio synthesizer error:', err);
  }
}
