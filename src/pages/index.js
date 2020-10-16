import React from 'react';
import { Layout, SEO } from 'components/common';
import { GroupPhoto, LabIntro, Announcements, Collaborators, FeaturedProject } from 'components/landing';

export default () => (
  <Layout>
    <SEO />
    <GroupPhoto />
    <LabIntro />
    <FeaturedProject />
    <Announcements />
    <Collaborators />
  </Layout>
);
