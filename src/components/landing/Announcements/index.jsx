import React from 'react';
import { Container } from 'components/common';
import tw, { css } from 'twin.macro';
import { AnnouncementsWrapper } from './styles';

const announcementsStyle = css`
  ${tw`flex flex-col`}
`;

const calloutContainerStyle = css`
  ${tw`flex flex-col justify-center mt-4 gap-8`}
`;

const calloutStyle = css`
  ${tw`flex flex-col p-8 rounded-lg border-gray-500 border-2 border-opacity-50`}
`;

const calloutTitleStyle = css`
  ${tw`text-lg font-bold`}
`;

const calloutTextStyle = css`
  ${tw`text-base mb-4`}
`;

const announcementLinkStyle = css`
  ${tw`self-end underline text-blue-500 hover:text-red-500`}
`;

export const Announcements = () => (
  <AnnouncementsWrapper as={Container} css={announcementsStyle}>
    <h1>Highlights</h1>

    <div className="callout-container" css={calloutContainerStyle}>
      <div className="callout" css={calloutStyle}>
        <h1 css={calloutTitleStyle}>Contract Tracing Study Grant Received</h1>

        <p css={calloutTextStyle}>
          Northrop Grumman has announced that a generous contribution to MIND Lab of the amount of $50,000 on April 1,
          2021.
        </p>

        <a href="#" css={announcementLinkStyle}>
          Read the announcement
        </a>
      </div>

      <div className="callout" css={calloutStyle}>
        <h1 css={calloutTitleStyle}>Patent Awarded to the Healthcare Language Modeling project</h1>

        <p css={calloutTextStyle}>
          The Healthcare Language Modeling was awarded a patent for its innovative approach to translating technical
          medical language to downstream consumers.
        </p>

        <a href="#" css={announcementLinkStyle}>
          Read the post
        </a>
      </div>
    </div>
  </AnnouncementsWrapper>
);
