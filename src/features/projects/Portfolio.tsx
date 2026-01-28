import { useRef } from 'react';

import FolderTwoTone from '@mui/icons-material/FolderTwoTone';
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { m } from 'motion/react';

import { SplitText } from '@/components/animations';
import { SectionContainer } from '@/components/SectionContainer';
import { createStaggerContainer } from '@/config/motion';
import { useMobileBreakpoint, useMotionVariant } from '@/hooks';
import { projects } from '@/lib/data/projects';

import { ProjectGridItem } from './ProjectGridItem';
import { ProjectMasonryItem } from './ProjectMasonryItem';

// Rendering portfolio section
function Portfolio(): React.JSX.Element {
  const theme = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Use grid on mobile (< md), masonry on desktop (>= md)
  const useGridLayout = useMobileBreakpoint('md');

  // Use animate with proper viewport config for full-page scroll sections
  // Using once:false ensures animations replay when section remounts on navigation
  const motionProps = useMotionVariant(createStaggerContainer(0.1, 0.15), {
    initial: 'initial',
    whileInView: 'animate',
    viewport: { once: false, amount: 0.1 },
  });

  return (
    <SectionContainer
      id="portfolio"
      title={
        <SplitText
          text="Projects"
          splitType="chars"
          delay={50}
          duration={0.5}
          ease="power3.out"
        />
      }
      icon={FolderTwoTone}
      maxWidth={false}
    >
      <Box
        ref={sectionRef}
        component={m.div}
        {...motionProps}
        sx={{ width: 1, overflow: 'hidden' }}
      >
        {useGridLayout ? (
          <Grid container spacing={theme.custom.spacing.grid}>
            {projects.map((project) => (
              <ProjectGridItem key={project.github} project={project} />
            ))}
          </Grid>
        ) : (
          <Masonry
            columns={{ sm: 1, md: 2, lg: 3 }}
            spacing={theme.custom.spacing.masonry}
          >
            {projects.map((project) => (
              <ProjectMasonryItem key={project.github} project={project} />
            ))}
          </Masonry>
        )}
      </Box>
    </SectionContainer>
  );
}

export { Portfolio };
