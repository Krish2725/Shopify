import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function: clears the timer if the value changes before the delay ends
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}