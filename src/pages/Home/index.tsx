/* eslint-disable import/no-duplicates */
import React, { useCallback, useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { format } from 'date-fns';

import ptBR from 'date-fns/locale/pt-BR';

import {
  FiArrowLeft,
  FiArrowRight,
  FiLogOut,
  FiPower,
  FiThumbsUp,
} from 'react-icons/fi';
import chooseSvg from '../../assets/road-sign.svg';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import { Container, Header, Options, Greetings } from './styles';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar_url: string;
}

const Home: React.FC = () => {
  const history = useHistory();
  const { user, signOut } = useAuth();

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
    history.push('/');
  }, [history, signOut]);

  const handleDashboard = useCallback((): void => {
    history.push('/dashboard');
  }, [history]);

  const handleMenu = useCallback((): void => {
    history.push('/menu');
  }, [history]);

  return (
    <>
      <Container>
        <Header>
          <h1>Cilex</h1>
          <Greetings>
            <h2>Bom Dia {user.name.split(' ')[0]} !</h2>
            {date && (
              <h3>{`${date[0]}, ${date[1]} de ${date[2]} de ${date[3]}`}</h3>
            )}

            <p>O que vamos fazer hoje? </p>
          </Greetings>
          <Button onClick={() => handleLogout()} layoutColor="button-outline">
            <FiPower size={24} />
          </Button>
        </Header>
        <Options>
          <Button onClick={() => handleMenu()} layoutColor="button-filled">
            <FiArrowLeft size={24} />
            <span>Sistema</span>
          </Button>
          <div id="container-img">
            <img src={chooseSvg} alt="" />
          </div>
          <Button onClick={() => handleDashboard()} layoutColor="button-filled">
            <span>Dashboard</span>
            <FiArrowRight size={24} />
          </Button>
        </Options>
      </Container>
    </>
  );
};

export default Home;
