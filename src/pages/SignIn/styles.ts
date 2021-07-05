import styled, { keyframes } from 'styled-components';
import { opacify, shade } from 'polished';

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
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const ShowOff = styled.div`
  text-align: center;

  animation: ${appearFromLeft} 1s;

  main {
    margin-top: 50px;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 10px;
    color: #ff7a00;
  }

  p {
  }

  img {
    margin-left: 150px;
    margin-top: 50px;
    height: 350px;
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* animation: ${appearFromLeft} 1s; */

  form {
    margin-top: 200px;
    width: 340px;
    text-align: center;

    a {
      color: #ff7a00;
      display: block;
      margin-top: 24px;
      margin-left: 10px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.1, '#FF7A00')};
      }
    }
  }

  > a {
    color: white;
    display: block;
    margin-top: -20px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, 'white')};
    }
  }
`;
