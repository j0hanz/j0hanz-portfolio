import { useEffect, useRef, useState } from 'react';

import {
  CONNECTIVITY_BANNER_AUTO_DISMISS,
  CONNECTIVITY_COPY,
} from '@/config/constants';
import type { StatusBanner } from '@/config/types';

import { useEventCallback } from './useEventCallback';
import { useEventListener } from './useEventListener';
import { useSnackbar } from './useSnackbar';

const isInitiallyOnline = () =>
  typeof navigator === 'undefined' || navigator.onLine;

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

function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(isInitiallyOnline);

  useEventListener('online', () => setIsOnline(true));
  useEventListener('offline', () => setIsOnline(false));

  return isOnline;
}

export function useConnectivity() {
  const isOnline = useOnlineStatus();
  const prevOnlineRef = useRef<boolean | null>(null);
  const { showSnackbar } = useSnackbar();
  const [statusBanner, setStatusBanner] = useState<StatusBanner | null>(() =>
    isInitiallyOnline() ? null : OFFLINE_BANNER
  );
  const timeoutRef = useRef<number | null>(null);

  // Stable callback for updating banner state (avoids ESLint setState-in-effect warning)
  const updateBanner = useEventCallback((banner: StatusBanner | null) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStatusBanner(banner);
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const wasOnline = prevOnlineRef.current;
    prevOnlineRef.current = isOnline;

    // Skip initial mount - show offline snackbar if starting offline
    if (wasOnline === null) {
      if (!isOnline) {
        showSnackbar(CONNECTIVITY_COPY.offlineSnackbar, 'warning', null);
      }
      return;
    }

    // No change in status
    if (isOnline === wasOnline) return;

    if (isOnline) {
      showSnackbar(CONNECTIVITY_COPY.onlineSnackbar, 'success', 2500);
      updateBanner(ONLINE_BANNER);
      timeoutRef.current = window.setTimeout(
        () => updateBanner(null),
        CONNECTIVITY_BANNER_AUTO_DISMISS
      );
    } else {
      showSnackbar(CONNECTIVITY_COPY.offlineSnackbar, 'warning', null);
      updateBanner(OFFLINE_BANNER);
    }
  }, [isOnline, showSnackbar, updateBanner]);

  return { isOnline, statusBanner };
}
