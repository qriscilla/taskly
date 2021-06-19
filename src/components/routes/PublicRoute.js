import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../contexts';

export const PublicRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={props => currentUser
                ? <Redirect to='/' />
                : <Component {...props} />
            } />
    );
};