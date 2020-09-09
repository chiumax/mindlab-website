import React from 'react';
import { Layout, SEO } from 'components/common';
import { GroupPhoto, LabIntro, Announcements, Sponsors, FeaturedProject } from 'components/landing';

export default () => (
  <Layout>
    <SEO />
    <GroupPhoto />
    <LabIntro />
    <FeaturedProject />
    <Announcements />
    <Sponsors />
  </Layout>
);
