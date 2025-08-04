import './index.css';

import { Alert, Button, ConfigProvider, theme } from 'antd';
import { FC, StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const DATA = import.meta.env.VITE_DATA;

const App: FC = () => {
    useEffect(() => {
        // throw new Error('some error');
    }, []);

    return (
        <div className='h-full bg-gray-800 p-16 text-center'>
            <Button size='large'>{DATA}</Button>
        </div>
    );
};

createRoot(document.querySelector('#app')!).render(
    <StrictMode>
        <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <Alert.ErrorBoundary>
                <App />
            </Alert.ErrorBoundary>
        </ConfigProvider>
    </StrictMode>
);
