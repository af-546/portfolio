import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export function ExperienceRail() {
  const [active, setActive] = useState(experience[0].id);
  const job = experience.find((e) => e.id === active) ?? experience[0];

  return (
    <section className="section-pad py-24">
      <p className="hud-line">Timeline</p>
      <h2 className="display-xl mt-3 text-5xl sm:text-7xl">Experience</h2>
      <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative">
          <div className="absolute bottom-3 left-[7px] top-3 w-px bg-white/10" />
          {experience.map((e) => (
            <button
              key={e.id}
              onClick={() => setActive(e.id)}
              className="relative mb-6 flex w-full items-start gap-4 text-left"
            >
              <span
                className="mt-1 h-4 w-4 rounded-full border-2"
                style={{
                  borderColor: e.accent,
                  background: active === e.id ? e.accent : "transparent",
                }}
              />
              <span>
                <span className="block font-display text-xl">{e.company}</span>
                <span className="hud-line">{e.dates}</span>
              </span>
            </button>
          ))}
        </div>
        <Reveal>
          <AnimatePresence mode="wait">
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="rounded-3xl border border-white/10 p-8"
              style={{ boxShadow: `inset 0 0 80px ${job.accent}14` }}
            >
              <p className="hud-line" style={{ color: job.accent }}>
                {job.place}
              </p>
              <h3 className="mt-2 font-display text-3xl">{job.role}</h3>
              <p className="mt-1 text-mist">{job.company}</p>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-paper/85">
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
