// Query utility functions with typed error handling

// Discriminated union for query error types
export type QueryErrorType = 'network' | 'rate-limit' | 'not-found' | 'unknown';

export interface QueryErrorInfo {
  type: QueryErrorType;
  message: string;
  retryable: boolean;
}

// Error messages for each type
const ERROR_MESSAGES: Record<QueryErrorType, string> = {
  network: 'Network error. Please check your connection.',
  'rate-limit': 'GitHub API rate limit exceeded. Please try again later.',
  'not-found': 'Resource not found.',
  unknown: 'An unexpected error occurred.',
} as const;

// Classifies error and returns structured info for handling
export function classifyQueryError(error: Error): QueryErrorInfo {
  const message = error.message.toLowerCase();

  if (message.includes('fetch') || message.includes('network')) {
    return {
      type: 'network',
      message: ERROR_MESSAGES.network,
      retryable: true,
    };
  }
  if (message.includes('rate limit') || message.includes('403')) {
    return {
      type: 'rate-limit',
      message: ERROR_MESSAGES['rate-limit'],
      retryable: false,
    };
  }
  if (message.includes('404') || message.includes('not found')) {
    return {
      type: 'not-found',
      message: ERROR_MESSAGES['not-found'],
      retryable: false,
    };
  }

  return {
    type: 'unknown',
    message: error.message || ERROR_MESSAGES.unknown,
    retryable: true,
  };
}

// Returns user-friendly error message (legacy API)
export function handleQueryError(error: Error): string {
  return classifyQueryError(error).message;
}
