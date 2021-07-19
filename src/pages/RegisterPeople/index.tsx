import React, { useCallback, useState } from 'react';

import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Switch from 'react-switch';

import { FiHome, FiPower, FiSave } from 'react-icons/fi';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { Formik } from 'formik';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

import {
  Container,
  Header,
  FormCustom,
  Greetings,
  Main,
  Select,
} from './styles';
import Input from '../../components/Input';
import api from '../../services/api';

interface IRegisterForm {
  cod: number | string;
  email: string;
  tel: string;
  endereco: string;
  cep: string;
  estado: string;
  info: string;
  type: string;

  cnpj?: string;
  razao_social?: string;
  nome_fantasia?: string;

  cpf?: string;
  nome?: string;
}

const optionsSelect = [
  { value: '', label: 'Tipo' },
  { value: 'fornecedor', label: 'Fornecedor' },
  { value: 'cliente', label: 'Cliente' },
  { value: 'colaborador', label: 'Colaborador' },
];

const RegisterPeople: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const formSchemaLogin = Yup.object().shape({
    cod: Yup.number().required('Código obrigatório'),
    email: Yup.string().required('E-mail obrigatório'),
    tel: Yup.string(),
    endereco: Yup.string(),
    cep: Yup.string(),
    uf: Yup.string(),
    info: Yup.string(),
    type: Yup.string(),

    // Jurídica
    cnpj: checked ? Yup.string() : Yup.string().required('CNPJ obrigatório'),
    razao_social: checked
      ? Yup.string()
      : Yup.string().required('Razão Social obrigatório'),
    nome_fantasia: checked
      ? Yup.string()
      : Yup.string().required('Nome Fantasia obrigatório'),

    // Fisica
    cpf: checked ? Yup.string() : Yup.string().required('CPF obrigatório'),
    nome: checked ? Yup.string() : Yup.string().required('Nome obrigatório'),
  });

  const history = useHistory();
  const { user } = useAuth();

  const handleLogout = useCallback((): void => {
    history.push('/');
  }, [history]);

  const handleHome = useCallback((): void => {
    history.push('/home');
  }, [history]);

  const handleBack = useCallback((): void => {
    history.goBack();
  }, [history]);

  const handleSubmitForm = useCallback(
    async (data: IRegisterForm) => {
      try {
        api
          .post('/peoples', {
            cod: data.cod,
            email: data.email,
            tel: data.tel,
            endereco: data.endereco,
            cep: data.cep,
            estado: data.estado,
            info: data.info,
            type: data.type,

            cnpj: data.cnpj,
            razao_social: data.razao_social,
            nome_fantasia: data.nome_fantasia,

            cpf: data.cpf,
            nome: data.nome,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            history.push('/people');
          });
      } catch (err) {
        toast.error(
          'Erro no registro da empresa! Ocorreu um erro ao cadastrar, cheque as informações',
        );
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <Header>
          <h1>Cilex</h1>
          <Greetings>
            <p>Register People</p>
          </Greetings>
          <div id="container-buttons">
            <Button onClick={() => handleHome()} layoutColor="button-filled">
              <FiHome size={24} />{' '}
            </Button>
            <Button onClick={() => handleLogout()} layoutColor="button-outline">
              <FiPower size={24} />
            </Button>
          </div>
        </Header>
        <Main>
          <div id="align-switch">
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
            <div id="container-switch">
              <p>Pessoa Jurídica</p>
              <Switch
                onChange={() => setChecked(!checked)}
                checked={checked}
                checkedIcon={false}
                uncheckedIcon={false}
                onColor="#ff7a00"
                offColor="#ff7a00"
              />
              <p>Pessoa Física</p>
            </div>
          </div>
          <Formik
            initialValues={{
              cod: '',
              cnpj: '',
              razao_social: '',
              nome_fantasia: '',
              email: '',
              tel: '',
              endereco: '',
              cep: '',
              uf: '',
              info: '',
              estado: '',
              cpf: '',
              nome: '',
              type: '',
            }}
            validationSchema={formSchemaLogin}
            onSubmit={handleSubmitForm}
          >
            {({ handleChange, touched, values, errors, handleSubmit }) => (
              <FormCustom onSubmit={handleSubmit}>
                <div id="align-inputs">
                  <Input
                    name="cod"
                    min={1000}
                    max={9999}
                    type="number"
                    placeholder="Código"
                    value={values.cod}
                    onChange={handleChange('cod')}
                    messageError={errors.cod && touched.cod ? errors.cod : ''}
                  />
                  {checked ? (
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
                    messageError={errors.tel && touched.tel ? errors.tel : ''}
                  />
                  <Input
                    name="endereco"
                    type="text"
                    placeholder="Endereço"
                    value={values.endereco}
                    onChange={handleChange('endereco')}
                    messageError={
                      errors.endereco && touched.endereco ? errors.endereco : ''
                    }
                  />
                  <Input
                    name="cep"
                    type="text"
                    placeholder="CEP"
                    value={values.cep}
                    onChange={handleChange('cep')}
                    messageError={errors.cep && touched.cep ? errors.cep : ''}
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
                    name="type"
                    value={values.type}
                    onChange={handleChange('type')}
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
                <div id="align-button-save">
                  <Button layoutColor="button-green" type="submit">
                    <FiSave size={24} />
                    <span>Salvar</span>
                  </Button>
                </div>
              </FormCustom>
            )}
          </Formik>
        </Main>
      </Container>
    </>
  );
};

export default RegisterPeople;
