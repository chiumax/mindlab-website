import React, { useContext } from 'react';
import { graphql } from 'gatsby';

import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Layout, SEO } from 'components/common';
import { Header } from 'components/theme';
import { PageWrapper, Details } from 'pages/styles';

export default function Template({
  data, // this prop will be injected by the GraphQL query we'll write in a bit
}) {
  // eslint-disable-next-line no-console
  console.log('data', data);
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const { theme } = useContext(ThemeContext);

  return (
    <Layout>
      <SEO />
      <Header />
      <PageWrapper as={Container}>
        <Details theme={theme}>
          <h1>{frontmatter.title}</h1>
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
        </Details>
      </PageWrapper>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
