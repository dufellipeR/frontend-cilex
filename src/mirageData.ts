interface UsersProps {
  id: number;
  username: string;
  password: string;
}

interface CompaniesProps {
  id: string;
  cod: string;
  razao_social: string;
}

interface PeopleProps {
  cod: number | string;
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

interface DataMirageTypes {
  users: UsersProps[];
  companies: CompaniesProps[];
  peoples: PeopleProps[];
}

export const datas: DataMirageTypes = {
  users: [
    {
      id: 1,
      username: 'Arthur',
      password: '123',
    },
  ],
  companies: [
    {
      id: '1',
      cod: '123',
      razao_social: 'Exon',
    },
    {
      id: '2',
      cod: '456',
      razao_social: 'Exon 2',
    },
  ],
  peoples: [
    {
      cod: '1',
      cnpj: 'Teste',
      razao_social: 'Teste',
      nome_fantasia: 'Teste',
      email: 'Teste',
      tel: 'Teste',
      endereco: 'Teste',
      cep: 'Teste',
      estado: 'Teste',
      info: 'Teste',
    },
  ],
};
