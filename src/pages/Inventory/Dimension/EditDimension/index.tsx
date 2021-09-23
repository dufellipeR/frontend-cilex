import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';

import api from '../../../../services/api';
import { theme } from '../../../../App';
import { useCrudModules } from '../../../../hooks/useCrudModules';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import ButtonBack from '../../../../components/ButtonBack';
import ModalDelete from '../../../../components/ModalDelete';

import { Container, Main, HeaderContent, FormCustom } from './styles';

interface RegisterDimensionForm {
  code: string;
  description: string;
}

const formSchemaDimension = Yup.object().shape({
  code: Yup.string().required('Código Obrigatório'),
  description: Yup.string().required('Dimensão Obrigatória'),
});

const EditDimension: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [dimension, setDimension] = useState<RegisterDimensionForm | null>({
    code: '1',
    description: 'Asd',
  });

  useEffect(() => {
    api.get<RegisterDimensionForm | null>(`/dimension/${id}`).then(response => {
      setDimension(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: RegisterDimensionForm) => {
      try {
        api
          .put(`/dimension/${id}`, {
            code: String(data.code),
            description: data.description,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            history.push('/inventory');
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização da Dimensão!');
      }
    },
    [history, id],
  );

  const handleDeleteDimension = () => {
    api
      .delete(`/dimension/${id}`)
      .then(() => {
        toast.success('Deletado com Sucesso');
        history.push('/inventory');
      })
      .catch(() => {
        toast.success('Erro ao deletar Dimensão');
        history.push('/inventory');
      });
  };

  return (
    <>
      <Container>
        <Header pageName="Editar Dimensão" />
        {dimension && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/inventory" />
              </div>
              <div id="container-titles">
                <h2>{dimension.code}</h2>
                <p>{dimension.description}</p>
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
                  code: dimension.code,
                  description: dimension.description,
                }}
                validationSchema={formSchemaDimension}
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
                        placeholder="Dimensão"
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
        actionToDelete={() => {
          deleteDataFromModule({
            id,
            route: 'dimension',
            routePush: 'inventory',
          });
        }}
      />
    </>
  );
};

export default EditDimension;
