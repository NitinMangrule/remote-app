import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        "./MusicLibrary": "./src/components/MusicLibrary/MusicLibrary.jsx",
      },
      shared: ["react", "react-dom"],
    }),
    tailwindcss(),
    {
      name: "vite-plugin-notify-host-on-rebuild",
      apply(config, { command }) {
        return Boolean(command === "build" && config.build?.watch);
      },
      async buildEnd(error) {
        if (!error) {
          try {
            await fetch("http://localhost:5000/__fullReload");
          } catch (e) {
            console.log(e);
          }
        }
      },
    },
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    outDir: "dist",
    rollupOptions: {
      output: {
        format: "esm",
      },
    },
  },
  base: process.env.VITE_BASE || "/",
  server: {
    port: 5001,
    cors: true,
  },
});
