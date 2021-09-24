import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  layoutColor: 'button-filled' | 'button-outline' | 'button-green';
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  layoutColor,
  ...rest
}) => (
  <Container type="button" className={layoutColor} {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
