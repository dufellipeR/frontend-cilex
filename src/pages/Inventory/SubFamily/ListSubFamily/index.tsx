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

const ListSubFamily: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const subFamilies = [
    { code: 1, description: 'Sub-Família 01' },
    { code: 2, description: 'Sub-Família 02' },
    { code: 3, description: 'Sub-Família 03' },
    { code: 4, description: 'Sub-Família 04' },
    { code: 5, description: 'Sub-Família 05' },
  ];

  return (
    <Container>
      <Header pageName="Sub-Família" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/subfamily/register">Novo</NewButton>
          {subFamilies.length > 0 ? (
            <DefaultTable tbh={['Código', 'Sub-Família']}>
              <tbody>
                {subFamilies.map(subFamily => (
                  <tr key={subFamily.code}>
                    <td>{subFamily.code}</td>
                    <td>{subFamily.description}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/subfamily/${subFamily.code}`}
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

export default ListSubFamily;
