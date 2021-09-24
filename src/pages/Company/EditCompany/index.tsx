import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiSave } from 'react-icons/fi';
import {
  HiOutlineOfficeBuilding,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from 'react-icons/hi';
import { toast } from 'react-toastify';

import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';
import { theme } from '../../../App';
import { maskPhone, maskCEP, maskCNPJ } from '../../../utils/masks';

import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import ButtonBack from '../../../components/ButtonBack';
import ModalDelete from '../../../components/ModalDelete';

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

interface Icompany {
  id: string;
  code: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
}

interface IOpt {
  value: string;
  label: string;
}

interface IRegisterForm {
  code: string;
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  email: string;
  tel?: string;
  endereco?: string;
  cep?: string;
  uf?: string;
  info?: string;
  matriz_id?: string;
}

interface MatrizID {
  id: string;
  code: string;
  nome_fantasia: string;
}

const EditCompany: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { id } = useParams();

  const [companies, setCompanies] = useState<IOpt[]>([]);
  const [editting, setEditting] = useState<boolean>(false);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);
  const [company, setCompany] = useState<IRegisterForm | null>(null);
  const [matrizCompanies, setMatrizCompanies] = useState<MatrizID[]>([]);

  const formSchemaCompanyEdit = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório'),
    cnpj: Yup.string().required('CNPJ obrigatório').min(18).max(18),
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
    api.get<MatrizID[]>('/company?isMatriz=true').then(response => {
      setMatrizCompanies(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Icompany[]>('/company').then(response => {
      const formatData: any[] = response.data.map(item => {
        return {
          value: item.id,
          label: `${item.code} - ${item.razao_social}`,
        };
      });
      setCompanies(formatData);
    });
  }, []);

  const handleSubmitForm = useCallback(
    async (data: IRegisterForm) => {
      try {
        const {
          code,
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
            code: String(code),
            cnpj: String(cnpj),
            razao_social,
            nome_fantasia,
            email,
            tel,
            endereco,
            cep,
            uf,
            info,
            matriz_id: matriz_id || undefined,
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
                <ButtonBack destinationBack="/company" />
              </div>
              <div id="company-titles">
                <HiOutlineOfficeBuilding size={32} color={theme.main} />
                <div>
                  <h2>{company.razao_social}</h2>
                  <p>{company.nome_fantasia}</p>
                </div>
                {company.matriz_id ? (
                  <Badge>Filial</Badge>
                ) : (
                  <Badge>Matriz</Badge>
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
                  onClick={() => setShowModalDelete(true)}
                >
                  <HiOutlineTrash size={24} color={theme.main} />
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
                <span>{company.code}</span>
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
                  code: company.code,
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
                      <Select
                        name="matriz_id"
                        value={values.matriz_id}
                        onChange={handleChange('matriz_id')}
                      >
                        <option value="">Matriz</option>
                        {matrizCompanies.map(companyMatriz => (
                          <option value={companyMatriz.id}>
                            {companyMatriz.code} - {companyMatriz.nome_fantasia}
                          </option>
                        ))}
                      </Select>
                      <Input
                        name="cnpj"
                        type="text"
                        placeholder="CNPJ"
                        mask={maskCNPJ}
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
                        mask={maskPhone}
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
                        mask={maskCEP}
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
      <ModalDelete
        visible={showModalDelete}
        setVisible={setShowModalDelete}
        actionToDelete={handleDeleteCompany}
      />
    </>
  );
};

export default EditCompany;
