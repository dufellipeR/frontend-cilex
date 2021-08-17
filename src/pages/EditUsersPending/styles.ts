import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
`;

export const Main = styled.main`
  height: 85vh;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: 'a b';

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;

    margin-top: 4rem;
    gap: 4rem;
  }

  div#info-user {
    grid-area: a;
    align-self: center;
    justify-self: center;

    text-align: center;

    span:not(#activate-user) {
      color: ${props => props.theme.main};
      font-weight: bold;
    }

    p {
      margin-bottom: 1rem;
    }
  }

  form {
    width: 80%;

    grid-area: b;
    align-self: center;
    justify-self: center;
  }
`;

export const FormCustom = styled.form`
  display: flex;
  flex-direction: column;

  gap: 1rem;
`;