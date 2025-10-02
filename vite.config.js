import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  base: '/',
  plugins: [react()],
  publicDir: "public",
  resolve: {
    alias: {
      "@": "./src",
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "../dist",
    cssCodeSplit: true,
    sourcemap: false,
  }
});
