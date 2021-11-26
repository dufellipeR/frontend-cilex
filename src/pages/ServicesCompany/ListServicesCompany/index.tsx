import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

import NewButton from '../../../components/NewButton';
import DefaultTable from '../../../components/DefaultTable';
import Header from '../../../components/Header';
import ButtonBack from '../../../components/ButtonBack';
import EmptyData from '../../../components/EmptyData';

import { Container, Main } from './styles';

export interface IServicesCompany {
  id: string;
  code: string;
  service: string;
  color: string;
}

const ListServicesCompany: React.FC = () => {
  const { user } = useAuth();
  const { colors } = useContext(ThemeContext);

  const [services, setServices] = useState<IServicesCompany[]>([
    { id: '1', code: '1000', service: 'Banho e Tosa', color: '#F00' },
    { id: '2', code: '2000', service: 'Hospedagem', color: '#FF0' },
    { id: '3', code: '3000', service: 'Creche', color: '#0FF' },
  ]);

  useEffect(() => {
    api.get<IServicesCompany[]>('/service').then(response => {
      setServices(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Serviços" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/menu" />
          <NewButton to="/service/register">Novo</NewButton>
          {services.length > 0 ? (
            <DefaultTable tbh={['Código', 'Serviços']}>
              <tbody>
                {services.map(service => (
                  <tr key={service.id}>
                    <td>{service.code}</td>
                    <td>{service.service}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/service/${service.id}`}
                      >
                        <FiEye size={24} color={colors.main} />
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
  );
};

export default ListServicesCompany;
