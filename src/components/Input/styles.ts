import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerStatusProps {
  isFocus: boolean;
  isError: boolean;
}

export const Container = styled.div<ContainerStatusProps>`
  border: 2px solid #666360;
  border-radius: 10px;

  padding: 1rem;
  width: 100%;

  display: flex;
  align-items: center;

  ${props =>
    props.isFocus &&
    css`
      border-color: var(--primary-color);
    `}

  ${props =>
    props.isError &&
    css`
      border-color: #c53030;
    `}

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

    ${props =>
      props.isFocus &&
      css`
        color: var(--primary-color);
      `}

    ${props =>
      props.isError &&
      css`
        color: #c53030;
      `}
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
