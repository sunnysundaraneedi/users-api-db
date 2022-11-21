import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../Store/userSlice";
import "./NavBar.css";

const NavBar = () => {
  const clasess = useSelector((state) => state.users.classes);
  const dispatch = useDispatch();

  return (
    <div className="nav-container">
      <Link
        to="/"
        className={clasess.login}
        onClick={() => dispatch(userActions.loginClass())}
      >
        Login
      </Link>

      <Link
        to="/users"
        className={clasess.users}
        onClick={() => dispatch(userActions.usersClass())}
      >
        Users
      </Link>
    </div>
  );
};

export default NavBar;
