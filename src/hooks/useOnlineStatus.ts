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

export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(isInitiallyOnline);

  useEventListener('online', () => setIsOnline(true));
  useEventListener('offline', () => setIsOnline(false));

  return isOnline;
}

export function useConnectivity() {
  const isOnline = useOnlineStatus();
  const prevOnlineRef = useRef(isOnline);
  const [prevOnline, setPrevOnline] = useState<boolean | undefined>(undefined);
  const { showSnackbar } = useSnackbar();
  const [statusBanner, setStatusBanner] = useState<StatusBanner | null>(() =>
    isInitiallyOnline() ? null : OFFLINE_BANNER
  );
  const timeoutRef = useRef<number | null>(null);

  // Track previous value inline (was usePrevious hook - single use, now inlined)
  useEffect(() => {
    setPrevOnline(prevOnlineRef.current);
    prevOnlineRef.current = isOnline;
  }, [isOnline]);

  // Wrap banner state updates with useEventCallback to satisfy lint rules
  const showBanner = useEventCallback((banner: StatusBanner | null) => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setStatusBanner(banner);
  });

  const scheduleBannerDismiss = useEventCallback(() => {
    timeoutRef.current = window.setTimeout(
      () => setStatusBanner(null),
      CONNECTIVITY_BANNER_AUTO_DISMISS
    );
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    // Skip initial mount
    if (prevOnline === undefined) {
      if (!isOnline) {
        showSnackbar(CONNECTIVITY_COPY.offlineSnackbar, 'warning', null);
      }
      return;
    }

    // No change
    if (isOnline === prevOnline) return;

    if (isOnline) {
      showSnackbar(CONNECTIVITY_COPY.onlineSnackbar, 'success', 2500);
      showBanner(ONLINE_BANNER);
      scheduleBannerDismiss();
    } else {
      showSnackbar(CONNECTIVITY_COPY.offlineSnackbar, 'warning', null);
      showBanner(OFFLINE_BANNER);
    }
  }, [isOnline, prevOnline, showSnackbar, showBanner, scheduleBannerDismiss]);

  return { isOnline, statusBanner };
}
