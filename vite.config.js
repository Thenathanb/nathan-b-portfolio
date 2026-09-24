import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const buildDate = new Date().toLocaleDateString("en-US", {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
});

export default defineConfig({
  plugins: [react()],
  base: "/",
  define: {
    __BUILD_DATE__: JSON.stringify(buildDate),
  },
});
