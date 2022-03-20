import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiHome, FiPower } from 'react-icons/fi';

import orange from '../../styles/theme/orange';
import { useToggleTheme } from '../../hooks/useToggleTheme';
import { useAuth } from '../../hooks/auth';
import { useCompany } from '../../hooks/useCompany';

import Button from '../Button';

import { Container } from './styles';

interface HeaderProps {
  pageName: string;
  disabledHome?: boolean;
}

const Header: React.FC<HeaderProps> = ({ pageName, disabledHome = false }) => {
  const history = useHistory();
  const { signOut } = useAuth();
  const { toggleTheme } = useToggleTheme();
  const { company, clearCompany } = useCompany();

  const handleLogout = useCallback((): void => {
    signOut();
    toggleTheme(orange);
    clearCompany();
    history.push('/');
  }, [history, signOut, toggleTheme, clearCompany]);

  const handleHome = useCallback((): void => {
    history.push('/home');
  }, [history]);

  return (
    <Container>
      <div id="container-logo">
        <img src={company.company_logo} alt="logo" />
      </div>

      <div id="container-texts">
        <h3>{pageName}</h3>
        <p>
          {company.code} - {company.razao_social}
        </p>
      </div>

      <div id="container-buttons">
        <Button
          onClick={() => handleHome()}
          layoutColor="button-filled"
          disabled={disabledHome}
        >
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
