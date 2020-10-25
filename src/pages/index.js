import React from 'react';
import { Layout, SEO } from 'components/common';
import { Hero, LabIntro, Announcements, Collaborators, FeaturedProject } from 'components/landing';

export default () => (
  <Layout>
    <SEO />
    <Hero />
    <LabIntro />
    <FeaturedProject />
    <Announcements />
    <Collaborators />
  </Layout>
);
