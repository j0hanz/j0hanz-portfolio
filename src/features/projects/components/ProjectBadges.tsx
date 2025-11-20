import React from 'react';

import { ProjectBadgesProps } from '@/config/types';

const ProjectBadges = ({ badges }: ProjectBadgesProps): React.JSX.Element => (
  <>
    {badges.map(({ flag, src, alt, className, width, height }) => (
      <img
        key={flag}
        src={src}
        alt={alt}
        className={className}
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
