import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import { BsUnlock } from 'react-icons/bs';

import api from '../../services/api';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ButtonBack from '../../components/ButtonBack';
import Checkbox from '../../components/Checkbox';

import { Container, Main, FormCustom, CheckboxContainer } from './styles';

interface UserPending {
  id: string;
  person: {
    code: string;
    cpf: string;
    email: string;
    nome: string;
  };
}

interface RegisterUserForm {
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
}

const EditUsersPending: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();

  const [user, setUser] = useState<UserPending>({} as UserPending);
  const [edditing, setEdditing] = useState(false);

  const formSchemaUser = Yup.object().shape({
    username: Yup.string().required('Username Obrigatório'),
    password: Yup.string().required('Password Obrigatório'),
    email: Yup.string().email(),
    isAdmin: Yup.boolean(),
  });

  useEffect(() => {
    api.get(`/pendinguser/${id}`).then(response => {
      setUser(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: RegisterUserForm) => {
      try {
        api
          .post('/users/pending', {
            name: data.username,
            email: data.email,
            password: data.password,
            isAdmin: data.isAdmin,
            pendingUser_id: id,
          })
          .then(() => {
            toast.success('Criado com sucesso');
            history.push('/menu');
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Usuário!');
      }
    },
    [history, id],
  );

  return (
    <>
      <Container>
        <Header pageName="Criar Usuário Pendente" />
        <ButtonBack destinationBack="/users/pending" />
        <Main>
          <div id="info-user">
            {user.person && (
              <>
                <span>Código</span>
                <p>{user.person.code}</p>
                <span>Email</span>
                <p>{user.person.email}</p>
                <span>Nome</span>
                <p>{user.person.nome}</p>
                <span>CPF</span>
                <p>{user.person.cpf}</p>
                <Button
                  layoutColor="button-green"
                  onClick={() => setEdditing(true)}
                >
                  <BsUnlock size={22} />
                  <span id="activate-user">Ativar Usuário</span>
                </Button>
              </>
            )}
          </div>
          {edditing && (
            <Formik
              initialValues={{
                username: '',
                password: '',
                email: user.person.email,
                isAdmin: false,
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
                    placeholder="Senha"
                    value={values.password}
                    onChange={handleChange('password')}
                    messageError={
                      errors.password && touched.password ? errors.password : ''
                    }
                  />
                  <CheckboxContainer>
                    <Checkbox name="isUser" label="É Admin ?" />
                  </CheckboxContainer>
                  <Button layoutColor="button-green" type="submit">
                    <FiSave size={24} />
                    <span>Criar</span>
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

export default EditUsersPending;
