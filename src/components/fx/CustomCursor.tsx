import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -40, y: -40 });
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const finePtr = window.matchMedia("(pointer: fine)").matches;
    setFine(finePtr);
    if (!finePtr) return;
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!fine) return null;

  return (
    <div
      className="pointer-events-none fixed z-[120] h-2 w-2 rounded-full bg-gold/70 mix-blend-difference"
      style={{ left: pos.x - 4, top: pos.y - 4 }}
    />
  );
}
