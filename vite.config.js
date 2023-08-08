import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: { format: { comments: false } }
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/app/test.ts',
    testMatch: './**/*.test.tsx'
  }
});
