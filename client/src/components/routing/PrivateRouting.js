import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/Auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authcontext = useContext(AuthContext);
  const { token } = authcontext;
  return (
    <Route
      {...rest}
      render={(props) =>
        token === null ? <Redirect to="/signin" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
