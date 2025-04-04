import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from "vite-plugin-compression";


export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression()
  ],
  server: {
    allowedHosts: ['6208-84-54-84-27.ngrok-free.app'],
    host: true,
    port: 5173,
  }
})
