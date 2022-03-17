/* eslint-disable camelcase */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import logoImg from '../assets/cilex-logo.png';

interface Company {
  id: string;
  code: string;
  razao_social: string;
  company_logo: string;
  company_color: string;
}

interface CompanyState {
  company: Company;
}

interface CompanyContextData {
  company: Company;
  setCompany(company: Company): void;
}

const CompanyContext = createContext<CompanyContextData>(
  {} as CompanyContextData,
);

const CompanyProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<CompanyState>(() => {
    const company = localStorage.getItem('@Cilex:companySelected');

    if (company) {
      return { company: JSON.parse(company) };
    }

    return {} as CompanyState;
  });

  const setCompany = useCallback((company: Company) => {
    localStorage.setItem('@Cilex:companySelected', JSON.stringify(company));
    setData({ company });
  }, []);

  return (
    <CompanyContext.Provider value={{ company: data.company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

function useCompany(): CompanyContextData {
  const context = useContext(CompanyContext);

  return context;
}

export { CompanyProvider, useCompany };
