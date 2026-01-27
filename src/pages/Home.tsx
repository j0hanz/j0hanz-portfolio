import { Activity, Suspense, useEffect } from 'react';

import { Box } from '@mui/material';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AnimatePresence, PageTransitionWrapper } from '@/components/Motions';
import { SectionErrorFallback } from '@/components/SectionErrorFallback';
import { SectionSkeleton } from '@/components/Skeletons';
import { sectionLoaders, sections } from '@/config/sections';
import { useFullPageScroll, useNavigationState } from '@/hooks';

// Home page component with full-page scroll and section transitions
function Home(): React.JSX.Element {
  useFullPageScroll();
  const { activeSectionId, direction } = useNavigationState();

  useEffect(() => {
    const currentIndex = sections.findIndex((s) => s.id === activeSectionId);
    if (currentIndex < 0) return;

    const prefetchSection = (id?: string) => {
      if (!id) return;
      const loader = sectionLoaders[id];
      if (loader) {
        void loader();
      }
    };

    prefetchSection(sections[currentIndex + 1]?.id);
    prefetchSection(sections[currentIndex - 1]?.id);
  }, [activeSectionId]);

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
        {sections.map(({ id, Component }) => (
          <Activity
            key={id}
            mode={activeSectionId === id ? 'visible' : 'hidden'}
          >
            <Box position="relative" height={1}>
              {activeSectionId === id && (
                <PageTransitionWrapper key={id}>
                  <ErrorBoundary
                    fallback={<SectionErrorFallback />}
                    data-testid="section-error-boundary"
                  >
                    <Suspense fallback={<SectionSkeleton />}>
                      <Component />
                    </Suspense>
                  </ErrorBoundary>
                </PageTransitionWrapper>
              )}
            </Box>
          </Activity>
        ))}
      </AnimatePresence>
    </Box>
  );
}

export { Home };
