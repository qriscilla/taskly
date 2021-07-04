import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { AuthProvider, ProjectProvider } from '../contexts';
import { PublicRoute, PrivateRoute } from './routes';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import ResetPassword from './auth/ResetPassword';
import Main from './main';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>

          {/* Below pages are accessible without authentication */}
          <PublicRoute path='/taskly/sign-up' component={SignUp} />
          <PublicRoute path='/taskly/sign-in' component={SignIn} />
          <PublicRoute path='/taskly/reset-password' component={ResetPassword} />

          {/* Below "main" page is accessible only after authentication */}
          <ProjectProvider>
            <PrivateRoute exact path='/taskly' component={Main} />
          </ProjectProvider>

        </Switch>
      </AuthProvider>      
    </Router>
  );
}

export default App;