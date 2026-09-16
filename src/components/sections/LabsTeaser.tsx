import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

const labs = [
  {
    title: "Page crawler",
    desc: "Paste a live URL. The demo fetches the page, summarizes it, and follows same-site links.",
  },
  {
    title: "Traffic lights",
    desc: "Raspberry Pi controller with sensors. Busier approaches kept a longer green.",
  },
  {
    title: "Daraz store desk",
    desc: "Order and listing stand-in from running Alliance's Daraz.pk storefront.",
  },
  {
    title: "FX table",
    desc: "Stand-in for the currency pairs I reviewed as a finance intern at Askari Bank.",
  },
];

export function LabsTeaser() {
  return (
    <section className="section-pad py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="kicker">Interactive demos</p>
          <h2 className="display-xl mt-2 text-5xl sm:text-6xl">Lab</h2>
        </div>
        <Magnetic>
          <Link to="/lab" className="btn-label text-gold">
            Open lab
          </Link>
        </Magnetic>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {labs.map((l, i) => (
          <Reveal key={l.title} delay={i * 0.05}>
            <Link
              to="/lab"
              className="card-lift group block rounded-2xl border border-gold/25 p-6 hover:bg-gold/10"
            >
              <h3 className="font-display text-2xl transition group-hover:text-gold">{l.title}</h3>
              <p className="mt-3 text-base text-mist">{l.desc}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
