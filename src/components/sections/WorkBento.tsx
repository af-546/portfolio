import { Link } from "react-router-dom";
import { projects } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export function WorkBento() {
  const featured = projects
    .filter((p) => p.featured != null)
    .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99));
  return (
    <section className="section-pad py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="hud-line">Live sites</p>
          <h2 className="display-xl mt-3 text-5xl sm:text-7xl">Work</h2>
        </div>
        <Link to="/work" className="font-mono text-xs uppercase tracking-widest text-gold">
          All work
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-6">
        {featured.map((p, i) => (
          <Reveal
            key={p.slug}
            delay={i * 0.05}
            className={i === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2"}
          >
            <Link
              to={`/work/${p.slug}`}
              className="group relative block h-full min-h-[240px] overflow-hidden rounded-3xl border border-white/10"
            >
              {p.thumbnail ? (
                <img
                  src={p.thumbnail}
                  alt=""
                  className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
                    i === 0 ? "min-h-[360px]" : "min-h-[240px]"
                  }`}
                />
              ) : (
                <div
                  className="h-full min-h-[240px]"
                  style={{ background: `linear-gradient(145deg, ${p.accent}55, #0a0a0a)` }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end">
                <p className="hud-line text-gold">
                  {p.year} · {p.category}
                  {p.live === false ? " · offline" : ""}
                </p>
                <h3 className={`mt-2 font-display ${i === 0 ? "text-3xl sm:text-5xl" : "text-2xl"}`}>
                  {p.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm text-paper/80">{p.summary}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
