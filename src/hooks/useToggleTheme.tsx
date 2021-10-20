import React, { createContext, useContext } from 'react';

import { DefaultTheme } from 'styled-components';
import usePersistedState from '../utils/usePersistedState';

import orange from '../styles/theme/orange';
import customized from '../styles/theme/customized';

interface ToggleThemeContextData {
  theme: DefaultTheme;
  toggleTheme: (newTheme: 'orange' | 'customized') => void;
}

const ToggleThemeContext = createContext<ToggleThemeContextData>(
  {} as ToggleThemeContextData,
);

export const ToggleThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', orange);

  const toggleTheme = (newTheme: 'orange' | 'customized') => {
    setTheme(newTheme === 'customized' ? customized : orange);
  };

  return (
    <ToggleThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ToggleThemeContext.Provider>
  );
};

export function useToggleTheme(): ToggleThemeContextData {
  const context = useContext(ToggleThemeContext);

  return context;
}
