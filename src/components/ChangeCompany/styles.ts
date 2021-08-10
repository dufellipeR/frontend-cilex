import styled from 'styled-components';

export const Container = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 1rem;

  background: ${props => props.theme.main};
  border: 1px solid ${props => props.theme.main};
  border-radius: 50%;
  border: 0;

  padding: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${props => props.theme.mainHover};
  }
`;
