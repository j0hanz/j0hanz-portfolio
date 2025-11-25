// Query utility functions

// Handles query errors by returning user-friendly error message
export function handleQueryError(error: Error): string {
  if (error.message.includes('fetch')) {
    return 'Network error. Please check your connection.';
  }
  if (error.message.includes('rate limit')) {
    return 'GitHub API rate limit exceeded. Please try again later.';
  }
  return error.message || 'An unexpected error occurred.';
}
