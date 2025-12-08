import { cache } from 'react';

import { EMPTY_STATS, GITHUB_API_BASE_URL } from '@/config/constants';
import type { RepoStats } from '@/config/types';

export const getRepoStats = cache(
  async (repoPath: string): Promise<RepoStats> => {
    if (!repoPath) {
      return EMPTY_STATS;
    }

    try {
      const response = await fetch(`${GITHUB_API_BASE_URL}/${repoPath}`);
      if (!response.ok) {
        // Return empty stats if repo not found or other error
        return EMPTY_STATS;
      }
      const data = await response.json();
      return {
        stars: data.stargazers_count,
        forks: data.forks_count,
        issues: data.open_issues_count,
      };
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error(`Failed to fetch repo stats for ${repoPath}:`, error);
      }
      return EMPTY_STATS;
    }
  }
);

export function useGitHubApi(repoPath: string) {
  return {
    repoStats: getRepoStats(repoPath),
  };
}
