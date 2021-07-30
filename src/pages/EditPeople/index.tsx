import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import {
  HiOutlineArrowLeft,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiOutlineUser,
} from 'react-icons/hi';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Header from '../../components/Header';
import Button from '../../components/Button';

import { Icompany } from '../Company';

import {
  Container,
  Main,
  Badge,
  InfoCard,
  HeaderContent,
  ContainerCompanyData,
  Select,
  FormCustom,
} from './styles';
import Input from '../../components/Input';

interface IOpt {
  value: string;
  label: string;
}

interface IRegisterForm {
  code: number | string;
  email: string;
  tel: string;
  endereco: string;
  cep: string;
  uf: string;
  info: string;
  tipo: string;

  cnpj?: string;
  razao_social?: string;
  nome_fantasia?: string;

  cpf?: string;
  nome?: string;
}

const EditPeople: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { id }: any = useParams();

  const [companies, setCompanies] = useState<IOpt[]>([]);
  const [editting, setEditting] = useState<boolean>(false);
  const [person, setPerson] = useState<IRegisterForm | null>(null);

  useEffect(() => {
    api.get<IRegisterForm | null>(`/person/${id}`).then(response => {
      setPerson(response.data);
      console.log(response.data);
    });
  }, [id]);

  const handleBack = useCallback((): void => {
    history.goBack();
  }, [history]);

  const handleSubmitForm = useCallback(
    async (data: IRegisterForm) => {
      try {
        api.put(`/company/${id}`, data).then(() => {
          toast.success('Atualizado com sucesso');
          history.push('/company');
        });
      } catch (err) {
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

  const formSchemaPersonEdit = Yup.object().shape({
    code: Yup.number().required('Código obrigatório'),
    email: Yup.string().required('E-mail obrigatório'),
    tel: Yup.string(),
    endereco: Yup.string(),
    cep: Yup.string(),
    uf: Yup.string(),
    info: Yup.string(),
    tipo: Yup.string(),

    // Jurídica
    cnpj: person?.cpf
      ? Yup.string()
      : Yup.string().required('CNPJ obrigatório'),
    razao_social: person?.cpf
      ? Yup.string()
      : Yup.string().required('Razão Social obrigatório'),
    nome_fantasia: person?.cpf
      ? Yup.string()
      : Yup.string().required('Nome Fantasia obrigatório'),

    // Fisica
    cpf: person?.cpf ? Yup.string().required('CPF obrigatório') : Yup.string(),
    nome: person?.cpf
      ? Yup.string().required('Nome obrigatório')
      : Yup.string(),
  });

  const optionsSelect = [
    { value: '', label: 'Tipo' },
    { value: 'fornecedor', label: 'Fornecedor' },
    { value: 'cliente', label: 'Cliente' },
    { value: 'colaborador', label: 'Colaborador' },
  ];

  return (
    <>
      <Container>
        <Header pageName="Editar Pessoa" />
        {person && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <button type="button" onClick={() => handleBack()}>
                  <HiOutlineArrowLeft size={42} color="#ff7a00" />
                </button>
              </div>
              <div id="company-titles">
                <HiOutlineUser size={32} color="#ff7a00" />
                <div>
                  <h2>{person.nome ? person.nome : person.nome_fantasia}</h2>
                  {person.razao_social && <p>{person.razao_social}</p>}
                </div>
                {person.cpf ? <Badge>Física</Badge> : <Badge>Jurídica</Badge>}
              </div>
              <div id="container-buttons-actions">
                <Button
                  layoutColor="button-filled"
                  onClick={() => setEditting(!editting)}
                >
                  <HiOutlinePencilAlt size={24} color="#fefefe" />
                </Button>
                <Button layoutColor="button-outline">
                  <HiOutlineTrash size={24} color="#ff7a00" />
                </Button>
              </div>
            </HeaderContent>
            <ContainerCompanyData>
              <InfoCard>
                <h4>Endereço</h4>
                <span> {person.endereco}</span>
                <span> {person.cep}</span>
                <span> {person.uf}</span>
              </InfoCard>
              <InfoCard>
                <h4>Dados</h4>
                <span>{person.code}</span>
                <span>{person.cpf ? person.cpf : person.cnpj}</span>
              </InfoCard>
              <InfoCard>
                <h4>Contato</h4>
                <span>{person.email}</span>
                <span>{person.tel}</span>
              </InfoCard>
            </ContainerCompanyData>

            {editting && (
              <Formik
                initialValues={{
                  code: person.code,
                  cnpj: person.cnpj ? person.cnpj : '',
                  razao_social: person.razao_social ? person.razao_social : '',
                  nome_fantasia: person.nome_fantasia
                    ? person.nome_fantasia
                    : '',
                  email: person.email,
                  tel: person.tel,
                  endereco: person.endereco,
                  cep: person.cep,
                  uf: person.uf,
                  info: person.info,
                  cpf: person.cpf ? person.cpf : '',
                  nome: person.nome ? person.nome : '',
                  tipo: person.tipo,
                }}
                validationSchema={formSchemaPersonEdit}
                onSubmit={handleSubmitForm}
              >
                {({ handleChange, touched, values, errors, handleSubmit }) => (
                  <FormCustom onSubmit={handleSubmit}>
                    <div id="align-inputs">
                      <Input
                        name="code"
                        min={1000}
                        max={9999}
                        type="number"
                        placeholder="Código"
                        value={values.code}
                        onChange={handleChange('code')}
                        messageError={
                          errors.code && touched.code ? errors.code : ''
                        }
                      />
                      {person.cpf ? (
                        <>
                          <Input
                            name="cpf"
                            type="number"
                            placeholder="CPF"
                            value={values.cpf}
                            onChange={handleChange('cpf')}
                            messageError={
                              errors.cpf && touched.cpf ? errors.cpf : ''
                            }
                          />
                          <Input
                            name="nome"
                            type="text"
                            placeholder="Nome"
                            value={values.nome}
                            onChange={handleChange('nome')}
                            messageError={
                              errors.nome && touched.nome ? errors.nome : ''
                            }
                          />
                        </>
                      ) : (
                        <>
                          <Input
                            name="cnpj"
                            type="number"
                            placeholder="CNPJ"
                            value={values.cnpj}
                            onChange={handleChange('cnpj')}
                            messageError={
                              errors.cnpj && touched.cnpj ? errors.cnpj : ''
                            }
                          />
                          <Input
                            name="razao_social"
                            type="text"
                            placeholder="Razão Social"
                            value={values.razao_social}
                            onChange={handleChange('razao_social')}
                            messageError={
                              errors.razao_social && touched.razao_social
                                ? errors.razao_social
                                : ''
                            }
                          />
                          <Input
                            name="nome_fantasia"
                            type="text"
                            placeholder="Nome Fantasia"
                            value={values.nome_fantasia}
                            onChange={handleChange('nome_fantasia')}
                            messageError={
                              errors.nome_fantasia && touched.nome_fantasia
                                ? errors.nome_fantasia
                                : ''
                            }
                          />
                        </>
                      )}
                      <Input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        value={values.email}
                        onChange={handleChange('email')}
                        messageError={
                          errors.email && touched.email ? errors.email : ''
                        }
                      />
                      <Input
                        name="tel"
                        type="text"
                        placeholder="Telefone"
                        value={values.tel}
                        onChange={handleChange('tel')}
                        messageError={
                          errors.tel && touched.tel ? errors.tel : ''
                        }
                      />
                      <Input
                        name="endereco"
                        type="text"
                        placeholder="Endereço"
                        value={values.endereco}
                        onChange={handleChange('endereco')}
                        messageError={
                          errors.endereco && touched.endereco
                            ? errors.endereco
                            : ''
                        }
                      />
                      <Input
                        name="cep"
                        type="text"
                        placeholder="CEP"
                        value={values.cep}
                        onChange={handleChange('cep')}
                        messageError={
                          errors.cep && touched.cep ? errors.cep : ''
                        }
                      />
                      <Input
                        name="uf"
                        type="text"
                        placeholder="Estado"
                        value={values.uf}
                        onChange={handleChange('uf')}
                        messageError={errors.uf && touched.uf ? errors.uf : ''}
                      />
                      <Select
                        name="tipo"
                        value={values.tipo}
                        onChange={handleChange('tipo')}
                      >
                        {optionsSelect.map(option => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </Select>
                      <Input
                        name="info"
                        type="text"
                        placeholder="Informações"
                        value={values.info}
                        onChange={handleChange('info')}
                        messageError={
                          errors.info && touched.info ? errors.info : ''
                        }
                      />
                    </div>
                  </FormCustom>
                )}
              </Formik>
            )}
          </Main>
        )}

        {/* {editting && company && (
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
        )} */}
      </Container>
    </>
  );
};

export default EditPeople;
