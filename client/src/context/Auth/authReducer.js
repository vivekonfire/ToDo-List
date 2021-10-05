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

const authReducer = (state, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuth: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.data.token);
      return {
        ...state,
        ...action.payload,
        token: action.payload.data.token,
        loading: false,
      };
    case FORGOT_PASSWORD:
      localStorage.setItem("forgottoken", action.payload.data.token);
      return {
        ...state,
        ...action.payload,
        forgottoken: action.payload.data.token,
        loading: false,
        id_url: action.payload.data.id,
      };
    case SET_NEW_PASSWORD:
      localStorage.removeItem("forgottoken");
      return {
        ...state,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        isAuth: false,
        error: action.payload,
        token: null,
        user: null,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        isAuth: false,
        error: null,
        token: null,
        user: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
