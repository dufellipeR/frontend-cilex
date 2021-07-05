import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

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
  grid-template-rows: 0.5fr 1fr;
  grid-gap: 50px;
  overflow-y: hidden;

  animation: ${appearFromBottom} 0.6s;
`;

export const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;

export const Companies = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  max-height: 70vh;
`;

export const Company = styled.button`
  display: flex;
  justify-content: flex-start;
  border: 1px solid #ffa700;
  border-radius: 50px;
  padding: 2%;
  margin-bottom: 2%;
  background-color: transparent;

  svg {
    color: #ffa700;
  }

  &:hover {
    background-color: #ffa700;
    color: white;

    svg {
      color: white;
    }
  }
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.3fr;
  text-align: center;
  margin-top: 30px;
  button {
    max-width: 100px;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #ff7a00;
  }
`;

export const Greetings = styled.div`
  margin-right: 5px;
  h2 {
    margin-bottom: 5px;
    font-size: 3vw;
    color: #161616;
  }

  h3 {
    margin-bottom: 15px;
    font-size: 1.5vw;
  }
`;

export const Options = styled.div`
  img {
    height: 430px;
    width: auto;
  }
`;
