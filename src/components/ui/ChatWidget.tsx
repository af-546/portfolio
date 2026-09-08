import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/content";
import { useApp } from "@/context/AppContext";
import { ContactPills } from "@/components/ui/ContactLinks";

type Msg = { from: "you" | "af"; text: string; extra?: ReactNode };

export function ChatWidget() {
  const { chatOpen, setChatOpen } = useApp();
  const [log, setLog] = useState<Msg[]>([
    {
      from: "af",
      text: "Hi — I can point you to work, school, or how to get in touch.",
    },
  ]);

  const prompts: { q: string; a: string; extra?: ReactNode }[] = [
    {
      q: "Who is Ali?",
      a: `${profile.legalName}. Purdue CIT, expected ${profile.graduation}. Software developer at NightHash. ${profile.target}.`,
    },
    {
      q: "School / GPA?",
      a: `Purdue University, B.S. Computing & Information Technology, expected ${profile.graduation}. Transferred from Montclair State (GPA 3.94/4.0).`,
    },
    {
      q: "What did he ship?",
      a: "Houston LEAD, plus King Real Estate sites: kingre.org, theoobinn.com, seabreezemotel.com, coastal-oaks.com, Milwaukee Riverfront Plaza, and sacolofts.com. Also a Python page crawler and a Raspberry Pi traffic-light controller.",
    },
    {
      q: "How do I reach him?",
      a: "Email, call, LinkedIn, GitHub, or the resume — all of these open directly:",
      extra: <ContactPills />,
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-5 right-5 z-[95] rounded-full border border-gold bg-void px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-gold shadow-gold"
      >
        {chatOpen ? "Close" : "Ask Ali"}
      </button>
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="glass fixed bottom-20 right-5 z-[95] w-[min(92vw,360px)] overflow-hidden rounded-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
          >
            <div className="max-h-72 space-y-3 overflow-auto p-4 text-sm">
              {log.map((m, i) => (
                <div key={i}>
                  <p className={m.from === "af" ? "text-aqua" : "text-paper"}>
                    <span className="hud-line mr-2">{m.from === "af" ? "ali" : "you"}</span>
                    {m.text}
                  </p>
                  {m.extra && <div className="mt-2">{m.extra}</div>}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-white/10 p-3">
              {prompts.map((r) => (
                <button
                  key={r.q}
                  type="button"
                  className="rounded-lg bg-white/5 px-2 py-2 text-left text-[11px] hover:bg-gold/20"
                  onClick={() =>
                    setLog((l) => [
                      ...l,
                      { from: "you", text: r.q },
                      { from: "af", text: r.a, extra: r.extra },
                    ])
                  }
                >
                  {r.q}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
