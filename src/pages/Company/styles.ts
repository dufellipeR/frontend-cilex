import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
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
