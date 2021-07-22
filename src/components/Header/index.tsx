import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiHome, FiPower } from 'react-icons/fi';

import Logo from '../../assets/cilex-logo.png';
import Button from '../Button';
import { useCompanySelected } from '../../hooks/useCompanySelected';

import { Container } from './styles';

interface HeaderProps {
  pageName: string;
}

const Header: React.FC<HeaderProps> = ({ pageName }) => {
  const history = useHistory();
  const { companySelected } = useCompanySelected();

  const handleLogout = useCallback((): void => {
    history.push('/');
  }, [history]);

  const handleHome = useCallback((): void => {
    history.push('/home');
  }, [history]);

  return (
    <Container>
      <div id="container-logo">
        <img src={Logo} alt="logo" />
      </div>

      <div id="container-texts">
        <h3>{pageName}</h3>
        <p>{companySelected.razao_social}</p>
      </div>

      <div id="container-buttons">
        <Button onClick={() => handleHome()} layoutColor="button-filled">
          <FiHome size={24} />
        </Button>
        <Button onClick={() => handleLogout()} layoutColor="button-outline">
          <FiPower size={24} />
        </Button>
      </div>
    </Container>
  );
};

export default Header;
