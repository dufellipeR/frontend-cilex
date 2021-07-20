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
  display: grid;
  grid-template-rows: 0.2fr 1fr;
  grid-gap: 0;
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
  display: flex;
  flex-direction: column;

  margin-top: 2rem;

  #align-content {
    width: 95%;

    padding: 0 2rem;

    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  td#td-options {
    display: flex;
    margin-left: 1rem;
    gap: 1rem;

    #share {
      background-color: transparent;
      border: none;
    }
  }
`;

// MODAL SHARE
export const ContentModalShare = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ContainerContentModalShare = styled.div`
  width: 100%;
  margin: 2rem 0;

  max-height: 50vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  #row-share {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    padding: 0 1rem;

    .MuiCheckbox-colorPrimary:hover {
      background-color: transparent;
    }
  }
`;
