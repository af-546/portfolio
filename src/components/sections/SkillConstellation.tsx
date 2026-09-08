import { useMemo, useState } from "react";
import { skillEdges, skillNodes, skills } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export function SkillConstellation() {
  const [hover, setHover] = useState<string | null>(null);
  const map = useMemo(() => Object.fromEntries(skillNodes.map((n) => [n.id, n])), []);
  const linked = useMemo(() => {
    if (!hover) return new Set<string>();
    const s = new Set<string>([hover]);
    skillEdges.forEach(([a, b]) => {
      if (a === hover) s.add(b);
      if (b === hover) s.add(a);
    });
    return s;
  }, [hover]);

  return (
    <section className="section-pad py-24">
      <p className="hud-line">Graph</p>
      <h2 className="display-xl mt-3 text-5xl sm:text-7xl">Stack</h2>
      <Reveal className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-4">
        <svg viewBox="0 0 100 100" className="h-[420px] w-full">
          {skillEdges.map(([a, b]) => {
            const A = map[a];
            const B = map[b];
            const on = !hover || linked.has(a) || linked.has(b);
            return (
              <line
                key={`${a}-${b}`}
                x1={A.x}
                y1={A.y}
                x2={B.x}
                y2={B.y}
                stroke={on ? "#e8c547" : "#ffffff18"}
                strokeWidth={on && hover ? 0.45 : 0.18}
              />
            );
          })}
          {skillNodes.map((n) => {
            const on = !hover || linked.has(n.id);
            return (
              <g
                key={n.id}
                onMouseEnter={() => setHover(n.id)}
                onMouseLeave={() => setHover(null)}
                className="cursor-none"
                data-cursor
              >
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r / 8}
                  fill={on ? "#e8c547" : "#9c9588"}
                  opacity={on ? 1 : 0.35}
                />
                <text
                  x={n.x}
                  y={n.y - n.r / 6}
                  textAnchor="middle"
                  fill="#f3eee4"
                  fontSize="2.4"
                  fontFamily="IBM Plex Mono"
                >
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(skills).map(([k, vals]) => (
          <div key={k}>
            <p className="hud-line mb-3">{k}</p>
            <div className="flex flex-wrap gap-2">
              {vals.map((v) => (
                <span key={v} className="rounded-full border border-white/15 px-3 py-1 text-xs">
                  {v}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
