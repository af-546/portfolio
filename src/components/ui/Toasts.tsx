import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export function Toasts() {
  const { toasts } = useApp();
  return (
    <div className="pointer-events-none fixed bottom-6 left-6 z-[100] space-y-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto rounded-lg border border-gold/40 bg-void px-4 py-2 font-mono text-xs text-gold"
          >
            {t.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
