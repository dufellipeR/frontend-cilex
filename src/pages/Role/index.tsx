import React, { useCallback, useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiEye, FiHome, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import { Container, Header, Options, Greetings, Main, Data } from './styles';
import CustomizedTables from '../../components/Table';
import NewButton from '../../components/NewButton';
import DefaultTable from '../../components/DefaultTable';
import api from '../../services/api';
import ChangeCompany from '../../components/ChangeCompany';

export interface IRole {
  id: string;
  code: string;
  role: string;
  description: string;
}

const Role: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const [items, setItems] = useState<IRole[]>([]);

  useEffect(() => {
    api.get<IRole[]>('/role').then(response => {
      setItems(response.data);
    });
  }, []);

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
            <p>Role</p>
          </Greetings>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button onClick={() => handleHome()} layoutColor="button-filled">
              <FiHome size={24} />
            </Button>
            <Button onClick={() => handleLogout()} layoutColor="button-outline">
              <FiPower size={24} />
            </Button>
          </div>
        </Header>
        <Options>
          <NewButton to="/people/register">Novo</NewButton>
        </Options>
        <Main>
          <Data>
            <DefaultTable tbh={['Código', 'Cargo', 'Função']}>
              <tbody>
                {items &&
                  items.map(row => (
                    <tr key={row.id}>
                      <td>{row.code}</td>
                      <td>{row.role}</td>
                      <td>{row.description}</td>

                      <td>
                        {' '}
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/people/${row.id}`}
                        >
                          <FiEye size={24} color="#ff7a00" />
                        </Link>{' '}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </DefaultTable>
          </Data>
        </Main>
      </Container>
      <ChangeCompany />
    </>
  );
};

export default Role;
