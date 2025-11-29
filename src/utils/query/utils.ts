// Query utility functions with typed error handling

// Discriminated union for query error types
export type QueryErrorType = 'network' | 'rate-limit' | 'not-found' | 'unknown';

export interface QueryErrorInfo {
  type: QueryErrorType;
  message: string;
  retryable: boolean;
}

// Error messages for each type
const ERROR_MESSAGES: Readonly<Record<QueryErrorType, string>> = {
  network: 'Network error. Please check your connection.',
  'rate-limit': 'GitHub API rate limit exceeded. Please try again later.',
  'not-found': 'Resource not found.',
  unknown: 'An unexpected error occurred.',
} as const;

// Type guard to narrow unknown to Error
function isError(value: unknown): value is Error {
  return value instanceof Error;
}

// Type guard for network-related errors
function isNetworkError(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return lowerMessage.includes('fetch') || lowerMessage.includes('network');
}

// Type guard for rate limit errors
function isRateLimitError(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return lowerMessage.includes('rate limit') || lowerMessage.includes('403');
}

// Type guard for not found errors
function isNotFoundError(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return lowerMessage.includes('404') || lowerMessage.includes('not found');
}

// Classifies error and returns structured info for handling
export function classifyQueryError(error: unknown): QueryErrorInfo {
  // Handle non-Error values
  if (!isError(error)) {
    return {
      type: 'unknown',
      message: ERROR_MESSAGES.unknown,
      retryable: true,
    };
  }

  const message = error.message;

  if (isNetworkError(message)) {
    return {
      type: 'network',
      message: ERROR_MESSAGES.network,
      retryable: true,
    };
  }

  if (isRateLimitError(message)) {
    return {
      type: 'rate-limit',
      message: ERROR_MESSAGES['rate-limit'],
      retryable: false,
    };
  }

  if (isNotFoundError(message)) {
    return {
      type: 'not-found',
      message: ERROR_MESSAGES['not-found'],
      retryable: false,
    };
  }

  return {
    type: 'unknown',
    message: message || ERROR_MESSAGES.unknown,
    retryable: true,
  };
}

// Returns user-friendly error message (legacy API - accepts unknown for flexibility)
export function handleQueryError(error: unknown): string {
  return classifyQueryError(error).message;
}
