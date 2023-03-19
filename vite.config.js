import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import paths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: './',
    minify: 'terser',
    terserOptions: { format: { comments: false } },
    chunkSizeWarningLimit: 2048,
  },
  plugins: [paths(), react()],
});
