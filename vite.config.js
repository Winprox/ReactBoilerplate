import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import paths from 'vite-tsconfig-paths';

export default defineConfig({
  build: { outDir: 'dist', assetsDir: '', chunkSizeWarningLimit: 2048 },
  publicDir: './src/assets/public',
  plugins: [paths(), react()],
  server: { host: true, open: true },
});
