import { useState } from 'react';

import useEventListener from './useEventListener';

const resolveInitialStatus = (): boolean => {
  if (typeof navigator === 'undefined') {
    return true;
  }
  return navigator.onLine;
};

export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(resolveInitialStatus);

  useEventListener('online', () => setIsOnline(true));
  useEventListener('offline', () => setIsOnline(false));

  return isOnline;
}

export default useOnlineStatus;
