import { Component, ErrorInfo, ReactNode } from 'react';

import { Alert, Box, Button, Stack, Typography } from '@mui/material';

import type {
  ErrorBoundaryState,
  ExtendedErrorBoundaryProps,
} from '@/config/types';

class ErrorBoundary extends Component<
  ExtendedErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  private handleReset = (): void => {
    // Reset TanStack Query errors if onReset provided
    this.props.onReset?.();
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 3,
          }}
        >
          <Stack spacing={3} alignItems="center" maxWidth="sm">
            <Alert severity="error" sx={{ width: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Something went wrong
              </Typography>
              <Typography variant="body2" color="text.secondary">
                An unexpected error occurred. Please try refreshing the page or
                contact support if the problem persists.
              </Typography>
            </Alert>
            <Button variant="contained" onClick={this.handleReset} size="large">
              Try Again
            </Button>
          </Stack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
