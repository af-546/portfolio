import { useEffect, useMemo, useState } from "react";

type Light = "red" | "yellow" | "green";
type Mode = "adaptive" | "night" | "emergency";
type Axis = "ns" | "ew";

const BASE_GREEN = 1800;
const PER_CAR = 420;
const MAX_GREEN = 5200;
const YELLOW_MS = 900;
const MAX_QUEUE = 12;

function greenFor(queue: number) {
  return Math.min(MAX_GREEN, BASE_GREEN + queue * PER_CAR);
}

function spawnCount() {
  const r = Math.random();
  if (r < 0.84) return 0;
  if (r < 0.97) return 1;
  return 2;
}

export function TrafficLab() {
  const [mode, setMode] = useState<Mode>("adaptive");
  const [ns, setNs] = useState<Light>("green");
  const [ew, setEw] = useState<Light>("red");
  const [axis, setAxis] = useState<Axis>("ns");
  const [phase, setPhase] = useState<"green" | "yellow">("green");
  const [queues, setQueues] = useState({ n: 4, s: 3, e: 2, w: 1 });
  const [holdMs, setHoldMs] = useState(greenFor(7));

  useEffect(() => {
    let elapsed = 0;
    let localAxis: Axis = "ns";
    let localPhase: "green" | "yellow" = "green";
    let localQueues = { n: 4, s: 3, e: 2, w: 1 };
    let hold = greenFor(7);

    const id = window.setInterval(() => {
      elapsed += 280;

      localQueues = {
        n: Math.min(MAX_QUEUE, localQueues.n + spawnCount()),
        s: Math.min(MAX_QUEUE, localQueues.s + spawnCount()),
        e: Math.min(MAX_QUEUE, localQueues.e + spawnCount()),
        w: Math.min(MAX_QUEUE, localQueues.w + spawnCount()),
      };

      if (mode === "emergency") {
        setNs("red");
        setEw("red");
        setQueues(localQueues);
        setHoldMs(0);
        return;
      }

      if (mode === "night") {
        const flash = Math.floor(elapsed / 700) % 2 === 0;
        setNs(flash ? "yellow" : "red");
        setEw(flash ? "red" : "yellow");
        setQueues(localQueues);
        setHoldMs(700);
        return;
      }

      const nsCars = localQueues.n + localQueues.s;
      const ewCars = localQueues.e + localQueues.w;

      if (localPhase === "green") {
        if (localAxis === "ns") {
          localQueues = {
            ...localQueues,
            n: Math.max(0, localQueues.n - 1),
            s: Math.max(0, localQueues.s - 1),
          };
          setNs("green");
          setEw("red");
        } else {
          localQueues = {
            ...localQueues,
            e: Math.max(0, localQueues.e - 1),
            w: Math.max(0, localQueues.w - 1),
          };
          setNs("red");
          setEw("green");
        }
        if (elapsed >= hold) {
          localPhase = "yellow";
          elapsed = 0;
          hold = YELLOW_MS;
        }
      } else {
        if (localAxis === "ns") {
          setNs("yellow");
          setEw("red");
        } else {
          setNs("red");
          setEw("yellow");
        }
        if (elapsed >= YELLOW_MS) {
          localAxis = localAxis === "ns" ? "ew" : "ns";
          localPhase = "green";
          elapsed = 0;
          const nextQueue = localAxis === "ns" ? nsCars : ewCars;
          hold = greenFor(nextQueue);
        }
      }

      setAxis(localAxis);
      setPhase(localPhase);
      setHoldMs(hold);
      setQueues({ ...localQueues });
    }, 280);

    return () => window.clearInterval(id);
  }, [mode]);

  const nsQueue = queues.n + queues.s;
  const ewQueue = queues.e + queues.w;
  const heavier = nsQueue === ewQueue ? "even" : nsQueue > ewQueue ? "North / South" : "East / West";

  const cars = useMemo(
    () =>
      (["n", "s", "e", "w"] as const).flatMap((dir) =>
        Array.from({ length: queues[dir] }, (_, i) => ({ dir, i })),
      ),
    [queues],
  );

  return (
    <div className="rounded-2xl border border-white/10 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="hud-line">Raspberry Pi · Python · GPIO · sensors</p>
          <h3 className="mt-1 font-display text-2xl">Traffic lights</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["adaptive", "night", "emergency"] as Mode[]).map((m) => (
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
      <p className="mt-2 text-sm text-mist">
        Built on a Raspberry Pi with real sensors at each approach. If one direction had more
        traffic, that signal stayed green longer. Adaptive mode here does the same thing.
      </p>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid place-items-center">
          <svg viewBox="0 0 240 240" className="h-64 w-64">
            <rect x="0" y="0" width="240" height="240" fill="#12151c" rx="16" />
            <rect x="104" y="0" width="32" height="240" fill="#1d2230" />
            <rect x="0" y="104" width="240" height="32" fill="#1d2230" />
            <rect x="118" y="8" width="4" height="88" fill="#e08a5d33" />
            <rect x="118" y="144" width="4" height="88" fill="#e08a5d33" />
            <rect x="8" y="118" width="88" height="4" fill="#e08a5d33" />
            <rect x="144" y="118" width="88" height="4" fill="#e08a5d33" />
            {cars.map(({ dir, i }) => {
              const gap = 9;
              if (dir === "n") return <rect key={`${dir}${i}`} x={110} y={88 - i * gap} width="8" height="6" rx="1" fill="#d7e6f8" />;
              if (dir === "s") return <rect key={`${dir}${i}`} x={122} y={146 + i * gap} width="8" height="6" rx="1" fill="#d7e6f8" />;
              if (dir === "e") return <rect key={`${dir}${i}`} x={146 + i * gap} y={110} width="6" height="8" rx="1" fill="#d7e6f8" />;
              return <rect key={`${dir}${i}`} x={88 - i * gap} y={122} width="6" height="8" rx="1" fill="#d7e6f8" />;
            })}
            <LightStack x={111} y={14} color={ns} />
            <LightStack x={111} y={176} color={ns} />
            <LightStack x={14} y={111} color={ew} horizontal />
            <LightStack x={176} y={111} color={ew} horizontal />
          </svg>
        </div>
        <div className="space-y-3">
          {(
            [
              ["North", queues.n, axis === "ns" && ns === "green"],
              ["South", queues.s, axis === "ns" && ns === "green"],
              ["East", queues.e, axis === "ew" && ew === "green"],
              ["West", queues.w, axis === "ew" && ew === "green"],
            ] as const
          ).map(([label, count, hot]) => (
            <div key={label}>
              <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-widest text-mist">
                <span>{label} sensor</span>
                <span className={hot ? "text-gold" : ""}>{count} cars</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full ${hot ? "bg-aqua" : "bg-gold"}`}
                  style={{ width: `${(count / MAX_QUEUE) * 100}%` }}
                />
              </div>
            </div>
          ))}
          <p className="pt-1 text-sm text-mist">
            {mode === "adaptive"
              ? `Heavier approach: ${heavier}. Green hold about ${(holdMs / 1000).toFixed(1)}s${
                  phase === "yellow" ? ", now yellow" : ""
                }.`
              : `Mode: ${mode}. Sensors still count cars, but the timing rule is off.`}
          </p>
        </div>
      </div>
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
        fill="#0b0d12"
        stroke="#e08a5d33"
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
