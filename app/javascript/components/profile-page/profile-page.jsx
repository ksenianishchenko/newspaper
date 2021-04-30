import React, { useEffect } from "react";
import Header from "../header/header";
import ProfileContent from "../profile-content/profile-content";
import { connect } from "react-redux";
import { onGetProfile } from "../../redux/profile/profile-reducer";
import { setUserProfile, setNewUserFromAdmin } from "../../redux//user/user-actions";
import { Redirect, useHistory  } from "react-router-dom";
import Button from "../button/button";

const ProfilePage = (props) => {
  const {handleProfile, currentProfile, currentUser, profileBySearch, resetUserProfile} = props;
  const profileId = props.match.params.profile_id;

  let history = useHistory();

  const resetProfile = () => {
    resetUserProfile();
    history.push("/");
  }

  useEffect(() => {
    // use user from search form or take params from history (url).
    if (profileBySearch) {
      handleProfile(profileBySearch.id);
    } else {
      if  (profileId) {
        handleProfile(profileId);
      }
    }
  }, [profileId, profileBySearch]);

  if (!currentUser) {
    return <Redirect to="/" />
  }

  if (currentProfile) {
    return <div className="profile-page">
      <Header />
      <div className="main-content">
        <div className="container">
          <div className="row">
            <div className="col">
              <Button className="btn btn-link" onClick={resetProfile}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-short" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/></svg>
                Back
              </Button>
            </div>
          </div>
          {
            currentProfile ? <ProfileContent profile={currentProfile}/>
            : <p className="lead text-muted"><small><em>User was not found.</em></small></p>
          }
        </div>
        </div>
      </div>
  } else {
    return <p className="lead text-muted"><small><em>User was not found.</em></small></p>
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentProfile: state.user.profileBySearch
})

const mapDispatchToProps = (dispatch) => ({
  handleProfile: (profileId) => {
    dispatch(onGetProfile(profileId));
  },
  resetUserProfile: () => {
    dispatch(setUserProfile(null));
    dispatch(setNewUserFromAdmin(null));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);