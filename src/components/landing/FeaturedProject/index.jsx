import React, { useContext } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import tw, { css } from 'twin.macro';

import { ThemeContext } from 'providers/ThemeProvider';
import { Container } from 'components/common';

const featureProjectContainer = css`
  padding: 4rem 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const featuredProjectStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 960px) {
  }

  ${tw`my-8`}
`;

/*
  Describes the "card" style
*/
const projectStyle = css`
  max-width: 300px;
  ${tw`flex flex-col rounded border-blue-500 border-opacity-25`}
`;

const projectTitleStyle = css`
  ${tw`text-xl font-bold mt-4`}
`;

const projectExcerpt = css`
  ${tw`text-lg mt-4`}
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
                fixed(width: 300) {
                  ...GatsbyImageSharpFixed
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
      <div key={featuredProject.id} theme={(theme, themeData)} css={projectStyle}>
        <Img fixed={featuredProject.frontmatter.hero.childImageSharp.fixed} />
        <h2 css={projectTitleStyle}>
          <Link to={featuredProject.frontmatter.path}>{featuredProject.frontmatter.title}</Link>
        </h2>
        <p css={projectExcerpt}>{featuredProject.excerpt}</p>
      </div>
    )
  );

  return (
    <div as={Container} id="featured-project-container" css={featureProjectContainer}>
      <h1>Featured Projects</h1>

      <div className="featured-projects" css={featuredProjectStyles}>
        {featuredProjects}
      </div>
    </div>
  );
};
