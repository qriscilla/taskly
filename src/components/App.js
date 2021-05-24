import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import Signup from './Signup';
import SignIn from './SignIn';
import ResetPassword from './ResetPassword';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path='/sign-up' component={Signup} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/reset-password' component={ResetPassword} />
        </Switch>
      </AuthProvider>      
    </Router>
  );
}

export default App;
