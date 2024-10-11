import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.docx"],
  server: {
    // https: {
    //   key: fs.readFileSync("C:/Users/OkanS/cert-key.pem"),
    //   cert: fs.readFileSync("C:/Users/OkanS/cert.pem"),
    // },
    port: 3000,
    strictPort: true,
    host: true,
  },
});
