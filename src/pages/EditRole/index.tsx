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

import { Container, Main, HeaderContent, FormCustom } from './styles';

interface RegisterRoleForm {
  code: string;
  role: string;
  description: string;
}

const EditRole: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();

  const [editting, setEditting] = useState<boolean>(false);
  const [role, setRole] = useState<RegisterRoleForm | null>(null);

  useEffect(() => {
    api.get<RegisterRoleForm | null>(`/role/${id}`).then(response => {
      setRole(response.data);
    });
  }, [id]);

  const handleBack = useCallback((): void => {
    history.goBack();
  }, [history]);

  const handleSubmitForm = useCallback(
    async (data: RegisterRoleForm) => {
      try {
        api
          .put(`/role/${id}`, {
            code: String(data.code),
            role: data.role,
            description: data.description,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            history.push('/role');
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Cargo!');
      }
    },
    [history, id],
  );

  const formSchemaRoleEdit = Yup.object().shape({
    code: Yup.string(),
    role: Yup.string(),
    description: Yup.string(),
  });

  const handleDeleteRole = () => {
    api
      .delete(`/role/${id}`)
      .then(() => {
        toast.success('Deletado com Sucesso');
        history.push('/role');
      })
      .catch(() => {
        toast.success('Erro ao deletar Cargo');
        history.push('/role');
      });
  };

  return (
    <Container>
      <Header pageName="Editar Cargo" />
      {role && (
        <Main>
          <HeaderContent>
            <div id="container-arrow">
              <button type="button" onClick={() => handleBack()}>
                <HiOutlineArrowLeft size={42} color={theme.main} />
              </button>
            </div>
            <div id="container-titles">
              <h2>{role.role}</h2>
              <p>{role.description}</p>
            </div>
            <div id="container-buttons-actions">
              <Button
                layoutColor="button-filled"
                onClick={() => setEditting(!editting)}
              >
                <HiOutlinePencilAlt size={24} color="#fefefe" />
              </Button>
              <Button layoutColor="button-outline" onClick={handleDeleteRole}>
                <HiOutlineTrash size={24} color={theme.main} />
              </Button>
            </div>
          </HeaderContent>

          {editting && (
            <Formik
              initialValues={{
                code: role.code,
                role: role.role,
                description: role.description,
              }}
              validationSchema={formSchemaRoleEdit}
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
          )}
        </Main>
      )}
    </Container>
  );
};

export default EditRole;
