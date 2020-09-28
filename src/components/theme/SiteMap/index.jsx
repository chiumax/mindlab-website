import React, { useContext } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import tw, { styled, css } from 'twin.macro';

import { ThemeContext } from 'providers/ThemeProvider';

const siteMapStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const siteMapTitleStyles = css`
  ${tw`text-base font-bold`}
`;

export const SiteMap = () => {
  const { theme } = useContext(ThemeContext);

  const routes = useStaticQuery(graphql`
    query SiteMapQuery {
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
    <Link to={menuLink.link} key={menuLink.link}>
      {menuLink.name}
    </Link>
  ));

  return (
    <div className="site-map" css={siteMapStyles}>
      <h1 css={siteMapTitleStyles}>Site Map</h1>

      {routes}
    </div>
  );
};
