export function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-24 top-[-18%] h-[48vh] w-[48vh] rounded-full bg-gold/12 blur-[130px] animate-float" />
      <div className="absolute right-[-8%] top-[8%] h-[36vh] w-[36vh] rounded-full bg-aqua/10 blur-[120px] animate-pulseGlow" />
      <div className="absolute bottom-[-12%] left-[28%] h-[44vh] w-[44vh] rounded-full bg-gold/8 blur-[140px] animate-float" />
    </div>
  );
}
