import React from 'react';

import { AuthProvider } from './auth';
import { CrudModulesProvider } from './useCrudModules';
import { HasUserCompanyProvider } from './useHasUserCompany';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <HasUserCompanyProvider>
      <CrudModulesProvider>{children}</CrudModulesProvider>
    </HasUserCompanyProvider>
  </AuthProvider>
);

export default AppProvider;
