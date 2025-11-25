// TanStack QueryClient configuration for React 19 Suspense
import { QueryClient } from '@tanstack/react-query';

import { QUERY_CONFIG } from '@/config/constants';

// QueryClient configured for React 19 Suspense with 1min staleTime, 5min gcTime, and error throwing
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.STALE_TIME_SHORT,
      gcTime: QUERY_CONFIG.GC_TIME_SHORT,
      retry: 1,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      // throwOnError is required for Suspense to work with error boundaries
      throwOnError: true,
    },
    mutations: {
      retry: 1,
    },
  },
});
