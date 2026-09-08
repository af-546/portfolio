import { useEffect, useMemo, useState } from "react";

const pairs = ["USD/PKR", "EUR/USD", "GBP/USD", "USD/JPY", "USD/CAD"];

function walk(seed: number) {
  let v = seed;
  return Array.from({ length: 48 }, () => {
    v += (Math.random() - 0.48) * 0.12;
    return v;
  });
}

export function FxLab() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 900);
    return () => clearInterval(id);
  }, []);

  const rows = useMemo(
    () =>
      pairs.map((p, i) => {
        const series = walk(100 + i * 7 + (tick % 5) * 0.01);
        const last = series[series.length - 1];
        const prev = series[series.length - 2];
        return { pair: p, series, last, delta: last - prev, accounts: 12 + i * 8 };
      }),
    [tick],
  );

  const exposure = rows.reduce((s, r) => s + Math.abs(r.delta) * r.accounts, 0);

  return (
    <div className="rounded-3xl border border-white/10 p-6">
      <p className="hud-line">Askari Bank intern, 2019</p>
      <h3 className="font-display text-2xl">FX table</h3>
      <p className="mt-2 text-sm text-mist">
        Made-up numbers that look like the Excel pairs I reviewed. Not real bank data.
      </p>
      <div className="mt-4 overflow-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="text-mist">
            <tr>
              <th className="py-2">Pair</th>
              <th>Last</th>
              <th>Δ</th>
              <th>Spark</th>
              <th>Accts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.pair} className="border-t border-white/10">
                <td className="py-2 text-gold">{r.pair}</td>
                <td>{r.last.toFixed(3)}</td>
                <td className={r.delta >= 0 ? "text-aqua" : "text-signal"}>
                  {r.delta >= 0 ? "+" : ""}
                  {r.delta.toFixed(3)}
                </td>
                <td>
                  <svg viewBox="0 0 96 24" className="h-6 w-24">
                    <polyline
                      fill="none"
                      stroke="#e8c547"
                      strokeWidth="1.4"
                      points={r.series
                        .map((v, i) => `${(i / 47) * 96},${24 - ((v - 96) / 20) * 24}`)
                        .join(" ")}
                    />
                  </svg>
                </td>
                <td>{r.accounts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 font-mono text-xs text-mist">
        mock net exposure score {exposure.toFixed(2)}
      </p>
    </div>
  );
}
