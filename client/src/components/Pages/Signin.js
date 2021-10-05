import React, { useContext, useState, useEffect } from "react";
import authContext from "../../context/Auth/authContext";
import alertContext from "../../context/Alert/alertContext";

const Signin = (props) => {
  const AuthContext = useContext(authContext);
  const AlertContext = useContext(alertContext);

  const { login, token, error, clearErrors } = AuthContext;
  const { setAlert } = AlertContext;

  useEffect(() => {
    if (token !== null) {
      props.history.push("/");
    }

    if (error !== null) {
      setAlert(error);
      clearErrors();
    }

    //eslint-disable-next-line
  }, [token, props.history, error]);

  const [person, setPerson] = useState({
    email: "",
    password: "",
  });

  const { email, password } = person;

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") setAlert("Please fill all the fields");
    else login(person);
  };

  const onChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <h1>Login</h1>
          <h2>Email</h2>
          <div>
            <input
              name="email"
              type="email"
              value={email}
              placeholder="Email Account"
              onChange={onChange}
            ></input>
          </div>
          <h2>Password</h2>
          <div>
            <input
              name="password"
              type="password"
              value={password}
              placeholder="password"
              onChange={onChange}
            ></input>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <div>
          <h4>Forgot Password ?</h4>
          <a href="/forgotpassword">Click Here!</a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
