import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';

import { theme } from '../../App';

import { Container } from './styles';

const Button: React.FC = () => {
  const history = useHistory();

  const handleBack = useCallback((): void => {
    history.goBack();
  }, [history]);

  return (
    <Container type="button" onClick={() => handleBack()}>
      <HiOutlineArrowLeft size={42} color={theme.palette.primary.main} />
    </Container>
  );
};

export default Button;
