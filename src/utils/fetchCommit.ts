import { fetchCommitHistory } from '@/api/github';
import { Project } from '@/data/projects';

// Fetch commit histories for multiple projects
export const fetchCommit = async (projects: Project[]) => {
  const historyPromises = projects.map(async (project) => {
    const history = await fetchCommitHistory(project.github);
    return { [project.title]: history };
  });

  try {
    // Wait for all commit histories to be fetched
    const histories = await Promise.all(historyPromises);
    // Combine all histories into a single object
    return histories.reduce((acc, history) => ({ ...acc, ...history }), {});
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching commit histories:', error.message);
    } else {
      console.error('Error fetching commit histories:', error);
    }
    return {};
  }
};
