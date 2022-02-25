import React from 'react';

import Header from '../../../../components/Header';
import DefaultTable from '../../../../components/DefaultTable';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';

const ConsultStorage: React.FC = () => {
  const products = [
    { id: 1, product: 'Shampoo 1', qtd: 1 },
    { id: 2, product: 'Shampoo 2', qtd: 2 },
    { id: 3, product: 'Shampoo 3', qtd: 3 },
    { id: 4, product: 'Shampoo 4', qtd: 4 },
    { id: 5, product: 'Shampoo 5', qtd: 5 },
    { id: 6, product: 'Shampoo 6', qtd: 6 },
    { id: 7, product: 'Shampoo 7', qtd: 7 },
  ];

  return (
    <Container>
      <Header pageName="Consultar Estoque" />
      <Main>
        {products.length > 0 ? (
          <DefaultTable tbh={['Produto', 'Quantidade']}>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.product}</td>
                  <td>{product.qtd}</td>
                </tr>
              ))}
            </tbody>
          </DefaultTable>
        ) : (
          <EmptyData />
        )}
      </Main>
    </Container>
  );
};

export default ConsultStorage;
