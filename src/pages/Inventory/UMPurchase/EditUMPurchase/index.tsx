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

interface RegisterUMPurchaseForm {
  description: string;
  transformationUM: string;
}

const EditUMPurchase: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [umPurchase, setUMPurchase] = useState<RegisterUMPurchaseForm | null>({
    description: 'Asd',
    transformationUM: 'ML',
  });

  useEffect(() => {
    api
      .get<RegisterUMPurchaseForm | null>(`/umPurchase/${id}`)
      .then(response => {
        setUMPurchase(response.data);
      });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: RegisterUMPurchaseForm) => {
      try {
        api
          .put(`/umPurchase/${id}`, {
            description: data.description,
            transformationUM: data.transformationUM,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            history.push('/inventory');
          });
      } catch (err) {
        toast.error(
          'Ocorreu um erro na atualização da Unidade de Medida de Compra!',
        );
      }
    },
    [history, id],
  );

  const formSchemaUMPurchase = Yup.object().shape({
    description: Yup.string().required('Descrição Obrigatório'),
    transformationUM: Yup.string().required(
      'Transformação da Unidade de Medida Obrigatório',
    ),
  });

  const handleDeleteUMPurchase = () => {
    api
      .delete(`/umPurchase/${id}`)
      .then(() => {
        toast.success('Deletado com Sucesso');
        history.push('/inventory');
      })
      .catch(() => {
        toast.success('Erro ao deletar Unidade de Medida de Compra');
        history.push('/inventory');
      });
  };

  return (
    <>
      <Container>
        <Header pageName="Editar Unidade de Medida de Compra" />
        {umPurchase && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/inventory" />
              </div>
              <div id="container-titles">
                <h2>{umPurchase.description}</h2>
                <p>{umPurchase.transformationUM}</p>
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
                  description: umPurchase.description,
                  transformationUM: umPurchase.transformationUM,
                }}
                validationSchema={formSchemaUMPurchase}
                onSubmit={handleSubmitForm}
              >
                {({ handleChange, touched, values, errors, handleSubmit }) => (
                  <FormCustom onSubmit={handleSubmit}>
                    <div id="align-inputs">
                      <Input
                        name="transformationUM"
                        type="text"
                        placeholder="Transformação da Unidade de Medida"
                        value={values.transformationUM}
                        onChange={handleChange('transformationUM')}
                        messageError={
                          errors.transformationUM && touched.transformationUM
                            ? errors.transformationUM
                            : ''
                        }
                      />
                      <Input
                        name="description"
                        type="text"
                        placeholder="Unidade de Medida de Compra"
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
        actionToDelete={handleDeleteUMPurchase}
      />
    </>
  );
};

export default EditUMPurchase;
