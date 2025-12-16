// DEPRECATED: This file is no longer used.
// GitHub API logic has been consolidated to utils/query/github.ts
// which uses TanStack Query for proper caching and suspense support.
//
// All GitHub stats fetching should use:
// - prefetchRepoStats() for prefetching
// - useQuery with githubKeys.repoStats() for data fetching
//
// This file is kept temporarily for reference and will be removed in a future cleanup.
