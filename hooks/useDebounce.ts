import { useEffect, useState } from 'react';

/**
 * Returns a "debounced" copy of `value` that only updates
 * after `delay` ms have elapsed with no new changes.
 */
export default function useDebounce<T>(value: T, delay: number = 300): T {
  // Holds the debounced value
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    // Waits for delay before updating debounced value
    const id = setTimeout(() => setDebounced(value), delay);
    // Clears timeout if value or delay changes before timer finishes
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
