import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt } from 'react-icons/hi';

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ButtonBack from '../../components/ButtonBack';
import Checkbox from '../../components/Checkbox';

import { Container, Main, FormCustom, CheckboxContainer } from './styles';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface UpdateUserForm {
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
}

const EditUsersActive: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();

  const [user, setUser] = useState<User>({} as User);
  const [edditing, setEdditing] = useState(false);

  const formSchemaUser = Yup.object().shape({
    username: Yup.string().required('Username Obrigatório'),
    password: Yup.string().required('Password Obrigatório'),
    email: Yup.string().email(),
  });

  useEffect(() => {
    api.get(`/users/${id}`).then(response => {
      setUser(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: UpdateUserForm) => {
      try {
        api
          .put(`/users/${id}`, {
            name: data.username,
            email: data.email,
            password: data.password,
            isAdmin: data.isAdmin,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            history.push('/menu/users/active');
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Usuário!');
      }
    },
    [history, id],
  );

  return (
    <>
      <Container>
        <Header pageName="Editar Usuários" />
        <ButtonBack destinationBack="/users/active" />
        <Main>
          <div id="info-user">
            {user && (
              <>
                <span>Nome</span>
                <p>{user.name}</p>
                <span>Email</span>
                <p>{user.email}</p>
                <span>É Admin ?</span>
                <p>{user.isAdmin ? 'Sim' : 'Não'}</p>
                <Button
                  layoutColor="button-green"
                  onClick={() => setEdditing(true)}
                >
                  <HiOutlinePencilAlt size={22} />
                  <span id="activate-user">Editar Usuário</span>
                </Button>
              </>
            )}
          </div>
          {edditing && (
            <Formik
              initialValues={{
                username: user.name,
                password: '',
                email: user.email,
                isAdmin: user.isAdmin,
              }}
              validationSchema={formSchemaUser}
              onSubmit={handleSubmitForm}
            >
              {({ handleChange, touched, values, errors, handleSubmit }) => (
                <FormCustom onSubmit={handleSubmit}>
                  <Input
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange('email')}
                    messageError={
                      errors.email && touched.email ? errors.email : ''
                    }
                  />
                  <Input
                    name="username"
                    type="text"
                    placeholder="Usuário"
                    value={values.username}
                    onChange={handleChange('username')}
                    messageError={
                      errors.username && touched.username ? errors.username : ''
                    }
                  />
                  <Input
                    name="password"
                    type="password"
                    placeholder="Nova Senha"
                    value={values.password}
                    onChange={handleChange('password')}
                    messageError={
                      errors.password && touched.password ? errors.password : ''
                    }
                  />
                  <CheckboxContainer>
                    <Checkbox name="isAdmin" label="É Admin ?" />
                  </CheckboxContainer>
                  <Button layoutColor="button-green" type="submit">
                    <FiSave size={24} />
                    <span>Atualizar Cadastro</span>
                  </Button>
                </FormCustom>
              )}
            </Formik>
          )}
        </Main>
      </Container>
    </>
  );
};

export default EditUsersActive;
