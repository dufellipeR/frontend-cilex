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

const ListUMUse: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const UMUses = [
    { description: 1, UMUse: 'Unidade de Medida de Uso 01' },
    { description: 2, UMUse: 'Unidade de Medida de Uso 02' },
    { description: 3, UMUse: 'Unidade de Medida de Uso 03' },
    { description: 4, UMUse: 'Unidade de Medida de Uso 04' },
    { description: 5, UMUse: 'Unidade de Medida de Uso 05' },
  ];

  return (
    <Container>
      <Header pageName="Unidade de Medida de Uso" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/umUse/register">Novo</NewButton>
          {UMUses.length > 0 ? (
            <DefaultTable tbh={['Descrição', 'Unidade de Medida de Uso']}>
              <tbody>
                {UMUses.map(UMUse => (
                  <tr key={UMUse.description}>
                    <td>{UMUse.description}</td>
                    <td>{UMUse.UMUse}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/UMUse/${UMUse.description}`}
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

export default ListUMUse;
