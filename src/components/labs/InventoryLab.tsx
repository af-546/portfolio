import { useMemo, useState } from "react";

const factories = ["Lahore-A", "Lahore-B", "Sialkot", "Faisalabad", "Karachi"];

export function InventoryLab() {
  const [noise, setNoise] = useState(0.02);
  const skus = useMemo(() => {
    return Array.from({ length: 64 }, (_, i) => {
      const err = Math.random() < noise;
      return {
        id: 500 + i,
        factory: factories[i % factories.length],
        ok: !err,
      };
    });
  }, [noise]);
  const acc = Math.round((skus.filter((s) => s.ok).length / skus.length) * 100);

  return (
    <div className="rounded-3xl border border-white/10 p-6">
      <p className="hud-line">Alliance Distributors</p>
      <h3 className="font-display text-2xl">SKU grid</h3>
      <p className="mt-2 text-sm text-mist">
        64-cell stand-in for the SKU board I used at Alliance. Drag noise to see error cells.
      </p>
      <input
        type="range"
        min={0}
        max={0.2}
        step={0.01}
        value={noise}
        onChange={(e) => setNoise(Number(e.target.value))}
        className="mt-4 w-full accent-gold"
      />
      <div className="mt-4 grid grid-cols-8 gap-1">
        {skus.map((s) => (
          <div
            key={s.id}
            title={`${s.id} ${s.factory}`}
            className={`aspect-square rounded-sm ${s.ok ? "bg-aqua/80" : "bg-signal"}`}
          />
        ))}
      </div>
      <p className="mt-4 font-mono text-xs text-mist">accuracy {acc}% · noise {(noise * 100).toFixed(0)}%</p>
    </div>
  );
}
