import React, { useEffect, useEffectEvent, useRef, useState } from 'react';

import { toast } from 'react-toastify';

import { Alert, AlertColor, Box, Collapse } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

import NavBar from '@/components/NavBar';
import ScrollToTop from '@/components/ScrollToTop';
import Toast from '@/components/Toast';
import {
  useAnimationConfig,
  useAnimationPriority,
  useOnlineStatus,
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

function BackgroundMorph(): React.JSX.Element {
  const priority = useAnimationPriority();
  const { prefersReducedMotion, getTransition } = useAnimationConfig();
  const shouldAnimate = priority === 'high' && !prefersReducedMotion;

  return (
    <Box
      component={motion.div}
      initial={false}
      animate={
        shouldAnimate
          ? {
              scale: [1, 1.05, 1],
              x: ['0%', '3%', '0%'],
              y: ['0%', '2%', '0%'],
            }
          : { scale: 1, x: '0%', y: '0%' }
      }
      transition={
        shouldAnimate
          ? getTransition('smooth', {
              duration: 15,
              repeat: Infinity,
              repeatType: 'mirror',
            })
          : undefined
      }
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
        background:
          'linear-gradient(150deg, rgba(26, 29, 204, 0.35), rgba(87, 89, 214, 0.25))',
        filter: 'blur(30px)',
      }}
      aria-hidden
    />
  );
}

function App(): React.JSX.Element {
  const isOnline = useOnlineStatus();
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

  const clearBannerTimeout = useEffectEvent(() => {
    if (bannerTimeoutRef.current === null) return;
    window.clearTimeout(bannerTimeoutRef.current);
    bannerTimeoutRef.current = null;
  });

  const showBanner = useEffectEvent((nextBanner: StatusBanner) => {
    clearBannerTimeout();
    setStatusBanner(nextBanner);

    if (nextBanner.persistent) return;

    bannerTimeoutRef.current = window.setTimeout(() => {
      setStatusBanner(null);
      bannerTimeoutRef.current = null;
    }, 3500);
  });

  const handleOffline = useEffectEvent(() => {
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

  const handleOnline = useEffectEvent(() => {
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

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      handleOffline();
    }
  }, []);

  useEffect(() => {
    const offlineListener = () => handleOffline();
    const onlineListener = () => handleOnline();

    window.addEventListener('offline', offlineListener);
    window.addEventListener('online', onlineListener);

    return () => {
      window.removeEventListener('offline', offlineListener);
      window.removeEventListener('online', onlineListener);
      clearBannerTimeout();
    };
  }, []);

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
