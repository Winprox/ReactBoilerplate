import { SetStateAction, useCallback, useState } from 'react';
import { useIsMounted } from './useIsMounted';

export const useStateSafe = <State>(init: (() => State) | State) => {
  const [val, setVal] = useState(init);
  const isMounted = useIsMounted();

  const setState = useCallback(
    (newVal: SetStateAction<State>) => {
      if (!isMounted.current) return;
      setVal(newVal);
    },
    [isMounted]
  );

  return [val, setState] as const;
};
