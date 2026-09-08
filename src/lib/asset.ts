/** Prefix a public file path with Vite's base (needed on GitHub Pages). */
export function asset(path: string) {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\//, "")}`;
}
