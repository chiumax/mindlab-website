import React from 'react';
import { Layout, SEO } from 'components/common';
import { Intro, Skills, Projects } from 'components/landing';

export default () => (
  <Layout>
    <SEO />
    <Intro />
    <Projects />
    <Skills />
  </Layout>
);
