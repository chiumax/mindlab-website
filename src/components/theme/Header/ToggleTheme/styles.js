import tw, { styled } from 'twin.macro';

export const ToggleThemeContainer = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: 0.3s all;

  &:focus {
    outline: none;
    transition: 0.3s all;
  }

  @media (max-width: 960px) {
    ${tw`flex flex-col`}
  }

  img {
    margin-bottom: unset;
  }
`;
