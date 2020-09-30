import React, { useContext } from 'react';
import { graphql } from 'gatsby';
import Img from "gatsby-image"

import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Layout, SEO } from 'components/common';
import { Header } from 'components/theme';
import { PageWrapper, Details } from 'pages/styles';
// import "./pilcrow.css";
// import "./hljs-github.min.css";
import "./github-markdown.css";

export default function Template({
  data, // this prop will be injected by the GraphQL query we'll write in a bit
}) {
  // eslint-disable-next-line no-console
  console.log('data', data);
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const { theme } = useContext(ThemeContext);

  let heroImg = frontmatter.hero.childImageSharp.fluid;

  return (
    <Layout>
      <SEO />
      <Header />
      <PageWrapper as={Container}>
        <div theme={theme} className={"markdown-body"}>
          <Img fluid={heroImg}/>
          <h1>{frontmatter.title}</h1>
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
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
        hero {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
