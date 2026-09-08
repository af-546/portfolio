import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { nav, profile, projects } from "@/data/content";
import { useApp } from "@/context/AppContext";
import { blip } from "@/lib/audio";

export function CommandPalette() {
  const { commandOpen, setCommandOpen } = useApp();
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const items = useMemo(() => {
    const base = [
      ...nav.map((n) => ({ label: `Go ${n.label}`, run: () => navigate(n.to) })),
      { label: "Download resume", run: () => window.open(profile.resume, "_blank") },
      { label: "Email Ali", run: () => (window.location.href = `mailto:${profile.email}`) },
      { label: "Call Ali", run: () => (window.location.href = profile.phoneHref) },
      { label: "Open GitHub", run: () => window.open(profile.github, "_blank") },
      { label: "Open LinkedIn", run: () => window.open(profile.linkedin, "_blank") },
      ...projects.map((p) => ({
        label: `Case study: ${p.title}`,
        run: () => navigate(`/work/${p.slug}`),
      })),
    ];
    const query = q.trim().toLowerCase();
    return query ? base.filter((i) => i.label.toLowerCase().includes(query)) : base;
  }, [navigate, q]);

  return (
    <AnimatePresence>
      {commandOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-start justify-center bg-black/70 pt-[12vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCommandOpen(false)}
        >
          <motion.div
            className="glass w-full max-w-xl overflow-hidden rounded-2xl"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Jump, search work, open resume…"
              className="w-full border-b border-white/10 bg-transparent px-5 py-4 font-mono text-sm outline-none"
            />
            <ul className="max-h-80 overflow-auto p-2">
              {items.map((item) => (
                <li key={item.label}>
                  <button
                    className="w-full rounded-lg px-4 py-3 text-left text-sm hover:bg-gold/15"
                    onClick={() => {
                      item.run();
                      setCommandOpen(false);
                      blip("ok");
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
