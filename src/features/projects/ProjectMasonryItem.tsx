import { ProjectListProps } from '@/config/types';

import { ProjectCard } from './components/ProjectCard';
import { ProjectCardMotionWrapper } from './ProjectGridItem';

function ProjectMasonryItem({ project }: ProjectListProps): React.JSX.Element {
  return (
    <ProjectCardMotionWrapper fullHeight={false}>
      <ProjectCard project={project} />
    </ProjectCardMotionWrapper>
  );
}

ProjectMasonryItem.displayName = 'ProjectMasonryItem';

export default ProjectMasonryItem;
