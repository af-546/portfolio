export function Marquee({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.02]">
      <div
        className={`flex w-max gap-10 py-4 ${reverse ? "animate-marqueeReverse" : "animate-marquee"}`}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-display text-sm uppercase tracking-[0.35em] text-paper/80"
          >
            {item}
            <span className="text-gold">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
