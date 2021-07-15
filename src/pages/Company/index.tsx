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

export interface Icompany {
  id: string;
  cod: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
}

const Company: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const [companies, setCompanies] = useState<Icompany[]>([]);

  useEffect(() => {
    api.get<Icompany[]>('/company').then(response => {
      setCompanies(response.data);
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
            <p>Company</p>
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
          <NewButton to="/company/register">Novo</NewButton>
        </Options>
        <Main>
          <Data>
            <DefaultTable
              tbh={['Código', 'CNPJ', 'Razão Social', 'Nome Fantasia']}
            >
              <tbody>
                {companies &&
                  companies.map(row => (
                    <tr key={row.id}>
                      <td>{row.cod}</td>
                      <td>{row.cnpj}</td>
                      <td>{row.razao_social}</td>
                      <td>{row.nome_fantasia}</td>
                      <td>
                        {' '}
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/company/${row.id}`}
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

export default Company;
