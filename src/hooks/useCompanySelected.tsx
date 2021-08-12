/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface CompanySelectedProviderProps {
  children: ReactNode;
}

interface CompanySelectProps {
  id: string;
  code: string;
  razao_social: string;
}

interface CompanySelectedContextData {
  companySelected: CompanySelectProps;
  updateCompany: (company: CompanySelectProps) => void;
}

const CompanySelectedContext = createContext<CompanySelectedContextData>(
  {} as CompanySelectedContextData,
);

export const CompanySelectedProvider = ({
  children,
}: CompanySelectedProviderProps) => {
  const [companySelected, setCompanySelected] = useState(
    {} as CompanySelectProps,
  );

  const updateCompany = (company: CompanySelectProps) => {
    setCompanySelected(company);
  };

  return (
    <CompanySelectedContext.Provider value={{ companySelected, updateCompany }}>
      {children}
    </CompanySelectedContext.Provider>
  );
};

export const useCompanySelected = () => {
  const context = useContext(CompanySelectedContext);

  return context;
};
