// Centralized error messages for consistent user feedback (Suggestion #15)

export const ErrorMessages = {
  // Form-related errors
  form: {
    sendFailed:
      'Unable to send your message. Please try again or contact us directly.',
    sendFailedWithEmail: (email: string) =>
      `Unable to send your message. Please try again or email us at ${email}`,
    validation: 'Please check your entries and try again.',
    rateLimited:
      'Too many requests. Please wait a few minutes before trying again.',
    serviceUnavailable:
      'Service temporarily unavailable. Please try again later.',
  },

  // Clipboard operations
  clipboard: {
    copyFailed: 'Could not copy to clipboard. Please select and copy manually.',
    copySuccess: 'Copied to clipboard!',
  },

  // Network-related errors
  network: {
    offline:
      "You're offline. Please check your internet connection and try again.",
    timeout: 'Request timed out. Please check your connection and try again.',
    serverError: 'Server error. Please try again later.',
    unknownError: 'An unexpected error occurred. Please try again.',
  },

  // GitHub API errors
  github: {
    rateLimited: (resetTime?: Date) =>
      resetTime
        ? `Rate limit reached. Stats will refresh at ${resetTime.toLocaleTimeString()}`
        : 'Rate limit exceeded. Please try again later.',
    notFound: 'Repository not found.',
    unauthorized: 'Unable to access repository.',
    serverError: 'GitHub service temporarily unavailable.',
    statsUnavailable: 'Stats temporarily unavailable.',
  },

  // Authentication errors
  auth: {
    expired: 'Your session has expired. Please refresh the page.',
    invalid: 'Authentication failed. Please try again.',
  },

  // Generic fallbacks
  generic: {
    tryAgain: 'Something went wrong. Please try again.',
    contactSupport: 'Please contact support if the problem persists.',
    refreshPage: 'Please refresh the page and try again.',
  },
} as const;

// Error message formatter - extracts user-friendly message from error objects
export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Handle specific error messages
    if (error.message.includes('rate limit')) {
      return ErrorMessages.github.rateLimited();
    }
    if (
      error.message.includes('offline') ||
      error.message.includes('network')
    ) {
      return ErrorMessages.network.offline;
    }
    if (error.message.includes('timeout')) {
      return ErrorMessages.network.timeout;
    }
    if (error.message.includes('404')) {
      return ErrorMessages.github.notFound;
    }
    if (error.message.includes('403') || error.message.includes('401')) {
      return ErrorMessages.github.unauthorized;
    }
    if (error.message.startsWith('5')) {
      return ErrorMessages.network.serverError;
    }

    // Return the error message if it's user-friendly
    return error.message;
  }

  // Fallback for unknown errors
  return ErrorMessages.generic.tryAgain;
}
