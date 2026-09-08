import { education } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export function Education() {
  return (
    <section className="section-pad py-24">
      <p className="hud-line">Academic</p>
      <h2 className="display-xl mt-3 text-5xl sm:text-7xl">Education</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {education.map((ed, i) => (
          <Reveal key={ed.school} delay={i * 0.08}>
            <article className="h-full rounded-3xl border border-white/10 p-8">
              <p className="hud-line text-gold">{ed.dates}</p>
              <h3 className="mt-3 font-display text-3xl">{ed.school}</h3>
              <p className="mt-1 text-mist">{ed.place}</p>
              <p className="mt-4">{ed.degree}</p>
              <p className="mt-3 text-sm text-mist">{ed.note}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
