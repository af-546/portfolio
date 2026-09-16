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
      text: "Hi. I can point you to work, school, or how to get in touch.",
    },
  ]);

  const prompts: { q: string; a: string; extra?: ReactNode }[] = [
    {
      q: "Who is Ali?",
      a: `${profile.legalName}. Purdue CIT, expected graduation ${profile.graduation}. Recently a software developer at NightHash. ${profile.target}.`,
    },
    {
      q: "School / GPA?",
      a: `Purdue University, B.S. Computing and Information Technology. Expected graduation: ${profile.graduation}. Transferred from Montclair State (GPA 3.94/4.0).`,
    },
    {
      q: "What have you shipped?",
      a: "At NightHash I shipped SoftwareDesign.io and Houston LEAD. At King Real Estate I built kingre.org, theoobinn.com, seabreezemotel.com, coastal-oaks.com, and a Milwaukee Riverfront Plaza Google Site. I also built a Python page crawler and a Raspberry Pi traffic-light controller.",
    },
    {
      q: "How do I reach you?",
      a: "Email, call, LinkedIn, GitHub, or the resume. All of these open directly:",
      extra: <ContactPills />,
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-5 right-5 z-[95] rounded-full border border-gold bg-void px-4 py-2.5 text-sm font-semibold text-gold shadow-gold"
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
                  <p className={m.from === "af" ? "text-gold" : "text-paper"}>
                    <span className="mr-2 text-xs font-semibold">{m.from === "af" ? "Ali" : "You"}</span>
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
