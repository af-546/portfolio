import { useApp } from "@/context/AppContext";

export function Marquee({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const { reduced } = useApp();
  const row = reduced ? items : [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.02]">
      <div
        className={`flex w-max gap-10 py-4 ${
          reduced ? "" : reverse ? "animate-marqueeReverse" : "animate-marquee"
        } hover:[animation-play-state:paused]`}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 font-body text-base font-medium text-paper/85"
          >
            {item}
            <span className="text-gold">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
