import { Link } from "react-router-dom";
import { profile } from "@/data/content";
import { ContactLinks } from "@/components/ui/ContactLinks";

export function Footer() {
  return (
    <footer className="section-pad relative z-10 border-t border-white/10 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{profile.name}</p>
          <p className="mt-2 max-w-sm text-base text-mist">{profile.summary}</p>
        </div>
        <ContactLinks compact />
        <div className="md:text-right">
          <p className="text-sm text-mist">West Lafayette and Lahore</p>
          <p className="mt-3 text-sm text-mist">
            © {new Date().getFullYear()} {profile.legalName}
          </p>
          <Link to="/contact" className="mt-2 inline-block text-gold">
            Email / call / LinkedIn →
          </Link>
        </div>
      </div>
    </footer>
  );
}
