import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { blip, setAudioEnabled } from "@/lib/audio";

export type Toast = { id: number; text: string };

function readFlag(key: string): boolean | null {
  try {
    const v = localStorage.getItem(key);
    if (v === "1") return true;
    if (v === "0") return false;
  } catch {
    /* ignore */
  }
  return null;
}

function writeFlag(key: string, value: boolean) {
  try {
    localStorage.setItem(key, value ? "1" : "0");
  } catch {
    /* ignore */
  }
}

type Ctx = {
  sound: boolean;
  toggleSound: () => void;
  reduced: boolean;
  setReduced: (v: boolean) => void;
  contrast: boolean;
  setContrast: (v: boolean) => void;
  largeText: boolean;
  setLargeText: (v: boolean) => void;
  a11yOpen: boolean;
  setA11yOpen: (v: boolean) => void;
  commandOpen: boolean;
  setCommandOpen: (v: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (v: boolean) => void;
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
  helpOpen: boolean;
  setHelpOpen: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  toasts: Toast[];
  pushToast: (text: string) => void;
  preloaderDone: boolean;
  setPreloaderDone: (v: boolean) => void;
};

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [sound, setSound] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [preloaderDone, setPreloaderDone] = useState(() => {
    try {
      return sessionStorage.getItem("af-boot") === "1";
    } catch {
      return false;
    }
  });
  const [reduced, setReducedState] = useState(() => {
    const stored = readFlag("af-reduced");
    if (stored != null) return stored;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [contrast, setContrastState] = useState(() => readFlag("af-contrast") === true);
  const [largeText, setLargeTextState] = useState(() => readFlag("af-large") === true);
  const navigate = useNavigate();
  const location = useLocation();

  const setReduced = useCallback((v: boolean) => {
    setReducedState(v);
    writeFlag("af-reduced", v);
  }, []);
  const setContrast = useCallback((v: boolean) => {
    setContrastState(v);
    writeFlag("af-contrast", v);
  }, []);
  const setLargeText = useCallback((v: boolean) => {
    setLargeTextState(v);
    writeFlag("af-large", v);
  }, []);

  useEffect(() => {
    if (preloaderDone) return;
    const t = window.setTimeout(() => {
      setPreloaderDone(true);
      try {
        sessionStorage.setItem("af-boot", "1");
      } catch {
        /* ignore */
      }
    }, 1500);
    return () => window.clearTimeout(t);
  }, [preloaderDone]);

  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", reduced);
  }, [reduced]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", contrast);
  }, [contrast]);

  useEffect(() => {
    document.documentElement.classList.toggle("large-text", largeText);
  }, [largeText]);

  useEffect(() => {
    setMenuOpen(false);
    setCommandOpen(false);
    setA11yOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  const toggleSound = useCallback(() => {
    setSound((s) => {
      const next = !s;
      setAudioEnabled(next);
      return next;
    });
  }, []);

  const pushToast = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, text }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3200);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((v) => !v);
        blip("open");
        return;
      }
      if (e.key === "`" && !typing) {
        e.preventDefault();
        setTerminalOpen((v) => !v);
        blip("open");
        return;
      }
      if (e.key === "?" && !typing) {
        e.preventDefault();
        setHelpOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        setCommandOpen(false);
        setTerminalOpen(false);
        setHelpOpen(false);
        setMenuOpen(false);
        setA11yOpen(false);
      }
      if (typing) return;
      if (e.key.toLowerCase() === "g") {
        const next = (ev: KeyboardEvent) => {
          const map: Record<string, string> = {
            h: "/",
            w: "/work",
            l: "/lab",
            a: "/about",
            c: "/contact",
          };
          const path = map[ev.key.toLowerCase()];
          if (path) {
            ev.preventDefault();
            navigate(path);
            blip("ok");
          }
          window.removeEventListener("keydown", next);
        };
        window.addEventListener("keydown", next);
        window.setTimeout(() => window.removeEventListener("keydown", next), 1200);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, toggleSound]);

  const value = useMemo(
    () => ({
      sound,
      toggleSound,
      reduced,
      setReduced,
      contrast,
      setContrast,
      largeText,
      setLargeText,
      a11yOpen,
      setA11yOpen,
      commandOpen,
      setCommandOpen,
      terminalOpen,
      setTerminalOpen,
      chatOpen,
      setChatOpen,
      helpOpen,
      setHelpOpen,
      menuOpen,
      setMenuOpen,
      toasts,
      pushToast,
      preloaderDone,
      setPreloaderDone,
    }),
    [
      sound,
      toggleSound,
      reduced,
      setReduced,
      contrast,
      setContrast,
      largeText,
      setLargeText,
      a11yOpen,
      commandOpen,
      terminalOpen,
      chatOpen,
      helpOpen,
      menuOpen,
      toasts,
      pushToast,
      preloaderDone,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp outside provider");
  return ctx;
}
