import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { NavLinksWrapper } from './styles';

export default function NavbarLinks({ desktop }) {
  const { theme } = useContext(ThemeContext);

  const routes = useStaticQuery(graphql`
    query NavigationQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            name
            link
          }
        }
      }
    }
  `).site.siteMetadata.menuLinks.map(menuLink => (
    <Link to={menuLink.link} key={menuLink.link} style={{ marginRight: '1rem' }}>
      {menuLink.name}
    </Link>
  ));

  return (
    <NavLinksWrapper desktop={desktop} theme={theme}>
      <div
        style={{
          margin: '0 auto',
          maxWidth: 960,
          padding: '0px 1.0875rem 1.45rem',
          paddingTop: 0,
        }}
      >
        {routes}
      </div>
    </NavLinksWrapper>
  );
}
