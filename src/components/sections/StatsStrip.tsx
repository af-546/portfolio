import { stats } from "@/data/content";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export function StatsStrip() {
  return (
    <section className="section-pad grid gap-6 border-y border-white/10 py-10 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08}>
          <p className="font-display text-4xl text-gold sm:text-5xl">
            <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
          </p>
          <p className="mt-2 hud-line">{s.label}</p>
        </Reveal>
      ))}
    </section>
  );
}
