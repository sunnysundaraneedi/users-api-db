import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userActions } from "../Store/userSlice";
import "./Login.css";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(userActions.logUserIn({ loginEmail, loginPassword }));
    navigate("/home");
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="imgcontainer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Avatar"
            className="avatar"
          />
        </div>
        <div className="container">
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            type="text"
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
            placeholder="Enter Username(Your First Name)"
            name="uname"
            required
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
            placeholder="Enter Password (Your Email Address)"
            name="psw"
            required
          />

          <button type="submit">Login</button>
          <Link to="/register" className="login-text">
            Do not have an account? Register Now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
