import React, { useCallback, useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiEye, FiHome, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import { Container, Header, Options, Greetings, Main, Data } from './styles';
import OutlinedButton from '../../components/OutlinedButton';
import CustomizedTables from '../../components/Table';
import NewButton from '../../components/NewButton';
import DefaultTable from '../../components/DefaultTable';
import api from '../../services/api';
import ChangeCompany from '../../components/ChangeCompany';

export interface IGroup {
  id: string;
  code: string;
  description: string;
}

const Group: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const [items, setItems] = useState<IGroup[]>([]);

  useEffect(() => {
    api.get<IGroup[]>('/group').then((response) => {
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
            <p>Group</p>
          </Greetings>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button onClick={() => handleHome()}>
              <FiHome size={24} />
            </Button>
            <OutlinedButton onClick={() => handleLogout()}>
              <FiPower size={24} />
            </OutlinedButton>
          </div>
        </Header>
        <Options>
          <NewButton to="/people/register">Novo</NewButton>
        </Options>
        <Main>
          <Data>
            <DefaultTable tbh={['Código', 'Descrição']}>
              <tbody>
                {items &&
                  items.map((row) => (
                    <tr key={row.id}>
                      <td>{row.code}</td>
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

export default Group;
