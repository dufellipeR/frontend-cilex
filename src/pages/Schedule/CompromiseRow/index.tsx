import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { BsCheck, BsTrash } from 'react-icons/bs';
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Formik } from 'formik';

import api from '../../../services/api';

import Select from '../../../components/Select';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';

import {
  Container,
  InsideContainer,
  ServiceIdentifier,
  AlignTexts,
  FormCustom,
  ContainerInputDate,
  ContainerButtonsActions,
  ButtonActions,
  ContainerButtonsModal,
} from './styles';
import Input from '../../../components/Input';

interface CompromiseRowProps {
  compromise: {
    id: string;
    date: string;
    hour: string;
    done: boolean;
    work: {
      id: string;
      color: string;
      description: string;
    };
    pet: {
      id: string;
      name: string;
    };
    owner: {
      id: string;
      nome: string;
      endereco: string;
    };
  };
  showDetail: boolean;
}
interface Works {
  id: string;
  description: string;
  color: string;
}

interface Pets {
  id: string;
  name: string;
}

interface CompromiseSelected {
  id: string;
  date: string;
  hour: string;
  work_id: string;
  pet_id: string;
  done: boolean;
  recurrence?: string;
}

interface CompromiseForm {
  date: string;
  hour: string;
  work_id: string;
  pet_id: string;
  recurrence?: string;
  done: boolean;
}

