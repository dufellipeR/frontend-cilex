import React, { createContext, useContext } from 'react';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

interface HandleDeleteParams {
  route: string;
  id: string;
  routePush: string;
}

interface CrudModulesContextData {
  deleteDataFromModule: (data: HandleDeleteParams) => Promise<void>;
}

const CrudModulesContext = createContext<CrudModulesContextData>(
  {} as CrudModulesContextData,
);

export const CrudModulesProvider: React.FC = ({ children }) => {
  const history = useHistory();

  async function deleteDataFromModule({
    id,
    route,
    routePush,
  }: HandleDeleteParams) {
    api
      .delete(`/${route}/${id}`)
      .then(() => {
        toast.success('Deletado com Sucesso');
        history.push(`/${routePush}`);
      })
      .catch(() => {
        toast.error('Erro ao deletar');
        history.push(`/${routePush}`);
      });
  }

  return (
    <CrudModulesContext.Provider value={{ deleteDataFromModule }}>
      {children}
    </CrudModulesContext.Provider>
  );
};

export function useCrudModules(): CrudModulesContextData {
  const context = useContext(CrudModulesContext);

  return context;
}
