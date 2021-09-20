import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';

import api from '../../../../services/api';
import { theme } from '../../../../App';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import ButtonBack from '../../../../components/ButtonBack';
import ModalDelete from '../../../../components/ModalDelete';

import { Container, Main, HeaderContent, FormCustom } from './styles';

interface RegisterApplicationForm {
  code: string;
  description: string;
}

const EditApplication: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [application, setApplication] =
    useState<RegisterApplicationForm | null>({
      code: '1',
      description: 'Asd',
    });

  useEffect(() => {
    api
      .get<RegisterApplicationForm | null>(`/application/${id}`)
      .then(response => {
        setApplication(response.data);
      });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: RegisterApplicationForm) => {
      try {
        api
          .put(`/application/${id}`, {
            code: String(data.code),
            description: data.description,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            history.push('/application');
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização da Aplicação!');
      }
    },
    [history, id],
  );

  const formSchemaApplication = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório'),
    description: Yup.string().required('Descrição Obrigatório'),
  });

  const handleDeleteApplication = () => {
    api
      .delete(`/application/${id}`)
      .then(() => {
        toast.success('Deletado com Sucesso');
        history.push('/inventory');
      })
      .catch(() => {
        toast.success('Erro ao deletar Aplicação');
        history.push('/inventory');
      });
  };

  return (
    <>
      <Container>
        <Header pageName="Editar Aplicação" />
        {application && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/inventory" />
              </div>
              <div id="container-titles">
                <h2>{application.code}</h2>
                <p>{application.description}</p>
              </div>
              <div id="container-buttons-actions">
                <Button
                  layoutColor="button-filled"
                  onClick={() => setEditting(!editting)}
                >
                  <HiOutlinePencilAlt size={24} color="#fefefe" />
                </Button>
                <Button
                  layoutColor="button-outline"
                  onClick={() => setShowModalDelete(true)}
                >
                  <HiOutlineTrash size={24} color={theme.main} />
                </Button>
              </div>
            </HeaderContent>

            {editting && (
              <Formik
                initialValues={{
                  code: application.code,
                  description: application.description,
                }}
                validationSchema={formSchemaApplication}
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
                        placeholder="Aplicação"
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
      <ModalDelete
        visible={showModalDelete}
        setVisible={setShowModalDelete}
        actionToDelete={handleDeleteApplication}
      />
    </>
  );
};

export default EditApplication;
