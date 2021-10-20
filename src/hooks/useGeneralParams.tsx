import React, { createContext, useContext, useState } from 'react';

type Colors = {
  main: string;
  mainHover: string;
};

interface GeneralParamsContextData {
  colors: Colors;
  setColors: React.Dispatch<React.SetStateAction<Colors>>;
}

const GeneralParamsContext = createContext<GeneralParamsContextData>(
  {} as GeneralParamsContextData,
);

export const GeneralParamsProvider: React.FC = ({ children }) => {
  const [colors, setColors] = useState({
    main: '#ff7a00',
    mainHover: 'rgba(255,122,0,0.2)',
  });

  return (
    <GeneralParamsContext.Provider
      value={{
        colors,
        setColors,
      }}
    >
      {children}
    </GeneralParamsContext.Provider>
  );
};

export function useHasUserCompany(): GeneralParamsContextData {
  const context = useContext(GeneralParamsContext);

  return context;
}
