import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 0.5fr 1fr;
  grid-gap: 10px;
`;

export const Main = styled.main`
  text-align: -webkit-center;
  padding: 0 2rem 2rem 2rem;

  #align-switch {
    display: grid;
    grid-template-columns: 0.2fr 1fr 0.2fr;
    align-items: center;
    margin: 3rem;

    #container-switch {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
    }
  }
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

  #align-button-save {
    width: 50%;
    margin-right: auto;

    @media (max-width: 900px) {
      width: 100%;
    }
  }
`;

export const Select = styled.select`
  border: 2px solid #666360;
  border-radius: 10px;

  padding: 1rem;
  width: 100%;
`;
