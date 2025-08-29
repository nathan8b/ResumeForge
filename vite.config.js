import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "latex.js/dist/latex.mjs": "latex.js/dist/latex.mjs",
    },
  },
  optimizeDeps: {
    exclude: ["latex.js"],
  },
  assetsInclude: ["**/*.keep"],
})
