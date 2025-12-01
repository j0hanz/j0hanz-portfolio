import { Box } from '@mui/material';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';

import BackgroundMorph from '@/components/BackgroundMorph';
import NavBar from '@/components/NavBar';
import ScrollToTop from '@/components/ScrollToTop';
import Spinner from '@/components/Spinner';
import StatusBanner from '@/components/StatusBanner';
import { INITIAL_LOADING_DELAY_MS } from '@/config/constants';
import { useConnectivity, useContentMotion, useInitialLoading } from '@/hooks';
import Home from '@/pages/Home';
import {
  contentContainerSx,
  loaderContainerSx,
  mainContainerSx,
} from '@/styles/appStyles';

function App() {
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
      </Box>
    </MotionConfig>
  );
}

export default App;
