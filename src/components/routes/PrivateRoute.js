import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthContext } from '../../contexts';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuthContext();

    return (
        <Route
            {...rest}
            render={props => currentUser 
                ? <Component {...props} /> 
                : <Redirect to='/planr/sign-in' />
            } />
    );
};