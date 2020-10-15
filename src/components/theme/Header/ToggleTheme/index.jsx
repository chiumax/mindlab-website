import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import sunIcon from 'assets/icons/sun.svg';
import moonIcon from 'assets/icons/moon.svg';
import { ToggleThemeContainer } from './styles';

/**
 * Describes the "toggle dark/light theme" component
 */
const ToggleTheme = () => {
  const { theme, toggleTheme, themeData } = useContext(ThemeContext);

  return (
    <ToggleThemeContainer type="button" onClick={toggleTheme}>
      <img src={themeData === 'light' ? moonIcon : sunIcon} alt={theme} />
    </ToggleThemeContainer>
  );
};

export default ToggleTheme;
