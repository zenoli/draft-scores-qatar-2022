import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  base: "draft-scores-qatar-2022",
  server: {
    proxy: {
      // "/assists": "http://localhost:3000",
      "/assists": "http://world-cup-stats:3000",
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
