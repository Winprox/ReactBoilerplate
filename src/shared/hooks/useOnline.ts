import { useState } from 'react';
import { useWindowEvent } from './useWindowEvent';

export const useOnline = () => {
    const [online, setOnline] = useState(navigator.onLine);

    useWindowEvent('online', () => setOnline(true));
    useWindowEvent('offline', () => setOnline(false));

    return online;
};
