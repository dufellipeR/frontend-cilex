import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { FiSave } from 'react-icons/fi';

import api from '../../../../services/api';
import camera from '../../../../assets/camera.svg';

import Button from '../../../../components/Button';
import Header from '../../../../components/Header';
import Input from '../../../../components/Input';
import ButtonBack from '../../../../components/ButtonBack';
import Select from '../../../../components/Select';

import { Container, Main, FormCustom, ContainerInputFile } from './styles';

interface RegisterGroupForm {
  code: string;
  description: string;
  type: string;

  group: string;
  subGroup: string;

  family: string;
  subFamily: string;

  application: string;
  dimension: string;

  umPurchase: string;
  umUse: string;

  technicalDescription: string;
  techicalDrawing: any;
  photo: any;
}

const formSchemaGroup = Yup.object().shape({
  code: Yup.string().required('Código Obrigatório'),
  description: Yup.string().required('Grupo Obrigatório'),
  type: Yup.string().required(),

  group: Yup.string().required(),
  subGroup: Yup.string().required(),

  family: Yup.string().required(),
  subFamily: Yup.string().required(),

  application: Yup.string().required(),
  dimension: Yup.string().required(),

  umPurchase: Yup.string().required(),
  umUse: Yup.string().required(),

  technicalDescription: Yup.string().required('Descrição Técnica Obrigatória'),
  techicalDrawing: Yup.mixed().required('Desenho Técnico Obrigatório'),

  photo: Yup.mixed().required('Foto Obrigatória'),
});

const types = [
  { id: 1, name: 'Tipo 1' },
  { id: 2, name: 'Tipo 2' },
  { id: 3, name: 'Tipo 3' },
];

