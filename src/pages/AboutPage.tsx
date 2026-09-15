import { profile } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { usePageTitle } from "@/hooks/usePageTitle";
import { ContactPills } from "@/components/ui/ContactLinks";

export function AboutPage() {
  usePageTitle("About | Ali Farid");
  return (
    <div className="section-pad py-12">
      <p className="kicker">About</p>
      <h1 className="display-xl mt-2 text-5xl sm:text-6xl">About</h1>
      <Reveal>
        <div className="mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-ink">
            <img
              src={profile.photoStage}
              alt={`${profile.name} in traditional dress`}
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-white/10 bg-ink">
            <img
              src={profile.photoSuit}
              alt={`${profile.name} in a navy suit`}
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </figure>
        </div>
      </Reveal>
      <div className="mt-10 max-w-2xl space-y-4 text-lg leading-relaxed text-paper/90">
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
  );
}
