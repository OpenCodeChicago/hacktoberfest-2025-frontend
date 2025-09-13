import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "src",
  base: '/',
  publicDir: "../public", 
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "../dist", 
    cssCodeSplit: true,
    sourcemap: false,
  },
  css: {
    postcss: "../postcss.config.js",
  },
});
