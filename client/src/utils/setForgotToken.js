import axios from "axios";
const setForgotToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-forgot-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-forgot-token"];
  }
};

export default setForgotToken;
