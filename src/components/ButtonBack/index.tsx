import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';

import { theme } from '../../App';

import { Container } from './styles';

interface ButtonBackProps {
  destinationBack: string;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ destinationBack }) => {
  const history = useHistory();

  const handleBack = useCallback((): void => {
    history.push(destinationBack);
  }, [history, destinationBack]);

  return (
    <Container type="button" onClick={() => handleBack()}>
      <HiOutlineArrowLeft size={42} color={theme.main} />
    </Container>
  );
};

export default ButtonBack;
