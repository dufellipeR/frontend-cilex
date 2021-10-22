import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';

import chooseSvg from '../../assets/town.svg';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';
import { useHasUserCompany } from '../../hooks/useHasUserCompany';
import { useToggleTheme } from '../../hooks/useToggleTheme';

import HeaderHome from '../../components/HeaderHome';

import { Container, Options, Main, Companies, Company } from './styles';

interface IUserCompany {
  id: string;
  code: string;
  razao_social: string;
}

const ChoseCompany: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { setHasUserCompany } = useHasUserCompany();
  const { toggleTheme } = useToggleTheme();

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

  return (
    <>
      <Container>
        <HeaderHome message="Escolha a empresa" />
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
