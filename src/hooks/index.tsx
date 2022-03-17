import React from 'react';

import { AuthProvider } from './auth';
import { CompanyProvider } from './useCompany';
import { CrudModulesProvider } from './useCrudModules';
import { HasUserCompanyProvider } from './useHasUserCompany';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CompanyProvider>
      <HasUserCompanyProvider>
        <CrudModulesProvider>{children}</CrudModulesProvider>
      </HasUserCompanyProvider>
    </CompanyProvider>
  </AuthProvider>
);

export default AppProvider;
