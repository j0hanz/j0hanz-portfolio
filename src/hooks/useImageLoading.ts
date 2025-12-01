import { useState } from 'react';

export interface UseImageLoadingReturn {
  isLoaded: boolean;
  handleLoad: () => void;
  handleError: () => void;
  reset: () => void;
}

// Tracks image loading state with event handlers
export function useImageLoading(): UseImageLoadingReturn {
  const [isLoaded, setIsLoaded] = useState(false);

  // Both load and error mark the image as "loaded" (no longer loading)
  // React Compiler auto-stabilizes these callbacks
  const handleComplete = () => setIsLoaded(true);
  const reset = () => setIsLoaded(false);

  return {
    isLoaded,
    handleLoad: handleComplete,
    handleError: handleComplete,
    reset,
  };
}

export default useImageLoading;
