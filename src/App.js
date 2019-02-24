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
import Login from './components/admin/Login';
import CartPage from './components/user/OrdersPage';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <AppNavbar/>
            <Switch>
              <Route exact path="/" component={UserPage}/>
              <PrivateRoute path="/admin" component={AdminPage} />
              <Route path="/login" component={Login}/>
              <Route path="/about" component={About}/>
              <Route exact path="/user_orders" component={CartPage}/>
              <Route exact path="/user_orders/:id" component={CartPage}/>
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
