import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { createMuiTheme } from '@material-ui/core/styles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ThemeProvider } from '@material-ui/styles';

import Routes from './routes';
import AppProvider from './hooks';
import ChangeCompany from './components/ChangeCompany';

import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './styles/global';

toast.configure({
  position: toast.POSITION.TOP_RIGHT,
  transition: Bounce,
  draggable: false,
  role: 'Warnings',
  autoClose: 3000,
});

export const theme = createMuiTheme({
  palette: {
    primary: { main: '#ff7a00' },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

const App: React.FC = () => (
  <>
    <AppProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </AppProvider>
    <GlobalStyle />
  </>
);

export default App;
