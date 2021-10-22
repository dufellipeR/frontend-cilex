import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.3fr;
  text-align: center;
  align-items: center;
  margin-top: 1rem;

  padding: 0 1rem;

  button {
    max-width: 4rem;
    margin: 0 auto;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.6rem;
    color: ${props => props.theme.colors.main};
  }
`;

export const Greetings = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  h2 {
    font-size: 2.5rem;
    color: #161616;
  }

  h3 {
    font-size: 1.25rem;
  }

  @media (max-width: 900px) {
    h2 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1rem;
    }
  }
`;
