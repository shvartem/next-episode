import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const base = process.env.BASE_PATH ?? '/next-episode/'
const apiPrefix = `${base}api/`

// https://vite.dev/config/
export default defineConfig({
  base,
  server: {
    proxy: {
      [apiPrefix]: {
        target: `http://127.0.0.1:${process.env.PORT ?? '3001'}`,
        rewrite: (path) => `/api/${path.slice(apiPrefix.length)}`,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
