import React, { useEffect, useEffectEvent, useRef, useState } from 'react';

import { toast } from 'react-toastify';

import { Alert, AlertColor, Box, Collapse } from '@mui/material';

import NavBar from '@/components/NavBar';
import ScrollToTop from '@/components/ScrollToTop';
import Toast from '@/components/Toast';
import { useEffectOnce, useOnlineStatus } from '@/hooks';
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
  const [statusBanner, setStatusBanner] = useState<StatusBanner | null>(
    getInitialBanner
  );
  const bannerTimeoutRef = useRef<number | null>(null);

  const showBanner = (nextBanner: StatusBanner) => {
    if (bannerTimeoutRef.current !== null) {
      window.clearTimeout(bannerTimeoutRef.current);
      bannerTimeoutRef.current = null;
    }

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
    };
  }, []);

  useEffect(() => {
    return () => {
      if (bannerTimeoutRef.current !== null) {
        window.clearTimeout(bannerTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        overflowX: 'hidden',
      }}
      data-network-status={isOnline ? 'online' : 'offline'}
    >
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
      <Home />
      <ScrollToTop />
    </Box>
  );
}

export default App;
