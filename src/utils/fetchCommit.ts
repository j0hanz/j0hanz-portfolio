import { fetchCommitHistory } from '@/api/github';
import { Project } from '@/data/projects';

// Fetch commit histories for multiple projects
export const fetchCommit = async (projects: Project[]) => {
  const historyPromises = projects.map(async (project) => {
    const history = await fetchCommitHistory(project.github);
    return { [project.title]: history };
  });
  const histories = await Promise.all(historyPromises);
  return histories.reduce((acc, history) => ({ ...acc, ...history }), {});
};
