import React, { useContext } from 'react';
import tw, { css, styled } from 'twin.macro';

import { ThemeContext } from 'providers/ThemeProvider';

const footerLinksStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const footerLinksTitleStyles = css`
  ${tw`text-base font-bold`}
`;

export const FooterLinks = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className="footer-links" css={footerLinksStyles}>
      <h1 css={footerLinksTitleStyles}>Link</h1>
      <a href="#">Privacy Policy</a>
      <a href="#">UMC Computer Science</a>
    </section>
  );
};
