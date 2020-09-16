import React, { useContext } from 'react';
import { Container } from 'components/common';
import { ThemeContext } from 'providers/ThemeProvider';
import { Wrapper, Flex, Links, Details } from './styles';
import social from './social.json';

export const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Wrapper>
      <Flex as={Container}>
        <Details theme={theme}>
          <h2>mindlab</h2>
          <span>
            © All rights are reserved | {new Date().getFullYear()} |{' '}
            <a href="https://mindlab.cs.umd.edu" rel="noopener noreferrer" target="_blank">
              Mindlab
            </a>
          </span>
        </Details>
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
