import { RepoStats } from '@/config/types';

// Simple in-memory cache for promises to prevent duplicate requests
// This acts as a "Request Deduplication" and "Cache" layer
const statsCache = new Map<string, Promise<RepoStats>>();

export const getRepoStats = (repoPath: string): Promise<RepoStats> => {
  if (!statsCache.has(repoPath)) {
    const promise = fetch(`https://api.github.com/repos/${repoPath}`, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          // If rate limited or not found, return empty stats silently
          // or throw if you want ErrorBoundary to catch it
          console.warn(`Failed to fetch stats for ${repoPath}: ${res.status}`);
          return { stars: 0, forks: 0, issues: 0 };
        }
        return res.json();
      })
      .then((data) => ({
        stars: data.stargazers_count ?? 0,
        forks: data.forks_count ?? 0,
        issues: data.open_issues_count ?? 0,
      }))
      .catch((error) => {
        console.error(`Error fetching stats for ${repoPath}:`, error);
        return { stars: 0, forks: 0, issues: 0 };
      });

    statsCache.set(repoPath, promise);
  }

  return statsCache.get(repoPath)!;
};
