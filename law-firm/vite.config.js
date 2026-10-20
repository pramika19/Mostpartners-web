import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The app lives in ./frontend
export default defineConfig({
  root: 'frontend',
  plugins: [react()],
  build: { outDir: '../dist', emptyOutDir: true },
})
