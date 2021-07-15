import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import { Form } from '@unform/web';

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
  grid-template-rows: 0.5fr 1fr;
  grid-gap: 10px;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.3fr;
  text-align: center;
  align-items: center;
  margin-top: 1rem;

  padding: 0 1rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.6rem;
    color: #ff7a00;
  }

  #container-buttons {
    display: flex;
    gap: 1rem;

    button {
      max-width: 6.25rem;
      margin: 0 auto;
    }
  }
`;

export const Greetings = styled.div`
  margin-right: 5px;
  h2 {
    margin-bottom: 5px;
    font-size: 3vw;
  }

  h3 {
    margin-bottom: 15px;
    font-size: 1.5vw;
  }
`;

export const Main = styled.main`
  text-align: -webkit-center;
  margin: 5%;
`;

export const FormCustom = styled.form`
  #align-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;

    margin-bottom: 1rem;

    @media (max-width: 900px) {
      display: flex;
      flex-direction: column;

      margin-bottom: 1rem;
    }
  }
`;
