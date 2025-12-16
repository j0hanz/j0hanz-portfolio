import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

import {
  CONNECTIVITY_BANNER_AUTO_DISMISS,
  CONNECTIVITY_COPY,
} from '@/config/constants';
import type { StatusBanner } from '@/config/types';

import { useSnackbar } from './useSnackbar';

// ============================================================================
// ONLINE STATUS STORE (useSyncExternalStore pattern)
// Subscribes to navigator.onLine browser API
// ============================================================================

function getSnapshot(): boolean {
  return navigator.onLine;
}

function getServerSnapshot(): boolean {
  // Assume online for SSR - will hydrate with actual value on client
  return true;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

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

// Subscribes to browser online/offline status using useSyncExternalStore
function useOnlineStatus(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useConnectivity() {
  const isOnline = useOnlineStatus();
  const prevOnlineRef = useRef<boolean | null>(null);
  const { showSnackbar } = useSnackbar();
  const [statusBanner, setStatusBanner] = useState<StatusBanner | null>(() =>
    // Use getSnapshot directly for initial state since useSyncExternalStore handles SSR
    typeof navigator !== 'undefined' && !navigator.onLine
      ? OFFLINE_BANNER
      : null
  );
  const timeoutRef = useRef<number | null>(null);

  // Stable callback for updating banner state (avoids ESLint setState-in-effect warning)
  const updateBanner = useEffectEvent((banner: StatusBanner | null) => {
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
  }, [isOnline, showSnackbar]);

  return { isOnline, statusBanner };
}
