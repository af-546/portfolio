import { Link } from "react-router-dom";
import { profile } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { ContactPills } from "@/components/ui/ContactLinks";

export function ContactCTA() {
  return (
    <section className="section-pad py-24">
      <Reveal className="rounded-[2.5rem] border border-gold/30 bg-gold/5 p-8 sm:p-14">
        <p className="hud-line text-gold">Summer 2027</p>
        <h2 className="display-xl mt-4 text-5xl sm:text-7xl">How to reach me</h2>
        <p className="mt-4 max-w-2xl text-mist">
          {profile.target}. Based in {profile.location}. Open to relocation. Expected graduation{" "}
          {profile.graduation}.
        </p>
        <ul className="mt-6 space-y-2 text-sm">
          {profile.now.map((n) => (
            <li key={n}>↳ {n}</li>
          ))}
        </ul>
        <div className="mt-8">
          <ContactPills />
        </div>
        <Link to="/contact" className="mt-6 inline-block font-mono text-xs uppercase tracking-widest text-gold">
          Or use the contact form →
        </Link>
      </Reveal>
    </section>
  );
}
