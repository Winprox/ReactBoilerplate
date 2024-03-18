import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MainPage } from '@/pages/main';
import './env';
import './main.css';

createRoot(document.querySelector('#app')!).render(
    <StrictMode>
        <MainPage />
    </StrictMode>
);
