import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/project-exam-two/",
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  server: {
    historyApiFallback: true,
  },
});
