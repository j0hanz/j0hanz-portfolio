import React from 'react';

import { Box } from '@mui/material';

import NavBar from '@/components/NavBar';
import ScrollToTop from '@/components/ScrollToTop';
import Toast from '@/components/Toast';
import Home from '@/pages/Home';

function App(): React.JSX.Element {
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
      <Home loading={false} />
      <ScrollToTop />
    </Box>
  );
}

export default App;
