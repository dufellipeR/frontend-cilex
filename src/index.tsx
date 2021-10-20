import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ToggleThemeProvider } from './hooks/useToggleTheme';

ReactDOM.render(
  <React.StrictMode>
    <ToggleThemeProvider>
      <App />
    </ToggleThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
