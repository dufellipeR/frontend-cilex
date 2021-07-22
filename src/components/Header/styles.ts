import styled from 'styled-components';

export const Container = styled.div`
  height: 15vh;
  display: flex;

  justify-content: space-between;
  align-items: center;

  padding: 1rem 2rem;

  #container-texts {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    h3 {
      font-size: 1.5rem;
      color: #161616;
    }

    p {
      font-size: 1rem;
      color: #6a6c72;
    }
  }

  #container-buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;