import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./welcome.scss";

const Welcome = (props) => {

  return <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center welcome-page">
    <div className="container">
      <div className="row">
        <div className="col-7">
            <h1 className="display-3">Welcome</h1>
            <p className="font-weight-light">
            NewsPaper is a 'microblogging' system that allows you to send and receive short posts. Posts can be up to 140 characters long and can include links to relevant websites and resources.
            </p>
            <hr className="my-4" />
            <Link
              to="/signup"
              className="btn btn-primary mr-1"
              role="button"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="btn btn-primary mr-1"
              role="button"
            >
              Login
            </Link>
        </div>
      </div>
    </div>
  </div>
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps, null)(Welcome);
