import { useState } from 'react';

import type { UseImageLoadingReturn } from '@/config/types';

// Tracks image loading state with event handlers
export function useImageLoading(): UseImageLoadingReturn {
  const [isLoaded, setIsLoaded] = useState(false);

  const setLoaded = () => setIsLoaded(true);
  const reset = () => setIsLoaded(false);

  return { isLoaded, handleLoad: setLoaded, handleError: setLoaded, reset };
}

export default useImageLoading;
