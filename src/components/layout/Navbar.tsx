import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { clocks, nav, profile } from "@/data/content";
import { useApp } from "@/context/AppContext";

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
      second: "2-digit",
      hour12: false,
      timeZone: c.tz,
    }).format(now),
  }));
}

export function Navbar() {
  const { setCommandOpen, setMenuOpen, menuOpen, sound, toggleSound, setTerminalOpen } =
    useApp();
  const times = useClocks();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between border-b border-white/10 bg-void/80 px-4 py-3 backdrop-blur-xl sm:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={profile.avatar} alt="" className="h-8 w-8 rounded-md" />
          <span className="font-display text-sm tracking-wide">AF</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `font-mono text-[11px] uppercase tracking-[0.22em] ${isActive ? "text-gold" : "text-mist hover:text-paper"}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            className="hidden rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-mist sm:inline"
            onClick={toggleSound}
          >
            snd {sound ? "on" : "off"}
          </button>
          <button
            className="hidden rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-mist sm:inline"
            onClick={() => setTerminalOpen(true)}
          >
            term
          </button>
          <button
            type="button"
            className="rounded-full bg-gold px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-void"
            onClick={() => setCommandOpen(true)}
          >
            ⌘K
          </button>
          <button
            className="rounded-full border border-white/20 px-3 py-1.5 font-mono text-[10px] uppercase md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            menu
          </button>
        </div>
      </div>
      <div className="hidden gap-6 overflow-auto border-b border-white/5 bg-void/60 px-8 py-1 md:flex">
        {times.map((t) => (
          <span key={t.id} className="hud-line whitespace-nowrap">
            {t.label} {t.time}
          </span>
        ))}
        <span className="hud-line ml-auto text-aqua">OPEN TO RELOCATION</span>
      </div>
    </header>
  );
}
