import { useEffect, useState } from "react";

type Light = "red" | "yellow" | "green";
type Mode = "normal" | "night" | "emergency";

const cycle: Light[] = ["green", "yellow", "red"];

function nextLight(cur: Light) {
  return cycle[(cycle.indexOf(cur) + 1) % cycle.length];
}

export function TrafficLab() {
  const [mode, setMode] = useState<Mode>("normal");
  const [ns, setNs] = useState<Light>("green");
  const [ew, setEw] = useState<Light>("red");
  const [ms, setMs] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      setMs(performance.now() - start);
      if (mode === "emergency") {
        setNs("red");
        setEw("red");
        return;
      }
      if (mode === "night") {
        setNs((l) => (l === "yellow" ? "red" : "yellow"));
        setEw((l) => (l === "red" ? "yellow" : "red"));
        return;
      }
      setNs((n) => {
        const nxt = nextLight(n);
        setEw(nxt === "green" ? "red" : nxt === "red" ? "green" : "red");
        return nxt;
      });
    }, mode === "night" ? 700 : 1100);
    return () => clearInterval(id);
  }, [mode]);

  return (
    <div className="rounded-3xl border border-white/10 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="hud-line">Raspberry Pi · Python · GPIO</p>
          <h3 className="font-display text-2xl">Traffic lights</h3>
        </div>
        <div className="flex gap-2">
          {(["normal", "night", "emergency"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${
                mode === m ? "bg-gold text-void" : "border border-white/20"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 grid place-items-center">
        <svg viewBox="0 0 220 220" className="h-64 w-64">
          <rect x="95" y="0" width="30" height="220" fill="#1a1a1a" />
          <rect x="0" y="95" width="220" height="30" fill="#1a1a1a" />
          <LightStack x={102} y={12} color={ns} />
          <LightStack x={102} y={158} color={ns} />
          <LightStack x={12} y={102} color={ew} horizontal />
          <LightStack x={158} y={102} color={ew} horizontal />
        </svg>
      </div>
      <p className="mt-4 text-sm text-mist">
        Mode: {mode} · running {(ms / 1000).toFixed(0)}s. Same three modes as the Pi sketch.
      </p>
    </div>
  );
}

function LightStack({
  x,
  y,
  color,
  horizontal,
}: {
  x: number;
  y: number;
  color: Light;
  horizontal?: boolean;
}) {
  const colors: Light[] = ["red", "yellow", "green"];
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={horizontal ? 50 : 16}
        height={horizontal ? 16 : 50}
        rx="4"
        fill="#111"
        stroke="#e8c54733"
      />
      {colors.map((c, i) => (
        <circle
          key={c}
          cx={horizontal ? 10 + i * 16 : 8}
          cy={horizontal ? 8 : 10 + i * 16}
          r="5"
          fill={color === c ? c : "#222"}
        />
      ))}
    </g>
  );
}
