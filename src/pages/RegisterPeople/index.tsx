import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Switch from 'react-switch';
import { FiSave } from 'react-icons/fi';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';

import { Container, FormCustom, Main, Select } from './styles';

interface RegisterPeopleForm {
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

const optionsSelect = [
  { value: '', label: 'Tipo' },
  { value: 'fornecedor', label: 'Fornecedor' },
  { value: 'cliente', label: 'Cliente' },
  { value: 'colaborador', label: 'Colaborador' },
];

const RegisterPeople: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const formSchemaPeople = Yup.object().shape({
    code: Yup.number().required('Código obrigatório'),
    email: Yup.string().required('E-mail obrigatório'),
    tel: Yup.string(),
    endereco: Yup.string(),
    cep: Yup.string(),
    uf: Yup.string(),
    info: Yup.string(),
    tipo: Yup.string(),

    // Jurídica
    cnpj: checked ? Yup.string() : Yup.string().required('CNPJ obrigatório'),
    razao_social: checked
      ? Yup.string()
      : Yup.string().required('Razão Social obrigatório'),
    nome_fantasia: checked
      ? Yup.string()
      : Yup.string().required('Nome Fantasia obrigatório'),

    // Fisica
    cpf: checked ? Yup.string().required('CPF obrigatório') : Yup.string(),
    nome: checked ? Yup.string().required('Nome obrigatório') : Yup.string(),
  });

  const history = useHistory();
  const { user } = useAuth();

  const handleBack = useCallback((): void => {
    history.goBack();
  }, [history]);

  const handleSubmitForm = useCallback(
    async (data: RegisterPeopleForm) => {
      try {
        if (checked) {
          const { code, email, tel, endereco, cep, uf, info, tipo, cpf, nome } =
            data;

          api
            .post('/person', {
              code: String(code),
              email,
              tel,
              endereco,
              cep,
              uf,
              info,
              tipo,
              cpf: String(cpf),
              nome,
            })
            .then(() => {
              toast.success('Registrado com sucesso');
              history.push('/people');
            });
        } else {
          const {
            code,
            email,
            tel,
            endereco,
            cep,
            uf,
            info,
            tipo,
            cnpj,
            razao_social,
            nome_fantasia,
          } = data;

          api
            .post('/person', {
              code: String(code),
              email,
              tel,
              endereco,
              cep,
              uf,
              info,
              tipo,
              cnpj: String(cnpj),
              razao_social,
              nome_fantasia,
            })
            .then(() => {
              toast.success('Registrado com sucesso');
              history.push('/people');
            });
        }
      } catch (err) {
        toast.error('Ocorreu um erro no registro da Empresa!');
      }
    },
    [history, checked],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Pessoa" />
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
              code: '',
              cnpj: '',
              razao_social: '',
              nome_fantasia: '',
              email: '',
              tel: '',
              endereco: '',
              cep: '',
              uf: '',
              info: '',
              cpf: '',
              nome: '',
              tipo: '',
            }}
            validationSchema={formSchemaPeople}
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
