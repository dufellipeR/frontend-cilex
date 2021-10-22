import React, { useState, createContext, useContext } from 'react';

import logoImg from '../assets/cilex-logo.png';

interface UpdateLogoData {
  logo: string;
  setLogo: React.Dispatch<React.SetStateAction<string>>;
}

const UpdateLogo = createContext<UpdateLogoData>({} as UpdateLogoData);

export const UpdateLogoProvider: React.FC = ({ children }) => {
  const [logo, setLogo] = useState(logoImg);

  return (
    <UpdateLogo.Provider value={{ logo, setLogo }}>
      {children}
    </UpdateLogo.Provider>
  );
};

export const useUpdateLogo = (): UpdateLogoData => {
  const context = useContext(UpdateLogo);

  return context;
};
