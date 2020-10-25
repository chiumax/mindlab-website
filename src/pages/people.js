import React, { useContext } from 'react';
import tw, { css } from 'twin.macro';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';

import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Layout, SEO } from 'components/common';
import { Header } from 'components/theme';
import {
  responsiveMobileContainerStyles,
  ResponsiveDesktopContainer,
  responsiveColumnStyles,
} from 'styles/common-custom-styles';
import { PageWrapper, Details } from '../styles/common-custom-styles';

import { hasSemesterOverlap, CURRENT_SEMESTER } from '../utils/time-utils';
import { getFileName } from '../utils/string-utils';

// Styles
// TODO: refactor how styles are handled. Maybe have a `common` folder/file
export const italicText = css`
  ${tw`italic`}
`;

const peopleSection = css`
  ${tw`my-8`}
`;

const personContainer = css`
  ${tw`flex flex-col items-center `}

  @media (max-width: 960px) {
    ${tw`mb-4`}
  }
`;

export const peopleTitleHeaderContainer = css`
  ${tw`flex flex-row my-16`}
`;

export const peopleTitleHeaderLine = css`
  ${tw`flex flex-grow border self-center mx-4 border-gray-400`}
`;

export const peopleTitleHeader = css`
  ${tw`mb-0`}
`;

export const peopleTitle = css`
  ${tw`text-base font-semibold`}
`;

export const personRow = css`
  ${tw`flex flex-row gap-8`}

  @media (max-width: 960px) {
    ${tw`flex flex-col justify-center`}
  }
`;

/**
 * Creates a window to limit the visible area of inner elements
 */
export const portraitStyle = css`
  height: 120px;
  width: 220px;
  overflow: hidden;
  ${tw`flex justify-center items-center`}
`;

const placardStyle = css`
  width: 250px;
  ${tw`my-2 flex flex-row justify-center`}
`;

// const PAST_SEMESTERS = pastNYearTerms(SEASONS, CURRENT_SEMESTER, NUM_PAST_YEARS);
const PAST_SEMESTERS = [
  {
    season: 'Summer',
    year: 2020,
  },
  {
    season: 'Spring',
    year: 2020,
  },
  {
    season: 'Fall',
    year: 2019,
  },
  {
    season: 'Summer',
    year: 2019,
  },
  {
    season: 'Spring',
    year: 2019,
  },
  {
    season: 'Fall',
    year: 2018,
  },
];

/**
 * Uses the following article to query data from a JSON file as GraphQL.
 * https://itnext.io/reading-data-from-a-json-file-with-gatsby-graphql-572b18ab98a
 * This reduces the amount of hand-editing that a maintainer must do in order
 * to update the website. Ideally, the only things that the maintainer would have to do are:
 * 1. "Upload" a photo
 * 2. Add/update data to the `people.json` file
 * 3. Update the "current semester" value
 */
