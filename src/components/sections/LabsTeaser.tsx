import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";

const labs = [
  {
    title: "Page crawler",
    desc: "Python-style walk: fetch a page, summarize it, count subpages.",
  },
  {
    title: "Traffic lights",
    desc: "Raspberry Pi 4-way controller — normal, night, emergency.",
  },
  {
    title: "Ops / FX",
    desc: "Small SKU grid and FX table from earlier ops and bank work.",
  },
];

export function LabsTeaser() {
  return (
    <section className="section-pad py-24">
      <div className="flex items-end justify-between">
        <div>
          <p className="hud-line">Demos</p>
          <h2 className="display-xl mt-3 text-5xl sm:text-7xl">Lab</h2>
        </div>
        <Link to="/lab" className="font-mono text-xs uppercase tracking-widest text-gold">
          Open lab
        </Link>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {labs.map((l, i) => (
          <Reveal key={l.title} delay={i * 0.06}>
            <Link
              to="/lab"
              className="block rounded-3xl border border-dashed border-gold/30 p-6 hover:bg-gold/10"
            >
              <h3 className="font-display text-2xl">{l.title}</h3>
              <p className="mt-3 text-sm text-mist">{l.desc}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
