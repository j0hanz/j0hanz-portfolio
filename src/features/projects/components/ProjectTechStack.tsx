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
  pt: 0.1,
  display: 'inline-flex',
  alignItems: 'center',
  color: 'text.primary',
  fontSize: (theme) => theme.typography.caption.fontSize,
  opacity: 0.9,
  transform: SKEW_TRANSFORM,
  '& .MuiChip-label': {
    color: 'text.primary',
    textTransform: 'uppercase',
    fontSize: (theme) => theme.typography.caption.fontSize,
  },
};

const ProjectTechStack = ({
  technologies,
}: ProjectTechStackProps): React.JSX.Element => (
  <Box sx={containerSx}>
    {technologies.map((tech, index) => (
      <Chip key={`${tech}-${index}`} label={tech} size="small" sx={chipSx} />
    ))}
  </Box>
);

ProjectTechStack.displayName = 'ProjectTechStack';

export default ProjectTechStack;
