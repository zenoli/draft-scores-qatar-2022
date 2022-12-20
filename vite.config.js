import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  // base: "draft-scores-qatar-2022",
  server: {
    proxy: {
      // "/assists": "http://localhost:3000",
      "/assists": "https://world-cup-stats-production.up.railway.app",
      "/api": {
        changeOrigin: true,
        target: "https://world-cup-stats-production.up.railway.app",
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
  plugins: [
    react(),
    { // default settings on build (i.e. fail on error)
      ...eslint(),
      apply: 'build',
    },
    { // do not fail on serve (i.e. local development)
      ...eslint({
        failOnWarning: false,
        failOnError: false,
      }),
      apply: 'serve',
      enforce: 'post'
    }
  ],
})
