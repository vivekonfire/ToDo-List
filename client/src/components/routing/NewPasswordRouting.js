import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/Auth/authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authcontext = useContext(AuthContext);
  const { forgottoken } = authcontext;
  return (
    <Route
      {...rest}
      render={(props) =>
        forgottoken === null ? (
          <Redirect to="/forgotpassword" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
