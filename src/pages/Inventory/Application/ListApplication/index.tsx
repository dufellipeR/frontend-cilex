import React from 'react';

import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

import { theme } from '../../../../App';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';

import { Container, Main } from './styles';

const ListApplication: React.FC = () => {
  const applications = [
    { code: 1, description: 'Aplicação 01' },
    { code: 2, description: 'Aplicação 02' },
    { code: 3, description: 'Aplicação 03' },
    { code: 4, description: 'Aplicação 04' },
    { code: 5, description: 'Aplicação 05' },
  ];

  return (
    <Container>
      <Header pageName="Aplicação" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/application/register">Novo</NewButton>
          <DefaultTable tbh={['Código', 'Aplicação']}>
            <tbody>
              {applications.map(application => (
                <tr key={application.code}>
                  <td>{application.code}</td>
                  <td>{application.description}</td>
                  <td>
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/inventory/application/${application.code}`}
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
  );
};

export default ListApplication;
