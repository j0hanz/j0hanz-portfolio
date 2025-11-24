import React, { useEffect, useState } from 'react';

import { Alert, Box, Collapse, LinearProgress } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'motion/react';

import BackgroundMorph from '@/components/BackgroundMorph';
import NavBar from '@/components/NavBar';
import { NavigationProvider } from '@/components/NavigationProvider';
import ScrollToTop from '@/components/ScrollToTop';
import Spinner from '@/components/Spinner';
import { useConnectivity, useContentMotion } from '@/hooks';
import Home from '@/pages/Home';

function App(): React.JSX.Element {
  const { isOnline, statusBanner } = useConnectivity();
  const [isLoading, setIsLoading] = useState(true);
  const contentMotion = useContentMotion();
  const isFetching = useIsFetching(); // Global loading indicator for background queries

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = 'Linus Johansson | Portfolio';
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
      {/* Global loading indicator for background queries */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar + 2,
          height: 3,
        }}
      >
        <Collapse in={isFetching > 0 && !isLoading} timeout={200}>
          <LinearProgress
            color="primary"
            sx={{
              height: 3,
              '& .MuiLinearProgress-bar': {
                transition: 'transform 0.2s linear',
              },
            }}
          />
        </Collapse>
      </Box>
      <NavigationProvider>
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
              {...contentMotion}
              style={{ flex: 1, position: 'relative', zIndex: 1 }}
            >
              <Home />
            </motion.div>
          )}
        </AnimatePresence>
        {!isLoading && <ScrollToTop />}
      </NavigationProvider>
    </Box>
  );
}

export default App;
