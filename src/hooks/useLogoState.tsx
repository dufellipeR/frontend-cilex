import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
} from 'react';

import logoImg from '../assets/cilex-logo.png';
import { useCompany } from './useCompany';

interface StateLogoData {
  logo: string;
}

interface IUpdateState {
  logo: string;
}

const StateLogo = createContext<StateLogoData>({} as StateLogoData);

export const StateLogoProvider: React.FC = ({ children }) => {
  const { company } = useCompany();
  const [data, setData] = useState<IUpdateState>(() => {
    if (company.company_logo !== logoImg && company.company_logo !== null) {
      console.log('entrou tem logo');

      return {
        logo: `http://localhost:3333/api/v1/files/${company.company_logo}`,
      };
    }
    console.log('entrou sem logo');

    return { logo: logoImg };
  });

  return (
    <StateLogo.Provider value={{ logo: data.logo }}>
      {children}
    </StateLogo.Provider>
  );
};

export const useLogoState = (): StateLogoData => {
  const context = useContext(StateLogo);

  return context;
};
