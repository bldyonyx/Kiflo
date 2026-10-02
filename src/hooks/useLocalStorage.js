import { useState } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue =
        window.localStorage.getItem(key);

      return storedValue !== null
        ? JSON.parse(storedValue)
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (newValue) => {
    setValue((currentValue) => {
      const valueToStore =
        typeof newValue === "function"
          ? newValue(currentValue)
          : newValue;

      try {
        window.localStorage.setItem(
          key,
          JSON.stringify(valueToStore)
        );
      } catch {
        // Keep the React state working even if
        // localStorage is unavailable.
      }

      return valueToStore;
    });
  };

  return [value, setStoredValue];
}

export default useLocalStorage;