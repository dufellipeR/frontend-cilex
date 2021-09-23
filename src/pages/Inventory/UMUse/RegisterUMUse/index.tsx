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
  useUM: string;
  transformationUM: string;
}

const formSchemaUMUse = Yup.object().shape({
  useUM: Yup.string().required('Unidade de Medida de Uso Obrigatória'),
  transformationUM: Yup.string().required(
    'Transformação da Unidade de Medida Obrigatório',
  ),
});

const RegisterUMUse: React.FC = () => {
  const history = useHistory();

  const handleSubmitForm = useCallback(
    async (data: RegisterUMUseForm) => {
      try {
        const { useUM, transformationUM } = data;
        api
          .post('/umUse', {
            useUM,
            transformationUM,
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
              useUM: '',
              transformationUM: '',
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
        </Main>
      </Container>
    </>
  );
};

export default RegisterUMUse;
