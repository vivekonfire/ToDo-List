import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { v4 as uuidv4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  const error = [];

  const [state, dispatch] = useReducer(AlertReducer, error);

  const setAlert = (err) => {
    const id = uuidv4();
    dispatch({ type: SET_ALERT, payload: { err, id } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
  };

  return (
    <AlertContext.Provider
      value={{
        error: state,
        setAlert: setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
