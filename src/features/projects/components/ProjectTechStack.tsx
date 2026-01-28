import { Box, Chip, type SxProps, type Theme } from '@mui/material';

import type { ProjectTechStackProps } from '@/config/types';

const containerSx: SxProps<Theme> = (theme) =>
  theme.custom.layout.projectTechStack.container;

const chipSx: SxProps<Theme> = (theme) =>
  theme.custom.layout.projectTechStack.chip;

function ProjectTechStack({
  technologies,
}: Readonly<ProjectTechStackProps>): React.JSX.Element {
  return (
    <Box sx={containerSx}>
      {technologies.map((tech) => (
        <Chip key={tech} label={tech} size="small" sx={chipSx} />
      ))}
    </Box>
  );
}

ProjectTechStack.displayName = 'ProjectTechStack';

export { ProjectTechStack };
