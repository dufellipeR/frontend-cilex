import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import NewButton from '../../components/NewButton';
import DefaultTable from '../../components/DefaultTable';
import ChangeCompany from '../../components/ChangeCompany';
import Header from '../../components/Header';
import ButtonBack from '../../components/ButtonBack';

import { Container, Main } from './styles';

export interface IRole {
  id: string;
  code: string;
  role: string;
  description: string;
}

const Role: React.FC = () => {
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
            <ButtonBack />
            <NewButton to="/people/register">Novo</NewButton>
            <DefaultTable tbh={['Código', 'Cargo', 'Função']}>
              <tbody>
                {roles &&
                  roles.map(role => (
                    <tr key={role.id}>
                      <td>{role.code}</td>
                      <td>{role.role}</td>
                      <td>{role.description}</td>

                      <td>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/people/${role.id}`}
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

export default Role;
