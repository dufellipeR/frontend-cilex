import React from 'react';

import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

import { theme } from '../../../../App';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';

const ListFamily: React.FC = () => {
  const families = [
    { code: 1, description: 'Família 01' },
    { code: 2, description: 'Família 02' },
    { code: 3, description: 'Família 03' },
    { code: 4, description: 'Família 04' },
    { code: 5, description: 'Família 05' },
  ];

  return (
    <Container>
      <Header pageName="Família" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/family/register">Novo</NewButton>
          {families.length > 0 ? (
            <DefaultTable tbh={['Código', 'Família']}>
              <tbody>
                {families.map(family => (
                  <tr key={family.code}>
                    <td>{family.code}</td>
                    <td>{family.description}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/family/${family.code}`}
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
  );
};

export default ListFamily;
