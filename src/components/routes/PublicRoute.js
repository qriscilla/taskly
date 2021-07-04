import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuthContext } from '../../contexts';

export const PublicRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuthContext();

    return (
        <Route
            {...rest}
            render={props => currentUser
                ? <Redirect to='/taskly' />
                : <Component {...props} />
            } />
    );
};