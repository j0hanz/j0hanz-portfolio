// TanStack Query - centralized exports

export { LONG_CACHE_OPTIONS, queryClient } from './client';
export { buildQueryKey, contactKeys, githubKeys } from './keys';
export {
  fetchRepoStats,
  invalidateRepoStats,
  prefetchRepoStats,
  useRepoStatsQuery,
} from './github';
export { submitContactForm, useContactFormMutation } from './contact';
export { classifyQueryError, handleQueryError } from './utils';
export type { QueryErrorInfo, QueryErrorType } from './utils';
