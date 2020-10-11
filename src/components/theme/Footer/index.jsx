import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import tw, { css } from 'twin.macro';

import social from './social.json';

/*
  Footer Styles are defined first.
  * The Footer is a container
  * The Footer has a top row and a bottom row
  * Each row is made of sections
*/

const footerContainerStyles = css`
  display: flex;
  flex-direction: column;

  background-color: #161314;

  :last-child {
    ${tw`mt-8`}
  }
`;

const footerTopRowStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 960px) {
    flex-direction: column;
  }

  @media (max-width: 1979px) {
    ${tw`pt-12`}
  }

  @media (min-width: 1980px) {
    ${tw`px-4 pt-8`}
  }

  ${tw`px-16 pb-4`}
`;

const footerBottomRowStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-bottom: 2rem;

  @media (max-width: 960px) {
    flex-direction: column;
    margin-bottom: 0;
  }

  @media (max-width: 1979px) {
    justify-content: space-between;
  }

  @media (min-width: 1980px) {
    ${tw`justify-center gap-64`}
  }

  ${tw`px-16 pb-4`}
`;

const footerTopSectionStyle = css`
  color: #f5f5f5;
  max-width: 200px;
  ${tw`flex flex-col flex-1`}

  @media (max-width: 960px) {
    margin-bottom: 3rem;
  }
`;

const footerSocialStyle = css`
  ${tw`flex flex-row`}
`;

const footerBottomSectionStyle = `
  margin-top: 4rem;
  color: #f5f5f5;

  @media (max-width: 960px) {
    margin-bottom: 0;
  }
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
      <div className="footer-row" css={footerTopRowStyles}>
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

        <section className="footer-social-container" css={footerTopSectionStyle}>
          <h1 css={footerSectionTitleStyles}>Stay In Touch</h1>

          <div className="footer-social-links" css={footerSocialStyle}>
            {social.map(({ id, name, link, icon }) => (
              <a key={id} href={link} target="_blank" rel="noopener noreferrer" aria-label={`follow us on ${name}`}>
                <img width="24" src={icon} alt={name} />
              </a>
            ))}
          </div>
        </section>
      </div>

      <div className="footer-row" css={footerBottomRowStyles}>
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
