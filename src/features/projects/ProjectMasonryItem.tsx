import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ProjectCardSkeleton } from '@/components/Skeletons';
import { ProjectListProps } from '@/config/types';

import { ProjectCard } from './components/ProjectCard';
import { ProjectCardMotionWrapper } from './ProjectGridItem';

function ProjectMasonryItem({
  project,
}: Readonly<ProjectListProps>): React.JSX.Element {
  return (
    <ProjectCardMotionWrapper fullHeight={false}>
      <ErrorBoundary fallback={<ProjectCardSkeleton />}>
        <ProjectCard project={project} />
      </ErrorBoundary>
    </ProjectCardMotionWrapper>
  );
}

ProjectMasonryItem.displayName = 'ProjectMasonryItem';

export { ProjectMasonryItem };
