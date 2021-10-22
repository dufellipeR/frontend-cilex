import React, { createContext, useContext } from 'react';
import { DefaultTheme } from 'styled-components';

import usePersistedState from './usePersistedState';

import orange from '../styles/theme/orange';
import customized from '../styles/theme/customized';

interface ThemeContextData {
  theme: DefaultTheme;
  toggleTheme: (newTheme: 'orange' | 'customized') => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', orange);

  const toggleTheme = (newTheme: 'orange' | 'customized') => {
    setTheme(newTheme === 'customized' ? customized : orange);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useToggleTheme = (): ThemeContextData => {
  const context = useContext(ThemeContext);

  return context;
};
