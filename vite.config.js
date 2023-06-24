import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import eslint from "vite-plugin-eslint"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default ({mode}) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd(), '')
  };

  if (process.env.API_PROXY == undefined) {
    console.warn("Env variable `API_PROXY` not defined.")
  }
  return defineConfig({
    server: {
      proxy: {
        "/api": {
          changeOrigin: true,
          target: process.env.API_PROXY,
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
        ...eslint(),
        apply: "build",
      },
      {
        ...eslint({
          failOnWarning: false,
          failOnError: false,
        }),
        apply: "serve",
        enforce: "post",
      },
    ],
  })
}
