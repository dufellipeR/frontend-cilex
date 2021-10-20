import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Main = styled.main`
  margin: 0 auto;
  padding: 2rem;
  max-width: 1080px;
`;

export const Section = styled.section`
  & + & {
    border-top: 1px solid black;
    padding-top: 1rem;
    margin-top: 1rem;
  }

  .box-input {
    margin-top: 2rem;
    display: flex;

    input {
      margin-left: 2rem;
    }
  }
`;
