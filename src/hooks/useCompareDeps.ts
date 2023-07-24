import { useRef } from 'react';
import { usePrev } from './usePrevious';

export const useCompareDeps = <T>(value: T, areEqual: (prev: T, curr: T) => boolean) => {
  const changeRef = useRef(0);
  const prev = usePrev(value).current;

  if (!changeRef.current || !areEqual(prev, value)) changeRef.current++;

  return changeRef.current;
};
