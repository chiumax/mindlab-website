import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { Header } from 'components/theme';
import { Container } from 'components/common';

import { Wrapper, IntroWrapper } from './styles';

/**
 * The Group Photo needs to support several types of layouts:
 *  * mobile
 *  * tablet
 *  * laptop/desktop
 *  * extra-wide monitors
 */
export const GroupPhoto = () => {
  const profilePhotos = useStaticQuery(graphql`
    query ProfilePhotoQuery {
      allFile(filter: { sourceInstanceName: { eq: "groupPhotos" } }) {
        edges {
          node {
            id
            childImageSharp {
              fixed(width: 220) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
  `);
  const { edges } = profilePhotos.allFile;

  return (
    <Wrapper>
      <Header />
      <IntroWrapper as={Container}>
        {edges.map(photo => (
          <Img key={photo.node.id} fixed={photo.node.childImageSharp.fixed} />
        ))}
      </IntroWrapper>
    </Wrapper>
  );
};
