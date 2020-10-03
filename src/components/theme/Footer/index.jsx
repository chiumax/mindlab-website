import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import tw, { css } from 'twin.macro';

import social from './social.json';

const footerContainerStyles = css`
  display: flex;
  flex-direction: column;

  background-color: #161314;

  @media (max-width: 1960px) {
    ${tw`px-4 py-8`}

    padding-top: 14rem;
  }

  :last-child {
    ${tw`mt-8`}
  }
`;

const footerRowStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${tw`px-16 pb-8`}
`;

const footerTopSectionStyle = css`
  color: #f5f5f5;
  ${tw`flex flex-col flex-1`}
`;

const footerBottomSectionStyle = `
  color: #f5f5f5;
`;

const footerSectionTitleStyles = css`
  color: #f5f5f5;
  ${tw`text-base font-bold`}
`;

const widthAuto = () => ({ tw: 'w-auto' });

/**
 * Describes the entire Footer.
 * The Footer will be divided into several parts:
 * * Top Half
 *    * "MIND Lab" with a phrase/mission statement
 *    * "Navigate" links section
 *    * "Legal" for privacy/terms and conditions
 *    * "UMD" for "one-level up" stuff like the CS Department site
 * * Bottom Half
 *    * Copyright
 *    * Built by
 */
export const Footer = () => {
  const internalRoutes = useStaticQuery(graphql`
    query InternalRoutesQuery {
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
    <Link to={menuLink.link} key={menuLink.link} getProps={widthAuto}>
      {menuLink.name}
    </Link>
  ));

  return (
    <footer css={footerContainerStyles}>
      <div className="footer-row" css={footerRowStyles}>
        <section className="footer-brand" css={footerTopSectionStyle}>
          <h1 css={footerSectionTitleStyles}>MIND Lab</h1>
          <p>Exploring the unknown connections within data</p>
        </section>

        <section className="footer-nav-links" css={footerTopSectionStyle}>
          <h1 css={footerSectionTitleStyles}>Lost?</h1>

          {internalRoutes}
        </section>

        <section className="location" css={footerTopSectionStyle}>
          <h1 css={footerSectionTitleStyles}>Where are we?</h1>

          <div>Brendan Iribe Center for Computer Science and Engineering</div>
          <div>Room 2120</div>
          <div>8125 Paint Branch Dr</div>
          <div>College Park, MD 20742</div>
        </section>

        <section className="footer-social-links" css={footerTopSectionStyle}>
          <h1 css={footerSectionTitleStyles}>Stay In Touch</h1>
          {social.map(({ id, name, link, icon }) => (
            <a key={id} href={link} target="_blank" rel="noopener noreferrer" aria-label={`follow me on ${name}`}>
              <img width="24" src={icon} alt={name} />
            </a>
          ))}
        </section>
      </div>
      <div className="footer-row" css={footerRowStyles}>
        <section className="copyright" css={footerBottomSectionStyle}>
          <span>© {new Date().getFullYear()} MIND Lab | All Rights Reserved</span>
        </section>

        <section className="built-by" css={footerBottomSectionStyle}>
          <span>Built by Max and Dale</span>
        </section>
      </div>
    </footer>
  );
};
