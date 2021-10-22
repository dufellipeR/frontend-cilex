import React from 'react';

import { AuthProvider } from './auth';
import { CrudModulesProvider } from './useCrudModules';
import { HasUserCompanyProvider } from './useHasUserCompany';
import { UpdateLogoProvider } from './useUpdateLogo';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <HasUserCompanyProvider>
      <CrudModulesProvider>
        <UpdateLogoProvider> {children}</UpdateLogoProvider>
      </CrudModulesProvider>
    </HasUserCompanyProvider>
  </AuthProvider>
);

export default AppProvider;
