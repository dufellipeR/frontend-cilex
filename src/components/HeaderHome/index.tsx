/* eslint-disable import/no-duplicates */
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import useToggleTheme from '../../hooks/useToggleTheme';
import { useAuth } from '../../hooks/auth';

import Button from '../Button';

import { Container, Greetings } from './styles';

interface HeaderProps {
  message: string;
}

const Header: React.FC<HeaderProps> = ({ message }) => {
  const history = useHistory();
  const { user, signOut } = useAuth();
  const { toggleTheme } = useToggleTheme();

  const [date, setDate] = useState<string[]>([]);

  useEffect(() => {
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
    toggleTheme('orange');
    history.push('/');
  }, [history, signOut, toggleTheme]);

  return (
    <Container>
      <h1>Cilex</h1>

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
