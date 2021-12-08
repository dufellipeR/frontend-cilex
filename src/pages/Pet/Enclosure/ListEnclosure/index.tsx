import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';

export interface IEnclosure {
  id: string;
  code: string;
  description: string;
}

const ListEnclosure: React.FC = () => {
  const { user } = useAuth();
  const { colors } = useContext(ThemeContext);

  const [enclosures, setEnclosures] = useState<IEnclosure[]>([]);

  useEffect(() => {
    api.get<IEnclosure[]>('/enclosure').then(response => {
      setEnclosures(response.data);
    });
  }, []);

  return (
    <Container>
      <Header pageName="Recintos" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/pet" />
          <NewButton to="/pet/enclosure/register">Novo</NewButton>
          {enclosures.length > 0 ? (
            <DefaultTable tbh={['Código', 'Recinto']}>
              <tbody>
                {enclosures.map(enclosure => (
                  <tr key={enclosure.id}>
                    <td>{enclosure.code}</td>
                    <td>{enclosure.description}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/pet/enclosure/${enclosure.id}`}
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

export default ListEnclosure;
