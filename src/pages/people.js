import React, { useContext } from 'react';
import tw, { css } from 'twin.macro';
import { graphql } from 'gatsby';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';

import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Layout, SEO } from 'components/common';
import { Header } from 'components/theme';
import { Person } from 'components/people/Person';
import { ResponsiveMobileContainer, ResponsiveDesktopContainer, ResponsiveColumn } from 'pages/styles';
import { PageWrapper, Details } from './styles';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * *
    Modify this value to change the current semester
* * * * * * * * * * * * * * * * * * * * * * * * * * * */
const currentSemester = 'Fall 2020';

// Styles
// TODO: refactor how styles are handled. Maybe have a `common` folder/file
export const italicText = css`
  ${tw`italic`}
`;

export const PersonRow = css`
  ${tw`flex flex-row`}
`;

export const peopleTitle = css`
  ${tw`text-base font-semibold`}
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
const People = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const people = data.allFile.edges[0].node.childrenPeopleJson;
  // const faculty = people
  //   .filter(({ role, semestersActive }) => semestersActive.includes(currentSemester) && role === 'Faculty')
  //   .map(({ id, name, picture }) => <Person key={id} name={name} picture={picture}></Person>);
  // console.log('faculty[0]', faculty[0]);
  const researchStaff = people
    .filter(({ role, semestersActive }) => semestersActive.includes(currentSemester) && role === 'Research Staff')
    .map(({ id, name, picture }) => <Person key={id} name={name} picture={picture}></Person>);
  const graduateStudents = people
    .filter(({ role, semestersActive }) => semestersActive.includes(currentSemester) && role === 'Graduate Student')
    .map(({ id, name, picture }) => <Person key={id} name={name} picture={picture}></Person>);
  const students = people
    .filter(({ role, semestersActive }) => semestersActive.includes(currentSemester) && role === 'Student')
    .map(({ id, name, picture }) => (
      <p key={id} name={name} picture={picture}>
        {name}
      </p>
    ));
  const associates = people
    .filter(({ role, semestersActive }) => semestersActive.includes(currentSemester) && role === 'Associate')
    .map(({ id, name, picture }) => <Person key={id} name={name} picture={picture}></Person>);
  const previousStudents = people
    .filter(({ semestersActive }) => !semestersActive.includes(currentSemester))
    .map(({ id, name }) => <li key={id}>{name}</li>);
  const breakpoints = useBreakpoint();

  return (
    <Layout>
      <SEO />
      <Header />
      <PageWrapper as={Container}>
        <Details theme={theme}>
          <article>
            <section>
              <h2>
                <span css={peopleTitle}>Faculty</span>
              </h2>

              {people
                .filter(({ role, semestersActive }) => semestersActive.includes(currentSemester) && role === 'Faculty')
                .map(({ id, name, picture }) => (
                  <Person key={id} name={name} picture={picture}></Person>
                ))}
            </section>

            <section>
              <h2>
                <span css={peopleTitle}>Research Staff</span>
              </h2>

              {researchStaff}
            </section>

            <section>
              <h2>
                <span css={peopleTitle}>
                  Graduate Students <span css={italicText}>({currentSemester})</span>
                </span>
              </h2>

              {graduateStudents}
            </section>

            <section>
              <h2>
                <span css={peopleTitle}>
                  Students <span css={italicText}>({currentSemester})</span>
                </span>
              </h2>

              {breakpoints.xs || breakpoints.sm ? (
                <ResponsiveMobileContainer>{students}</ResponsiveMobileContainer>
              ) : (
                <ResponsiveDesktopContainer>
                  <ResponsiveColumn>{students.filter((v, i) => i % 3 === 0)}</ResponsiveColumn>
                  <ResponsiveColumn>{students.filter((v, i) => i % 3 === 1)}</ResponsiveColumn>
                  <ResponsiveColumn>{students.filter((v, i) => i % 3 === 2)}</ResponsiveColumn>
                </ResponsiveDesktopContainer>
              )}
            </section>

            <section>
              <h2>
                <span css={peopleTitle}>Associates</span>
              </h2>

              {associates}
            </section>

            <section>
              <h2>
                <span css={peopleTitle}>Previous Students</span>
              </h2>

              <ul>{previousStudents}</ul>
            </section>
          </article>
        </Details>
      </PageWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    allFile(filter: { name: { eq: "people" } }) {
      edges {
        node {
          childrenPeopleJson {
            id
            name
            picture
            role
            semestersActive
          }
        }
      }
    }
  }
`;

export default People;
