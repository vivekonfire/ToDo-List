import "./Styles/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthState from "./context/Auth/AuthState";
import AlertState from "./context/Alert/AlertState";

import Signin from "./components/Pages/Signin";
import SignUp from "./components/Pages/Signup";
import ForgotPassword from "./components/Pages/ForgotPassword";
import Alert from "./components/Layout/Alert";
import Home from "./components/Pages/Home";
import NewPassword from "./components/Pages/NewPassword";
import Navbar from "./components/Layout/Navbar";

import PrivateRoute from "./components/routing/PrivateRouting";
import NewPasswordRouting from "./components/routing/NewPasswordRouting";

function App() {
  return (
    <div className="App">
      <AuthState>
        <AlertState>
          <Router>
            <Navbar />
            <Alert />
            <Switch>
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <PrivateRoute exact path="/" component={Home} />
              <NewPasswordRouting
                exact
                path="/newpassword"
                component={NewPassword}
              />
            </Switch>
          </Router>
        </AlertState>
      </AuthState>
    </div>
  );
}

export default App;
