import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom } from '../../../store/store';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [auth] = useAtom(authAtom);

  return (
    <Route
      {...rest}
      render={props =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default ProtectedRoute;
