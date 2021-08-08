import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RegisterComponent from '../components/user/register.component';
import LoginComponent from '../components/user/login.component';
import TodosListComponent from '../components/todos/todo-list.component';
import PrivateRoute from './privateRoutes';

const AllRoutes = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/register" component={RegisterComponent} />
        <Route exact path="/login" component={LoginComponent} />
        <PrivateRoute exact path="/todos" component={TodosListComponent} />
      </Switch>
    </div>
  );
};

export default AllRoutes;