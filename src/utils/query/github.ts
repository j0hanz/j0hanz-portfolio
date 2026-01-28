import { z } from 'zod';

import {
  EMPTY_STATS,
  GITHUB_API_BASE_URL,
  QUERY_CONFIG,
} from '@/config/constants';
import type { RepoStats } from '@/config/types';

import { LONG_CACHE_OPTIONS, queryClient } from './client';
import { githubKeys } from './keys';

// Zod schema for GitHub API response
const RepoSchema = z.object({
  stargazers_count: z.number().optional(),
  forks_count: z.number().optional(),
  open_issues_count: z.number().optional(),
});

// Fetches GitHub repo stats (stars, forks, issues) from 'owner/repo' path
export async function fetchRepoStats(
  repoPath: string,
  signal?: AbortSignal
): Promise<RepoStats> {
  if (!repoPath) {
    throw new Error('Repository path is required');
  }

  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    // Add artificial delay in development to make skeleton loading visible
    if (import.meta.env.DEV) {
      await new Promise((resolve) =>
        setTimeout(resolve, QUERY_CONFIG.DEV_DELAY_MS)
      );
    }

    // Combine signal with timeout
    const timeoutSignal = AbortSignal.timeout(QUERY_CONFIG.TIMEOUT_MS);
    const finalSignal = signal
      ? AbortSignal.any([signal, timeoutSignal])
      : timeoutSignal;

    const response = await fetch(`${GITHUB_API_BASE_URL}/${repoPath}`, {
      headers,
      signal: finalSignal,
    });

    // Handle rate limiting - return cached data or empty stats
    if (response.status === 403 || response.status === 429) {
      const cached = queryClient.getQueryData<RepoStats>(
        githubKeys.repoStats(repoPath)
      );
      return cached ?? EMPTY_STATS;
    }

    // Handle not found - return empty stats
    if (response.status === 404) {
      return EMPTY_STATS;
    }

    // Handle other errors
    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`
      );
    }

    const json = await response.json();
    const data = RepoSchema.parse(json);

    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      issues: data.open_issues_count ?? 0,
    };
  } catch (error) {
    // Handle network errors - return cached data or empty stats
    // TypeError from fetch indicates network failure (offline, CORS, DNS, etc.)
    // TimeoutError is also a network error in this context
    const isNetworkError =
      error instanceof TypeError ||
      (error instanceof DOMException && error.name === 'AbortError') ||
      (error instanceof DOMException && error.name === 'TimeoutError');

    if (isNetworkError) {
      const cached = queryClient.getQueryData<RepoStats>(
        githubKeys.repoStats(repoPath)
      );
      return cached ?? EMPTY_STATS;
    }

    // Re-throw other errors (including ZodError)
    throw error;
  }
}

// Prefetches GitHub stats on hover/navigation to reduce perceived loading
export function prefetchRepoStats(repoPath: string): Promise<void> {
  if (!repoPath) return Promise.resolve();

  return queryClient
    .prefetchQuery({
      queryKey: githubKeys.repoStats(repoPath),
      queryFn: ({ signal }) => fetchRepoStats(repoPath, signal),
      ...LONG_CACHE_OPTIONS,
    })
    .catch(() => {
      // Silently fail - prefetch is optional enhancement
    });
}
