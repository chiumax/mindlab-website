import React, { useContext } from 'react';
import { Container } from 'components/common';
import { FooterLinks } from 'components/theme/FooterLinks';
import { SiteMap } from 'components/theme/SiteMap';
import { ThemeContext } from 'providers/ThemeProvider';
import { Wrapper, Flex, Links, Details } from './styles';
import social from './social.json';

export const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Wrapper>
      <Flex as={Container}>
        <Details theme={theme}>
          <span>© {new Date().getFullYear()} MIND Lab</span>
        </Details>

        <FooterLinks />

        <SiteMap />

        <Links>
          {social.map(({ id, name, link, icon }) => (
            <a key={id} href={link} target="_blank" rel="noopener noreferrer" aria-label={`follow me on ${name}`}>
              <img width="24" src={icon} alt={name} />
            </a>
          ))}
        </Links>
      </Flex>
    </Wrapper>
  );
};
