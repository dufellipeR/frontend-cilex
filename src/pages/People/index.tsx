import React, { useCallback, useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiEye, FiHome, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import { Container, Header, Greetings, Main } from './styles';
import CustomizedTables from '../../components/Table';
import NewButton from '../../components/NewButton';
import DefaultTable from '../../components/DefaultTable';
import api from '../../services/api';
import ChangeCompany from '../../components/ChangeCompany';

export interface IPerson {
  id: string;
  code: string;
  cnpj: string;
  cpf: string;
  nome: string;
  razao_social: string;
}

const People: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const [people, setPeople] = useState<IPerson[]>([]);

  useEffect(() => {
    api.get('/peoples').then(response => {
      setPeople(response.data.people);
      console.log('Fez o get: ', response.data);
    });

    // api.get<IPerson[]>('/person').then(response => {
    //   setPeople(response.data);
    // });
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
            <p>People</p>
          </Greetings>
          <div id="container-buttons">
            <Button onClick={() => handleHome()} layoutColor="button-filled">
              <FiHome size={24} />
            </Button>
            <Button onClick={() => handleLogout()} layoutColor="button-outline">
              <FiPower size={24} />
            </Button>
          </div>
        </Header>
        <Main>
          <div id="align-content">
            <NewButton to="/people/register">Novo</NewButton>
            <DefaultTable tbh={['Código', 'CNPJ/CPF', 'Razão Social/Nome']}>
              <tbody>
                {people &&
                  people.map(row => (
                    <tr key={row.code}>
                      <td>{row.code}</td>
                      <td>{row.cnpj || row.cpf}</td>
                      <td>{row.razao_social || row.nome}</td>

                      <td>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/people/${row.id}`}
                        >
                          <FiEye size={24} color="#ff7a00" />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </DefaultTable>
          </div>
        </Main>
      </Container>
      <ChangeCompany />
    </>
  );
};

export default People;
