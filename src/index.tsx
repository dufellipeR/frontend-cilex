import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import App from './App';

createServer({
  models: {
    user: Model,
    company: Model,
  },

  seeds(server) {
    server.db.loadData({
      users: [
        {
          id: 1,
          username: 'Arthur',
          password: '123',
        },
      ],
      companies: [
        {
          id: '1',
          cod: '123',
          razao_social: 'Exon',
        },
        {
          id: '2',
          cod: '456',
          razao_social: 'Exon 2',
        },
      ],
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/users', () => {
      return this.schema.all('user');
    });

    this.get('/usercompany', () => {
      return this.schema.all('company');
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
