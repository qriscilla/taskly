import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthProvider, ProjectProvider } from '../contexts';
import { PrivateRoute, PublicRoute } from './routes';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import ResetPassword from './auth/ResetPassword';
import Main from './main';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PublicRoute path='/planr/sign-up' component={SignUp} />
          <PublicRoute path='/planr/sign-in' component={SignIn} />
          <PublicRoute path='/planr/reset-password' component={ResetPassword} />
          <ProjectProvider>
            <PrivateRoute exact path='/planr' component={Main} />
          </ProjectProvider>
        </Switch>
      </AuthProvider>      
    </Router>
  );
}

export default App;