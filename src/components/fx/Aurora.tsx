export function Aurora() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-32 top-[-20%] h-[55vh] w-[55vh] rounded-full bg-gold/10 blur-[120px] animate-float" />
      <div className="absolute right-[-10%] top-[10%] h-[40vh] w-[40vh] rounded-full bg-signal/10 blur-[110px] animate-pulseGlow" />
      <div className="absolute bottom-[-10%] left-1/3 h-[50vh] w-[50vh] rounded-full bg-aqua/10 blur-[130px] animate-float" />
    </div>
  );
}
