import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ThemeContext } from 'styled-components';

import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';

import NewButton from '../../../../components/NewButton';
import DefaultTable from '../../../../components/DefaultTable';
import ChangeCompany from '../../../../components/ChangeCompany';
import Header from '../../../../components/Header';
import ButtonBack from '../../../../components/ButtonBack';
import EmptyData from '../../../../components/EmptyData';

import { Container, Main } from './styles';

export interface IPets {
  id: string;
  code: string;
  name: string;
}

const ListPet: React.FC = () => {
  const { user } = useAuth();
  const { colors } = useContext(ThemeContext);

  // const [pets, setPets] = useState<IPets[]>([]);

  // useEffect(() => {
  //   api.get<IPets[]>('/pets').then(response => {
  //     setPets(response.data);
  //   });
  // }, []);

  const pets: IPets[] = [
    { id: '1', code: '1001', name: 'Zeca' },
    { id: '2', code: '1002', name: 'Zeca' },
    { id: '3', code: '1003', name: 'Zeca' },
    { id: '4', code: '1004', name: 'Zeca' },
    { id: '5', code: '1005', name: 'Zeca' },
    { id: '6', code: '1006', name: 'Zeca' },
  ];

  return (
    <Container>
      <Header pageName="Pets" />
      <Main>
        <div id="align-content">
          <ButtonBack destinationBack="/pet" />
          <NewButton to="/pet/register">Novo</NewButton>
          {pets.length > 0 ? (
            <DefaultTable tbh={['Código', 'Nome']}>
              <tbody>
                {pets.map(pet => (
                  <tr key={pet.id}>
                    <td>{pet.code}</td>
                    <td>{pet.name}</td>
                    <td>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`/pet/pets/${pet.id}`}
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

export default ListPet;
