import styled, { keyframes } from 'styled-components';

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
`;

export const Options = styled.div`
  margin-left: 70px;
`;

export const Data = styled.div``;

export const Main = styled.main`
  text-align: -webkit-center;
`;
