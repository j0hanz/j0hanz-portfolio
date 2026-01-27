// Detects iOS devices (iPhone, iPad, iPod) for touch optimization
// Includes iPadOS 13+ which reports as Mac in user agent
export const isIOS =
  typeof navigator !== 'undefined' &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1));
