import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from '../../../services/api';

import Button from '../../../components/Button';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import ButtonBack from '../../../components/ButtonBack';

import { Container, Main, FormCustom } from './styles';

interface RegisterServicesCompanyForm {
  code: string;
  service: string;
  color: string;
}

const RegisterServicesCompany: React.FC = () => {
  const history = useHistory();

  const formSchemaServicesCompany = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório'),
    service: Yup.string(),
    color: Yup.string(),
  });

  const handleSubmitForm = useCallback(
    async (data: RegisterServicesCompanyForm) => {
      try {
        const { code, service, color } = data;

        api
          .post('/service', {
            code,
            service,
            color,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
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
        toast.error('Ocorreu um erro no registro do Serviço!');
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Cargos e Funções" />
        <ButtonBack destinationBack="/service" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              service: '',
              color: '',
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
                      errors.service && touched.service ? errors.service : ''
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
        </Main>
      </Container>
    </>
  );
};

export default RegisterServicesCompany;
