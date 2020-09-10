import React, { useContext } from 'react';

import { ThemeContext } from 'providers/ThemeProvider';
import { Container, Layout, SEO } from 'components/common';
import { Header } from 'components/theme';
import { PageWrapper, Details } from './styles';

const People = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Layout>
      <SEO />
      <Header />
      <PageWrapper as={Container}>
        <Details theme={theme}>
          <h1>People</h1>

          <section>
            <h2>Professors</h2>

            <h3>Professor Agrawala</h3>
          </section>

          <section>
            <h3>Researchers</h3>

            <ul>
              <li>Mara Cai</li>
            </ul>
          </section>

          <section>
            <h3>Grad Students</h3>

            <ul>
              <li>Faizan Wajid</li>
            </ul>
          </section>

          <section>
            <h3>TAs</h3>
          </section>

          <section>
            <h3>Current Undergraduate Students</h3>
          </section>

          <section>
            <h3>Current Interns</h3>

            <ul>
              <li>Max Chiu</li>
            </ul>
          </section>

          <section>
            <h3>Past Students</h3>
          </section>

          <section>
            <h3>Past Interns</h3>

            <ul>
              <li>Brian Xiang</li>
            </ul>
          </section>
        </Details>
      </PageWrapper>
    </Layout>
  );
};

export default People;
