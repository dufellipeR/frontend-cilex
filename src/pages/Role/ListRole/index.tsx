import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';
import { theme } from '../../../App';

import NewButton from '../../../components/NewButton';
import DefaultTable from '../../../components/DefaultTable';
import ChangeCompany from '../../../components/ChangeCompany';
import Header from '../../../components/Header';
import ButtonBack from '../../../components/ButtonBack';
import EmptyData from '../../../components/EmptyData';

import { Container, Main } from './styles';

export interface IRole {
  id: string;
  code: string;
  role: string;
  description: string;
}

const ListRole: React.FC = () => {
  const { user } = useAuth();

  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    api.get<IRole[]>('/role').then(response => {
      setRoles(response.data);
    });
  }, []);

  return (
    <>
      <Container>
        <Header pageName="Cargos e Funções" />
        <Main>
          <div id="align-content">
            <ButtonBack destinationBack="/menu" />
            <NewButton to="/role/register">Novo</NewButton>
            {roles.length > 0 ? (
              <DefaultTable tbh={['Código', 'Cargo', 'Função']}>
                <tbody>
                  {roles.map(role => (
                    <tr key={role.id}>
                      <td>{role.code}</td>
                      <td>{role.role}</td>
                      <td>{role.description}</td>
                      <td>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/role/${role.id}`}
                        >
                          <FiEye size={24} color={theme.main} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </DefaultTable>
            ) : (
              <EmptyData />
            )}
          </div>
        </Main>
      </Container>
      <ChangeCompany />
    </>
  );
};

export default ListRole;
