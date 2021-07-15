import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Formik } from 'formik';

import api from '../../services/api';
import solutionSvg from '../../assets/solution.svg';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, ShowOff, AnimationContainer, FormCustom } from './styles';

interface SignInFormData {
  username: string;
  password: string;
}

const formSchemaLogin = Yup.object().shape({
  username: Yup.string().required('Username obrigatório'),
  password: Yup.string().required('Senha obrigatória'),
});

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const handleSubmitForm = useCallback(
    async (data: SignInFormData) => {
      try {
        const response = await api.get('/users');

        const hasUser = response.data.users.find(
          (user: SignInFormData) =>
            user.username === data.username && user.password === data.password,
        );

        if (hasUser) {
          history.push('/chosecompany');
        } else {
          toast.error('Usuário e/ou senha incorreto!');
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        toast.error(
          'Erro na autenticação! Ocorreu um erro ao fazer login, cheque as credenciais',
        );
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <ShowOff>
          <h1>Cilex</h1>
          <p>O cilex aumenta sua produtividade</p>

          <img src={solutionSvg} alt="" srcSet="" />
        </ShowOff>
        <AnimationContainer>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={formSchemaLogin}
            onSubmit={handleSubmitForm}
          >
            {({ handleChange, touched, values, errors, handleSubmit }) => (
              <FormCustom onSubmit={handleSubmit}>
                <Input
                  icon={FiUser}
                  name="username"
                  type="text"
                  placeholder="Nome"
                  value={values.username}
                  onChange={handleChange('username')}
                  messageError={
                    errors.username && touched.username ? errors.username : ''
                  }
                />

                <Input
                  icon={FiLock}
                  name="password"
                  type="password"
                  placeholder="Senha"
                  value={values.password}
                  onChange={handleChange('password')}
                  messageError={
                    errors.password && touched.password ? errors.password : ''
                  }
                />

                <Button type="submit" layoutColor="button-filled">
                  <FiLogIn size={24} />
                  <span>Entrar</span>
                </Button>

                <Link to="/forgot-password">Esqueceu a senha ?</Link>
              </FormCustom>
            )}
          </Formik>
        </AnimationContainer>
      </Container>
    </>
  );
};

export default SignIn;
