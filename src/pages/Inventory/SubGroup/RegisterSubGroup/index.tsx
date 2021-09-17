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

interface RegisterSubGroupForm {
  code: string;
  description: string;
}

const RegisterSubGroup: React.FC = () => {
  const history = useHistory();

  const formSchemaSubGroup = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório'),
    description: Yup.string().required('Descrição Obrigatório'),
  });

  const handleSubmitForm = useCallback(
    async (data: RegisterSubGroupForm) => {
      try {
        const { code, description } = data;
        api
          .post('/subgroup', {
            code: String(code),
            description,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            history.push('/inventory/subgroup');
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Sub-Grupo!');
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro de Sub-Grupo" />
        <ButtonBack destinationBack="/inventory/subgroup" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              description: '',
            }}
            validationSchema={formSchemaSubGroup}
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
                    placeholder="Sub-Grupo"
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

export default RegisterSubGroup;
