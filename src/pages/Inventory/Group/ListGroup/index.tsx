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

const ListGroup: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const groups = [
    { code: 1, description: 'Grupo 01' },
    { code: 2, description: 'Grupo 02' },
    { code: 3, description: 'Grupo 03' },
    { code: 4, description: 'Grupo 04' },
    { code: 5, description: 'Grupo 05' },
  ];

  return (
    <Container>
      <Header pageName="Grupo" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/group/register">Novo</NewButton>
          {groups.length > 0 ? (
            <DefaultTable tbh={['Código', 'Grupo']}>
              <tbody>
                {groups.map(group => (
                  <tr key={group.code}>
                    <td>{group.code}</td>
                    <td>{group.description}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/group/${group.code}`}
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

export default ListGroup;
