/* eslint-disable react/destructuring-assignment */
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import Select, { components } from 'react-select';

import api from '../../services/api';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Input from '../../components/Input';
import ButtonBack from '../../components/ButtonBack';
import CustomSelect from '../../components/CustomSelect';

import { Container, Main, FormCustom } from './styles';

const { Option } = components;

interface RegisterUserGroupForm {
  code: string;
  description: string;
  modules: string[];
}

interface OptionsProps {
  value: string;
  label: string;
  classIcon: string;
}

// const MultiValueOption = (props: any) => {
//   return (
//     <Option
//       {...props}
//       getStyles={(styles: any) => {
//         return {
//           ...styles,
//           display: 'flex',
//           alignItems: 'center',
//           gap: '0.5rem',
//           fontSize: '1.5rem',
//           padding: '1rem',
//           marginTop: '-1rem',
//         };
//       }}
//     >
//       <i className={props.data.classIcon} />
//       <span>{props.data.label}</span>
//     </Option>
//   );
// };

const RegisterUserGroup: React.FC = () => {
  const history = useHistory();

  const formSchemaUserGroup = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório'),
    description: Yup.string().required('Descrição Obrigatória'),
    // eslint-disable-next-line react/forbid-prop-types
    modules: Yup.array().of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }),
    ),
  });

  const handleSubmitForm = useCallback(
    async (data: RegisterUserGroupForm) => {
      try {
        const { code, description, modules } = data;

        console.log('MÓDULOS: ', modules);

        // api
        //   .post('/group', {
        //     code: String(code),
        //     description,
        //   })
        //   .then(() => {
        //     toast.success('Registrado com sucesso');
        //     history.push('/group');
        //   });
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Grupo de Usuários!');
      }
    },
    [history],
  );

  const modulesList = [
    {
      value: '1',
      label: 'Financeiro',
      classIcon: 'bi bi-currency-dollar',
    },
    {
      value: '2',
      label: 'Logística',
      classIcon: 'bi bi-truck',
    },
    {
      value: '3',
      label: 'CRM',
      classIcon: 'bi bi-truck',
    },
    {
      value: '4',
      label: 'Pessoas',
      classIcon: 'bi bi-person',
    },
    {
      value: '5',
      label: 'Empresas',
      classIcon: 'bi bi-building',
    },
    {
      value: '6',
      label: 'Parâmetros Gerais',
      classIcon: 'bi bi-globe',
    },
    {
      value: '7',
      label: 'Cargos e Funções',
      classIcon: 'bi bi-wrench',
    },
    {
      value: '8',
      label: 'Usuários',
      classIcon: 'bi bi-person-circle',
    },
    {
      value: '9',
      label: 'Grupo de Usuários',
      classIcon: 'bi bi-people',
    },
    {
      value: '10',
      label: 'Módulos',
      classIcon: 'bi bi-box',
    },
  ];

  return (
    <>
      <Container>
        <Header pageName="Registro de Grupo de Usuários" />
        <ButtonBack destinationBack="/group" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              description: '',
              modules: [],
            }}
            validationSchema={formSchemaUserGroup}
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
                    placeholder="Grupo"
                    value={values.description}
                    onChange={handleChange('description')}
                    messageError={
                      errors.description && touched.description
                        ? errors.description
                        : ''
                    }
                  />
                  <Field
                    className="select-custom"
                    name="modules"
                    options={modulesList}
                    component={CustomSelect}
                    placeholder="Módulos"
                    isMulti
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

export default RegisterUserGroup;
