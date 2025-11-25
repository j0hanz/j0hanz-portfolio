import { useEffect, useRef, useState } from 'react';

import type { StatusBanner } from '@/config/types';

import useEventCallback from './useEventCallback';
import useEventListener from './useEventListener';
import usePrevious from './usePrevious';
import { useSnackbar } from './useSnackbar';

const resolveInitialStatus = (): boolean => {
  if (typeof navigator === 'undefined') {
    return true;
  }
  return navigator.onLine;
};

const getInitialBanner = (): StatusBanner | null => {
  const isOnline = resolveInitialStatus();
  if (isOnline) return null;

  return {
    message: 'Offline mode: some features may be unavailable.',
    severity: 'warning',
    persistent: true,
  };
};

const OFFLINE_BANNER: StatusBanner = {
  message: 'Offline mode: some features may be unavailable.',
  severity: 'warning',
  persistent: true,
};

const ONLINE_BANNER: StatusBanner = {
  message: 'Back online. Changes will sync as soon as possible.',
  severity: 'success',
  persistent: false,
};

const AUTO_DISMISS_DURATION = 3500;

function useBannerTimeout() {
  const timeoutRef = useRef<number | null>(null);

  const clear = useEventCallback(() => {
    if (timeoutRef.current === null) return;
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  });

  const schedule = useEventCallback(
    (callback: () => void, duration: number) => {
      clear();
      timeoutRef.current = window.setTimeout(callback, duration);
    }
  );

  useEffect(() => clear, [clear]);

  return { schedule, clear } as const;
}

export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(resolveInitialStatus);

  useEventListener('online', () => setIsOnline(true));
  useEventListener('offline', () => setIsOnline(false));

  return isOnline;
}

export function useConnectivity() {
  const isOnline = useOnlineStatus();
  const prevOnline = usePrevious(isOnline);
  const { showSnackbar } = useSnackbar();
  const [statusBanner, setStatusBanner] = useState<StatusBanner | null>(
    getInitialBanner
  );
  const { schedule, clear } = useBannerTimeout();

  const showBanner = useEventCallback((nextBanner: StatusBanner) => {
    clear();
    setStatusBanner(nextBanner);

    if (!nextBanner.persistent) {
      schedule(() => setStatusBanner(null), AUTO_DISMISS_DURATION);
    }
  });

  const handleOffline = useEventCallback(() => {
    showSnackbar(
      'You appear to be offline. Some features may not work.',
      'warning',
      null
    );
    showBanner(OFFLINE_BANNER);
  });

  const handleOnline = useEventCallback(() => {
    showSnackbar('Connection restored', 'success', 2500);
    showBanner(ONLINE_BANNER);
  });

  useEffect(() => {
    // Handle initial offline state on mount
    if (prevOnline === undefined) {
      if (!isOnline) handleOffline();
      return;
    }

    // Handle status changes
    if (isOnline && !prevOnline) {
      handleOnline();
    } else if (!isOnline && prevOnline) {
      handleOffline();
    }
  }, [isOnline, prevOnline, handleOnline, handleOffline]);

  return { isOnline, statusBanner };
}

export default useConnectivity;
