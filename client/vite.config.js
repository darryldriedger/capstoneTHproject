import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    hmr: {
      overlay: false // prevents the big red error screen overlay
    }
  },
  esbuild: {
    jsx: "automatic"
  },
  build: {
    sourcemap: true
  }
});
