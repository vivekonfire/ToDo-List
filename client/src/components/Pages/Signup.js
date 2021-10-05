import React, { useState, useContext, useEffect } from "react";
import authContext from "../../context/Auth/authContext";
import alertContext from "../../context/Alert/alertContext";

const SignUp = (props) => {
  const AuthContext = useContext(authContext);
  const AlertContext = useContext(alertContext);

  const { register, isAuth, error, clearErrors } = AuthContext;
  const { setAlert } = AlertContext;

  useEffect(() => {
    if (isAuth) {
      props.history.push("/");
    }

    if (error !== null) {
      setAlert(error);
      clearErrors();
    }

    //eslint-disable-next-line
  }, [isAuth, props.history, error]);

  const [person, setPerson] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = person;

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || password === "" || email === "")
      setAlert("Please fill all Credentials");
    else register(person);
  };

  const onChange = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <h1>Sign Up</h1>
          <h2>Name</h2>
          <div>
            <input
              name="name"
              type="name"
              value={name}
              placeholder="Type your name"
              onChange={onChange}
            ></input>
          </div>
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
      </div>
    </div>
  );
};

export default SignUp;
