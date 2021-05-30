import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import ResetPassword from './auth/ResetPassword';
import Dashboard from './Dashboard';
import Project from './Project';

const App = () => {
  return (
    <Router>
      <AuthProvider>
          <Switch>
            <PublicRoute path='/sign-up' component={SignUp} />
            <PublicRoute path='/sign-in' component={SignIn} />
            <PublicRoute path='/reset-password' component={ResetPassword} />
            <PrivateRoute exact path='/' component={Dashboard} />
            <PrivateRoute path='/projects' component={Project} />
          </Switch>          
      </AuthProvider>      
    </Router>
  );
}

export default App;