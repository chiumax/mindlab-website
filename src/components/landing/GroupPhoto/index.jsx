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
 *
 * The people in the group photo are filtered by the `groupPhoto.inGroupPhoto` property.
 * The people in the group photo are also sorted by priority, highest to lowest
 *
 * There are two queries that need to happen and then get zipped by the person's name.
 * Zipping is a transformation process where elements in two arrays get combined into a single
 * element in one array
 */
export const GroupPhoto = () => {
  const peopleData = useStaticQuery(graphql`
    query GroupPhotosQuery {
      allFile(filter: { sourceInstanceName: { eq: "people" } }) {
        edges {
          node {
            id
            name
            childImageSharp {
              fixed(width: 220) {
                ...GatsbyImageSharpFixed
              }
            }
            internal {
              content
            }
          }
        }
      }
    }
  `);
  const { edges } = peopleData.allFile;

  /*
    Logic for figuring out which pictures to display, and how to order them.
    Firstly collect the JSON data
      * Use the "picture" property of the JSON data
      * Parse the "picture" property to get the name of the file
    Secondly collect the pictures
      * Filter the pictures and keep only the pictures who are in the previous group
    Thirdly sort the pictures according to 
  */
  // when node.childImageSharp is null, that means we have JSON data
  // when node.internal.content is null, that means we have the image
  const jsonData = edges
    .filter(edge => !edge.node.childImageSharp)
    .map(edge => JSON.parse(edge.node.internal.content))
    .filter(jsonDatum => jsonDatum.groupPhoto.inGroupPhoto) // only get data of people who are allowed to be in the group photo
    .sort((a, b) => b.groupPhoto.priority - a.groupPhoto.priority);

  const orderedNames = jsonData.map(datum => datum.picture).map(picture => picture.slice(2, picture.length - 4));

  const photos = edges.filter(edge => edge.node.childImageSharp).filter(edge => orderedNames.includes(edge.node.name));

  const orderedPhotos = photos.sort((a, b) => orderedNames.indexOf(a.node.name) - orderedNames.indexOf(b.node.name));

  const orderedImages = orderedPhotos.map(photo => (
    <Img key={photo.node.id} fixed={photo.node.childImageSharp.fixed} />
  ));

  return (
    <Wrapper>
      <Header />
      <IntroWrapper as={Container}>{orderedImages}</IntroWrapper>
    </Wrapper>
  );
};
