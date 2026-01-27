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
  const activeSection = sections.find(
    (section) => section.id === activeSectionId
  );
  const ActiveSection = activeSection?.Component;

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
        {activeSection && ActiveSection && (
          <PageTransitionWrapper key={activeSection.id}>
            <Activity mode="visible">
              <Box position="relative" height={1}>
                <ErrorBoundary
                  fallback={<SectionErrorFallback />}
                  data-testid="section-error-boundary"
                >
                  <Suspense fallback={<SectionSkeleton />}>
                    <ActiveSection />
                  </Suspense>
                </ErrorBoundary>
              </Box>
            </Activity>
          </PageTransitionWrapper>
        )}
      </AnimatePresence>
    </Box>
  );
}

export { Home };
