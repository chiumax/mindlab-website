import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import tw, { css } from 'twin.macro';

import { Container } from 'components/common';
import { hasSemesterOverlap, CURRENT_SEMESTER } from '../../../utils/time-utils';
import { getFileName } from '../../../utils/string-utils';

import { CollaboratorsWrapper } from './styles';

const collaboratorsWrapperStyles = css`
  ${tw`flex flex-col mb-32`}
`;

const commercialCollaboratorContainerStyle = css`
  ${tw`flex flex-row justify-center items-center flex-wrap gap-8`}
`;

/*
  Same deal as the Group Photo Section and the People Page.
  Take the initial query, split into two parts to figure out the order and the `alt` text, and
  then recombine to display the logos
*/
export const Collaborators = () => {
  const sponsorData = useStaticQuery(graphql`
    query SponsorQuery {
      allFile(filter: { sourceInstanceName: { eq: "sponsors" } }) {
        edges {
          node {
            id
            name
            childImageSharp {
              fixed(height: 70) {
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
  const currentOrderedSponsorJson = sponsorData.allFile.edges
    .filter(edge => !edge.node.childImageSharp) // get only the JSON files
    .map(edge => ({ ...edge, data: JSON.parse(edge.node.internal.content) })) // convert string data to JSON
    .sort((a, b) => a.data.order - b.data.order) // sort in order of appearance/significance
    .filter(sponsor => hasSemesterOverlap(sponsor.data.semestersActive, [CURRENT_SEMESTER])); // currently active sponsors

  const trimmedName = currentOrderedSponsorJson.map(sponsor => ({
    ...sponsor,
    photoFilename: getFileName(sponsor.data.logo),
  })); // trim filename

  const sponsorPhotos = sponsorData.allFile.edges.filter(edge => !edge.node.internal.content);

  const sponsorPhotosAndName = sponsorPhotos
    .map(sponsorPhoto => {
      // search in `currentFaculty` for the element whose `element.name` matches `facultyPhoto.node.name`
      const foundSponsor = trimmedName.filter(sponsor => sponsor.photoFilename === sponsorPhoto.node.name)[0];

      return {
        ...sponsorPhoto,
        name: foundSponsor.data.companyName,
        order: foundSponsor.data.order,
      };
    })
    .sort((a, b) => a.order - b.order);
  // end `sponsorPhotoAndName` array should have the childImageSharp and name properties

  return (
    <CollaboratorsWrapper as={Container} id="collaborators" css={collaboratorsWrapperStyles}>
      <h1>Collaborators</h1>

      <div id="commercial-collaborators-container" css={commercialCollaboratorContainerStyle}>
        {sponsorPhotosAndName.map(photoAndName => (
          <Img key={photoAndName.node.id} fixed={photoAndName.node.childImageSharp.fixed} />
        ))}
      </div>
    </CollaboratorsWrapper>
  );
};
