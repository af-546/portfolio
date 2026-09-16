import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/content";
import { ContactPills } from "@/components/ui/ContactLinks";
import { Magnetic } from "@/components/ui/Magnetic";
import { useApp } from "@/context/AppContext";

export function Hero() {
  const { reduced } = useApp();
  const { scrollY } = useScroll();
  const sceneY = useTransform(scrollY, [0, 420], [0, 36]);
  const titleY = useTransform(scrollY, [0, 420], [0, 18]);

  return (
    <section className="section-pad relative pb-12 pt-8">
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-medium text-mist">
        <span>Purdue CIT</span>
        <span>Expected graduation: {profile.graduation}</span>
        <span className="text-gold">Summer 2027 internships</span>
      </div>

      <div className="mt-6 grid items-start gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
        <motion.div
          style={reduced ? undefined : { y: titleY }}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="display-xl text-5xl sm:text-6xl lg:text-7xl">Ali Farid</h1>
          <p className="mt-4 font-body text-xl font-medium text-gold">{profile.title}</p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-mist">{profile.summary}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Magnetic>
              <Link to="/work" className="inline-block rounded-full bg-gold px-6 py-3 btn-label text-void">
                See work
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resume}
                className="inline-block rounded-full border border-gold/40 px-6 py-3 btn-label text-gold"
              >
                Resume PDF
              </a>
            </Magnetic>
            <Link
              to="/lab"
              className="inline-flex items-center px-2 py-3 text-[15px] font-medium text-mist hover:text-paper"
            >
              Open lab
            </Link>
          </div>
          <div className="mt-5">
            <ContactPills omit={["resume"]} />
          </div>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { y: sceneY }}
          className="relative hidden min-h-0 md:flex md:items-start md:justify-end"
        >
          <div className="aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-gold sm:max-w-[240px] lg:max-w-[252px]">
            <img
              src={profile.photoSuit}
              alt={`${profile.name}, software and IT student at Purdue`}
              className="h-full w-full object-cover object-top"
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
