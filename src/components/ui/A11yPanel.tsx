import { useApp } from "@/context/AppContext";

export function A11yPanel() {
  const {
    a11yOpen,
    setA11yOpen,
    reduced,
    setReduced,
    contrast,
    setContrast,
    largeText,
    setLargeText,
    sound,
    toggleSound,
  } = useApp();

  return (
    <div className="fixed bottom-5 left-5 z-[95]">
      <button
        type="button"
        aria-expanded={a11yOpen}
        aria-controls="a11y-panel"
        onClick={() => setA11yOpen(!a11yOpen)}
        className="rounded-full border border-white/15 bg-void/90 px-4 py-2.5 text-sm font-semibold backdrop-blur-xl hover:border-gold/50"
      >
        {a11yOpen ? "Close access" : "Access"}
      </button>
      {a11yOpen && (
        <div
          id="a11y-panel"
          className="glass absolute bottom-14 left-0 w-64 rounded-2xl p-4 shadow-gold"
        >
          <p className="text-sm font-semibold">Reading options</p>
          <p className="mt-1 text-sm text-mist">These stay on this browser until you change them.</p>
          <div className="mt-3 space-y-2">
            <Toggle
              label="Reduce motion"
              checked={reduced}
              onChange={setReduced}
            />
            <Toggle
              label="High contrast text"
              checked={contrast}
              onChange={setContrast}
            />
            <Toggle
              label="Larger text"
              checked={largeText}
              onChange={setLargeText}
            />
            <Toggle
              label="Interface sounds"
              checked={sound}
              onChange={() => toggleSound()}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm hover:bg-white/5"
    >
      <span>{label}</span>
      <span
        className={`relative h-6 w-11 rounded-full ${checked ? "bg-gold" : "bg-white/15"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}
