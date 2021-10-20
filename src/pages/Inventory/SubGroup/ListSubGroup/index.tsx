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

const ListSubGroup: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const subGroups = [
    { code: 1, description: 'Sub-Grupo 01' },
    { code: 2, description: 'Sub-Grupo 02' },
    { code: 3, description: 'Sub-Grupo 03' },
    { code: 4, description: 'Sub-Grupo 04' },
    { code: 5, description: 'Sub-Grupo 05' },
  ];

  return (
    <Container>
      <Header pageName="Sub-Grupo" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/subgroup/register">Novo</NewButton>
          {subGroups.length > 0 ? (
            <DefaultTable tbh={['Código', 'Sub-Grupo']}>
              <tbody>
                {subGroups.map(subgroup => (
                  <tr key={subgroup.code}>
                    <td>{subgroup.code}</td>
                    <td>{subgroup.description}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/subgroup/${subgroup.code}`}
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

export default ListSubGroup;
