/* eslint-disable import/no-duplicates */
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import orange from '../../styles/theme/orange';
import { useToggleTheme } from '../../hooks/useToggleTheme';
import { useAuth } from '../../hooks/auth';
import cilexLogo from '../../assets/cilex-logo.png';

import Button from '../Button';

import { Container, Greetings } from './styles';
import { useLogoState } from '../../hooks/useLogoState';

interface HeaderProps {
  message: string;
}

const Header: React.FC<HeaderProps> = ({ message }) => {
  const history = useHistory();
  const { user, signOut } = useAuth();
  const { toggleTheme } = useToggleTheme();
  const { logo } = useLogoState();

  const [date, setDate] = useState<string[]>([]);

  useEffect(() => {
    console.log(logo);

    // if (logo !== cilexLogo && logo !== null) {
    //   console.log('entrou tem logo');

    //   setFileLogo(`http://localhost:3333/api/v1/files/${logo}`);
    // } else {
    //   console.log('entrou sem logo');

    //   setLogo(cilexLogo);
    //   setFileLogo(cilexLogo);
    // }
    // const filelogo = `http://localhost:3333/api/v1/files/${logo}`;
    const data = new Date();
    const dateFormatted = format(data, 'EEEE/dd/MMMM/yyyy', { locale: ptBR });
    const dateSplitted = dateFormatted.split('/');

    setDate([
      dateSplitted[0].charAt(0).toUpperCase() + dateSplitted[0].slice(1),
      dateSplitted[1],
      dateSplitted[2],
      dateSplitted[3],
    ]);
  }, []);

  const handleLogout = useCallback((): void => {
    signOut();
    toggleTheme(orange);
    history.push('/');
  }, [history, signOut, toggleTheme]);

  return (
    <Container>
      <div id="container-logo">
        <img src={logo} alt="logo" />
      </div>

      <Greetings>
        <h2>Bom Dia {user.name.split(' ')[0]} !</h2>
        {date && (
          <h3>{`${date[0]}, ${date[1]} de ${date[2]} de ${date[3]}`}</h3>
        )}

        <p>{message}</p>
      </Greetings>
      <Button onClick={() => handleLogout()} layoutColor="button-outline">
        <FiPower size={24} />
      </Button>
    </Container>
  );
};

export default Header;
