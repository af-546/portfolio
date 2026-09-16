import { useState } from "react";

export function WorkThumb({
  src,
  accent,
  className,
  alt = "",
}: {
  src?: string;
  accent: string;
  className?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div
        className={className}
        style={{ background: `linear-gradient(145deg, ${accent}55, #221c18)` }}
        aria-hidden
      />
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}
