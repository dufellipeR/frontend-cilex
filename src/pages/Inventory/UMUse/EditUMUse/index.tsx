import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import api from '../../../../services/api';
import { useCrudModules } from '../../../../hooks/useCrudModules';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import ButtonBack from '../../../../components/ButtonBack';
import ModalDelete from '../../../../components/ModalDelete';

import { Container, Main, HeaderContent, FormCustom } from './styles';

interface RegisterUMUseForm {
  useUM: string;
  transformationUM: string;
}

const formSchemaUMUse = Yup.object().shape({
  useUM: Yup.string().required('Unidade de Medida de Uso Obrigatória'),
  transformationUM: Yup.string().required(
    'Transformação da Unidade de Medida Obrigatório',
  ),
});

const EditUMUse: React.FC = () => {
  const history = useHistory();
  const { colors } = useContext(ThemeContext);
  const { id }: any = useParams();
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [umUse, setUMUse] = useState<RegisterUMUseForm | null>({
    useUM: 'ML',
    transformationUM: 'L',
  });

  useEffect(() => {
    api.get<RegisterUMUseForm | null>(`/umUse/${id}`).then(response => {
      setUMUse(response.data);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: RegisterUMUseForm) => {
      try {
        api
          .put(`/umUse/${id}`, {
            useUM: data.useUM,
            transformationUM: data.transformationUM,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            history.push('/inventory');
          });
      } catch (err) {
        toast.error(
          'Ocorreu um erro na atualização da Unidade de Medida de Uso!',
        );
      }
    },
    [history, id],
  );

  return (
    <>
      <Container>
        <Header pageName="Editar Unidade de Medida de Uso" />
        {umUse && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/inventory" />
              </div>
              <div id="container-titles">
                <h2>{umUse.useUM}</h2>
                <p>{umUse.transformationUM}</p>
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
                  <HiOutlineTrash size={24} color={colors.main} />
                </Button>
              </div>
            </HeaderContent>

            {editting && (
              <Formik
                initialValues={{
                  useUM: umUse.useUM,
                  transformationUM: umUse.transformationUM,
                }}
                validationSchema={formSchemaUMUse}
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
                        name="useUM"
                        type="text"
                        placeholder="Unidade de Medida de Uso"
                        value={values.useUM}
                        onChange={handleChange('useUM')}
                        messageError={
                          errors.useUM && touched.useUM ? errors.useUM : ''
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
            route: 'umUse',
            routePush: 'inventory',
          });
        }}
      />
    </>
  );
};

export default EditUMUse;
