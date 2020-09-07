import React, { useContext } from 'react';
import { graphql, Link } from 'gatsby';

import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Layout, SEO } from 'components/common';
import { Header } from 'components/theme';
import { PageWrapper, Details, ProjectCard, ProjectCardContainer } from 'pages/styles';

const Projects = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Layout>
      <SEO />
      <Header />
      <PageWrapper as={Container}>
        <Details theme={theme}>
          <h1>Projects</h1>

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
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;

export default Projects;
