import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

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

  hr {
    opacity: 0.2;
  }

  animation: ${appearFromLeft} 1s;
`;

export const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
  grid-template-rows: repeat(auto-fit, minmax(150px, 200px));
  grid-column-gap: 10px;
  grid-row-gap: 20px;
  margin-left: 2%;
  margin-right: 1%;
  justify-content: center;
`;

export const Module = styled(Link)`
  text-decoration: none;
  color: #6a6c72;
  border: 1px solid ${props => props.theme.mainHover};
  border-radius: 5%;
  max-height: 250px;
  display: flex;
  flex-direction: column;
  padding: 10%;
  cursor: pointer;

  h3 {
    margin: 10px 0 10px 0;
    color: #161616;
  }

  &:hover {
    background-color: ${props => props.theme.mainHover};
  }
`;

export const Options = styled.main`
  display: grid;
  grid-template-columns: 0.3fr 0.4fr 0.3fr;

  button {
    max-width: 200px;
    margin: auto;
  }

  img {
    height: 400px;
    margin: auto;
  }
`;
