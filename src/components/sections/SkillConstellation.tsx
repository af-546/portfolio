import { useMemo, useState } from "react";
import { skillContexts, skills } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

export function SkillConstellation() {
  const [hover, setHover] = useState<string | null>(null);
  const related = useMemo(() => {
    if (!hover) return new Set<string>();
    return new Set(
      skillContexts.filter((ctx) => ctx.items.some((item) => item.toLowerCase() === hover.toLowerCase())).map((c) => c.place),
    );
  }, [hover]);

  return (
    <section className="section-pad py-16">
      <p className="kicker">Tools in context</p>
      <h2 className="display-xl mt-2 text-5xl sm:text-6xl">Skills</h2>
      <p className="mt-3 max-w-2xl text-base text-mist">
        Hover a language or tool to see where I used it.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Object.entries(skills).map(([k, vals], i) => (
          <Reveal key={k} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:border-gold/40 hover:bg-gold/[0.05]">
              <p className="mb-3 text-sm font-semibold capitalize text-gold">{k}</p>
              <div className="flex flex-wrap gap-2">
                {vals.map((v) => (
                  <Magnetic key={v} strength={0.28}>
                    <button
                      type="button"
                      onMouseEnter={() => setHover(v)}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover(v)}
                      onBlur={() => setHover(null)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        hover === v
                          ? "border-gold bg-gold text-void"
                          : "border-white/12 hover:border-gold/50 hover:text-gold"
                      }`}
                    >
                      {v}
                    </button>
                  </Magnetic>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {skillContexts.map((ctx, i) => {
          const on = !hover || related.size === 0 || related.has(ctx.place) || ctx.items.includes(hover);
          return (
            <Reveal key={ctx.place} delay={0.08 + i * 0.04}>
              <article
                className={`rounded-2xl border p-5 transition duration-300 ${
                  on
                    ? "border-gold/40 bg-gold/[0.07] shadow-gold"
                    : "border-white/10 opacity-45"
                }`}
              >
                <p className="font-display text-2xl">{ctx.place}</p>
                <p className="mt-1 text-base text-mist">{ctx.detail}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ctx.items.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onMouseEnter={() => setHover(item)}
                      onMouseLeave={() => setHover(null)}
                      className={`rounded-full px-3 py-1.5 text-sm transition ${
                        hover === item ? "bg-gold text-void" : "bg-gold/10 text-gold hover:bg-gold/20"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
