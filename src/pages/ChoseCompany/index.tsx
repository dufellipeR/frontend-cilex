/* eslint-disable import/no-duplicates */
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiPower } from 'react-icons/fi';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';

import chooseSvg from '../../assets/town.svg';
import { useAuth } from '../../hooks/auth';
import { useHasUserCompany } from '../../hooks/useHasUserCompany';
import { useToggleTheme } from '../../hooks/useToggleTheme';

import Button from '../../components/Button';

import {
  Container,
  Header,
  Options,
  Greetings,
  Main,
  Companies,
  Company,
} from './styles';
import api from '../../services/api';

interface IUserCompany {
  id: string;
  code: string;
  razao_social: string;
}

const ChoseCompany: React.FC = () => {
  const history = useHistory();
  const { user, signOut } = useAuth();
  const { setHasUserCompany } = useHasUserCompany();
  const { toggleTheme } = useToggleTheme();

  const [date, setDate] = useState<string[]>([]);
  const [userCompanies, setUserCompanies] = useState<IUserCompany[]>([]);

  const handleChoice = useCallback(
    (company: IUserCompany) => {
      localStorage.setItem('@Cilex:companySelected', JSON.stringify(company));
      toggleTheme('customized');
      history.push('home');
    },
    [history, toggleTheme],
  );

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
    api.get<IUserCompany[]>(`/usercompany?user=${user.id}`).then(response => {
      if (response.data.length === 0) {
        setHasUserCompany(false);
        history.push('/company/register');
      } else {
        setHasUserCompany(true);
        setUserCompanies(response.data);
      }
    });
  }, [history, user.id, setHasUserCompany]);

  const handleLogout = useCallback((): void => {
    signOut();
    history.push('/');
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
          <Button onClick={() => handleLogout()} layoutColor="button-outline">
            <FiPower size={24} />
          </Button>
        </Header>
        <Main>
          <Options>
            <img src={chooseSvg} alt="" />
          </Options>
          <Companies>
            {userCompanies &&
              userCompanies.map(comp => (
                <Company
                  key={comp.id}
                  type="button"
                  onClick={() => handleChoice(comp)}
                >
                  <HiOutlineOfficeBuilding size={24} />
                  <span>
                    {comp.code} - {comp.razao_social}
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
