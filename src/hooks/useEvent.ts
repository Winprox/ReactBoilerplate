import { useCallback, useLayoutEffect, useRef } from 'react';

export function useEvent<Fn extends (...args: any[]) => any>(fn: Fn) {
  const fnRef = useRef(fn);

  useLayoutEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const eventCb = useCallback(
    (...args: Parameters<Fn>) => {
      return fnRef.current.apply(null, args);
    },
    [fnRef]
  );

  return eventCb as unknown as Fn;
}
