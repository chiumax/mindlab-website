import React from 'react';
import { Container } from 'components/common';
import tw, { css } from 'twin.macro';

import EloquiaLogo from '../../../data/sponsors/eloquia-logo.svg';
import MaxChiuLogo from '../../../data/sponsors/max-chiu-logo.svg';

import { SponsorsWrapper } from './styles';

const sponsorsWrapperStyles = css`
  ${tw`flex flex-col mb-32`}
`;

const sponsorContainerStyles = css`
  ${tw`flex flex-row justify-center gap-8`}
`;

export const Sponsors = () => (
  // const sponsorLogos = useStaticQuery(graphql`
  //   query SponsorLogoQuery {

  //   }
  // `);

  <SponsorsWrapper as={Container} id="sponsors" css={sponsorsWrapperStyles}>
    <h1>Sponsors</h1>

    <div id="sponsors-container" css={sponsorContainerStyles}>
      <img src={EloquiaLogo} alt="Eloquia" />
      <img src={MaxChiuLogo} alt="Max Chiu" />
    </div>
  </SponsorsWrapper>
);
