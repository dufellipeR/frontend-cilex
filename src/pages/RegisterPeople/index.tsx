import React, { useCallback, useRef, useState } from 'react';

import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import {
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiHome,
  FiPower,
  FiSave,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Button from '../../components/Button';

import { Container, Header, FormCustom, Greetings, Main } from './styles';
import OutlinedButton from '../../components/OutlinedButton';
import getValidationErrors from '../../utils/getValidationErrors';
import FormInput from '../../components/FormInput';
import CustomSelect from '../../components/Select';
import api from '../../services/api';

interface IRegisterForm {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  email: string;
  tel: string;
  endereco: string;
  cep: string;
  estado: string;
  info: string;
}

const RegisterPeople: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { user } = useAuth();

  const { addToast } = useToast();

  const handleLogout = useCallback((): void => {
    history.push('/');
  }, [history]);

  const handleHome = useCallback((): void => {
    history.push('/home');
  }, [history]);

  const handleBack = useCallback((): void => {
    history.goBack();
  }, [history]);

  const handleSubmit = useCallback(
    async (data: IRegisterForm) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          cod: Yup.string().required('Código Obrigatório'),
          cnpj: Yup.string().required('CNPJ obrigatório'),
          razao_social: Yup.string().required('Razão Social obrigatória'),
          nome_fantasia: Yup.string().required('Nome Fantasia obrigatório'),
          email: Yup.string().required('E-mail obrigatório'),
          tel: Yup.string(),
          endereco: Yup.string(),
          cep: Yup.string(),
          uf: Yup.string(),
          info: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        api.post('/company', data).then((response) => {
          addToast({
            type: 'success',
            title: 'Registrado com sucesso',
          });

          history.push('/company');
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no registro da empresa',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Container>
        <Header>
          <h1>Cilex</h1>
          <Greetings>
            <p>Register People</p>
          </Greetings>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button onClick={() => handleHome()}>
              <FiHome size={24} />{' '}
            </Button>
            <OutlinedButton onClick={() => handleLogout()}>
              <FiPower size={24} />
            </OutlinedButton>
          </div>
        </Header>
        <button
          type="button"
          style={{ backgroundColor: 'transparent', border: 0, maxWidth: 150 }}
          onClick={() => handleBack()}
        >
          <HiOutlineArrowLeft size={42} color="#ff7a00" />
        </button>
        <Main>
          <FormCustom ref={formRef} onSubmit={handleSubmit}>
            <>
              <div>
                <FormInput
                  name="cod"
                  min={1000}
                  max={9999}
                  type="number"
                  placeholder="Código"
                />
                <FormInput name="cnpj" type="number" placeholder="CNPJ" />
                <FormInput
                  name="razao_social"
                  type="text"
                  placeholder="Razão Social"
                />
                <FormInput
                  name="nome_fantasia"
                  type="text"
                  placeholder="Nome Fantasia"
                />
                <FormInput name="email" type="email" placeholder="E-mail" />
              </div>
              <div>
                <FormInput name="tel" type="text" placeholder="Telefone" />
                <FormInput name="endereco" type="text" placeholder="Endereço" />
                <FormInput name="cep" type="text" placeholder="CEP" />
                <FormInput name="uf" type="text" placeholder="Estado" />
                <FormInput name="info" type="text" placeholder="Informações" />
              </div>
              <Button
                style={{ backgroundColor: '#8DC73E', color: '#fff' }}
                type="submit"
              >
                <span
                  style={{
                    marginLeft: `${30}%`,
                    alignSelf: 'center',
                    justifyContent: 'space-evenly',
                    maxWidth: `${35}%`,
                    lineHeight: 1.5,
                  }}
                >
                  <FiSave size={24} /> Salvar
                </span>
              </Button>
            </>
          </FormCustom>
        </Main>
      </Container>
    </>
  );
};

export default RegisterPeople;
