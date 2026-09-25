import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Rutas relativas para GitHub Pages
  server: {
    port: 7542,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    outDir: '../', // Salida en la raíz del repositorio
    emptyOutDir: false, // NO borrar archivos existentes como frontend, .git, etc.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          if (
            id.includes('node_modules/motion') ||
            id.includes('node_modules/gsap') ||
            id.includes('node_modules/lenis')
          ) {
            return 'vendor-animations'
          }
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-icons'
          }
        },
      },
    },
  },
})
