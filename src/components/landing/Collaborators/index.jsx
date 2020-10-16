import React from 'react';
import { Container } from 'components/common';
import tw, { css } from 'twin.macro';

import EloquiaLogo from '../../../data/collaborators/eloquia-logo.svg';
import MaxChiuLogo from '../../../data/collaborators/max-chiu-logo.svg';

import { CollaboratorsWrapper } from './styles';

const collaboratorsWrapperStyles = css`
  ${tw`flex flex-col mb-32`}
`;

const collaboratorContainerStyles = css`
  ${tw`flex flex-row justify-center gap-8`}
`;

export const Collaborators = () => (
  <CollaboratorsWrapper as={Container} id="collaborators" css={collaboratorsWrapperStyles}>
    <h1>Collaborators</h1>

    <div id="collaborators-container" css={collaboratorContainerStyles}>
      <img src={EloquiaLogo} alt="Eloquia" />
      <img src={MaxChiuLogo} alt="Max Chiu" />
    </div>
  </CollaboratorsWrapper>
);
