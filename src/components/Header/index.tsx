import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiHome, FiPower } from 'react-icons/fi';

import Logo from '../../assets/cilex-logo.png';
import Button from '../Button';

import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

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

  const [companySelected, setCompanySelected] = useState({} as CompanySelected);

  useEffect(() => {
    const companyString = localStorage.getItem('@Cilex:companySelected');
    if (companyString) setCompanySelected(JSON.parse(companyString));
  }, []);

  const handleLogout = useCallback((): void => {
    signOut();
    history.push('/');
  }, [history, signOut]);

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
        <p>
          {companySelected.code} - {companySelected.razao_social}
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
