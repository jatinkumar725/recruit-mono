import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/client': {
        target: 'http://localhost:3450',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/assets': {
        target: 'http://localhost:3450',
        changeOrigin: true,
        rewrite: (path) => path,
      },
      '/rp-job-api': {
        target: 'http://localhost:3450',
        changeOrigin: true,
        rewrite: (path) => path,
      },
      // '/auth': {
      //   target: 'http://localhost:3450',
      //   changeOrigin: true,
      //   rewrite: (path) => path,
      // },
    },
  },
})
