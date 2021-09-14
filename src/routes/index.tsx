import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import ForgotPassword from '../pages/ForgotPassword';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import ChoseCompany from '../pages/ChoseCompany';
import Menu from '../pages/Menu';

import Module from '../pages/Module';

import MenuUsers from '../pages/MenuUsers';
import ListUserActive from '../pages/UserActive/ListUserActive';
import EditUserActive from '../pages/UserActive/EditUserActive';
import ListUserPending from '../pages/UserPending/ListUserPending';
import EditUserPending from '../pages/UserPending/EditUserPending';

import ListCompany from '../pages/Company/ListCompany';
import RegisterCompany from '../pages/Company/RegisterCompany';
import EditCompany from '../pages/Company/EditCompany';

import ListPeople from '../pages/People/ListPeople';
import RegisterPeople from '../pages/People/RegisterPeople';
import EditPeople from '../pages/People/EditPeople';

import ListUserGroup from '../pages/UserGroup/ListUserGroup';
import RegisterUserGroup from '../pages/UserGroup/RegisterUserGroup';
import EditUserGroup from '../pages/UserGroup/EditUserGroup';

import ListRole from '../pages/Role/ListRole';
import RegisterRole from '../pages/Role/RegisterRole';
import EditRole from '../pages/Role/EditRole';

import Financial from '../pages/Financial';

import Inventory from '../pages/Inventory';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/chosecompany" component={ChoseCompany} />
      <Route path="/home" exact component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/menu" exact component={Menu} />

      <Route path="/module" exact component={Module} />

      <Route path="/menu/users" component={MenuUsers} />
      <Route path="/users/active" component={ListUserActive} />
      <Route path="/users/pending" component={ListUserPending} />
      <Route path="/user/:id" exact component={EditUserActive} />
      <Route path="/user/pending/:id" component={EditUserPending} />

      <Route path="/company" exact component={ListCompany} />
      <Route path="/company/register" component={RegisterCompany} />
      <Route path="/company/:id" component={EditCompany} />

      <Route path="/people" exact component={ListPeople} />
      <Route path="/people/register" component={RegisterPeople} />
      <Route path="/people/:id" component={EditPeople} />

      <Route path="/group" exact component={ListUserGroup} />
      <Route path="/group/register" component={RegisterUserGroup} />
      <Route path="/group/:id" component={EditUserGroup} />

      <Route path="/role" exact component={ListRole} />
      <Route path="/role/register" exact component={RegisterRole} />
      <Route path="/role/:id" component={EditRole} />

      <Route path="/financial" component={Financial} />

      <Route path="/inventory" component={Inventory} />

      <Route path="/forgot-password" component={ForgotPassword} />
    </Switch>
  );
};

export default Routes;
