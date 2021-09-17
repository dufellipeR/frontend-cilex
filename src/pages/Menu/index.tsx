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

  const modules = [
    {
      id: 1,
      name: 'Financeiro',
      desc: 'Controle seu financeiro facilmente',
      url: '/',
      isActive: true,
      classIcon: 'bi bi-currency-dollar',
    },
    {
      id: 2,
      name: 'Logística',
      desc: 'Monitore seus produtos',
      url: '/',
      isActive: true,
      classIcon: 'bi bi-truck',
    },
    {
      id: 3,
      name: 'CRM',
      desc: 'Acompanhe seus clientes',
      url: '/',
      isActive: false,
      classIcon: 'bi bi-file-person',
    },
    {
      id: 4,
      name: 'Pessoas',
      desc: 'Gerencia as pessoas',
      url: '/people',
      isActive: true,
      classIcon: 'bi bi-person',
    },
    {
      id: 5,
      name: 'Empresas',
      desc: 'Registre suas empresas',
      url: '/company',
      isActive: true,
      classIcon: 'bi bi-building',
    },
    {
      id: 6,
      name: 'Parâmetros Gerais',
      desc: 'Defina os parâmetros do sistema',
      url: '/',
      isActive: false,
      classIcon: 'bi bi-globe',
    },
    {
      id: 7,
      name: 'Cargos e Funções',
      desc: 'Adicione novos cargos',
      url: '/role',
      isActive: true,
      classIcon: 'bi bi-wrench',
    },
    {
      id: 8,
      name: 'Usuários',
      desc: 'Gerencie usuários pendentes e ativos',
      url: '/menu/users',
      isActive: true,
      classIcon: 'bi bi-person-circle',
    },
    {
      id: 9,
      name: 'Grupo de Usuários',
      desc: 'Gerencia grupos de usuários e suas permissões',
      url: '/group',
      isActive: true,
      classIcon: 'bi bi-people',
    },
    {
      id: 10,
      name: 'Módulos',
      desc: 'Gerencie seus módulos disponíveis',
      url: '/module',
      isActive: true,
      classIcon: 'bi bi-box',
    },
  ];

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
