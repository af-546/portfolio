import { profile } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { usePageTitle } from "@/hooks/usePageTitle";
import { ContactPills } from "@/components/ui/ContactLinks";

export function AboutPage() {
  usePageTitle("About | Ali Farid");
  return (
    <div className="section-pad py-12">
      <h1 className="display-xl text-5xl sm:text-6xl">About</h1>
      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <figure className="mx-auto max-w-md overflow-hidden rounded-2xl border border-white/10 bg-ink lg:mx-0 lg:max-w-none">
            <img
              src={profile.photoStage}
              alt={`${profile.name} in traditional dress`}
              className="aspect-[4/5] w-full object-cover object-[center_8%]"
            />
          </figure>
        </Reveal>
        <div className="space-y-4 text-lg leading-relaxed text-paper/90">
          <p className="font-display text-3xl text-gold">{profile.legalName}</p>
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="text-mist">
            {profile.location} · open to relocation · {profile.target}
          </p>
          <ContactPills />
        </div>
      </div>
    </div>
  );
}
