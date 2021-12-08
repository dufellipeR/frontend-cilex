import React, {
  useCallback,
  useEffect,
  useState,
  useContext,
  useMemo,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Field, Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { ThemeContext } from 'styled-components';
import Switch from 'react-switch';

import api from '../../../../services/api';
import camera from '../../../../assets/camera.svg';
import { useCrudModules } from '../../../../hooks/useCrudModules';

import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import ButtonBack from '../../../../components/ButtonBack';
import ModalDelete from '../../../../components/ModalDelete';
import Select from '../../../../components/Select';
import CustomSelect from '../../../../components/CustomSelect';

import {
  Container,
  Main,
  HeaderContent,
  FormCustom,
  ContainerSwitch,
  ContainerInputFile,
  ContainerInputDate,
} from './styles';

interface Vacines {
  label: string;
  value: string;
}

interface People {
  id: string;
  nome: string;
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
  vacine: string[];
  owner: string;
  note: string;
}

const EditPet: React.FC = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const { colors } = useContext(ThemeContext);
  const { deleteDataFromModule } = useCrudModules();

  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [pet, setPet] = useState<RegisterPetForm>({
    name: 'Zeca',
    picture: '',
    breed: 'Vira-Lata',
    birthDate: '25/11/2021',
    gender: 'M',
    sociable: true,
    castrated: true,
    acessories: 'Nenhum',
    location: 'Gaiola 10',
    vacine: ['CV19', 'CV20'],
    owner: 'Arthur',
    note: 'Bravo',
  });

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
    // api.get<RegisterPetForm>(`/pet/${id}`).then(response => {
    //   setPet(response.data);
    // });
  }, [id]);

  const handleSubmitForm = useCallback(
    async (data: RegisterPetForm) => {
      try {
        const {
          name,
          picture,
          breed,
          birthDate,
          gender,
          sociable,
          castrated,
          acessories,
          location,
          vacine,
          owner,
          note,
        } = data;

        api
          .put(`/pet/${id}`, {
            name,
            picture,
            breed,
            birthDate,
            gender,
            sociable,
            castrated,
            acessories,
            location,
            vacine,
            owner,
            note,
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            history.push('/pet');
          })
          .catch(error => {
            const dataError = error.response.data;

            if (
              dataError.message ===
              "There's already an entity registered with the same code"
            ) {
              toast.error('Já existe um cargo cadastrado com o mesmo código!');
            }

            return error;
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização do Cargo!');
      }
    },
    [history, id],
  );

  const formSchemaPetEdit = Yup.object().shape({
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

  return (
    <>
      <Container>
        <Header pageName="Editar Pet" />
        {pet && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <ButtonBack destinationBack="/pet/pets" />
              </div>
              <div id="container-titles">
                <h2>{pet.name}</h2>
                <p>{pet.gender === 'M' ? 'Macho' : 'Fêmea'}</p>
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
                  <HiOutlineTrash size={24} color={colors.main} />
                </Button>
              </div>
            </HeaderContent>

            {editting && (
              <Formik
                initialValues={{
                  name: pet.name,
                  picture: pet.picture,
                  breed: pet.breed,
                  birthDate: pet.birthDate,
                  gender: pet.gender,
                  sociable: pet.sociable,
                  castrated: pet.castrated,
                  acessories: pet.acessories,
                  location: pet.location,
                  vacine: pet.vacine,
                  owner: pet.owner,
                  note: pet.note,
                }}
                validationSchema={formSchemaPetEdit}
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
            )}
          </Main>
        )}
      </Container>
      <ModalDelete
        visible={showModalDelete}
        setVisible={setShowModalDelete}
        actionToDelete={() => {
          deleteDataFromModule({ id, route: 'role', routePush: 'role' });
        }}
      />
    </>
  );
};

export default EditPet;
