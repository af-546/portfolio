import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export function KeyboardHelp() {
  const { helpOpen, setHelpOpen } = useApp();
  const rows = [
    ["⌘/Ctrl K", "Command palette"],
    ["`", "Terminal"],
    ["?", "This panel"],
    ["S", "Sound"],
    ["G then H/W/L/A/C", "Go home/work/lab/about/contact"],
    ["Esc", "Close overlays"],
  ];
  return (
    <AnimatePresence>
      {helpOpen && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setHelpOpen(false)}
        >
          <div className="glass w-full max-w-md rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <p className="hud-line mb-4">Shortcuts</p>
            <ul className="space-y-3 font-mono text-sm">
              {rows.map(([k, v]) => (
                <li key={k} className="flex justify-between gap-4">
                  <span className="text-gold">{k}</span>
                  <span className="text-mist">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
