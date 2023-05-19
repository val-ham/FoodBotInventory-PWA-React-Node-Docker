import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

const envFile = process.env.APP_ENV
  ? `.env.${process.env.APP_ENV}`
  : ".env.development.local";
dotenv.config({ path: envFile });

const pwaConfiguration = {
  includeAssets: [
    "./images/favicon.ico",
    "./images/apple-touch-icon.png",
    "./images/masked-icon.png",
  ],
  manifest: {
    short_name: "food app",
    description: "this is a food app",
    theme_color: "#ffffff",
    icons: [
      {
        src: "./images/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "./images/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  registerType: "autoUpdate",
};

export default defineConfig({
  plugins: [react(), VitePWA(pwaConfiguration)],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
