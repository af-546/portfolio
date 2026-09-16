import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/content";
import { useApp } from "@/context/AppContext";

const MIN_MS = 1400;
const MAX_MS = 5200;

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

export function Preloader() {
  const { preloaderDone, setPreloaderDone, reduced } = useApp();
  const [pct, setPct] = useState(0);
  const [ready, setReady] = useState(false);

  const finish = useCallback(() => {
    setPreloaderDone(true);
    try {
      sessionStorage.setItem("af-boot", "1");
    } catch {
      /* ignore */
    }
  }, [setPreloaderDone]);

  useEffect(() => {
    if (reduced) {
      setPct(100);
      finish();
      return;
    }

    const start = Date.now();
    let assetsDone = false;
    let cancelled = false;

    void (async () => {
      await Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        preloadImage(profile.photoSuit),
        preloadImage(profile.photoStage),
      ]);
      if (!cancelled) assetsDone = true;
    })();

    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const timePct = Math.min(72, (elapsed / MIN_MS) * 72);
      const loadPct = assetsDone ? 100 : timePct;
      setPct(Math.round(loadPct));

      if (assetsDone && elapsed >= MIN_MS) {
        setReady(true);
        setPct(100);
      }

      if (elapsed >= MAX_MS) {
        setReady(true);
        setPct(100);
        window.clearInterval(tick);
      }
    }, 40);

    return () => {
      cancelled = true;
      window.clearInterval(tick);
    };
  }, [reduced, finish]);

  useEffect(() => {
    if (!ready || preloaderDone) return;
    const id = window.setTimeout(finish, 900);
    return () => window.clearTimeout(id);
  }, [ready, preloaderDone, finish]);

  useEffect(() => {
    if (preloaderDone) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [preloaderDone, finish]);

  return (
    <AnimatePresence>
      {!preloaderDone && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col bg-void text-paper"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          onClick={finish}
          role="dialog"
          aria-label="Loading portfolio"
          aria-busy={!ready}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(var(--accent-rgb)/0.12),transparent_55%)]" />
          <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="kicker">Portfolio</p>
                <p className="mt-1 text-sm text-mist">Purdue CIT · {profile.graduation}</p>
              </div>
              <motion.img
                src={profile.photoSuit}
                alt=""
                className="hidden h-16 w-16 rounded-xl border border-white/10 object-cover object-top sm:block"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: ready ? 1 : 0.35, scale: 1 }}
                transition={{ duration: 0.6 }}
              />
            </div>

            <div className="max-w-2xl">
              <motion.h1
                className="display-xl text-5xl sm:text-6xl md:text-7xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {profile.name}
              </motion.h1>
              <p className="mt-3 text-lg text-gold">{profile.title}</p>
              <p className="mt-3 max-w-lg text-base text-mist">
                {ready
                  ? "Ready. Click or press Enter."
                  : "Loading work, portraits, and type…"}
              </p>
            </div>

            <div>
              <div className="flex items-end justify-between gap-6">
                <div className="flex-1">
                  <div className="h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gold"
                      style={{ width: `${pct}%` }}
                      transition={{ ease: "easeOut" }}
                    />
                  </div>
                  <p className="mt-3 text-sm text-mist">
                    {ready ? "Enter" : "Preparing"}
                  </p>
                </div>
                <span className="font-display text-4xl tabular-nums text-gold sm:text-5xl">
                  {pct}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
