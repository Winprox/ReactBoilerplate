import './index.css';

import { FC, StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import ErrorBoundary from './components/error-boundary';
import { cm } from './utils';

const DATA = import.meta.env.VITE_DATA;

const App: FC = () => {
    useEffect(() => {
        // throw new Error('some error');
    }, []);

    return (
        <div className={cm('h-full p-16 text-center text-5xl', 'bg-gray-800 text-gray-200')}>
            {DATA}
        </div>
    );
};

createRoot(document.querySelector('#app')!).render(
    <StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </StrictMode>
);
