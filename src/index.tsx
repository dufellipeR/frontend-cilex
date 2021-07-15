import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { datas } from './mirageData';
import App from './App';

createServer({
  models: {
    user: Model,
    company: Model,
    people: Model,
  },

  seeds(server) {
    server.db.loadData({
      users: datas.users,
      companies: datas.companies,
      peoples: datas.companies,
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

    this.get('/peoples', () => {
      return this.schema.all('people');
    });

    this.post('/peoples', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      console.log('DATA INDEX: ', data);

      return schema.create('people', data);
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
