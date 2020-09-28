import React, { useContext } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import tw, { styled, css } from 'twin.macro';

import { ThemeContext } from 'providers/ThemeProvider';
import { Container } from 'components/common';
import { ProjectCard } from 'pages/styles';
import { FeaturedProjectWrapper } from './styles';

const featuredProjectStyles = css`
  display: flex;
  flex-direction: column;

  @media (max-width: 960px) {
  }

  ${tw`my-32`}
`;

const featuredProjectQueryString = graphql`
  query FeaturedProjectQuery {
    allMarkdownRemark(filter: { frontmatter: { featured: { eq: true } } }) {
      edges {
        node {
          id
          frontmatter {
            path
            title
            hero {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt(pruneLength: 100)
        }
      }
    }
  }
`;

export const FeaturedProject = () => {
  const { theme, themeData } = useContext(ThemeContext);
  const featuredProjects = [useStaticQuery(featuredProjectQueryString).allMarkdownRemark.edges[0].node].map(
    featuredProject => (
      <ProjectCard key={featuredProject.id} theme={(theme, themeData)}>
        <h2>
          <Img fluid={featuredProject.frontmatter.hero.childImageSharp.fluid} />
          <Link to={featuredProject.frontmatter.path}>{featuredProject.frontmatter.title}</Link>
        </h2>
        <p>{featuredProject.excerpt}</p>
      </ProjectCard>
    )
  );

  return (
    <FeaturedProjectWrapper as={Container} id="featured-project" css={featuredProjectStyles}>
      <h1>Featured Projects</h1>

      {featuredProjects}
    </FeaturedProjectWrapper>
  );
};
