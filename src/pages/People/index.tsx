import React, { useCallback, useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiEye, FiHome, FiPower, FiShare2 } from 'react-icons/fi';
import { Checkbox } from '@material-ui/core';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';
import CustomizedTables from '../../components/Table';
import NewButton from '../../components/NewButton';
import DefaultTable from '../../components/DefaultTable';
import api from '../../services/api';
import ChangeCompany from '../../components/ChangeCompany';
import Modal from '../../components/Modal';

import {
  Container,
  Header,
  Greetings,
  Main,
  ContainerContentModalShare,
  ContentModalShare,
} from './styles';

export interface IPerson {
  id: string;
  code: string;
  cnpj: string;
  cpf: string;
  nome: string;
  razao_social: string;
}

interface IUserCompany {
  id: string;
  cod: string;
  razao_social: string;
}

const People: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const [people, setPeople] = useState<IPerson[]>([]);
  const [userCompanies, setUserCompanies] = useState<IUserCompany[]>([]);
  const [visibleModalShare, setVisibleModalShare] = useState(false);

  useEffect(() => {
    api.get('/peoples').then(response => {
      setPeople(response.data.people);
    });

    // api.get<IPerson[]>('/person').then(response => {
    //   setPeople(response.data);
    // });
  }, []);

  const handleLogout = useCallback((): void => {
    history.push('/');
  }, [history]);

  const handleHome = useCallback((): void => {
    history.push('/home');
  }, [history]);

  useEffect(() => {
    api.get('/usercompany').then(response => {
      setUserCompanies(response.data.companies);
      console.log(response.data.companies);
    });
  }, []);

  return (
    <>
      <Container>
        <Header>
          <h1>Cilex</h1>
          <Greetings>
            <p>People</p>
          </Greetings>
          <div id="container-buttons">
            <Button onClick={() => handleHome()} layoutColor="button-filled">
              <FiHome size={24} />
            </Button>
            <Button onClick={() => handleLogout()} layoutColor="button-outline">
              <FiPower size={24} />
            </Button>
          </div>
        </Header>
        <Main>
          <div id="align-content">
            <NewButton to="/people/register">Novo</NewButton>
            <DefaultTable tbh={['Código', 'CNPJ/CPF', 'Razão Social/Nome']}>
              <tbody>
                {people &&
                  people.map(row => (
                    <tr key={row.code}>
                      <td>{row.code}</td>
                      <td>{row.cnpj || row.cpf}</td>
                      <td>{row.razao_social || row.nome}</td>

                      <td id="td-options">
                        <button
                          type="button"
                          id="share"
                          onClick={() => setVisibleModalShare(true)}
                        >
                          <FiShare2 size={24} color="#ff7a00" />
                        </button>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/people/${row.id}`}
                        >
                          <FiEye size={24} color="#ff7a00" />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </DefaultTable>
            <Modal
              visible={visibleModalShare}
              setVisible={setVisibleModalShare}
            >
              <ContentModalShare>
                <h2>Compartilhamento de Cadastro</h2>

                <ContainerContentModalShare>
                  {userCompanies.map(company => (
                    <div id="row-share" key={company.id}>
                      <Checkbox color="primary" />
                      <h4>{company.razao_social}</h4>
                    </div>
                  ))}
                </ContainerContentModalShare>

                <Button
                  layoutColor="button-green"
                  onClick={() => setVisibleModalShare(false)}
                >
                  Atualizar
                </Button>
              </ContentModalShare>
            </Modal>
          </div>
        </Main>
      </Container>
      <ChangeCompany />
    </>
  );
};

export default People;
