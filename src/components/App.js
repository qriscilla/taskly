import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthProvider, ProjectProvider } from '../contexts';
import { PrivateRoute, PublicRoute } from './routes';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import ResetPassword from './auth/ResetPassword';
import Main from './main/Main';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PublicRoute path='/sign-up' component={SignUp} />
          <PublicRoute path='/sign-in' component={SignIn} />
          <PublicRoute path='/reset-password' component={ResetPassword} />
          <ProjectProvider>
            <PrivateRoute exact path='/' component={Main} />
          </ProjectProvider>
        </Switch>
      </AuthProvider>      
    </Router>
  );
}

export default App;