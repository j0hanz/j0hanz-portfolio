import { useSuspenseQuery } from '@tanstack/react-query';

import type { RepoStats } from '@/config/types';
import { LONG_CACHE_OPTIONS } from '@/utils/query/client';
import { fetchRepoStats } from '@/utils/query/github';
import { githubKeys } from '@/utils/query/keys';

export function useGitHubApi(repoPath: string): { repoStats: RepoStats } {
  const { data } = useSuspenseQuery({
    queryKey: githubKeys.repoStats(repoPath),
    queryFn: ({ signal }) => fetchRepoStats(repoPath, signal),
    ...LONG_CACHE_OPTIONS,
  });

  return {
    repoStats: data,
  };
}
