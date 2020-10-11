import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import tw, { css } from 'twin.macro';

/*
  Footer Styles are defined first.
  * The Footer is a container
  * The Footer has a top row and a bottom row
  * Each row is made of sections
*/

const footerContainerStyles = css`
  background-color: #161314;

  ${tw`flex flex-col items-center pt-8`}

  @media (min-width: 1440px) {
    ${tw`px-4 py-8`}
  }
`;

const footerTopRowStyles = css`
  ${tw`flex flex-row justify-between px-16 py-8`}

  @media (max-width: 960px) {
    ${tw`flex-col`}
  }

  @media (min-width: 1440px) {
    ${tw`justify-center`}
  }
`;

const footerBottomRowStyles = css`
  ${tw`w-screen flex flex-row justify-between items-center gap-64 px-16 pb-8`}

  @media (min-width: 320px) {
    ${tw`items-start gap-2`}
  }

  @media (max-width: 960px) {
    flex-direction: column;
    margin-bottom: 0;
  }

  @media (min-width: 1440px) {
    width: 1200px;
    ${tw`justify-between items-center`}
  }
`;

const footerTopSectionStyle = css`
  color: #f5f5f5;
  max-width: 300px;
  ${tw`flex flex-col flex-1`}

  @media (max-width: 960px) {
    margin-bottom: 3rem;
  }
`;

const footerBottomSectionStyle = css`
  ${tw`mt-16`}
  color: #f5f5f5;

  @media (min-width: 320px) {
    ${tw`mt-4`}
  }

  @media (max-width: 960px) {
    margin-bottom: 0;
  }
`;

const footerSectionTitleStyles = css`
  color: #f5f5f5;
  ${tw`text-base font-bold`}
`;

const builtByStyle = css`
  ${tw`flex flex-row gap-1 items-center`}
`;

const footerLinkStyle = css`
  ${tw`text-blue-500 hover:underline hover:text-yellow-500`}
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
    <Link css={footerLinkStyle} to={menuLink.link} key={menuLink.link} getProps={widthAuto}>
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

          <Link css={footerLinkStyle} to="/">
            Home
          </Link>
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

          <a css={footerLinkStyle} href="mailto:agrawala@cs.umd.edu">
            Ask a question
          </a>
        </section>
      </div>

      <div className="footer-row" css={footerBottomRowStyles}>
        <section className="copyright" css={footerBottomSectionStyle}>
          <span>© {new Date().getFullYear()} MIND Lab | All Rights Reserved</span>
        </section>

        <section className="built-by" css={footerBottomSectionStyle}>
          <span css={builtByStyle}>
            Built by Max and Dale{' '}
            <a href="https://github.com/fwajid/mindlab_website" aria-label="See the project on GitHub">
              <img width="24" src="/icons/github.svg" alt="GitHub logo" />
            </a>
          </span>
        </section>
      </div>
    </footer>
  );
};
