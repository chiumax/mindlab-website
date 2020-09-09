import React from 'react';
import { Container } from 'components/common';
import wireframeImage from 'assets/mock/wireframe-image.svg';
import { LabIntroWrapper, Details, Thumbnail } from './styles';

export const LabIntro = () => (
  <LabIntroWrapper as={Container} id="lab-intro">
    <Details>
      <h2>Intro</h2>
      <p>
        Mindlab is a part of the Computer Science department within UMD at College Park. Professor Agrawala started
        Mindlab in order to research and develop cutting-edge solutions to modern problems. The lab's interests range
        from NLP to computer vision, GIS data to bioinformatics, all within an engineering approach.
      </p>
    </Details>
    <Thumbnail>
      <img src={wireframeImage} alt="Mindlab or Professor Agrawala" />
    </Thumbnail>
  </LabIntroWrapper>
);
