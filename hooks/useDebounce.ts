import { useState, useEffect } from 'react';

/**
 * Returns a "debounced" copy of `value` that only updates
 * after `delay` ms have elapsed with no new changes.
 */
export default function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
