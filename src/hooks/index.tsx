import React from 'react';

import { AuthProvider } from './auth';
import { CrudModulesProvider } from './useCrudModules';
import { HasUserCompanyProvider } from './useHasUserCompany';
import { GeneralParamsProvider } from './useGeneralParams';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <GeneralParamsProvider>
      <HasUserCompanyProvider>
        <CrudModulesProvider>{children}</CrudModulesProvider>
      </HasUserCompanyProvider>
    </GeneralParamsProvider>
  </AuthProvider>
);

export default AppProvider;
