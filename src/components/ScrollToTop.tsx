import React from 'react';

import { HiArrowUp } from 'react-icons/hi2';

import { Box, Fab, Fade, useScrollTrigger } from '@mui/material';

import { ScrollToTopProps } from '@/config/types';

function ScrollToTop(props: ScrollToTopProps): React.JSX.Element {
  const { window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const ownerDoc = (event.target as HTMLDivElement).ownerDocument || document;
    const anchor = ownerDoc.querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
      return;
    }

    // Fallback: scroll to top of page
    const scrollTarget = window ? window() : document.documentElement;
    scrollTarget.scrollTo({ top: 0, behavior: 'smooth' });
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
