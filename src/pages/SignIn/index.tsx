import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Formik } from 'formik';

import solutionSvg from '../../assets/solution.svg';

import getValidationErrors from '../../utils/getValidationErrors';
// import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, ShowOff, AnimationContainer } from './styles';

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

  // const { signIn } = useAuth();

  const handleSubmitForm = useCallback(async (data: SignInFormData) => {
    try {
      console.log('Username: ', data.username);
      console.log('Password: ', data.password);

      // await signIn({
      //   username: data.username,
      //   password: data.password,
      // });

      // history.push('/chosecompany');
      toast.success('Autenticado!');
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
  }, []);
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
            {({ handleChange, values, errors, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Input
                  icon={FiUser}
                  name="username"
                  type="text"
                  placeholder="Nome"
                  value={values.username}
                  onChange={handleChange('username')}
                  messageError={errors.username && errors.username}
                />

                <Input
                  icon={FiLock}
                  name="password"
                  type="password"
                  placeholder="Senha"
                  value={values.password}
                  onChange={handleChange('password')}
                  messageError={errors.password && errors.password}
                />

                <Button type="submit">
                  <span
                    style={{
                      marginLeft: `${30}%`,
                      justifyContent: 'space-evenly',
                      maxWidth: `${35}%`,
                      alignItems: 'center',
                    }}
                  >
                    <FiLogIn size={24} /> Entrar
                  </span>
                </Button>

                <Link to="/forgot-password">Esqueceu a senha ?</Link>
              </form>
            )}
          </Formik>
        </AnimationContainer>
      </Container>
    </>
  );
};

export default SignIn;
