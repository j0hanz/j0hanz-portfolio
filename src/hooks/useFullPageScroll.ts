import { useEffect, useRef } from 'react';

import { useNavigation } from '@/hooks/useNavigation';

export function useFullPageScroll(): void {
  const { moveNext, movePrev } = useNavigation();
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      const container = document.getElementById('active-section-container');
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const isAtTop = scrollTop <= 0;
        const isAtBottom =
          Math.abs(scrollHeight - clientHeight - scrollTop) < 2; // 2px tolerance

        if (e.deltaY > 0) {
          // Scrolling down
          if (!isAtBottom) {
            // Allow internal scroll
            return;
          }
        } else {
          // Scrolling up
          if (!isAtTop) {
            // Allow internal scroll
            return;
          }
        }
      }

      // Threshold to avoid accidental small scrolls
      if (Math.abs(e.deltaY) > 30) {
        isScrolling.current = true;

        if (e.deltaY > 0) {
          moveNext();
        } else {
          movePrev();
        }

        // Lock scrolling for a duration (e.g., 1000ms) to allow animation to complete
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const container = document.getElementById('active-section-container');
      let isAtTop = true;
      let isAtBottom = true;

      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        isAtTop = scrollTop <= 0;
        isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 2;
      }

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        if (!isAtBottom) {
          // Allow default behavior (scrolling)
          return;
        }
        e.preventDefault();
        if (!isScrolling.current) {
          isScrolling.current = true;
          moveNext();
          setTimeout(() => {
            isScrolling.current = false;
          }, 1000);
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        if (!isAtTop) {
          // Allow default behavior (scrolling)
          return;
        }
        e.preventDefault();
        if (!isScrolling.current) {
          isScrolling.current = true;
          movePrev();
          setTimeout(() => {
            isScrolling.current = false;
          }, 1000);
        }
      }
    };

    // Basic touch support
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > 50) {
        const container = document.getElementById('active-section-container');
        if (container) {
          const { scrollTop, scrollHeight, clientHeight } = container;
          const isAtTop = scrollTop <= 0;
          const isAtBottom =
            Math.abs(scrollHeight - clientHeight - scrollTop) < 2;

          if (deltaY > 0) {
            // Swiping up (scrolling down)
            if (!isAtBottom) return;
          } else {
            // Swiping down (scrolling up)
            if (!isAtTop) return;
          }
        }

        // Threshold
        if (!isScrolling.current) {
          isScrolling.current = true;
          if (deltaY > 0) {
            moveNext();
          } else {
            movePrev();
          }
          setTimeout(() => {
            isScrolling.current = false;
          }, 1000);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [moveNext, movePrev]);
}
