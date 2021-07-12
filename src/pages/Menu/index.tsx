import React, { useCallback } from 'react';

import { Link, useHistory } from 'react-router-dom';

import {
  FiDollarSign,
  FiHome,
  FiPackage,
  FiPower,
  FiTruck,
} from 'react-icons/fi';
import {
  HiOutlineGlobeAlt,
  HiOutlineOfficeBuilding,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import { Container, Header, Main, Greetings, Module } from './styles';
import OutlinedButton from '../../components/OutlinedButton';

const Menu: React.FC = () => {
  const history = useHistory();

  const handleLogout = useCallback((): void => {
    history.push('/');
  }, [history]);

  const handleHome = useCallback((): void => {
    history.push('/home');
  }, [history]);

  return (
    <>
      <Container>
        <Header>
          <h1>Cilex</h1>
          <Greetings>
            <h2>Menu</h2>
          </Greetings>
          <div id="container-buttons">
            <Button onClick={() => handleHome()}>
              <FiHome size={24} />{' '}
            </Button>
            <OutlinedButton onClick={() => handleLogout()}>
              <FiPower size={24} />
            </OutlinedButton>
          </div>
        </Header>
        <Main>
          <Module to="/">
            <FiDollarSign size={44} color="#ff7a00" />
            <h3>Financeiro</h3>
            <p>Controle seu financeiro facilmente</p>
          </Module>
          <Module to="/">
            <FiTruck size={44} color="#ff7a00" />
            <h3>Logistica</h3>
            <p>Monitore seus produtos</p>
          </Module>
          <Module to="/">
            <HiOutlineShoppingBag size={44} color="#ff7a00" />
            <h3>CRM</h3>
            <p>Acompanhe seus clientes</p>
          </Module>
          <Module to="/people">
            <HiOutlineUser size={44} color="#ff7a00" />
            <h3>Pessoas</h3>
            <p>Gerencie as pessoas</p>
          </Module>
          <Module to="/company">
            <HiOutlineOfficeBuilding size={44} color="#ff7a00" />
            <h3>Empresas</h3>
            <p>Registre suas empresas</p>
          </Module>
          <Module to="/">
            <HiOutlineGlobeAlt size={44} color="#ff7a00" />
            <h3>Parâmetros Gerais</h3>
            <p>Defina os parâmetros do sistema</p>
          </Module>

          <Module to="/role">
            <HiOutlineUserGroup size={44} color="#ff7a00" />
            <h3>Cargos e Funções</h3>
            <p>Adicione novos cargos</p>
          </Module>
          <Module to="/group">
            <HiOutlineUserGroup size={44} color="#ff7a00" />
            <h3>Grupo de Pessoas</h3>
            <p>Agrupe as pessoas</p>
          </Module>
          <Module to="/">
            <HiOutlineUserGroup size={44} color="#ff7a00" />
            <h3>Pessoas</h3>
            <p>gerencie as pessoas</p>
          </Module>
          <Module to="/">
            <HiOutlineUserGroup size={44} color="#ff7a00" />
            <h3>Pessoas</h3>
            <p>gerencie as pessoas</p>
          </Module>
          <Module to="/">
            <HiOutlineUserGroup size={44} color="#ff7a00" />
            <h3>Pessoas</h3>
            <p>gerencie as pessoas</p>
          </Module>
          <Module to="/">
            <HiOutlineUserGroup size={44} color="#ff7a00" />
            <h3>Pessoas</h3>
            <p>gerencie as pessoas</p>
          </Module>
          <Module to="/">
            <HiOutlineUserGroup size={44} color="#ff7a00" />
            <h3>Pessoas</h3>
            <p>gerencie as pessoas</p>
          </Module>
          <Module to="/">
            <HiOutlineUserGroup size={44} color="#ff7a00" />
            <h3>Pessoas</h3>
            <p>gerencie as pessoas</p>
          </Module>
          <Module to="/">
            <HiOutlineUserGroup size={44} color="#ff7a00" />
            <h3>Pessoas</h3>
            <p>gerencie as pessoas</p>
          </Module>
          <Module to="/">
            <HiOutlineUserGroup size={44} color="#ff7a00" />
            <h3>Pessoas</h3>
            <p>gerencie as pessoas</p>
          </Module>
          <Module to="/">
            <HiOutlineUserGroup size={44} color="#ff7a00" />
            <h3>Pessoas</h3>
            <p>gerencie as pessoas</p>
          </Module>
        </Main>
      </Container>
    </>
  );
};

export default Menu;
