import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Signup from './Signup';
import SignIn from './SignIn';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path='/sign-up' component={Signup} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/reset-password' component={ResetPassword} />
          <PrivateRoute exact path='/' component={Dashboard} />
        </Switch>
      </AuthProvider>      
    </Router>
  );
}

export default App;
