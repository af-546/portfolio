import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { projects, type Project } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { usePageTitle } from "@/hooks/usePageTitle";

const filters: Array<Project["category"] | "All"> = ["All", "Web", "Systems", "Hardware"];

export function WorkPage() {
  usePageTitle("Work — Ali Farid");
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const list = useMemo(
    () => (f === "All" ? projects : projects.filter((p) => p.category === f)),
    [f],
  );

  return (
    <div className="section-pad py-16">
      <p className="hud-line">Sites, systems, hardware</p>
      <h1 className="display-xl mt-3 text-6xl sm:text-8xl">Work</h1>
      <p className="mt-4 max-w-2xl text-mist">
        Websites I shipped for King Real Estate and Houston LEAD, plus two personal projects.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((x) => (
          <button
            key={x}
            type="button"
            onClick={() => setF(x)}
            className={`rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest ${
              f === x ? "bg-gold text-void" : "border border-white/20"
            }`}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="mt-10 space-y-4">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.04}>
            <Link
              to={`/work/${p.slug}`}
              className="group grid gap-4 overflow-hidden rounded-3xl border border-white/10 transition hover:border-gold/40 md:grid-cols-[180px_1fr_auto]"
            >
              {p.thumbnail ? (
                <img src={p.thumbnail} alt="" className="h-32 w-full object-cover md:h-full" />
              ) : (
                <div className="h-32 md:h-auto" style={{ background: p.accent }} />
              )}
              <span className="px-6 py-5">
                <span className="font-mono text-xs text-gold">
                  {p.year}
                  {p.live === false ? " · domain offline" : ""}
                </span>
                <span className="mt-1 block font-display text-3xl">{p.title}</span>
                <span className="text-sm text-mist">{p.summary}</span>
              </span>
              <span className="self-center px-6 pb-5 font-mono text-xs uppercase tracking-widest text-gold md:pb-0">
                {p.category} →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
