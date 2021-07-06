import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }

  to {
    opacity:1;
    transform: translateX(0)
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  animation: ${appearFromLeft} 1s;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const ShowOff = styled.div`
  text-align: center;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #ff7a00;
  }

  img {
    margin-top: 3rem;
    height: 22rem;
  }

  @media (max-width: 900px) {
    img {
      display: none;
    }
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    margin-top: 9rem;
    width: 22rem;
    text-align: center;

    a {
      color: #ff7a00;
      display: block;
      margin-top: 1.5rem;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.1, '#FF7A00')};
      }
    }
  }

  @media (max-width: 900px) {
    form {
      margin-top: 0;
    }
  }
`;
