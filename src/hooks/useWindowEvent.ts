import { useEffect } from 'react';
import { useEvent } from './useEvent';

export const useWindowEvent = <Type extends keyof WindowEventMap>(
  type: Type,
  cb: (e: WindowEventMap[Type]) => void
) => {
  const eventCb = useEvent(cb);

  useEffect(() => {
    window.addEventListener(type, eventCb);
    return () => window.removeEventListener(type, eventCb);
  }, [type, eventCb]);
};
