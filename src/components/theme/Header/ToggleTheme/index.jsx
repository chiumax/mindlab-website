import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import sunIcon from 'assets/icons/sun.svg';
import moonIcon from 'assets/icons/moon.svg';
import { Wrapper } from './styles';

const ToggleTheme = () => {
  const { theme, toggleTheme, themeData } = useContext(ThemeContext);

  return (
    <Wrapper type="button" onClick={toggleTheme}>
      <img src={themeData === 'light' ? moonIcon : sunIcon} alt={theme} />
      <div>yeet</div>
    </Wrapper>
  );
};

export default ToggleTheme;
