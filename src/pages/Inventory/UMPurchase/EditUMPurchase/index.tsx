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

interface RegisterUMPurchaseForm {
  purchaseUM: string;
  transformationUM: string;
}

const formSchemaUMPurchase = Yup.object().shape({
  purchaseUM: Yup.string().required('Unidade de Medida de Compra Obrigatória'),
  transformationUM: Yup.string().required(
    'Transformação da Unidade de Medida Obrigatório',
  ),
});

const EditUMPurchase: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [umPurchase, setUMPurchase] = useState<RegisterUMPurchaseForm | null>({
    purchaseUM: 'L',
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
            description: data.purchaseUM,
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
                <h2>{umPurchase.purchaseUM}</h2>
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
                  purchaseUM: umPurchase.purchaseUM,
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
                        name="purchaseUM"
                        type="text"
                        placeholder="Unidade de Medida de Compra"
                        value={values.purchaseUM}
                        onChange={handleChange('purchaseUM')}
                        messageError={
                          errors.purchaseUM && touched.purchaseUM
                            ? errors.purchaseUM
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
            route: 'umPurchase',
            routePush: 'inventory',
          });
        }}
      />
    </>
  );
};

export default EditUMPurchase;
