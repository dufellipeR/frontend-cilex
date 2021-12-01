import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { FiSave } from 'react-icons/fi';
import ListCompromise from './ListCompromises';
import Header from '../../components/Header';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import ButtonBack from '../../components/ButtonBack';

import 'react-calendar/dist/Calendar.css';

import {
  Container,
  Main,
  ActionsArea,
  FormCustom,
  ContainerInputDate,
} from './styles';
import Input from '../../components/Input';

interface Compromise {
  id: number;
  day: string;
  hour: string;
  service: {
    title: string;
    color: string;
  };
  pet: {
    name: string;
    owner: {
      name: string;
      address: string;
    };
  };
}

interface RegisterCompromiseForm {
  date: string;
  hour: string;
  pet_id: string;
  service_id: string;
  frequency: string;
}

const formSchemaCompromise = Yup.object().shape({
  date: Yup.string().required('Data Obrigatória'),
  hour: Yup.string().required('Hora Obrigatória'),
  pet_id: Yup.string().required('Pet Obrigatório'),
  service_id: Yup.string().required('Serviço Obrigatório'),
  frequency: Yup.string().required('Frequência Obrigatório'),
});

const Schedule: React.FC = () => {
  const [compromises, setCompromises] = useState<Compromise[]>([]);
  const [DBCompromises, setDBCompromises] = useState<Compromise[]>([]);
  const [dayClicked, setDayClicked] = useState<string>(
    new Date().toLocaleDateString(),
  );
  const [serviceSelected, setServiceSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setDBCompromises([
      {
        id: 1,
        day: '28/11/2021',
        hour: '13:30',
        service: { title: 'Banho e Tosa', color: '#0CF254' },
        pet: {
          name: 'Zeca',
          owner: {
            name: 'Arthur',
            address: 'NSDF, 23',
          },
        },
      },
      {
        id: 2,
        day: '29/11/2021',
        hour: '14:30',
        service: { title: 'Banho e Tosa', color: '#0CF254' },
        pet: {
          name: 'Zeca',
          owner: {
            name: 'Arthur',
            address: 'NSDF, 23',
          },
        },
      },
      {
        id: 3,
        day: '30/11/2021',
        hour: '15:30',
        service: { title: 'Banho e Tosa', color: '#0CF254' },
        pet: {
          name: 'Zeca',
          owner: {
            name: 'Arthur',
            address: 'NSDF, 23',
          },
        },
      },
      {
        id: 4,
        day: '28/11/2021',
        hour: '13:30',
        service: { title: 'Hospedagem', color: '#0C35F2' },
        pet: {
          name: 'Zeca',
          owner: {
            name: 'Arthur',
            address: 'NSDF, 23',
          },
        },
      },
      {
        id: 5,
        day: '29/11/2021',
        hour: '14:30',
        service: { title: 'Hospedagem', color: '#0C35F2' },
        pet: {
          name: 'Zeca',
          owner: {
            name: 'Arthur',
            address: 'NSDF, 23',
          },
        },
      },
      {
        id: 6,
        day: '30/11/2021',
        hour: '15:30',
        service: { title: 'Hospedagem', color: '#0C35F2' },
        pet: {
          name: 'Zeca',
          owner: {
            name: 'Arthur',
            address: 'NSDF, 23',
          },
        },
      },
      {
        id: 7,
        day: '28/11/2021',
        hour: '13:30',
        service: { title: 'Creche', color: '#F00' },
        pet: {
          name: 'Zeca',
          owner: {
            name: 'Arthur',
            address: 'NSDF, 23',
          },
        },
      },
      {
        id: 8,
        day: '29/11/2021',
        hour: '14:30',
        service: { title: 'Creche', color: '#F00' },
        pet: {
          name: 'Zeca',
          owner: {
            name: 'Arthur',
            address: 'NSDF, 23',
          },
        },
      },
      {
        id: 9,
        day: '30/11/2021',
        hour: '15:30',
        service: { title: 'Creche', color: '#F00' },
        pet: {
          name: 'Zeca',
          owner: {
            name: 'Arthur',
            address: 'NSDF, 23',
          },
        },
      },
    ]);
  }, []);

  function handleClickDay(day: Date) {
    setDayClicked(day.toLocaleDateString());

    const servicesInDayClicked = DBCompromises.filter(
      compromise => compromise.day === day.toLocaleDateString(),
    ).filter(compromise =>
      serviceSelected
        ? compromise.service.title === serviceSelected
        : compromise.service.title !== '',
    );

    setCompromises(servicesInDayClicked);
  }

  function handleChangeServiceSelected(e: ChangeEvent<HTMLSelectElement>) {
    const valueChange = e.target.value;
    setServiceSelected(valueChange);

    const servicesInDayClicked = DBCompromises.filter(
      compromise => compromise.day === dayClicked,
    ).filter(compromise =>
      valueChange
        ? compromise.service.title === valueChange
        : compromise.service.title !== '',
    );

    setCompromises(servicesInDayClicked);
  }

  const handleSubmitForm = useCallback(async (data: RegisterCompromiseForm) => {
    try {
      if (data) {
        console.log(data);
        toast.success('Compromisso cadastado com sucesso!');
        setModalVisible(false);
      }
    } catch (err) {
      toast.error('Ocorreu um erro no registro do Compromisso');
    }
  }, []);

  return (
    <Container>
      <Header pageName="Agenda" />
      <ActionsArea>
        <div id="align-buttons">
          <ButtonBack destinationBack="/menu" />
          <Button
            layoutColor="button-green"
            onClick={() => setModalVisible(true)}
          >
            Novo Compromisso
          </Button>
        </div>
        <Select value={serviceSelected} onChange={handleChangeServiceSelected}>
          <option value="">Serviços</option>
          <option value="Banho e Tosa">Banho e Tosa</option>
          <option value="Hospedagem">Hospedagem</option>
          <option value="Creche">Creche</option>
        </Select>
      </ActionsArea>
      <Main>
        <Calendar onClickDay={value => handleClickDay(value)} />
        <ListCompromise dayClicked={dayClicked} compromises={compromises} />
      </Main>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <Formik
          initialValues={{
            date: '',
            hour: '',
            pet_id: '',
            service_id: '',
            frequency: '',
          }}
          validationSchema={formSchemaCompromise}
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
                />
              </ContainerInputDate>
              <Input
                name="hour"
                type="text"
                placeholder="Hora"
                value={values.hour}
                onChange={handleChange('hour')}
                messageError={errors.hour && touched.hour ? errors.hour : ''}
              />
              <Select
                name="pet_id"
                value={values.pet_id}
                onChange={handleChange('pet_id')}
                messageError={
                  errors.pet_id && touched.pet_id ? errors.pet_id : ''
                }
              >
                <option value="">Pets</option>
                <option value="zeca">Zeca</option>
              </Select>
              <Select
                name="service_id"
                value={values.service_id}
                onChange={handleChange('service_id')}
                messageError={
                  errors.service_id && touched.service_id
                    ? errors.service_id
                    : ''
                }
              >
                <option value="">Serviços</option>
                <option value="Banho e Tosa">Banho e Tosa</option>
                <option value="Hospedagem">Hospedagem</option>
                <option value="Creche">Creche</option>
              </Select>
              <Select
                name="frequency"
                value={values.frequency}
                onChange={handleChange('frequency')}
                messageError={
                  errors.frequency && touched.frequency ? errors.frequency : ''
                }
              >
                <option value="">Frequência</option>
                <option value="7d">7 dias</option>
                <option value="15d">15 dias</option>
                <option value="30d">30 dias</option>
              </Select>
              <Button layoutColor="button-green" type="submit">
                <FiSave size={24} />
                <span>Salvar</span>
              </Button>
            </FormCustom>
          )}
        </Formik>
      </Modal>
    </Container>
  );
};

export default Schedule;
