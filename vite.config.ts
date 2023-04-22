import { defineConfig } from "vite"
import { resolve } from "path"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    target: "chrome95",
    sourcemap: true,
    outDir: "dashboard",
    rollupOptions: {
      input: [
        resolve(__dirname, "teams.html"),
        resolve(__dirname, "scene.html"),
        resolve(__dirname, "finals.html"),
        resolve(__dirname, "round.html"),
        resolve(__dirname, "block.html"),
        resolve(__dirname, "loadedData.html"),
      ],
    },
  },
})
