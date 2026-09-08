import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  duration = 900,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const id = window.setInterval(() => {
      const t = Math.min(1, (Date.now() - start) / duration);
      setN(value * (1 - Math.pow(1 - t, 3)));
      if (t >= 1) window.clearInterval(id);
    }, 32);
    return () => window.clearInterval(id);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
