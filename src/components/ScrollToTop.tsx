import React from 'react';

import { HiArrowUp } from 'react-icons/hi2';

import { Box, Fab, Fade, useScrollTrigger } from '@mui/material';

interface ScrollToTopProps {
  window?: () => Window;
}

function ScrollToTop(props: ScrollToTopProps): React.JSX.Element {
  const { window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    } else {
      // Fallback if anchor is not found (e.g. top of page)
      if (window) {
        window().scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 100 }}
      >
        <Fab size="small" color="primary" aria-label="scroll back to top">
          <HiArrowUp size={20} />
        </Fab>
      </Box>
    </Fade>
  );
}

export default ScrollToTop;
