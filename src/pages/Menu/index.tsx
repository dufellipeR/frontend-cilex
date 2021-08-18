import React, { useEffect, useState } from 'react';

import { FiDollarSign, FiTruck } from 'react-icons/fi';
import {
  HiOutlineCollection,
  HiOutlineGlobeAlt,
  HiOutlineOfficeBuilding,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineUserCircle,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { MdNotificationsActive } from 'react-icons/md';

import { theme } from '../../App';

import Header from '../../components/Header';

import { Container, Main, Module } from './styles';

const Menu: React.FC = () => {
  const [hasUserPending, setHasUserPending] = useState(false);

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
      classIcon: 'bi bi-truck',
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
      url: '/',
      isActive: true,
      classIcon: 'bi bi-people',
    },
    {
      id: 10,
      name: 'Módulos',
      desc: 'Gerencie seus módulos disponíveis',
      url: '/',
      isActive: true,
      classIcon: 'bi bi-box',
    },
  ];

  useEffect(() => {
    const jsonHasUser = localStorage.getItem('@Cilex:hasPendingUser');

    if (jsonHasUser) setHasUserPending(JSON.parse(jsonHasUser));
  }, []);

  return (
    <>
      <Container>
        <Header pageName="Menu" />
        <Main>
          {modules.map(module => (
            <Module key={module.id} to={module.url}>
              <i className={module.classIcon} />
              <h3>{module.name}</h3>
              <p>{module.desc}</p>
            </Module>
          ))}
        </Main>
      </Container>
    </>
  );
};

export default Menu;
