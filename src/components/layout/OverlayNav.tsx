import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { nav } from "@/data/content";
import { useApp } from "@/context/AppContext";

export function OverlayNav() {
  const { menuOpen, setMenuOpen } = useApp();
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex flex-col justify-end bg-void/95 p-8 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {nav.map((n, i) => (
            <motion.div
              key={n.to}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={n.to}
                onClick={() => setMenuOpen(false)}
                className="display-xl block py-3 text-5xl"
              >
                {n.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
