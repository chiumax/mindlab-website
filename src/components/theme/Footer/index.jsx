import React, { useContext } from 'react';
import { Container } from 'components/common';
import { ThemeContext } from 'providers/ThemeProvider';
import tw, { css, styled } from 'twin.macro';
import { Wrapper, Flex, Links, Details } from './styles';
import social from './social.json';

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Footer = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Wrapper>
      <Flex as={Container}>
        <Details theme={theme}>
          <span>© {new Date().getFullYear()} MIND Lab</span>
        </Details>

        <FooterLinks className="footer-links">
          <h6>Link</h6>
          <a href="#">Privacy Policy</a>
          <a href="#">UMC Computer Science</a>
        </FooterLinks>

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