const CompromiseRow: React.FC<CompromiseRowProps> = ({
  compromise,
  showDetail,
}) => {
  const { colors } = useContext(ThemeContext);

  const [works, setWorks] = useState<Works[]>([]);
  const [pets, setPets] = useState<Pets[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [compromiseSelected, setCompromiseSelected] = useState(
    {} as CompromiseSelected,
  );

  const handleFinishedCompromise = (id: string) => {
    api.get('/work').then(response => {
      setWorks(response.data);
    });
    api.get('/pet').then(response => {
      setPets(response.data);
    });
    api.get(`/appointments/${id}`).then(response => {
      setCompromiseSelected(response.data);
    });

    setTimeout(() => {
      setModalVisible(true);
    }, 1000);
  };

  const handleDeleteCompromise = (id: string) => {
    api
      .delete(`/appointments/${id}`)
      .then(() => {
        toast.success('Compromisso deletado.');
      })
      .catch(() => {
        toast.error('Erro na exclusão do Compromisso.');
      });
  };

  const handleSubmitForm = (data: CompromiseForm) => {
    const { date, hour, work_id, pet_id, recurrence } = data;

    const splitedDate = date.split('');

    const year = Number(
      `${splitedDate[0]}${splitedDate[1]}${splitedDate[2]}${splitedDate[3]}`,
    );
    const month = Number(`${splitedDate[5]}${splitedDate[6]}`) - 1;
    const day = Number(`${splitedDate[8]}${splitedDate[9]}`);

    const formatedDate = new Date(year, month, day).toLocaleDateString(); // dd/mm/yyyy

    if (compromiseSelected.recurrence) {
      api
        .put(`/appointments/${compromiseSelected.id}`, {
          date: compromiseSelected.date,
          hour: compromiseSelected.hour,
          work_id: compromiseSelected.work_id,
          pet_id: compromiseSelected.pet_id,
          done: true,
        })
        .then(() => {
          toast.success('Serviço concluído!');
        })
        .catch(() => {
          toast.error('Erro na conclusão do Serviço!');
        });
      api
        .post('/appointments', {
          date: formatedDate,
          hour,
          work_id,
          pet_id,
          done: false,
          recurrence,
        })
        .then(() => {
          toast.success('Serviço remarcado!');
        })
        .catch(() => {
          toast.error('Erro na remarcação do Serviço!');
        });
      setModalVisible(false);
    } else {
      api
        .put(`/appointments/${compromiseSelected.id}`, {
          date: compromiseSelected.date,
          hour: compromiseSelected.hour,
          work_id: compromiseSelected.work_id,
          pet_id: compromiseSelected.pet_id,
          done: true,
        })
        .then(() => {
          toast.success('Serviço concluído!');
          setModalVisible(false);
        })
        .catch(() => {
          toast.error('Erro na conclusão do Serviço!');
        });
    }
  };

  return (
    <>
      <Container done={compromise.done}>
        <InsideContainer>
          <ServiceIdentifier color={compromise.work.color} />

          <AlignTexts>
            <p>
              <b>{compromise.hour}</b> - {compromise.work.description}
            </p>

            {showDetail && (
              <>
                <p>Pet: {compromise.pet.name}</p>
                <p>Dono: {compromise.owner.nome}</p>
                <p>Endereço: {compromise.owner.endereco}</p>
              </>
            )}
          </AlignTexts>

          <ContainerButtonsActions>
            <ButtonActions
              disabled={compromise.done}
              onClick={() => handleFinishedCompromise(compromise.id)}
            >
              <BsCheck size={24} color={colors.main} />
            </ButtonActions>
            <ButtonActions
              disabled={compromise.done}
              onClick={() => setModalDeleteVisible(true)}
            >
              <BsTrash size={22} color="#F00" />
            </ButtonActions>
          </ContainerButtonsActions>
        </InsideContainer>
      </Container>
      {modalVisible && (
        <Modal visible={modalVisible} setVisible={setModalVisible}>
          <Formik
            initialValues={{
              date: compromiseSelected.date,
              hour: compromiseSelected.hour,
              pet_id: compromiseSelected.pet_id,
              work_id: compromiseSelected.work_id,
              done: true,
              recurrence: compromiseSelected.recurrence,
            }}
            // validationSchema={formSchemaCompromise}
            onSubmit={handleSubmitForm}
          >
            {({ handleChange, touched, values, errors, handleSubmit }) => (
              <FormCustom onSubmit={handleSubmit}>
                <ContainerInputDate>
                  <p>Data: </p>
                  <input
                    type="date"
                    name="date"
                    value={values.date}
                    onChange={handleChange('date')}
                    disabled={!compromiseSelected.recurrence}
                  />
                </ContainerInputDate>
                <Input
                  name="hour"
                  type="text"
                  placeholder="Hora"
                  value={values.hour}
                  onChange={handleChange('hour')}
                  messageError={errors.hour && touched.hour ? errors.hour : ''}
                  disabled={!compromiseSelected.recurrence}
                />
                <Select
                  name="pet_id"
                  value={values.pet_id}
                  onChange={handleChange('pet_id')}
                  messageError={
                    errors.pet_id && touched.pet_id ? errors.pet_id : ''
                  }
                  disabled={!compromiseSelected.recurrence}
                >
                  <option value="">Pet</option>
                  {pets.map(pet => (
                    <option key={pet.id} value={pet.id}>
                      {pet.name}
                    </option>
                  ))}
                </Select>
                <Select
                  name="work_id"
                  value={values.work_id}
                  onChange={handleChange('work_id')}
                  messageError={
                    errors.work_id && touched.work_id ? errors.work_id : ''
                  }
                  disabled={!compromiseSelected.recurrence}
                >
                  <option value="">Serviços</option>
                  {works.map(work => (
                    <option key={work.id} value={work.id}>
                      {work.description}
                    </option>
                  ))}
                </Select>
                {compromiseSelected.recurrence && (
                  <Select
                    name="recurrence"
                    value={values.recurrence}
                    onChange={handleChange('recurrence')}
                    messageError={
                      errors.recurrence && touched.recurrence
                        ? errors.recurrence
                        : ''
                    }
                  >
                    <option value="">Frequência</option>
                    <option value="7d">7 dias</option>
                    <option value="15d">15 dias</option>
                    <option value="30d">30 dias</option>
                  </Select>
                )}
                <Button layoutColor="button-green" type="submit">
                  <FiSave size={24} />
                  <span>
                    {compromiseSelected.recurrence
                      ? 'Concluir e Remarcar'
                      : 'Concuir'}
                  </span>
                </Button>
              </FormCustom>
            )}
          </Formik>
        </Modal>
      )}
      {modalDeleteVisible && (
        <Modal visible={modalDeleteVisible} setVisible={setModalDeleteVisible}>
          <h2 style={{ marginTop: '1rem' }}>
            Deseja excluir este compromisso ?
          </h2>

          <ContainerButtonsModal>
            <Button
              layoutColor="button-outline"
              type="button"
              onClick={() => setModalDeleteVisible(false)}
            >
              Não
            </Button>
            <Button
              layoutColor="button-filled"
              type="button"
              onClick={() => {
                handleDeleteCompromise(compromise.id);
                setModalDeleteVisible(false);
              }}
            >
              Sim
            </Button>
          </ContainerButtonsModal>
        </Modal>
      )}
    </>
  );
};

export default CompromiseRow;
