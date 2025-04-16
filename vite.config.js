import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
      '/auth': 'http://localhost:4000',
      '/wss': {
        target: 'wss://localhost:4000',
        wss: true,
      },
    },
  },
});