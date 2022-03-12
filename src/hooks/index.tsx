import React from 'react';

import { AuthProvider } from './auth';
import { CompanyProvider } from './useCompany';
import { CrudModulesProvider } from './useCrudModules';
import { HasUserCompanyProvider } from './useHasUserCompany';
import { UpdateLogoProvider } from './useUpdateLogo';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CompanyProvider>
      <HasUserCompanyProvider>
        <CrudModulesProvider>
          <UpdateLogoProvider>{children}</UpdateLogoProvider>
        </CrudModulesProvider>
      </HasUserCompanyProvider>
    </CompanyProvider>
  </AuthProvider>
);

export default AppProvider;
