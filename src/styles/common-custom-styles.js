// import styled from 'styled-components';
import tw, { styled } from 'twin.macro';

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


    @media (max-width: 680px) {
      font-size: 30pt;
    }
  }

  h2 {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 28pt;
    font-weight: normal;
    color: ${({ theme }) => theme.text};


    @media (max-width: 680px) {
      font-size: 26pt;
    }
  }

  h3 {
    margin-bottom: 2.5rem;
    font-size: 24pt;
    font-weight: normal;
    color: ${({ theme }) => theme.text};



    @media (max-width: 680px) {
      font-size: 26pt;
    }
  }

  h4 {
    margin-bottom: 2.5rem;
    font-size: 32pt;
    font-weight: normal;
    color: ${({ theme }) => theme.text};


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

export const ResponsiveMobileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ResponsiveDesktopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const ResponsiveColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProjectCard = styled.div`
  width: 45%;
  margin: 0.5rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  @media (max-width: 960px) {
    width: 100%;
  }
  overflow: auto;
  border-radius: 10px;
  transition: all 0.3s;
  border: 1px solid rgba(0, 0, 0, 0);
  box-shadow: 0 2px 4px 0 rgba(136, 144, 195, 0.1), 0 5px 15px 0 rgba(37, 44, 97, 0.07);

  padding: 1rem 1rem 2rem 1rem;
  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 6px 8px 0 rgba(136, 144, 195, 0.2), 0 10px 20px 0 rgba(37, 44, 97, 0.15);
    //box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
  }
`;

export const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

export const Tag = styled.div`
  margin-right: 1rem;
  border-radius: 5px;
  padding: 0.35rem;
  color: black;
  background-color: ${({ theme }) => theme.secondaryAccent};
`;

export const StyledLink = styled.div`
  color: ${({ theme }) => theme.accent};
`;

export const OneLiner = styled.div`
  margin-bottom: 1rem;
`;

export const AlignRight = styled.div`
  display: flex;
  justify-content: flex-end;
  min-width: 100%;
  margin-bottom: 0.1rem;
`;
