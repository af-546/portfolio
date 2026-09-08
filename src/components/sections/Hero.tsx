import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { profile } from "@/data/content";
import { HeroScene } from "@/components/3d/HeroScene";
import { ContactPills } from "@/components/ui/ContactLinks";

export function Hero() {
  return (
    <section className="section-pad relative min-h-[calc(100vh-88px)] pb-16 pt-8">
      <div className="hud-line flex flex-wrap gap-4">
        <span>PURDUE CIT</span>
        <span>GRAD {profile.graduation.toUpperCase()}</span>
        <span className="text-gold">SU27 TECH INTERNSHIPS</span>
      </div>
      <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.h1
            className="display-xl text-[16vw] lg:text-[8.4vw]"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Ali
            <br />
            Farid
          </motion.h1>
          <p className="mt-4 font-display text-lg text-gold sm:text-xl">{profile.title}</p>
          <p className="mt-4 max-w-xl text-lg text-mist">{profile.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/work"
              className="inline-block rounded-full bg-gold px-6 py-3 font-mono text-xs uppercase tracking-widest text-void"
            >
              See work
            </Link>
            <Link
              to="/lab"
              className="inline-block rounded-full border border-white/20 px-6 py-3 font-mono text-xs uppercase tracking-widest"
            >
              Open lab
            </Link>
            <a
              href={profile.resume}
              className="inline-block rounded-full border border-gold/40 px-6 py-3 font-mono text-xs uppercase tracking-widest text-gold"
            >
              Resume PDF
            </a>
          </div>
          <div className="mt-6">
            <ContactPills />
          </div>
        </div>
        <div className="relative h-[42vh] min-h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-black pointer-events-none lg:h-[58vh]">
          <HeroScene />
          <div className="absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[10px] uppercase tracking-widest text-mist">
            <span>GitHub identity</span>
            <span>3D</span>
          </div>
        </div>
      </div>
    </section>
  );
}
