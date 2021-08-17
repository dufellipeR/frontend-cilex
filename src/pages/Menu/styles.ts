import styled, { css, keyframes } from 'styled-components';
import { Link, LinkProps } from 'react-router-dom';

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

  animation: ${appearFromLeft} 1s;
`;

export const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12.5rem, 15.5rem));
  grid-template-rows: repeat(auto-fit, minmax(10rem, 12.5rem));
  gap: 1rem;
  justify-content: center;
`;

export const Module = styled(Link)`
  position: relative;

  max-height: 15.5rem;
  padding: 2rem;

  text-decoration: none;
  color: #6a6c72;
  cursor: pointer;

  border: 1px solid ${props => props.theme.mainHover};
  border-radius: 5%;

  display: flex;
  flex-direction: column;

  h3 {
    margin: 0.5rem 0;
    color: #161616;
  }

  &:hover {
    background-color: ${props => props.theme.mainHover};
  }

  #notification {
    position: absolute;
    background: ${props => props.theme.main};

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;
    padding: 8px;

    top: 1rem;
    right: 1rem;
  }
`;
