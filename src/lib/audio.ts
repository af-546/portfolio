let ctx: AudioContext | null = null;
let enabled = true;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export function setAudioEnabled(value: boolean) {
  enabled = value;
}

export function blip(kind: "tick" | "open" | "ok" | "err" = "tick") {
  if (!enabled) return;
  const audio = getCtx();
  if (!audio) return;
  void audio.resume();
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.connect(gain);
  gain.connect(audio.destination);
  const now = audio.currentTime;
  const map = {
    tick: { f: 420, d: 0.05, t: "triangle" as OscillatorType },
    open: { f: 220, d: 0.12, t: "sine" as OscillatorType },
    ok: { f: 660, d: 0.1, t: "square" as OscillatorType },
    err: { f: 110, d: 0.16, t: "sawtooth" as OscillatorType },
  };
  const cfg = map[kind];
  osc.type = cfg.t;
  osc.frequency.setValueAtTime(cfg.f, now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.04, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + cfg.d);
  osc.start(now);
  osc.stop(now + cfg.d + 0.02);
}
