import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

import api from '../../services/api';
import { theme } from '../../App';

import Header from '../../components/Header';
import ButtonBack from '../../components/ButtonBack';
import DefaultTable from '../../components/DefaultTable';

import { Container, Main } from './styles';

interface UsersPending {
  id: string;
  person: {
    code: string;
    nome: string;
  };
}

const UsersPending: React.FC = () => {
  const [usersPending, setUsersPending] = useState<UsersPending[]>([]);

  useEffect(() => {
    api.get('/pendinguser').then(response => {
      setUsersPending(response.data);
    });
  }, []);

  return (
    <>
      <Container>
        <Header pageName="Usuários Pendentes" />
        <Main>
          <div id="align-content">
            <ButtonBack destinationBack="/menu/users" />
            <DefaultTable tbh={['ID', 'Nome']}>
              <tbody>
                {usersPending.map(user => (
                  <tr key={user.id}>
                    <td>{user.person.code}</td>
                    <td>{user.person.nome}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/user/pending/${user.id}`}
                      >
                        <FiEye size={24} color={theme.main} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DefaultTable>
          </div>
        </Main>
      </Container>
    </>
  );
};

export default UsersPending;
