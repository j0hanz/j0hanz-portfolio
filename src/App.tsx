import { Box, type SxProps, type Theme } from '@mui/material';
import { AnimatePresence, m } from 'motion/react';

import { Aurora } from '@/components/Aurora';
import { Metadata } from '@/components/Metadata';
import { NavBar } from '@/components/NavBar';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Spinner } from '@/components/Spinner';
import { StatusBanner } from '@/components/StatusBanner';
import { INITIAL_LOADING_DELAY_MS } from '@/config/constants';
import { useConnectivity, useContentMotion, useInitialLoading } from '@/hooks';
import { Home } from '@/pages/Home';

const mainContainerSx: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  flexFlow: 'column nowrap',
  minHeight: '100vh',
  maxWidth: 1500,
  mx: 'auto',
  overflow: 'hidden',
};

const loaderContainerSx: SxProps<Theme> = {
  flex: 1,
  display: 'grid',
  placeItems: 'center',
  position: 'relative',
  zIndex: 1,
  height: '100vh',
};

const contentContainerSx: SxProps<Theme> = {
  flex: 1,
  position: 'relative',
  zIndex: 1,
};

// Loader transition config - extracted for reusability
const LOADER_MOTION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
} as const;

// Loading state component - SRP: only handles loading display
function LoadingView() {
  return (
    <Box
      component={m.div}
      key="loader"
      {...LOADER_MOTION}
      sx={loaderContainerSx}
    >
      <Spinner sx={{ height: 1 }} />
    </Box>
  );
}

// Main content component - SRP: only handles content display
function ContentView() {
  const contentMotion = useContentMotion();
  return (
    <Box
      component={m.div}
      key="home"
      {...contentMotion}
      sx={contentContainerSx}
    >
      <Home />
    </Box>
  );
}

function App() {
  const { isOnline, statusBanner } = useConnectivity();
  const { isLoading } = useInitialLoading(INITIAL_LOADING_DELAY_MS);

  return (
    <>
      <Metadata />
      <Box
        sx={mainContainerSx}
        data-network-status={isOnline ? 'online' : 'offline'}
      >
        <StatusBanner statusBanner={statusBanner} />
        <Aurora />
        <div id="back-to-top-anchor" />

        {!isLoading && <NavBar />}
        <AnimatePresence mode="wait" initial={false}>
          {isLoading ? <LoadingView /> : <ContentView />}
        </AnimatePresence>
        {!isLoading && <ScrollToTop />}
      </Box>
    </>
  );
}

export { App };
