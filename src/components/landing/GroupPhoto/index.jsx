import React from 'react';
import { Header } from 'components/theme';
import { Container } from 'components/common';
import wireframeImage from 'assets/mock/wireframe-image.svg';
import { Wrapper, IntroWrapper, Thumbnail } from './styles';

export const GroupPhoto = () => (
  <Wrapper>
    <Header />
    <IntroWrapper as={Container}>
      <Thumbnail>
        <img src={wireframeImage} alt="MIND Lab UMD CS Dept Group" />
      </Thumbnail>
    </IntroWrapper>
  </Wrapper>
);

/*
  <Button as={AnchorLink} href="#contact">
            Hire me
          </Button>
*/
