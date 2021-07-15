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

import { Container, Header, FormCustom, Greetings, Main } from './styles';
import Input from '../../components/Input';
import api from '../../services/api';

interface IRegisterForm {
  cod: number | string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  email: string;
  tel: string;
  endereco: string;
  cep: string;
  estado: string;
  info: string;

  cpf: string;
  nome: string;
}

const formSchemaLogin = Yup.object().shape({
  cod: Yup.number().required('Código Obrigatório'),
  cnpj: Yup.string().required('CNPJ obrigatório'),
  razao_social: Yup.string().required('Razão Social obrigatória'),
  nome_fantasia: Yup.string().required('Nome Fantasia obrigatório'),
  email: Yup.string().required('E-mail obrigatório'),
  tel: Yup.string(),
  endereco: Yup.string(),
  cep: Yup.string(),
  uf: Yup.string(),
  info: Yup.string(),
  cpf: Yup.string(),
  nome: Yup.string(),
});

const RegisterPeople: React.FC = () => {
  const [checked, setChecked] = useState(false);

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
            cnpj: data.cnpj,
            razao_social: data.razao_social,
            nome_fantasia: data.nome_fantasia,
            email: data.email,
            tel: data.tel,
            endereco: data.endereco,
            cep: data.cep,
            estado: data.estado,
            info: data.info,
          })
          .then(response => {
            console.log('Cadastrou: ', data);
            console.log('Response', response);
            toast.success('Registrado com sucesso');
            history.push('/company');
          });

        // api.post('/peoples', {
        //   cod: '2',
        //   cnpj: 'Nova Pessoa',
        //   razao_social: 'Nova Pessoa',
        //   nome_fantasia: 'Nova Pessoa',
        //   email: 'Nova Pessoa',
        //   tel: 'Nova Pessoa',
        //   endereco: 'Nova Pessoa',
        //   cep: 'Nova Pessoa',
        //   estado: 'Nova Pessoa',
        //   info: 'Nova Pessoa',
        // });

        // api.post('/company', data).then(response => {
        //   toast.success('Registrado com sucesso');
        //   history.push('/company');
        // });
      } catch (err) {
        toast.error(
          'Erro no registro da empresa! Ocorreu um erro ao fazer login, cheque as credenciais',
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
        <button
          type="button"
          style={{ backgroundColor: 'transparent', border: 0, maxWidth: 150 }}
          onClick={() => handleBack()}
        >
          <HiOutlineArrowLeft size={42} color="#ff7a00" />
        </button>
        <Main>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
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
                        type="number"
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
                <Button layoutColor="button-green" type="submit">
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
            )}
          </Formik>
        </Main>
      </Container>
    </>
  );
};

export default RegisterPeople;
