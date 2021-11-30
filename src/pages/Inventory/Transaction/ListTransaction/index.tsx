import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import api from '../../../../services/api';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';

interface Transaction {
  id: string; // gerado backend
  type: string;
  quantity: string;
  product_id: string;
  origin_id?: string;
  destination_id?: string;
  user_id: string;
  created_at: string;
}

const ListTransaction: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get<Transaction[]>('/transaction').then(response => {
      setTransactions(response.data);
    });
    // setTransactions([
    //   {
    //     id: 'bdda-u123-dsas',
    //     code: 'BCM-001',
    //     description: 'AÇO MOLA',
    //     type: 'Entrada',
    //     quantity: '10',
    //     user: 'Arthur Gramm',
    //     date: new Date().toLocaleDateString(),
    //   },
    //   {
    //     id: 'adss-12dw-32aq-44ds',
    //     code: 'BCM-001',
    //     description: 'AÇO MOLA',
    //     type: 'Saída',
    //     quantity: '10',
    //     user: 'Arthur Gramm',
    //     date: new Date().toLocaleDateString(),
    //   },
    // ]);
  }, []);

  return (
    <Container>
      <Header pageName="Transações" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/transaction/register">Novo</NewButton>
          {transactions.length > 0 ? (
            <DefaultTable tbh={['Tipo', 'Quantidade', 'Usuário', 'Data']}>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>
                      {transaction.type === 'transfer'
                        ? 'Transferência'
                        : 'Movimentação'}
                    </td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.user_id}</td>
                    <td>{transaction.created_at}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/inventory/transaction/${transaction.id}`}
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

export default ListTransaction;
