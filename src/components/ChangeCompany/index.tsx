import React, { useCallback } from 'react';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';

import { Container } from './styles';

const ChangeCompany: React.FC = ({ ...rest }) => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push('chosecompany');
  }, [history]);

  return (
    <Container type="button" onClick={() => handleClick()} {...rest}>
      <HiOutlineSwitchVertical size={28} color="#FFF" />
    </Container>
  );
};

export default ChangeCompany;
