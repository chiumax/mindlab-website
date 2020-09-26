import React, { useContext } from 'react';
import tw, { css } from 'twin.macro';
import { ThemeContext } from 'providers/ThemeProvider';
import NavbarLinks from '../NavbarLinks';
import ToggleTheme from '../ToggleTheme';
import { SidebarContainer } from './styles';

const menuStyles = css`
  *:last-child {
    margin-bottom: 1rem;
  }
  ${tw`flex flex-row justify-between`}
  @media (max-width: 960px) {
    ${tw`flex flex-col items-center`}
  }
`;

const Sidebar = ({ sidebar, toggle }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <SidebarContainer active={sidebar} onClick={toggle} theme={theme} css={menuStyles}>
      <NavbarLinks />
      <ToggleTheme />
    </SidebarContainer>
  );
};

export default Sidebar;
