import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import usePersistedState from './utils/usePersistedState';
import orange from './styles/theme/orange';
import customized from './styles/theme/customized';

import Routes from './routes';
import AppProvider from './hooks';

import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './styles/global';

toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  transition: Bounce,
  draggable: false,
  role: 'Warnings',
  autoClose: 3000,
});

const App: React.FC = () => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', orange);

  return (
    <BrowserRouter>
      <AppProvider>
        <ThemeProvider theme={theme.title === 'orange' ? orange : customized}>
          <Routes />
          <GlobalStyle />
        </ThemeProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
