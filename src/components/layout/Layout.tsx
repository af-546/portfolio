import { Outlet } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { OverlayNav } from "@/components/layout/OverlayNav";
import { Preloader } from "@/components/fx/Preloader";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { Aurora } from "@/components/fx/Aurora";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { TerminalOverlay } from "@/components/ui/TerminalOverlay";
import { ChatWidget } from "@/components/ui/ChatWidget";
import { KeyboardHelp } from "@/components/ui/KeyboardHelp";
import { Toasts } from "@/components/ui/Toasts";
import { A11yPanel } from "@/components/ui/A11yPanel";

function Shell() {
  return (
    <>
      <Aurora />
      <CustomCursor />
      <ScrollProgress />
      <Preloader />
      <Navbar />
      <OverlayNav />
      <main className="relative z-10 pt-[72px] md:pt-[108px]">
        <Outlet />
      </main>
      <Footer />
      <CommandPalette />
      <TerminalOverlay />
      <KeyboardHelp />
      <ChatWidget />
      <A11yPanel />
      <Toasts />
    </>
  );
}

export function Layout() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  );
}
