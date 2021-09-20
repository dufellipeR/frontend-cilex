import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from '../../../../services/api';

import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import Input from '../../../../components/Input';
import ButtonBack from '../../../../components/ButtonBack';

import { Container, Main, FormCustom } from './styles';

interface RegisterUMUseForm {
  description: string;
  UMUse: string;
}

const RegisterUMUse: React.FC = () => {
  const history = useHistory();

  const formSchemaUMUse = Yup.object().shape({
    description: Yup.string().required('Descrição Obrigatório'),
    UMUse: Yup.string().required(
      'Transformação da Unidade de Medida Obrigatório',
    ),
  });

  const handleSubmitForm = useCallback(
    async (data: RegisterUMUseForm) => {
      try {
        const { description, UMUse } = data;
        api
          .post('/umUse', {
            UMUse,
            description,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            history.push('/inventory/umUse');
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro da Unidade de Medida de Uso!');
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Unidade de Medida de Uso" />
        <ButtonBack destinationBack="/inventory/umUse" />
        <Main>
          <Formik
            initialValues={{
              description: '',
              UMUse: '',
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
                    value={values.UMUse}
                    onChange={handleChange('UMUse')}
                    messageError={
                      errors.UMUse && touched.UMUse ? errors.UMUse : ''
                    }
                  />
                  <Input
                    name="description"
                    type="text"
                    placeholder="Unidade de Medida de Uso"
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
        </Main>
      </Container>
    </>
  );
};

export default RegisterUMUse;
