import { useEffect, useRef, useState } from 'react';

import {
  CONNECTIVITY_BANNER_AUTO_DISMISS,
  CONNECTIVITY_COPY,
} from '@/config/constants';
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

const OFFLINE_BANNER: StatusBanner = {
  message: CONNECTIVITY_COPY.offlineBanner,
  severity: 'warning',
  persistent: true,
};

const ONLINE_BANNER: StatusBanner = {
  message: CONNECTIVITY_COPY.onlineBanner,
  severity: 'success',
  persistent: false,
};

const getInitialBanner = (): StatusBanner | null => {
  const isOnline = resolveInitialStatus();
  if (isOnline) return null;

  return OFFLINE_BANNER;
};

const AUTO_DISMISS_DURATION = CONNECTIVITY_BANNER_AUTO_DISMISS;

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
    showSnackbar(CONNECTIVITY_COPY.offlineSnackbar, 'warning', null);
    showBanner(OFFLINE_BANNER);
  });

  const handleOnline = useEventCallback(() => {
    showSnackbar(CONNECTIVITY_COPY.onlineSnackbar, 'success', 2500);
    showBanner(ONLINE_BANNER);
  });

  useEffect(() => {
    // Handle initial offline state on mount
    if (prevOnline === undefined) {
      if (!isOnline) {
        handleOffline();
      }
      return;
    }

    if (isOnline === prevOnline) return;
    if (isOnline) handleOnline();
    else handleOffline();
  }, [isOnline, prevOnline, handleOnline, handleOffline]);

  return { isOnline, statusBanner };
}

export default useConnectivity;
