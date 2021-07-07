import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

export const Container = styled.div`
  border: 2px solid #666360;
  border-radius: 10px;

  padding: 1rem;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 0.5rem;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #666360;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
