import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/content";
import { useApp } from "@/context/AppContext";

export function Preloader() {
  const { preloaderDone, setPreloaderDone, reduced } = useApp();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (reduced) {
      setPct(100);
      setPreloaderDone(true);
      return;
    }
    const start = Date.now();
    const id = window.setInterval(() => {
      setPct(Math.min(100, Math.round(((Date.now() - start) / 1400) * 100)));
    }, 50);
    return () => window.clearInterval(id);
  }, [reduced, setPreloaderDone]);

  return (
    <AnimatePresence>
      {!preloaderDone && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col justify-between bg-void p-6 text-paper sm:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => {
            setPreloaderDone(true);
            try {
              sessionStorage.setItem("af-boot", "1");
            } catch {
              /* ignore */
            }
          }}
        >
          <div className="flex justify-between text-sm font-medium text-mist">
            <span>Portfolio</span>
            <span>Purdue</span>
          </div>
          <div>
            <p className="mb-4 text-sm font-medium text-mist">Ali Farid</p>
            <h1 className="display-xl text-5xl sm:text-7xl">{profile.name}</h1>
            <p className="mt-4 max-w-xl text-base text-mist">
              Purdue CIT · Expected graduation: {profile.graduation} · click to enter
            </p>
          </div>
          <div className="flex items-end justify-between">
            <div className="h-1 w-1/2 overflow-hidden bg-white/10">
              <div className="h-full bg-gold" style={{ width: `${pct}%` }} />
            </div>
            <span className="font-display text-5xl text-gold">{pct}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
