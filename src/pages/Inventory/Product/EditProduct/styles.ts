import styled, { css } from 'styled-components';

interface InputFileProps {
  hasThumb?: string;
}

export const Container = styled.div``;

export const Main = styled.main``;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 4rem 2rem;

  #container-arrow {
    width: 10rem;

    display: flex;
    justify-content: center;

    button {
      border: 0;
      background-color: transparent;
    }
  }

  #container-titles {
    max-width: 60%;
    text-align: center;
  }

  #container-buttons-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const ContainerProductData = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30%);
  justify-content: space-around;
  align-items: center;

  margin: 4rem 2rem;
`;

export const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.5rem 0;

  h4 {
    font-weight: bold;
    color: ${props => props.theme.main};
  }

  span {
    max-width: 100%;
    word-break: break-all;
    text-align: center;
  }
`;

export const FormCustom = styled.form`
  margin: 2rem 4rem;

  #align-inputs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;

    @media (max-width: 900px) {
      display: flex;
      flex-direction: column;

      margin-bottom: 1rem;
    }
  }

  #align-switch {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  #align-button-save {
    width: 50%;
    margin-right: auto;
    margin-top: 10px;

    @media (max-width: 900px) {
      width: 100%;
    }
  }
`;

export const ContainerInputFile = styled.label<InputFileProps>`
  border: 1px dashed #666360;
  border-radius: 10px;
  background-size: cover;
  cursor: pointer;
  height: 10rem;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin-right: 1rem;
  }

  input {
    display: none;
  }

  ${props =>
    props.hasThumb &&
    css`
      border: 0;
    `}

  .has-thumbnail {
    border: 0;
    padding: 10rem;
  }

  .has-thumbnail img {
    display: none;
  }
`;
