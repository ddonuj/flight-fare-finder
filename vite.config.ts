import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Plain client-side SPA: `vite build` emits static files to dist/.
// vercel.json rewrites every path to index.html so deep links resolve in the browser.
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: { outDir: "dist" },
});
