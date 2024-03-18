import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MainPage } from '@/pages/main';
import './main.css';

switch (location.hostname.toLowerCase()) {
    case 'localhost':
    case '127.0.0.1':
        window.env = 'dev';
        break;
    case 'test.com':
        window.env = 'test';
        break;
    default:
        window.env = 'prod';
        break;
}

createRoot(document.querySelector('#app')!).render(
    <StrictMode>
        <MainPage />
    </StrictMode>
);
