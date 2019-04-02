import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

import AdminPage from './components/admin/AdminPage';
import About from './components/common/About';
import UserPage from './components/user/UserPage';
import NotFound from './components/common/NotFound';
import AppNavbar from './components/common/AppNavbar';
import PrivateRoute from './components/common/PrivateRoute';
import UserPrivateRoute from './components/common/UserPrivateRoute';
import Login from './components/admin/Login';
import UserOrders from './components/user/UserOrders';
import OrderDetails from './components/common/OrderDetails';
import UserAccount from './components/user/UserAccount';
import EditUser from './components/user/EditUser';
import ManageUsers from './components/admin/ManageUsers';
import EditUserByAdmin from './components/admin/EditUserByAdmin';
import ManageUserOrders from './components/admin/ManageUserOrders';
import RegisterUserAccount from './components/user/RegisterUserAccount';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <AppNavbar/>
            <Switch>
              <PrivateRoute exact path="/admin" component={AdminPage} />
              <PrivateRoute exact path="/admin/users_manage" component={ManageUsers} />
              <PrivateRoute exact path="/admin/edit_user_account/:userId" component={EditUserByAdmin} />
              <PrivateRoute exact path="/admin/manage_user_orders/:userId" component={ManageUserOrders} />
              <PrivateRoute exact path="/admin/manage_user_orders/:userId/:orderId" component={OrderDetails} />
              <Route path="/admin/login" component={Login}/>
              <Route path="/admin/about" component={About}/>

              <Route exact path="/user" component={UserPage}/>
              <Route exact path="/user/register_account" component={RegisterUserAccount}/>
              <UserPrivateRoute exact path="/user/user_orders" component={UserOrders} />
              <UserPrivateRoute exact path="/user/user_orders/:orderId" component={OrderDetails} />
              <UserPrivateRoute exact path="/user/account" component={UserAccount}/>
              <UserPrivateRoute exact path="/user/edit_account" component={EditUser}/>

              <Route exact path="/notfound" component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
