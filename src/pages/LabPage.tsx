import { TrafficLab } from "@/components/labs/TrafficLab";
import { CrawlerLab } from "@/components/labs/CrawlerLab";
import { FxLab } from "@/components/labs/FxLab";
import { InventoryLab } from "@/components/labs/InventoryLab";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useApp } from "@/context/AppContext";

export function LabPage() {
  usePageTitle("Lab | Ali Farid");
  const { setTerminalOpen } = useApp();
  return (
    <div className="section-pad py-12">
      <p className="kicker">Browser demos</p>
      <h1 className="display-xl mt-2 text-5xl sm:text-6xl">Lab</h1>
      <p className="mt-3 max-w-2xl text-lg text-mist">
        Interactive versions of a page crawler and traffic-light controller, plus stand-ins for the
        Daraz.pk seller desk and FX tables from earlier jobs. These are demos, not production systems.
      </p>
      <button
        type="button"
        onClick={() => setTerminalOpen(true)}
        className="mt-5 rounded-full border border-gold/40 px-4 py-2 text-sm font-semibold text-gold"
      >
        Open terminal
      </button>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <CrawlerLab />
        <TrafficLab />
        <FxLab />
        <InventoryLab />
      </div>
    </div>
  );
}
