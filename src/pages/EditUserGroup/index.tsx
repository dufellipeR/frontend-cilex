import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import {
  HiOutlineArrowLeft,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from 'react-icons/hi';
import { toast } from 'react-toastify';

import api from '../../services/api';
import { theme } from '../../App';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ButtonBack from '../../components/ButtonBack';

import { Container, Main, HeaderContent, FormCustom } from './styles';

interface RegisterUserGroupForm {
  code: string;
  description: string;
}

const EditUserGroup: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();

  const [editting, setEditting] = useState<boolean>(false);
  const [group, setGroup] = useState<RegisterUserGroupForm | null>(null);

  useEffect(() => {
    api.get<RegisterUserGroupForm | null>(`/group/${id}`).then(response => {
      setGroup(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: RegisterUserGroupForm) => {
      try {
        api
          .put(`/group/${id}`, {
            code: String(data.code),
            description: data.description,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            history.push('/group');
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Cargo!');
      }
    },
    [history, id],
  );

  const formSchemaUserGroupEdit = Yup.object().shape({
    code: Yup.string(),
    description: Yup.string(),
  });

  const handleDeleteGroup = () => {
    api
      .delete(`/group/${id}`)
      .then(() => {
        toast.success('Deletado com Sucesso');
        history.push('/group');
      })
      .catch(() => {
        toast.success('Erro ao deletar Grupo');
        history.push('/group');
      });
  };

  return (
    <Container>
      <Header pageName="Editar Grupo de Usuários" />
      {group && (
        <Main>
          <HeaderContent>
            <div id="container-arrow">
              <ButtonBack destinationBack="/group" />
            </div>
            <div id="container-titles">
              <h2>{group.description}</h2>
              <p>{group.code}</p>
            </div>
            <div id="container-buttons-actions">
              <Button
                layoutColor="button-filled"
                onClick={() => setEditting(!editting)}
              >
                <HiOutlinePencilAlt size={24} color="#fefefe" />
              </Button>
              <Button layoutColor="button-outline" onClick={handleDeleteGroup}>
                <HiOutlineTrash size={24} color={theme.main} />
              </Button>
            </div>
          </HeaderContent>

          {editting && (
            <Formik
              initialValues={{
                code: group.code,
                description: group.description,
              }}
              validationSchema={formSchemaUserGroupEdit}
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
                      name="description"
                      type="text"
                      placeholder="Grupo"
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
          )}
        </Main>
      )}
    </Container>
  );
};

export default EditUserGroup;