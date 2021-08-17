import React from 'react';

import { FiDollarSign, FiTruck } from 'react-icons/fi';
import {
  HiOutlineOfficeBuilding,
  HiOutlineUser,
  HiOutlineUserGroup,
} from 'react-icons/hi';

import { theme } from '../../App';

import Header from '../../components/Header';

import { Container, Main, Module } from './styles';

const Menu: React.FC = () => {
  return (
    <>
      <Container>
        <Header pageName="Menu" />
        <Main>
          <Module to="/">
            <FiDollarSign size={44} color={theme.main} />
            <h3>Financeiro</h3>
            <p>Controle seu financeiro facilmente</p>
          </Module>
          <Module to="/">
            <FiTruck size={44} color={theme.main} />
            <h3>Logistica</h3>
            <p>Monitore seus produtos</p>
          </Module>
          {/* <Module to="/">
            <HiOutlineShoppingBag size={44} color={theme.main} />
            <h3>CRM</h3>
            <p>Acompanhe seus clientes</p>
          </Module> */}
          <Module to="/people">
            <HiOutlineUser size={44} color={theme.main} />
            <h3>Pessoas</h3>
            <p>Gerencie as pessoas</p>
          </Module>
          <Module to="/company">
            <HiOutlineOfficeBuilding size={44} color={theme.main} />
            <h3>Empresas</h3>
            <p>Registre suas empresas</p>
          </Module>
          {/* <Module to="/">
            <HiOutlineGlobeAlt size={44} color={theme.main} />
            <h3>Parâmetros Gerais</h3>
            <p>Defina os parâmetros do sistema</p>
          </Module> */}
          <Module to="/role">
            <HiOutlineUserGroup size={44} color={theme.main} />
            <h3>Cargos e Funções</h3>
            <p>Adicione novos cargos</p>
          </Module>
          {/* <Module to="/group">
            <HiOutlineUserGroup size={44} color={theme.main} />
            <h3>Grupo de Pessoas</h3>
            <p>Agrupe as pessoas</p>
          </Module> */}
          <Module to="/menu/users">
            <HiOutlineUserGroup size={44} color={theme.main} />
            <h3>Usuários</h3>
            <p>Gerencia usuários pendentes e ativos</p>
          </Module>
        </Main>
      </Container>
    </>
  );
};

export default Menu;
