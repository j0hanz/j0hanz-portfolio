import { AnimatePresence, PageTransitionWrapper } from '@/components/Motions';
import { sections } from '@/config/sections';
import { useFullPageScroll } from '@/hooks/useFullPageScroll';
import { useNavigation } from '@/hooks/useNavigation';

function MainContent(): React.JSX.Element {
  useFullPageScroll();
  const { activeSectionId, direction } = useNavigation();

  const activeSection = sections.find((s) => s.id === activeSectionId);
  const Component = activeSection?.Component;

  return (
    <main
      style={{
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
    </main>
  );
}

export default MainContent;
