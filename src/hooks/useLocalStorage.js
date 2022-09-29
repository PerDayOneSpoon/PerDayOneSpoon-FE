import { useState } from 'react';

export const useLocalStorage = (key, initialValue, parseValue = (v) => v) => {
  const [item, setValue] = useState(() => {
    const value = parseValue(localStorage.getItem(key)) || initialValue;
    localStorage.setItem(key, value);
    return value;
  });

  const setItem = (newValue) => {
    setValue(newValue);
    window.localStorage.setItem(key, newValue);
  };

  return [item, setItem];
};
