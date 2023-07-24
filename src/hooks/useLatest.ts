import { useLayoutEffect, useRef } from 'react';

export const useLatest = <Value>(val: Value) => {
  const valRef = useRef(val);

  useLayoutEffect(() => {
    valRef.current = val;
  });

  return valRef;
};
