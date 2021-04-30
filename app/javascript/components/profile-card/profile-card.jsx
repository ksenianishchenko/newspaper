import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { onDeleteUser } from "../../redux/user/user-reducer";
import Button from "../button/button";
import FollowButton from "../../components/follow-button/follow-button";
import { useHistory } from "react-router-dom";
import { setProfileUpdateStatus } from "../../redux/user/user-actions";
import FollowersList from "../followers-list/followers-list";
import FollowingList from "../following-list/following-list";
import { onNewRelationship, onDeleteRelationship } from "../../redux/relationship/relationship-reducer";
import { onGetProfileFollowers, onGetProfileFollowing } from "../../redux/profile/profile-reducer";
import API from "../../api";

import "./profile-card.scss";

const ProfileCard = (props) => {
  const {
    // logged-in user
    currentUser,
    // the user profile that we are looking at: same as profile?
    profile,
    onChangeUpdateStatus,
    currentUserFollowers,
    currentUserFollowing,
    onCreateNewRelationship,
    onDeleteExistRelationship,
    profileFeed,
    onGetCurrentProfileFollowers,
    onGetCurrentProfileFollowing,
    profileFollowers,
    profileFollowing
  } = props;

  const [followingListModal, setFollowingListModal] = useState(false);
  const [followersListModal, setFollowersListModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (profile) {
      onGetCurrentProfileFollowers(profile);
      onGetCurrentProfileFollowing(profile);
    }
  }, [profile]);

  const handleEditProfile = () => {
    onChangeUpdateStatus(null);
    let path = `/profile/edit/${profile.id}`;
    history.push({
      pathname: path,
      // state: { profile: user }
      state: { currentUser: currentUser, profile: profile }
    });
  }

  const handleFollowersModalStatus = () => {
    setFollowingListModal(false);
    if (followersListModal === true) {
      setFollowersListModal(false);
    } else {
      setFollowersListModal(true);
    }
  }

  const handleFollowingModalStatus = () => {
    setFollowersListModal(false);
    if (followingListModal === true) {
      setFollowingListModal(false);
    } else {
      setFollowingListModal(true);
    }
  }

  const handleFollowAction = () => {
    onCreateNewRelationship(currentUser, profile);
    //window.location.reload();
    history.push("/");
  }

  const handleUnfollowAction = () => {
    onDeleteExistRelationship(currentUser, profile);
    //window.location.reload();
    history.push("/");
  }

  if (!profile) {
    return <div className="row">
      <div className="col">
        <p className="lead text-muted"><small><em>No user found yet.</em></small></p>
      </div>
    </div>
  } else {
    return <div>
    <div className="profile-card-4">
      <div className="profile-content">
        <div className="top-wrap">
          <div className="profile-name">
            {
              profile.firstname || profile.lastname ? <h3>{profile.firstname} {profile.lastname}</h3> : ''
            }
            <p>@{profile.handle}</p>
            <p>{profile.email}</p>
          </div>
          <div className="row">
            <div className="col text-right">
              {
                currentUser.is_admin ? <Button type="button"
                className="btn btn-default btn-sm"
                onClick={handleEditProfile}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16"></svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </Button> : ""
              }
              
            </div>
          </div>
        </div>
        <div className="profile-description">
          <p>Member since: <strong>{profile.created_at.slice(0, 10)}</strong></p>
          <div className="profile-description-wrap text-center">
            <div className="profile-overview">
              <p>TWEETS</p>
              <h4>{profileFeed.length ? profileFeed.length : "0"}</h4>
            </div>
            <div className="profile-overview" onClick={handleFollowersModalStatus}>
              <p>FOLLOWERS</p>
              <h4>{profileFollowers ? profileFollowers.length : 0}</h4>
            </div>
            <div className="profile-overview" onClick={handleFollowingModalStatus}>
              <p>FOLLOWING</p>
              <h4>{profileFollowing ? profileFollowing.length : 0}</h4></div>
          </div>
        </div>
      </div>

      <div className="row p-3">
        { profile && profile.handle != currentUser.handle ?
          <FollowButton
            currentUser={currentUser}
            profileFollowers={profileFollowers ? profileFollowers : currentUserFollowers}
            profileFollowing={profileFollowing ? profileFollowing : currentUserFollowing}
            handleFollow={handleFollowAction}
            handleUnfollow={handleUnfollowAction}
          />  : ""
        }
      </div>
    </div>
    <FollowersList
      status={followersListModal}
      list={profileFollowers}
      user={profile}
      currentUser={currentUser}
      profileFollowing={profileFollowing}
      handleClick={handleFollowersModalStatus}
    />
    <FollowingList
      status={followingListModal}
      list={profileFollowing}
      user={profile}
      currentUser={currentUser}
      handleClick={handleFollowingModalStatus}
    />
  </div>
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  currentUserFollowers: state.user.userFollowers,
  currentUserFollowing: state.user.userFollowing,
  profileFeed: state.profile.profileFeed,
  profileFollowers: state.profile.profileFollowers,
  profileFollowing: state.profile.profileFollowing
})

const mapDispatchToProps = (dispatch) => ({
  onDeleteProfile: (userId) => {
    dispatch(onDeleteUser(userId));
  },
  onChangeUpdateStatus: (status) => {
    dispatch(setProfileUpdateStatus(status));
  },
  onCreateNewRelationship: (profile, currentUser) => {
    dispatch(onNewRelationship(profile, currentUser));
  },
  onDeleteExistRelationship: (profile, currentUser) => {
    dispatch(onDeleteRelationship(profile, currentUser));
  },
  onGetCurrentProfileFollowers: (profile) => {
    dispatch(onGetProfileFollowers(profile));
  },
  onGetCurrentProfileFollowing: (profile) => {
    dispatch(onGetProfileFollowing(profile));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCard);