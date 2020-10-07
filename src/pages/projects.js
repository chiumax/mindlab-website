import React, { useContext } from 'react';
import tw, { css } from 'twin.macro';
import { graphql, Link } from 'gatsby';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import Img from 'gatsby-image';

import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Layout, SEO } from 'components/common';
import { Header } from 'components/theme';
import {
  PageWrapper,
  Details,
  ProjectCard,
  ResponsiveColumn,
  ResponsiveMobileContainer,
  ResponsiveDesktopContainer,
} from 'pages/styles';

const projectHeaderStyles = css`
  ${tw`text-xl mb-4`}
`;

const Projects = ({ data }) => {
  const { theme, themeData } = useContext(ThemeContext);
  const { edges: posts } = data.allMarkdownRemark;
  const breakpoints = useBreakpoint();

  // let heroImg = post.frontmatter.hero.childImageSharp.fluid;

  return (
    <Layout>
      <SEO />
      <Header />
      <PageWrapper as={Container}>
        <Details theme={(theme, themeData)}>
          <h1 css={projectHeaderStyles}>Projects</h1>
          {console.log(themeData)} {console.log('theme data')}
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
            <ResponsiveMobileContainer>
              {posts
                .filter(post => post.node.frontmatter.title.length > 0)
                .map(({ node: post }) => (
                  <ProjectCard key={post.id} theme={(theme, themeData)}>
                    <Img fixed={post.frontmatter.hero.childImageSharp.fixed} />
                    <h2>
                      <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                    </h2>
                    <p>{post.frontmatter.oneLiner}</p>
                  </ProjectCard>
                ))}
            </ResponsiveMobileContainer>
          ) : (
            <ResponsiveDesktopContainer>
              <ResponsiveColumn>
                {posts
                  .filter((v, i) => i % 2 === 0)
                  .map(({ node: post }) => (
                    <ProjectCard key={post.id} theme={(theme, themeData)}>
                      <Img fixed={post.frontmatter.hero.childImageSharp.fixed} />
                      <h2>
                        <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                      </h2>
                      <p>{post.frontmatter.oneLiner}</p>
                    </ProjectCard>
                  ))}
              </ResponsiveColumn>
              <ResponsiveColumn>
                {posts
                  .filter((v, i) => i % 2 === 1)
                  .map(({ node: post }) => (
                    <ProjectCard key={post.id} theme={(theme, themeData)}>
                      <Img fixed={post.frontmatter.hero.childImageSharp.fixed} />
                      <h2>
                        <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                      </h2>
                      <p>{post.frontmatter.oneLiner}</p>
                    </ProjectCard>
                  ))}
              </ResponsiveColumn>
            </ResponsiveDesktopContainer>
          )}
        </Details>
      </PageWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            title
            oneLiner
            hero {
              childImageSharp {
                fixed(width: 300) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Projects;
