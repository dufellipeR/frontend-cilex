import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiShare2 } from 'react-icons/fi';
import { Checkbox } from '@material-ui/core';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { theme } from '../../App';

import Button from '../../components/Button';
import ButtonBack from '../../components/ButtonBack';
import NewButton from '../../components/NewButton';
import DefaultTable from '../../components/DefaultTable';
import ChangeCompany from '../../components/ChangeCompany';
import Modal from '../../components/Modal';
import Header from '../../components/Header';

import {
  Container,
  Main,
  ContainerContentModalShare,
  ContentModalShare,
} from './styles';

export interface Person {
  id: string;
  code: string;
  cnpj: string;
  cpf: string;
  nome: string;
  razao_social: string;
}

interface UserCompany {
  id: string;
  cod: string;
  razao_social: string;
}

const People: React.FC = () => {
  const { user } = useAuth();

  const [people, setPeople] = useState<Person[]>([]);
  const [userCompanies, setUserCompanies] = useState<UserCompany[]>([]);
  const [visibleModalShare, setVisibleModalShare] = useState(false);

  useEffect(() => {
    api.get<Person[]>('/person').then(response => {
      setPeople(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<UserCompany[]>(`/usercompany?user=${user.id}`).then(response => {
      setUserCompanies(response.data);
    });
  }, [user.id]);

  return (
    <>
      <Container>
        <Header pageName="Pessoas" />
        <Main>
          <div id="align-content">
            <ButtonBack />
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
                          <FiShare2
                            size={24}
                            color={theme.palette.primary.main}
                          />
                        </button>
                        <Link
                          style={{ textDecoration: 'none' }}
                          to={`/people/${row.id}`}
                        >
                          <FiEye size={24} color={theme.palette.primary.main} />
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
