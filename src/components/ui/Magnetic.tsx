import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export function Magnetic({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { reduced } = useApp();
  return (
    <motion.div
      className={className}
      whileHover={reduced ? undefined : { scale: 1.04 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
