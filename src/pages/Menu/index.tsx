import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import ModuleCard from '../../components/ModuleCard';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import { Container, Main, Module } from './styles';

interface Module {
  title: string;
  description: string;
  moduleclassicon: string;
  url: string;
}

const Menu: React.FC = () => {
  const [hasUserPending, setHasUserPending] = useState(false);
  const [listModules, setListModules] = useState<Module[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    const storageCompany = localStorage.getItem('@Cilex:companySelected');

    const companySelected = storageCompany && JSON.parse(storageCompany);

    if (user.isAdmin === true) {
      api
        .get(`/company_modules/companyModule?company_id=${companySelected.id}`)
        .then(response => {
          setListModules(response.data);
        });
    } else {
      api
        .get(`/group_modules/groupModules?group=${user.group_id}`)
        .then(response => {
          setListModules(response.data);
        });
    }
  }, [user]);

  useEffect(() => {
    const jsonHasUser = localStorage.getItem('@Cilex:hasPendingUser');

    if (jsonHasUser) setHasUserPending(JSON.parse(jsonHasUser));
  }, []);

  return (
    <>
      <Container>
        <Header pageName="Menu" />
        <Main>
          <ModuleCard
            key="123"
            to="schedule"
            classIcon="bi bi-calendar"
            title="Agenda"
            description="Gerencie sua agenda de serviços"
          />
          <ModuleCard
            key="123"
            to="pet"
            classIcon="bi bi-calendar"
            title="Pets"
            description="Gerencie os pets"
          />
          {listModules.map(module => (
            <ModuleCard
              key={module.title}
              to={module.url}
              classIcon={module.moduleclassicon}
              title={module.title}
              description={module.description}
            />
          ))}
        </Main>
      </Container>
    </>
  );
};

export default Menu;
