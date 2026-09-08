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
      return;
    }
    const start = Date.now();
    const id = window.setInterval(() => {
      setPct(Math.min(100, Math.round(((Date.now() - start) / 1400) * 100)));
    }, 50);
    return () => window.clearInterval(id);
  }, [reduced]);

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
          <div className="flex justify-between hud-line">
            <span>Portfolio</span>
            <span>Purdue</span>
          </div>
          <div>
            <p className="hud-line mb-4">Ali Farid</p>
            <h1 className="display-xl text-[12vw] sm:text-[9vw]">{profile.name}</h1>
            <p className="mt-4 max-w-xl font-mono text-sm text-mist">
              Purdue CIT · expected {profile.graduation} · click to enter
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
