import { Box, Chip, type SxProps, type Theme } from '@mui/material';

import { ProjectTechStackProps } from '@/config/types';
import { SKEW_TRANSFORM } from '@/styles/shared';

const containerSx: SxProps<Theme> = {
  transform: SKEW_TRANSFORM,
  flexShrink: 0,
};

const chipSx: SxProps<Theme> = {
  mr: 1,
  mb: 1,
  color: 'text.primary',
  fontSize: (theme) => theme.typography.caption.fontSize,
  opacity: 0.85,
  transform: SKEW_TRANSFORM,
  '& .MuiChip-label': {
    textTransform: 'uppercase',
  },
};

function ProjectTechStack({
  technologies,
}: ProjectTechStackProps): React.JSX.Element {
  return (
    <Box sx={containerSx}>
      {technologies.map((tech) => (
        <Chip key={tech} label={tech} size="small" sx={chipSx} />
      ))}
    </Box>
  );
}

ProjectTechStack.displayName = 'ProjectTechStack';

export default ProjectTechStack;
