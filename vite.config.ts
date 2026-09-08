import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/portfolio/" : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(dir, "./src"),
    },
  },
});
