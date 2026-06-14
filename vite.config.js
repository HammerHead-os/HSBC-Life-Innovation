import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/HSBC-Life-Innovation/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        mobile: resolve(__dirname, 'mobile.html'),
        web: resolve(__dirname, 'web.html'),
      },
    },
  },
})
