import React from 'react';

import { FiUserCheck, FiUserMinus } from 'react-icons/fi';

import { theme } from '../../App';

import Header from '../../components/Header';
import ButtonBack from '../../components/ButtonBack';

import { Container, Main, Module } from './styles';

const MenuUsers: React.FC = () => {
  return (
    <>
      <Container>
        <Header pageName="Menu de Usuários" />
        <ButtonBack destinationBack="/menu" />
        <Main>
          <Module to="/users/pending">
            <FiUserMinus size={44} color={theme.main} />
            <h3>Pendentes</h3>
            <p>Área destinada a ativação de seus usuários</p>
          </Module>
          <Module to="/users/active">
            <FiUserCheck size={44} color={theme.main} />
            <h3>Usuários</h3>
            <p>Área destinada a controle e monitoramento de usuários</p>
          </Module>
        </Main>
      </Container>
    </>
  );
};

export default MenuUsers;
