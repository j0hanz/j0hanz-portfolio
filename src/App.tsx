import React, { useEffect, useRef, useState } from 'react';

import { toast } from 'react-toastify';

import { Alert, AlertColor, Box, Collapse } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

import BackgroundMorph from '@/components/BackgroundMorph';
import NavBar from '@/components/NavBar';
import ScrollToTop from '@/components/ScrollToTop';
import Toast from '@/components/Toast';
import {
  useAnimationConfig,
  useEventCallback,
  useOnlineStatus,
  usePrevious,
} from '@/hooks';
import Home from '@/pages/Home';

const NETWORK_STATUS_TOAST_ID = 'network-status-toast';

type StatusBanner = {
  message: string;
  severity: AlertColor;
  persistent: boolean;
};

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
    toast.warn('You appear to be offline. Some features may not work.', {
      toastId: NETWORK_STATUS_TOAST_ID,
      autoClose: false,
      isLoading: false,
    });

    showBanner({
      message: 'Offline mode: some features may be unavailable.',
      severity: 'warning',
      persistent: true,
    });
  });

  const handleOnline = useEventCallback(() => {
    if (toast.isActive(NETWORK_STATUS_TOAST_ID)) {
      toast.update(NETWORK_STATUS_TOAST_ID, {
        render: 'Connection restored',
        type: 'success',
        autoClose: 2500,
        isLoading: false,
      });
    } else {
      toast.success('Connection restored', {
        toastId: NETWORK_STATUS_TOAST_ID,
        autoClose: 2500,
      });
    }

    showBanner({
      message: 'Back online. Changes will sync as soon as possible.',
      severity: 'success',
      persistent: false,
    });
  });

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
      <NavBar />
      <Toast />
      <AnimatePresence mode="wait" initial={false}>
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
      </AnimatePresence>
      <ScrollToTop />
    </Box>
  );
}

export default App;
