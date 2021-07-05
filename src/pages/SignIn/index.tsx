import React, { useCallback, useRef } from 'react';

import { FiLogIn, FiLock, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Link, useHistory } from 'react-router-dom';

import solutionSvg from '../../assets/solution.svg';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/auth';
import { toast } from 'react-toastify';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, ShowOff, AnimationContainer } from './styles';

interface SignInFormData {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  // const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          username: Yup.string().required('Username obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // await signIn({
        //   username: data.username,
        //   password: data.password,
        // });

        // history.push('/chosecompany');
        toast.success('Autenticado!')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        toast.error('Erro na autenticação! Ocorreu um erro ao fazer login, cheque as credenciais')
      }
    },
    [/* signIn, */ history],
  );
  return (
    <>
      <Container>
        <ShowOff>
          <main>
            <h1>Cilex</h1>
            <p>O cilex aumenta sua produtividade</p>

            <img src={solutionSvg} alt="" srcSet="" />
          </main>
        </ShowOff>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              icon={FiUser}
              name="username"
              type="text"
              placeholder="Nome"
            />

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">
              <span
                style={{
                  marginLeft: `${30}%`,
                  alignSelf: 'center',
                  justifyContent: 'space-evenly',
                  maxWidth: `${35}%`,
                }}
              >
                <FiLogIn size={24} /> Entrar
              </span>
            </Button>

            <Link to="/forgot-password">Esqueceu a senha ?</Link>
          </Form>
        </AnimationContainer>
      </Container>
    </>
  );
};

export default SignIn;
