import { useEffect } from 'react';

import useEventCallback from './useEventCallback';

/**
 * Custom hook that attaches an event listener to a DOM element, the window, or the document.
 * It handles cleanup automatically when the component unmounts.
 *
 * @param eventName - The name of the event to listen for (e.g., 'click', 'keydown').
 * @param handler - The callback function to execute when the event is triggered.
 * @param element - The target element to attach the listener to (defaults to window).
 * @param options - Optional event listener options (e.g., capture, passive).
 */
export function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  KM extends keyof MediaQueryListEventMap,
  T extends HTMLElement | MediaQueryList | void = void,
>(
  eventName: KW | KH | KM | string,
  handler: (
    event:
      | WindowEventMap[KW]
      | HTMLElementEventMap[KH]
      | MediaQueryListEventMap[KM]
      | Event
  ) => void,
  element?: React.RefObject<T | null> | T | Window | null,
  options?: boolean | AddEventListenerOptions
) {
  // Create a stable callback that always has the latest handler
  const savedHandler = useEventCallback(handler);

  useEffect(() => {
    // Define the target element
    const targetElement: T | Window | null =
      element && 'current' in element ? element.current : (element ?? window);

    if (!targetElement?.addEventListener) return;

    // Create event listener that calls handler function stored in ref
    const eventListener: typeof handler = (event) => savedHandler(event);

    targetElement.addEventListener(eventName, eventListener, options);

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options, savedHandler]);
}

export default useEventListener;
