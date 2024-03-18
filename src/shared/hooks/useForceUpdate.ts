import { useReducer } from 'react';

export const useForceUpdate = () => {
    const [, forceUpdate] = useReducer((v) => v + 1, 0);
    return forceUpdate;
};
