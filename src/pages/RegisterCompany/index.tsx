import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';

import { Container, FormCustom, Main } from './styles';

interface RegisterCompanyForm {
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
}

const RegisterCompany: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();

  const formSchemaCompany = Yup.object().shape({
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
  });

  const handleBack = useCallback((): void => {
    history.goBack();
  }, [history]);

  const handleSubmitForm = useCallback(
    async (data: RegisterCompanyForm) => {
      try {
        const {
          cod,
          cnpj,
          razao_social,
          nome_fantasia,
          email,
          tel,
          endereco,
          cep,
          uf,
          info,
        } = data;

        api
          .post('/company', {
            cod: String(cod),
            cnpj: String(cnpj),
            razao_social,
            nome_fantasia,
            email,
            tel,
            endereco,
            cep,
            uf,
            info,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            history.push('/company');
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro da Empresa!');
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Empresa" />
        <button
          type="button"
          style={{ backgroundColor: 'transparent', border: 0, maxWidth: 150 }}
          onClick={() => handleBack()}
        >
          <HiOutlineArrowLeft size={42} color="#ff7a00" />
        </button>
        <Main>
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
            }}
            validationSchema={formSchemaCompany}
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
                  <Input
                    name="cnpj"
                    type="number"
                    placeholder="CNPJ"
                    value={values.cnpj}
                    onChange={handleChange('cnpj')}
                    messageError={
                      errors.cnpj && touched.cnpj ? errors.cnpj : ''
                    }
                    maxLength={18}
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

export default RegisterCompany;
