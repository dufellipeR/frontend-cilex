import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import orange from './styles/theme/orange';

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
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <ThemeProvider theme={orange}>
            <Routes />
            <GlobalStyle />
          </ThemeProvider>
        </AppProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
