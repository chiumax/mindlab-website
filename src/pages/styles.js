// import styled from 'styled-components';
import tw, {styled} from "twin.macro";

export const PageWrapper = styled.div`
  padding: 4rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const Details = styled.div`
  flex: 1;

  @media (max-width: 960px) {
    width: 100%;
    margin-bottom: 2rem;
  }

  h1 {
    margin-bottom: 2rem;
    font-size: 36pt;
    color: ${({ theme }) => theme.text};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ themeData }) => (themeData === 'light' ? 'unset' : 'difference')};
    }

    @media (max-width: 680px) {
      font-size: 30pt;
    }
  }

  h2 {
    margin-bottom: 2.5rem;
    font-size: 28pt;
    font-weight: normal;
    color: ${({ theme }) => theme.text};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ themeData }) => (themeData === 'light' ? 'unset' : 'difference')};
    }

    @media (max-width: 680px) {
      font-size: 26pt;
    }
  }

  h3 {
    margin-bottom: 2.5rem;
    font-size: 24pt;
    font-weight: normal;
    color: ${({ theme }) => theme.text};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ themeData }) => (themeData === 'light' ? 'unset' : 'difference')};
    }

    @media (max-width: 680px) {
      font-size: 26pt;
    }
  }

  h4 {
    margin-bottom: 2.5rem;
    font-size: 32pt;
    font-weight: normal;
    color: ${({ theme }) => theme.text};

    @media (max-width: 960px) {
      mix-blend-mode: ${({ themeData }) => (themeData === 'light' ? 'unset' : 'difference')};
    }

    @media (max-width: 680px) {
      font-size: 26pt;
    }
  }

  ul {
    color: ${({ theme }) => theme.text};

    li {
      : ${({ theme }) => theme.text};
    }
  }
`;

export const MobileProjectCardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DesktopProjectCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
`;

export const ProjectCardColumn = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ProjectCard = styled.div`
  flex: 1;
  hover:${({ theme }) =>theme.text};
  ${tw`bg-blue-500 text-white p-2 rounded`}

`;

// export const ProjectCard = styled.div.attrs({
//   className: "md:flex bg-white rounded-lg p-6 text-purple-500 border hover:border-black"
// })`
//   &{

//   }`

