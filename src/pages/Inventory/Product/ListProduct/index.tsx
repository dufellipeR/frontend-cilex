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

const ListGroup: React.FC = () => {
  const products = [
    { code: 1, description: 'Produto 01' },
    { code: 2, description: 'Produto 02' },
    { code: 3, description: 'Produto 03' },
    { code: 4, description: 'Produto 04' },
    { code: 5, description: 'Produto 05' },
  ];

  return (
    <Container>
      <Header pageName="Produto" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/product/register">Novo</NewButton>
          {products.length > 0 ? (
            <DefaultTable tbh={['Código', 'Produto']}>
              <tbody>
                {products.map(product => (
                  <tr key={product.code}>
                    <td>{product.code}</td>
                    <td>{product.description}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/product/${product.code}`}
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

export default ListGroup;
