import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';

import BackgroundMorph from '@/components/BackgroundMorph';
import GlobalLoader from '@/components/GlobalLoader';
import NavBar from '@/components/NavBar';
import { NavigationProvider } from '@/components/NavigationProvider';
import ScrollToTop from '@/components/ScrollToTop';
import Spinner from '@/components/Spinner';
import StatusBanner from '@/components/StatusBanner';
import { useConnectivity, useContentMotion } from '@/hooks';
import Home from '@/pages/Home';

// Initial loading delay to prevent jarring flash (2 seconds)
const INITIAL_LOADING_DELAY = 2000;

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

function App(): React.JSX.Element {
  const { isOnline, statusBanner } = useConnectivity();
  // Initial loading state - optimized with 2s timeout to prevent flash
  const [isLoading, setIsLoading] = useState(true);
  const contentMotion = useContentMotion();

  useEffect(() => {
    // Minimum loading time to prevent jarring flash
    const timer = setTimeout(() => setIsLoading(false), INITIAL_LOADING_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Set document title once on mount
    document.title = 'Linus Johansson | Portfolio';
  }, []);

  return (
    <Box
      sx={mainContainerSx}
      data-network-status={isOnline ? 'online' : 'offline'}
    >
      <BackgroundMorph />
      <div id="back-to-top-anchor" />

      <StatusBanner statusBanner={statusBanner} />
      <GlobalLoader isLoading={isLoading} />

      <NavigationProvider>
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
  );
}

export default App;
