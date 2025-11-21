import React, { useEffect, useRef, useState } from 'react';

import { Alert, Box, Collapse } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

import BackgroundMorph from '@/components/BackgroundMorph';
import NavBar from '@/components/NavBar';
import ScrollToTop from '@/components/ScrollToTop';
import Spinner from '@/components/Spinner';
import type { StatusBanner } from '@/config/types';
import {
  useAnimationConfig,
  useEventCallback,
  useOnlineStatus,
  usePrevious,
  useSnackbar,
} from '@/hooks';
import Home from '@/pages/Home';

const getInitialBanner = (): StatusBanner | null => {
  if (typeof navigator === 'undefined' || navigator.onLine) {
    return null;
  }

  return {
    message: 'Offline mode: some features may be unavailable.',
    severity: 'warning',
    persistent: true,
  };
};

function App(): React.JSX.Element {
  const isOnline = useOnlineStatus();
  const prevOnline = usePrevious(isOnline);
  const { showSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [statusBanner, setStatusBanner] = useState<StatusBanner | null>(
    getInitialBanner
  );
  const { prefersReducedMotion, getTransition, resolveMotionState } =
    useAnimationConfig();
  const bannerTimeoutRef = useRef<number | null>(null);
  const reducedMotionState = { opacity: 1, y: 0 } as const;
  const contentInitial = resolveMotionState(
    prefersReducedMotion,
    { opacity: 0, y: 24 },
    reducedMotionState
  );
  const contentAnimate = resolveMotionState(
    prefersReducedMotion,
    { opacity: 1, y: 0 },
    reducedMotionState
  );
  const contentExit = resolveMotionState(
    prefersReducedMotion,
    { opacity: 0, y: -24 },
    reducedMotionState
  );
  const contentTransition = getTransition('smooth', { duration: 0.55 });

  const clearBannerTimeout = useEventCallback(() => {
    if (bannerTimeoutRef.current === null) return;
    window.clearTimeout(bannerTimeoutRef.current);
    bannerTimeoutRef.current = null;
  });

  const showBanner = useEventCallback((nextBanner: StatusBanner) => {
    clearBannerTimeout();
    setStatusBanner(nextBanner);

    if (nextBanner.persistent) return;

    bannerTimeoutRef.current = window.setTimeout(() => {
      setStatusBanner(null);
      bannerTimeoutRef.current = null;
    }, 3500);
  });

  const handleOffline = useEventCallback(() => {
    showSnackbar(
      'You appear to be offline. Some features may not work.',
      'warning',
      null
    );

    showBanner({
      message: 'Offline mode: some features may be unavailable.',
      severity: 'warning',
      persistent: true,
    });
  });

  const handleOnline = useEventCallback(() => {
    showSnackbar('Connection restored', 'success', 2500);

    showBanner({
      message: 'Back online. Changes will sync as soon as possible.',
      severity: 'success',
      persistent: false,
    });
  });

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
