import React from 'react';

import { AuthProvider } from './auth';
import { CompanyProvider } from './useCompany';
import { CrudModulesProvider } from './useCrudModules';
import { HasUserCompanyProvider } from './useHasUserCompany';
import { StateLogoProvider } from './useLogoState';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CompanyProvider>
      <HasUserCompanyProvider>
        <CrudModulesProvider>
          <StateLogoProvider>{children}</StateLogoProvider>
        </CrudModulesProvider>
      </HasUserCompanyProvider>
    </CompanyProvider>
  </AuthProvider>
);

export default AppProvider;
