import { Component, type ErrorInfo } from 'react';

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
    // Only log in development to avoid exposing stack traces in production
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  private handleReset = (): void => {
    // Reset TanStack Query errors if onReset provided
    this.props.onReset?.();
    this.setState({ hasError: false });
  };

  render(): React.JSX.Element {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return <>{this.props.fallback}</>;
      }

      return (
        <Box sx={(theme) => theme.custom.layout.centeredFullViewport}>
          <Stack spacing={3} alignItems="center" maxWidth="sm">
            <Alert severity="error" sx={{ width: 1 }}>
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

    return <>{this.props.children}</>;
  }
}

export { ErrorBoundary };
