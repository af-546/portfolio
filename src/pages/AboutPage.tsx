import { profile } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { usePageTitle } from "@/hooks/usePageTitle";
import { ContactPills } from "@/components/ui/ContactLinks";

export function AboutPage() {
  usePageTitle("About — Ali Farid");
  return (
    <div className="section-pad py-16">
      <p className="hud-line">About</p>
      <h1 className="display-xl mt-3 text-6xl sm:text-8xl">About</h1>
      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-gold/30 bg-black">
            <img src={profile.avatar} alt={profile.name} className="w-full pixelated" />
            <div className="p-5 font-mono text-[10px] uppercase tracking-widest text-mist">
              GitHub · Purdue CIT · expected {profile.graduation}
            </div>
          </div>
        </Reveal>
        <div className="space-y-5 text-lg leading-relaxed text-paper/90">
          <p className="font-display text-2xl text-gold">{profile.legalName}</p>
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
