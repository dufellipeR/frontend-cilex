import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { theme } from '../../App';

import ButtonBack from '../../components/ButtonBack';
import NewButton from '../../components/NewButton';
import DefaultTable from '../../components/DefaultTable';
import ChangeCompany from '../../components/ChangeCompany';
import Header from '../../components/Header';

import { Container, Main } from './styles';

export interface Icompany {
  id: string;
  code: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
}

const Company: React.FC = () => {
  const { user } = useAuth();

  const [companies, setCompanies] = useState<Icompany[]>([]);

  useEffect(() => {
    api.get<Icompany[]>('/company').then(response => {
      setCompanies(response.data);
    });
  }, []);

  return (
    <>
      <Container>
        <Header pageName="Empresas" />
        <Main>
          <div id="align-content">
            <ButtonBack destinationBack="/menu" />
            <NewButton to="/company/register">Novo</NewButton>
            <DefaultTable
              tbh={['Código', 'CNPJ', 'Razão Social', 'Nome Fantasia']}
            >
              <tbody>
                {companies &&
                  companies.map(company => (
                    <tr key={company.id}>
                      <td>{company.code}</td>
                      <td>{company.cnpj}</td>
                      <td>{company.razao_social}</td>
                      <td>{company.nome_fantasia}</td>
                      <td>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/company/${company.id}`}
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
      <ChangeCompany />
    </>
  );
};

export default Company;
