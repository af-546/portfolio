import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";
import { useApp } from "@/context/AppContext";

export function ExperienceRail() {
  const [active, setActive] = useState(experience[0].id);
  const job = experience.find((e) => e.id === active) ?? experience[0];
  const { reduced } = useApp();

  return (
    <section className="section-pad py-16">
      <p className="kicker">Where I have worked</p>
      <h2 className="display-xl mt-2 text-5xl sm:text-6xl">Experience</h2>
      <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative">
          <div className="absolute bottom-3 left-[7px] top-3 w-px bg-white/10" />
          {experience.map((e) => (
            <button
              key={e.id}
              onClick={() => setActive(e.id)}
              className="relative mb-7 flex w-full items-start gap-4 text-left transition hover:translate-x-1"
            >
              <span
                className="mt-1.5 h-4 w-4 rounded-full border-2"
                style={{
                  borderColor: e.accent,
                  background: active === e.id ? e.accent : "transparent",
                }}
              />
              <span>
                <span className={`block font-display text-2xl ${active === e.id ? "text-paper" : "text-mist"}`}>
                  {e.company}
                </span>
                <span className="mt-1 block text-[15px] text-mist">{e.dates}</span>
              </span>
            </button>
          ))}
        </div>
        <Reveal>
          <AnimatePresence mode="wait">
            <motion.div
              key={job.id}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              className="rounded-2xl border border-white/10 p-6 lg:sticky lg:top-32"
              style={{ boxShadow: `inset 0 0 80px ${job.accent}14` }}
            >
              <p className="text-[15px] font-medium" style={{ color: job.accent }}>
                {job.place}
              </p>
              <h3 className="mt-2 font-display text-3xl">{job.role}</h3>
              <p className="mt-1 text-mist">{job.company}</p>
              <ul className="mt-6 space-y-4 text-base leading-relaxed text-paper/90">
                {job.bullets.map((b) => (
                  <li key={b} className="border-l-2 pl-4" style={{ borderColor: job.accent }}>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
