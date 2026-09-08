import { Link } from "react-router-dom";
import { usePageTitle } from "@/hooks/usePageTitle";

export function NotFoundPage() {
  usePageTitle("404 — Ali Farid");
  return (
    <div className="section-pad flex min-h-[60vh] flex-col justify-center py-24">
      <p className="hud-line">Missing page</p>
      <h1 className="display-xl mt-4 text-[18vw]">404</h1>
      <p className="mt-4 text-mist">That URL is not on this site.</p>
      <Link to="/" className="mt-8 w-fit text-gold">
        Back home
      </Link>
    </div>
  );
}
