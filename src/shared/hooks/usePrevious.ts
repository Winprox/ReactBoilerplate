import { useLayoutEffect, useRef } from 'react';

export const usePrev = <Value>(val: Value) => {
    const valRef = useRef(val);

    useLayoutEffect(() => {
        valRef.current = val;
    }, [val]);

    return valRef;
};
