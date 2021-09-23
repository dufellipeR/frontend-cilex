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

const RegisterUMPurchase: React.FC = () => {
  const history = useHistory();

  const handleSubmitForm = useCallback(
    async (data: RegisterUMPurchaseForm) => {
      try {
        const { purchaseUM, transformationUM } = data;
        api
          .post('/umPurchase', {
            transformationUM,
            purchaseUM,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            history.push('/inventory/umPurchase');
          });
      } catch (err) {
        toast.error(
          'Ocorreu um erro no registro da Unidade de Medida de Compra!',
        );
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Unidade de Medida de Compra" />
        <ButtonBack destinationBack="/inventory/umPurchase" />
        <Main>
          <Formik
            initialValues={{
              purchaseUM: '',
              transformationUM: '',
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
        </Main>
      </Container>
    </>
  );
};

export default RegisterUMPurchase;
