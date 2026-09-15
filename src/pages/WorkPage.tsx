import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { projects, type Project } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { WorkThumb } from "@/components/ui/WorkThumb";
import { usePageTitle } from "@/hooks/usePageTitle";

const filters: Array<Project["category"] | "All"> = ["All", "Web", "Systems", "Hardware"];

export function WorkPage() {
  usePageTitle("Work | Ali Farid");
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const list = useMemo(
    () => (f === "All" ? projects : projects.filter((p) => p.category === f)),
    [f],
  );

  return (
    <div className="section-pad py-12">
      <p className="hud-line">Sites, systems, hardware</p>
      <h1 className="display-xl mt-2 text-5xl sm:text-6xl">Work</h1>
      <p className="mt-3 max-w-2xl text-lg text-mist">
        SoftwareDesign.io and Houston LEAD at NightHash, King Real Estate sites including Coastal Oaks
        and the Milwaukee Riverfront Plaza Google Site, plus two personal projects.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((x) => (
          <button
            key={x}
            type="button"
            onClick={() => setF(x)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              f === x ? "bg-gold text-void" : "border border-white/20"
            }`}
          >
            {x}
          </button>
        ))}
      </div>
      <div className="mt-8 space-y-3">
        {list.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.04}>
            <Link
              to={`/work/${p.slug}`}
              className="group card-lift grid gap-4 overflow-hidden rounded-2xl border border-white/10 md:grid-cols-[180px_1fr_auto]"
            >
              <WorkThumb
                src={p.thumbnail}
                accent={p.accent}
                className="h-32 w-full object-cover md:h-full"
              />
              <span className="px-6 py-5">
                <span className="text-sm font-medium text-gold">
                  {p.year}
                  {p.live === false ? " · domain offline" : ""}
                </span>
                <span className="mt-1 block font-display text-3xl">{p.title}</span>
                <span className="text-base text-mist">{p.summary}</span>
              </span>
              <span className="self-center px-6 pb-5 text-sm font-semibold text-gold md:pb-0">
                {p.category} →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
