import React, { useContext } from 'react';

import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Layout, SEO } from 'components/common';
import { Header } from 'components/theme';
import { PageWrapper, Details } from '../styles/common-custom-styles';

const About = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Layout>
      <SEO />
      <Header />
      <PageWrapper as={Container}>
        <Details theme={theme}>
          <h1>About</h1>

          <p>
            To be done by Professor Agrawala. He will come up with a write up of its inception, its history, its
            trajectory, etc
          </p>
        </Details>
      </PageWrapper>
    </Layout>
  );
};

export default About;
