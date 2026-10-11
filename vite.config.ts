import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes the built site work from any folder or sub-path
// (for example https://username.github.io/portfolio/).
export default defineConfig({
  base: './',
  plugins: [react()],
})
