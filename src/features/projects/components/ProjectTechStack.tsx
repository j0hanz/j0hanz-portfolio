import { Box, Chip, type SxProps, type Theme } from '@mui/material';

import type { ProjectTechStackProps } from '@/config/types';

const containerSx: SxProps<Theme> = {
  transform: (theme) => theme.custom.motion.skew,
  flex: 'none',
};

const chipSx: SxProps<Theme> = {
  mr: { xs: 0.75, sm: 0.875, md: 1 },
  mb: { xs: 0.75, sm: 0.875, md: 1 },
  color: 'text.primary',
  fontSize: (theme) => theme.typography.caption.fontSize,
  opacity: 0.85,
  transform: (theme) => theme.custom.motion.skew,
  '& .MuiChip-label': {
    textTransform: 'uppercase',
  },
};

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
