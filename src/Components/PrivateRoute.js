import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function isAuthenticated() {
    const token = localStorage.getItem('token');
    try {
        jwt_decode(token);
    } catch (error) {
        return false;
    }
    return true;
}

function PrivateRoute({ component: Component, ...rest }) {
    const isAuth = isAuthenticated();
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuth ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;