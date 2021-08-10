import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from '../../services/api';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import ButtonBack from '../../components/ButtonBack';

import { Container, Main, FormCustom } from './styles';

interface RegisterRoleForm {
  code: string;
  role: string;
  description: string;
}

const RegisterRole: React.FC = () => {
  const history = useHistory();

  const formSchemaRole = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório'),
    role: Yup.string(),
    description: Yup.string(),
  });

  const handleSubmitForm = useCallback(
    async (data: RegisterRoleForm) => {
      try {
        const { code, role, description } = data;

        api
          .post('/role', {
            code: String(code),
            role,
            description,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            history.push('/role');
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Cargo e Função!');
      }
    },
    [history],
  );

  return (
    <>
      <Header pageName="Registro de Cargos e Funções" />
      <Container>
        <ButtonBack />
        <Main>
          <Formik
            initialValues={{
              code: '',
              role: '',
              description: '',
            }}
            validationSchema={formSchemaRole}
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
                  <Input
                    name="role"
                    type="text"
                    placeholder="Cargo"
                    value={values.role}
                    onChange={handleChange('role')}
                    messageError={
                      errors.role && touched.role ? errors.role : ''
                    }
                  />
                  <Input
                    name="description"
                    type="text"
                    placeholder="Função"
                    value={values.description}
                    onChange={handleChange('description')}
                    messageError={
                      errors.description && touched.description
                        ? errors.description
                        : ''
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

export default RegisterRole;
