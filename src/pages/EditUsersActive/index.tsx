import React from 'react';

import ButtonBack from '../../components/ButtonBack';
import Header from '../../components/Header';

import { Container, Main } from './styles';

const EditUsersActive: React.FC = () => {
  return (
    <>
      <Container>
        <Header pageName="Editar Usuários Ativos" />
        <ButtonBack destinationBack="/users/active" />
        <Main>
          <h1>Editar Usuários Ativos</h1>
        </Main>
      </Container>
    </>
  );
};

export default EditUsersActive;
