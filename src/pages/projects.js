import React, { useContext } from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Layout, SEO } from 'components/common';
import { Header } from 'components/theme';
import {
  PageWrapper,
  Details,
  ProjectCard,
  ResponsiveDesktopContainer,
  TagContainer,
  Tag,
  OneLiner,
  AlignRight,
} from 'styles/common-custom-styles';

const Projects = ({ data }) => {
  const { theme, themeData } = useContext(ThemeContext);
  const { edges: posts } = data.allMarkdownRemark;

  // let heroImg = post.frontmatter.hero.childImageSharp.fluid;

  return (
    <Layout>
      <SEO />
      <Header />
      <PageWrapper as={Container}>
        <Details theme={(theme, themeData)}>
          <h1>Projects</h1>
          <ResponsiveDesktopContainer>
            {posts.map(({ node: post }) => (
              <ProjectCard key={post.id} theme={(theme, themeData)}>
                <Link to={post.frontmatter.path}>
                  <Img fluid={post.frontmatter.hero.childImageSharp.fluid} />
                  <h2>{post.frontmatter.title}</h2>
                </Link>
                <TagContainer>
                  {post.frontmatter.tags
                    ? post.frontmatter.tags.map(tag => (
                        <Tag theme={theme}>
                          {tag}
                          {console.log(theme)}
                        </Tag>
                      ))
                    : ''}
                </TagContainer>
                <OneLiner>{post.frontmatter.oneLiner}</OneLiner>
                <AlignRight>
                  <Link className="proj-link" to={post.frontmatter.path}>
                    Click here for more {`>>`}
                  </Link>
                </AlignRight>
              </ProjectCard>
            ))}
          </ResponsiveDesktopContainer>
        </Details>
      </PageWrapper>
    </Layout>
  );
};

export const staticQuery = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            title
            oneLiner
            tags
            hero {
              childImageSharp {
                fluid(maxWidth: 800, maxHeight:400) {
                  ...GatsbyImageSharpFluid
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
