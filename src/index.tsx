import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import App from './App';

createServer({
  models: {
    user: Model,
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
    });
  },

  routes() {
    this.namespace = 'api';

    this.get('/users', () => {
      return this.schema.all('user');
    });
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
