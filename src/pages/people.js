import React, { useContext } from 'react';
import tw, { css } from 'twin.macro';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';

import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Layout, SEO } from 'components/common';
import { Header } from 'components/theme';
import { ResponsiveMobileContainer, ResponsiveDesktopContainer, ResponsiveColumn } from 'pages/styles';
import { PageWrapper, Details } from './styles';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
    Modify this value to change the current semester
* * * * * * * * * * * * * * * * * * * * * * * * * * * */
const currentYear = 2020;
const currentSeason = 'Fall';

// a "semester" is a combination of a season and a year, such as "Summer 2020"
const currentSemester = {
  semester: currentSeason,
  year: currentYear,
};

// list of all available semester types
const SEASONS = ['Spring', 'Summer', 'Fall'];

/*
  Past two years, exclusive.
  If current term is "Summer 2020", the previous two year terms are:
  * Spring 2020
  * Fall 2019
  * Summer 2019
  * Spring 2019
  * Fall 2018
  * Summer 2018
  
  in order to get these values, loop through SEMESTER_TYPES backwards to pull that value, and then every time the index goes negative, decrement the year.
  There will always be 6 terms
*/
const currentSeasonIdx = SEASONS.find(currentSeason);

const pastTwoYearTerms = Array(6).map((value, index) => {
  // index goes from 0 to 5. Like in the example above, we're going to count backwards from the present semester
  const numTermFromPresent = index + 1;

  /*
    If currentSeason = Fall, then numSeasonsTilBeginning = 2
    if currentSeason = Summer, then numSeasonsTilBeginning = 1
    if currentSeason = Spring, then numSeasonsTilBeginning = 0
  */
  const numSeasonsTilBeginning = currentSeasonIdx;

  /*
    numYearsPassed is the number of years we went back in time.
    Given numTermsFromPresent and numSeasonsTilBeginning,
    * if (numTermsFromPresent < numSeasonsTilBeginning), we are in the same year
    * if (numTermsFromPresent > numSeasonsTilBeginning) && (numTermsFromPresent < numSeasonTilBeginning + SEASONS.length), we are 1 year into the past
    * if (numTermsFromPresent > numSeasonsTilBeginning) && (numTermsFromPresent > numSeasonsTilBeginning + N * SEASONS.length), we are N - 1 years into the past (at least)
  */
  const numYearsPassed = 0;

  /*
    The season and year depend on the result of the modulus with the SEASONS.length
    Each time the difference from the currentSemester loops back around:
    * Decrement the year
    * Reset the index to start at SEASONS.length
  */
  const previousSeasonIdx =
    currentSeasonIdx - numTermFromPresent < 0 ? SEASONS.length : currentSeasonIdx - numTermFromPresent;
  const previousSeason = SEASONS[previousSeasonIdx];

  // previous year is the number of times we pass around the length of 
  const previousYear = currentYear - ();

  return {
    semester: previousSeason,
    year: previousYear,
  };
});

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
      allFile(filter: { name: { eq: "people" } }) {
        edges {
          node {
            childrenPeopleJson {
              id
              name
              picture {
                childImageSharp {
                  fixed(width: 220) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
              role
              semestersActive {
                semester
                year
              }
            }
          }
        }
      }
    }
  `);
  const { theme } = useContext(ThemeContext);
  const people = data.allFile.edges[0].node.childrenPeopleJson;
  const students = people.filter(({ role }) => role === 'Student').map(({ id, name }) => <p key={id}>{name}</p>);
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
                {people
                  .filter(({ role }) => role === 'Faculty')
                  .map(({ id, name, picture }) => (
                    <div key={id} className="person" css={personContainer}>
                      <div css={portraitStyle}>
                        <Img fixed={picture.childImageSharp.fixed} />
                      </div>

                      <div className="placard" css={placardStyle}>
                        <h6>{name}</h6>
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
                {people
                  .filter(({ role }) => role === 'Research Staff')
                  .map(({ id, name, picture }) => (
                    <div key={id} className="person" css={personContainer}>
                      <div css={portraitStyle}>
                        <Img fixed={picture.childImageSharp.fixed} />
                      </div>

                      <div className="placard" css={placardStyle}>
                        <h6>{name}</h6>
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
                    ({currentSeason.semester} {currentSeason.year})
                  </span>
                </div>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
              </div>

              <div css={personRow}>
                {people
                  .filter(({ role }) => role === 'Graduate Student')
                  .map(({ id, name, picture }) => (
                    <div key={id} className="person" css={personContainer}>
                      <div css={portraitStyle}>
                        <Img fixed={picture.childImageSharp.fixed} />
                      </div>

                      <div className="placard" css={placardStyle}>
                        <h6>{name}</h6>
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
                    ({currentSeason.semester} {currentSeason.year})
                  </span>
                </div>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
              </div>

              {breakpoints.xs || breakpoints.sm ? (
                <ResponsiveMobileContainer>
                  {people
                    .filter(({ role }) => role === 'Student')
                    .map(({ id, name }) => (
                      <h6 key={id}>{name}</h6>
                    ))}
                </ResponsiveMobileContainer>
              ) : (
                <ResponsiveDesktopContainer>
                  <ResponsiveColumn>{students.filter((v, i) => i % 3 === 0)}</ResponsiveColumn>
                  <ResponsiveColumn>{students.filter((v, i) => i % 3 === 1)}</ResponsiveColumn>
                  <ResponsiveColumn>{students.filter((v, i) => i % 3 === 2)}</ResponsiveColumn>
                </ResponsiveDesktopContainer>
              )}
            </section>

            <section className="people-section" css={peopleSection}>
              <div className="people-title-header-container" css={peopleTitleHeaderContainer}>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
                <div style={{ marginBottom: 0 }} css={peopleTitle}>
                  Associates{' '}
                  <span css={italicText}>
                    ({currentSeason.semester} {currentSeason.year})
                  </span>
                </div>
                <div className="people-title-header-line" css={peopleTitleHeaderLine}></div>
              </div>

              <div css={personRow}>
                {people
                  .filter(({ role }) => role === 'Associate')
                  .map(({ id, name, picture }) => (
                    <div key={id} className="person" css={personContainer}>
                      <div css={portraitStyle}>
                        <Img fixed={picture.childImageSharp.fixed} />
                      </div>

                      <div className="placard" css={placardStyle}>
                        <h6>{name}</h6>
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
                {people
                  .filter(({ role }) => role === 'Student')
                  .filter(({ semestersActive }) => semestersActive)
                  .map(({ id, name }) => (
                    <li key={id}>{name}</li>
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
