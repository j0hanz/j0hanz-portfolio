import { Suspense } from 'react';

import { Box, Typography } from '@mui/material';

import ErrorBoundary from '@/components/ErrorBoundary';
import { AnimatePresence, PageTransitionWrapper } from '@/components/Motions';
import { SectionSkeleton } from '@/components/Skeletons';
import { useFullPageScroll, useNavigationState } from '@/hooks';
import { centeredFullViewportSx } from '@/styles/shared';

// Fallback for section-level errors (prevents entire app from breaking)
function SectionErrorFallback(): React.JSX.Element {
  return (
    <Box sx={{ ...centeredFullViewportSx, height: '100vh' }}>
      <Typography variant="body1" color="text.secondary">
        This section failed to load. Please try refreshing the page.
      </Typography>
    </Box>
  );
}

function MainContent(): React.JSX.Element {
  useFullPageScroll();
  const { activeSection, activeSectionId, direction } = useNavigationState();
  const Component = activeSection.Component;

  return (
    <Box
      component="main"
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        {Component && (
          <PageTransitionWrapper key={activeSectionId}>
            <ErrorBoundary fallback={<SectionErrorFallback />}>
              <Suspense fallback={<SectionSkeleton />}>
                <Component />
              </Suspense>
            </ErrorBoundary>
          </PageTransitionWrapper>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default MainContent;
