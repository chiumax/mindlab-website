import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
@media only screen and (max-width: 480px) {
  html {
    font-size: 100%;
  }
}
body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', Helvetica, sans-serif;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.primary};
  transition: .3s all;
  font-weight: normal;
  word-wrap: break-word;
  font-kerning: normal;
  -moz-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
  -ms-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
  -webkit-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
  font-feature-settings: 'kern', 'liga', 'clig', 'calt';
}

.link{
  color: ${({ theme }) => theme.accent};
  position: absolute;
}
.link:hover {
  border-bottom: 1px solid;
}
`;
