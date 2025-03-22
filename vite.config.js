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
    allowedHosts: ['17ab-202-79-189-219.ngrok-free.app'],
    host: true,
    port: 5173,
  }
})
