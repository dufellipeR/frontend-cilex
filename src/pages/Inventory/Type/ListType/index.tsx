import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';

const ListType: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const types = [
    { code: 1, description: 'Tipo 01', accept: false },
    { code: 2, description: 'Tipo 02', accept: true },
    { code: 3, description: 'Tipo 03', accept: false },
    { code: 4, description: 'Tipo 04', accept: true },
    { code: 5, description: 'Tipo 05', accept: false },
  ];

  return (
    <Container>
      <Header pageName="Tipo" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/type/register">Novo</NewButton>
          {types.length > 0 ? (
            <DefaultTable tbh={['Código', 'Tipo', 'Aceita Estrutura?']}>
              <tbody>
                {types.map(type => (
                  <tr key={type.code}>
                    <td>{type.code}</td>
                    <td>{type.description}</td>
                    <td>{type.accept === true ? 'Sim' : 'Não'}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/type/${type.code}`}
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

export default ListType;
