import { Link, useParams } from "react-router-dom";
import { getProject } from "@/data/content";
import { usePageTitle } from "@/hooks/usePageTitle";
import { WorkThumb } from "@/components/ui/WorkThumb";

export function CaseStudyPage() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;
  usePageTitle(project ? `${project.title} | Ali Farid` : "Case study | Ali Farid");

  if (!project) {
    return (
      <div className="section-pad py-16">
        <h1 className="display-xl text-6xl">Not found</h1>
        <Link to="/work" className="mt-6 inline-block text-gold">
          Back to work
        </Link>
      </div>
    );
  }

  return (
    <article className="section-pad py-12">
      <p className="hud-line" style={{ color: project.accent }}>
        {project.year} · {project.client} · {project.category}
        {project.live === false ? " · domain currently offline" : ""}
      </p>
      <h1 className="display-xl mt-3 text-5xl sm:text-6xl">{project.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-mist">{project.summary}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {project.url && project.live !== false && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gold px-5 py-2 btn-label text-void"
          >
            Live site
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-5 py-2 btn-label"
          >
            GitHub
          </a>
        )}
        <Link
          to="/work"
          className="rounded-full border border-white/20 px-5 py-2 btn-label"
        >
          All work
        </Link>
      </div>
      <WorkThumb
        src={project.thumbnail}
        accent={project.accent}
        alt={`${project.title} homepage`}
        className="mt-8 h-56 w-full rounded-2xl border border-white/10 object-cover md:h-80"
      />
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {[
          ["Problem", project.challenge],
          ["What I did", project.approach],
          ["Outcome", project.results.join(" ")],
        ].map(([k, v]) => (
          <section key={k}>
            <p className="hud-line text-gold">{k}</p>
            <p className="mt-3 text-sm leading-relaxed">{v}</p>
          </section>
        ))}
      </div>
      <ul className="mt-10 space-y-2">
        {project.results.map((r) => (
          <li key={r} className="border-l-2 border-gold pl-4 text-sm">
            {r}
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-xs">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
