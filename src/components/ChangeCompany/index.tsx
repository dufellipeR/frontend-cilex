import React, { ButtonHTMLAttributes, useCallback } from 'react';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const ChangeCompany: React.FC<ButtonProps> = ({ ...rest }) => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push('chosecompany');
  }, [history]);

  return (
    <Container type="button" onClick={() => handleClick()} {...rest}>
      <HiOutlineSwitchVertical size={32} color="white" />
    </Container>
  );
};

export default ChangeCompany;
