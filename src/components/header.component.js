import React from "react";
import { Link, useLocation } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";
import { connect, useDispatch } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/navbar.css";
import { logout } from "../store/actions/auth";
import { setLoader, clearLoader } from "../store/actions/loader";

import logo from "../assets/Icons/GlocalBodhLogo.svg";
import { alertCustom } from "../helpers/alerts";

import { useGoogleLogout } from "react-google-login";
const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;

const Header = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = props;

  const handleLogout = () => {
    dispatch(setLoader());
    signOut();
  };
  const onLogoutSuccess = (res) => {
    dispatch(logout());
    localStorage.removeItem("user");
    dispatch(clearLoader());
    //console.log("Logged out Success");
  };

  const onFailure = () => {
    alertCustom("error", "Somthing went wrong", "/home");
    //console.log("Handle failure cases");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="leftNavBar">
        <Link
          to={"/home"}
          className="navbar-brand"
          data-toggle="collapse"
          data-target=".dual-collapse2"
        >
          <img
            className="glocal-bodh-logo inline"
            src={logo}
            height="40"
            alt="userLogo"
          />
        </Link>
        <a
          style={{ textDecoration: "none" }}
          target="_blank"
          href="https://glocalbodh.webflight.in/"
          className="about-GB"
        >
          <button className="btn btn-primary about-GB">About GlocalBodh</button>
        </a>
      </div>

      <div className="navbar-collapse d-flex justify-content-end rightNavBar">
        <ul className="navbar-nav me-2 rightNavBar">
          {location.pathname === "/csrForm" ? (
            <li className="nav-item">
              <button className="btn btn-primary">
                <Link to="/" style={{ textDecoration: "none" }}>
                  Go Back To Dashboard
                </Link>
              </button>{" "}
            </li>
          ) : user ? (
            <li className="nav-item">
              <button className="btn btn-primary">
                <Link to="/csrForm" style={{ textDecoration: "none" }}>
                  Take CSR Funding Eligibility Test
                </Link>
              </button>{" "}
            </li>
          ) : null}

          {user && (
            <li className="nav-item ">
              <Dropdown>
                <Dropdown.Toggle variant="dark">
                  <h5 className="d-inline">{user.name}</h5>
                  {/* <img className='' src={user} height='50' alt='profileImg' /> */}
                </Dropdown.Toggle>
                {user.admin ? (
                  <Dropdown.Menu className="dropdown-menu-dark" variant="dark">
                    <Dropdown.Item href="/admin/allJobs">
                      All Jobs
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/admin/allNews">
                      All News
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/admin/events/1">
                      Workshops & Trainings
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/admin/events/2">
                      Awards & Competitions
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/admin/events/3">
                      Exhibition & Summits
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/admin/allFundingUpdates">
                      Funding Updates
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/admin/allRFP">
                      RFP
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/admin/kycList">
                      KYC List
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/admin/academics">
                      Academics
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/login" onClick={handleLogout}>
                      <button className="btn btn-danger p-2">Logout</button>
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/admin/dashboard/events">
                      My Events
                    </Dropdown.Item>
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Menu variant="dark" className="dropdown-menu-dark">
                    <Dropdown.Item as={Link} to="/user/dashboard/myEvents">
                      My Events
                    </Dropdown.Item>
                    <Dropdown.Item href="/user/dashboard/myJobs">
                      My Jobs
                    </Dropdown.Item>
                    <Dropdown.Item href="/user/dashboard/myFundingUpdate">
                      My Funding Updates
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/posting">
                      Create Post
                    </Dropdown.Item>
                    <Dropdown.Item href="/user/kycStatus">
                      KYC Status
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/login" onClick={handleLogout}>
                      <button className="btn btn-danger p-2">Logout</button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

function mapStateToProps(state) {
  const { user } = state.auth;

  return {
    user,
  };
}

export default connect(mapStateToProps)(Header);
