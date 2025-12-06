import { useState } from 'react';

import type { UseImageLoadingReturn } from '@/config/types';

// Tracks image loading state with event handlers
export function useImageLoading(): UseImageLoadingReturn {
  const [isLoaded, setIsLoaded] = useState(false);

  // Single handler for both load and error (image is "done" either way)
  const handleComplete = () => setIsLoaded(true);

  return {
    isLoaded,
    handleLoad: handleComplete,
    handleError: handleComplete,
    reset: () => setIsLoaded(false),
  };
}
