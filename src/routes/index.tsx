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

import Product from '../pages/Inventory/Product';

import ListType from '../pages/Inventory/Type/ListType';
import RegisterType from '../pages/Inventory/Type/RegisterType';
import EditType from '../pages/Inventory/Type/EditType';

import ListGroup from '../pages/Inventory/Group/ListGroup';
import RegisterGroup from '../pages/Inventory/Group/RegisterGroup';
import EditGroup from '../pages/Inventory/Group/EditGroup';

import ListSubGroup from '../pages/Inventory/SubGroup/ListSubGroup';
import RegisterSubGroup from '../pages/Inventory/SubGroup/RegisterSubGroup';
import EditSubGroup from '../pages/Inventory/SubGroup/EditSubGroup';

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

      <Route path="/inventory" exact component={Inventory} />
      <Route path="/inventory/product" component={Product} />

      <Route path="/inventory/type" exact component={ListType} />
      <Route path="/inventory/type/register" exact component={RegisterType} />
      <Route path="/inventory/type/:id" component={EditType} />

      <Route path="/inventory/group" exact component={ListGroup} />
      <Route path="/inventory/group/register" exact component={RegisterGroup} />
      <Route path="/inventory/group/:id" component={EditGroup} />

      <Route path="/inventory/subgroup" exact component={ListSubGroup} />
      <Route
        path="/inventory/subgroup/register"
        exact
        component={RegisterSubGroup}
      />
      <Route path="/inventory/subgroup/:id" component={EditSubGroup} />

      <Route path="/forgot-password" component={ForgotPassword} />
    </Switch>
  );
};

export default Routes;
