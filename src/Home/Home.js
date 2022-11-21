import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../Store/userSlice";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.currentUser);

  const logoutHandler = () => {
    navigate("/");
    dispatch(userActions.logUserOut());
  };

  const externalLink = user.web.includes("http")
    ? user.web
    : `http://${user.web}`;

  return (
    <Fragment>
      <div className="home-container">
        <div className="left">
          <div className="image-container">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2202/2202112.png"
              alt="user avatar"
            />
          </div>
          <div className="profile-description">
            <div className="title-edit">
              <p>Name</p>
            </div>
            <h3>{`${user.first_name} ${user.last_name}`}</h3>
            <div className="title-edit">
              <p>Email</p>
            </div>
            <h3>{user.email}</h3>
          </div>
        </div>
        <div className="right">
          <div className="right-container">
            <div className="profile-description">
              <div className="title-edit">
                <p>Name</p>
              </div>
              <h3>{`${user.first_name} ${user.last_name}`}</h3>
              <div className="title-edit">
                <p>Email</p>
              </div>
              <h3>{user.email}</h3>
              <div className="title-edit">
                <p>Company Name</p>
              </div>
              <h3>{user.company_name}</h3>
              <div className="title-edit">
                <p>Address</p>
              </div>
              <h3>{`${user.city}, ${user.state}, ${user.zip}`}</h3>
              <div className="title-edit">
                <p>Website</p>
              </div>
              <h3>
                <a
                  href={externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="external_link"
                >
                  {user.web}
                </a>
              </h3>
            </div>
          </div>
        </div>
        <div className="action-btns">
          <button className="action-btn" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
