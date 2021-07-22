import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEye, FiHome, FiPower } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Button from '../../components/Button';
import CustomizedTables from '../../components/Table';
import NewButton from '../../components/NewButton';
import DefaultTable from '../../components/DefaultTable';
import ChangeCompany from '../../components/ChangeCompany';
import Header from '../../components/Header';

import { Container, Options, Main, Data } from './styles';

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
        <Header pageName="Empresas" />
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
