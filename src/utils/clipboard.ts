// Clipboard utility functions for copy operations

const COPY_MESSAGES = {
  email: {
    success: 'Email copied to clipboard',
    error: 'Unable to copy email',
  },
  repository: {
    success: 'Repository URL copied',
    error: 'Unable to copy repository URL',
  },
} as const;

// Get copy messages by type for consistent feedback
export function getCopyMessages(type: keyof typeof COPY_MESSAGES) {
  return COPY_MESSAGES[type];
}
