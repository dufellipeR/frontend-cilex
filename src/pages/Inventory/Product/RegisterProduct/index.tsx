import React, { useCallback, useMemo, useState, useEffect } from 'react';
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

interface RegisterProductForm {
  code: string;
  description: string;

  type_id: string;

  group_id: string;
  subgroup_id: string;

  family_id: string;
  subfamily_id: string;

  application_id: string;
  dimensions_id: string;

  umc_id: string;
  umu_id: string;

  technical_description: string;
  technical_picture: any;
  picture: any;
}

const formSchemaProduct = Yup.object().shape({
  code: Yup.string().required('Código Obrigatório'),
  description: Yup.string().required('Descrição Obrigatória'),
  type_id: Yup.string().required(),

  group_id: Yup.string().required(),
  subgroup_id: Yup.string().required(),

  family_id: Yup.string().required(),
  subfamily_id: Yup.string().required(),

  application_id: Yup.string().required(),
  dimensions_id: Yup.string().required(),

  umc_id: Yup.string().required(),
  umu_id: Yup.string().required(),

  technical_description: Yup.string(),
  technical_picture: Yup.mixed(),
  picture: Yup.mixed(),
});

const RegisterGroup: React.FC = () => {
  const history = useHistory();

  const [types, setTypes] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [families, setFamilies] = useState<any[]>([]);
  const [unitMeasures, setUnitMeasures] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState<any[]>([]);
  const [subGroups, setSubGroups] = useState<any[]>([]);
  const [subFamilies, setSubFamilies] = useState<any[]>([]);

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

  useEffect(() => {
    api.get('/product_type').then(response => {
      setTypes(response.data);
    });
    api.get('/product_group').then(response => {
      setGroups(response.data);
    });
    api.get('/product_family').then(response => {
      setFamilies(response.data);
    });
    api.get('/product_um').then(response => {
      setUnitMeasures(response.data);
    });
    api.get('/product_application').then(response => {
      setApplications(response.data);
    });
    api.get('/product_dimension').then(response => {
      setDimensions(response.data);
    });
    api.get('/product_subgroup').then(response => {
      setSubGroups(response.data);
    });
    api.get('/product_subfamily').then(response => {
      setSubFamilies(response.data);
    });
  }, []);

  const handleSubmitForm = useCallback(
    async (data: RegisterProductForm) => {
      try {
        const {
          code,
          description,
          type_id,
          group_id,
          subgroup_id,
          family_id,
          subfamily_id,
          application_id,
          dimensions_id,
          umc_id,
          umu_id,
          technical_description,
          technical_picture,
          picture,
        } = data;

        api
          .post('/product', {
            code,
            description,
            type_id,
            group_id,
            subgroup_id,
            family_id,
            subfamily_id,
            application_id,
            dimensions_id,
            umc_id,
            umu_id,
            technical_description,
            // technical_picture, -> error: must be a string
            // picture, -> error: must be a string
          })
          .then(() => {
            toast.success('Registrado com sucesso');
            history.push('/inventory/product');
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
              type_id: '',
              group_id: '',
              subgroup_id: '',
              family_id: '',
              subfamily_id: '',
              application_id: '',
              dimensions_id: '',
              umc_id: '',
              umu_id: '',
              technical_description: '',
              technical_picture: null,
              picture: null,
            }}
            validationSchema={formSchemaProduct}
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
                    name="type_id"
                    value={values.type_id}
                    onChange={handleChange('type_id')}
                    messageError={
                      errors.type_id && touched.type_id ? errors.type_id : ''
                    }
                  >
                    <option value="">Tipo</option>
                    {types.map(type => (
                      <option value={type.id}>{type.description}</option>
                    ))}
                  </Select>
                  <Select
                    name="group_id"
                    value={values.group_id}
                    onChange={handleChange('group_id')}
                    messageError={
                      errors.group_id && touched.group_id ? errors.group_id : ''
                    }
                  >
                    <option value="">Grupo</option>
                    {groups.map(group => (
                      <option value={group.id}>{group.description}</option>
                    ))}
                  </Select>
                  <Select
                    name="subgroup_id"
                    value={values.subgroup_id}
                    onChange={handleChange('subgroup_id')}
                    messageError={
                      errors.subgroup_id && touched.subgroup_id
                        ? errors.subgroup_id
                        : ''
                    }
                  >
                    <option value="">Sub-Grupo</option>
                    {subGroups.map(group => (
                      <option value={group.id}>{group.description}</option>
                    ))}
                  </Select>
                  <Select
                    name="family_id"
                    value={values.family_id}
                    onChange={handleChange('family_id')}
                    messageError={
                      errors.family_id && touched.family_id
                        ? errors.family_id
                        : ''
                    }
                  >
                    <option value="">Família</option>
                    {families.map(family => (
                      <option value={family.id}>{family.description}</option>
                    ))}
                  </Select>
                  <Select
                    name="subfamily_id"
                    value={values.subfamily_id}
                    onChange={handleChange('subfamily_id')}
                    messageError={
                      errors.subfamily_id && touched.subfamily_id
                        ? errors.subfamily_id
                        : ''
                    }
                  >
                    <option value="">Sub-Família</option>
                    {subFamilies.map(family => (
                      <option value={family.id}>{family.description}</option>
                    ))}
                  </Select>
                  <Select
                    name="application_id"
                    value={values.application_id}
                    onChange={handleChange('application_id')}
                    messageError={
                      errors.application_id && touched.application_id
                        ? errors.application_id
                        : ''
                    }
                  >
                    <option value="">Aplicação</option>
                    {applications.map(application => (
                      <option value={application.id}>
                        {application.description}
                      </option>
                    ))}
                  </Select>
                  <Select
                    name="dimensions_id"
                    value={values.dimensions_id}
                    onChange={handleChange('dimensions_id')}
                    messageError={
                      errors.dimensions_id && touched.dimensions_id
                        ? errors.dimensions_id
                        : ''
                    }
                  >
                    <option value="">Dimensão do Produto</option>
                    {dimensions.map(dimension => (
                      <option value={dimension.id}>
                        {dimension.description}
                      </option>
                    ))}
                  </Select>
                  <Select
                    name="umc_id"
                    value={values.umc_id}
                    onChange={handleChange('umc_id')}
                    messageError={
                      errors.umc_id && touched.umc_id ? errors.umc_id : ''
                    }
                  >
                    <option value="">Unidade de Medida de Compra</option>
                    {unitMeasures.map(unit => (
                      <option value={unit.id}>{unit.description}</option>
                    ))}
                  </Select>
                  <Select
                    name="umu_id"
                    value={values.umu_id}
                    onChange={handleChange('umu_id')}
                    messageError={
                      errors.umu_id && touched.umu_id ? errors.umu_id : ''
                    }
                  >
                    <option value="">Unidade de Medida de Uso</option>
                    {unitMeasures.map(unit => (
                      <option value={unit.id}>{unit.description}</option>
                    ))}
                  </Select>
                  <Input
                    name="technical_description"
                    type="text"
                    placeholder="Descrição Técnica"
                    value={values.technical_description}
                    onChange={handleChange('technical_description')}
                    messageError={
                      errors.technical_description &&
                      touched.technical_description
                        ? errors.technical_description
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
                      id="technical_picture"
                      name="technical_picture"
                      type="file"
                      onChange={event => {
                        setStateTechnicalDrawing(event.target.files![0]);
                        setFieldValue(
                          'technical_picture',
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
                      id="picture"
                      name="picture"
                      type="file"
                      onChange={event => {
                        setStatePhoto(event.target.files![0]);
                        setFieldValue('picture', event.target.files![0]);
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
