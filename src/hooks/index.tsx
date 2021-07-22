import React from 'react';

import { AuthProvider } from './auth';
import { CompanySelectedProvider } from './useCompanySelected';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <CompanySelectedProvider>{children}</CompanySelectedProvider>
  </AuthProvider>
);

export default AppProvider;
