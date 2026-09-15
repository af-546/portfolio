import { useRef, useState } from "react";

type LogLine = {
  url: string;
  title: string;
  summary: string;
  subCount: number;
  children: string[];
  error?: string;
};

const MAX_PAGES = 8;
const FETCH_MS = 12000;

const PROXIES = [
  (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
  (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url: string) => `https://r.jina.ai/${url}`,
];

function normalizeUrl(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(withProto);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}

function sameOrigin(a: URL, href: string) {
  try {
    const next = new URL(href, a);
    return next.origin === a.origin && (next.protocol === "http:" || next.protocol === "https:");
  } catch {
    return false;
  }
}

function isSkippable(href: string) {
  return /\.(pdf|jpg|jpeg|png|gif|webp|svg|zip|mp4|mp3|css|js|woff2?)$/i.test(href.split("?")[0]);
}

function canonical(href: string, base?: string) {
  try {
    const url = new URL(href, base);
    url.hash = "";
    if (url.pathname.length > 1) url.pathname = url.pathname.replace(/\/+$/, "");
    return url.href;
  } catch {
    return null;
  }
}

function summarizeDoc(html: string, fallbackUrl: string) {
  const looksHtml = /<html|<body|<title|<meta/i.test(html);
  if (!looksHtml) {
    const titleMatch = html.match(/^Title:\s*(.+)$/m);
    const title = titleMatch?.[1]?.trim() || html.replace(/\s+/g, " ").trim().slice(0, 80) || fallbackUrl;
    const body = html.replace(/^Title:.*$/m, "").replace(/\s+/g, " ").trim();
    const links = [
      ...html.matchAll(/\]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)/g),
      ...html.matchAll(/https?:\/\/[^\s)"']+/g),
    ].map((m) => m[1] || m[0]);
    return { title, summary: body.slice(0, 280), links };
  }

  const doc = new DOMParser().parseFromString(html, "text/html");
  const title =
    doc.querySelector("title")?.textContent?.trim() ||
    doc.querySelector("h1")?.textContent?.trim() ||
    fallbackUrl;
  const meta =
    doc.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ||
    doc.querySelector("p")?.textContent?.trim() ||
    "";
  const links = [...doc.querySelectorAll("a[href]")]
    .map((a) => a.getAttribute("href") || "")
    .filter(Boolean);
  return { title, summary: meta.replace(/\s+/g, " ").slice(0, 280), links };
}

async function fetchPage(url: string) {
  let lastError = "Could not fetch that page.";
  for (const make of PROXIES) {
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), FETCH_MS);
    try {
      const res = await fetch(make(url), { signal: ctrl.signal });
      window.clearTimeout(timer);
      if (!res.ok) {
        lastError = `HTTP ${res.status} from proxy`;
        continue;
      }
      const text = await res.text();
      if (text && text.length > 20) return text;
      lastError = "Empty response";
    } catch (err) {
      window.clearTimeout(timer);
      lastError = err instanceof Error ? err.message : "Network error";
    }
  }
  throw new Error(lastError);
}

export function CrawlerLab() {
  const [input, setInput] = useState("https://www.kingre.org");
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<LogLine[]>([]);
  const [status, setStatus] = useState("Paste a public URL, then start the crawl.");
  const stopRef = useRef(false);

  const crawl = async () => {
    const start = normalizeUrl(input);
    if (!start) {
      setStatus("Enter a valid http or https URL.");
      return;
    }

    stopRef.current = false;
    setRunning(true);
    setLog([]);
    setStatus(`Fetching ${start.href}`);

    const startHref = canonical(start.href) ?? start.href;
    const seen = new Set<string>();
    const queue = [startHref];
    const visited: LogLine[] = [];

    while (queue.length && visited.length < MAX_PAGES && !stopRef.current) {
      const current = queue.shift()!;
      if (seen.has(current)) continue;
      seen.add(current);
      setStatus(`Fetching ${current} (${visited.length + 1}/${MAX_PAGES})`);

      try {
        const html = await fetchPage(current);
        const parsed = summarizeDoc(html, current);
        const origin = new URL(current);
        const children = [
          ...new Set(
            parsed.links
              .map((href) => canonical(href, origin.href))
              .filter((href): href is string => Boolean(href))
              .filter((href) => sameOrigin(origin, href) && !isSkippable(href) && href !== canonical(current)),
          ),
        ].slice(0, 12);

        const line: LogLine = {
          url: current,
          title: parsed.title,
          summary: parsed.summary || "No description found on this page.",
          subCount: children.length,
          children,
        };
        visited.push(line);
        setLog([...visited]);
        for (const child of children) {
          if (!seen.has(child) && !queue.includes(child)) queue.push(child);
        }
      } catch (err) {
        const line: LogLine = {
          url: current,
          title: "Fetch failed",
          summary: "",
          subCount: 0,
          children: [],
          error: err instanceof Error ? err.message : "Unknown error",
        };
        visited.push(line);
        setLog([...visited]);
      }
    }

    setRunning(false);
    setStatus(
      stopRef.current
        ? "Stopped."
        : `Done. ${visited.length} page${visited.length === 1 ? "" : "s"} visited.`,
    );
  };

  return (
    <div className="rounded-2xl border border-white/10 p-5 lg:col-span-2">
      <p className="hud-line">Python · Requests · BeautifulSoup</p>
      <h3 className="mt-1 font-display text-2xl">Page crawler</h3>
      <p className="mt-2 max-w-2xl text-sm text-mist">
        Same idea as the 2024 script: open a page, write a short summary, count same-site links.
        Paste any public URL. This demo fetches the live site and follows a few child pages.
      </p>

      <form
        className="mt-4 flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          if (!running) void crawl();
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://example.com"
          disabled={running}
          className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-mono text-sm outline-none focus:border-gold"
        />
        <div className="flex gap-2">
          {!running ? (
            <button
              type="submit"
              className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-void"
            >
              Start crawl
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                stopRef.current = true;
              }}
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold"
            >
              Stop
            </button>
          )}
        </div>
      </form>

      <pre className="mt-4 max-h-80 overflow-auto rounded-2xl bg-black/60 p-4 font-mono text-[11px] leading-6 text-aqua">
        <div className="text-mist">$ python crawler.py {input.trim() || "site"}</div>
        {log.map((line) => (
          <div key={line.url} className="mt-3">
            <div className="text-gold">
              fetched {line.url}
              {line.title ? `, ${line.title}` : ""}
            </div>
            {line.error ? (
              <div className="text-signal">error: {line.error}</div>
            ) : (
              <>
                <div>summary: {line.summary}</div>
                <div>
                  subpages: {line.subCount}
                  {line.children.length
                    ? ` (${line.children
                        .slice(0, 4)
                        .map((c) => new URL(c).pathname || "/")
                        .join(", ")})`
                    : ""}
                </div>
              </>
            )}
          </div>
        ))}
        <div className="mt-3 text-mist"># {status}</div>
      </pre>
    </div>
  );
}
