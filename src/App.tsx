import React from 'react';

import { Box } from '@mui/material';

import NavBar from '@/components/NavBar';
import ScrollToTop from '@/components/ScrollToTop';
import Toast from '@/components/Toast';
import useLoading from '@/hooks/useLoading';
import Home from '@/pages/Home';

function App(): React.JSX.Element {
  const loading = useLoading();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
        overflowX: 'hidden',
      }}
    >
      <div id="back-to-top-anchor" />
      <NavBar />
      <Toast />
      <Home loading={loading} />
      <ScrollToTop />
    </Box>
  );
}

export default App;
