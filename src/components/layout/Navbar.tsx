import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { clocks, nav, profile } from "@/data/content";
import { useApp } from "@/context/AppContext";
import { Magnetic } from "@/components/ui/Magnetic";

function useClocks() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return clocks.map((c) => ({
    ...c,
    time: new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: c.tz,
    }).format(now),
  }));
}

export function Navbar() {
  const { setCommandOpen, setMenuOpen, menuOpen, setTerminalOpen } = useApp();
  const times = useClocks();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between border-b border-white/10 bg-void/80 px-4 py-3 backdrop-blur-xl sm:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={profile.avatar} alt="" className="h-8 w-8 rounded-md object-cover object-top" />
          <span className="font-display text-base font-semibold">Ali Farid</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `text-[15px] font-medium ${isActive ? "text-gold" : "text-mist hover:text-paper"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            className="hidden rounded-full border border-white/15 px-3 py-1.5 text-sm font-medium text-mist sm:inline"
            onClick={() => setTerminalOpen(true)}
          >
            Terminal
          </button>
          <Magnetic>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-void"
              onClick={() => setCommandOpen(true)}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20 16.5 16.5" />
              </svg>
              Search
            </button>
          </Magnetic>
          <button
            className="rounded-full border border-white/20 px-3 py-1.5 text-sm font-medium md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Menu
          </button>
        </div>
      </div>
      <div className="hidden gap-6 overflow-auto border-b border-white/5 bg-void/60 px-8 py-1.5 text-sm text-mist md:flex">
        {times.map((t) => (
          <span key={t.id} className="whitespace-nowrap">
            {t.label} {t.time}
          </span>
        ))}
        <span className="ml-auto text-gold">Open to relocation</span>
      </div>
    </header>
  );
}
