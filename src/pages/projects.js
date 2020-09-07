import React, { useContext } from 'react';
import { graphql, Link } from 'gatsby';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';

import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Layout, SEO } from 'components/common';
import { Header } from 'components/theme';
import {
  PageWrapper,
  Details,
  ProjectCard,
  ProjectCardColumn,
  MobileProjectCardContainer,
  DesktopProjectCardContainer,
} from 'pages/styles';

const Projects = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const { edges: posts } = data.allMarkdownRemark;
  const breakpoints = useBreakpoint();

  return (
    <Layout>
      <SEO />
      <Header />
      <PageWrapper as={Container}>
        <Details theme={theme}>
          <h1>Projects</h1>

          {/*
              Not the greatest thing to do, but desktops need to
              show three columns, and mobile devices will show one
              column. The traditional way of using Flexbox Grid to
              handle this responsiveness relies on a constant, 
              previously known number of items to display. Since
              the code is doing `posts.map`, the items cannot be
              hard-coded into columns.

              There are two options:
                * define one HTML and responsive CSS style
                * define two HTML and one CSS style
            */}
          {breakpoints.xs || breakpoints.sm ? (
            <MobileProjectCardContainer>
              {posts
                .filter(post => post.node.frontmatter.title.length > 0)
                .map(({ node: post }) => (
                  <ProjectCard key={post.id}>
                    <h2>
                      <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                    </h2>
                    <p>{post.excerpt}</p>
                  </ProjectCard>
                ))}
            </MobileProjectCardContainer>
          ) : (
            <DesktopProjectCardContainer>
              <ProjectCardColumn>
                {posts
                  .filter((v, i) => i % 3 === 0)
                  .map(({ node: post }) => (
                    <ProjectCard key={post.id}>
                      <h2>
                        <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                      </h2>
                      <p>{post.excerpt}</p>
                    </ProjectCard>
                  ))}
              </ProjectCardColumn>
              <ProjectCardColumn>
                {posts
                  .filter((v, i) => i % 3 === 1)
                  .map(({ node: post }) => (
                    <ProjectCard key={post.id}>
                      <h2>
                        <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                      </h2>
                      <p>{post.excerpt}</p>
                    </ProjectCard>
                  ))}
              </ProjectCardColumn>
              <ProjectCardColumn>
                {posts
                  .filter((v, i) => i % 3 === 2)
                  .map(({ node: post }) => (
                    <ProjectCard key={post.id}>
                      <h2>
                        <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                      </h2>
                      <p>{post.excerpt}</p>
                    </ProjectCard>
                  ))}
              </ProjectCardColumn>
            </DesktopProjectCardContainer>
          )}
          <ProjectCardContainer>
            {posts
              .filter(post => post.node.frontmatter.title.length > 0)
              .map(({ node: post }) => (
                <ProjectCard key={post.id}>
                  <h1>
                    <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                  </h1>
                  <h2>{post.frontmatter.date}</h2>
                  <p>{post.excerpt}</p>
                </ProjectCard>
              ))}
          </ProjectCardContainer>
        </Details>
      </PageWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;

export default Projects;
