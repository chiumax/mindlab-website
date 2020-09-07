import React, { useContext } from 'react';
import { ThemeContext } from 'providers/ThemeProvider';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { Wrapper } from './styles';

export default function NavbarLinks({ desktop }) {
  const { theme } = useContext(ThemeContext);

  const routes = useStaticQuery(graphql`
    query SiteTitleQuery {
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
    <Wrapper desktop={desktop} theme={theme}>
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
    </Wrapper>
  );
}
