import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

const NewButton: React.FC<LinkProps> = ({ children, to, ...rest }) => (
  <Link
    style={{
      backgroundColor: '#8DC73E',
      color: '#fff',
      padding: 5,
      textDecoration: 'none',
      borderRadius: `${5}%`,
      fontSize: `${1.5}vw`,
    }}
    to={to}
    type="button"
    {...rest}
  >
    {children}
  </Link>
);

export default NewButton;
