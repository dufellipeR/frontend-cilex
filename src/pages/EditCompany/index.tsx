import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { FiHome, FiPower, FiSave } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  HiOutlineArrowLeft,
  HiOutlineOfficeBuilding,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import {
  Container,
  Header,
  FormCustom,
  Greetings,
  Main,
  Badge,
  Info,
  InfoHeader,
  InfoBody,
  InfoCard,
  Options,
  EditBtn,
  DeleteBtn,
  GroupInput,
} from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import FormInput from '../../components/FormInput';
import CustomSelect from '../../components/Select';
import api from '../../services/api';
import { Icompany } from '../Company';
import Select from '../../components/React-select';

interface IOpt {
  value: string;
  label: string;
}

interface IRegisterForm {
  cod: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  email: string;
  tel: string;
  endereco: string;
  cep: string;
  uf: string;
  info: string;
  matriz_id?: string;
}

const EditCompany: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { user } = useAuth();

  const { id } = useParams();

  const [editting, setEditting] = useState<boolean>(false);

  const [company, setCompany] = useState<IRegisterForm | null>(null);

  const [companies, setCompanies] = useState<IOpt[]>([]);

  useEffect(() => {
    api.get<IRegisterForm | null>(`/company/${id}`).then(response => {
      setCompany(response.data);
    });
  }, [id]);

  const handleLogout = useCallback((): void => {
    history.push('/');
  }, [history]);

  const handleHome = useCallback((): void => {
    history.push('/home');
  }, [history]);

  const handleBack = useCallback((): void => {
    history.goBack();
  }, [history]);

  const handleSubmit = useCallback(
    async (data: IRegisterForm) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          cod: Yup.string().required('Código Obrigatório'),
          cnpj: Yup.string().required('CNPJ obrigatório'),
          razao_social: Yup.string().required('Razão Social obrigatória'),
          nome_fantasia: Yup.string().required('Nome Fantasia obrigatório'),
          email: Yup.string().required('E-mail obrigatório'),
          tel: Yup.string(),
          endereco: Yup.string(),
          cep: Yup.string(),
          uf: Yup.string(),
          info: Yup.string(),
          matriz_id: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        api.put(`/company/${id}`, data).then(() => {
          toast.success('Atualizado com sucesso');
          history.push('/company');
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        toast.error(
          'Erro no registro da empresa! Ocorreu um erro ao fazer login, cheque as credenciais',
        );
      }
    },
    [history, id],
  );

  useEffect(() => {
    api.get<Icompany[]>('/company').then(response => {
      const formatData: any[] = response.data.map(item => {
        return {
          value: item.id,
          label: `${item.cod} - ${item.razao_social}`,
        };
      });
      setCompanies(formatData);
    });
  }, []);

  return (
    <>
      <Container>
        <Header>
          <div>
            <h1>Cilex</h1>
            <button
              type="button"
              style={{
                backgroundColor: 'transparent',
                border: 0,
                maxWidth: 150,
              }}
              onClick={() => handleBack()}
            >
              <HiOutlineArrowLeft size={42} color="#ff7a00" />
            </button>
          </div>

          <Greetings>
            <p>Edit Company</p>
          </Greetings>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button onClick={() => handleHome()} layoutColor="button-filled">
              <FiHome size={24} />{' '}
            </Button>
            <Button onClick={() => handleLogout()} layoutColor="button-outline">
              <FiPower size={24} />
            </Button>
          </div>
        </Header>
        {company && (
          <Info>
            <InfoHeader>
              {company.matriz_id !== null ? (
                <Badge>Filial</Badge>
              ) : (
                <Badge>Matriz</Badge>
              )}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 0.2fr 0.1fr',
                  margin: `${1}%`,
                }}
              >
                <h2>
                  <HiOutlineOfficeBuilding size={32} color="#ff7a00" />{' '}
                  {company.razao_social}
                </h2>
                <Options>
                  <EditBtn type="button" onClick={() => setEditting(!editting)}>
                    <HiOutlinePencilAlt size={24} color="#fefefe" />
                  </EditBtn>
                  <DeleteBtn type="button">
                    <HiOutlineTrash size={24} color="#ff7a00" />
                  </DeleteBtn>
                </Options>
              </div>
              <h3>{company.nome_fantasia}</h3>
            </InfoHeader>
            <InfoBody>
              <InfoCard>
                <h4>Endereço</h4>
                <span> {company.endereco}</span>
                <span> {company.cep}</span>
                <span> {company.uf}</span>
              </InfoCard>
              <InfoCard>
                <h4>Dados</h4>
                <span>{company.cod}</span>
                <span>{company.cnpj}</span>
              </InfoCard>
              <InfoCard>
                <h4>Contato</h4>
                <span>{company.email}</span>
                <span>{company.tel}</span>
              </InfoCard>
            </InfoBody>
          </Info>
        )}

        {editting && company && (
          <Main>
            <FormCustom
              initialData={company}
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <GroupInput>
                <div>
                  <Select
                    name="matriz_id"
                    options={companies}
                    placeholder="Matriz"
                  />
                </div>

                <div>
                  <FormInput
                    name="cod"
                    min={1000}
                    max={9999}
                    type="number"
                    placeholder="Código"
                  />
                  <FormInput name="cnpj" type="number" placeholder="CNPJ" />
                  <FormInput
                    name="razao_social"
                    type="text"
                    placeholder="Razão Social"
                  />
                  <FormInput
                    name="nome_fantasia"
                    type="text"
                    placeholder="Nome Fantasia"
                  />
                  <FormInput name="email" type="email" placeholder="E-mail" />
                </div>
                <div>
                  <FormInput name="tel" type="text" placeholder="Telefone" />
                  <FormInput
                    name="endereco"
                    type="text"
                    placeholder="Endereço"
                  />
                  <FormInput name="cep" type="text" placeholder="CEP" />
                  <FormInput name="uf" type="text" placeholder="Estado" />
                  <FormInput
                    name="info"
                    type="text"
                    placeholder="Informações"
                  />
                </div>
              </GroupInput>

              <Button
                layoutColor="button-green"
                style={{
                  maxWidth: 400,
                }}
                type="submit"
              >
                <span
                  style={{
                    marginLeft: `${30}%`,
                    alignSelf: 'center',
                    justifyContent: 'space-evenly',
                    maxWidth: `${35}%`,
                    lineHeight: 1.5,
                  }}
                >
                  <FiSave size={24} /> Salvar
                </span>
              </Button>
            </FormCustom>
          </Main>
        )}
      </Container>
    </>
  );
};

export default EditCompany;
