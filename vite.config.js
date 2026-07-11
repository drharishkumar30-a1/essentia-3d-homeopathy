import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://<user>.github.io/essentia-3d-homeopathy/ in
// production (GitHub Pages project site), from / in local dev.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/essentia-3d-homeopathy/' : '/',
}))
