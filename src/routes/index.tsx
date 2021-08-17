import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Menu from '../pages/Menu';

import MenuUsers from '../pages/MenuUsers';
import UsersActive from '../pages/UsersActive';
import EditUsersActive from '../pages/EditUsersActive';
import UsersPending from '../pages/UsersPending';
import EditUsersPending from '../pages/EditUsersPending';

import ChoseCompany from '../pages/ChoseCompany';

import Company from '../pages/Company';
import RegisterCompany from '../pages/RegisterCompany';
import EditCompany from '../pages/EditCompany';

import People from '../pages/People';
import RegisterPeople from '../pages/RegisterPeople';
import EditPeople from '../pages/EditPeople';

import Group from '../pages/Group';

import Role from '../pages/Role';
import RegisterRole from '../pages/RegisterRole';
import EditRole from '../pages/EditRole';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/chosecompany" component={ChoseCompany} />
      <Route path="/home" exact component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/menu" exact component={Menu} />

      <Route path="/menu/users" component={MenuUsers} />
      <Route path="/users/active" component={UsersActive} />
      <Route path="/users/pending" component={UsersPending} />
      <Route path="/user/:id" exact component={EditUsersActive} />
      <Route path="/user/pending/:id" component={EditUsersPending} />

      <Route path="/company" exact component={Company} />
      <Route path="/company/register" component={RegisterCompany} />
      <Route path="/company/:id" component={EditCompany} />

      <Route path="/people" exact component={People} />
      <Route path="/people/register" component={RegisterPeople} />
      <Route path="/people/:id" component={EditPeople} />

      <Route path="/group" exact component={Group} />

      <Route path="/role" exact component={Role} />
      <Route path="/role/register" exact component={RegisterRole} />
      <Route path="/role/:id" component={EditRole} />

      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
    </Switch>
  );
};

export default Routes;
