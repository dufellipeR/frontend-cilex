import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  useMemo,
} from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Switch from 'react-switch';
import { ThemeContext } from 'styled-components';

import api from '../../../services/api';
import camera from '../../../assets/camera.svg';

import Header from '../../../components/Header';
import ButtonBack from '../../../components/ButtonBack';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import CustomSelect from '../../../components/CustomSelect';

import {
  Container,
  Main,
  FormCustom,
  ContainerSwitch,
  ContainerInputFile,
  ContainerInputDate,
} from './styles';

interface Vacines {
  label: string;
  value: string;
}

interface RegisterPetForm {
  name: string;
  picture: string;
  breed: string;
  birthDate: string;
  gender: string;
  sociable: boolean;
  castrated: boolean;
  acessories: string;
  location: string;
  vacine: Vacines[];
  owner: string;
  note: string;
}

interface People {
  id: string;
  nome: string;
}

const formSchemaPet = Yup.object().shape({
  name: Yup.string().required('Nome Obrigatório'),
  picture: Yup.mixed(),
  breed: Yup.string(),
  birthDate: Yup.string(),
  gender: Yup.string().required('Gênero Obrigatório'),
  sociable: Yup.boolean(),
  castrated: Yup.boolean(),
  acessories: Yup.string(),
  location: Yup.string(),
  // eslint-disable-next-line react/forbid-prop-types
  vacine: Yup.array(),
  owner: Yup.string(),
  note: Yup.string(),
});

const RegisterPet: React.FC = () => {
  const { colors } = useContext(ThemeContext);

  const [peoples, setPeoples] = useState<People[]>([]);
  const [petPicture, setPetPicture] = useState<any>(null);

  const listVacines = [
    { label: 'Covid-19', value: 'CV19' },
    { label: 'Covid-20', value: 'CV20' },
    { label: 'Covid-21', value: 'CV21' },
  ];

  const previewPetPicture = useMemo(() => {
    return petPicture ? URL.createObjectURL(petPicture) : null;
  }, [petPicture]);

  useEffect(() => {
    api.get('/person').then(response => {
      setPeoples(response.data);
    });
  }, []);

  const handleSubmitForm = useCallback(async (data: RegisterPetForm) => {
    try {
      console.log(data);
    } catch (err) {
      toast.error('Ocorreu um erro no registro do Pet');
    }
  }, []);

  return (
    <>
      <Container>
        <Header pageName="Registro de Pet" />
        <ButtonBack destinationBack="/pet" />
        <Main>
          <Formik
            initialValues={{
              name: '',
              picture: '',
              breed: '',
              birthDate: '',
              gender: '',
              sociable: false,
              castrated: false,
              acessories: '',
              location: '',
              vacine: [],
              owner: '',
              note: '',
            }}
            validationSchema={formSchemaPet}
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
                    name="name"
                    type="text"
                    placeholder="Nome"
                    value={values.name}
                    onChange={handleChange('name')}
                    messageError={
                      errors.name && touched.name ? errors.name : ''
                    }
                  />
                  <Input
                    name="breed"
                    type="text"
                    placeholder="Raça"
                    value={values.breed}
                    onChange={handleChange('breed')}
                    messageError={
                      errors.breed && touched.breed ? errors.breed : ''
                    }
                  />
                  <ContainerInputDate>
                    <p>Nascimento: </p>
                    <input
                      type="date"
                      name="birthDate"
                      value={values.birthDate}
                      onChange={handleChange('birthDate')}
                    />
                  </ContainerInputDate>
                  <Select
                    name="gender"
                    value={values.gender}
                    onChange={handleChange('gender')}
                    messageError={
                      errors.gender && touched.gender ? errors.gender : ''
                    }
                  >
                    <option value="">Gênero</option>
                    <option value="M">Macho</option>
                    <option value="F">Fêmea</option>
                  </Select>
                  <Select
                    name="location"
                    value={values.location}
                    onChange={handleChange('location')}
                  >
                    <option value="">Localização</option>
                    <option value="G">Gaiola</option>
                    <option value="P">Pátio</option>
                  </Select>
                  <Field
                    className="select-custom"
                    name="vacine"
                    options={listVacines}
                    component={CustomSelect}
                    placeholder="Vacinas"
                    isMulti
                  />
                  <Select
                    name="owner"
                    value={values.owner}
                    onChange={handleChange('owner')}
                  >
                    <option value="">Dono</option>
                    {peoples.map(people => (
                      <option value={people.id}>{people.nome}</option>
                    ))}
                  </Select>
                  <Input
                    name="acessories"
                    type="text"
                    placeholder="Acessórios"
                    value={values.acessories}
                    onChange={handleChange('acessories')}
                    messageError={
                      errors.acessories && touched.acessories
                        ? errors.acessories
                        : ''
                    }
                  />
                  <ContainerSwitch>
                    <p>Sociável ?</p>
                    <Switch
                      onChange={() => {
                        if (values.sociable === false) {
                          setFieldValue('sociable', true);
                        } else {
                          setFieldValue('sociable', false);
                        }
                      }}
                      checked={values.sociable}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor={colors.main}
                    />
                  </ContainerSwitch>
                  <ContainerSwitch>
                    <p>Castrado ?</p>
                    <Switch
                      onChange={() => {
                        if (values.castrated === false) {
                          setFieldValue('castrated', true);
                        } else {
                          setFieldValue('castrated', false);
                        }
                      }}
                      checked={values.castrated}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor={colors.main}
                    />
                  </ContainerSwitch>
                  <textarea
                    cols={30}
                    placeholder="Observações"
                    name="note"
                    value={values.note}
                    onChange={handleChange('note')}
                  />
                  <ContainerInputFile
                    style={{
                      backgroundImage: `url(${previewPetPicture})`,
                    }}
                    hasThumb={petPicture}
                  >
                    <p>Foto do Pet</p>
                    <input
                      id="picture"
                      name="picture"
                      type="file"
                      onChange={e => {
                        if (e.target.files) {
                          setPetPicture(e.target.files[0]);
                          setFieldValue('picture', e.target.files[0]);
                        }
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

export default RegisterPet;
