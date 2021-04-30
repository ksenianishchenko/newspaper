import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Header from "../header/header";
import CreateUserForm from "../create-user-form/create-user-form";

import "./dashboard.scss";

const Dashboard = (props) => {
  const {
    currentUser,
    currentProfile
  } = props;

  if (!currentUser) {
    return <Redirect to="/welcome" />
  }

  if (currentUser && !currentUser.is_admin) {
    return <Redirect to="/" />
  }

  //if (currentProfile) {
    //return <Redirect to={`profile/${currentProfile.id}`} />
  //}

  return <div className="dashboard">
    <Header/>
    <div className="main-content">
      <div className="container">
        { currentProfile ? <div className="row p-2">
          <div className="col-6">
            <div class="alert alert-primary" role="alert">
              User created! <Link to={`/profile/${currentProfile.id}`}>{`See profile ${currentProfile.handle}`}</Link>
            </div>
          </div>
        </div> : ""
        }
        <div className="row">
          <div className="col-6">
            <CreateUserForm />
          </div>
        </div>
      </div>
    </div>
  </div>
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentProfile: state.user.createNewUserFromAdmin
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfileFeed: (profile) => dispatch(onGetProfileFeed(profile))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
