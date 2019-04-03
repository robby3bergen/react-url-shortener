import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, userLoggedIn, ...rest }) => (
  <Route {...rest} userLoggedIn={userLoggedIn} render={((props) => {
    if (userLoggedIn) {
      return <Component {...props} userLoggedIn={userLoggedIn} />;
    } else {
      return <Redirect to="/login" />;
    }
  })}/>
)

export default PrivateRoute;