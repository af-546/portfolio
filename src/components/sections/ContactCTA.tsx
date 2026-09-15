import { Link } from "react-router-dom";
import { profile } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { ContactPills } from "@/components/ui/ContactLinks";
import { Magnetic } from "@/components/ui/Magnetic";

export function ContactCTA() {
  return (
    <section className="section-pad py-16">
      <Reveal className="rounded-3xl border border-gold/30 bg-gold/5 p-7 sm:p-12">
        <p className="kicker text-gold">Summer 2027</p>
        <h2 className="display-xl mt-3 text-5xl sm:text-6xl">How to reach me</h2>
        <p className="mt-4 max-w-2xl text-lg text-mist">
          {profile.target}. Based in {profile.location}. Open to relocation. Expected graduation:{" "}
          {profile.graduation}.
        </p>
        <ul className="mt-6 space-y-2 text-base">
          {profile.now.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
        <div className="mt-8">
          <ContactPills />
        </div>
        <Magnetic className="mt-6 inline-block">
          <Link to="/contact" className="btn-label text-gold">
            Or use the contact form
          </Link>
        </Magnetic>
      </Reveal>
    </section>
  );
}
