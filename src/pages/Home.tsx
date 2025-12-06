import { Suspense } from 'react';

import { Box } from '@mui/material';

import ErrorBoundary from '@/components/ErrorBoundary';
import { AnimatePresence, PageTransitionWrapper } from '@/components/Motions';
import { SectionErrorFallback } from '@/components/SectionErrorFallback';
import { SectionSkeleton } from '@/components/Skeletons';
import { useFullPageScroll, useNavigationState } from '@/hooks';

function Home(): React.JSX.Element {
  useFullPageScroll();
  const { activeSection, activeSectionId, direction } = useNavigationState();
  const Component = activeSection.Component;

  return (
    <Box
      component="main"
      sx={{
        height: '100vh',
        width: 1, // Use 100% instead of 100vw to avoid scrollbar width issues
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

export { Home };
