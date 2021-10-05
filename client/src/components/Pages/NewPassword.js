import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/Auth/authContext";
import AlertContext from "../../context/Alert/alertContext";

const NewPassword = (props) => {
  const authContext = useContext(AuthContext);
  const { error, clearErrors, setNewPassword, id_url } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error !== null) {
      setAlert(error);
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error]);

  const [password, setPasswrord] = useState("");

  const onChange = (e) => {
    setPasswrord(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setNewPassword(password, id_url);
    props.history.push("/signin");
  };

  return (
    <div>
      <h1>Give New Password</h1>
      <form onSubmit={onSubmit}>
        <h2>Password</h2>
        <input
          type="text"
          name="password"
          value={password}
          placeholder="New Password"
          onChange={onChange}
        />
        <button type="submit">Done</button>
      </form>
    </div>
  );
};

export default NewPassword;
