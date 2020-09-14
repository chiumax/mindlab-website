import React, { createContext } from 'react';
import useDarkMode from 'hooks/useDarkMode';

export const ThemeContext = createContext('light');

export default ({ children }) => {
  const [themeData, toggleTheme,theme] = useDarkMode();

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        themeData
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};


