import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/Auth/authContext";
import AlertContext from "../../context/Alert/alertContext";

const ForgotPassword = (props) => {
  const authContext = useContext(AuthContext);
  const { forgotpassword, id_url, forgottoken, error, clearErrors } =
    authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (forgottoken !== null) {
      props.history.push(`/newpassword`);
    }

    if (error !== null) {
      setAlert(error);
      clearErrors();
    }

    //eslint-disable-next-line
  }, [forgotpassword, error, id_url]);

  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    forgotpassword(email);
  };

  return (
    <div>
      <h1>Recover Account</h1>
      <form onSubmit={onSubmit}>
        <h2>Email</h2>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Current Email"
          onChange={onChange}
        />
        <button type="submit">Done</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
