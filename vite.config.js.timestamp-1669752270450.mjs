// vite.config.js
import { defineConfig } from "file:///home/olivier/repos/own/draft-scores-qatar-2022/node_modules/vite/dist/node/index.js";
import react from "file:///home/olivier/repos/own/draft-scores-qatar-2022/node_modules/@vitejs/plugin-react/dist/index.mjs";
import eslint from "file:///home/olivier/repos/own/draft-scores-qatar-2022/node_modules/vite-plugin-eslint/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    {
      ...eslint(),
      apply: "build"
    },
    {
      ...eslint({
        failOnWarning: false,
        failOnError: false
      }),
      apply: "serve",
      enforce: "post"
    }
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9vbGl2aWVyL3JlcG9zL293bi9kcmFmdC1zY29yZXMtcWF0YXItMjAyMlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvb2xpdmllci9yZXBvcy9vd24vZHJhZnQtc2NvcmVzLXFhdGFyLTIwMjIvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvb2xpdmllci9yZXBvcy9vd24vZHJhZnQtc2NvcmVzLXFhdGFyLTIwMjIvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IGVzbGludCBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAvLyBwbHVnaW5zOiBbcmVhY3QoKSwgZXNsaW50KCldXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHsgLy8gZGVmYXVsdCBzZXR0aW5ncyBvbiBidWlsZCAoaS5lLiBmYWlsIG9uIGVycm9yKVxuICAgICAgLi4uZXNsaW50KCksXG4gICAgICBhcHBseTogJ2J1aWxkJyxcbiAgICB9LFxuICAgIHsgLy8gZG8gbm90IGZhaWwgb24gc2VydmUgKGkuZS4gbG9jYWwgZGV2ZWxvcG1lbnQpXG4gICAgICAuLi5lc2xpbnQoe1xuICAgICAgICBmYWlsT25XYXJuaW5nOiBmYWxzZSxcbiAgICAgICAgZmFpbE9uRXJyb3I6IGZhbHNlLFxuICAgICAgfSksXG4gICAgICBhcHBseTogJ3NlcnZlJyxcbiAgICAgIGVuZm9yY2U6ICdwb3N0J1xuICAgIH1cbiAgXSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStULFNBQVMsb0JBQW9CO0FBQzVWLE9BQU8sV0FBVztBQUNsQixPQUFPLFlBQVk7QUFHbkIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFFMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ047QUFBQSxNQUNFLEdBQUcsT0FBTztBQUFBLE1BQ1YsT0FBTztBQUFBLElBQ1Q7QUFBQSxJQUNBO0FBQUEsTUFDRSxHQUFHLE9BQU87QUFBQSxRQUNSLGVBQWU7QUFBQSxRQUNmLGFBQWE7QUFBQSxNQUNmLENBQUM7QUFBQSxNQUNELE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
