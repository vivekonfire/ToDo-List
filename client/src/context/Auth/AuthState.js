import React, { useReducer } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import setForgotToken from "../../utils/setForgotToken";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOAD_USER,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
  FORGOT_PASSWORD,
  SET_NEW_PASSWORD,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    laoding: true,
    user: null,
    isAuth: false,
    token: localStorage.getItem("token"),
    error: null,
    forgottoken: localStorage.getItem("forgottoken"),
    id_url: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token) setAuthToken(localStorage.token);
    try {
      const res = await axios.get("/api/signin");

      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };

    try {
      const res = await axios.post("/api/signin", formData, config);

      dispatch({ type: LOGIN_SUCCESS, payload: res });

      loadUser();
    } catch (err) {
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  const register = async (formData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/signup", formData, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res });

      loadUser();
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  const forgotpassword = async (email) => {
    const formData = {
      email: email,
    };

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/forgotpassword", formData, config);

      dispatch({ type: FORGOT_PASSWORD, payload: res });

      if (localStorage.forgottoken) setForgotToken(localStorage.forgottoken);
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const setNewPassword = async (password, id) => {
    const formData = {
      password: password,
    };
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/forgotpassword/${id}`,
        formData,
        config
      );

      dispatch({ type: SET_NEW_PASSWORD, payload: res });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        laoding: state.loading,
        error: state.error,
        user: state.user,
        token: state.token,
        isAuth: state.isAuth,
        forgottoken: state.forgottoken,
        id_url: state.id_url,
        loadUser: loadUser,
        login: login,
        register: register,
        logout: logout,
        clearErrors: clearErrors,
        forgotpassword: forgotpassword,
        setNewPassword: setNewPassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
