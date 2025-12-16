import { useEffect, useEffectEvent } from 'react';

// Attaches event listener to element/window/document with auto cleanup
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
  const onEvent = useEffectEvent(handler);

  useEffect(() => {
    // Define the target element
    const targetElement: T | Window | null =
      element && 'current' in element ? element.current : (element ?? window);

    if (!targetElement?.addEventListener) return;

    // Create event listener that calls handler function stored in ref
    const eventListener: typeof handler = (event) => onEvent(event);

    targetElement.addEventListener(eventName, eventListener, options);

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
}
