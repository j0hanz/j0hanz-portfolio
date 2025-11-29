import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';

import BackgroundMorph from '@/components/BackgroundMorph';
import NavBar from '@/components/NavBar';
import { NavigationProvider } from '@/components/NavigationProvider';
import ScrollToTop from '@/components/ScrollToTop';
import Spinner from '@/components/Spinner';
import StatusBanner from '@/components/StatusBanner';
import { APP_COPY, INITIAL_LOADING_DELAY_MS } from '@/config/constants';
import { useConnectivity, useContentMotion } from '@/hooks';
import Home from '@/pages/Home';

const APP_TITLE = APP_COPY.title;

// Main container styles
const mainContainerSx = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  bgcolor: 'background.default',
  overflow: 'hidden',
} as const;

const loaderContainerSx = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 1,
  height: '100vh',
} as const;

const contentContainerSx = {
  flex: 1,
  position: 'relative',
  zIndex: 1,
} as const;

function useInitialLoading(delay: number): boolean {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = APP_TITLE;
    const timer = window.setTimeout(() => setIsLoading(false), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return isLoading;
}

function App(): React.JSX.Element {
  const { isOnline, statusBanner } = useConnectivity();
  const isLoading = useInitialLoading(INITIAL_LOADING_DELAY_MS);
  const contentMotion = useContentMotion();

  return (
    <MotionConfig reducedMotion="user">
      <Box
        sx={mainContainerSx}
        data-network-status={isOnline ? 'online' : 'offline'}
      >
        <StatusBanner statusBanner={statusBanner} />

        <NavigationProvider>
          <BackgroundMorph />
          <div id="back-to-top-anchor" />

          {!isLoading && <NavBar />}
          <AnimatePresence mode="wait" initial={false}>
            {isLoading ? (
              <Box
                component={motion.div}
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                sx={loaderContainerSx}
              >
                <Spinner sx={{ height: '100%' }} />
              </Box>
            ) : (
              <Box
                component={motion.div}
                key="home"
                {...contentMotion}
                sx={contentContainerSx}
              >
                <Home />
              </Box>
            )}
          </AnimatePresence>
          {!isLoading && <ScrollToTop />}
        </NavigationProvider>
      </Box>
    </MotionConfig>
  );
}

export default App;