const RegisterGroup: React.FC = () => {
  const history = useHistory();

  const [statePhoto, setStatePhoto] = useState<any>(null);
  const [stateTechicalDrawing, setStateTechnicalDrawing] = useState<any>(null);

  const previewPhoto = useMemo(() => {
    return statePhoto ? URL.createObjectURL(statePhoto) : null;
  }, [statePhoto]);

  const previewTechicalDrawing = useMemo(() => {
    return stateTechicalDrawing
      ? URL.createObjectURL(stateTechicalDrawing)
      : null;
  }, [stateTechicalDrawing]);

  const handleSubmitForm = useCallback(
    async (data: RegisterGroupForm) => {
      try {
        const {
          code,
          description,
          type,
          group,
          subGroup,
          family,
          subFamily,
          application,
          dimension,
          umPurchase,
          umUse,
          technicalDescription,
          techicalDrawing,
          photo,
        } = data;

        api
          .post('/group', {
            code: String(code),
            description,
            type,
            group,
            subGroup,
            family,
            subFamily,
            application,
            dimension,
            umPurchase,
            umUse,
            technicalDescription,
            techicalDrawing,
            photo,
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            history.push('/inventory/group');
          });
      } catch (err) {
        toast.error('Ocorreu um erro no registro do Grupo!');
      }
    },
    [history],
  );

  return (
    <>
      <Container>
        <Header pageName="Registro do Produto" />
        <ButtonBack destinationBack="/inventory/product" />
        <Main>
          <Formik
            initialValues={{
              code: '',
              description: '',
              type: '',
              group: '',
              subGroup: '',
              family: '',
              subFamily: '',
              application: '',
              dimension: '',
              umPurchase: '',
              umUse: '',
              technicalDescription: '',
              techicalDrawing: null,
              photo: null,
            }}
            validationSchema={formSchemaGroup}
            onSubmit={handleSubmitForm}
          >
            {({
              handleChange,
              touched,
              values,
              errors,
              handleSubmit,
              setFieldValue,
            }) => (
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
                    placeholder="Descrição"
                    value={values.description}
                    onChange={handleChange('description')}
                    messageError={
                      errors.description && touched.description
                        ? errors.description
                        : ''
                    }
                  />
                  <Select
                    name="type"
                    value={values.type}
                    onChange={handleChange('type')}
                    messageError={
                      errors.type && touched.type ? errors.type : ''
                    }
                  >
                    <option value="">Tipo</option>
                    {types.map(type => (
                      <option value={type.name}>{type.name}</option>
                    ))}
                  </Select>
                  <Select
                    name="group"
                    value={values.group}
                    onChange={handleChange('group')}
                    messageError={
                      errors.group && touched.group ? errors.group : ''
                    }
                  >
                    <option value="">Grupo</option>
                    {types.map(type => (
                      <option value={type.id}>{type.name}</option>
                    ))}
                  </Select>
                  <Select
                    name="subGroup"
                    value={values.subGroup}
                    onChange={handleChange('subGroup')}
                    messageError={
                      errors.subGroup && touched.subGroup ? errors.subGroup : ''
                    }
                  >
                    <option value="">Sub-Grupo</option>
                    {types.map(type => (
                      <option value={type.id}>{type.name}</option>
                    ))}
                  </Select>
                  <Select
                    name="family"
                    value={values.family}
                    onChange={handleChange('family')}
                    messageError={
                      errors.family && touched.family ? errors.family : ''
                    }
                  >
                    <option value="">Família</option>
                    {types.map(type => (
                      <option value={type.id}>{type.name}</option>
                    ))}
                  </Select>
                  <Select
                    name="subFamily"
                    value={values.subFamily}
                    onChange={handleChange('subFamily')}
                    messageError={
                      errors.subFamily && touched.subFamily
                        ? errors.subFamily
                        : ''
                    }
                  >
                    <option value="">Sub-Família</option>
                    {types.map(type => (
                      <option value={type.id}>{type.name}</option>
                    ))}
                  </Select>
                  <Select
                    name="application"
                    value={values.application}
                    onChange={handleChange('application')}
                    messageError={
                      errors.application && touched.application
                        ? errors.application
                        : ''
                    }
                  >
                    <option value="">Aplicação</option>
                    {types.map(type => (
                      <option value={type.id}>{type.name}</option>
                    ))}
                  </Select>
                  <Select
                    name="dimension"
                    value={values.dimension}
                    onChange={handleChange('dimension')}
                    messageError={
                      errors.dimension && touched.dimension
                        ? errors.dimension
                        : ''
                    }
                  >
                    <option value="">Dimensão do Produto</option>
                    {types.map(type => (
                      <option value={type.id}>{type.name}</option>
                    ))}
                  </Select>
                  <Select
                    name="umPurchase"
                    value={values.umPurchase}
                    onChange={handleChange('umPurchase')}
                    messageError={
                      errors.umPurchase && touched.umPurchase
                        ? errors.umPurchase
                        : ''
                    }
                  >
                    <option value="">Unidade de Medida de Compra</option>
                    {types.map(type => (
                      <option value={type.id}>{type.name}</option>
                    ))}
                  </Select>
                  <Select
                    name="umUse"
                    value={values.umUse}
                    onChange={handleChange('umUse')}
                    messageError={
                      errors.umUse && touched.umUse ? errors.umUse : ''
                    }
                  >
                    <option value="">Unidade de Medida de Uso</option>
                    {types.map(type => (
                      <option value={type.id}>{type.name}</option>
                    ))}
                  </Select>
                  <Input
                    name="technicalDescription"
                    type="text"
                    placeholder="Descrição Técnica"
                    value={values.technicalDescription}
                    onChange={handleChange('technicalDescription')}
                    messageError={
                      errors.technicalDescription &&
                      touched.technicalDescription
                        ? errors.technicalDescription
                        : ''
                    }
                  />
                  <ContainerInputFile
                    style={{
                      backgroundImage: `url(${previewTechicalDrawing})`,
                    }}
                    hasThumb={stateTechicalDrawing}
                  >
                    <p>Desenho Técnico</p>
                    <input
                      id="techicalDrawing"
                      name="techicalDrawing"
                      type="file"
                      onChange={event => {
                        setStateTechnicalDrawing(event.target.files![0]);
                        setFieldValue(
                          'techicalDrawing',
                          event.target.files![0],
                        );
                      }}
                    />
                    <img src={camera} alt="Select img" />
                  </ContainerInputFile>
                  <ContainerInputFile
                    style={{ backgroundImage: `url(${previewPhoto})` }}
                    hasThumb={statePhoto}
                  >
                    <p>Foto</p>
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      onChange={event => {
                        setStatePhoto(event.target.files![0]);
                        setFieldValue('photo', event.target.files![0]);
                      }}
                    />
                    <img src={camera} alt="Select img" />
                  </ContainerInputFile>
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

export default RegisterGroup;
