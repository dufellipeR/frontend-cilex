import React, { useCallback, useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';

import api from '../../../services/api';
import { useCrudModules } from '../../../hooks/useCrudModules';

import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import ButtonBack from '../../../components/ButtonBack';
import ModalDelete from '../../../components/ModalDelete';

import { Container, Main, HeaderContent, FormCustom } from './styles';

interface RegisterServicesCompanyForm {
  code: string;
  service: string;
  color: string;
}

const EditServicesCompany: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const { colors } = useContext(ThemeContext);
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [service, setService] = useState<RegisterServicesCompanyForm | null>({
    code: '1000',
    service: 'Banho e Tosa',
    color: '#F00',
  });

  useEffect(() => {
    api
      .get<RegisterServicesCompanyForm | null>(`/service/${id}`)
      .then(response => {
        setService(response.data);
      });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: RegisterServicesCompanyForm) => {
      try {
        api
          .put(`/service/${id}`, {
            code: data.code,
            service: data.service,
            color: data.color,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            history.push('/service');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              "There's already an entity registered with the same code"
            ) {
              toast.error(
                'Já existe um serviço cadastrado com o mesmo código!',
              );
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Serviço!');
      }
    },
    [history, id],
  );

  const formSchemaServicesCompany = Yup.object().shape({
    code: Yup.string(),
    service: Yup.string(),
    color: Yup.string(),
  });

  return (
    <>
      <Container>
        <Header pageName="Editar Serviço" />
        {service && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/service" />
              </div>
              <div id="container-titles">
                <h2>{service.code}</h2>
                <p>{service.service}</p>
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
                  code: service.code,
                  service: service.service,
                  color: service.color,
                }}
                validationSchema={formSchemaServicesCompany}
                onSubmit={handleSubmitForm}
              >
                {({ handleChange, touched, values, errors, handleSubmit }) => (
                  <FormCustom onSubmit={handleSubmit}>
                    <div id="align-inputs">
                      <Input
                        name="code"
                        type="text"
                        placeholder="Código"
                        value={values.code}
                        onChange={handleChange('code')}
                        messageError={
                          errors.code && touched.code ? errors.code : ''
                        }
                        maxLength={6}
                      />
                      <Input
                        name="service"
                        type="text"
                        placeholder="Serviço"
                        value={values.service}
                        onChange={handleChange('service')}
                        messageError={
                          errors.service && touched.service
                            ? errors.service
                            : ''
                        }
                      />
                      <Input
                        name="color"
                        type="text"
                        placeholder="Cor"
                        value={values.color}
                        onChange={handleChange('color')}
                        messageError={
                          errors.color && touched.color ? errors.color : ''
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
          deleteDataFromModule({ id, route: 'service', routePush: 'service' });
        }}
      />
    </>
  );
};

export default EditServicesCompany;
