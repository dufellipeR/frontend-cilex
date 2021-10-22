import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import chooseSvg from '../../assets/road-sign.svg';

import Button from '../../components/Button';
import HeaderHome from '../../components/HeaderHome';

import { Container, Options } from './styles';

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <Container>
      <HeaderHome message="O que vamos fazer hoje?" />
      <Options>
        <Button
          onClick={() => history.push('/menu')}
          layoutColor="button-filled"
        >
          <FiArrowLeft size={24} />
          <span>Sistema</span>
        </Button>
        <div id="container-img">
          <img src={chooseSvg} alt="" />
        </div>
        <Button
          onClick={() => history.push('/dashboard')}
          layoutColor="button-filled"
        >
          <span>Dashboard</span>
          <FiArrowRight size={24} />
        </Button>
      </Options>
    </Container>
  );
};

export default Home;
