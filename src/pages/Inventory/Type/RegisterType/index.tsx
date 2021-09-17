import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';
import Switch from 'react-switch';

import { theme } from '../../../../App';
import api from '../../../../services/api';

import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import Input from '../../../../components/Input';
import ButtonBack from '../../../../components/ButtonBack';

import { Container, Main, FormCustom } from './styles';

interface RegisterTypeForm {
  code: string;
  description: string;
  acceptStructure: boolean;
}

const RegisterType: React.FC = () => {
  const [acceptStructure, setAcceptStructure] = useState(false);

  const history = useHistory();

  const formSchemaType = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório'),
    description: Yup.string().required('Descrição Obrigatório'),
    acceptStructure: Yup.boolean(),
  });

  const handleSubmitForm = useCallback(
    async (data: RegisterTypeForm) => {
      try {
        const { code, description } = data;
        api
          .post('/type', {
            code: String(code),
            description,
            acceptStructure,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            history.push('/inventory/type');
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Tipo!');
      }
    },
    [history, acceptStructure],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Tipo" />
        <ButtonBack destinationBack="/inventory/type" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              description: '',
              acceptStructure: false,
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
        </Main>
      </Container>
    </>
  );
};

export default RegisterType;
