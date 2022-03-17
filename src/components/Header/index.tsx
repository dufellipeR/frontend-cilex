import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiHome, FiPower } from 'react-icons/fi';

import orange from '../../styles/theme/orange';
import { useToggleTheme } from '../../hooks/useToggleTheme';
import { useAuth } from '../../hooks/auth';
import { useLogoState } from '../../hooks/useLogoState';

import Button from '../Button';

import { Container } from './styles';
import { useCompany } from '../../hooks/useCompany';

interface HeaderProps {
  pageName: string;
  disabledHome?: boolean;
}

interface CompanySelected {
  id: string;
  code: string;
  razao_social: string;
}

const Header: React.FC<HeaderProps> = ({ pageName, disabledHome = false }) => {
  const history = useHistory();
  const { signOut } = useAuth();
  const { toggleTheme } = useToggleTheme();
  const { logo } = useLogoState();
  const { company } = useCompany();

  useEffect(() => {
    console.log(logo);
  }, []);

  const handleLogout = useCallback((): void => {
    signOut();
    toggleTheme(orange);
    history.push('/');
  }, [history, signOut, toggleTheme]);

  const handleHome = useCallback((): void => {
    history.push('/home');
  }, [history]);

  return (
    <Container>
      <div id="container-logo">
        <img src={`http://localhost:3333/api/v1/files/${logo}`} alt="logo" />
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
