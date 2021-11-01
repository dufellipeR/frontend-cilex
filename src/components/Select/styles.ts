import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerStatusProps {
  isFocus: boolean;
  isError: boolean;
}

export const Container = styled.select<ContainerStatusProps>`
  border: 2px solid #666360;
  border-radius: 10px;

  padding: 1rem;
  width: 100%;

  ${props =>
    props.isFocus &&
    css`
      border-color: ${props.theme.colors.main};
    `}

  ${props =>
    props.isError &&
    css`
      border-color: #c53030;
    `}
`;
