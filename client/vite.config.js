import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/client': {
        target: 'https://recruit-mono.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/assets': {
        target: 'https://recruit-mono.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path,
      },
      '/rp-job-api': {
        target: 'https://recruit-mono.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path,
      },
      // '/auth': {
      //   target: 'https://recruit-mono.onrender.com',
      //   changeOrigin: true,
      //   rewrite: (path) => path,
      // },
    },
  },
})
