import { useEffect, useRef, useState, useCallback } from 'react'; // Importing hooks from React

// Custom hook for handling click outside to toggle a state
const useClickOutsideToggle = ({ ignoreRefs = [] } = {}) => {
  const [expanded, setExpanded] = useState(false); // State to manage the expanded state
  const ref = useRef(null); // Ref to attach to the element to detect outside clicks

  // Callback function to handle click outside
  const handleClickOutside = useCallback(
    (event) => {
      if (
        ref.current && // Check if ref is attached to an element
        !ref.current.contains(event.target) && // Check if the click is outside the element
        !ignoreRefs.some((ignoreRef) =>
          ignoreRef.current?.contains(event.target),
        ) // Check if the click is outside the ignored refs
      ) {
        setExpanded(false); // Set expanded state to false
      }
    },
    [ignoreRefs], // Dependency array for the callback
  );

  // Effect to add and clean up the event listener for mouseup
  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside); // Add event listener for mouseup
    return () => {
      document.removeEventListener('mouseup', handleClickOutside); // Clean up event listener on unmount
    };
  }, [handleClickOutside]); // Dependency array for the effect

  return { expanded, setExpanded, ref }; // Return the expanded state, setter, and ref
};

export default useClickOutsideToggle; // Export the custom hook as default export
