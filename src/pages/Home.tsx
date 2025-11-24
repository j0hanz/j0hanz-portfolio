import { Box } from '@mui/material';

import { AnimatePresence, PageTransitionWrapper } from '@/components/Motions';
import { sections } from '@/config/sections';
import { useFullPageScroll } from '@/hooks/useFullPageScroll';
import { useNavigationState } from '@/hooks/useNavigation';

function MainContent(): React.JSX.Element {
  useFullPageScroll();
  const { activeSectionId, direction } = useNavigationState();

  const activeSection = sections.find((s) => s.id === activeSectionId);
  const Component = activeSection?.Component;

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
            <Component />
          </PageTransitionWrapper>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default MainContent;
