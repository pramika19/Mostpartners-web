import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The app lives in ./frontend
export default defineConfig({
  root: 'frontend',
  // GitHub Pages serves the site from /<repo-name>/; the deploy workflow sets BASE_PATH
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  build: { outDir: '../dist', emptyOutDir: true },
})
