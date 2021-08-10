import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

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

export const theme = {
  main: '#ff7a00',
  mainHover: 'rgba(255,122,0,0.2)',
  greenColor: '#8DC73E',
};

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
          <GlobalStyle />
        </ThemeProvider>
      </AppProvider>
    </>
  );
};

export default App;
