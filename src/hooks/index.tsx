import React from 'react';

import { AuthProvider } from './auth';
import { CrudModulesProvider } from './useCrudModules';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CrudModulesProvider>{children}</CrudModulesProvider>
  </AuthProvider>
);

export default AppProvider;
