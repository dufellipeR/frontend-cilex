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
  code: string; // código do produto
  description: string; // descrição do produto
  type: string; // tipo da transação -> cadastrado
  quantity: string; // quantidade da transação -> cadastado
  user: string; // gerado backend
  date: string; // gerado backend
}

const ListTransaction: React.FC = () => {
  const { colors } = useContext(ThemeContext);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // api.get('/transaction').then(response => {
    //   setTransactions(response.data);
    // });
    setTransactions([
      {
        id: 'bdda-u123-dsas',
        code: 'BCM-001',
        description: 'AÇO MOLA',
        type: 'Entrada',
        quantity: '10',
        user: 'Arthur Gramm',
        date: new Date().toLocaleDateString(),
      },
      {
        id: 'adss-12dw-32aq-44ds',
        code: 'BCM-001',
        description: 'AÇO MOLA',
        type: 'Saída',
        quantity: '10',
        user: 'Arthur Gramm',
        date: new Date().toLocaleDateString(),
      },
    ]);
  }, []);

  return (
    <Container>
      <Header pageName="Transações" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/inventory" />
          <NewButton to="/inventory/transaction/register">Novo</NewButton>
          {transactions.length > 0 ? (
            <DefaultTable
              tbh={[
                'Código',
                'Descrição',
                'Tipo',
                'Quantidade',
                'Usuário',
                'Data',
              ]}
            >
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>{transaction.code}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.quantity}</td>
                    <td>{transaction.user}</td>
                    <td>{transaction.date}</td>
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
