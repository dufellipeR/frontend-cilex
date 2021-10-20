import React from 'react';

import { AuthProvider } from './auth';
import { CrudModulesProvider } from './useCrudModules';
import { HasUserCompanyProvider } from './useHasUserCompany';
import { ToggleThemeProvider } from './useToggleTheme';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToggleThemeProvider>
      <HasUserCompanyProvider>
        <CrudModulesProvider>{children}</CrudModulesProvider>
      </HasUserCompanyProvider>
    </ToggleThemeProvider>
  </AuthProvider>
);

export default AppProvider;
