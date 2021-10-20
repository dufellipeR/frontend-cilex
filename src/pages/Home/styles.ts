import styled, { keyframes } from 'styled-components';

const appearFromBottom = keyframes`
 from {
  opacity: 0;
  transform: translateY(-100px);

 }
 to {
  opacity:1;
  transform: translateY(0)
 }
`;

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 0.3fr 1fr;
  grid-gap: 1rem;

  animation: ${appearFromBottom} 0.6s;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.3fr;
  text-align: center;
  align-items: center;
  margin-top: 1rem;

  padding: 0 1rem;

  button {
    max-width: 6.25rem;
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

export const Options = styled.main`
  display: grid;
  grid-template-columns: 0.3fr 1fr 0.3fr;
  align-self: center;

  button {
    max-width: 12.5rem;
    margin: auto;

    display: flex;
    justify-content: center;
    align-items: center;

    gap: 1rem;
  }

  #container-img {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 25rem;
      margin: auto;
    }
  }

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    img {
      display: none;
    }

    button {
      max-width: 90%;
    }
  }
`;
