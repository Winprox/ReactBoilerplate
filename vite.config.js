import path from 'path';
import { randomUUID } from 'crypto';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
    plugins: [react()],
    resolve: { alias: { '@': path.resolve('src/') } },
    define: {
        APP_VER: JSON.stringify(
            `${new Date().toLocaleDateString('ru-RU')}@${new Date().toLocaleTimeString('ru-RU')} (${randomUUID().split('-').at(-1)})`
        )
    },
    test: {
        environment: 'happy-dom',
        setupFiles: './src/app/test.ts',
        testMatch: './**/*.test.tsx'
    }
});
