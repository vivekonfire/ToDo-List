import React, { Fragment, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import authContext from "../../context/Auth/authContext";

const Navbar = (props) => {
  const AuthContext = useContext(authContext);
  const { token, logout } = AuthContext;

  // const memoryContext = useContext(MemoryContext);
  // const { clearMemories } = memoryContext;

  const onLogout = () => {
    logout();
    // clearMemories();
  };

  const newLinks = (
    <Fragment>
      <li className="my-auto px-6">
        <Link to="/">Home</Link>
      </li>
      <li className="my-auto px-6">
        <a onClick={onLogout} href="/signin">
          Logout
        </a>
      </li>
    </Fragment>
  );

  const homeLinks = (
    <Fragment>
      <li className="my-auto px-6">
        <a onClick={onLogout} href="/signin">
          Logout
        </a>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li className="my-auto px-6">
        <Link to="/signin">Login</Link>
      </li>
      <li className="my-auto px-6">
        <Link to="/signup">Sign Up</Link>
      </li>
    </Fragment>
  );

  const location = useLocation();

  return (
    <div>
      <div>
        <h1>ToDo</h1>
      </div>
      <ul>
        {token !== null
          ? location.pathname === "/"
            ? homeLinks
            : newLinks
          : authLinks}
      </ul>
    </div>
  );
};

export default Navbar;
