import React, { useContext } from 'react';

import { Container, Layout, SEO } from 'components/common';
import { Header } from 'components/theme';
import { ThemeContext } from 'providers/ThemeProvider';
import { PageWrapper, Details } from '../styles/common-custom-styles';

/**
 * The diversity section is requested by Professor Agrawala. He wants to
 * highlight the diversity of MIND Lab
 */
const Diversity = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Layout>
      <SEO />
      <Header />
      <PageWrapper as={Container}>
        <Details theme={theme}>
          <div className="diversity-page">
            <h1>Diversity</h1>
            <p>
              TODO: Professor Agrawala will fill this section out once he has a better idea of what he wants to display
              here.
            </p>
            Suggestions:
            <ul>
              <li>Flag next to each person's name for nationality</li>
              <li>Symbol next to each person's name for </li>
            </ul>
            <p>
              We could use some icons from{' '}
              <a href="https://fontawesome.com/icons?d=gallery&c=gender&m=free">Font Awesome</a>
            </p>
          </div>
        </Details>
      </PageWrapper>
    </Layout>
  );
};

export default Diversity;
