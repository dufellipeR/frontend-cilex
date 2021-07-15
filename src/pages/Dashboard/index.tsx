import React, { useCallback } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiHome, FiPower } from 'react-icons/fi';
import chefChoose from '../../assets/chefChoose.svg';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import { Container, Header, Options, Greetings } from './styles';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const handleLogout = useCallback((): void => {
    history.push('/');
  }, [history]);

  const handleHome = useCallback((): void => {
    history.push('/home');
  }, [history]);

  return (
    <>
      <Container>
        <Header>
          <h1>Cilex</h1>
          <Greetings>
            <h2>{user.name.split(' ')[0]}</h2>
            <h3>Estes são os seus resultados !</h3>
            <p>Dashboard</p>
          </Greetings>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button onClick={() => handleHome()} layoutColor="button-filled">
              <FiHome size={24} />{' '}
            </Button>
            <Button onClick={() => handleLogout()} layoutColor="button-outline">
              <FiPower size={24} />
            </Button>
          </div>
        </Header>
      </Container>
    </>
  );
};

export default Dashboard;
