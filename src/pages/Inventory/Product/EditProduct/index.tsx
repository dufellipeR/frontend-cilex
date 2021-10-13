import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';

import api from '../../../../services/api';
import camera from '../../../../assets/camera.svg';
import { theme } from '../../../../App';
import { useCrudModules } from '../../../../hooks/useCrudModules';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import ButtonBack from '../../../../components/ButtonBack';
import ModalDelete from '../../../../components/ModalDelete';
import Select from '../../../../components/Select';

import {
  Container,
  Main,
  HeaderContent,
  ContainerProductData,
  InfoCard,
  FormCustom,
  ContainerInputFile,
} from './styles';

interface RegisterProductForm {
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

const formSchemaProduct = Yup.object().shape({
  code: Yup.string(),
  description: Yup.string(),
  type: Yup.string(),

  group: Yup.string(),
  subGroup: Yup.string(),

  family: Yup.string(),
  subFamily: Yup.string(),

  application: Yup.string(),
  dimension: Yup.string(),

  umPurchase: Yup.string(),
  umUse: Yup.string(),

  technicalDescription: Yup.string(),
  techicalDrawing: Yup.mixed(),

  photo: Yup.mixed(),
});

const types = [
  { id: 'Tipo 1', name: 'Tipo 1' },
  { id: 'Tipo 2', name: 'Tipo 2' },
  { id: 'Tipo 3', name: 'Tipo 3' },
];

const EditProduct: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const { deleteDataFromModule } = useCrudModules();

  const [statePhoto, setStatePhoto] = useState<any>(null);
  const [stateTechicalDrawing, setStateTechnicalDrawing] = useState<any>(null);

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [product, setProduct] = useState<RegisterProductForm | null>({
    code: '1000',
    description: 'Shampoo',
    type: 'Asd',

    group: 'Tipo 1',
    subGroup: 'Tipo 2',

    family: 'Tipo 3',
    subFamily: 'Tipo 2',

    application: 'Tipo 1',
    dimension: 'Tipo 2',

    umPurchase: 'Tipo 3',
    umUse: 'Tipo 3',

    technicalDescription: 'Tipo 3',
    techicalDrawing: null,
    photo: null,
  });

  useEffect(() => {
    api.get<RegisterProductForm | null>(`/product/${id}`).then(response => {
      setProduct(response.data);
    });
  }, [id]);

  const previewPhoto = useMemo(() => {
    return statePhoto ? URL.createObjectURL(statePhoto) : null;
  }, [statePhoto]);

  const previewTechicalDrawing = useMemo(() => {
    return stateTechicalDrawing
      ? URL.createObjectURL(stateTechicalDrawing)
      : null;
  }, [stateTechicalDrawing]);

  const handleSubmitForm = useCallback(
    async (data: RegisterProductForm) => {
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
          .put(`/product/${id}`, {
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
            toast.success('Atualizado com sucesso');
            history.push('/inventory');
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Produto!');
      }
    },
    [history, id],
  );

  return (
    <>
      <Container>
        <Header pageName="Editar Produto" />
        {product && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/inventory" />
              </div>
              <div id="container-titles">
                <h2>{product.code}</h2>
                <p>{product.description}</p>
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
                  <HiOutlineTrash size={24} color={theme.main} />
                </Button>
              </div>
            </HeaderContent>

            <ContainerProductData>
              <InfoCard>
                <h4>Grupo</h4>
                <span> {product.group}</span>
                <span> {product.subGroup}</span>
              </InfoCard>
              <InfoCard>
                <h4>Família</h4>
                <span>{product.family}</span>
                <span>{product.subFamily}</span>
              </InfoCard>
              <InfoCard>
                <h4>Quantidades</h4>
                <span>{product.application}</span>
                <span>{product.dimension}</span>
              </InfoCard>
              <InfoCard />
              <InfoCard>
                <h4>Medidas</h4>
                <span>{product.umPurchase}</span>
                <span>{product.umUse}</span>
              </InfoCard>
              <InfoCard />
            </ContainerProductData>

            {editting && (
              <Formik
                initialValues={{
                  code: product.code,
                  description: product.description,
                  type: product.type,
                  group: product.group,
                  subGroup: product.subGroup,
                  family: product.family,
                  subFamily: product.subFamily,
                  application: product.application,
                  dimension: product.dimension,
                  umPurchase: product.umPurchase,
                  umUse: product.umUse,
                  technicalDescription: product.technicalDescription,
                  techicalDrawing: null,
                  photo: null,
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
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
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
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </Select>
                      <Select
                        name="subGroup"
                        value={values.subGroup}
                        onChange={handleChange('subGroup')}
                        messageError={
                          errors.subGroup && touched.subGroup
                            ? errors.subGroup
                            : ''
                        }
                      >
                        <option value="">Sub-Grupo</option>
                        {types.map(type => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
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
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
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
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
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
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
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
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
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
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
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
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
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
            )}
          </Main>
        )}
      </Container>
      <ModalDelete
        visible={showModalDelete}
        setVisible={setShowModalDelete}
        actionToDelete={() => {
          deleteDataFromModule({
            id,
            route: 'product',
            routePush: 'inventory',
          });
        }}
      />
    </>
  );
};

export default EditProduct;
