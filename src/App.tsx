import React, { useEffect, useEffectEvent, useRef, useState } from 'react';

import { toast } from 'react-toastify';

import { Alert, AlertColor, Box, Collapse } from '@mui/material';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import type { TargetAndTransition } from 'motion/react';

import NavBar from '@/components/NavBar';
import ScrollToTop from '@/components/ScrollToTop';
import Toast from '@/components/Toast';
import { useAnimationPriority, useEffectOnce, useOnlineStatus } from '@/hooks';
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

const MORPH_PATHS = [
  'M0 320L80 282.7C160 245 320 170 480 165.3C640 160 800 224 960 229.3C1120 235 1280 181 1360 154.7L1440 128V0H0Z',
  'M0 288L80 266.7C160 245 320 203 480 170.7C640 139 800 117 960 133.3C1120 149 1280 203 1360 229.3L1440 256V0H0Z',
  'M0 256L80 234.7C160 213 320 171 480 170.7C640 171 800 213 960 213.3C1120 213 1280 171 1360 149.3L1440 128V0H0Z',
];

function BackgroundMorph(): React.JSX.Element {
  const priority = useAnimationPriority();
  const animateConfig: TargetAndTransition =
    priority === 'high'
      ? {
          d: MORPH_PATHS,
          transition: {
            duration: 18,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: [0.42, 0, 0.58, 1],
          },
        }
      : {
          d: MORPH_PATHS[0],
        };

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden
    >
      <motion.svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <linearGradient
            id="bgMorphGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(50, 107, 255, 0.35)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0.25)" />
          </linearGradient>
        </defs>
        <motion.path
          fill="url(#bgMorphGradient)"
          initial={false}
          animate={animateConfig}
          style={{ filter: 'blur(32px)' }}
        />
      </motion.svg>
    </Box>
  );
}

function App(): React.JSX.Element {
  const isOnline = useOnlineStatus();
  const [statusBanner, setStatusBanner] = useState<StatusBanner | null>(
    getInitialBanner
  );
  const bannerTimeoutRef = useRef<number | null>(null);

  const clearBannerTimeout = () => {
    if (bannerTimeoutRef.current !== null) {
      window.clearTimeout(bannerTimeoutRef.current);
      bannerTimeoutRef.current = null;
    }
  };

  const showBanner = (nextBanner: StatusBanner) => {
    clearBannerTimeout();
    setStatusBanner(nextBanner);

    if (!nextBanner.persistent) {
      bannerTimeoutRef.current = window.setTimeout(() => {
        setStatusBanner(null);
        bannerTimeoutRef.current = null;
      }, 3500);
    }
  };

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

  useEffectOnce(() => {
    document.title = 'Linus Johansson | Portfolio';

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      toast.warn('You appear to be offline. Some features may not work.', {
        toastId: NETWORK_STATUS_TOAST_ID,
        autoClose: false,
        isLoading: false,
      });
    }
  });

  useEffect(() => {
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
      clearBannerTimeout();
    };
  }, []);

  return (
    <LayoutGroup>
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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ flex: 1, position: 'relative', zIndex: 1 }}
          >
            <Home />
          </motion.div>
        </AnimatePresence>
        <ScrollToTop />
      </Box>
    </LayoutGroup>
  );
}

export default App;
