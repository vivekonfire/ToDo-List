import React, { useContext } from "react";
import AlertContext from "../../context/Alert/alertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { error } = alertContext;

  return (
    error.length > 0 &&
    error.map((err) => (
      <div key={err.id}>
        <p>{err.err}</p>
      </div>
    ))
  );
};

export default Alert;
