import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experience, profile, projects, skills } from "@/data/content";
import { useApp } from "@/context/AppContext";
import { blip } from "@/lib/audio";

const help = `commands: help, whoami, skills, work, xp, contact, hire, clear`;

export function TerminalOverlay() {
  const { terminalOpen, setTerminalOpen } = useApp();
  const [lines, setLines] = useState<string[]>([help, ""]);
  const [cmd, setCmd] = useState("");

  const env = useMemo(
    () => ({
      whoami: `${profile.legalName}\n${profile.title}\nPurdue CIT, expected ${profile.graduation}\n${profile.location}`,
      skills: [...skills.languages, ...skills.frameworks, ...skills.concepts].join(" · "),
      work: projects.map((p) => `${p.year}  ${p.title}${p.url ? `  ${p.url}` : ""}`).join("\n"),
      xp: experience.map((e) => `${e.dates}  ${e.role} @ ${e.company}`).join("\n"),
      contact: `${profile.email}\n${profile.phone}\n${profile.linkedin}\n${profile.github}`,
      hire: `Email ${profile.email}\nCall ${profile.phone}\nLinkedIn ${profile.linkedin}\nResume ${profile.resume}\n${profile.target}`,
    }),
    [],
  );

  const run = (raw: string) => {
    const c = raw.trim().toLowerCase();
    if (!c) return;
    if (c === "clear") {
      setLines([]);
      blip("tick");
      return;
    }
    if (c === "help") {
      setLines((l) => [...l, `> ${raw}`, help]);
      return;
    }
    const key = c as keyof typeof env;
    if (env[key]) {
      setLines((l) => [...l, `> ${raw}`, env[key]]);
      blip("ok");
      return;
    }
    setLines((l) => [...l, `> ${raw}`, `not a command: ${raw}`]);
    blip("err");
  };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/60 p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setTerminalOpen(false)}
        >
          <motion.div
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-gold/30 bg-[#070707] shadow-gold"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[11px] text-mist">
              <span>ali@purdue:~</span>
              <button type="button" onClick={() => setTerminalOpen(false)}>
                close
              </button>
            </div>
            <div className="h-72 overflow-auto p-4 font-mono text-xs leading-6 text-aqua whitespace-pre-wrap">
              {lines.join("\n")}
            </div>
            <form
              className="flex border-t border-white/10"
              onSubmit={(e) => {
                e.preventDefault();
                run(cmd);
                setCmd("");
              }}
            >
              <span className="px-3 py-3 font-mono text-gold">$</span>
              <input
                autoFocus
                value={cmd}
                onChange={(e) => setCmd(e.target.value)}
                className="flex-1 bg-transparent py-3 pr-4 font-mono text-sm outline-none"
                placeholder="whoami"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
