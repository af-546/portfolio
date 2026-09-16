import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export function Toasts() {
  const { toasts } = useApp();
  return (
    <div className="pointer-events-none fixed bottom-24 right-5 z-[100] space-y-2 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-auto rounded-lg border border-gold/40 bg-void px-4 py-2 text-sm text-gold"
          >
            {t.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
