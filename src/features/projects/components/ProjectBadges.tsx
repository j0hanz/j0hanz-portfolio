import React from 'react';

import { ProjectBadgesProps } from '@/config/types';

const ProjectBadges = ({ badges }: ProjectBadgesProps): React.JSX.Element => (
  <>
    {badges.map(({ flag, src, alt, style, width, height }) => (
      <img
        key={flag}
        src={src}
        alt={alt}
        style={style}
        loading="lazy"
        decoding="async"
        width={width}
        height={height}
      />
    ))}
  </>
);

ProjectBadges.displayName = 'ProjectBadges';

export default ProjectBadges;
