import React from 'react';

import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';

import { theme } from '../../../../App';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';

import { Container, Main } from './styles';

const ListUMPurchase: React.FC = () => {
  const UMPurchases = [
    { description: 1, transformationUM: 'Unidade de Medida de Compra 01' },
    { description: 2, transformationUM: 'Unidade de Medida de Compra 02' },
    { description: 3, transformationUM: 'Unidade de Medida de Compra 03' },
    { description: 4, transformationUM: 'Unidade de Medida de Compra 04' },
    { description: 5, transformationUM: 'Unidade de Medida de Compra 05' },
  ];

  return (
    <Container>
      <Header pageName="Unidade de Medida de Compra" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/umPurchase/register">Novo</NewButton>
          <DefaultTable tbh={['Descrição', 'Unidade de Medida de Compra']}>
            <tbody>
              {UMPurchases.map(unit => (
                <tr key={unit.description}>
                  <td>{unit.description}</td>
                  <td>{unit.transformationUM}</td>
                  <td>
                    <Link
                      style={{ textDecoration: 'none' }}
                      to={`/inventory/umPurchase/${unit.description}`}
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

export default ListUMPurchase;