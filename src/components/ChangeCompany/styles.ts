import styled from 'styled-components';

export const Container = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 1rem;

  background: var(--primary-color);
  border: 1px solid var(--primary-color);
  border-radius: 50%;
  border: 0;

  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: var(--primary-color-hover);
  }
`;
