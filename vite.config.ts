import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base path of application for build
  base: "./",
  // Change build directory, to not conflict with electron builder
  build: {
    outDir: "dist-react",
  },
  server: {
    port: 5123,
    strictPort: true,
  },
});
