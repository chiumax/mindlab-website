import React, { useContext, useState } from 'react';
import tw, { css } from 'twin.macro';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import Select from 'react-select';
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
  const [currentTag, setTag] = useState(null);
  const { theme, themeData } = useContext(ThemeContext);
  const { edges: posts } = data.allMarkdownRemark;
  const tags = [...new Set(posts.map(({node:post})=> (post.frontmatter.tags)).flat())].filter((el)=>{return el!=null;});
  const options = tags.map((tag)=>({value:tag,label:tag}))
  console.log(options);
  const breakpoints = useBreakpoint();
  let select = "bruh";
  // let heroImg = post.frontmatter.hero.childImageSharp.fluid;

  return (
    <Layout>
      <SEO />
      <Header />
      <PageWrapper as={Container}>
        <Details theme={(theme, themeData)}>
          <h1>Projects</h1>
          <Select options={options} onChange={(tag)=>setTag(tag.value)} value={currentTag} />
          
          <ResponsiveDesktopContainer>
            {(posts.filter(({node:post})=>{
              if(currentTag == null) {
                return true;
              } else {
                if(post.frontmatter.tags){
                  console.log("bruh")
                  console.log(currentTag);
                  console.log(post.frontmatter.tags)
                }
              }
              return currentTag==null?true:!!post.frontmatter.tags?post.frontmatter.tags.includes(currentTag):false}).map(({ node: post }) => (
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
            )))}
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
