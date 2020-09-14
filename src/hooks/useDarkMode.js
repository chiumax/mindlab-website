import { useState, useEffect } from 'react';
import useMedia from 'hooks/useMedia';
import {lightTheme, darkTheme} from "../components/ThemeData";


export default () => {
  var [themeData, setTheme, theme] = useState('light');

  const toggleTheme = () => {
    if (themeData === 'light') {
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  const prefersDarkMode = useMedia(['(prefers-color-scheme: dark)'], [true], false);

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      window.localStorage.setItem('theme', localTheme);
      setTheme(localTheme);
    } else if (prefersDarkMode) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [prefersDarkMode]);
  theme = themeData === "light" ? lightTheme : darkTheme;
  return [themeData, toggleTheme, theme];
};
