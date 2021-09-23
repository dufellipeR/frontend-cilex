import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import Switch from 'react-switch';

import api from '../../../../services/api';
import { theme } from '../../../../App';
import { useCrudModules } from '../../../../hooks/useCrudModules';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import ButtonBack from '../../../../components/ButtonBack';
import ModalDelete from '../../../../components/ModalDelete';

import { Container, Main, HeaderContent, FormCustom } from './styles';

interface RegisterTypeForm {
  code: string;
  description: string;
  acceptStructure: boolean;
}

const formSchemaType = Yup.object().shape({
  code: Yup.string().required('Código Obrigatório'),
  description: Yup.string().required('Descrição Obrigatório'),
  acceptStructure: Yup.boolean(),
});

const EditType: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [acceptStructure, setAcceptStructure] = useState(false);
  const [type, setType] = useState<RegisterTypeForm | null>({
    code: '1',
    description: 'Asd',
    acceptStructure: true,
  });

  useEffect(() => {
    api.get<RegisterTypeForm | null>(`/type/${id}`).then(response => {
      setType(response.data);
      if (response.data) setAcceptStructure(response.data.acceptStructure);
    });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: RegisterTypeForm) => {
      try {
        api
          .put(`/type/${id}`, {
            code: String(data.code),
            description: data.description,
            acceptStructure,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            history.push('/inventory');
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Cargo!');
      }
    },
    [history, id, acceptStructure],
  );

  return (
    <>
      <Container>
        <Header pageName="Editar Tipo" />
        {type && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/inventory" />
              </div>
              <div id="container-titles">
                <h2>{type.code}</h2>
                <p>{type.description}</p>
                <p>
                  Aceita Estrutura ?{' '}
                  {type.acceptStructure === true ? 'Sim' : 'Não'}
                </p>
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
                  code: type.code,
                  description: type.description,
                  acceptStructure: type.acceptStructure,
                }}
                validationSchema={formSchemaType}
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
                        placeholder="Tipo"
                        value={values.description}
                        onChange={handleChange('description')}
                        messageError={
                          errors.description && touched.description
                            ? errors.description
                            : ''
                        }
                      />
                      <div id="align-switch">
                        <p>Aceita estrutura ?</p>
                        <Switch
                          onChange={() => setAcceptStructure(!acceptStructure)}
                          checked={acceptStructure}
                          checkedIcon={false}
                          uncheckedIcon={false}
                          onColor={theme.main}
                        />
                      </div>
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
            route: 'type',
            routePush: 'inventory',
          });
        }}
      />
    </>
  );
};

export default EditType;
