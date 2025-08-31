import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5050",
    },
  },
  resolve: {
    alias: {
      "@auth": path.join(__dirname, "./src/components/Authentication"),
      "@api": path.join(__dirname, "./src/api/index.js"),
      "@hooks": path.join(__dirname, "./src/hooks/index.js"),
      "@home": path.join(__dirname, "./src/components/Home"),
      "@assets": path.join(__dirname, "./src/assets"),
      "@suadmin": path.join(__dirname, "./src/components/SuperAdmin"),
      "@utils": path.join(__dirname, "./src/utils"),
      "@modules": path.join(__dirname, "./src/components/modules"),
      "@store": path.join(__dirname, "./src/store/GlobalContext.jsx"),
      "@user": path.join(__dirname, "./src/components/modules/User/index.jsx"),
    },
  },
});
