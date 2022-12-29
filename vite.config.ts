import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: { outDir: 'dist', assetsDir: '', chunkSizeWarningLimit: 2048 },
  publicDir: './src/assets/public',
  plugins: [react()],
  server: { host: true },
});
