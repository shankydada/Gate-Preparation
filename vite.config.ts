import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  preview: {
    host: "0.0.0.0",                  // Bind to all interfaces
    port: process.env.PORT || 4173,   // Use Render’s dynamic PORT
    allowedHosts: [
      "gate-preparation-zfkv.onrender.com", // Render’s assigned domain
      "localhost"                           // Keep localhost for local dev
    ],
  },
});
