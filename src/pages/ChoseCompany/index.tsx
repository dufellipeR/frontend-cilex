/* eslint-disable import/no-duplicates */
import React, { useCallback, useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { format } from 'date-fns';

import ptBR from 'date-fns/locale/pt-BR';

import { FiPower } from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import chooseSvg from '../../assets/town.svg';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import {
  Container,
  Header,
  Options,
  Greetings,
  Companies,
  Company,
  Main,
} from './styles';
import OutlinedButton from '../../components/OutlinedButton';
import api from '../../services/api';
import { Icompany } from '../Company';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar_url: string;
}

interface IUserCompany {
  id: string;
  cod: string;
  razao_social: string;
}

const ChoseCompany: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const [date, setDate] = useState<string[]>([]);
  const [companies, setCompanies] = useState<Icompany[]>([]);
  const [userCompanies, setUserCompanies] = useState<IUserCompany[]>([]);

  const handleChoice = useCallback(() => {
    history.push('home');
  }, [history]);

  useEffect(() => {
    const data = new Date();
    const dateFormatted = format(data, 'EEEE/dd/MMMM/yyyy', { locale: ptBR });
    const dateSplitted = dateFormatted.split('/');

    setDate([
      dateSplitted[0].charAt(0).toUpperCase() + dateSplitted[0].slice(1),
      dateSplitted[1],
      dateSplitted[2],
      dateSplitted[3],
    ]);
  }, []);

  useEffect(() => {
    api.get<Icompany[]>('/company').then((response) => {
      setCompanies(response.data);
      if (response.data.length === 0) {
        history.push('/company/register');
      }
    });
  }, [history]);

  useEffect(() => {
    api.get<IUserCompany[]>(`/usercompany?user=${user.id}`).then((response) => {
      console.log(response.data);

      setUserCompanies(response.data);
    });
  }, [user.id]);

  const handleLogout = useCallback((): void => {
    history.push('/');
  }, [history]);

  const handleDashboard = useCallback((): void => {
    history.push('/dashboard');
  }, [history]);

  const handleMenu = useCallback((): void => {
    history.push('/menu');
  }, [history]);

  return (
    <>
      <Container>
        <Header>
          <h1>Cilex</h1>
          <Greetings>
            <h2>Bom Dia {user.name.split(' ')[0]} !</h2>
            {date && (
              <h3>{`${date[0]}, ${date[1]} de ${date[2]} de ${date[3]}`}</h3>
            )}

            <p>Escolha a empresa </p>
          </Greetings>
          <OutlinedButton onClick={() => handleLogout()}>
            <FiPower size={24} />
          </OutlinedButton>
        </Header>
        <Main>
          <Options>
            <img src={chooseSvg} alt="" />
          </Options>
          <Companies>
            {userCompanies &&
              userCompanies.map((comp) => (
                <Company key={comp.id} type="button" onClick={handleChoice}>
                  <HiOutlineOfficeBuilding size={24} />
                  <span>
                    {comp.cod} - {comp.razao_social}
                  </span>
                </Company>
              ))}
          </Companies>
        </Main>
      </Container>
    </>
  );
};

export default ChoseCompany;
