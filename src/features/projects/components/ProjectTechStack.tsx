import { Box, Chip, type SxProps, type Theme } from '@mui/material';

import { ProjectTechStackProps } from '@/config/types';

const containerSx: SxProps<Theme> = {
  transform: 'skew(-5deg)',
  flexShrink: 0,
};

const chipSx: SxProps<Theme> = {
  mr: 1,
  mb: 1,
  pt: 0.1,
  display: 'inline-flex',
  alignItems: 'center',
  color: 'text.primary',
  fontSize: '0.8rem',
  opacity: 0.9,
  transform: 'skew(-5deg)',
  '& .MuiChip-label': {
    color: 'text.primary',
    textTransform: 'uppercase',
    fontSize: '0.7rem',
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
