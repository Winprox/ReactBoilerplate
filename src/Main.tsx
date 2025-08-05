import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Button, createTheme, Divider, Tab, Tabs, ThemeProvider } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import { StyledEngineProvider } from '@mui/material/styles';
import { FC, StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import ErrorBoundary from './components/ErrorBoundary';

const DATA = import.meta.env.VITE_DATA;
const DARK_THEME = createTheme({ palette: { mode: 'dark' } });

const App: FC = () => {
    const [tab, setTab] = useState(0);

    useEffect(() => {
        // throw new Error('some error');
    }, []);

    return (
        <div className='h-svh bg-gray-800'>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                <Tab label='Tab 1' />
                <Tab label='Tab 2' />
            </Tabs>
            <Divider />
            <div className='p-4'>
                <Button variant='contained'>{DATA}</Button>
            </div>
        </div>
    );
};

createRoot(document.querySelector('#app')!).render(
    <StrictMode>
        <StyledEngineProvider enableCssLayer>
            <GlobalStyles styles='@layer theme, base, mui, components, utilities;' />
            <ThemeProvider theme={DARK_THEME}>
                <ErrorBoundary>
                    <App />
                </ErrorBoundary>
            </ThemeProvider>
        </StyledEngineProvider>
    </StrictMode>
);
