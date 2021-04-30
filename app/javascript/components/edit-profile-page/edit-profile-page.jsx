import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { onUpdateUserFromAdmin } from "../../redux/user/user-reducer";
import FormInput from "../form-input/form-input";
import Header from "../header/header";
import { Redirect, useHistory } from "react-router-dom";
import ProfileCard from "../profile-card/profile-card";
import Button from "../button/button";
import { onDeleteUser } from "../../redux/user/user-reducer";

import "./edit-profile-page.scss";


const EditProfilePage = (props) => {

    const {onUserProfileUpdate, profileUpdateStatus, onDeleteProfile} = props;

    const [userValues, setUserValues] = useState({});
    const [user, setUser] = useState({});
    const history = useHistory();

    useEffect(() => {
      setUser(props.location.state.profile);
    })

    const handleChange = (evt) => {
      const { target } = evt;
      const { name, value } = target;
      setUserValues({ ...userValues, [name]: value });
    };
    
    const handleUserUpdate = (evt) => {
      evt.preventDefault();
      onUserProfileUpdate(user.id, userValues);
    }

    const handleDeleteProfile = () => {
      onDeleteProfile(user.id)
    }

    const handleCancelAction = () => {
      history.goBack();
    }

    if (profileUpdateStatus === true) {
      //return <Redirect to="/dashboard" />
    }

    return <div className="edit-profile-page">
      <Header />
      <div className="container">
        <div className="row p-3">
            <div className="col-8 personal-info">

              {
                profileUpdateStatus === false ? <div className="alert alert-info alert-dismissable">
                <a className="panel-close close" data-dismiss="alert">×</a> 
                <i className="fa fa-coffee"></i>
                <strong>User not update.</strong>
              </div> : ""
              }
              
              <h3>Personal info</h3>
              
              <form className="form-horizontal" role="form">
                <div className="form-group">
                  <label className="col-lg-3 control-label">Email:</label>
                  <div className="col-lg-8">
                    <FormInput
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder={user.email}
                      handleChange={handleChange}
                      required={true}
                      />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label">Password:</label>
                  <div className="col-md-8">
                    <FormInput
                      id="password"
                      name="password"
                      className="form-control"
                      handleChange={handleChange}
                      type="password"
                      required={true}
                      />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label">Confirm password:</label>
                  <div className="col-md-8">
                    <FormInput
                      id="confirm-password"
                      name="password"
                      className="form-control"
                      handleChange={handleChange}
                      type="password"
                      required={true}
                      />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label"></label>
                  <div className="col-md-8">
                    <Button type="button"
                      className="btn btn-primary"
                      onClick={handleUserUpdate}>Save Changes
                    </Button>
                    <span></span>
                    <Button type="button"
                      className="btn btn-outline-danger"
                      onClick={handleDeleteProfile}>Delete profile
                    </Button>
                    <span></span>
                    <Button type="reset"
                      className="btn btn-default"
                      value="Cancel"
                      onClick={handleCancelAction}>Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </div>
        </div>
      </div>
    </div>
}

const mapStateToProps = (state) => ({
    profileUpdateStatus: state.user.profileUpdateStatus
})

const mapDispatchToProps = (dispatch) => ({
    onUserProfileUpdate: (userId, userValues) => {
      dispatch(onUpdateUserFromAdmin(userId, userValues));
    },
    onDeleteProfile: (userId) => {
      dispatch(onDeleteUser(userId));
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
