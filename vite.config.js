import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import paths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: { format: { comments: false } },
    chunkSizeWarningLimit: 2048,
  },
  plugins: [paths(), react()],
});
