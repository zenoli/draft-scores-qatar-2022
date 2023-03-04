import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import eslint from "vite-plugin-eslint"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  // base: "draft-scores-qatar-2022",
  server: {
    proxy: {
      // "/assists": "http://localhost:3000",
      // "/assists": "https://rb-scoreboard-backend-production.up.railway.app/",
      "/api": {
        changeOrigin: true,
        target: "https://rb-scoreboard-backend-production.up.railway.app/",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    {
      // default settings on build (i.e. fail on error)
      ...eslint(),
      apply: "build",
    },
    {
      // do not fail on serve (i.e. local development)
      ...eslint({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: "serve",
      enforce: "post",
    },
  ],
})
