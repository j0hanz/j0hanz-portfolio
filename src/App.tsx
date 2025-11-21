import React, { useEffect, useRef, useState } from 'react';

import { Alert, Box, Collapse } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

import BackgroundMorph from '@/components/BackgroundMorph';
import NavBar from '@/components/NavBar';
import ScrollToTop from '@/components/ScrollToTop';
import Spinner from '@/components/Spinner';
import type { StatusBanner } from '@/config/types';
import type { SnackbarContextType } from '@/contexts/SnackbarContext';
import {
  useAnimationConfig,
  useEventCallback,
  useOnlineStatus,
  usePrevious,
  useSnackbar,
} from '@/hooks';
import Home from '@/pages/Home';

const getInitialBanner = (): StatusBanner | null => {
  const isOnline = typeof navigator !== 'undefined' && navigator.onLine;
  if (isOnline) return null;

  return {
    message: 'Offline mode: some features may be unavailable.',
    severity: 'warning',
    persistent: true,
  };
};

type ShowSnackbar = SnackbarContextType['showSnackbar'];

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

function useConnectivityFeedback(showSnackbar: ShowSnackbar) {
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

  return { statusBanner, handleOffline, handleOnline } as const;
}

function useContentMotionConfig() {
  const { prefersReducedMotion, getTransition } = useAnimationConfig();

  const initial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 24 };
  const animate = { opacity: 1, y: 0 };
  const exit = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: -24 };

  return {
    contentInitial: initial,
    contentAnimate: animate,
    contentExit: exit,
    contentTransition: getTransition('smooth', { duration: 0.55 }),
  } as const;
}

function App(): React.JSX.Element {
  const isOnline = useOnlineStatus();
  const prevOnline = usePrevious(isOnline);
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const { statusBanner, handleOffline, handleOnline } =
    useConnectivityFeedback(showSnackbar);
  const { contentInitial, contentAnimate, contentExit, contentTransition } =
    useContentMotionConfig();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = 'Linus Johansson | Portfolio';
  }, []);

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
  }, [isOnline, prevOnline, handleOffline, handleOnline]);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
      data-network-status={isOnline ? 'online' : 'offline'}
    >
      <BackgroundMorph />
      <div id="back-to-top-anchor" />
      <Box
        sx={{
          position: 'relative',
          zIndex: (theme) => theme.zIndex.appBar + 1,
        }}
      >
        <Collapse in={Boolean(statusBanner)} timeout={240} unmountOnExit>
          {statusBanner && (
            <Alert
              severity={statusBanner.severity}
              icon={false}
              sx={{
                borderRadius: 0,
                textAlign: 'center',
                fontSize: '0.85rem',
                letterSpacing: 0.5,
                py: 1,
              }}
            >
              {statusBanner.message}
            </Alert>
          )}
        </Collapse>
      </Box>
      {!isLoading && <NavBar />}
      <AnimatePresence mode="wait" initial={false}>
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
              height: '100vh',
            }}
          >
            <Spinner sx={{ height: '100%' }} />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={contentInitial}
            animate={contentAnimate}
            exit={contentExit}
            transition={contentTransition}
            style={{ flex: 1, position: 'relative', zIndex: 1 }}
          >
            <Home />
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoading && <ScrollToTop />}
    </Box>
  );
}

export default App;
