import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'static',
    chunkSizeWarningLimit: 2048,
  },
  plugins: [react()],
  server: { host: true },
  publicDir: './src/assets/public',
});
