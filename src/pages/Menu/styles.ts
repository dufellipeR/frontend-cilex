import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
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
  display: grid;
  grid-template-rows: 0.3fr 1fr;
  grid-gap: 50px;

  hr {
    opacity: 0.2;
  }

  animation: ${appearFromLeft} 1s;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.3fr;
  text-align: center;
  margin-top: 30px;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  background-color: #fefefe;

  button {
    max-width: 100px;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #ff7a00;
  }
`;

export const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
  grid-template-rows: repeat(auto-fit, minmax(150px, 200px));
  grid-column-gap: 10px;
  grid-row-gap: 20px;
  margin-left: 2%;
  margin-right: 1%;
`;

export const Module = styled(Link)`
  text-decoration: none;
  color: #6a6c72;
  border: 1px solid rgba(255, 122, 0, 0.2);
  border-radius: 5%;
  max-height: 250px;
  display: flex;
  flex-direction: column;
  /* align-content: left; */
  padding: 10%;
  cursor: pointer;

  h3 {
    margin: 10px 0 10px 0;
    color: #161616;
  }

  &:hover {
    background-color: rgba(255, 122, 0, 0.3);
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
