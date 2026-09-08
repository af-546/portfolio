import { TrafficLab } from "@/components/labs/TrafficLab";
import { CrawlerLab } from "@/components/labs/CrawlerLab";
import { FxLab } from "@/components/labs/FxLab";
import { InventoryLab } from "@/components/labs/InventoryLab";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useApp } from "@/context/AppContext";

export function LabPage() {
  usePageTitle("Lab — Ali Farid");
  const { setTerminalOpen } = useApp();
  return (
    <div className="section-pad py-16">
      <p className="hud-line">Small demos</p>
      <h1 className="display-xl mt-3 text-6xl sm:text-8xl">Lab</h1>
      <p className="mt-4 max-w-2xl text-mist">
        Browser versions of two school/personal projects (page crawler, traffic lights) plus simple
        stand-ins for inventory and FX work from earlier jobs. Not production systems.
      </p>
      <button
        type="button"
        onClick={() => setTerminalOpen(true)}
        className="mt-6 rounded-full border border-gold/40 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-gold"
      >
        Open terminal
      </button>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <CrawlerLab />
        <TrafficLab />
        <FxLab />
        <InventoryLab />
      </div>
    </div>
  );
}