const People = () => {
  const data = useStaticQuery(graphql`
    query PeopleQuery {
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
  const { theme } = useContext(ThemeContext);
  // all people data
  const people = data.allFile.edges;

  // everyone who has photos
  const photos = data.allFile.edges.filter(edge => edge.node.childImageSharp);

  /*
    The logic here gets pretty messy. Basically only the photo is in a separate group of data which has the `childImageSharp` property
    The other data is in an element where that value is null and `internal.content` is a string that needs to be JSON.parse(internal.content)
    The correct name is also in that "other" JSON data
    The end result will have to have the correct `childImageSharp` property from the original photos as well as the correct name from the JSON data
  */

  // only people with json data
  const peopleData = data.allFile.edges
    .filter(edge => !edge.node.childImageSharp)
    .map(edge => JSON.parse(edge.node.internal.content));

  // Current Faculty ONLY
  const currentFaculty = peopleData
    .filter(person => person.role === 'Faculty')
    .filter(person => hasSemesterOverlap(person.semestersActive, [CURRENT_SEMESTER]))
    .map(person => ({ ...person, photoFilename: getFileName(person.picture) }));
  const currentFacultyFilenames = currentFaculty.map(person => getFileName(person.picture)); // array of string
  const currentFacultyPhotos = photos.filter(photo => currentFacultyFilenames.includes(photo.node.name));
  // Now that photos array has the right photo, it needs to have the right name
  // name can be found by comparing currentFaculty[0].photoFilename to currentFacultyPhotos[0].node.name
  const currentFacultyPhotosAndName = currentFacultyPhotos.map(facultyPhoto => {
    // search in `currentFaculty` for the element whose `element.name` matches `facultyPhoto.node.name`
    const foundFaculty = currentFaculty.filter(faculty => faculty.photoFilename === facultyPhoto.node.name)[0];

    return {
      ...facultyPhoto,
      name: foundFaculty.name,
    };
  });

  // Current Research Staff ONLY
  const currentResearchStaff = peopleData
    .filter(person => person.role === 'Research Staff')
    .filter(person => hasSemesterOverlap(person.semestersActive, [CURRENT_SEMESTER]))
    .map(person => ({ ...person, photoFilename: getFileName(person.picture) }));
  const currentResearchStaffFilenames = currentResearchStaff.map(person => getFileName(person.picture));
  const currentResearchStaffPhotos = photos.filter(photo => currentResearchStaffFilenames.includes(photo.node.name));
  const currentResearchStaffPhotosAndName = currentResearchStaffPhotos.map(researchStaffPhoto => {
    // search in `currentFaculty` for the element whose `element.name` matches `facultyPhoto.node.name`
    const foundResearchStaff = currentResearchStaff.filter(
      researchStaff => researchStaff.photoFilename === researchStaffPhoto.node.name
    )[0];

    return {
      ...researchStaffPhoto,
      name: foundResearchStaff.name,
    };
  });

  // Current Graduate Students ONLY
  const currentGraduateStudents = peopleData
    .filter(person => person.role === 'Graduate Student')
    .filter(person => hasSemesterOverlap(person.semestersActive, [CURRENT_SEMESTER]))
    .map(person => ({ ...person, photoFilename: getFileName(person.picture) }));
  const currentGraduateStudentFilenames = currentGraduateStudents.map(person => getFileName(person.picture));
  const currentGraduateStudentPhotos = photos.filter(photo =>
    currentGraduateStudentFilenames.includes(photo.node.name)
  );
  const currentGraduateStudentPhotosAndName = currentGraduateStudentPhotos.map(graduateStudentPhoto => {
    // search in `currentFaculty` for the element whose `element.name` matches `facultyPhoto.node.name`
    const foundGraduateStudent = currentGraduateStudents.filter(
      graduateStudent => graduateStudent.photoFilename === graduateStudentPhoto.node.name
    )[0];

    return {
      ...graduateStudentPhoto,
      name: foundGraduateStudent.name,
    };
  });

  // Current Students ONLY
  const currentStudents = peopleData
    .filter(person => person.role === 'Student')
    .filter(person => hasSemesterOverlap(person.semestersActive, [CURRENT_SEMESTER]));
  const currentStudentNames = currentStudents.map(person => person.name);

  // Current Associates ONLY
  const currentAssociates = peopleData
    .filter(person => person.role === 'Associate')
    .filter(person => hasSemesterOverlap(person.semestersActive, [CURRENT_SEMESTER]))
    .map(person => ({ ...person, photoFilename: getFileName(person.picture) }));
  console.log('currentAssociates', currentAssociates);
  const currentAssociateFilenames = currentAssociates.map(person => getFileName(person.picture));
  console.log('currentAssociateFilenames', currentAssociateFilenames);
  const currentAssociatePhotos = photos.filter(photo => currentAssociateFilenames.includes(photo.node.name));
  console.log('currentAssociatePhotos', currentAssociatePhotos);
  const currentAssociatePhotosAndName = currentAssociatePhotos.map(associatePhoto => {
    // search in `currentFaculty` for the element whose `element.name` matches `facultyPhoto.node.name`
    const foundAssociate = currentAssociates.filter(
      associate => associate.photoFilename === associatePhoto.node.name
    )[0];

    return {
      ...associatePhoto,
      name: foundAssociate.name,
    };
  });

  // Past Students, as determined by the PAST_SEMESTERS array
  const students = peopleData.filter(person => person.role === 'Student');
  const pastStudents = students.filter(person => hasSemesterOverlap(person.semestersActive, PAST_SEMESTERS));
  const pastStudentNames = pastStudents.map(person => person.name);

  /*
    Similar to the front page, we will have to split the initial query into two parts:
    * One to determine the people for each group (Faculty, Research Staff, Interns, etc)
    * Another to isolate the photos
  */
  const breakpoints = useBreakpoint();

  return (
    <Layout>
      <SEO />
      <Header />
      <PageWrapper as={Container}>
        <Details theme={theme}>
          <article>
            <section className="people-section" css={peopleSection}>
              <div className="people-title-header-container" css={peopleTitleHeaderContainer}>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
                <div style={{ marginBottom: 0 }} css={peopleTitle}>
                  Faculty
                </div>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
              </div>

              <div css={personRow}>
                {currentFacultyPhotosAndName.map(photo => (
                  <div key={photo.node.id} className="person" css={personContainer}>
                    <div css={portraitStyle}>
                      <Img fixed={photo.node.childImageSharp.fixed} />
                    </div>

                    <div className="placard" css={placardStyle}>
                      <h6>{photo.name}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="people-section" css={peopleSection}>
              <div className="people-title-header-container" css={peopleTitleHeaderContainer}>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
                <div style={{ marginBottom: 0 }} css={peopleTitle}>
                  Research Staff
                </div>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
              </div>

              <div css={personRow}>
                {currentResearchStaffPhotosAndName.map(photo => (
                  <div key={photo.node.id} className="person" css={personContainer}>
                    <div css={portraitStyle}>
                      <Img fixed={photo.node.childImageSharp.fixed} />
                    </div>

                    <div className="placard" css={placardStyle}>
                      <h6>{photo.name}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="people-section" css={peopleSection}>
              <div className="people-title-header-container" css={peopleTitleHeaderContainer}>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
                <div style={{ marginBottom: 0 }} css={peopleTitle}>
                  Graduate Students{' '}
                  <span css={italicText}>
                    ({CURRENT_SEMESTER.season} {CURRENT_SEMESTER.year})
                  </span>
                </div>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
              </div>

              <div css={personRow}>
                {currentGraduateStudentPhotosAndName.map(photo => (
                  <div key={photo.node.id} className="person" css={personContainer}>
                    <div css={portraitStyle}>
                      <Img fixed={photo.node.childImageSharp.fixed} />
                    </div>

                    <div className="placard" css={placardStyle}>
                      <h6>{photo.name}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="people-section" css={peopleSection}>
              <div className="people-title-header-container" css={peopleTitleHeaderContainer}>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
                <div style={{ marginBottom: 0 }} css={peopleTitle}>
                  Students{' '}
                  <span css={italicText}>
                    ({CURRENT_SEMESTER.season} {CURRENT_SEMESTER.year})
                  </span>
                </div>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
              </div>

              {breakpoints.xs || breakpoints.sm ? (
                <div css={responsiveMobileContainerStyles}>
                  <ul>
                    {currentStudentNames.map(name => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ResponsiveDesktopContainer>
                  <div css={responsiveColumnStyles}>
                    <ul>
                      {currentStudentNames
                        .filter((v, i) => i % 3 === 0)
                        .map(name => (
                          <li key={name}>{name}</li>
                        ))}
                    </ul>
                  </div>
                  <div css={responsiveColumnStyles}>
                    <ul>
                      {currentStudentNames
                        .filter((v, i) => i % 3 === 1)
                        .map(name => (
                          <li key={name}>{name}</li>
                        ))}
                    </ul>
                  </div>
                  <div css={responsiveColumnStyles}>
                    <ul>
                      {currentStudentNames
                        .filter((v, i) => i % 3 === 2)
                        .map(name => (
                          <li key={name}>{name}</li>
                        ))}
                    </ul>
                  </div>
                </ResponsiveDesktopContainer>
              )}
            </section>

            <section className="people-section" css={peopleSection}>
              <div className="people-title-header-container" css={peopleTitleHeaderContainer}>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
                <div style={{ marginBottom: 0 }} css={peopleTitle}>
                  Associates{' '}
                  <span css={italicText}>
                    ({CURRENT_SEMESTER.season} {CURRENT_SEMESTER.year})
                  </span>
                </div>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
              </div>

              <div css={personRow}>
                {currentAssociatePhotosAndName.map(photo => (
                  <div key={photo.node.id} className="person" css={personContainer}>
                    <div css={portraitStyle}>
                      <Img fixed={photo.node.childImageSharp.fixed} />
                    </div>

                    <div className="placard" css={placardStyle}>
                      <h6>{photo.name}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="people-section" css={peopleSection}>
              <div className="people-title-header-container" css={peopleTitleHeaderContainer}>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
                <h2>
                  <span css={peopleTitle}>Previous Students</span> <span css={peopleTitle}>(Rolling two years)</span>
                </h2>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
              </div>

              <ul>
                {pastStudentNames.map(name => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </section>
          </article>
        </Details>
      </PageWrapper>
    </Layout>
  );
};

export default People;
