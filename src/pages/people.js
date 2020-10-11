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

import { hasSemesterOverlap, NUM_PAST_YEARS, pastNYearTerms, SEASONS, CURRENT_SEMESTER } from '../utils/time-utils';

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
console.log('PAST_SEMESTERS', PAST_SEMESTERS);

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
                season
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
                    ({CURRENT_SEMESTER.season} {CURRENT_SEMESTER.year})
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
                    ({CURRENT_SEMESTER.season} {CURRENT_SEMESTER.year})
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
                    ({CURRENT_SEMESTER.season} {CURRENT_SEMESTER.year})
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
                  .filter(({ semestersActive }) => hasSemesterOverlap(semestersActive, PAST_SEMESTERS))
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
