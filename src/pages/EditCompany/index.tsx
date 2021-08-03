import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import {
  HiOutlineArrowLeft,
  HiOutlineOfficeBuilding,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from 'react-icons/hi';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Header from '../../components/Header';
import Button from '../../components/Button';

import { Icompany } from '../Company';

import {
  Container,
  FormCustom,
  Main,
  Badge,
  InfoCard,
  HeaderContent,
  ContainerCompanyData,
  Select,
} from './styles';
import Input from '../../components/Input';

interface IOpt {
  value: string;
  label: string;
}

interface IRegisterForm {
  cod: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  email: string;
  tel: string;
  endereco: string;
  cep: string;
  uf: string;
  info: string;
  matriz_id?: string;
}

const EditCompany: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { id } = useParams();

  const [companies, setCompanies] = useState<IOpt[]>([]);
  const [editting, setEditting] = useState<boolean>(false);
  const [company, setCompany] = useState<IRegisterForm | null>(null);

  const formSchemaCompanyEdit = Yup.object().shape({
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
    matriz_id: Yup.string(),
  });

  useEffect(() => {
    api.get<IRegisterForm | null>(`/company/${id}`).then(response => {
      setCompany(response.data);
    });
  }, [id]);

  useEffect(() => {
    api.get<Icompany[]>('/company').then(response => {
      const formatData: any[] = response.data.map(item => {
        return {
          value: item.id,
          label: `${item.cod} - ${item.razao_social}`,
        };
      });
      setCompanies(formatData);
    });
  }, []);

  const handleBack = useCallback((): void => {
    history.goBack();
  }, [history]);

  const handleSubmitForm = useCallback(
    async (data: IRegisterForm) => {
      try {
        const {
          cod,
          cnpj,
          razao_social,
          nome_fantasia,
          email,
          tel,
          endereco,
          cep,
          uf,
          info,
          matriz_id,
        } = data;

        api
          .put(`/company/${id}`, {
            cod: String(cod),
            cnpj: String(cnpj),
            razao_social,
            nome_fantasia,
            email,
            tel,
            endereco,
            cep,
            uf,
            info,
            matriz_id: matriz_id || '',
          })
          .then(() => {
            toast.success('Atualizado com sucesso');
            history.push('/company');
          });
      } catch (err) {
        toast.error('Ocorreu um erro na atualização da Empresa!');
      }
    },
    [history, id],
  );

  const handleDeleteCompany = () => {
    api
      .delete(`/company/${id}`)
      .then(() => {
        toast.success('Deletada com Sucesso');
        history.push('/company');
      })
      .catch(() => {
        toast.success('Erro ao deletar Empresa');
        history.push('/company');
      });
  };

  return (
    <>
      <Container>
        <Header pageName="Editar Empresa" />
        {company && (
          <Main>
            <HeaderContent>
              <div id="container-arrow">
                <button type="button" onClick={() => handleBack()}>
                  <HiOutlineArrowLeft size={42} color="#ff7a00" />
                </button>
              </div>
              <div id="company-titles">
                <HiOutlineOfficeBuilding size={32} color="#ff7a00" />
                <div>
                  <h2>{company.razao_social}</h2>
                  <p>{company.nome_fantasia}</p>
                </div>
                {company.matriz_id ? (
                  <Badge>Matriz</Badge>
                ) : (
                  <Badge>Filial</Badge>
                )}
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
                  onClick={handleDeleteCompany}
                >
                  <HiOutlineTrash size={24} color="#ff7a00" />
                </Button>
              </div>
            </HeaderContent>
            <ContainerCompanyData>
              <InfoCard>
                <h4>Endereço</h4>
                <span> {company.endereco}</span>
                <span> {company.cep}</span>
                <span> {company.uf}</span>
              </InfoCard>
              <InfoCard>
                <h4>Dados</h4>
                <span>{company.cod}</span>
                <span>{company.cnpj}</span>
              </InfoCard>
              <InfoCard>
                <h4>Contato</h4>
                <span>{company.email}</span>
                <span>{company.tel}</span>
              </InfoCard>
            </ContainerCompanyData>

            {editting && (
              <Formik
                initialValues={{
                  cod: company.cod,
                  cnpj: company.cnpj,
                  razao_social: company.razao_social,
                  nome_fantasia: company.nome_fantasia,
                  email: company.email,
                  tel: company.tel,
                  endereco: company.endereco,
                  cep: company.cep,
                  uf: company.uf,
                  info: company.info,
                  matriz_id: company.matriz_id ? company.matriz_id : '',
                }}
                validationSchema={formSchemaCompanyEdit}
                onSubmit={handleSubmitForm}
              >
                {({ handleChange, touched, values, errors, handleSubmit }) => (
                  <FormCustom onSubmit={handleSubmit}>
                    <div id="align-inputs">
                      <Select
                        name="matriz_id"
                        value={values.matriz_id ? values.matriz_id : ''}
                        onChange={handleChange('matriz_id')}
                      >
                        {companies.map(companyMap => (
                          <option
                            key={companyMap.value}
                            value={companyMap.value}
                          >
                            {companyMap.label}
                          </option>
                        ))}
                      </Select>
                      <Input
                        name="cod"
                        min={1000}
                        max={9999}
                        type="number"
                        placeholder="Código"
                        value={values.cod}
                        onChange={handleChange('cod')}
                        messageError={
                          errors.cod && touched.cod ? errors.cod : ''
                        }
                      />
                      <Input
                        name="cnpj"
                        type="number"
                        placeholder="CNPJ"
                        value={values.cnpj}
                        onChange={handleChange('cnpj')}
                        messageError={
                          errors.cnpj && touched.cnpj ? errors.cnpj : ''
                        }
                        maxLength={18}
                      />
                      <Input
                        name="razao_social"
                        type="text"
                        placeholder="Razão Social"
                        value={values.razao_social}
                        onChange={handleChange('razao_social')}
                        messageError={
                          errors.razao_social && touched.razao_social
                            ? errors.razao_social
                            : ''
                        }
                      />
                      <Input
                        name="nome_fantasia"
                        type="text"
                        placeholder="Nome Fantasia"
                        value={values.nome_fantasia}
                        onChange={handleChange('nome_fantasia')}
                        messageError={
                          errors.nome_fantasia && touched.nome_fantasia
                            ? errors.nome_fantasia
                            : ''
                        }
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        value={values.email}
                        onChange={handleChange('email')}
                        messageError={
                          errors.email && touched.email ? errors.email : ''
                        }
                      />
                      <Input
                        name="tel"
                        type="text"
                        placeholder="Telefone"
                        value={values.tel}
                        onChange={handleChange('tel')}
                        messageError={
                          errors.tel && touched.tel ? errors.tel : ''
                        }
                      />
                      <Input
                        name="endereco"
                        type="text"
                        placeholder="Endereço"
                        value={values.endereco}
                        onChange={handleChange('endereco')}
                        messageError={
                          errors.endereco && touched.endereco
                            ? errors.endereco
                            : ''
                        }
                      />
                      <Input
                        name="cep"
                        type="text"
                        placeholder="CEP"
                        value={values.cep}
                        onChange={handleChange('cep')}
                        messageError={
                          errors.cep && touched.cep ? errors.cep : ''
                        }
                      />
                      <Input
                        name="uf"
                        type="text"
                        placeholder="Estado"
                        value={values.uf}
                        onChange={handleChange('uf')}
                        messageError={errors.uf && touched.uf ? errors.uf : ''}
                      />
                      <Input
                        name="info"
                        type="text"
                        placeholder="Informações"
                        value={values.info}
                        onChange={handleChange('info')}
                        messageError={
                          errors.info && touched.info ? errors.info : ''
                        }
                      />
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
    </>
  );
};

export default EditCompany;
