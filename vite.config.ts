import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Despliegue en GitHub Pages:
  //  - Repo de usuario (gsttps.github.io)  -> dejar base: '/'
  //  - Repo de proyecto (ej. "portfolio")  -> cambiar a base: '/portfolio/'
  base: '/',
  plugins: [react(), tailwindcss()],
})
