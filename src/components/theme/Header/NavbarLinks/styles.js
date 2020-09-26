import tw, { styled } from 'twin.macro';

export const NavLinksWrapper = styled.div`
  a {
    color: #000;
    text-decoration: none;

    @media (max-width: 960px) {
      color: ${({ theme }) => theme.text};
      ${tw`flex flex-col`}
    }
  }

  ${({ desktop }) =>
    desktop
      ? `
			align-items: center;
			display: flex;

			a {
					margin-right: 1rem;

					&:last-child {
							margin-right: unset;
					}
      }
      
      @media (max-width: 960px) {
        display: none;
      }
		`
      : `
			padding: 3rem;
			display: flex;
			flex-direction: column;

			a {
					margin-bottom: 1rem;

					&:last-child {
							margin-bottom: unset;
					}
			}
	`}
`;
