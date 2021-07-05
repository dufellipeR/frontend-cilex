import styled from 'styled-components';
import { shade, opacify } from 'polished';

export const Container = styled.button`
  position: absolute;
  background: #ff8700;
  bottom: 0;
  margin: 2%;
  border: 0;
  border-radius: 50%;
  padding: 10px;
  border: 1px solid #ff8700;

  &:hover {
    background: ${shade(0.1, '#ff8700')};
  }
`;
