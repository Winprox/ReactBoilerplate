import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  build: { minify: 'terser', terserOptions: { format: { comments: false } } },
  plugins: [react()],
});
