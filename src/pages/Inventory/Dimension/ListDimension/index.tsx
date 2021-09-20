import React from 'react';

import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

import { theme } from '../../../../App';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';

import { Container, Main } from './styles';

const ListDimension: React.FC = () => {
  const dimensions = [
    { code: 1, description: 'Dimensão 01' },
    { code: 2, description: 'Dimensão 02' },
    { code: 3, description: 'Dimensão 03' },
    { code: 4, description: 'Dimensão 04' },
    { code: 5, description: 'Dimensão 05' },
  ];

  return (
    <Container>
      <Header pageName="Dimensão" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/dimension/register">Novo</NewButton>
          <DefaultTable tbh={['Código', 'Dimensão']}>
            <tbody>
              {dimensions.map(dimension => (
                <tr key={dimension.code}>
                  <td>{dimension.code}</td>
                  <td>{dimension.description}</td>
                  <td>
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/inventory/dimension/${dimension.code}`}
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

export default ListDimension;
