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
    allowedHosts: ['7c6c-213-230-76-202.ngrok-free.app'],
    host: true,
    port: 5173,
  }
})
