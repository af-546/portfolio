import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { WorkThumb } from "@/components/ui/WorkThumb";
import { Magnetic } from "@/components/ui/Magnetic";
import { useApp } from "@/context/AppContext";

export function WorkBento() {
  const featured = projects
    .filter((p) => p.featured != null)
    .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99));
  return (
    <section className="section-pad py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="kicker">Selected live work</p>
          <h2 className="display-xl mt-2 text-5xl sm:text-6xl">Work</h2>
        </div>
        <Magnetic>
          <Link to="/work" className="btn-label text-gold">
            All work
          </Link>
        </Magnetic>
      </div>
      <div className="grid gap-4 md:grid-cols-6">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.04} className={i === 0 ? "md:col-span-4 md:row-span-2" : "md:col-span-2"}>
            <WorkCard
              to={`/work/${p.slug}`}
              thumbnail={p.thumbnail}
              accent={p.accent}
              year={p.year}
              category={p.category}
              offline={p.live === false}
              title={p.title}
              summary={p.summary}
              featured={i === 0}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WorkCard({
  to,
  thumbnail,
  accent,
  year,
  category,
  offline,
  title,
  summary,
  featured,
}: {
  to: string;
  thumbnail?: string;
  accent: string;
  year: string;
  category: string;
  offline: boolean;
  title: string;
  summary: string;
  featured: boolean;
}) {
  const { reduced } = useApp();
  const [spot, setSpot] = useState({ x: 50, y: 80 });
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      to={to}
      className="group relative block h-full overflow-hidden rounded-2xl border border-white/10"
      onMouseMove={(e) => {
        if (reduced) return;
        const box = e.currentTarget.getBoundingClientRect();
        setSpot({
          x: ((e.clientX - box.left) / box.width) * 100,
          y: ((e.clientY - box.top) / box.height) * 100,
        });
      }}
    >
      <WorkThumb
        src={thumbnail}
        accent={accent}
        className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.06] ${
          featured ? "min-h-[380px]" : "min-h-[210px]"
        }`}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 55%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-5 flex flex-col justify-end sm:p-6">
        <p className="text-sm font-medium text-gold">
          {year} · {category}
          {offline ? " · offline" : ""}
        </p>
        <h3 className={`mt-1.5 font-display ${featured ? "text-3xl sm:text-5xl" : "text-2xl"}`}>
          {title}
        </h3>
        <p className={`mt-2 max-w-lg text-paper/85 ${featured ? "text-base" : "line-clamp-2 text-sm"}`}>
          {summary}
        </p>
      </div>
    </Link>
  );
}
