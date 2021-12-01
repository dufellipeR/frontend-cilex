import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ForgotPassword from '../pages/ForgotPassword';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import ChoseCompany from '../pages/ChoseCompany';
import Menu from '../pages/Menu';

import Module from '../pages/Module';

import GeneralParams from '../pages/GeneralParams';

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

import RegisterTransaction from '../pages/Inventory/Transaction/RegisterTransaction';
import ListTransaction from '../pages/Inventory/Transaction/ListTransaction';
import EditTransaction from '../pages/Inventory/Transaction/EditTransaction';

import RegisterStorage from '../pages/Inventory/Storage/RegisterStorage';
import ListStorage from '../pages/Inventory/Storage/ListStorage';
import EditStorage from '../pages/Inventory/Storage/EditStorage';

import RegisterProduct from '../pages/Inventory/Product/RegisterProduct';
import ListProduct from '../pages/Inventory/Product/ListProduct';
import EditProduct from '../pages/Inventory/Product/EditProduct';

import ListType from '../pages/Inventory/Type/ListType';
import RegisterType from '../pages/Inventory/Type/RegisterType';
import EditType from '../pages/Inventory/Type/EditType';

import ListGroup from '../pages/Inventory/Group/ListGroup';
import RegisterGroup from '../pages/Inventory/Group/RegisterGroup';
import EditGroup from '../pages/Inventory/Group/EditGroup';

import ListSubGroup from '../pages/Inventory/SubGroup/ListSubGroup';
import RegisterSubGroup from '../pages/Inventory/SubGroup/RegisterSubGroup';
import EditSubGroup from '../pages/Inventory/SubGroup/EditSubGroup';

import ListFamily from '../pages/Inventory/Family/ListFamily';
import RegisterFamily from '../pages/Inventory/Family/RegisterFamily';
import EditFamily from '../pages/Inventory/Family/EditFamily';

import ListSubFamily from '../pages/Inventory/SubFamily/ListSubFamily';
import RegisterSubFamily from '../pages/Inventory/SubFamily/RegisterSubFamily';
import EditSubFamily from '../pages/Inventory/SubFamily/EditSubFamily';

import ListApplication from '../pages/Inventory/Application/ListApplication';
import RegisterApplication from '../pages/Inventory/Application/RegisterApplication';
import EditApplication from '../pages/Inventory/Application/EditApplication';

import ListDimension from '../pages/Inventory/Dimension/ListDimension';
import RegisterDimension from '../pages/Inventory/Dimension/RegisterDimension';
import EditDimension from '../pages/Inventory/Dimension/EditDimension';

import ListUnitMeasure from '../pages/Inventory/UnitMeasure/ListUnitMeasure';
import RegisterUnitMeasure from '../pages/Inventory/UnitMeasure/RegisterUnitMeasure';
import EditUnitMeasure from '../pages/Inventory/UnitMeasure/EditUnitMeasure';

import Pet from '../pages/Pet';

import ListPet from '../pages/Pet/Pets/ListPet';
import RegisterPet from '../pages/Pet/Pets/RegisterPet';
import EditPet from '../pages/Pet/Pets/EditPet';

import ListServicesCompany from '../pages/ServicesCompany/ListServicesCompany';
import RegisterServicesCompany from '../pages/ServicesCompany/RegisterServicesCompany';
import EditServicesCompany from '../pages/ServicesCompany/EditServicesCompany';

import Schedule from '../pages/Schedule';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/forgot-password" component={ForgotPassword} />

      <Route path="/chosecompany" component={ChoseCompany} />
      <Route path="/home" exact component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/menu" exact component={Menu} />

      <Route path="/module" exact component={Module} />

      <Route path="/generalParams" component={GeneralParams} />

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

      {/* ---------------------- INÍCIO FINANCEIRO ---------------------- */}
      <Route path="/financial" component={Financial} />
      {/* ---------------------- FIM FINANCEIRO ---------------------- */}

      {/* ---------------------- INÍCIO LOGÍSTICA ---------------------- */}
      <Route path="/inventory" exact component={Inventory} />

      <Route path="/inventory/transaction" exact component={ListTransaction} />
      <Route
        path="/inventory/transaction/register"
        exact
        component={RegisterTransaction}
      />
      <Route path="/inventory/transaction/:id" component={EditTransaction} />

      <Route path="/inventory/storage" exact component={ListStorage} />
      <Route
        path="/inventory/storage/register"
        exact
        component={RegisterStorage}
      />
      <Route path="/inventory/storage/:id" component={EditStorage} />

      <Route path="/inventory/product" exact component={ListProduct} />
      <Route
        path="/inventory/product/register"
        exact
        component={RegisterProduct}
      />
      <Route path="/inventory/product/:id" component={EditProduct} />

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

      <Route path="/inventory/family" exact component={ListFamily} />
      <Route
        path="/inventory/family/register"
        exact
        component={RegisterFamily}
      />
      <Route path="/inventory/family/:id" component={EditFamily} />

      <Route path="/inventory/subfamily" exact component={ListSubFamily} />
      <Route
        path="/inventory/subfamily/register"
        exact
        component={RegisterSubFamily}
      />
      <Route path="/inventory/subfamily/:id" component={EditSubFamily} />

      <Route path="/inventory/application" exact component={ListApplication} />
      <Route
        path="/inventory/application/register"
        exact
        component={RegisterApplication}
      />
      <Route path="/inventory/application/:id" component={EditApplication} />

      <Route path="/inventory/dimension" exact component={ListDimension} />
      <Route
        path="/inventory/dimension/register"
        exact
        component={RegisterDimension}
      />
      <Route path="/inventory/dimension/:id" component={EditDimension} />

      <Route path="/inventory/unitmeasure" exact component={ListUnitMeasure} />
      <Route
        path="/inventory/unitmeasure/register"
        exact
        component={RegisterUnitMeasure}
      />
      <Route path="/inventory/unitmeasure/:id" component={EditUnitMeasure} />
      {/* ---------------------- FIM LOGÍSTICA ---------------------- */}

      <Route path="/pet" exact component={Pet} />

      <Route path="/pet/pets" exact component={ListPet} />
      <Route path="/pet/pets/register" exact component={RegisterPet} />
      <Route path="/pet/pets/:id" component={EditPet} />

      <Route path="/service" exact component={ListServicesCompany} />
      <Route
        path="/service/register"
        exact
        component={RegisterServicesCompany}
      />
      <Route path="/service/:id" component={EditServicesCompany} />

      <Route path="/schedule" component={Schedule} />
    </Switch>
  );
};

export default Routes;
