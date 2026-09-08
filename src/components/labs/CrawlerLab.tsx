import { useMemo, useState } from "react";

type PageNode = {
  path: string;
  title: string;
  summary: string;
  children: string[];
};

type Site = {
  id: string;
  start: string;
  label: string;
  pages: Record<string, PageNode>;
};

const sites: Site[] = [
  {
    id: "inn",
    start: "/",
    label: "theoobinn.com",
    pages: {
      "/": {
        path: "/",
        title: "Home",
        summary:
          "Old Orchard Beach Inn home page. Historic inn near the beach, with booking and contact links.",
        children: ["/book", "/contact", "/explore"],
      },
      "/book": {
        path: "/book",
        title: "Book",
        summary: "Booking page. Asks visitors to reserve a stay at the inn.",
        children: ["/contact"],
      },
      "/contact": {
        path: "/contact",
        title: "Contact",
        summary: "Phone, email, and Portland Ave address for the inn.",
        children: [],
      },
      "/explore": {
        path: "/explore",
        title: "Explore",
        summary: "Area notes: beach, pier, and nearby Old Orchard Beach spots.",
        children: ["/book"],
      },
    },
  },
  {
    id: "kre",
    start: "/",
    label: "kingre.org",
    pages: {
      "/": {
        path: "/",
        title: "Home",
        summary:
          "King Real Estate home. Coastal Maine listings and a search call-to-action.",
        children: ["/about", "/properties"],
      },
      "/about": {
        path: "/about",
        title: "About",
        summary: "Brokerage background and the Old Orchard Beach office.",
        children: ["/properties"],
      },
      "/properties": {
        path: "/properties",
        title: "Properties",
        summary: "Listings index: condos, apartments, office and retail space.",
        children: ["/properties/lighthouse", "/contact"],
      },
      "/properties/lighthouse": {
        path: "/properties/lighthouse",
        title: "Listing",
        summary: "Single property page with photos and inquiry CTA.",
        children: ["/contact"],
      },
      "/contact": {
        path: "/contact",
        title: "Contact",
        summary: "Office phone, email, and 198 Saco Ave address.",
        children: [],
      },
    },
  },
];

type LogLine = {
  path: string;
  title: string;
  summary: string;
  subCount: number;
  children: string[];
};

export function CrawlerLab() {
  const [siteId, setSiteId] = useState(sites[0].id);
  const [running, setRunning] = useState(false);
  const [i, setI] = useState(0);
  const [log, setLog] = useState<LogLine[]>([]);

  const site = sites.find((s) => s.id === siteId) ?? sites[0];
  const order = useMemo(() => {
    const seen = new Set<string>();
    const q = [site.start];
    const out: string[] = [];
    while (q.length) {
      const p = q.shift()!;
      if (seen.has(p) || !site.pages[p]) continue;
      seen.add(p);
      out.push(p);
      q.push(...site.pages[p].children);
    }
    return out;
  }, [site]);

  const crawlNext = () => {
    const path = order[i];
    if (!path) {
      setRunning(false);
      return;
    }
    const page = site.pages[path];
    setLog((prev) => [
      ...prev,
      {
        path: page.path,
        title: page.title,
        summary: page.summary,
        subCount: page.children.length,
        children: page.children,
      },
    ]);
    setI((n) => n + 1);
  };

  const start = () => {
    const first = site.pages[site.start];
    setLog([
      {
        path: first.path,
        title: first.title,
        summary: first.summary,
        subCount: first.children.length,
        children: first.children,
      },
    ]);
    setI(1);
    setRunning(true);
  };

  const current = running && i < order.length;

  return (
    <div className="rounded-3xl border border-white/10 p-6 lg:col-span-2">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="hud-line">Python · Requests · BeautifulSoup</p>
          <h3 className="font-display text-2xl">Page crawler</h3>
          <p className="mt-2 max-w-2xl text-sm text-mist">
            Reconstruction of the 2024 script: open a page, write a short summary, count subpages.
            This demo walks a small local copy of two sites I shipped — it does not hit the live
            internet.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {sites.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSiteId(s.id);
                setLog([]);
                setI(0);
                setRunning(false);
              }}
              className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${
                siteId === s.id ? "bg-gold text-void" : "border border-white/20"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <pre className="mt-5 max-h-80 overflow-auto rounded-2xl bg-black p-4 font-mono text-[11px] leading-6 text-aqua">
        <div className="text-mist">$ python crawler.py {site.label}</div>
        {log.map((line) => (
          <div key={line.path} className="mt-3">
            <div className="text-gold">
              fetched {line.path} — {line.title}
            </div>
            <div>summary: {line.summary}</div>
            <div>
              subpages: {line.subCount}
              {line.children.length ? ` (${line.children.join(", ")})` : ""}
            </div>
          </div>
        ))}
        {running && i >= order.length && (
          <div className="mt-3 text-paper">
            done. {log.length} pages visited,{" "}
            {log.reduce((n, l) => n + l.subCount, 0)} subpage links counted.
          </div>
        )}
        {!running && log.length === 0 && (
          <div className="mt-2 text-mist"># press start — visits one page at a time</div>
        )}
      </pre>

      <div className="mt-4 flex flex-wrap gap-2">
        {!running ? (
          <button
            onClick={start}
            className="rounded-full bg-gold px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-void"
          >
            Start crawl
          </button>
        ) : current ? (
          <button
            onClick={crawlNext}
            className="rounded-full bg-gold px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-void"
          >
            Fetch next page
          </button>
        ) : (
          <button
            onClick={start}
            className="rounded-full border border-white/20 px-4 py-2 font-mono text-[10px] uppercase tracking-widest"
          >
            Run again
          </button>
        )}
        {running && current && (
          <span className="self-center font-mono text-[10px] uppercase tracking-widest text-mist">
            {i + 1} / {order.length}
          </span>
        )}
      </div>
    </div>
  );
}
